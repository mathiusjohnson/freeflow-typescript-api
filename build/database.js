"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostingsByUserId = exports.getUserById = exports.getUsers = exports.validateLogin = exports.register = exports.editUserById = exports.getLikeCount = exports.addLike = exports.getKarmaCountByUser = exports.getKarmaCountByComment = exports.giveKarma = exports.getCommentsByPosting = exports.addComment = exports.getCommentById = exports.editComment = exports.deleteComment = exports.getPostingById = exports.getAllPostings = exports.addPosting = exports.editPosting = exports.deletePosting = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
exports.deletePosting = (postingId, userId) => {
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
exports.editPosting = (postingId, posting) => {
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
    qString += ` WHERE id = $${queryParams.length - 1} AND owner_id = $${queryParams.length}
	RETURNING *;
	`;
    return pool
        .query(qString, queryParams)
        .then(resolve => {
        return resolve.rows[0];
    })
        .catch(error => console.log(error));
};
exports.addPosting = (posting) => {
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
exports.getAllPostings = () => {
    const queryString = `
	SELECT *
	FROM postings WHERE "deleted" = false
	`;
    return pool
        .query(queryString)
        .then(resolve => resolve.rows)
        .catch(error => console.log(error));
};
exports.getPostingById = (postingId) => {
    const queryString = `
	SELECT *
	FROM postings WHERE "deleted" = false AND "id" = $1
	`;
    return pool
        .query(queryString, [postingId])
        .then(resolve => resolve.rows)
        .catch(error => console.log(error));
};
exports.deleteComment = (commentId, commenterId) => {
    const queryString = `
	UPDATE comments SET "deleted" = 'true' where id = $1 AND commenter_id = $2
	RETURNING *
	`;
    return pool
        .query(queryString, [commentId, commenterId])
        .then(resolve => resolve.rows[0])
        .catch(error => console.log(error));
};
exports.editComment = (commentId, commenterId, content) => {
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
exports.getCommentById = (commentId) => {
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
exports.addComment = (postingId, userId, content) => {
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
exports.getCommentsByPosting = (postingId) => {
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
exports.giveKarma = (commentId, userId) => {
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
exports.getKarmaCountByComment = (id) => {
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
exports.getKarmaCountByUser = (id) => {
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
exports.addLike = (postingId, userId) => {
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
exports.getLikeCount = (id) => {
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
exports.editUserById = (userInfo, userId) => {
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
exports.register = (userInfo) => {
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
exports.validateLogin = (email, password) => {
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
exports.getUsers = () => {
    return pool
        .query(`
  SELECT * FROM users
`)
        .then(resolve => resolve.rows)
        .catch(error => console.log(error));
};
exports.getUserById = (id) => {
    return pool
        .query(`
  SELECT * FROM users
    WHERE id = $1
  `, [id])
        .then(resolve => resolve.rows[0])
        .catch(error => console.log(error));
};
exports.getPostingsByUserId = (option) => {
    return pool
        .query(`
    SELECT * FROM postings
    WHERE owner_id = $1
    `, [option])
        .then(resolve => resolve.rows)
        .catch(error => console.log(error));
};
// exports = { getUsers };
// module.exports = { getUsers, getPostingsByUsers };