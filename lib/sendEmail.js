import sgMail from './sendgrid.js'

const sendEmail = async ({ to, from, subject, text, html, templateID, attachments }) => {
    try {
        console.log('send email to', { to });

        const emailResponse = await sgMail.sendMultiple({
            to,
            from,
            subject,
            text,
            html,
            template_id: templateID,
            attachments,
        })

        if (emailResponse?.[0]?.statusCode !== 202) {
            throw new Error(`Email not send, ${emailResponse.toString()}`)
        }

        console.log('send email success');
        return true

    } catch (err) {
        console.error('sendEmail', { err });

        return false
    }

}

export default sendEmail