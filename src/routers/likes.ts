import express, { Request, Response } from 'express';
import { QueryFunctions } from '../customInterface';
const router = express.Router();

module.exports = (queryFunctions: QueryFunctions) => {
	router.get('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		queryFunctions
			.getLikeCount(postingId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.get(`/`, (req: Request, res: Response) => {
		queryFunctions
			.getAllLikes()
			.then((resolve: Array<Object>) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.post('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		const userId = req.body.userId; // ???
		queryFunctions
			.addLike(postingId, userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	return router;
};
