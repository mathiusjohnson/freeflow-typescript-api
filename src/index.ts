import express, { Request, Response } from 'express';
import bodyparser from 'body-parser';
// import { userRouter } from './routers/users';

require('dotenv').config();
const queryFunctions = require('./database');

const { getUsers, getPostingsByUsers } = require('./database');
const app = express();
const PORT = 8000;

//Require Routers
const userRouter = require('./routers/users');

// Router

app.use(bodyparser.json());

app.use('/api/users', userRouter(queryFunctions));

app.get('/', (req: Request, res: Response) =>
	res.send('Express TypeScript Server')
);

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}!`));
