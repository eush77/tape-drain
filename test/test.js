'use strict';

var test = require('..')(require('tape'));

var stread = require('stread');


test(function (t) {
  t.drain.equal(stread('1'), '1');
  t.drain.notEqual(stread('1'), 1);
  t.drain.looseEqual(stread('1'), 1);
  t.end();
});
