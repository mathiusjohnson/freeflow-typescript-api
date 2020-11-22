"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
module.exports = (queryFunctions) => {
    router.get('/edit/:id', (req, res) => {
        const commentId = Number(req.params.id);
        queryFunctions
            .getCommentById(commentId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get('/:id', (req, res) => {
        const postingId = Number(req.params.id);
        queryFunctions
            .getCommentsByPosting(postingId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get(`/`, (req, res) => {
        queryFunctions
            .getAllComments()
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/:id', (req, res) => {
        const postingId = Number(req.params.id);
        const userId = req.body.commenter_id;
        const content = req.body.content;
        console.log(postingId, userId, content);
        queryFunctions
            .addComment(postingId, userId, content)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.patch('/:commentId', (req, res) => {
        const commentId = Number(req.params.commentId);
        const commenterId = req.body.userId;
        const newContent = req.body.content;
        queryFunctions
            .editComment(commentId, commenterId, newContent)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.delete('/:commentId', (req, res) => {
        const commentId = Number(req.params.commentId);
        const commenterId = req.body.userId;
        queryFunctions
            .deleteComment(commentId, commenterId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    return router;
};
