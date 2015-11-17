var which = require('which')

var NOT_FOUND = 'could not find VBoxManage (or VboxManage)'

module.exports = function (cb) {
  which('VBoxManage', function (err, path) {
    if (err) return which('VboxManage', function (err, path) {
      if (err) return cb(Error(NOT_FOUND))
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
      throw Error(NOT_FOUND)
    }
  }
  return path
}
