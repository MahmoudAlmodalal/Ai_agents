import assert from 'node:assert/strict';
import test from 'node:test';
import { APPLICATION_CHECKLIST_STORAGE_KEY } from './applicationChecklist';
import { readChecklistStorageStatus } from './dashboardRecords';

test('dashboard checklist status distinguishes invalid documents from blocked reads', () => {
  assert.equal(readChecklistStorageStatus({ getItem: () => '{broken' }), 'invalid');
  assert.equal(readChecklistStorageStatus({ getItem: () => '{"topic-a":["valid"]}' }), 'available');
  assert.equal(readChecklistStorageStatus({ getItem: (key) => { assert.equal(key, APPLICATION_CHECKLIST_STORAGE_KEY); throw new Error('blocked'); } }), 'read-error');
});
