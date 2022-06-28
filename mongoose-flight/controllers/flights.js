const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    create,
    new: newFlight,
    show,
    delete: deleteOne
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { flights, title: 'All Flights' });
    }).sort( {departs: 'ascending'} );
}

function create(req, res) {
    if (!req.body.departs) delete req.body.departs;

    const flight = new Flight(req.body);

    flight.save(function(err) {
        if (err) return res.redirect('/flights/new')
        
        res.redirect('/flights');
    });
}

function newFlight(req, res) {
    const flight = new Flight();
    const dt = flight.departs;
    const departsDate = dt.toISOString().slice(0, 16);

    res.render('flights/new', { departsDate, title: 'Add Flight' });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {

        Ticket.find({ flight: flight._id} , function (err, attachedTickets) {

            res.render('flights/show', { flight, title: 'Flight Details', attachedTickets });
        });
    });
}

function deleteOne(req, res) {
    Flight.findByIdAndDelete(req.params.id, function (err) {
        if(err) console.log('Error');
        console.log('Successfully deleted.');

        res.redirect('/flights');
    });
}