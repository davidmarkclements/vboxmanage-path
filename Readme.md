# vboxmanage-path

Reliably determines the path of VBoxManage (or VboxManage for older versions on linux)

## Usage

```js
var vmp = require('vboxmanage-path')

vmp(function (err, path) {
  if (err) return console.error(err)
  console.log(path)
})
```
