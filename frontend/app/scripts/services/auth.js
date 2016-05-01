'use strict';

angular.module('webDev').service('auth', function($http, API_URL, authToken, $state, $window,$q) {

    function authSuccessful(res) {
        authToken.setToken(res.token);
        $state.go('main');
    }

    this.login = function(email, password) {
        return $http.post(API_URL + 'login', {
            email: email,
            password: password
        }).success(authSuccessful);
    };

    this.register = function(email, password) {
        return $http.post(API_URL + 'register', {
            email: email,
            password: password
        }).success(authSuccessful);
    };

    var urlBuilder = [];

    var clientId = '722023897432-95ds2ebis60ps8cgr4fdo64lka5i2uui.apps.googleusercontent.com';

    urlBuilder.push('response_type=code',
        'client_id=' + clientId,
        'redirect_uri=' + window.location.origin,
        'scope=profile email');

    this.googleAuth = function() {

        console.log('here');
        var url = 'https://accounts.google.com/o/oauth2/v2/auth?' + urlBuilder.join('&');
        var options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 + ', top=' + ($window.outerHeight) / 2.5;

        var deferred = $q.defer();

        var popup = $window.open(url, '', options);
        $window.focus();

        $window.addEventListener('message', function(event) {
            if (event.origin === $window.location.origin) {
                var code = event.data;
                popup.close();

                $http.post(API_URL + 'auth/google', {
                    code: code,
                    clientId: clientId,
                    redirectUri: window.location.origin
                }).success(function(jwt){
                    authSuccessful(jwt);
                    deferred.resolve(jwt);
                });
            }
        });
        return deferred.promise;
    };
});