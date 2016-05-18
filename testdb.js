var synth = require("./models/synths");

new synth({brand:"akai", model:"tomcat", price: 155, }).save();

synth.find(function(err, synths) {
    console.log(synths);
    if (err) return console.error(err);
    if (synths.length) return;
});
