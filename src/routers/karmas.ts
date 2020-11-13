import express, { Request, Response } from 'express';

const router = express.Router();

module.exports = (queryFunctions: any) => {
	router.get('/user', (req: Request, res: Response) => {
		const userId = req.body.userId; // ???
		queryFunctions
			.getKarmaCountByUser(userId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.get('/:id', (req: Request, res: Response) => {
		const commentId = Number(req.params.id);
		queryFunctions
			.getKarmaCountByComment(commentId)
			.then((resolve: object) => res.send(resolve))
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
