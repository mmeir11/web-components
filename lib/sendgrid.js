const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY } = require('../consts')

sgMail.setApiKey(SENDGRID_API_KEY)

module.exports = sgMail