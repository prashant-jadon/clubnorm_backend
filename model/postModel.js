const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String], // Array of strings
        default: []     // Optional field
    },
    likes: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
