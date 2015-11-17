var which = require('which')

module.exports = function (cb) {
  which('VBoxManage', function (err, path) {
    if (err) return which('VboxManage', cb)
    cb(null, path)
  })
}
