[![npm](https://nodei.co/npm/tape-drain.png)](https://npmjs.com/package/tape-drain)

# tape-drain

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Plugin for [tape] that adds wrappers for assertion methods that automatically consume streams in the argument position.

Write

```js
t.drain.equal(stream, 'data');
```

instead of

```js
stream.pipe({ encoding: 'string' }, function (data) {
  t.equal(data, 'data');
});
```

Less boilerplate, cleaner tests!

[tape]: https://github.com/substack/tape

[travis]: https://travis-ci.org/eush77/tape-drain
[travis-badge]: https://travis-ci.org/eush77/tape-drain.svg
[david]: https://david-dm.org/eush77/tape-drain
[david-badge]: https://david-dm.org/eush77/tape-drain.png

## Example

```js
var tape = require('tape');
var test = require('tape-drain')(tape);

test('subject', function (t) {
  // Consume stream and make an assertion.
  t.drain.equal(stream, 'content');

  // Consume both streams and make an assertion.
  t.drain.looseEqual(stream1, stream2);

  // Consume stream in "buffer mode" and make an assertion.
  t.drain({ buffer: true }).same(stream, data);
});
```

## API

#### `tape = tapeDrain(tape)`

Adds `tape.Test.prototype.drain` and returns modified `tape` instance.

#### `t.drain['method']`

- `'method'` — any method of a `tape.Test` instance (most of the tape's API, including `equal`, `deepEqual`, `looseEqual` and other methods and aliases).

Consumes any streams passed in the arguments and calls the original `method` with stream arguments replaced with their actual content.

Note that the drain wrapper is asynchronous, and so you should use `t.plan` rather than `t.end` when using it.

#### `t.drain([opts])['method']`

Options:

##### `opts.buffer`

Type: `Boolean`<br>
Default: `false`

Replace streams with buffers rather than with strings.

## Install

```
npm install tape-drain
```

## License

MIT
