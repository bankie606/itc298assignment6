module.exports = function(app){
var synth = require ('../models/synths.js');
// var synthapi = require ('../lib/synths.js');



// ROUTES FOR OUR API
// =============================================================================
//var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log("connected to mongodb");
    next(); // make sure we go to the next routes and don't stop here
});

//invoke bodyparser


//api routes
app.get('/api/synths', function(req,res) {
        synth.find(function (err, synths) {
            if (err) return next(err);
            if (synths) {
                res.json(synths);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });




 app.get('/api/detail/:brand', function(req,res) {
        synth.findOne({"brand": req.params.brand}, function (err, found) {
            if (found) {
                res.json(found);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });




app.post('/api/add', function(req,res) {
        console.log(req.body);
        new Synth({
                    "brand": req.body.brand,
                    "model":req.body.model,
                    "price":req.body.price
                }).save();
        
        synth.find(function(err,games){
            
            if(err) return console.error(err);
            
            if (synths){
                res.json(synths);    
            }else{
                res.status(404).send("404 - not found");    
            }
        }); 
     });


//express routes

app.get('/', function(req,res, next){
    synth.find(function (err, synths) {
        if (err) return next(err);
        if (!synths) return next();
        res.type('text/html');
        res.render('home', {synth: synths});    
    });
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.get('/detail/:brand', function(req,res, next){
    var brand = req.params.brand;
    console.log(req.params.brand);
    synth.findOne({"brand": brand},function(err, found_synth) {
        if (err) return next(err);
        res.type('text/html');
    if (!found_synth) {
        found_synth = {brand: req.params.brand};
    }
    console.log(found_synth);
        res.render('detail',{synth:found_synth});
    });
});

    app.post('/search', function(req, res, next) {
        var found = req.body.search_term;
        synth.findOne({"brand": found}, function (err, found) {
            if (err) return next(err);
            if (!found) {
                found = {brand: req.params.brand};
            }
            res.type('text/html');
    console.log(found);
            res.render('detail', {synth: found} );    
        });
    });
    
    


//issues here 
 app.post('/add', function(req,res) {
         var newSynth = {"brand":req.body.brand, "model":req.body.model, "price":req.body.price};
        synth.findByIdAndUpdate({"_id":req.body.id}, newSynth, {new: true}, function(err, result) {
            if (err) {
                    console.log(newSynth);
                new synth(newSynth).save(function(err){
                action = "Added";
                 res.render('detail', {synth: newSynth, result: "Added"} );            
                });
            } else {
             res.render('detail', {synth: newSynth, result: "Updated"} ); 
            }
        });
    });

//issues here 
    app.post('/delete', function(req,res) {
        synth.remove({"model":req.body.model }, function(err, result) {
            console.log(req.body.model);
            var action = (err) ? err : "Deleted";
            res.type('text/html');
            res.render('deleted', {synth: {}, result: action} );            
        });
    });
};

