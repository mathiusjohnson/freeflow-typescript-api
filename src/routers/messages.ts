import express, { Request, Response } from 'express';
import { QueryFunctions } from '../customInterface';
const router = express.Router();

module.exports = (queryFunctions: QueryFunctions) => {
	router.get('/', (req: Request, res: Response) => {
		queryFunctions
			.getAllMessages()
			.then((resolve: object) => res.send(resolve))
			.catch((error: string) => console.log(error));
	});

	router.get(
		'/convo/:sender_id/:receiver_id',
		(req: Request, res: Response) => {
			const senderID = Number(req.params.sender_id);
			const receiverID = Number(req.params.receiver_id);

			queryFunctions
				.getConvo(senderID, receiverID)
				.then((resolve: object) => res.send(resolve))
				.catch((error: string) => console.log(error));
		}
	);

	return router;
};
