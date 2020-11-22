export interface Comment {
	id: number;
	commenter_id: number;
	posting_id: number;
	content: string;
	deleted: boolean;
	created_at: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	avatar: string;
	location: string;
	description: string;
	active: boolean;
}

export interface QueryFunctions {
	// Postings
	deletePosting: (postingId: Number, userId: Number) => Promise<Object>;
	editPosting: (
		postingId: Number,
		posting: {
			title?: string;
			content?: string;
			is_request?: boolean;
			owner_id: number;
		}
	) => Promise<Object>;
	addPosting: (posting: {
		title: string;
		content: string;
		is_request: boolean;
		owner_id: number;
	}) => Promise<Object>;
	getAllPostings: () => Promise<Array<Object>>;
	getPostingById: (postingId: Number) => Promise<Object>;

	// Comments
	deleteComment: (commentId: Number, commenterId: Number) => Promise<Object>;
	editComment: (
		commentId: Number,
		commenterId: Number,
		content: String
	) => Promise<Object>;
	getCommentById: (commentId: Number) => Promise<Object>;
	addComment: (
		postingId: Number,
		userId: Number,
		content: String
	) => Promise<Object>;
	getCommentsByPosting: (postingId: Number) => Promise<Array<Object>>;
	getAllComments: () => Promise<Array<Object>>;

	//Karma
	giveKarma: (commentId: Number, userId: Number) => Promise<Object>;
	getKarmaCountByComment: (commentId: Number) => Promise<Number>;
	getKarmaCountByUser: (userId: Number) => Promise<Number>;
	getAllKarmas: () => Promise<Array<Object>>;

	//Likes
	addLike: (postingId: Number, userId: Number) => Promise<Object>;
	getLikeCount: (postingId: Number) => Promise<Number>;
	getAllLikes: () => Promise<Array<Object>>;

	//Users
	editUserById: (
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
	) => Promise<Object>;

	register: (userInfo: {
		first_name: String;
		last_name: String;
		email: String;
		password: String;
		avatar: String;
		location: String;
		description: String;
	}) => Promise<Object>;
	validateLogin: (email: string, password: string) => Promise<Object>;
	getUsers: () => Promise<Object>;
	getUserById: (userId: Number) => Promise<Object>;
	getPostingsByUserId: (userId: Number) => Promise<Array<Object>>;
	getAllMessages: () => Promise<Array<Object>>;
	getConvo: (sender_id: Number, receiver_id: Number) => Promise<Array<Object>>;
}