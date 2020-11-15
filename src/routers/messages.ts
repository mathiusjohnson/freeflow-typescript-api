import express, { Request, Response } from 'express';
const router = express.Router();

module.exports = (queryFunctions: any) => {
	router.get('/', (req: Request, res: Response) => {

		queryFunctions
			.getAllMessages()
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
  });

  router.get('/convo/:sender_id/:receiver_id', (req: Request, res: Response) => {
		const senderID = Number(req.params.sender_id);
    const receiverID = Number(req.params.receiver_id);
        
		queryFunctions
			.getConvo(senderID, receiverID)
			.then((resolve: Object) => res.send(resolve))
			.catch((error: String) => console.log(error));
  });
  
  return router;
};