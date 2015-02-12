var AUCTION_HELPERS = function () {
    function formatToGUIDate( dateString ) {
        // from this format "2014-01-01T00:00:00.000Z",
        // to this          "01/01/2014"

        var datePart = dateString.split( 'T' )[0];
        var dateParts = datePart.split( '-' );
        var month = dateParts[1],
            day = dateParts[2],
            year = dateParts[0];

        return month + '/' + day + '/' + year;
    }

    function formatToRawDate( dateString ) {
        // from this format "01/01/2014"
        // to this          "2014-01-01T00:00:00.000Z"

        var dateParts = dateString.split( '/' );
        var month = !( _.isUndefined( dateParts[0] ) || _.isEmpty( dateParts[0] )) ? dateParts[0] : 0,
            day = !( _.isUndefined( dateParts[1] ) || _.isEmpty( dateParts[1] )) ? dateParts[1] : 0,
            year = !( _.isUndefined( dateParts[2] ) || _.isEmpty( dateParts[2] )) ? dateParts[2] : 0;

        return year + '-' + month + '-' + day + 'T00:00:00.000Z';
    }

    return {
        formatToGUIDate: formatToGUIDate,
        formatToRawDate: formatToRawDate
    };
}();
