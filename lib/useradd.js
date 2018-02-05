var child_process = require('child_process');

var safe_login_re = /^[a-z_][a-z0-9_]{0,30}$/i;
var safe_group_re = /^[a-z0-9_]{0,31}$/i;

module.exports = function useradd(options, callback) {
  module.exports.argvForOptions(options, function (err, argv) {
    if (err) callback(err);

    var child = child_process.spawn(options.executable || 'useradd', argv, options.spawnOptions);

    child.on('exit', function (code) {
      var err;

      if (code) {
        err = new Error('Invalid exit code: ' + code);
        err.code = code;
        return callback(err);
      }
      callback();
    });
  })
};

module.exports.argvForOptions = function (options, cb) {
  if (typeof options === 'string') {
    options = { login: options };
  }

  if (!safe_login_re.test(options.login) && !options.unsafe) {
    return cb(new Error('Invalid login name: ' + options.login));
  }

  var args = [];

  if (options.gid) {
    args.push('-g', options.gid);
  }

  if (options.groups) {
    var groups = options.groups, err;
    if (!Array.isArray(groups)) {
      groups = String(groups).split(',');
    }
    groups = groups.map(function (s) {
      if (err) return;
      if (!safe_group_re.test(s) && !options.unsafe) {
        err = new Error('Invalid group name: ' + s);
        return '';
      }
      return String(s).trim();
    }).join(',');
    if (err) return cb(err);
    args.push('-groups', groups);
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
      if (process.platform !== 'sunos') {
        //
        // SunOS doesn't support -M and doesn't create home directory by
        // default.
        //
        args.push('-M');
      }
    }
    else {
      args.push('-d', options.home);
    }
  }

  args.push(options.login);
  
  return cb(null, args);
}
