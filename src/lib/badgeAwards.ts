import { isPolicyApproved } from '@/src/lib/learningPolicy';
import type { PolicyApproval, PracticalAssessmentRecord, QuizAttemptRecord } from '@/src/types/learning';

export const BADGE_AWARDS_STORAGE_KEY = 'ai-agents-badge-awards-v1';

export type BadgeEvidence = {
  recentlyViewedTopicSlugs: string[];
  quizAttempts: QuizAttemptRecord[];
  practicalAssessments: PracticalAssessmentRecord[];
  recentlyViewedStatus?: BadgeAwardStorageStatus;
  learningRecordsStatus?: BadgeAwardStorageStatus;
  quizAttemptsStatus?: BadgeAwardStorageStatus;
  practicalAssessmentsStatus?: BadgeAwardStorageStatus;
};

export type BadgeEvidenceType = 'recent-topic-list' | 'quiz-attempts' | 'current-self-assessments';

export interface BadgeAwardRule {
  id: string;
  version: number;
  title: string;
  threshold: number;
  evidence: BadgeEvidenceType;
  conditionDescription?: string;
  evidenceDescription?: string;
  distinctionNotice?: string;
}

export interface BadgePolicy {
  policyId: string;
  version: number;
  reviewState: 'draft' | 'review-ready' | 'approved';
  approval: PolicyApproval;
  rules: BadgeAwardRule[];
}

export type BadgeAwardEventStatus = 'awarded' | 'revoked' | 'retired';

export interface BadgeAwardEvent {
  awardId: string;
  policyId: string;
  policyVersion: number;
  approvalDecisionReference: string;
  badgeId: string;
  ruleVersion: number;
  status: BadgeAwardEventStatus;
  evidenceKeys: string[];
  awardedAt: string;
  endedAt?: string;
  endReason?: 'evidence-below-threshold' | 'policy-or-rule-version-changed' | 'approval-decision-changed';
}

export type BadgeAwardStorageStatus = 'loading' | 'available' | 'invalid' | 'read-error' | 'write-error';
export type BadgeEvaluationStatus = 'awaiting-approval' | 'enabled' | 'invalid-policy';

export interface BadgeRuleEvaluation {
  rule: BadgeAwardRule;
  observedCount: number;
  threshold: number;
  state: 'awarded' | 'unearned' | 'unconfirmed';
  explanation: string;
  activeAward?: BadgeAwardEvent;
}

export interface BadgeAwardSnapshot {
  evaluationStatus: BadgeEvaluationStatus;
  storageStatus: BadgeAwardStorageStatus;
  rules: BadgeRuleEvaluation[];
  events: BadgeAwardEvent[];
}

type AwardStorage = Pick<Storage, 'getItem' | 'setItem'>;
type AwardDocument = { schemaVersion: 1; events: BadgeAwardEvent[] };

