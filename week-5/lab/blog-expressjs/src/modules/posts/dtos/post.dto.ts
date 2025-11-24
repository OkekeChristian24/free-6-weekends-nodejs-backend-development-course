export interface CreatePostDTO {
	title: string;
	content: string;
}

export interface UpdatePostDTO {
	title?: string;
	content?: string;
}
