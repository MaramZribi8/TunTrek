const mongoose = require('mongoose');

const PlaceScheema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    Daddress: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number,


});

const PlaceModel = mongoose.model('Place', PlaceScheema);
module.exports = PlaceModel; // Export PlaceModel as default
