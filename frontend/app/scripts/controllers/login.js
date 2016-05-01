'use strict';

angular.module('webDev').controller('LoginCtrl', function($scope, alert, auth, $auth) {
    $scope.submit = function() {

        auth.login($scope.email, $scope.password)
            .success(function(res) {
                alert('success', 'Welcome', 'Thanks for coming back ' + res.user.email + '!');
            })
            .error(handleError);
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(res) {
            alert('success', 'Welcome', 'Thanks for coming back ' + res.data.user.displayName + '!');
        }, handleError);
    };

    function handleError(err) {
        alert('warning', 'Something went wrong :(', err.message);
    }
});