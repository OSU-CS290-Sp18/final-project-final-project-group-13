var express = require('express'); //require express, express-handlebars
var exphbs = require('express-handlebars');

var app = express(); //setup and start server
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'base' })); //set default page and view engine
app.set('view engine', 'handlebars'); //set view engin
var MongoClient = require('mongodb').MongoClient; //get mongo client
var bodyParser = require('body-parser');
app.use(bodyParser.json());

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

app.post('/posts/:postID/addResponse', function (req, res, next) {
    console.log("responded to server");
    var postID = req.params.postID;
    if (req.body && req.body.responseText && req.body.responseAuthor) {
        console.log("setting up a response");
        var postArray;
        var postCursor = posts.find({
            postID: postID
        });
        postCursor.toArray(function (err, postArray) { //convert cursor to array
            if (err) {
                res.status(500).send("Error fetching posts from DB."); //handle any errors
            } else {
                var currentPost = postArray[0];
                var ID = currentPost.responses.length;
                var strID = ID.toString();
                console.log(req.body.responseAuthor);
                console.log(req.body.responseText);
                db.collection('posts').update(
                    { "postID": postID },
                    {
                        "$push": {
                            "responses": {
                                "responseID": strID,
                                "responseAuthor": req.body.responseAuthor,
                                "responseText": req.body.responseText
                            }
                        }
                     }
                );
                res.status(200).send(strID);
            }
       });
    }
});

app.post('/addPost', function (req, res, next){
  if(req.body && req.body.postTitle && req.body.postAuthor && req.body.postText){
    var orderedPosts = posts.find();
    var orderedArray;
    orderedPosts.toArray(function (err, orderedArray) { //convert cursor to array
        if (err) {
            res.status(500).send("Error fetching posts from DB."); //handle any errors
        } else {
            console.log("detected post req");
            var newID = parseInt(orderedArray[orderedArray.length - 1].postID)+1;
            var stringID = newID.toString();
            var postObj = {
              postID: stringID,
              postTitle: req.body.postTitle,
              postAuthor: req.body.postAuthor,
              postText: req.body.postText,
              responses: []
            };
            posts.insertOne(postObj);
            res.status(200).send(stringID);
        }
    });
  }else{
    res.status(400).send("Add post request must specifiy a postTitle, postAuthor, and postText");
  }
});

app.get('/getId', function (req, res, next) {

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
