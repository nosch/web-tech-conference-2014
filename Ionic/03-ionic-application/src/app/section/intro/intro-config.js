/**
 * @module intro.config
 */
angular.module('intro.config', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $stateProvider
            .state('intro', {
                url: '/intro',
                templateUrl: 'app/section/intro/view/intro.tpl.html',
                controller: 'IntroCtrl as intro'
            })
    });
