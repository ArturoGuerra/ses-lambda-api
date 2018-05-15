const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');
const { dev } = require('./envar');
const { validate, mailattr } = require('./middleware');
const { sendTextEmail } = require('./mailer');
const { startServer } = require('./utils');

require('dotenv').config()

const app = exports.app = new express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/post', validate, mailattr, async (req, res, next) => {
  let subject = req.body.subject
  let message = req.body.message
  let recipients = req.recipients
  let source = req.source
  try {
    let result = await sendTextEmail(subject, message, recipients, source)
    console.log('Email:', result, `${source}:${recipients}:${req.headers['x-api-key']}`)
    res.send('Email sent successfully')
  } catch (e) {
    res.status(401).send(e)
  }
})

if (require.main === module) {
  const httpServer = http.createServer(app);
  startServer(httpServer)
}
