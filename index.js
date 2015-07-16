'use strict';

var map = require('map-async'),
    isStream = require('is-stream'),
    concat = require('concat-stream');


module.exports = function (tape) {
  var Test = tape.Test;

  Object.defineProperty(Test.prototype, 'drain', {
    get: function () {
      var t = this;
      var drain = Object.create(Test.prototype);

      Object.keys(t).forEach(function (methodName) {
        var method = t[methodName];

        if (typeof method == 'function') {
          drain[methodName] = function () {
            var args = [].slice.call(arguments);

            map(args, function (arg, cb) {
              isStream.readable(arg)
                ? arg.pipe(concat({ encoding: 'string' }, cb.bind(null, null)))
                : cb(null, arg);
            }, function (err, args) {
              if (err) throw err;
              method.apply(t, args);
            });
          };
        }
      });

      return drain;
    }
  });

  return tape;
};
