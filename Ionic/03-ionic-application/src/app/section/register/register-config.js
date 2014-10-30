/**
 * @module register.config
 */
angular.module('register.config', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: 'app/section/register/view/register-form.tpl.html',
                controller: 'RegisterCtrl as register'
            })
    });
