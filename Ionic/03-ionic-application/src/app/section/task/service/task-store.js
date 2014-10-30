/**
 * @module task.service.store
 */
angular.module('task.service.store', [
        'service.underscore'
    ])

    .factory('taskStore', function (_) {
        'use strict';

        var store = [
            {id: 1, title: 'Farbe f. Wohnzimmer', description: 'Öko-Farbe muss es sein', date: '2014-10-30'},
            {id: 2, title: 'Elternsprechtag', description: '18 - 19:30 Uhr', date: '2014-10-28'},
            {id: 3, title: 'Geschäftsessen', description: 'Kreditkarte mitnehmen!', date: '2014-10-26'},
            {id: 4, title: 'Handy-Vertrag', description: 'Ist viel zu teuer', date: '2014-10-26'},
            {id: 5, title: 'Hotelreservierung', description: 'Mail an Office', date: '2014-10-22'},
            {id: 6, title: 'iOS-Developer Prog.', description: 'Verlängerung', date: '2014-10-21'},
            {id: 7, title: 'Blumen f. Mutter', description: 'Diesmal ein paar mehr!', date: '2014-10-19'},
            {id: 8, title: 'Wireframes, Abnahme', description: 'Roland annrufen',date: '2014-10-19'},
            {id: 9, title: 'Business-Plan', description: 'Herrn Koslowski einladen', date: '2014-10-18'},
            {id: 10, title: 'Release-Termin', description: 'Mail an das Team', date: '2014-10-16'},
            {id: 11, title: 'Konferenz-Talk', description: 'Vorbereitungen abschließen, Slides machen', date: '2014-10-16'},
            {id: 12, title: 'Business-Plan II', description: 'Abschluss-Gespräche', date: '2014-10-12'}
        ];

        var lastId = 12;

        // StoreItem constructor function, public
        var StoreItem = function (data) {
            if (!(this instanceof StoreItem)) {
                return new StoreItem(data);
            }

            this.id = data.id || null;
            this.title = data.title || '';
            this.description = data.description || '[ keine weiteren Infos ]';
            this.date = data.date || '';
        };

        StoreItem.prototype.setId = function () {
            this.id = lastId + 1;

            lastId = this.id;
        };

        // Private methods
        var query = function (params) {
            return _.where(store, params);
        };

        var getItemIndex = function (item) {
            return _.indexOf(store, item, true);
        };

        var createItem = function (data) {
            var item = new StoreItem(data);

            item.setId();
            store.unshift(item);

            return item;
        };

        var updateItem = function (item) {
            var index = getItemIndex(item);

            store[index] = item;

            return store[index];
        };

        // Public methods
        var save = function (data) {
            if(data.id) {
                return updateItem(data.id);
            } else {
                return createItem(data);
            }
        };

        var readAllItems = function () {
            return query({});
        };

        var readOneItem = function (id) {
            return query({id: +id})[0];
        };

        var countItems = function () {
            return store.length;
        };

        var deleteItem = function (item) {
            var index = getItemIndex(item);

            return store.splice(index, 1);
        };

        // reveal public API
        return {
            NewItem: StoreItem,
            save: save,
            readAll: readAllItems,
            readOne: readOneItem,
            count: countItems,
            delete: deleteItem
        }
    });
