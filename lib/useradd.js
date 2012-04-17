var child_process = require('child_process');

module.exports = function useradd(options, callback) {
  if (typeof options === 'string') {
    options = { login: options };
  }

  var args = [];

  if (options.gid) {
    args.push('-g', options.gid);
  }

  if (typeof options.shell !== 'undefined') {
    if (options.shell === false) {
      args.push('-s', '/bin/false');
    }
    args.push('-s', options.shell);
  }

  args.push(options.login);

  var child = child_process.spawn(options.executable || 'useradd', args);
  child.on('exit', function (code) {
    if (code) {
      return callback(new Error('Invalid exit code: ' + code));
    }
    callback();
  });
};
