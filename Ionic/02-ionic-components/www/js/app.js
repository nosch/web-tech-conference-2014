// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
    .run(function ($ionicPlatform) {
        'use strict';

        $ionicPlatform.ready(function () {
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

    .constant('MESSAGES', [{
        from: 'Martina Habicht',
        subject: 'Re: Termin bestätigt',
        text: 'Vielen Dank, Herr Schmidt, für die',
        date: 'Gestern',
        isUnread: false,
        hasAttachment: false,
        wasAnswered: true
    }, {
        from: 'Pjotr Balierev',
        subject: 'Looking forward to your submission',
        text: 'Dear Sir, We confirm your proposal concerning',
        date: 'Montag',
        isUnread: false,
        hasAttachment: false,
        wasAnswered: false
    }, {
        from: 'Spotify',
        subject: 'You have cancelled your Spotify subcription',
        text: 'Du hast Dein Abonement storniert',
        date: 'Mittwoch',
        isUnread: false,
        hasAttachment: true,
        wasAnswered: false
    }, {
        from: 'Thomas',
        subject: 'Re: Fahrt nach München',
        text: 'Hallo Norbert, ich will sicherheitshalber nachfragen',
        date: '23.09.2014',
        isUnread: false,
        hasAttachment: false,
        wasAnswered: true
    }, {
        from: 'Scrum Alliance',
        subject: 'Annual Meetup',
        text: 'Dear Norbert, we invite you to join our',
        date: '12.09.2014',
        isUnread: false,
        hasAttachment: false,
        wasAnswered: false
    }])

    .controller('MainCtrl', function ($scope, $rootScope, $timeout) {
        'use strict';

        $scope.refreshText = 'E-Mails empfangen...';

        $timeout(function () {
            $scope.refreshText = 'Um 09:54 aktualisiert';
        }, 2000);

        $rootScope.$on('scroll.refreshComplete', function () {
            $scope.refreshText = 'Gerade aktualisiert';
        });
    })

    .controller('InboxCtrl', function (
        $scope,
        $rootScope,
        $timeout,
        $ionicActionSheet,
        $ionicListDelegate,
        MESSAGES
    ) {
        'use strict';

        $scope.messages = MESSAGES;

        $scope.hasNoData = false;

        $scope.refresh = function () {
            var newMessage = {
                from: 'Google Kalender',
                subject: 'Hinweis - Abgabe Artikel-Entwurf',
                text: '4. Oktober 2014 10:30',
                date: '10:15',
                isUnread: true,
                hasAttachment: false,
                wasAnswered: false
            };

            $scope.$parent.refreshText = 'E-Mails empfangen...';
            $scope.$apply();

            $timeout(function () {
                $scope.messages.unshift(newMessage);
                $scope.hasNoData = false;
                $rootScope.$broadcast('scroll.refreshComplete');
                $scope.$apply();
            }, 1000);
        };

        $scope.deleteMessage = function (index) {
            $scope.messages.splice(index, 1);

            if (!$scope.messages.length) {
                $timeout(function () {
                    $scope.hasNoData = true;
                    $rootScope.$broadcast('scroll.refreshComplete');
                    $scope.$apply();
                }, 500);
            }
        };

        $scope.showMessageOptions = function () {
            var hideSheet = $ionicActionSheet.show({
                cancelText: 'Abbrechen',
                buttons: [
                    {text: 'Antworten'},
                    {text: 'Weiterleiten'},
                    {text: 'Markieren'},
                    {text: 'Als gelesen markieren'},
                    {text: 'In "Werbung" bewegen'},
                    {text: 'E-Mail bewegen ...'}
                ],
                buttonClicked: function (index) {
                    switch (index) {
                        default:
                            $ionicListDelegate.closeOptionButtons();
                            return true;
                    }
                },
                cancel: function () {
                    $ionicListDelegate.closeOptionButtons();
                    return true;
                }
            });

            $timeout(function () {
                hideSheet();
            }, 3000);
        };
    });
