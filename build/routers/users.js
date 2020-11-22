"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// path api/users - return all users
module.exports = (queryFunctions) => {
    // get an array of all users
    router.get('/', (req, res) => {
        queryFunctions
            .getUsers()
            .then(resolve => res.send(resolve))
            .catch((error) => console.log(error));
    });
    // get the user object by users.id
    router.get('/:id', (req, res) => {
        let userId = Number(req.params.id);
        queryFunctions
            .getUserById(userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    // get an array of postings by users.id
    router.get('/:id/postings', (req, res) => {
        let userId = Number(req.params.id);
        queryFunctions
            .getPostingsByUserId(userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/register', (req, res) => {
        const userInfo = req.body;
        bcrypt_1.default.hash(userInfo.password, 10, (err, hash) => {
            if (err) {
                console.log(err);
            }
            else {
                userInfo.password = hash;
                queryFunctions
                    .register(userInfo)
                    .then((resolve) => res.send(resolve))
                    .catch((error) => console.log(error));
            }
        });
    });
    router.patch('/:id', (req, res) => {
        const userId = Number(req.params.id);
        const userInfo = req.body;
        queryFunctions
            .editUserById(userInfo, userId)
            .then((resolve) => res.send(resolve))
            .catch((error) => console.log(error));
    });
    router.post('/', (req, res) => {
        const { email, password } = req.body;
        queryFunctions
            .validateLogin(email, password)
            .then((resolve) => {
            console.log('login completed');
            return res.send(resolve);
        })
            .catch((error) => console.log(error));
    });
    return router;
};
