const { create, update, getOne, getAll } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../middleware/auth.middleware');
const {firebaseFile} = require('../middleware/firebase.middleware');
const { upload } = require('../utils/multer');

const userRouter = express.Router();

userRouter.route('/')
    .post(create)
    .get(verifyJWT, getAll)

    
userRouter.route('/:id')
    .get(verifyJWT, getOne)
    .put(verifyJWT, upload.single("file"), firebaseFile, update)

module.exports = userRouter;