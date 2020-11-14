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
        console.log(postingId);
        queryFunctions
            .getPostingById(postingId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.get('/', (req, res) => {
        queryFunctions
            .getAllPostings()
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/', (req, res) => {
        const posting = req.body;
        queryFunctions
            .addPosting(posting)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.patch('/:id', (req, res) => {
        const postingId = Number(req.params.id);
        const posting = req.body;
        queryFunctions
            .editPosting(postingId, posting)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.delete('/:id', (req, res) => {
        const postingId = Number(req.params.id);
        const userId = req.body.owner_id;
        queryFunctions
            .deletePosting(postingId, userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    return router;
};
