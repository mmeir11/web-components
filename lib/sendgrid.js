import sgMail from '@sendgrid/mail'
// import * as sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../constants.js'

sgMail.setApiKey(SENDGRID_API_KEY)

export default sgMail