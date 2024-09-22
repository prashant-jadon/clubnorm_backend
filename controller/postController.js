const { Post } = require('../model/postModel');

// Function to create a post
async function handleCreatePost(req, res) {
    try {
        const { title, description, category, tags, likes, username } = req.body;

        //TODO : VALIdATION post data
        if(!title || !category ||!likes||!username ){
            return res.status(400).json({
                msg:"Invalid Request"
            })
        }
        

        const result = await Post.create({
            title,
            description,
            category,
            tags,
            likes,
            username
        });

        return res.status(201).json({
            msg: "Post created successfully",
            post: result
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}

async function handleUpdatePost(req,res){
    try {
        const {title,description,category,productImages,tags,rent,isRent,postid} = req.body; 

        if(!title || !description || !category  || !tags){
            return res.status(400).json({
                msg:"invalid request"
            })
        }

        const posts = await Post.find({_id:postid});
        if(posts){
            const result = await Post.updateOne({
                title,
                description,
                tags,
            })
        }
        return res.status(200).json({
            msg: "updated post"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleCreatePost
};

async function handleShowPosts(req,res) {
    try {
       const posts = await Post.find()
       return res.status(200).json({
        posts
       })
    } catch (error) {
        console.log(error)
    }
}

async function handleShowPostByUsername(req,res){
    try {
        const {username} = req.params;
        if(!username){
            return res.status(400).json({
                msg:"Invalid request"
            })
        }
        const posts = await Post.find({username:username});

        if (!posts.length) {
            return res.status(404).json({
                msg: "No posts found for the specified username"
            });
        }
        return res.status(200).json({
            posts
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    handleCreatePost,
    handleShowPosts,
    handleUpdatePost,
    handleShowPostByUsername
}