'use strict';

angular.module('webDev').service('auth', function($http, API_URL, authToken, $state) {
/*    var url = API_URL + 'login';*/

    function authSuccessful(res) {
        authToken.setToken(res.token);
        $state.go('main');
    }

    this.login = function(email, password) {
        return $http.post(API_URL + 'login', {
            email: email,
            password: password
        }).success(authSuccessful);
    }
    
    this.register = function(email, password) {
        return $http.post(API_URL + 'register', {
            email: email,
            password: password
        }).success(authSuccessful);
    }
});