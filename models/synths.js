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

module.exports = mongoose.model('synth', synthSchema);