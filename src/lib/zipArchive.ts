export interface ZipArchiveFile {
  path: string;
  contents: string | Uint8Array;
}

const encoder = new TextEncoder();
const CRC_TABLE = new Uint32Array(256);

for (let n = 0; n < 256; n += 1) {
  let value = n;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  CRC_TABLE[n] = value >>> 0;
}

function crc32(bytes: Uint8Array) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function u16(value: number) {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff]);
}

function u32(value: number) {
  return new Uint8Array([value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff]);
}

function join(parts: Uint8Array[]) {
  const result = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    result.set(part, offset);
    offset += part.length;
  }
  return result;
}

function zipDateTime(date: Date) {
  const year = Math.max(1980, Math.min(2107, date.getUTCFullYear()));
  const dosDate = ((year - 1980) << 9) | ((date.getUTCMonth() + 1) << 5) | date.getUTCDate();
  const dosTime = (date.getUTCHours() << 11) | (date.getUTCMinutes() << 5) | Math.floor(date.getUTCSeconds() / 2);
  return { dosDate, dosTime };
}

function normalizePath(path: string) {
  const normalized = path.replace(/\\/g, '/');
  if (!normalized || normalized.startsWith('/') || normalized.split('/').some((part) => part === '..' || part === '')) {
    throw new Error(`Invalid archive path: ${path}`);
  }
  return normalized;
}

/** Build an uncompressed ZIP using the browser's built-in text encoder. */
export function createStoredZip(files: ZipArchiveFile[], createdAt = new Date()) {
  if (files.length > 0xffff) throw new Error('The archive contains too many files.');
  const names = new Set<string>();
  const localRecords: Uint8Array[] = [];
  const centralRecords: Uint8Array[] = [];
  let localOffset = 0;
  const { dosDate, dosTime } = zipDateTime(createdAt);

  for (const file of files) {
    const path = normalizePath(file.path);
    if (names.has(path)) throw new Error(`Duplicate archive path: ${path}`);
    names.add(path);
    const nameBytes = encoder.encode(path);
    const data = typeof file.contents === 'string' ? encoder.encode(file.contents) : file.contents;
    if (nameBytes.length > 0xffff || data.length > 0xffffffff || localOffset > 0xffffffff) {
      throw new Error('The archive is too large for the supported ZIP format.');
    }
    const checksum = crc32(data);
    const localHeader = join([
      u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(dosTime), u16(dosDate),
      u32(checksum), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0), nameBytes,
    ]);
    const localRecord = join([localHeader, data]);
    localRecords.push(localRecord);

    centralRecords.push(join([
      u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(dosTime), u16(dosDate),
      u32(checksum), u32(data.length), u32(data.length), u16(nameBytes.length), u16(0), u16(0),
      u16(0), u16(0), u32(0), u32(localOffset), nameBytes,
    ]));
    localOffset += localRecord.length;
  }

  const centralDirectory = join(centralRecords);
  const endRecord = join([
    u32(0x06054b50), u16(0), u16(0), u16(centralRecords.length), u16(centralRecords.length),
    u32(centralDirectory.length), u32(localOffset), u16(0),
  ]);
  return join([...localRecords, centralDirectory, endRecord]);
}
