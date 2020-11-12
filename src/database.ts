import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

export const editComment = (commentId: Number, content: String) => {
	console.log(commentId, content);
	const queryString = `
	UPDATE comments SET "content" = $1 where id = $2
	RETURNING *
	`;
	return pool
		.query(queryString, [content, commentId])
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const getCommentById = (commentId: Number) => {
	const queryString = `
	SELECT *
	FROM comments
	WHERE id = $1
	`;
	return pool
		.query(queryString, [commentId])
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const addComment = (
	postingId: Number,
	userId: Number,
	content: String
) => {
	const queryString = `
	INSERT INTO comments
	(commenter_id, posting_id, content)
	VALUES ($1, $2, $3)
	RETURNING *;
	`;
	return pool
		.query(queryString, [userId, postingId, content])
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const getCommentsByPosting = (postingId: Number) => {
	const queryString = `
	SELECT *
		FROM comments
		JOIN users ON commenter_id = users.id
		WHERE posting_id = $1
	`;
	return pool
		.query(queryString, [postingId])
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const giveKarma = (commentId: Number, userId: Number) => {
	const queryString = `
	INSERT INTO karmas (giver_id, comment_id)
	VALUES ($1, $2)
	RETURNING *;
	`;
	return pool
		.query(queryString, [userId, commentId])
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const getKarmaCountByComment = (id: Number) => {
	const queryString = `
	SELECT COUNT(*)
		FROM karmas
		WHERE comment_id = $1
	`;
	return pool
		.query(queryString, [id])
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const getKarmaCountByUser = (id: Number) => {
	const queryString = `
	SELECT COUNT(*)
		FROM karmas
		JOIN comments
			ON comment_id = comments.id
		JOIN users
			ON commenter_id = users.id
			WHERE users.id = $1
	`;
	return pool
		.query(queryString, [id])
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const addLike = (postingId: Number, userId: Number) => {
	const queryString = `
	INSERT INTO likes (liker_id, posting_id)
	VALUES ($1, $2)
	RETURNING *;
	`;
	return pool
		.query(queryString, [userId, postingId])
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const getLikeCount = (id: Number) => {
	const queryString = `
	SELECT COUNT(*)
		FROM likes
		WHERE posting_id = $1
	`;
	return pool
		.query(queryString, [id])
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const editUserById = (userInfo: Object, userId: Number) => {
	const updateFields = Object.keys(userInfo);
	const updateValues = Object.values(userInfo);
	let queryString = `
	UPDATE users
	SET
	`;
	// add `value = $index,` for each pair in userObj
	updateFields.forEach((field, index) => {
		queryString += `${field} = $${index + 1},`;
	});
	let queryParams = [...updateValues, userId];
	let qString = queryString.slice(0, -1);
	qString += ` WHERE id = $${queryParams.length}
	RETURNING *;
	`;
	return pool
		.query(qString, queryParams)
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

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
