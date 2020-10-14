const mongoose = require('mongoose');

var Flight = mongoose.model('Flight', {
    flightname: { type: String },
    origin: { type: String },
    destination: { type: String },
    flightnumber: { type: Number }
});

module.exports = { Flight };