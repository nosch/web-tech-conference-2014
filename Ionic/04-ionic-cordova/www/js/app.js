/**
 * @module kitchenSink
 */
angular.module('kitchenSink', [
        'ionic',
        'ngCordova'
    ])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            'use strict';

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($compileProvider) {
        'use strict';

        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/start');

        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'view/start.tpl.html'
            })

            .state('camera', {
                url: '/camera',
                controller: 'CameraCtrl',
                templateUrl: 'view/camera.tpl.html'
            })

            .state('dialogs', {
                controller: 'DialogsCtrl',
                templateUrl: 'view/dialogs.tpl.html'
            })

            .state('network', {
                controller: 'NetworkCtrl',
                templateUrl: 'view/network.tpl.html'
            });
    })

    /**
     * 1. Camera plugin
     */

    // Access to device camera via ngCordova
    .controller('CameraCtrl', function ($scope, $cordovaCamera) {
        'use strict';

        $scope.takePicture = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 280,
                targetHeight: 280,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.photo = imageData;

                alert(imageData);
            }, function (err) {
                alert(err);
            });
        }
    })

    // Access to device camera via plain JS, but as a Angular service
    .factory('CameraService', function ($q) {
        'use strict';

        var getPicture = function (options) {
            var q = $q.defer();

            navigator.camera.getPicture(function (result) {
                q.resolve(result);
            }, function (err) {
                q.reject(err);
            }, options);

            return q.promise;
        };

        return {
            getPicture: getPicture
        };
    })

    /**
     * 2. Notifications plugin (native dialogs)
     */

    .controller('DialogsCtrl', function ($scope, $cordovaDialogs) {
        'use strict';

        $scope.showAlert = function () {
            $cordovaDialogs.alert('Are you sure?', 'Warning!', 'Yes').then(function () {
                console.log('Button YES');
            });
        };

        $scope.showConfirm = function () {
            $cordovaDialogs.confirm('You really want to log out?', 'Log out', ['Cancel', 'Log out'])
                .then(function (buttonIndex) {
                    switch (buttonIndex) {
                        case 0:
                            console.log('NO BUTTON');
                            break;
                        case 1:
                            console.log('Button CANCEL');
                            break;
                        case 2:
                            console.log('Button LOG OUT');
                            break;
                        default:
                            console.log('???');
                    }
                });
        };

        $scope.showPrompt = function () {
            $cordovaDialogs.prompt('Please, type in your user name:', 'User name required', ['Cancel', 'Save'], '')
                .then(function (result) {
                    console.log(result);
                });
        };
    })

    /**
     * 3. Native network plugin
     */

    .controller('NetworkCtrl', function ($scope, $cordovaNetwork) {
        'use strict';

        $scope.getNetworkType = function () {
            return $cordovaNetwork.getNetwork();
        };

        $scope.isOnline = function () {
            return !$cordovaNetwork.isOffline();
        };
    });
