import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv } from './csv.ts';

test('parses quoted fields, escaped quotes, CRLF and blank lines', () => {
  const rows = parseCsv('a,b,c\r\n1,"x, y","say ""hi"""\r\n\r\n2,,last\n');
  assert.deepEqual(rows, [
    { a: '1', b: 'x, y', c: 'say "hi"' },
    { a: '2', b: '', c: 'last' },
  ]);
});

test('missing trailing columns become empty strings', () => {
  assert.deepEqual(parseCsv('a,b\n1'), [{ a: '1', b: '' }]);
});
