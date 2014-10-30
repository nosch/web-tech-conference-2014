/**
 * @module task.config
 */
angular.module('task.config', [
        'task.service.store'
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $stateProvider
            .state('task', {
                abstract: true,
                url: '/task',
                templateUrl: 'app/section/task/view/task.tpl.html'
            })

            .state('task.list', {
                url: '',
                templateUrl: 'app/section/task/view/task-list.tpl.html',
                controller: 'TaskListCtrl as taskList',
                resolve: {
                    items: ['taskStore', function (taskStore) {
                        return taskStore.readAll();
                    }]
                }
            })

            .state('task.update', {
                url: '/edit/:id',
                templateUrl: 'app/section/task/view/task-form.tpl.html',
                controller: 'TaskFormCtrl as taskForm',
                resolve: {
                    item: ['taskStore', '$stateParams', function (taskStore, $stateParams) {
                        return taskStore.readOne($stateParams.id);
                    }]
                }
            })

            .state('task.create', {
                url: '/new',
                templateUrl: 'app/section/task/view/task-form.tpl.html',
                controller: 'TaskFormCtrl as taskForm',
                resolve: {
                    item: ['taskStore', function (taskStore) {
                        return taskStore.NewItem({});
                    }]
                }
            })
    });
