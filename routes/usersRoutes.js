const express = require('express');

const {
    signUp,
    login,
    protect,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout,
    refreshAccessToken,
    googleLogin
} = require('../controllers/authController');
const {
    getAllUsers,
    getOneUser,
    updateMe,
    deleteMe,
    deleteUser,
    updateUser,
    getMe,
    getUserPhoto,
    uploadUserPhoto,
    resizeUserPhoto,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', login);

router.post('/google-login', googleLogin);

router.post('/forgotPassword', forgotPassword);

router.patch('/resetPassword/:token', resetPassword);

router.post('/refresh-token', refreshAccessToken);

router.get('/get-photo/:id', getUserPhoto);

//This middleware will protect all the incoming routes
router.use(protect);

router.patch('/updatePassword', updatePassword);

router.post('/logout', logout);

router.patch('/updateMe',
    uploadUserPhoto,
    resizeUserPhoto,
    updateMe
);

router.delete('/deleteMe', deleteMe);

router.get('/me', getMe, getOneUser);

router.get('/', getAllUsers);

router.
    route('/:id').
    get(getOneUser).
    delete(deleteUser).
    patch(updateUser);

module.exports = router;