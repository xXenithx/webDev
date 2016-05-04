'use strict';

angular.module('webDev').controller('LoginCtrl', function($scope, alert, $auth, $state) {
    $scope.submit = function() {

        $auth.login({
            email: $scope.email,
            password: $scope.password
        }).then(function(res) {
            var message = 'Thanks for coming back ' + res.data.user.email + '!';
            if (!res.data.user.active) {
                message = 'Just a reminder, please activate your account soon :)';
            }
            alert('success', 'Welcome,', message);
            $state.go('main');
        }).catch(handleError);
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider).then(function(res) {
            alert('success', 'Welcome', 'Thanks for coming back ' + res.data.user.displayName + '!');
            $state.go('main');
        }, handleError);
    };

    function handleError(err) {
        alert('warning', 'Something went wrong :(', err.message);
    }
});