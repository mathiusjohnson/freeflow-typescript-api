import express, { Request, Response } from 'express';
import { QueryFunctions } from '../customInterface';

const router = express.Router();

module.exports = (queryFunctions: QueryFunctions) => {
	router.get('/edit/:id', (req: Request, res: Response) => {
		const commentId = Number(req.params.id);
		queryFunctions
			.getCommentById(commentId)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.get('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		queryFunctions
			.getCommentsByPosting(postingId)
			.then((resolve: Array<Object>) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.get(`/`, (req: Request, res: Response) => {
		queryFunctions
			.getAllComments()
			.then((resolve: Array<Object>) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.post('/:id', (req: Request, res: Response) => {
		const postingId = Number(req.params.id);
		const userId = req.body.userId;
		const content = req.body.content;
		queryFunctions
			.addComment(postingId, userId, content)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.patch('/:commentId', (req: Request, res: Response) => {
		const commentId = Number(req.params.commentId);
		const commenterId = req.body.userId;
		const newContent = req.body.content;
		queryFunctions
			.editComment(commentId, commenterId, newContent)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	router.delete('/:commentId', (req: Request, res: Response) => {
		const commentId = Number(req.params.commentId);
		const commenterId = req.body.userId;
		queryFunctions
			.deleteComment(commentId, commenterId)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
	});

	return router;
};
