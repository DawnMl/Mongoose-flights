const Flight = require('../models/flight');

module.exports = {
    new: newDest,
    create,
    delete: deleteDest,
    return: returnToFlight
};

function newDest(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        destinationEnums = flight.schema.path('destinations.airport').enumValues;

        let usedAirports = flight.destinations.map(f => f.airport);

        usedAirports.push(flight.airport);

        let allowedDestinations = destinationEnums.filter(a => !usedAirports.includes(a));

        res.render('destinations/new', { title: 'Add Destination', allowedDestinations, flight });
    });
}

function create(req, res) {
    if (!req.body.arrival) delete req.body.arrival;

    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}

function deleteDest(req, res) {
    Flight.findOne({ "destinations._id" : req.params.id }, function(err, flight) {
        flight.destinations.id(req.params.id).remove();
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    });
}

function returnToFlight(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        res.redirect(`/flights/${flight._id}`);
    });
}