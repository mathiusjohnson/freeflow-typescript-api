import express, { Request, Response } from 'express';

const router = express.Router();

// path api/users - return all users
module.exports = (queryFunctions: any) => {
	console.log('request gets here');
	router.get('/', (req: Request, res: Response) => {
		console.log('request gets here - /users');
		queryFunctions
			.getUsers()
			.then((resolve: Array<object>) => res.send(resolve))
			.catch((error: any) => console.log(error));
	});

	router.get('/:id', (req: Request, res: Response) => {
		let userId = Number(req.params.id);
		queryFunctions
			.getUserById(userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: any) => console.log(error));
	});
	return router;
};
