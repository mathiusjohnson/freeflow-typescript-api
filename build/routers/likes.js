"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
module.exports = (queryFunctions) => {
    router.get('/:id', (req, res) => {
        const postingId = Number(req.params.id);
        queryFunctions
            .getLikeCount(postingId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get(`/`, (req, res) => {
        queryFunctions
            .getAllLikes()
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/:id', (req, res) => {
        const postingId = Number(req.params.id);
        const userId = req.body.liker_id; // ???
        queryFunctions
            .addLike(postingId, userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    return router;
};
