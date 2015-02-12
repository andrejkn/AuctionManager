/*
	This module encapsulates functions which interact with the REST API
	in our case we have three data holders:
	1. items
	2. statistics
	3. user
	These data holders simulate the returned results from the server as a result of interacting with the RestAPI

	The proxy not that only allows us to get data, but it can also modify it:
	1. we can add new items
	2. modify existing items
	3. delete existing items
 */

var AUCTION_PROXY = function() {
	var items = [
		{
			"id": 1,
			"name": "My First Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 100.0,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/lincoln-town-car-thumbnail.jpg",
			"user_id": 1
		},
		{
			"id": 2,
			"name": "My Second Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 103.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 4,
			"name": "My Fourth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 60.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 5,
			"name": "My Fifth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 30.0,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/lincoln-town-car-thumbnail.jpg",
			"user_id": 1
		},
		{
			"id": 3,
			"name": "My Third Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 74.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 6,
			"name": "My Sixth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 174.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 7,
			"name": "My Seventh Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 714.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 9,
			"name": "My Ninth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 47.0,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/lincoln-town-car-thumbnail.jpg",
			"user_id": 1
		},
		{
			"id": 8,
			"name": "My Eighth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 66.0,
			"image": "https://0.s3.envato.com/files/35444584/green%20custom%20car_thumbnail.jpg",
			"user_id": 1
		},
		{
			"id": 10,
			"name": "My Tenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 114.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 11,
			"name": "My Eleventh Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 89.0,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/escalade_esv-thumbnail.png",
			"user_id": 1
		},
		{
			"id": 12,
			"name": "My Twelfth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 2003.0,
			"image": "https://0.s3.envato.com/files/35444584/green%20custom%20car_thumbnail.jpg",
			"user_id": 1
		},
		{
			"id": 13,
			"name": "My Thirteenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 327.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 15,
			"name": "My Fifteenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 200.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 14,
			"name": "My Fourteenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 99.0,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/escalade_esv-thumbnail.png",
			"user_id": 1
		},
		{
			"id": 16,
			"name": "My Sixteenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 56.8,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 17,
			"name": "My Seventeenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 88.09,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/escalade_esv-thumbnail.png",
			"user_id": 1
		},
		{
			"id": 18,
			"name": "My Eighteenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 7.4,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		},
		{
			"id": 19,
			"name": "My Nineteenth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 412.12,
			"image": "http://www.limmo.ca/wp-content/uploads/2013/04/escalade_esv-thumbnail.png",
			"user_id": 1
		},
		{
			"id": 20,
			"name": "My Twentieth Item",
			"startDate": "2014-01-01T00:00:00.000Z",
			"endDate": "2024-12-31T00:00:00.000Z",
			"price": 4.0,
			"image": "http://images-2.drive.com.au/2013/04/03/4161070/hennessey-venom-320-90x60.jpg",
			"user_id": 1
		}
	];
	var statistics = [
		{
			"item_id": 3,
			"bids": 312,
			"wins": 287,
			"clicks": 32
		},
		{
			"item_id": 1,
			"bids": 217,
			"wins": 184,
			"clicks": 2
		},
		{
			"item_id": 2,
			"bids": 562,
			"wins": 391,
			"clicks": 65
		},
		{
			"item_id": 4,
			"bids": 1339,
			"wins": 1187,
			"clicks": 32
		},
		{
			"item_id": 5,
			"bids": 1917,
			"wins": 1582,
			"clicks": 102
		},
		{
			"item_id": 6,
			"bids": 123,
			"wins": 827,
			"clicks": 23
		},
		{
			"item_id": 8,
			"bids": 652,
			"wins": 319,
			"clicks": 56
		},
		{
			"item_id": 10,
			"bids": 1393,
			"wins": 817,
			"clicks": 28
		},
		{
			"item_id": 9,
			"bids": 1197,
			"wins": 815,
			"clicks": 120
		},
		{
			"item_id": 13,
			"bids": 3112,
			"wins": 2187,
			"clicks": 132
		},
		{
			"item_id": 11,
			"bids": 2170,
			"wins": 1840,
			"clicks": 20
		},
		{
			"item_id": 12,
			"bids": 652,
			"wins": 319,
			"clicks": 36
		},
		{
			"item_id": 14,
			"bids": 139,
			"wins": 117,
			"clicks": 3
		},
		{
			"item_id": 15,
			"bids": 1971,
			"wins": 1782,
			"clicks": 101
		},
		{
			"item_id": 16,
			"bids": 2312,
			"wins": 2287,
			"clicks": 232
		},
		{
			"item_id": 20,
			"bids": 2056,
			"wins": 1039,
			"clicks": 5
		},
		{
			"item_id": 19,
			"bids": 133,
			"wins": 118,
			"clicks": 3
		},
		{
			"item_id": 17,
			"bids": 197,
			"wins": 152,
			"clicks": 12
		}
	];
	var user = {
		"id": 1,
		"name": "Test User",
		"balance": 2148.42
	};

	function getAllitems() {
		return items;
	}

	function getItemById( itemId ) {
		return _.find( items, function( item ) {
			return item.id === itemId;
		})
	}

	function getItemsForUser( userId ) {
		var allitems = getAllitems();

		return _.filter(allitems, function ( item ) {
			return item.user_id === userId;
		});
	}

	function getStatistics() {
		return statistics;
	}

	function getUser() {
		return user;
	}

	function createNewStatistics( newItem ) {
		/*
		 Send request to server by calling the REST API
		 e.g. /new_statistics/:item_id
		 where item_id = newItem.id
		 The server would respond with an object:
		 e.g.
		 {
			 "item_id": newItem.id,
			 "bids": 0,
			 "wins": 0,
			 "clicks": 0
		 }
		 */

		return {
			"id": generateNewUniqueId( statistics ),
			"item_id": newItem.id,
			"bids": 0,
			"wins": 0,
			"clicks": 0
		}
	}

	function generateNewUniqueId( dataArray ) {
		// We will use this function to help us simulate a specific server functionality.
		// Usually the server would insert a new entry in a database
		// and return the id of the new entry to the front-end
		// in relational DB we would use AUTO_INCREMENT id to
		// ensure that the id of the new entry is unique
		// However, since we don't have access to the DB we can use
		// this function to get new unique ID

		var id = dataArray.length + 1;
		while( true ) {

			var idFound = _.find( dataArray, function( singleChunk ) {
				return singleChunk.id === id;
			});

			if( _.isUndefined( idFound )) {
				return id;
			}

			id += 1;
		}
	}

	function createNewItem( ncName, ncStartDate, ncEndDate, ncPrice, ncImageURL ) {
		console.log('Create new item: %s %s %s %s %s',
			ncName, ncStartDate, ncEndDate, ncPrice, ncImageURL);

		/*
		 Send a request to the server to create a new item with the specified parameters
		 as specified in createNewItem( ncName, ncStartDate, ncEndDate, ncPrice, ncImageURL )

		 e.g. /newItem/:name/:start_date/:end_date/:price/:imageURL

		 The server would return an object, to the front-end, such as the one below
		 {
			 "id": id_of_the_new_item,
			 "name": ncName,
			 "startDate": ncStartDate,
			 "endDate": ncEndDate,
			 "price": ncPrice,
			 "image": ncImageURL,
			 "user_id": the_id_of_the_current_user
		 }

		 The new item object, returned from the server, would contain a new unique id.
		 That id will be determined by the backend software
		 */

		// now we create a new statistics for the new item
		var newItem = {
			"id": generateNewUniqueId( items ),
			"name": ncName,
			"startDate": ncStartDate,
			"endDate": ncEndDate,
			"price": ncPrice,
			"image": ncImageURL,
			"user_id": user.id
		};

		return newItem;
	}

	function modifyItem( itemId, newName, newStartDate, newEndDate, newPrice, newImageURL ) {
		var itemToModify = getItemById( itemId );
		var oldName = itemToModify.name;

		if( !_.isEmpty( newName ) && !_.isUndefined( newName ) ) {
			itemToModify.name = newName;
		}

		if( !_.isEmpty( newStartDate ) && !_.isUndefined( newStartDate ) ) {
			itemToModify.startDate = newStartDate;
		}

		if( !_.isEmpty( newEndDate ) && !_.isUndefined( newEndDate ) ) {
			itemToModify.endDate = newEndDate;
		}

		if( !_.isNaN( Number( newPrice ) ) && !_.isUndefined( newPrice ) ) {
			itemToModify.price = newPrice;
		}

		if( !_.isEmpty( newImageURL ) && !_.isUndefined( newImageURL ) ) {
			itemToModify.image = newImageURL;
		}

		console.log( 'Modified CAMPAIGN ' + oldName + ' id: ' + itemToModify.id );
		console.log( 'new name: %s \nnew start date: %s \nnew end date: %s \nnew price: %s \nnew image URL: %s\n',
			itemToModify.name,
			itemToModify.startDate,
			itemToModify.endDate,
			itemToModify.price,
			itemToModify.image
		);

	}

	function insertNewItem( name, sDate, eDate, price, image ) {
		var newItem = createNewItem( name, sDate, eDate, price, image );
		var newStats = createNewStatistics( newItem );

		items.push( newItem );
		statistics.push( newStats );

		return newItem.id;
	}

	function deleteItem( itemId ) {
		var toDelete = getItemById( itemId );
		console.log( 'Deleted item ' + toDelete.name + ' id: ' + toDelete.id );

		for( var i = 0; i < items.length; i += 1 ) {
			if( items[i].id === itemId ) {
				items.splice( i, 1 );
				break;
			}
		}

		for( var j = 0; j < statistics.length; j += 1 ) {
			if( statistics[j].item_id === itemId ) {
				statistics.splice( j, 1 );
				break;
			}
		}
	}

	// expose functions of the proxy module
	return {
		getItemById: getItemById,
		getAllitems: getAllitems,
		getItemsForUser: getItemsForUser,
		getStatistics: getStatistics,
		insertNewItem: insertNewItem,
		modifyItem: modifyItem,
		getUser: getUser,
		deleteItem: deleteItem
	}
}();
