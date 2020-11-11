import express, { Request, Response } from 'express';
import resolve from 'resolve';
import bodyparser from 'body-parser';
import { userRouter } from './routers/users';

require('dotenv').config();

const { getUsers, getPostingsByUsers } = require('./database');
const app = express();
const PORT = 8000;

// Router
const apiRouter = express.Router();
app.use(bodyparser.json());
app.use('/api', apiRouter);
app.use('/users', userRouter);

apiRouter.get('/users', (req: Request, res: Response) => {
	getUsers()
		.then((resolve: Array<Object>) => res.send(resolve))
		.catch((error: string) => console.log(error));
});

apiRouter.get('/postings/:id', (req: Request, res: Response) => {
	let userId = req.params.id;
	getPostingsByUsers(userId)
		.then((resolve: Array<Object>) => res.send(resolve))
		.catch((error: string) => console.log(error));
});

app.get('/', (req: Request, res: Response) =>
	res.send('Express TypeScript Server')
);

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}!`));
