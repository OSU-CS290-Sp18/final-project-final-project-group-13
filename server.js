var express = require('express'); //require express, express-handlebars
var exphbs = require('express-handlebars');

var app = express(); //setup and start server
var port = process.env.PORT || 3000; //set port
app.engine('handlebars', exphbs({ defaultLayout: 'base' })); //set default page and view engine
app.set('view engine', 'handlebars'); //set view engin
var MongoClient = require('mongodb').MongoClient; //get mongo client
var bodyParser = require('body-parser'); //require body-parser
app.use(bodyParser.json()); //launch bp

var mongoHost = process.env.MONGO_HOST; //set mongo variables
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName; //create URL
//console.log(mongoURL); //used for debugging
var mongoDBDatabase; //create globals for db
var db; //create globals for db
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
                var reversedArray = []; //reverse array so it is printed in chronological order
                for (var x = postArray[0].responses.length - 1; x >= 0; x--) {
                    var y = postArray[0].responses.length - x + 1;
                    reversedArray[y] = postArray[0].responses[x];
                }
                console.log('ID valid rendering post');  //log status
                res.status(200).render('postPage', { //render page using array data
                    postTitle: postArray[0].postTitle, //set data for template
                    postAuthor: postArray[0].postAuthor,
                    postText: postArray[0].postText,
                    responses: reversedArray
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
            var reversedArray = []; //reverse array so it prints in chronological order
            for (var x = postArray.length - 1; x >= 0; x--) {
                var y = postArray.length - x + 1;
                reversedArray[y] = postArray[x];
            }
            console.log('Rendering templated home page'); //log
            res.status(200).render('home', { //render page
                posts: reversedArray //render with database data
            });
        }
    });
});

app.post('/posts/:postID/addResponse', function (req, res, next) { //handle adding a new response
    var postID = req.params.postID; //get id from url
    if (req.body && req.body.responseText && req.body.responseAuthor) { //check if required body elements exist
        console.log("setting up a response"); //log
        var postArray;
        var postCursor = posts.find({ //get post array
            postID: postID
        });
        postCursor.toArray(function (err, postArray) { //convert cursor to array
            if (err) {
                res.status(500).send("Error fetching posts from DB."); //handle any errors
            } else {
                var currentPost = postArray[0]; //get current post
                var ID = currentPost.responses.length; //get id for new post
                var strID = ID.toString(); //convert id to string
                db.collection('posts').update( //find correct post
                    { "postID": postID },
                    {
                        "$push": { //push in a new response
                            "responses": {
                                "responseID": strID,
                                "responseAuthor": req.body.responseAuthor,
                                "responseText": req.body.responseText
                            }
                        }
                     }
                );
                res.status(200).send(strID); //send status and response containing id as a string
            }
       });
    }
});

app.post('/addPost', function (req, res, next){ //handle
  if(req.body && req.body.postTitle && req.body.postAuthor && req.body.postText){
    var orderedPosts = posts.find();
    var orderedArray;
    orderedPosts.toArray(function (err, orderedArray) { //convert cursor to array
        if (err) {
            res.status(500).send("Error fetching posts from DB."); //handle any errors
        } else {
            var newID = orderedArray.length; //get id based on length of array
            var stringID = newID.toString(); //convert id to string
            var postObj = { //create new post object
              postID: stringID,
              postTitle: req.body.postTitle,
              postAuthor: req.body.postAuthor,
              postText: req.body.postText,
              responses: []
            };
            posts.insertOne(postObj); //insert new post
            res.status(200).send(stringID); //set status and send stringID
        }
    });
  }else{
    res.status(400).send("Add post request must specifiy a postTitle, postAuthor, and postText"); //send error code if failed
  }
});

app.delete('/', function (req, res) { //handle deleting posts
    var target_id = req.body.deleteID; //get id of deletion target
    posts.deleteOne({ //delete item with target id
        postID: target_id
    });
    res.status(200).send('DELETE request to homepage'); //send status and message
});

app.delete('/posts/:postID/:responseID', function (req, res) { //handle delete response
    var postID = req.params.postID; //get post id from URL
    var resID = req.params.responseID; //get response id from URL
    db.collection('posts').update( //update post collection
        {"postID" : postID}, //find correct post according to postID
        {
            "$pull": { //pull correct response from array according to resID
                "responses": {
                    "responseID": resID
                }
            }
        }
    );
    res.status(200).send('DELETE request to post page'); //set status and send a response
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
