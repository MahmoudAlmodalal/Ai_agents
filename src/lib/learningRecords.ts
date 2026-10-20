import type {
  LearningRecordStorageStatus,
  PracticalAssessmentRecord,
  QuizAttemptRecord,
  VersionedRubricRating,
} from '@/src/types/learning';

export const QUIZ_ATTEMPTS_STORAGE_KEY = 'ai-agents-quiz-attempts-v1';
export const PRACTICAL_ASSESSMENTS_STORAGE_KEY = 'ai-agents-practical-assessments-v1';
export const LEARNING_RECORDS_CHANGE_EVENT = 'ai-agents-learning-records-change';

type RecordStorage = Pick<Storage, 'getItem' | 'setItem'>;
type QuizDocument = { schemaVersion: 1; byTopic: Record<string, QuizAttemptRecord[]> };
type PracticalDocument = { schemaVersion: 1; byTopic: Record<string, PracticalAssessmentRecord> };

export interface QuizAttemptsSnapshot {
  attempts: QuizAttemptRecord[];
  storageStatus: LearningRecordStorageStatus;
}

export interface PracticalAssessmentSnapshot {
  record: PracticalAssessmentRecord | null;
  storageStatus: LearningRecordStorageStatus;
}

export interface LearningRecordsSnapshot {
  quizAttempts: QuizAttemptRecord[];
  practicalAssessments: PracticalAssessmentRecord[];
  storageStatus: LearningRecordStorageStatus;
}

function emptyQuizDocument(): QuizDocument {
  return { schemaVersion: 1, byTopic: Object.create(null) };
}

function emptyPracticalDocument(): PracticalDocument {
  return { schemaVersion: 1, byTopic: Object.create(null) };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonNegativeInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 0;
}

