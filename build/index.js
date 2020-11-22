"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
require('dotenv').config();
const queryFunctions = require('./database');
const app = express_1.default();
const PORT = 8000;
//Require Routers
const userRouter = require('./routers/users');
const likeRouter = require('./routers/likes');
const karmaRouter = require('./routers/karmas');
const commentRouter = require('./routers/comments');
const postingRouter = require('./routers/postings');
const messagesRouter = require('./routers/messages');
app.use(helmet_1.default());
// middleware
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/api/users', userRouter(queryFunctions));
app.use('/api/likes', likeRouter(queryFunctions));
app.use('/api/karmas', karmaRouter(queryFunctions));
app.use('/api/comments', commentRouter(queryFunctions));
app.use('/api/postings', postingRouter(queryFunctions));
app.use('/api/messages', messagesRouter(queryFunctions));
app.get('/', (req, res) => res.send('Express TypeScript Server'));
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}!`));
