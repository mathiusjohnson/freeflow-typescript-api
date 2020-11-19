import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;
const pool = new Pool({
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

export const getAllKarmas = () => {
	return pool
		.query(
			`
	SELECT giver_id, users.id as receiver_id, comment_id
	from karmas
	JOIN comments ON comment_id = comments.id
	JOIN users ON commenter_id = users.id
	`
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const getAllLikes = () => {
	return pool
		.query(`SELECT * from likes`)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const getAllComments = () => {
	return pool
		.query(`SELECT * from comments`)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const deletePosting = (postingId: Number, userId: Number) => {
	const queryString = `
	UPDATE postings SET "deleted" = 'true' where id = $1 AND owner_id = $2
	RETURNING *
	`;
	return pool
		.query(queryString, [postingId, userId])
		.then(resolve => {
			console.log(resolve.rows);
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const editPosting = (
	postingId: Number,
	posting: {
		title?: string;
		content?: string;
		is_request?: boolean;
		owner_id: number;
	}
) => {
	const updateFields = Object.keys(posting);
	const updateValues = Object.values(posting);
	let queryString = `
	UPDATE postings
	SET
	`;
	// add `value = $index,` for each pair in userObj
	updateFields.forEach((field, index) => {
		queryString += `${field} = $${index + 1},`;
	});
	let queryParams = [...updateValues, postingId, posting.owner_id];
	let qString = queryString.slice(0, -1);
	qString += ` WHERE id = $${queryParams.length - 1} AND owner_id = $${
		queryParams.length
	}
	RETURNING *;
	`;
	return pool
		.query(qString, queryParams)
		.then(resolve => {
			return resolve.rows[0];
		})
		.catch(error => console.log(error));
};

export const addPosting = (posting: {
	title: string;
	content: string;
	is_request: boolean;
	owner_id: number;
}) => {
	const queryString = `
	INSERT INTO postings
	(title, content, is_request, owner_id)
	VALUES ($1, $2, $3, $4)
	RETURNING *
	`;
	const queryParams = Object.values(posting);
	return pool
		.query(queryString, queryParams)
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const getAllPostings = () => {
	const queryString = `
	SELECT *
	FROM postings WHERE "deleted" = false
	`;
	return pool
		.query(queryString)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const getPostingById = (postingId: Number) => {
	const queryString = `
	SELECT *
	FROM postings WHERE "deleted" = false AND "id" = $1
	`;
	return pool
		.query(queryString, [postingId])
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const deleteComment = (commentId: Number, commenterId: Number) => {
	const queryString = `
	UPDATE comments SET "deleted" = 'true' where id = $1 AND commenter_id = $2
	RETURNING *
	`;
	return pool
		.query(queryString, [commentId, commenterId])
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const editComment = (
	commentId: Number,
	commenterId: Number,
	content: String
) => {
	console.log(commentId, content);
	const queryString = `
	UPDATE comments SET "content" = $1 where id = $2 AND commenter_id = $3
	RETURNING *
	`;
	return pool
		.query(queryString, [content, commentId, commenterId])
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

export const getKarmaCountByComment = (commentId: Number) => {
	const queryString = `
	SELECT COUNT(*)
		FROM karmas
		WHERE comment_id = $1
	`;
	return pool
		.query(queryString, [commentId])
		.then(resolve => {
			return resolve.rows[0].count;
		})
		.catch(error => console.log(error));
};

export const getKarmaCountByUser = (userId: Number) => {
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
		.query(queryString, [userId])
		.then(resolve => {
			return resolve.rows[0].count;
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

export const getLikeCount = (postingId: Number) => {
	const queryString = `
	SELECT COUNT(*)
		FROM likes
		WHERE posting_id = $1
	`;
	return pool
		.query(queryString, [postingId])
		.then(resolve => {
			return resolve.rows[0].count;
		})
		.catch(error => console.log(error));
};

export const editUserById = (
	userInfo: {
		first_name?: String;
		last_name?: String;
		email?: String;
		password?: String;
		avatar?: String;
		location?: String;
		description?: String;
	},
	userId: Number
) => {
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

export const register = (userInfo: {
	first_name: String;
	last_name: String;
	email: String;
	password: String;
	avatar: String;
	location: String;
	description: String;
}) => {
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
	const queryString = `
	SELECT * from users WHERE email = $1`;
	return pool
		.query(queryString, [email])
		.then(resolve => {
			const userObj = resolve.rows[0];
			return bcrypt.compare(password, userObj.password).then(result => {
				if (result === true) {
					return userObj;
				}
			});
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

export const getUserById = (userId: Number) => {
	return pool
		.query(
			`
  SELECT * FROM users
    WHERE id = $1
  `,
			[userId]
		)
		.then(resolve => resolve.rows[0])
		.catch(error => console.log(error));
};

export const getPostingsByUserId = (userId: Number) => {
	return pool
		.query(
			`
    SELECT * FROM postings
    WHERE owner_id = $1
    `,
			[userId]
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

// exports = { getUsers };
// module.exports = { getUsers, getPostingsByUsers };

export const getAllMessages = () => {
	return pool
		.query(
			`
		SELECT *
		FROM messages
		;
		`,
			[]
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};

export const getConvo = (sender_id: Number, receiver_id: Number) => {
	return pool
		.query(
			`
		SELECT *
		FROM messages
		WHERE sender_id = $1 AND receiver_id = $2
		;
		`,
			[sender_id, receiver_id]
		)
		.then(resolve => resolve.rows)
		.catch(error => console.log(error));
};
