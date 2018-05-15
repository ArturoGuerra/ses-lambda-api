const { Keys } = require('../models');
const { apikeygen } = require('./index.js');

exports.get = (apikey) => {
  return new Promise((resolve, reject) => {
    Keys.get(apikey, (err, result) => {
      if (err) {
        reject(err)
      } else {
        if (!result) {
          reject('Invalid key')
        } else {
          resolve({
            recipients: result.get('recipients'),
            source: result.get('source')
          })
        }
      }
    })
  })
}

exports.create = async (recipients, source) => {
  return new Promise((resolve, reject) => {
    Keys.create({ apikey: apikeygen(), recipients: recipients, source: source }, { overwrite: false }, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

exports.update = async (apikey, recipients, source) => {
}

exports.delete = async (apikey) => {
}
