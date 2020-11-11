import pg from 'pg';
import resolve from 'resolve';

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

// pool.connect();

export const getUsers = () => {
	return pool
		.query(
			`
  SELECT * FROM users
`
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const getUserById = (id: Number) => {
	return pool
		.query(
			`
  SELECT * FROM users
    WHERE id = $1
  `,
			[id]
		)
		.then(resolve => console.log(resolve))
		.catch(error => console.log(error));
};

export const getPostingsByUsers = (option: Number) => {
	return pool
		.query(
			`
    SELECT * FROM postings
    WHERE owner_id = $1
    `,
			[option]
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

// exports = { getUsers };
// module.exports = { getUsers, getPostingsByUsers };
