import { Pool, ResultSetHeader } from "mysql2/promise";
import { User } from "../../users/entities/user.entity";
import { CreatePostDTO, UpdatePostDTO } from "../dtos/post.dto";
import { Post } from "../entities/post.entity";
import { AuthenticatedUser } from "../../../common/types/user.types";
import {
	ForbiddenException,
	NotFoundException,
} from "../../../common/exceptions";
import { ExceptionMessages } from "../../../common/messages/exception.message";
import { CaseCasted } from "../../../common/constants/variables";

export class PostService {
	constructor(private pool: Pool) {}

	// Create a post
	async createPost(
		data: CreatePostDTO,
		user: AuthenticatedUser,
	): Promise<Post | undefined> {
		const { title, content } = data;

		const [result] = await this.pool.execute(
			"INSERT INTO `post`(`title`, `content`, `user_id`) VALUES(?, ?, ?)",
			[title, content, user.id],
		);
		const insertResult = result as ResultSetHeader;
		const post = await this.getPostById(insertResult.insertId);
		return post;
	}

	// Get a post
	async getPostById(id: number): Promise<Post> {
		const [posts] = await this.pool.query<Post[]>(
			"SELECT p.`id`, p.`title`, p.`content`, p.`user_id` as author_id, p.`created_at` as created_at, p.`updated_at` as updated_at, u.`name` as author_name, u.`email` as author_email FROM `post` p LEFT JOIN `user` u ON p.`user_id` = u.`id` WHERE p.`id` = ?",
			[id],
		);
		const post = posts[0];
		if (!post) {
			throw new NotFoundException(ExceptionMessages.POST_NOT_FOUND);
		}
		return post;
	}

	// Get all posts
	async getAllPosts(page: number, limit: number): Promise<Post[]> {
		const offset = (page - 1) * limit;
		const [posts] = await this.pool.query<Post[]>(
			"SELECT p.`id`, p.`title`, p.`content`, p.`user_id` as author_id, p.`created_at` as created_at, p.`updated_at` as updated_at, u.`name` as author_name, u.`email` as author_email FROM `post` p LEFT JOIN `user` u ON p.`user_id` = u.`id` ORDER BY created_at DESC LIMIT ? OFFSET ?",
			[limit, offset],
		);

		return posts;
	}

	// Update a post
	async updatePost(
		id: number,
		data: UpdatePostDTO,
		user: AuthenticatedUser,
	): Promise<Post | undefined> {
		// It will abort if post does not exist
		const post = await this.getPostById(id);

		// Abort if post does not belong to the authenticated user
		if (post[CaseCasted.authorID] !== user.id) {
			throw new ForbiddenException();
		}

		const updates = [];
		const params = [];
		const { title, content } = data;
		if (title) {
			updates.push("`title` = ?");
			params.push(title);
		}
		if (content) {
			updates.push("`content` = ?");
			params.push(content);
		}
		params.push(id);

		const sql =
			"UPDATE `post` SET " + updates.join(", ") + " WHERE `id` = ? LIMIT 1";
		await this.pool.execute(sql, params);

		const updatedPost = await this.getPostById(id);
		return updatedPost;
	}

	// Delete a post
	async deletePost(id: number, user: AuthenticatedUser) {
		// It will abort if post does not exist
		const post = await this.getPostById(id);

		// Abort if post does not belong to the authenticated user
		if (post[CaseCasted.authorID] !== user.id) {
			throw new ForbiddenException();
		}

		await this.pool.execute("DELETE FROM `post` WHERE `id` = ?", [id]);
		return { id };
	}
}