function isValidTimestamp(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function isQuizAttemptRecord(value: unknown): value is QuizAttemptRecord {
  if (!isObject(value)) return false;
  const answers = value.answers;
  const validAnswers = Array.isArray(answers) && answers.every((answer) => isObject(answer)
    && isNonEmptyString(answer.questionId)
    && isNonNegativeInteger(answer.questionVersion)
    && (answer.selectedOptionId === null || isNonEmptyString(answer.selectedOptionId))
    && (answer.correctness === 'correct' || answer.correctness === 'incorrect' || answer.correctness === 'unanswered')
    && ((answer.correctness === 'unanswered') === (answer.selectedOptionId === null)));
  const questionIds = validAnswers ? answers.map((answer) => answer.questionId as string) : [];
  const correct = validAnswers ? answers.filter((answer) => answer.correctness === 'correct').length : -1;
  const incorrect = validAnswers ? answers.filter((answer) => answer.correctness === 'incorrect').length : -1;
  const unanswered = validAnswers ? answers.filter((answer) => answer.correctness === 'unanswered').length : -1;
  return isNonEmptyString(value.attemptId)
    && isNonEmptyString(value.topicSlug)
    && isNonEmptyString(value.quizId)
    && isNonNegativeInteger(value.quizVersion)
    && isNonEmptyString(value.policyId)
    && isNonNegativeInteger(value.policyVersion)
    && validAnswers
    && new Set(questionIds).size === questionIds.length
    && isNonNegativeInteger(value.correctCount)
    && isNonNegativeInteger(value.incorrectCount)
    && isNonNegativeInteger(value.unansweredCount)
    && isNonNegativeInteger(value.score)
    && isNonNegativeInteger(value.maxScore)
    && value.correctCount === correct
    && value.incorrectCount === incorrect
    && value.unansweredCount === unanswered
    && value.score === value.correctCount
    && value.maxScore === answers.length
    && value.score <= value.maxScore
    && isValidTimestamp(value.submittedAt)
    && value.selfCheck === true
    && typeof value.previewOnly === 'boolean';
}

function isVersionedRating(value: unknown): value is VersionedRubricRating {
  return isObject(value)
    && isNonEmptyString(value.criterionId)
    && isNonNegativeInteger(value.criterionVersion)
    && isNonEmptyString(value.scaleId)
    && isNonNegativeInteger(value.scaleVersion)
    && isNonEmptyString(value.ratingId)
    && isValidTimestamp(value.ratedAt);
}

function isPracticalAssessmentRecord(value: unknown): value is PracticalAssessmentRecord {
  if (!isObject(value)) return false;
  const criteria = value.criteria;
  const ratings = value.ratings;
  const ratingValues: unknown[] = Array.isArray(ratings) ? ratings : [];
  const validCriteria = Array.isArray(criteria) && criteria.every((criterion) => isObject(criterion)
    && isNonEmptyString(criterion.criterionId)
    && isNonNegativeInteger(criterion.criterionVersion));
  const criterionIds = validCriteria ? criteria.map((criterion) => criterion.criterionId as string) : [];
  const validRatings = Array.isArray(ratings) && ratingValues.every(isVersionedRating);
  const ratingIds = validRatings ? ratingValues.map((rating) => (rating as PracticalAssessmentRecord['ratings'][number]).criterionId) : [];
  const criteriaById = new Map(validCriteria ? criteria.map((criterion) => [criterion.criterionId, criterion.criterionVersion]) : []);
  return isObject(value)
    && isNonEmptyString(value.topicSlug)
    && isNonEmptyString(value.assessmentId)
    && isNonNegativeInteger(value.assessmentVersion)
    && isNonEmptyString(value.scaleId)
    && isNonNegativeInteger(value.scaleVersion)
    && validCriteria
    && new Set(criterionIds).size === criterionIds.length
    && validRatings
    && new Set(ratingIds).size === ratingIds.length
    && ratingValues.every((rating) => isVersionedRating(rating)
      && criteriaById.get(rating.criterionId) === rating.criterionVersion
      && rating.scaleId === value.scaleId && rating.scaleVersion === value.scaleVersion)
    && Array.isArray(value.history)
    && value.history.every(isVersionedRating)
    && isValidTimestamp(value.updatedAt)
    && value.selfAssessment === true
    && typeof value.previewOnly === 'boolean';
}

function parseQuizDocument(raw: string | null): QuizDocument | null {
  if (raw === null) return emptyQuizDocument();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed) || parsed.schemaVersion !== 1 || !isObject(parsed.byTopic)) return null;
    const byTopic: Record<string, QuizAttemptRecord[]> = Object.create(null);
    for (const [slug, attempts] of Object.entries(parsed.byTopic)) {
      if (!Array.isArray(attempts) || !attempts.every(isQuizAttemptRecord)
        || attempts.some((attempt) => attempt.topicSlug !== slug)) return null;
      byTopic[slug] = attempts;
    }
    return { schemaVersion: 1, byTopic };
  } catch {
    return null;
  }
}

function parsePracticalDocument(raw: string | null): PracticalDocument | null {
  if (raw === null) return emptyPracticalDocument();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed) || parsed.schemaVersion !== 1 || !isObject(parsed.byTopic)) return null;
    const byTopic: Record<string, PracticalAssessmentRecord> = Object.create(null);
    for (const [slug, record] of Object.entries(parsed.byTopic)) {
      if (!isPracticalAssessmentRecord(record) || record.topicSlug !== slug) return null;
      byTopic[slug] = record;
    }
    return { schemaVersion: 1, byTopic };
  } catch {
    return null;
  }
}

function addUniqueRatings(target: PracticalAssessmentRecord['history'], source: PracticalAssessmentRecord['history']) {
  const seen = new Set(target.map((rating) => `${rating.criterionId}:${rating.criterionVersion}:${rating.ratedAt}`));
  for (const rating of source) {
    const key = `${rating.criterionId}:${rating.criterionVersion}:${rating.ratedAt}`;
    if (!seen.has(key)) {
      target.push(rating);
      seen.add(key);
    }
  }
}

/**
 * Synchronous local-only record store. Memory keeps the active page usable when
 * browser storage is blocked; status reports that those changes may not survive reload.
 */
