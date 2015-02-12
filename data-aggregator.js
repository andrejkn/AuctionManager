/*
    This module uses the AUCTION_PROXY module to get the data
    and prepare it for the GUI
 */

var AUCTION_DATA_AGGREGATOR = function () {
    function getItemData(cb) {
        Q.fcall(AUCTION_PROXY.getStatistics)
            .then(function (statistics) {

                /**
                 * Return an array of statistics grouped by item_id
                 */
                return _.groupBy( statistics, function ( singleStat ) {
                    return singleStat.item_id;
                });
            })
            .then( function ( idToStatMap ) {
                var user = AUCTION_PROXY.getUser();

                // only get the items for the current user (the authenticated user who's operating the app)
                var camps = AUCTION_PROXY.getItemsForUser( user.id );

                var mergeResults = merger( camps, idToStatMap );
                return mergeResults
            })
            .then( function ( itemWithStats ) {
                var sortedItemsById = _.sortBy( itemWithStats, function ( camp ) {
                    return camp.id;
                });
                return sortedItemsById;
            })
            .then( function ( sortedItemsById ) {
                // let a callback handle the complete items data
                cb( sortedItemsById );
            });
    }

    /**
     * Merge the items and statistics so that the stats for each item is part of the
     * item object in the items collection
     */
    function merger( items, statsMap ) {
        return _.each(items, function ( item ) {
            item.stats = statsMap[item.id];
        })
    }

    /**
     * Expose the getter function for the complete items data
     */
    return {
        getItemData: getItemData
    }
}();
