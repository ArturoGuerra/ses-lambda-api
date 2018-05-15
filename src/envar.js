exports.host = process.env.HOST || '0.0.0.0'
exports.port = process.env.PORT || 3000
exports.socket = process.env.SOCKET || null
exports.dev = (!process.env.NODE_ENV === 'production')

