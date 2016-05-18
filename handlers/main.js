var synth = require ('../lib/synths.js');

exports.home = function(req,res){
    res.type('text/html');
    res.render('home', {synth: synth.getAll()});
};

exports.about = function(req,res){
    res.type('text/html');
    res.render('about', {
    });
};

exports.detail = function(req,res){
    res.type('text/html');
    console.log(req.params.brand);
    var found = synth.getSynth(req.params.brand);
    if (!found) {
        found = {brand: req.params.brand};
    }
    console.log(found);
    res.render('detail', {synth: found} );    
};



exports.search = function(req,res){
  res.type('text/html');
    var found = synth.getSynth( req.body.search_term.toLowerCase());
    console.log(found);
    if (found) {
        res.render('search', {synth: found});
    } else {
        res.render('searchfail');
    }
};



exports.add = function(req,res) {
    res.type('text/html');
    var newSynth = {"brand":req.body.brand, "model":req.body.model, "price":req.body.price};
    var result = synth.add(newSynth);
    if (result.added) {
        res.render('add', {result: result.total});
        console.log (result.total);
    } else {
        res.render('updated', {result: result.total});
    }
};

exports.delete = function(req,res){
    res.type('text/html');
    var result = synth.delete(req.body.brand);
    if (result.deleted) {
        res.render('deleted', {result: result.total});
        console.log (result.total);
    } else {
        res.send(req.body.brand + ' not found' + back_link);
    }
};
