var express = require('express'); //require express, express-handlebars
var exphbs = require('express-handlebars');

var app = express(); //setup and start server
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'base' })); //set default page and view engine
app.set('view engine', 'handlebars'); //set view engin
var MongoClient = require('mongodb').MongoClient; //get mongo client

var mongoHost = process.env.MONGO_HOST; //set mongo variables
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName; //create URL
var mongoDBDatabase; //create globals for db
var db;
var posts;

app.get('/posts/:postID', function (req, res, next) { //handle single post page
    var postID = req.params.postID; //get id
    var postCursor = posts.find({
        postID: postID //find correct post
    });
    var postArray; //create array
    postCursor.toArray(function (err, postArray) { //convert cursor to array
        if (err) {
            res.status(500).send("Error fetching posts from DB."); //handle any errors
        } else {
            console.log('Loading post page'); //log status
            if (postArray[0]) { //check if post exists in database
                console.log('ID valid rendering post');  //log status
                res.status(200).render('postPage', { //render page using array data
                    postTitle: postArray[0].postTitle,
                    postAuthor: postArray[0].postAuthor,
                    postText: postArray[0].postText,
                    responses: postArray[0].responses
                });
            }
        }
    });
});

app.get('/', function (req, res) { //home page
    var postCursor = posts.find(); //create cursor and grab the whole database
    var postArray;
    postCursor.toArray(function (err, postArray) { //convert cursor to array
        if (err) {
            res.status(500).send("Error fetching posts from DB."); //handle errors
        } else {
            console.log('Rendering templated home page'); //log
            res.status(200).render('home', { //render page
                posts: postArray //render with database data
            });
        }
    });
});

app.use(express.static('public')); //serve other files if requested

app.get('*', function (req, res) {
  console.log('Page does not exist rendering 404 page.'); //handle 404's
  res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client) { //connect to mongodb
    if (err) {
        throw err; //handle errors
    }
    db = mongoDBDatabase = client.db(mongoDBName); //initialize db
    posts = db.collection('posts'); //grab posts from database
    app.listen(port, function () {
        console.log("== Server has connected with MongoDatabase");
        console.log("== Server is listening on port", port); //log successful launch
    });
});
