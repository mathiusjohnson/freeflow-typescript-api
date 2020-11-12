import express, { Request, Response } from 'express';

const router = express.Router();

module.exports = (queryFunction: any) => {
	router.get('/edit/:id', (req: Request, res: Response) => {
		const commentId = req.params.id;
		queryFunction
			.getCommentById(commentId)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.get('/:id', (req: Request, res: Response) => {
		const postingId = req.params.id;
		queryFunction
			.getCommentsByPosting(postingId)
			.then((resolve: Array<Object>) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.post('/:id', (req: Request, res: Response) => {
		const postingId = req.params.id;
		const userId = req.body.userId;
		const content = req.body.content;
		queryFunction
			.addComment(postingId, userId, content)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.patch('/:commentId', (req: Request, res: Response) => {
		const commentId = Number(req.params.commentId);
		const newContent = req.body.content;
		queryFunction
			.editComment(commentId, newContent)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.delete('/:commentId', (req: Request, res: Response) => {
		const commentId = req.params.id;
		queryFunction
			.deleteComment(commentId)
			.then((resolve: Array<Object>) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	return router;
};
