var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

var convert = require('./controllers/conversion.controller');

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.post('/convert', function(req, res) {
    res.render('pages/convert', {
        conversion: convert.convertMarkdownToHtml(req.body.input),
    });   
});

app.listen(8080);
console.log('Listening on port 8080.');