import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

export const register = (userInfo: Object) => {
	const queryString = `
	insert into users (first_name, last_name, email, password, avatar, location, description, active) values ($1, $2, $3, $4, $5, $6, $7, true)
	RETURNING *;
	`;
	return pool
		.query(queryString, Object.values(userInfo))
		.then(resolve => {
			// console.log(resolve);
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const validateLogin = (email: string, password: string) => {
	console.log('attemp login');
	const queryString = `
	SELECT * from users WHERE email = $1 AND password = $2
	`;
	console.log(`
	SELECT * from users WHERE email = ${email} AND password = ${password}
	`);
	return pool
		.query(queryString, [email, password])
		.then(resolve => {
			// console.log(resolve);
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

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
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const getPostingsByUserId = (option: Number) => {
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
