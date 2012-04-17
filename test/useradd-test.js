var events = require('events'),
    child_process = require('child_process'),
    test = require('tap').test,
    useradd = require('../lib/useradd');

function mockSpawn(t, assertExec, assertArgs) {
  return function (name, args) {
    t.equal(name, assertExec);
    t.deepEqual(args, assertArgs);

    var emitter = new events.EventEmitter();
    process.nextTick(function () {
      emitter.emit('exit', 0);
    });
    return emitter;
  };
}

function assertSpawns(desc, options, exec, args) {
  test(desc, function (t) {
    child_process.spawn = mockSpawn(t, exec, args);

    useradd(options, function (err) {
      t.ok(!err, 'there should be no error');
      t.end();
    });
  });
}

assertSpawns('when used with just a login', 'maciej', 'useradd', ['maciej']);

assertSpawns('when used with options object with just a login', {
  login: 'maciej'
}, 'useradd', ['maciej']);

assertSpawns('when given a shell', {
  login: 'maciej',
  shell: '/bin/zsh'
}, 'useradd', ['-s', '/bin/zsh', 'maciej']);

assertSpawns('when given `shell === false`', {
  login: 'maciej',
  shell: false
}, 'useradd', ['-s', '/bin/false', 'maciej']);

assertSpawns('when given `home === true`', {
  login: 'maciej',
  home: true
}, 'useradd', ['-m', 'maciej']);

assertSpawns('when given `home === false`', {
  login: 'maciej',
  home: false
}, 'useradd', ['-M', 'maciej']);

assertSpawns('when given a home directory', {
  login: 'maciej',
  home: 'hello'
}, 'useradd', ['-d', 'hello', 'maciej']);
