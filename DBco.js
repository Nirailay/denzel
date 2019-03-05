const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Me:<Nikoukou1>@cluster0-vv8ab.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
const test = require("assert");

MongoClient.connect(uri, function(err, db) {
  // Get the collection
  var col = db.collection('insert_many');
  col.insertMany([{a:1}, {a:2}], function(err, r) {
    test.equal(null, err);
    test.equal(2, r.insertedCount);
    // Finish up test
    db.close();
  });
});


