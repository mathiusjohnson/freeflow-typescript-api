import express, { Request, Response } from 'express';
import { QueryFunctions } from '../customInterface';

const router = express.Router();

module.exports = (queryFunctions: QueryFunctions) => {
	router.get('/', (req: Request, res: Response) => {
		queryFunctions
			.getAllKarmas()
			.then(
				(
					resolve: Array<{
						giver_id: number;
						receiver_id: number;
						comment_id: number;
					}>
				) => res.send(resolve)
			)
			.catch((error: string) => console.log(error));
	});

	router.get('/user', (req: Request, res: Response) => {
		const userId = req.body.receiver_id;
		queryFunctions
			.getKarmaCountByUser(userId)
			.then((resolve: number) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.get('/:id', (req: Request, res: Response) => {
		const commentId = Number(req.params.id);
		queryFunctions
			.getKarmaCountByComment(commentId)
			.then((resolve: number) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.post('/:id', (req: Request, res: Response) => {
		const commentId = Number(req.params.id);
		const userId = req.body.userId; // ???
		queryFunctions
			.giveKarma(commentId, userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	return router;
};
