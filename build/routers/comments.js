"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
module.exports = (queryFunction) => {
    router.get('/edit/:id', (req, res) => {
        const commentId = req.params.id;
        queryFunction
            .getCommentById(commentId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get('/:id', (req, res) => {
        const postingId = req.params.id;
        queryFunction
            .getCommentsByPosting(postingId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/:id', (req, res) => {
        const postingId = req.params.id;
        const userId = req.body.userId;
        const content = req.body.content;
        queryFunction
            .addComment(postingId, userId, content)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.patch('/:commentId', (req, res) => {
        const commentId = Number(req.params.commentId);
        const commenterId = req.body.userId;
        const newContent = req.body.content;
        queryFunction
            .editComment(commentId, commenterId, newContent)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.delete('/:commentId', (req, res) => {
        const commentId = Number(req.params.commentId);
        const commenterId = req.body.userId;
        queryFunction
            .deleteComment(commentId, commenterId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    return router;
};
