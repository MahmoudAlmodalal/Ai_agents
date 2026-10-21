import assert from 'node:assert/strict';
import test from 'node:test';
import { createStoredZip } from './zipArchive';

function readStoredEntries(zip: Uint8Array) {
  const view = new DataView(zip.buffer, zip.byteOffset, zip.byteLength);
  const decoder = new TextDecoder();
  const entries = new Map<string, string>();
  let offset = 0;
  while (view.getUint32(offset, true) === 0x04034b50) {
    const method = view.getUint16(offset + 8, true);
    const nameLength = view.getUint16(offset + 26, true);
    const extraLength = view.getUint16(offset + 28, true);
    const size = view.getUint32(offset + 22, true);
    const nameStart = offset + 30;
    const dataStart = nameStart + nameLength + extraLength;
    assert.equal(method, 0, 'entries use the portable ZIP stored method');
    entries.set(decoder.decode(zip.subarray(nameStart, nameStart + nameLength)), decoder.decode(zip.subarray(dataStart, dataStart + size)));
    offset = dataStart + size;
  }
  assert.equal(view.getUint32(offset, true), 0x02014b50, 'central directory follows all file contents');
  return entries;
}

test('creates a valid UTF-8 ZIP whose stored files can be opened and inspected', () => {
  const zip = createStoredZip([
    { path: 'README.md', contents: '# Local export' },
    { path: 'learner-data/records.json', contents: '{"topicSlug":"project-idea-mvp"}' },
    { path: 'prompts/original/برومبت-01.txt', contents: 'النص الأصلي الكامل' },
  ], new Date('2026-10-19T12:00:00.000Z'));
  const entries = readStoredEntries(zip);

  assert.equal(entries.get('README.md'), '# Local export');
  assert.equal(entries.get('learner-data/records.json'), '{"topicSlug":"project-idea-mvp"}');
  assert.equal(entries.get('prompts/original/برومبت-01.txt'), 'النص الأصلي الكامل');
  assert.equal(new DataView(zip.buffer, zip.byteOffset, zip.byteLength).getUint32(zip.length - 22, true), 0x06054b50);
});

test('rejects duplicate and traversal paths instead of producing an unsafe package', () => {
  assert.throws(() => createStoredZip([{ path: '../outside.txt', contents: 'no' }]), /Invalid archive path/);
  assert.throws(() => createStoredZip([
    { path: 'records.json', contents: '{}' },
    { path: 'records.json', contents: '{"different":true}' },
  ]), /Duplicate archive path/);
});
