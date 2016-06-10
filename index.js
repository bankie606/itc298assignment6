var http = require('http'),
    express = require('express');
var app = express();
var synth = require('./lib/synths.js');
var main = require('./handlers/main.js')
var back_link = "<p><a href='/'>Back</a>";
var bodyParser = require('body-parser');


app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '../views'));
var routes = require('./routes/routes.js')(app); // passes ‘app’ instance to the routes module

var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );



app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});

