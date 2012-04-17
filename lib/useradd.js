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
    else {
      args.push('-s', options.shell);
    }
  }

  if (typeof options.home !== 'undefined') {
    if (options.home === true) {
      args.push('-m');
    }
    else if (options.home === false) {
      args.push('-M');
    }
    else {
      args.push('-d', options.home);
    }
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
