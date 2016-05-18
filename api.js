var express = require("express");
var app = express();


//configure express
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use('/api', require('cors')());
app.use(express.static(__dirname + '../views'));

//set template engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs'  });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );


//routes to help remove the clutter
var routes = require("./routes/routes.js")(app);


//error messages
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.use(function(req,res){
   res.type('text/plain'); 
    res.status(500).send({ error: '500 Internal Service Error'});
});

//helps confirm api loaded correctly 
app.listen(app.get('port'), function() {
    console.log('Express started');    
});