const express = require('express');
const {
    createListing,
    getAllListings,
    getOneListing,
    deleteListing,
    updateListing,
    uploadListingImages,
    resizeListingImages
} = require('../controllers/listingController');

const router = express.Router();

router.route('/')
    .get(getAllListings)
    .post(createListing);

router.
    route('/:id').
    get(getOneListing).
    patch(uploadListingImages, resizeListingImages, updateListing).
    delete(deleteListing);

module.exports = router;