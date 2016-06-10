var Synth = require("./models/synths");



new Synth({brand:"akai", model:"tomcat", price: 155, }).save();
new Synth({brand:"jomox", model:"sunsyn", price: 5000,}).save();
new Synth({brand:"future retro", model:"777", price: 700,}).save();




Synth.find(function(err, synths) {
    console.log(synths);
    if (err) return console.error(err);
    if (synths.length) return;
});



