/**
 * @module application.config
 */
angular.module('application.config', [
        'ionic',
        'ngCordova',
        'template.app',
        'intro',
        'register',
        'login',
        'task'
    ])

    .run(function ($ionicPlatform, $cordovaStatusbar, $cordovaSplashscreen) {
        'use strict';

        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            $cordovaStatusbar.hide();

            setTimeout(function () {
                $cordovaSplashscreen.hide();
                $cordovaStatusbar.show();
            }, 1000)
        });
    })

    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/intro');
    });
