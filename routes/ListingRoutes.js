const express = require('express');
const {
    createListing,
    getAllListings,
    getOneListing,
    deleteListing,
    updateListing,
    uploadListingImages,
    resizeListingImages,
    getListingPhoto,
} = require('../controllers/listingController');
const {
    protect,
} = require('../controllers/authController');

const router = express.Router();


router.route('/')
    .get(getAllListings)
    .post(protect, uploadListingImages, resizeListingImages, createListing);

router.
    route('/:id').
    get(getOneListing).
    patch(protect, uploadListingImages, resizeListingImages, updateListing).
    delete(protect, deleteListing);

router.get('/:id/listing-image/:imageName', getListingPhoto);

module.exports = router;