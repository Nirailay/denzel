const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://Me:Nikoukou1@cluster0-vv8ab.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "film";

const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';



var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("denzel");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});



// populate de database :  localhost:9292/movies/populate
app.get("/movies/populate", async (request, response) => {
  const movies = await imdb(DENZEL_IMDB_ID);

    collection.insertMany(movies, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

// localhost:9292/movies
app.get("/movies", (request, response) => {

    collection.find({"metascore" : {"$gt" : 70}}).toArray((error, result) => {

        if(error) {

            return response.status(500).send(error);

        }

        var nombre = Math.floor(Math.random() * Math.floor(result.length));

        console.log(result[nombre]);

        response.send(result[nombre]);

    });

});


// localhost:9292/movies/5c87baa5200dd81ab4d5efa5
app.get("/movies/:id", (request, response) => {
    collection.findOne({ "id":request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
