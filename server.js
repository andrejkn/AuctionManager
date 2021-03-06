var express = require('express');
var app = express();
var __dirname = './';
app.set('views', __dirname);

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
	res.render('./index.html');
});

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});