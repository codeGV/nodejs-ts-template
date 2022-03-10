'use strict'
const nodemailer = require('nodemailer');

// send mail function
const sendMail = async (email, transporter, subject, text, html) => {
    const details = {
        from: 'advanceredsky@gmail.com',
        to: email,
        subject: subject,
        text: text,
        html: html
    }
    var info = await transporter.sendMail(details)
    console.log("INFO:::", info)
}

const create = async (model, context) => {
    const log = context.logger.start('services/contactUs')
    try {
        let contactUs = await new db.contactUs(model).save()

        // transporter
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'advanceredsky@gmail.com',
                pass: 'Google@45'
            }
        })

        const subject = "contact"
        const text = "details"

        const contactDetails = "<b>Name:</b>" + "  " + contactUs.name +"<br>"+
            "<b>Email:</b>" + "  " + contactUs.email +"<br>"+
            "<b>Phone:</b>" + "  " + contactUs.phone +"<br>"+
            "<b>QueryFor:</b>" + "  " + contactUs.queryFor +"<br>"+
            "<b>Message:</b>" + "  " + contactUs.message

        // call sendMail method
        await sendMail('redsky.atech@gmail.com', transporter, subject, text, contactDetails)

        log.end()
        return 'Mail send successfully'

    } catch (err) {
        log.end()
        throw new Error(err)
    }
}
exports.create = create