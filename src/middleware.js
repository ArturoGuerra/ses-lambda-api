const { get } = require('./utils/database')

exports.validate = async (req, res, next) => {
  let keys = ['subject', 'message']
  if (req.headers['x-api-key']) {
    let accept = true
    for (let i = 0; i < keys.length; i++) {
      if (!req.body[keys[i]]) {
        accept = false
      }
    }
    if (!accept) {
      res.status(401).send('401: Forbidden, missing body attributes');
    } else {
      next()
    }
  } else {
    res.status(401).send('401: Forbidden, Missing x-api-key');
  }
}

exports.mailattr = async (req, res, next) => {
  try {
    const { recipients, source } = await get(req.headers['x-api-key'])
    req.recipients = recipients
    req.source = source
    next()
  } catch (e) {
    console.error(e)
    res.status(401).send('401: Forbidden, invalid api key')
  }
}
