const express = require('express')
const userRouter = express.Router();
const {handleCreateUser, handleLogin} = require('../controller/userController')

userRouter.post('/',handleCreateUser);
userRouter.post('/login',handleLogin);


module.exports = {
    userRouter
}