const { create, update, getOne, getAll, remove, getAllActive } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../middleware/auth.middleware');
const {firebaseFile} = require('../middleware/firebase.middleware');
const upload = require('../utils/multer');
const isAdmin = require('../middleware/isAdmin.middleware');

const userRouter = express.Router();

userRouter.route('/')
    .post(create)
    .get(isAdmin, getAll)
//verifyJWT, 
// isAdmin, 

userRouter.route('/active')
    .get(isAdmin, getAllActive)
    
userRouter.route('/:id')
    .get(isAdmin, getOne)
    .put(verifyJWT, upload.single("image"), firebaseFile, update)
    .delete(isAdmin, remove)

module.exports = userRouter;