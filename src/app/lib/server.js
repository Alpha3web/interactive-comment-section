"use server"

import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose';
import { resolve } from 'styled-jsx/css';

mongoose.connect("mongodb://127.0.0.1:27017/myDB");

const userSchema = new mongoose.Schema({
    username: String,
    profileImage: String,
}, {toObject: {
    transform: (doc, ret) => {
        ret._id = ret._id.toString();
        delete ret.__v;
        return ret;
  }}})

const replySchema = new mongoose.Schema({
    author: userSchema,
    content: String,
    score: {
        type: Number,
        default: 0
    },
    createdAt: Date,
})

const commentsSchema = new mongoose.Schema({
    author: userSchema,
    content: String,
    score: {
        type: Number,
        default: 0
    },
    createdAt: Date,
    replies: [replySchema]
}, {toObject: {
    transform: (doc, ret) => {
        ret._id = ret._id.toString();
        ret.author._id = ret.author._id.toString();
        ret.replies.length > 0? ret.replies = ret.replies.map(elem => {
            return {...elem,
                _id: elem._id.toString(),
                author: {...elem.author, _id: elem.author._id.toString()}
            };
        }): null;
        delete ret.__v;
        return ret;
  }}});


const User = mongoose.models.User || mongoose.model("User", userSchema);
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentsSchema);
const Reply = mongoose.models.Reply || mongoose.model("Reply", replySchema);

let callAgain = true;

const changePage = () => {
    callAgain = true;
}

const getRandomUser = async() => {
    if (callAgain) {
        const page = Math.floor(Math.random() * 1000);
        const randomUser = await fetch(`https://randomuser.me/api?inc=name,picture&page=${page}`);
    
        if (randomUser.ok) {
            const {results: [data]} = await randomUser.json();
            const {name: {first, last}, picture: {medium}} = data;
            const userName = (first + last).toLowerCase();
            
            const foundUser = await User.findOne({username: userName})
            
            if (foundUser) {
                await getRandomUser();
            } else {
                callAgain = false;
                const intervalID = setTimeout(changePage, 10000)
                return [userName, medium];
            }
        } else {
            throw new Error("UNABLE to complete fetch request!.")
        }   
    }
}

const getUserOrCreate = async userInfo => {
    const [fullName, userImage] = userInfo;
    try {
        const user = await User.findOne({username: fullName});
        if (user) {
            return user.toObject();
        } else {
            const user = new User({
                username: fullName,
                profileImage: userImage
            })
            const savedUser = await user.save();
            return savedUser.toObject();
        }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch user.');
    }
}
const addComment = async (formData) => {
    const currentUser = await User.findById(formData.get("userId"))
    const textContent = formData.get("content");

    const comment = new Comment({
        author: currentUser,
        content: textContent,
        createdAt: Date.now(),
    });
    await comment.save();
    revalidatePath("/");
}

const addReply = async (formData) => {
    const targetId = formData.get("targetId");
    const currentUser = await User.findById(formData.get("userId"))
    const textContent = formData.get("content");

    const reply = new Reply({
        author: currentUser,
        content: textContent,
        createdAt: Date.now(),
    });

    const foundComment = await Promise.all([
        Comment.findOne({replies: {$elemMatch: {_id: targetId}}}),
        Comment.findById(targetId)
    ]);
    foundComment.forEach(doc => {
        if (doc) {
            doc.replies.push(reply);
            doc.save();
        }
    })
    revalidatePath("/");
}

const getComments = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const comments = await Comment.find();
    return comments.map(comment => comment.toObject());
};

const updateScore = async (id, votes) => {
    await Comment.findByIdAndUpdate(id, {score: votes});
};

const deleteComment = async (id) => {
    await Promise.all([
        Comment.findByIdAndDelete(id),
        Comment.findOneAndUpdate({"replies._id": id}, {$pull: {replies: {_id: id}}})
    ]);
    revalidatePath("/");
}

const editComment = async(formData) => {
    const content = formData.get("content");
    const id = formData.get("targetId");
    await Promise.all([
        Comment.findByIdAndUpdate(id, {content: content}),
        Comment.findOneAndUpdate({"replies._id": id}, {$set: {"replies.$.content": content}})
    ])
    revalidatePath("/");
}


export {
    addComment,
    getComments,
    getUserOrCreate,
    getRandomUser,
    updateScore,
    deleteComment,
    addReply,
    editComment,
};