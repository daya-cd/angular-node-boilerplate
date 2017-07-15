var nodemailer = require('nodemailer');
/**
 * component for email
 */
module.exports = function() {
    var transporter = nodemailer.createTransport({
        // host: 'feedback.creativetest.co.uk',
        service: "Gmail",
        port: 25,
        secure: false,
        ignoreTLS: true,
        rejectUnauthorized: false,
        auth: {
            
        }
    });

    return transporter;
};