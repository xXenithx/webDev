'use strict';

angular.module('webDev').controller('RegisterCtrl', function($scope, alert, $auth, $state) {
    $scope.submit = function() {

        $auth.signup({
            email: $scope.email,
            password: $scope.password
        }).then(function(res) {
            alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!' + 'Please check your email to verify your account within the next serveral days');
            $auth.login({
                email: $scope.email,
                password: $scope.password
            }).then(function() {
                $state.go('main');
            }).catch(handleError);
        }).catch(handleError);
    };

    function handleError(err) {
        alert('warning', 'Something went wrong :(', err.message);
    }
});