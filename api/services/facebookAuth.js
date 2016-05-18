var request = require('request');
var qs = require('querystring');
var createSendToken = require('./jwt.js');
var config = require('./config.js');
var User = require('../models/User.js');


module.exports = function(req, res) {
    var accessTokenUrl = 'https://graph.facebook.com/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.FACEBOOK_SECRET,
        code: req.body.code
    };

    console.log(params);

    request.get({
        url: accessTokenUrl,
        qs: params
    }, function(err, response, accessToken) {
        console.log('BEFORE PARSE');
        console.log(accessToken);


        accessToken = qs.parse(accessToken);
        var qsParams = {
            access_token: accessToken.access_token,
            expires: accessToken.expires,
            fields: 'id, name, email, first_name,gender, picture, birthday, bio, location'
        };
        console.log(accessToken);

        request.get({
            url: graphApiUrl,
            qs: qsParams,
            json: true
        }, function(err, response, profile) {
            console.log(profile);
            // console.log(response);
            User.findOne({
                facebookId: profile.id
            }, function(err, existingUser) {
                if (existingUser) {
                    return createSendToken(existingUser, res);
                }

                var newUser = new User();
                newUser.facebookId = profile.id;
                newUser.displayName = profile.name;

                newUser.save(function(err) {
                    createSendToken(newUser, res);
                })
            })

        })
    });
};