import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv } from './csv.ts';
import { toProducts } from './catalog.ts';

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

test('a byte-order mark before the header does not break the first column', () => {
  assert.deepEqual(parseCsv('﻿category,name\npipes,PVC'), [{ category: 'pipes', name: 'PVC' }]);
});

test('toProducts forgives owner typos: case/space in category and unit, ₹ and commas in price', () => {
  const [p] = toProducts('category,name_hi,name_en,brand,price,unit\n Pipes ,पाइप,Pipe,Prince,"₹1,250", Length \n');
  assert.deepEqual(p, { category: 'pipes', name_hi: 'पाइप', name_en: 'Pipe', brand: 'Prince', price: 1250, unit: 'length' });
});

test('toProducts: text or zero price means "ask for price", missing unit means piece, nameless rows are dropped', () => {
  const ps = toProducts('category,name_hi,name_en,brand,price,unit\npipes,,Elbow,,call,\ntanks,टंकी,,,0,piece\n,,,,,\n');
  assert.equal(ps.length, 2);
  assert.deepEqual([ps[0].price, ps[0].unit, ps[0].name_hi], [null, 'piece', 'Elbow']);
  assert.deepEqual([ps[1].price, ps[1].name_en], [null, 'टंकी']);
});
