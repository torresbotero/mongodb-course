var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');
    var cursor = data.find({});
    cursor.sort([['State', 1], ['Temperature', -1]]);
    var currentState = '';

    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return;
        }
        if(currentState != doc.State){
        	console.dir(doc.State);
        	var query = {'_id':doc['_id']};
        	console.dir(query);
        	doc['month_high'] = true;

        	data.update(query, doc, function(err, updated) {
	            if(err) throw err;

	            console.dir("Successfully updated " + updated + " document!");
	        });

        	currentState = doc.State;
        }

        //console.dir(doc);
    });


});