const APPROVAL_PENDING = 'The badge policy does not have an owner approval with audit evidence.';
const ALLOWED_EVIDENCE = new Set<BadgeAwardRule['evidence']>(['recent-topic-list', 'quiz-attempts', 'current-self-assessments']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isTimestamp(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function isAwardEvent(value: unknown): value is BadgeAwardEvent {
  if (!isRecord(value)) return false;
  const allowedReasons = ['evidence-below-threshold', 'policy-or-rule-version-changed', 'approval-decision-changed'];
  return typeof value.awardId === 'string' && value.awardId.length > 0
    && typeof value.policyId === 'string' && value.policyId.length > 0
    && Number.isInteger(value.policyVersion) && Number(value.policyVersion) > 0
    && typeof value.approvalDecisionReference === 'string' && value.approvalDecisionReference.length > 0
    && typeof value.badgeId === 'string' && value.badgeId.length > 0
    && Number.isInteger(value.ruleVersion) && Number(value.ruleVersion) > 0
    && ['awarded', 'revoked', 'retired'].includes(String(value.status))
    && Array.isArray(value.evidenceKeys) && value.evidenceKeys.every((key) => typeof key === 'string')
    && isTimestamp(value.awardedAt)
    && (value.endedAt === undefined || isTimestamp(value.endedAt))
    && (value.endReason === undefined || allowedReasons.includes(String(value.endReason)));
}

function parseAwardDocument(raw: string | null): AwardDocument {
  if (raw === null) return { schemaVersion: 1, events: [] };
  const parsed: unknown = JSON.parse(raw);
  if (!isRecord(parsed) || parsed.schemaVersion !== 1 || !Array.isArray(parsed.events) || !parsed.events.every(isAwardEvent)) {
    throw new Error('Invalid badge award data');
  }
  const ids = parsed.events.map((event) => event.awardId);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate badge award event identity');
  return { schemaVersion: 1, events: parsed.events as BadgeAwardEvent[] };
}

export function isValidBadgePolicy(policy: BadgePolicy): boolean {
  if (!policy || typeof policy !== 'object' || !policy.policyId.trim() || !Number.isInteger(policy.version) || policy.version < 1
    || !Array.isArray(policy.rules) || policy.rules.length === 0) return false;
  const ruleIds = new Set<string>();
  return policy.rules.every((rule) => {
    if (!rule.id.trim() || !Number.isInteger(rule.version) || rule.version < 1 || !rule.title.trim()
      || !Number.isInteger(rule.threshold) || rule.threshold < 1 || !ALLOWED_EVIDENCE.has(rule.evidence)
      || ruleIds.has(rule.id)) return false;
    ruleIds.add(rule.id);
    return true;
  });
}

function evidenceKeysFor(rule: BadgeAwardRule, evidence: BadgeEvidence): string[] {
  if (rule.evidence === 'recent-topic-list') {
    return [...new Set(evidence.recentlyViewedTopicSlugs.filter((slug) => slug.trim()))];
  }
  if (rule.evidence === 'quiz-attempts') {
    const unique = new Map<string, QuizAttemptRecord>();
    for (const attempt of evidence.quizAttempts) {
      if (!attempt.selfCheck || attempt.previewOnly) continue;
      const key = `${attempt.topicSlug}:${attempt.quizId}:${attempt.quizVersion}:${attempt.attemptId}`;
      unique.set(key, attempt);
    }
    return [...unique.keys()];
  }
  const current = new Map<string, string>();
  for (const record of evidence.practicalAssessments) {
    if (!record.selfAssessment || record.previewOnly || record.ratings.length === 0) continue;
    const key = `${record.topicSlug}:${record.assessmentId}:v${record.assessmentVersion}:${record.scaleId}:v${record.scaleVersion}`;
    current.set(record.topicSlug, key);
  }
  return [...current.values()];
}

function evidenceStatusLabel(status: BadgeAwardStorageStatus): string {
  switch (status) {
    case 'available': return 'متاح';
    case 'loading': return 'قيد الفحص';
    case 'invalid': return 'غير صالح';
    case 'write-error': return 'غير مؤكد الحفظ';
    case 'read-error': return 'تعذرت قراءته';
    default: return 'غير معروف';
  }
}

function currentEvent(events: BadgeAwardEvent[], policyId: string, badgeId: string, policyVersion: number, ruleVersion: number, approvalReference: string) {
  return [...events].reverse().find((event) => event.policyId === policyId && event.badgeId === badgeId
    && event.policyVersion === policyVersion && event.ruleVersion === ruleVersion
    && event.approvalDecisionReference === approvalReference);
}

function retireActiveEvents(events: BadgeAwardEvent[], policy: BadgePolicy, approvalReference: string, now: string) {
  return events.map((event) => {
    if (event.status !== 'awarded' || event.policyId !== policy.policyId) return event;
    const currentRule = policy.rules.find((rule) => rule.id === event.badgeId);
    const sameVersion = event.policyVersion === policy.version && currentRule?.version === event.ruleVersion;
    if (sameVersion && event.approvalDecisionReference === approvalReference) return event;
    return {
      ...event,
      status: 'retired' as const,
      endedAt: now,
      endReason: event.approvalDecisionReference === approvalReference ? 'policy-or-rule-version-changed' as const : 'approval-decision-changed' as const,
    };
  });
}

/**
 * Reconcile approved badge policy against current eligible evidence. Awards are
 * versioned events; lost evidence revokes the active event, and a later recovery
 * appends a new event. Preview records are never eligibility evidence.
 */
export function reconcileBadgeAwards(
  policy: BadgePolicy,
  evidence: BadgeEvidence,
  previousEvents: BadgeAwardEvent[] = [],
  now = new Date(),
): BadgeAwardSnapshot {
  if (policy.reviewState !== 'approved' || !isPolicyApproved(policy.approval)) {
    return { evaluationStatus: 'awaiting-approval', storageStatus: 'available', rules: [], events: previousEvents };
  }
  if (!isValidBadgePolicy(policy)) {
    return { evaluationStatus: 'invalid-policy', storageStatus: 'available', rules: [], events: previousEvents };
  }

  const timestamp = now.toISOString();
  const approvalReference = policy.approval.decisionReference;
  const events = retireActiveEvents([...previousEvents], policy, approvalReference, timestamp);
  const rules: BadgeRuleEvaluation[] = [];
  for (const rule of policy.rules) {
    const evidenceKeys = evidenceKeysFor(rule, evidence);
    const evidenceStatus = rule.evidence === 'recent-topic-list'
      ? evidence.recentlyViewedStatus ?? 'available'
      : rule.evidence === 'quiz-attempts'
        ? evidence.quizAttemptsStatus ?? evidence.learningRecordsStatus ?? 'available'
        : evidence.practicalAssessmentsStatus ?? evidence.learningRecordsStatus ?? 'available';
    const evidenceConfirmed = evidenceStatus === 'available';
    let active = currentEvent(events, policy.policyId, rule.id, policy.version, rule.version, approvalReference);
    if (!evidenceConfirmed) {
      rules.push({
        rule,
        observedCount: evidenceKeys.length,
        threshold: rule.threshold,
        state: 'unconfirmed',
        explanation: `تعذر تأكيد الأدلة المحلية؛ نتيجة الشروط غير مؤكدة. مصدر الأدلة ${evidenceStatusLabel(evidenceStatus)}؛ عُلّقت إعادة التقييم ولم يتغير سجل الشارة.`,
        activeAward: active?.status === 'awarded' ? active : undefined,
      });
      continue;
    }
    if (evidenceKeys.length >= rule.threshold) {
      if (!active || active.status !== 'awarded') {
        const awardId = `${policy.policyId}:${policy.version}:${rule.id}:${rule.version}:${events.length + 1}`;
        active = {
          awardId,
          policyId: policy.policyId,
          policyVersion: policy.version,
          approvalDecisionReference: approvalReference,
          badgeId: rule.id,
          ruleVersion: rule.version,
          status: 'awarded',
          evidenceKeys,
          awardedAt: timestamp,
        };
        events.push(active);
      }
    } else if (active?.status === 'awarded') {
      active = { ...active, status: 'revoked', endedAt: timestamp, endReason: 'evidence-below-threshold' };
      const index = events.findIndex((event) => event.awardId === active!.awardId);
      events[index] = active;
    }
    const currentAward = active?.status === 'awarded' ? active : undefined;
    rules.push({
      rule,
      observedCount: evidenceKeys.length,
      threshold: rule.threshold,
      state: currentAward ? 'awarded' : 'unearned',
      explanation: currentAward
        ? `اكتملت قاعدة ${rule.title} وفق الإصدار ${rule.version} وقرار ${approvalReference}.`
        : `${evidenceKeys.length} من ${rule.threshold} أدلة مؤهلة وفق قاعدة ${rule.title} الإصدار ${rule.version}.`,
      activeAward: currentAward,
    });
  }

  return { evaluationStatus: 'enabled', storageStatus: 'available', rules, events };
}

export function createBadgeAwardStore(getStorage: () => AwardStorage, now: () => Date = () => new Date()) {
  let snapshot: BadgeAwardSnapshot = { evaluationStatus: 'awaiting-approval', storageStatus: 'loading', rules: [], events: [] };
  let pendingEvents: BadgeAwardEvent[] | null = null;

  function refresh(policy: BadgePolicy, evidence: BadgeEvidence): BadgeAwardSnapshot {
    let storage: AwardStorage;
    let raw: string | null;
    try {
      storage = getStorage();
      raw = storage.getItem(BADGE_AWARDS_STORAGE_KEY);
    } catch {
      const evaluation = reconcileBadgeAwards(policy, evidence, pendingEvents ?? snapshot.events, now());
      snapshot = { ...evaluation, storageStatus: 'read-error' };
      return snapshot;
    }

    let document: AwardDocument;
    try {
      document = parseAwardDocument(raw);
    } catch {
      const evaluation = reconcileBadgeAwards(policy, evidence, pendingEvents ?? snapshot.events, now());
      snapshot = { ...evaluation, storageStatus: 'invalid' };
      return snapshot;
    }

    if (pendingEvents) {
      const merged = new Map(document.events.map((event) => [event.awardId, event]));
      pendingEvents.forEach((event) => merged.set(event.awardId, event));
      document.events = [...merged.values()];
    }
    const evaluation = reconcileBadgeAwards(policy, evidence, document.events, now());
    const changed = JSON.stringify(document.events) !== JSON.stringify(evaluation.events);
    if (evaluation.evaluationStatus !== 'enabled') {
      snapshot = { ...evaluation, storageStatus: 'available' };
      return snapshot;
    }
    if (!changed && !pendingEvents) {
      snapshot = { ...evaluation, storageStatus: 'available' };
      return snapshot;
    }
    try {
      storage.setItem(BADGE_AWARDS_STORAGE_KEY, JSON.stringify({ schemaVersion: 1, events: evaluation.events }));
      pendingEvents = null;
      snapshot = { ...evaluation, storageStatus: 'available' };
    } catch {
      pendingEvents = evaluation.events;
      snapshot = { ...evaluation, storageStatus: 'write-error' };
    }
    return snapshot;
  }

  return {
    getSnapshot() { return snapshot; },
    refresh,
  };
}

let browserStore: ReturnType<typeof createBadgeAwardStore> | null = null;

export function getBrowserBadgeAwardStore() {
  if (!browserStore) browserStore = createBadgeAwardStore(() => window.localStorage);
  return browserStore;
}
