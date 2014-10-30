/**
 * @module task
 */
angular.module('task', [
        'task.config'
    ])

    .controller('TaskListCtrl', function (
        items,
        $scope,
        $timeout,
        $state,
        $ionicActionSheet,
        $ionicListDelegate,
        taskStore
    ) {
        'use strict';

        this.items = items;

        this.showDetails = function (item) {
            $state.go('task.update', {id: item.id});
        };

        this.showForm = function () {
            $state.go('task.create');
        };

        this.showTaskOptions = function (item) {
            var hideSheet = $ionicActionSheet.show({
                cancelText: 'Abbrechen',
                buttons: [
                    {text: 'Als erledigt markieren'},
                    {text: 'Bearbeiten'},
                    {text: 'Deaktivieren'}
                ],
                buttonClicked: function (index) {
                    switch (index) {
                        case 0:
                            console.log('Als erledigt markiert!');
                            $ionicListDelegate.closeOptionButtons();
                            return true;
                            break;
                        case 1:
                            $state.go('task.update', {id: item.id});
                            $ionicListDelegate.closeOptionButtons();
                            return true;
                            break;
                        case 2:
                            console.log('Deaktiviert!');
                            $ionicListDelegate.closeOptionButtons();
                            return true;
                            break;
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

        this.deleteItem = function (index, item) {
            this.items.splice(index, 1);
            taskStore.delete(item);
        };
    })

    .controller('TaskFormCtrl', function (item, taskStore, $state) {
        'use strict';

        var itemCopy = angular.copy(item);

        this.item = item;

        this.heading = (!this.item.id) ? 'Neue Aufgabe' : 'Aufgabe bearbeiten';

        this.save = function () {
            if (this.item.title !== '' && this.item.date !== '') {
                taskStore.save(this.item);

                $state.go('task.list');
            }
        };

        this.reset = function () {
            angular.copy(itemCopy, this.item);

            $state.go('task.list');
        };
    });
