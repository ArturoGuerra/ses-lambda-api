const fs = require('fs');
const hat = require('hat');
const { host, port, socket } = require('../envar')

const apikeygen = exports.apikeygen = hat.rack()

exports.startServer = (server) => {
  if (socket) {
    if (fs.existsSync(socket)) {
      fs.unlinkSync(socket)
    }
    server.listen(socket, () => { console.log('Server listening on ' + socket) })
    fs.chmodSync(socket, '0777')
  } else {
    server.listen(port, host, () => {
      console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
    })
  }
}
