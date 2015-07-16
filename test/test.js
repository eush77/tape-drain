'use strict';

var test = require('..')(require('tape'));

var stread = require('stread');


test('string', function (t) {
  t.plan(3);
  t.drain.equal(stread('1'), '1');
  t.drain.notEqual(stread('1'), 1);
  t.drain.looseEqual(stread('1'), 1);
});


test('buffer', function (t) {
  t.plan(3);
  t.drain({ buffer: true }).notEqual(stread('data'), 'data');
  t.drain({ buffer: true }).notDeepEqual(stread('data'), 'data');
  t.drain({ buffer: true }).deepEqual(stread('data'), Buffer('data'));
});
