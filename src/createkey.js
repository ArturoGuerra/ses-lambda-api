const { create } = require('./utils/database');

const raw_recipients = process.env.RECIPIENTS
const source = process.env.SOURCE
const recipients = raw_recipients.split(' ')

console.log(recipients, source)

create(recipients, source)
