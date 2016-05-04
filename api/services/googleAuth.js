var User = require('../models/User.js');
var request = require('request');
var config = require('./config.js');
var createSendToken = require('./jwt.js');

module.exports = function(req, res) {

    var url = 'https://www.googleapis.com/oauth2/v4/token';
    var apiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        code: req.body.code,
        grant_type: 'authorization_code',
        client_secret: config.GOOGLE_SECRET,
    };

    request.post(url, {
        json: true,
        form: params
    }, function(err, response, token) {
        var accessToken = token.access_token;
        var headers = {
            Authorization: 'Bearer ' + accessToken
        };

        request.get({
            url: apiUrl,
            headers: headers,
            json: true,
        }, function(err, response, profile) {
            User.findOne({
                googleId: profile.sub
            }, function(err, foundUser) {
                if (foundUser) {
                    return createSendToken(foundUser, res);
                }

                var newUser = new User();
                newUser.googleId = profile.sub;
                newUser.displayName = profile.name;

                newUser.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    createSendToken(newUser, res);
                })
            })
        })
    });
}