export function createLearningRecordsStore(getStorage: () => RecordStorage) {
  let quizMemory = emptyQuizDocument();
  let practicalMemory = emptyPracticalDocument();
  const dirtyQuizAttempts = new Map<string, Map<string, QuizAttemptRecord>>();
  const dirtyPracticalRecords = new Map<string, PracticalAssessmentRecord>();
  let quizStatus: LearningRecordStorageStatus = 'loading';
  let practicalStatus: LearningRecordStorageStatus = 'loading';
  const listeners = new Set<() => void>();

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function readQuiz(): { document: QuizDocument; status: LearningRecordStorageStatus; storage?: RecordStorage } {
    try {
      const storage = getStorage();
      const parsed = parseQuizDocument(storage.getItem(QUIZ_ATTEMPTS_STORAGE_KEY));
      if (!parsed) {
        quizStatus = 'invalid';
        return { document: quizMemory, status: quizStatus };
      }
      for (const [slug, attempts] of dirtyQuizAttempts) {
        const merged = new Map((parsed.byTopic[slug] ?? []).map((attempt) => [attempt.attemptId, attempt]));
        attempts.forEach((attempt, id) => merged.set(id, attempt));
        parsed.byTopic[slug] = [...merged.values()].sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
      }
      if (dirtyQuizAttempts.size > 0) {
        try {
          storage.setItem(QUIZ_ATTEMPTS_STORAGE_KEY, JSON.stringify(parsed));
          dirtyQuizAttempts.clear();
        } catch {
          quizStatus = 'write-error';
        }
      }
      quizMemory = parsed;
      if (dirtyQuizAttempts.size === 0) quizStatus = 'available';
      return { document: parsed, status: quizStatus, storage };
    } catch {
      quizStatus = 'read-error';
      return { document: quizMemory, status: quizStatus };
    }
  }

  function readPractical(): { document: PracticalDocument; status: LearningRecordStorageStatus; storage?: RecordStorage } {
    try {
      const storage = getStorage();
      const parsed = parsePracticalDocument(storage.getItem(PRACTICAL_ASSESSMENTS_STORAGE_KEY));
      if (!parsed) {
        practicalStatus = 'invalid';
        return { document: practicalMemory, status: practicalStatus };
      }
      dirtyPracticalRecords.forEach((record, slug) => { parsed.byTopic[slug] = record; });
      if (dirtyPracticalRecords.size > 0) {
        try {
          storage.setItem(PRACTICAL_ASSESSMENTS_STORAGE_KEY, JSON.stringify(parsed));
          dirtyPracticalRecords.clear();
        } catch {
          practicalStatus = 'write-error';
        }
      }
      practicalMemory = parsed;
      if (dirtyPracticalRecords.size === 0) practicalStatus = 'available';
      return { document: parsed, status: practicalStatus, storage };
    } catch {
      practicalStatus = 'read-error';
      return { document: practicalMemory, status: practicalStatus };
    }
  }

  function getQuizAttempts(topicSlug: string): QuizAttemptsSnapshot {
    const result = readQuiz();
    return { attempts: [...(result.document.byTopic[topicSlug] ?? [])], storageStatus: result.status };
  }

  function saveQuizAttempt(record: QuizAttemptRecord): QuizAttemptsSnapshot {
    if (!isQuizAttemptRecord(record)) {
      quizStatus = 'invalid';
      return { attempts: [], storageStatus: quizStatus };
    }
    const result = readQuiz();
    const current = [...(result.document.byTopic[record.topicSlug] ?? [])];
    if (current.some((attempt) => attempt.attemptId === record.attemptId)) {
      return { attempts: current, storageStatus: result.status };
    }
    const attempts = [...current, record].sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
    const next = { ...result.document, byTopic: { ...result.document.byTopic, [record.topicSlug]: attempts } };
    quizMemory = next;
    if (result.storage) {
      try {
        result.storage.setItem(QUIZ_ATTEMPTS_STORAGE_KEY, JSON.stringify(next));
        quizStatus = 'available';
        dirtyQuizAttempts.clear();
      } catch {
        quizStatus = 'write-error';
        const dirty = dirtyQuizAttempts.get(record.topicSlug) ?? new Map<string, QuizAttemptRecord>();
        dirty.set(record.attemptId, record);
        dirtyQuizAttempts.set(record.topicSlug, dirty);
      }
    } else {
      const dirty = dirtyQuizAttempts.get(record.topicSlug) ?? new Map<string, QuizAttemptRecord>();
      dirty.set(record.attemptId, record);
      dirtyQuizAttempts.set(record.topicSlug, dirty);
    }
    notify();
    return { attempts, storageStatus: quizStatus };
  }

  function getPracticalAssessment(topicSlug: string): PracticalAssessmentSnapshot {
    const result = readPractical();
    return { record: result.document.byTopic[topicSlug] ?? null, storageStatus: result.status };
  }

  function savePracticalAssessment(record: PracticalAssessmentRecord): PracticalAssessmentSnapshot {
    if (!isPracticalAssessmentRecord(record)) {
      practicalStatus = 'invalid';
      return { record: null, storageStatus: practicalStatus };
    }
    const result = readPractical();
    const previous = result.document.byTopic[record.topicSlug];
    const history = [...record.history];
    if (previous) {
      addUniqueRatings(history, previous.history);
      const nextCriteria = new Set(record.criteria.map((criterion) => `${criterion.criterionId}:${criterion.criterionVersion}`));
      const scaleChanged = previous.scaleId !== record.scaleId || previous.scaleVersion !== record.scaleVersion;
      addUniqueRatings(history, previous.ratings.filter((rating) => scaleChanged || !nextCriteria.has(`${rating.criterionId}:${rating.criterionVersion}`)));
    }
    const saved: PracticalAssessmentRecord = { ...record, ratings: [...record.ratings], history };
    const next = { ...result.document, byTopic: { ...result.document.byTopic, [saved.topicSlug]: saved } };
    practicalMemory = next;
    if (result.storage) {
      try {
        result.storage.setItem(PRACTICAL_ASSESSMENTS_STORAGE_KEY, JSON.stringify(next));
        practicalStatus = 'available';
        dirtyPracticalRecords.clear();
      } catch {
        practicalStatus = 'write-error';
        dirtyPracticalRecords.set(saved.topicSlug, saved);
      }
    } else {
      dirtyPracticalRecords.set(saved.topicSlug, saved);
    }
    notify();
    return { record: saved, storageStatus: practicalStatus };
  }

  function listLearningRecords(): LearningRecordsSnapshot {
    const quizzes = readQuiz();
    const practical = readPractical();
    const storageStatus = [quizzes.status, practical.status].find((status) => status !== 'available') ?? 'available';
    return {
      quizAttempts: Object.values(quizzes.document.byTopic).flat(),
      practicalAssessments: Object.values(practical.document.byTopic),
      storageStatus,
    };
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getQuizAttempts, saveQuizAttempt, getPracticalAssessment, savePracticalAssessment, listLearningRecords, subscribe };
}

