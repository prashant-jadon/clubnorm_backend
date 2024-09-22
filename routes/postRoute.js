const express = require('express')
const postRouter = express.Router()
const {handleCreatePost,handleShowPosts,handleUpdatePost,handleShowPostByUsername} = require('../controller/postController')

postRouter.post('/',handleCreatePost)
postRouter.get('/',handleShowPosts)
postRouter.patch('/',handleUpdatePost)
postRouter.get('/:username',handleShowPostByUsername)
module.exports = {postRouter}