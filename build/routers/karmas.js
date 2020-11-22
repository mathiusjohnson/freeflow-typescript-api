"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
module.exports = (queryFunctions) => {
    router.get(`/`, (req, res) => {
        queryFunctions
            .getAllKarmas()
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get('/user', (req, res) => {
        const userId = req.body.giver_id; // ???
        queryFunctions
            .getKarmaCountByUser(userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get('/:id', (req, res) => {
        const commentId = Number(req.params.id);
        queryFunctions
            .getKarmaCountByComment(commentId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/:id', (req, res) => {
        const commentId = Number(req.params.id);
        const userId = req.body.userId; // ???
        queryFunctions
            .giveKarma(commentId, userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    return router;
};
