var which = require('which')

var NOT_FOUND = 'could not find VBoxManage (or VboxManage)'

module.exports = function (cb) {
  which('VBoxManage', function (err, path) {
    if (err) return which('VboxManage', function (err, path) {
      if (err) {
        if (process.platform !== 'win32') {
          return cb(Error(NOT_FOUND))
        }

        return win(cb)
      }
      cb(null, path)
    })
    cb(null, path)
  })
}

module.exports.sync = function () { 
  var path
  try { 
    path = which.sync('VBoxManage') 
  } catch (e) {
    try { 
      path = which.sync('VboxManage')  
    } catch (e2) {
      if (process.platform !== 'win32') {
        throw Error(NOT_FOUND)
      }
      path = winSync()
    }
  }
  if (!path) throw Error(NOT_FOUND)
  return path
}

function winSync() {
  var spawn = require('spawn-sync')
  var cmd
  try {
    cmd = which.sync('cmd')
  } catch (e) {
    cmd = which.sync('command')
  }
  var result = spawn(cmd, ['/k', 'dir', 'VBoxManage.exe', '/s', '/b'], {cwd: '\\'})
  if (result.status) {
    throw result.error
  }
  var path = (result.output + '').split('\r')[0].replace(/^,/,'')
  try {
    path = which.sync(path)
  } catch (e) {
    throw Error(NOT_FOUND)
  }
  return path
}

function win(cb) {
  var spawn = require('child_process').spawn
  which('cmd', function (err, cmd) {
    if (err) {
      return which('command', function (err, cmd) {
        if (err) return cb(err)
        locate(cmd, cb)
      })
    }
    locate(cmd, cb)
  })

  function locate(cmd, cb) {
    var child = spawn(cmd, ['/k', 'dir', 'VBoxManage.exe', '/s', '/b'], {cwd: '\\'})
    var path 
    child.stdout.once('data', function (output) {
      path = (output + '').split('\r')[0].replace(/^,/,'')
      which(path, function (err) {
        if (err) return cb(NOT_FOUND) 
        child.kill()
      })
    })

    child.on('exit', function (code) {
      if (code || !path) return cb(Error(NOT_FOUND)) 
      cb(null, path)
    })

  }


}