const store = createLearningRecordsStore(() => window.localStorage);

export const getQuizAttempts = store.getQuizAttempts;
export const getPracticalAssessment = store.getPracticalAssessment;
export const listLearningRecords = store.listLearningRecords;

export function saveQuizAttempt(record: QuizAttemptRecord) {
  const snapshot = store.saveQuizAttempt(record);
  broadcastChange();
  return snapshot;
}

export function savePracticalAssessment(record: PracticalAssessmentRecord) {
  const snapshot = store.savePracticalAssessment(record);
  broadcastChange();
  return snapshot;
}

export function subscribeLearningRecords(listener: () => void) {
  if (typeof window === 'undefined') return () => {};
  const onExternalChange = () => listener();
  const onVisible = () => {
    if (document.visibilityState === 'visible') listener();
  };
  window.addEventListener(LEARNING_RECORDS_CHANGE_EVENT, onExternalChange);
  window.addEventListener('storage', onExternalChange);
  window.addEventListener('focus', onExternalChange);
  document.addEventListener('visibilitychange', onVisible);
  return () => {
    window.removeEventListener(LEARNING_RECORDS_CHANGE_EVENT, onExternalChange);
    window.removeEventListener('storage', onExternalChange);
    window.removeEventListener('focus', onExternalChange);
    document.removeEventListener('visibilitychange', onVisible);
  };
}

function broadcastChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(LEARNING_RECORDS_CHANGE_EVENT));
  }
}

