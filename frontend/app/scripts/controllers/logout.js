'use strict';

angular.module('webDev')
    .controller('LogoutCtrl', function(authToken, $state) {
        authToken.removeToken();
        $state.go('main');
    });