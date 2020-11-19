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
	deletePosting: (postingId: number, userId: number) => Promise<object>;
	editPosting: (
		postingId: number,
		posting: {
			title?: string;
			content?: string;
			is_request?: boolean;
			owner_id: number;
		}
	) => Promise<object>;
	addPosting: (posting: {
		title: string;
		content: string;
		is_request: boolean;
		owner_id: number;
	}) => Promise<object>;
	getAllPostings: () => Promise<Array<object>>;
	getPostingById: (postingId: number) => Promise<object>;

	// Comments
	deleteComment: (commentId: number, commenterId: number) => Promise<Comment>;
	editComment: (
		commentId: number,
		commenterId: number,
		content: string
	) => Promise<Comment>;
	getCommentById: (commentId: number) => Promise<Comment>;
	addComment: (
		postingId: number,
		userId: number,
		content: string
	) => Promise<Comment>;
	getCommentsByPosting: (postingId: number) => Promise<Array<Comment>>;
	getAllComments: () => Promise<Array<Comment>>;

	//Karma
	giveKarma: (commentId: number, userId: number) => Promise<object>;
	getKarmaCountByComment: (commentId: number) => Promise<number>;
	getKarmaCountByUser: (userId: number) => Promise<number>;
	getAllKarmas: () => Promise<Array<object>>;

	//Likes
	addLike: (postingId: number, userId: number) => Promise<object>;
	getLikeCount: (postingId: number) => Promise<number>;
	getAllLikes: () => Promise<Array<object>>;

	//Users
	editUserById: (
		userInfo: {
			first_name?: string;
			last_name?: string;
			email?: string;
			password?: string;
			avatar?: string;
			location?: string;
			description?: string;
		},
		userId: number
	) => Promise<object>;

	register: (userInfo: {
		first_name: string;
		last_name: string;
		email: string;
		password: string;
		avatar: string;
		location: string;
		description: string;
	}) => Promise<object>;
	validateLogin: (email: string, password: string) => Promise<object>;
	getUsers: () => Promise<object>;
	getUserById: (userId: number) => Promise<object>;
	getPostingsByUserId: (userId: number) => Promise<Array<object>>;
	getAllMessages: () => Promise<Array<object>>;
	getConvo: (sender_id: number, receiver_id: number) => Promise<Array<object>>;
}
