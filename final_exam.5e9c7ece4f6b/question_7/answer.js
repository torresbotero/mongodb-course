var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/photos', function(err, db) {
    if(err) throw err;

    var albums = db.collection('albums');
    var images = db.collection('images');
    //var cursorAlbums = albums.find({});
    var cursorImages = images.find({});

    cursorImages.each(function(err, doc) {

    	if(err) throw err;

        if(doc == null) {
            return;
        }

    	//var cursorAlbums = albums.find({'images':doc['_id']});
    	albums.count({'images':doc['_id']}, function(err, count) {

    		if(err) throw err;

    		if(count == null) {
	            return;
	        }

	        if(count == 0){

	        	images.remove({'_id':doc['_id']}, function(err, removed) {
	        		if(err) throw err;

	        		console.dir("removed: " + doc['_id']);
	        	});

	    		console.dir(count);

	    		console.dir(doc['_id']);

	    		if(doc['_id'] == 99999){
	    			console.dir("Finished");
	    		}

    		}

    	});

	});

});