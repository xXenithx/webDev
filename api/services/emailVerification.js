var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smptTransport = require('nodemailer-smtp-transport');
var config = require('./config.js');


var model = {
  verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
  title: 'webDev',
  subTitle: 'Thanks for signing up!',
  body: 'Please verify your email address by clicking the button below'
}

exports.send = function(email) {
    
    var payload = {
        sub: email
    }

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    var transporter = nodemailer.createTransport(smptTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: 'andybustos021@gmail.com',
        pass: config.SMTP_PASS
      }
    }));

    var mailOptions = {
      from: 'Accounts <andybustos021@gmail.com>',
      to: email,
      subject: 'webDev Accont Verification',
      html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function(err, info){
      if(err) return res.status(500, err);

      console.log('email sent', info.response);
    })
}

function getHtml(token){
  var path = './views/emailVerification.html';
  var html = fs.readFileSync(path, encoding = 'utf8');

  var template = _.template(html);

  model.verifyUrl + token;

  return template(model);
}

_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};