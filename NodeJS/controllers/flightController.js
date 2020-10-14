const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Flight } = require('../models/flight');

// => localhost:3000/flights/
router.get('/', (req, res) => {
    Flight.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Flights :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Flight.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Flight :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var flt = new Flight({
        flightname: req.body.flightname,
        origin: req.body.origin,
        destination: req.body.destination,
        flightnumber: req.body.flightnumber,
    });
    flt.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Flight Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var flt = {
        flightname: req.body.flightname,
        origin: req.body.origin,
        destination: req.body.destination,
        flightnumber: req.body.flightnumber,
    };
    Flight.findByIdAndUpdate(req.params.id, { $set: flt }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Flight Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Flight.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Flight Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports = router;