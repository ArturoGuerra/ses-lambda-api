const dynamo = require('dynamodb');
const Joi = require('joi');

dynamo.AWS.config.update({ region: process.env.REGION })

exports.Keys = dynamo.define('seskeys', {
  hashKey: 'apikey',
  timestamps: false,
  schema: {
    apikey: Joi.string().required(),
    recipients: Joi.array().items(Joi.string().required()),
    source: Joi.string().required()
  },
  tableName: 'seskeys'
})

dynamo.createTables(err => {
  if (err) {
    console.error('Error creating table:' , err)
  } else {
    console.log('Created table')
  }
})

