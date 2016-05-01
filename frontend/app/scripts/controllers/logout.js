'use strict';

angular.module('webDev')
    .controller('LogoutCtrl', function($auth, $state) {
        $auth.logout();
        $state.go('main');
    });