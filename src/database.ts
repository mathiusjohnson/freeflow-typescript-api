import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

pool.connect();

const getUsers = () => {
	return pool
		.query(
			`
  SELECT * FROM users
`
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

const getPostingsByUsers = (option: Number) => {
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

module.exports = { getUsers, getPostingsByUsers };
// module.exports = getPostingsByUsers;
