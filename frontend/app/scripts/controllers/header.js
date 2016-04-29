'use strict';

angular.module('webDev')
    .controller('HeaderCtrl', function($scope, authToken) {
        $scope.isAuthenticated = authToken.isAuthenticated;
    });