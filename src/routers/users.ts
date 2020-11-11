import express, { Request, Response } from 'express';
import { getUsers, getUserById } from '../database';

import pg from 'pg';
// import resolve from 'resolve';

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

const router = express.Router();

// path api/users - return all users
export const userRouter = () => {
	console.log('request gets here');
	router.get('/', (req: Request, res: Response) => {
		console.log('request gets here - /users');
		pool
			.query(`Select * from users`)
			.then(resolve => console.log(resolve))
			.catch(error => console.log(error));
		getUsers()
			.then(resolve => res.send(resolve))
			.catch(error => console.log(error));
	});

	router.get('/:id', (req: Request, res: Response) => {
		let userId = Number(req.params.id);
		getUserById(userId)
			.then(resolve => res.send(resolve))
			.catch(error => console.log(error));
	});
	return router;
};
