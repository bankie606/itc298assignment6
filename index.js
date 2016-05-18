var express = require("express");
var app = express();
var synth = require('./lib/synths.js');
var main = require('./handlers/main.js')
var back_link = "<p><a href='/'>Back</a>";

var routes = require('./routes/routes.js')(app); // passes ‘app’ instance to the routes module

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use(express.static(__dirname + '../views'));

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