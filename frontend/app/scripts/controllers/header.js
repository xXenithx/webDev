'use strict';

angular.module('webDev')
    .controller('HeaderCtrl', function($scope, $auth) {
        $scope.isAuthenticated = $auth.isAuthenticated;
    });