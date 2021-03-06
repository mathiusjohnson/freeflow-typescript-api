import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { QueryFunctions } from '../customInterface';

const router = express.Router();

// path api/users - return all users
module.exports = (queryFunctions: QueryFunctions) => {
	// get an array of all users
	router.get('/', (req: Request, res: Response) => {
		queryFunctions
			.getUsers()
			.then(resolve => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	// get the user object by users.id
	router.get('/:id', (req: Request, res: Response) => {
		let userId = Number(req.params.id);
		queryFunctions
			.getUserById(userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	// get an array of postings by users.id
	router.get('/:id/postings', (req: Request, res: Response) => {
		let userId = Number(req.params.id);
		queryFunctions
			.getPostingsByUserId(userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.post('/register', (req: Request, res: Response) => {
		const userInfo = req.body;
		bcrypt.hash(userInfo.password, 10, (err: Error, hash: String) => {
			if (err) {
				console.log(err);
			} else {
				userInfo.password = hash;
				queryFunctions
					.register(userInfo)
					.then((resolve: object) => res.send(resolve))
					.catch((error: string) => console.log(error));
			}
		});
	});

	router.patch('/:id', (req: Request, res: Response) => {
		const userId = Number(req.params.id);
		const userInfo = req.body;
		queryFunctions
			.editUserById(userInfo, userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.post('/', (req: Request, res: Response) => {
		const { email, password } = req.body;
		queryFunctions
			.validateLogin(email, password)
			.then((resolve: object) => {
				console.log('login completed');
				return res.send(resolve);
			})
			.catch((error: string) => console.log(error));
	});

	return router;
};
