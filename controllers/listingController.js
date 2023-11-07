const catchAsync = require("../utils/catchAsync");
const Listing = require("../models/listingModel");
const AppError = require("../utils/appError");
const multer = require('multer');
const sharp = require('sharp');
const path = require("path");
const {
    deleteOne,
    updateOne,
    getOne,
    createOne,
    getAll
} = require("./factoryHandler");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadListingImages = upload.fields([
    { name: 'images', maxCount: 5 }
]);

exports.resizeListingImages = catchAsync(async (req, res, next) => {
    if (!req.files.images) return next();

    if (!req.body.images) req.body.images = [];

    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `listing-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
            await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/images/listings/${filename}`);

            req.body.images.push(filename);
        })
    );

    next();
});

exports.getListingPhoto = (req, res, next) => {
    res.download(path.resolve(`${__dirname}/../public/images/listings/${req.params.imageName}`));
};

exports.createListing = createOne(Listing);

exports.getAllListings = getAll(Listing);

exports.getOneListing = getOne(Listing);

exports.deleteListing = deleteOne(Listing);

exports.updateListing = updateOne(Listing);