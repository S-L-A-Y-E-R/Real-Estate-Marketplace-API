const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Listing must have a name']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Listing must have a description']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Listing must have an address']
    },
    images: [String],
    regularPrice: {
        type: Number,
        required: [true, 'Listing must have a price'],
        min: [1, 'The price must be above 1$']
    },
    discountPrice: {
        type: Number,
        required: [true, 'Listing must have a discount price'],
    },
    beds: {
        type: Number,
        required: [true, 'Listing must have beds'],
        min: [1, 'The beds must be above at least 1']
    },
    baths: {
        type: Number,
        required: [true, 'Listing must have baths'],
        min: [1, 'The baths must be above at least 1']
    },
    furnished: {
        type: Boolean,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: [true, 'Listing must have a type']
    },
    offer: {
        type: String,
        required: [true, 'Listing must have an offer']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Listing must belong to a user']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});


listingSchema.pre(/^findOne/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});

listingSchema.pre(/^findOneAndUpdate/, function (next) {
    this._update.updatedAt = Date.now();
    next();
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;