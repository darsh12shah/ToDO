

const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anunaynalam@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}



const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'anunaynalam@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    
}
