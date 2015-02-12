var AUCTION_VIEW = function() {

	// store the id of the item id which is selected for modification
	// if it's '' or undefined then it means that there's no item selected for editing
	var ITEM_ID_SESSION = $('#itemIdSession');

	/**
	 *
	 */
	$( "#new_item" ).click( function () {
		$('.item_form').show();
		$('#item_form_title').html('Add New Item');
		populateItemForm('', '', '', '', '');
		ITEM_ID_SESSION.val('');
	});

	/**
	 * Simply hide the form when it's not needed
	 */
	$( "#hide_item_form" ).click( function () {
		$('.item_form').hide();
	});

	/**
	 * Handle the click event of the Save button of the item form
	 */
	$( "#save_item_button" ).click( function () {
		$( '.item_form' ).hide();
		var currentItemId = ITEM_ID_SESSION.val();

		if (!_.isEmpty( currentItemId ) && !_.isNaN( Number( currentItemId ) ) ) {
			var cmp = itemFormToJSON();
			var itemToModifyId = Number( ITEM_ID_SESSION.val() );
			var itemToScrollTo = itemToModifyId;
			AUCTION_PROXY.modifyItem(
				itemToModifyId,
				cmp.name,
				cmp.startDate,
				cmp.endDate,
				cmp.price,
				cmp.image
			);
			scrollToElement( '#del_' + itemToScrollTo );
		} else {
			addItem();
			scrollToElement( '#bottom_item_grid' );
		}
		renderItemGrid();
	});


	$("#item_display").html(
		function () {
			var user = AUCTION_PROXY.getUser();
			return 'Welcome <b>' + user.name + '</b><br>List of your items: ';
		}()
	);

	$("#start_date_datepicker").datepicker();
	$("#end_date_datepicker").datepicker();

	$.datepicker.setDefaults({
		showOn: "both",
		buttonImageOnly: true,
		buttonImage: "calendar.gif",
		buttonText: "Calendar"
	});

	// Initiate APP
	// render the Items GRID
	renderItemGrid();

	/**
	 * Scroll to a specific element by it's specified ID
	 */
	function scrollToElement( elID ) {
		window.scrollTo( 0, $( elID ).offset().top);
	}

	/**
	 * Render the data which is returned from the SERVER
	 * and is obtained through the proxy of the REST API
	 */
	function renderItemGrid() {

		AUCTION_DATA_AGGREGATOR.getItemData(function (itemData) {
			console.dir(itemData);
			$("#item_grid").html('');
			populateItemRows(itemData);
		});
	}

	/**
	 * Add all items (w/ stats)
	 * in a form of ROWS in a table/grid
	 */
	function populateItemRows( itemData ) {
		var sortedItemData = _.sortBy(itemData, function (cmp) {
			return cmp.id;
		});

		$("#item_grid").html('');
		_.each(sortedItemData, function (eachItem) {
			var cId = eachItem.id,
				cName = eachItem.name,
				cSDate = eachItem.startDate,
				cEDate = eachItem.endDate,
				cPrice = eachItem.price,
				cImgUrl = eachItem.image,
				cBids = !_.isUndefined(eachItem.stats) ? eachItem.stats[0].bids : 'N/A',
				cWins = !_.isUndefined(eachItem.stats) ? eachItem.stats[0].wins : 'N/A',
				cClicks = !_.isUndefined(eachItem.stats) ? eachItem.stats[0].clicks : 'N/A';

			var row = '<div class="col-md-1">' + cId + '</div>' +
					'<div class="col-md-2">' + cName + '</div>' +
					'<div class="col-md-1">' + AUCTION_HELPERS.formatToGUIDate( cSDate ) + '</div>' +
					'<div class="col-md-1">' + AUCTION_HELPERS.formatToGUIDate( cEDate ) + '</div>' +
					'<div class="col-md-1">' + cPrice + '</div>' +
					'<div class="col-md-1">' + cBids + '</div>' +
					'<div class="col-md-1">' + cWins + '</div>' +
					'<div class="col-md-1">' + cClicks + '</div>' +
					'<div class="col-md-1"><img class="img-thumbnail" src="' + cImgUrl + '"></div>' +
					'<div class="col-md-1"><button type="button" class="btn btn-default btn-xs delete_button" id="del_' + cId + '">Delete</button></div>' +
					'<div class="col-md-1"><button type="button" class="btn btn-default btn-xs edit_button" id="ed_' + cId + '">Edit</button></div>';
			var rowHtml = '<div class="row highlight item_row">' + row + '</div>';

			$("#item_grid").append( rowHtml );
			$("#del_" + cId).click(function () {
				AUCTION_PROXY.deleteItem( cId );
				renderItemGrid();
			});
			$("#ed_" + cId).click(function () {
				loadInItemForm( cId );
				scrollToElement( '#item_form' );
			});
		});
	}

	/**
	 * Populate the field of the form according to the specified arguments
	 */
	function populateItemForm( name, startDate, endDate, price, image ) {
		$("#inputItemName").val( name );
		$("#start_date_datepicker").val(!_.isEmpty( startDate ) ? AUCTION_HELPERS.formatToGUIDate( startDate ) : '');
		$("#end_date_datepicker").val(!_.isEmpty( endDate ) ? AUCTION_HELPERS.formatToGUIDate( endDate ) : '');
		$("#inputItemPrice").val( price );
		$("#inputItemImageURL").val( image );
	}

	/**
	 * Make the form visible and
	 * populate the fields of the item form with the values returned from the server
	 * This is to be used for editing the item.
	 */
	function loadInItemForm( itemId ) {
		// make the form VISIBLE if it's hidden
		$('.item_form').show();

		var itemToLoad = AUCTION_PROXY.getItemById( itemId );

		$('#item_form_title').html('Modify item <b>' + itemToLoad.name + '</b> [id: ' + itemId + ']');
		populateItemForm( itemToLoad.name,
			itemToLoad.startDate,
			itemToLoad.endDate,
			itemToLoad.price,
			itemToLoad.image
		);

		ITEM_ID_SESSION.val( itemToLoad.id );
	}

	/**
	 * Get values of the fields from the form
	 * and return an object enclosing those values
	 */
	function itemFormToJSON() {
		var formJSON = {};
		formJSON.name = $("#inputItemName").val();
		formJSON.startDate = AUCTION_HELPERS.formatToRawDate( $("#start_date_datepicker").val() );
		formJSON.endDate = AUCTION_HELPERS.formatToRawDate( $("#end_date_datepicker").val() );
		formJSON.price = $("#inputItemPrice").val();
		formJSON.image = $("#inputItemImageURL").val();
		return formJSON;
	}

	/**
	 * Send a request to server for adding a new item
	 * with the values which are populated in the GUI form
	 *
	 * Returns the id of the new item
	 */
	function addItem() {
		var formJson = itemFormToJSON();
		var ncName = formJson.name,
			ncStartDate = formJson.startDate,
			ncEndDate = formJson.endDate,
			ncPrice = formJson.price,
			ncImageURL = formJson.image;

		return AUCTION_PROXY.insertNewItem(ncName, ncStartDate, ncEndDate, ncPrice, ncImageURL);
	}
}();
