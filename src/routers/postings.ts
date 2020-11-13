import express, { Request, Response } from 'express';
const router = express.Router();

module.exports = (queryFunctions: any) => {
	router.get('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		console.log(postingId);
		queryFunctions
			.getPostingById(postingId)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.get('/', (req: Request, res: Response) => {
		queryFunctions
			.getAllPostings()
			.then((resolve: Array<Object>) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.post('/', (req: Request, res: Response) => {
		const posting = req.body;
		queryFunctions
			.addPosting(posting)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.patch('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		const posting = req.body;
		queryFunctions
			.editPosting(postingId, posting)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.delete('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		const userId = req.body.owner_id;
		queryFunctions
			.deletePosting(postingId, userId)
			.then((resolve: any) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	return router;
};
