var credentials = require("../lib/credentials");
var mongoose = require("mongoose");

// remote db settings 
 var options = { server: 
 { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  
 }
 };       
 mongoose.connect(credentials.mongo.development.connectionString, options);

 

// var ip = process.env.ip || "127.0.0.1"
// mongoose.connect('mongodb://' +ip+ '/vgenericname')


var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));  

var synthSchema = mongoose.Schema ({
    brand: { type: String, unique: false },
    model: String,
    price: Number,
});

//Sends out Search Results back to Index    
exports.getSynth = function(synthName) {
    console.log(synthName);
    return synths.find(function(item) {
       return item.brand == synthName;
    });

};


//Adds item to index
exports.add = function(newSynth) {
    var found = false;
    synths.forEach(function(item,index){
        if (item.brand == newSynth.brand) {
            newSynth.id = item.id;
            synths[index]  = newSynth;
            found = true;
        }        
    });
    if (!found) {
        newSynth.id = synths.length;
        synths.push(newSynth);
    }
        var action = (found) ? "updated" : "added";
    return {"action": action, "total": synths.length };
};


exports.delete = function(name) {
    var deleted = false;
    console.log(name);
    synths.forEach(function(item,index){
        if (item.brand == name) {
            console.log(item);
            synths.splice(index, 1);
            deleted = true;
        }        
    });
    return { "deleted": deleted, total: synths.length };
};

exports.getAll = function(brand) {
        return synths;
};

exports.find = function(brand) {
    return synths.filter(function(item) {
       return item.brand === brand;
    });
}



module.exports = mongoose.model('synth', synthSchema);