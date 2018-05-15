const { app } = require('./server.js');
const awsServerlessExpress = require('aws-serverless-express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

app.use(awsServerlessExpressMiddleware.eventContext());
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  event.headers['Accept-Encoding'] = 'identify'
  console.log('proxing event=', event)
  awsServerlessExpress.proxy(server, event, context)
}
