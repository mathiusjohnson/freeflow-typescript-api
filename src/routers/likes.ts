import express, { Request, Response } from 'express';

const router = express.Router();

module.exports = (queryFunctions: any) => {
	router.get('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		queryFunctions
			.getLikeCount(postingId)
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
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
