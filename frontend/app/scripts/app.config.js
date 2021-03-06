'use strict';

angular.module('webDev').config(function($urlRouterProvider, $stateProvider, $httpProvider,$authProvider,API_URL) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('main', {
        url: '/',
        templateUrl: '/views/main.html'
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    });

    $stateProvider.state('logout', {
        url: '/logout',
        controller: 'LogoutCtrl'
    });

    $stateProvider.state('jobs', {
        url: '/jobs',
        templateUrl: '/views/jobs.html',
        controller: 'JobsCtrl'
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    });

    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'register';

    $authProvider.google({
        clientId: '722023897432-95ds2ebis60ps8cgr4fdo64lka5i2uui.apps.googleusercontent.com',
        url: API_URL + 'auth/google'
    });

    $authProvider.facebook({
        clientId: '276192156049705',
        url: API_URL + 'auth/facebook',
        scope: ['public_profile', 'email', 'user_about_me', 'user_birthday', 'user_location']
    });

    $httpProvider.interceptors.push('authInterceptor');

})

.constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
    var params = $window.location.search.substring(1);

    if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
        var pair = params.split('=');
        var code = decodeURIComponent(pair[1]);

        $window.opener.postMessage(code, $window.location.origin);
    }
});
