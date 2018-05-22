var http = require('http'); //require http, path, and fs
var path = require('path');
var fs = require('fs');
var index = fs.readFileSync(path.join(__dirname + '/public/index.html')); //cache all files to vars
var messageBoard = fs.readFileSync(path.join(__dirname + '/public/message_board.html'));
var style = fs.readFileSync(path.join(__dirname + '/public/style.css'));
var error404 = fs.readFileSync(path.join(__dirname + '/public/404.html'));
console.log('Files cached'); //log cache complete


var server = http.createServer(requestHandler); //create server
server.listen(process.env.PORT || 3000); //launch listening on env PORT or 3000
console.log('Server launched'); //log successful launch

function requestHandler(req, res) {
    var contents; 
    if (req.url === '/index.html' || req.url === '/') { //check request url and set contents to correct file
        contents = index;
        res.statusCode = 200; //set status code
    } else if (req.url === '/message_board.html') { //same for each different url
        contents = messageBoard;
        res.statusCode = 200;
    } else if (req.url === '/style.css') {
        contents = style;
        res.statusCode = 200;
    } else {
        contents = error404;
        res.statusCode = 404;
    }
    res.write(contents); //write contents
    res.end(); //end request
}