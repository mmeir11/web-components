const { sgMail } = require('./sendgrid')

const sendEmail = async ({ to, from, subject, text, html, templateID }) => {
    try {
        const emailResponse = await sgMail.sendMultiple({
            to,
            from,
            subject,
            text,
            html,
            template_id: templateID,
        })

        if (emailResponse?.[0]?.statusCode !== 202) {
            throw new Error(`Email not send, ${emailResponse.toString()}`)
        }

        return true

    } catch (err) {
        console.error('sendEmail', { err });

        return false
    }

}

module.exports = sendEmail