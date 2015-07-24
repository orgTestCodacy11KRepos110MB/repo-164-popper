#!/usr/bin/env node
var run      = require('child_process').spawn
  , keys     = require('utilise/keys')
  , file     = require('utilise/file')
  , is       = require('utilise/is')
  , sauce    = require('./sauce')
  , yaml     = require('js-yaml').safeLoad
  , popper   = require('./index')
  , argv     = require('minimist')(process.argv.slice(2))
  , port     = argv.t || argv.port
  , browsers = argv.b || argv.browsers
  , tests    = argv.t || argv.tests
  , help     = argv.h || argv.help
  , exists   = require('fs').existsSync
  , config   = exists('.popper.yml') ? yaml(file('.popper.yml')) : {}
  , script   = exists('popper.js')

if (help) return usage()
if (browsers) config.browsers = is.str(browsers) ? browsers.split(',') : []
if (tests) config.tests = tests
if (port) config.port = port
  
return script ? run('sh', ['-c', 'popper.js'], {stdio: 'inherit'})
     : popper(config) 

function usage(){
  console.error('')
  console.error(' usage: popper')
  console.error('')
  console.error(' options:')
  console.error('    -b, --browsers: browser to spawn and run tests on, default none')
  console.error('    -t, --test: command to generate test bundle, defaults to "browserify test.js"')
  console.error('    -p, --port: port to run on, default to 1945')
  console.error('    -w, --watch: files to watch for changes, default to .')
  process.exit(1)
}
