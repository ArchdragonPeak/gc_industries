const express = require('express');
const router = express.Router();
const CommentModel = require('../models/CommentSchema');
const UserModel = require('../models/UserSchema');

// GET /comments/:gameID
router.get('/:gameID', async (req, res) => {
    const gameID = parseInt(req.params.gameID);
    try {
        const comments = await CommentModel.find({ gameID }).populate({
            path: 'user',
            select: 'username profilepicture'
        });
        console.log("Comments found: ", comments); // Debug-Log
        if (comments.length === 0) {
            return res.status(404).send('Comments not found');
        }
        res.json(comments);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).send('Error retrieving comments');
    }
});

// GET /comments/:id
router.get('/comment/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const comment = await CommentModel.findOne({ commentID: id }).populate({
            path: 'userID',
            model: 'UserModel',
            select: 'username profilepicture'
        });
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send('Comment not found');
        }
    } catch (error) {
        console.error('Error retrieving comment:', error);
        res.status(500).send('Error retrieving comment');
    }
});

// POST /comments
router.post('/', async (req, res) => {
    try {
        const comment = new CommentModel(req.body);
        const savedComment = await comment.save();
        res.status(201).send(savedComment);
    } catch (error) {
        console.error('Error saving comment:', error);
        res.status(500).json(error);
    }
});

// PUT /comments/:id
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updatedComment = await CommentModel.findOneAndUpdate({ commentID: id }, req.body, { new: true });
        if (updatedComment) {
            res.json(updatedComment);
        } else {
            res.status(404).send('Comment not found');
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).send('Error updating comment');
    }
});

// DELETE /comments/:id
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const deletedComment = await CommentModel.findOneAndDelete({ commentID: id });
        if (deletedComment) {
            res.json(deletedComment);
        } else {
            res.status(404).send('Comment not found');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Error deleting comment');
    }
});

module.exports = router;