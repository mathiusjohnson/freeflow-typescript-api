export interface QueryFunctions {
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
	deleteComment: () => Promise<Object>;
	editComment: () => Promise<Object>;
	getCommentById: () => Promise<Object>;
	addComment: () => Promise<Object>;
	getCommentsByPosting: () => Promise<Array<Object>>;
	giveKarma: () => Promise<Object>;
	getKarmaCountByComment: () => Promise<Number>;
	getKarmaCountByUser: () => Promise<Number>;
	addLike: () => Promise<Object>;
	getLikeCount: () => Promise<Number>;
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
	getConvo: () => Promise<Array<Object>>;
}
