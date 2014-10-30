/**
 * @module service.underscore
 */
angular.module('service.underscore', [])
    .factory('_', function($window) {
        'use strict';

        return $window._;
    });
