var express = require('express'); //require express, express-handlebars
var exphbs = require('express-handlebars');
var postData = require("./postData"); //load twit data

var app = express(); //setup and start server
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'base' })); //set default page and view engine
app.set('view engine', 'handlebars');

app.get('/posts/:postID', function (req, res, next) {
    console.log('Loading post page');
    var postID = req.params.postID;
    if(postData[postID]){
        console.log('ID valid rendering post');
        res.status(200).render('postPage', {
            postTitle: postData[postID].postTitle,
            postAuthor: postData[postID].postAuthor,
            postText: postData[postID].postText,
            responses: postData[postID].responses
        });
    }
});

app.get('/', function (req, res) { //home page
    console.log('Rendering templated home page'); //log
    res.status(200).render('home', { //render page
        posts: postData
    });
});

app.use(express.static('public')); //serve other files if requested

app.get('*', function (req, res) {
  console.log('Page does not exist rendering 404 page.');
  res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server is listening on port", port); //log successful launch
});
