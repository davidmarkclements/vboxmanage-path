var cp = require('child_process')
if (process.platform !== 'win32') { return }

cp.exec('npm install spawn-sync --production', function (err, stdout, stderr) {
  if (err) return process.exit(~console.error(err))
  if (stderr) console.error(stderr)
  if (stdout) console.log(stdout)
})
