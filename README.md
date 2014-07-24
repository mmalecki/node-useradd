# useradd [![Build Status](https://secure.travis-ci.org/mmalecki/node-useradd.png)](http://travis-ci.org/mmalecki/node-useradd)
`useradd` is a wrapper of `useradd` command line tool for adding users. It has a nice, sweet API.

## Installation

    npm install useradd

## Usage

```js
var useradd = require('useradd');
useradd('maciej'); // spawns `useradd maciej`
```

## Options

The argument to useradd can be a string mapped to `options.login` or an `options` object with the following:

* `.executable` - name or path of executable (default=useradd)
* `.spawnOptions` - `options` of childProcess.spawn, useful for logging if you override `stdio`
* `.gid` - id of the login's default group 
* `.groups` - string or array listing supplemental groups outside of the default group this login belongs to
* `.shell` - name or path of the login shell to use. Use `false` to disable (via `/bin/false`)
  * this is `false` instead of `nologin` due to old FTP servers sometimes treating `nologin` as a valid shell.
* `.home` - path to the home directory. This will not be created for you. User `false` to have no home.
* `.login` - name of the login
* `.unsafe` - don't attempt to check if group or login names are safe/valid

## Non-spawn

Sometimes it is convenient to get the argv for `useradd` without actually running the executable.

```
useradd.argvForOptions({login:'maciej',home:'/opt/local/app1'}); // ['-d', '/opt/local/app1', 'maciej']
```

