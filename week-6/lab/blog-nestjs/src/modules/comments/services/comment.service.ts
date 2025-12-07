import { Pool, ResultSetHeader } from "mysql2/promise";
import { CreateCommentDTO, UpdateCommentDTO } from "../dtos/comment.dto";
import { CommentEntity } from "../entities/comment.entity";
import { PostService } from "../../posts/services/post.service";
import { AuthenticatedUser } from "../../../common/types/user.types";
import { UserService } from "../../users/services/user.service";
import {
	ForbiddenException,
	NotFoundException,
	UnauthorizedException,
} from "../../../common/exceptions";
import { ExceptionMessages } from "../../../common/messages/exception.message";
import { CaseCasted } from "../../../common/constants/variables";

export class CommentService {
	constructor(
		private readonly postService: PostService,
		private readonly userService: UserService,
		private readonly pool: Pool,
	) {}

	// Create a comment for a post
	async createComment(
		postID: number,
		data: CreateCommentDTO,
		authUser: AuthenticatedUser,
	): Promise<CommentEntity | undefined> {
		const { text } = data;
		const user = await this.userService.getUserById(authUser.id);
		if (!user) {
			throw new UnauthorizedException();
		}

		const post = await this.postService.getPostById(postID);
		if (!post) {
			throw new NotFoundException(ExceptionMessages.POST_NOT_FOUND);
		}

		const [result] = await this.pool.execute(
			"INSERT INTO `comment`(`text`, `post_id`, `user_id`) VALUES(?, ?, ?)",
			[text, postID, user.id],
		);
		const insertResult = result as ResultSetHeader;
		const comment = await this.getCommentById(insertResult.insertId);
		return comment;
	}

	async getCommentById(commentID: number): Promise<CommentEntity> {
		const [comments] = await this.pool.query<CommentEntity[]>(
			"SELECT * FROM `comment` WHERE `id` = ?",
			[commentID],
		);
		const comment = comments[0];
		if (!comment) {
			throw new NotFoundException(ExceptionMessages.COMMENT_NOT_FOUND);
		}
		return comment;
	}

	// Get all post comments
	async getCommentsOfPost(
		postID: number,
		page: number,
		limit: number,
	): Promise<CommentEntity[] | undefined> {
		const post = await this.postService.getPostById(postID);

		const offset = (page - 1) * limit;
		const [comments] = await this.pool.query<CommentEntity[]>(
			"SELECT * FROM `comment` WHERE `post_id` = ? ORDER BY `created_at` DESC LIMIT ? OFFSET ?",
			[post?.id, limit, offset],
		);
		// "SELECT p.`id`, p.`title`, p.`content`, p.`user_id` as author_id, p.`created_at` as created_at, p.`updated_at` as updated_at, u.`name` as author_name, u.`email` as author_email FROM `post` p LEFT JOIN `user` u ON p.`user_id` = u.`id` ORDER BY created_at DESC",

		return comments;
	}

	async updatePostComment(
		postID: number,
		data: UpdateCommentDTO,
		commentID: number,
		user: AuthenticatedUser,
	): Promise<CommentEntity | undefined> {
		const { text } = data;

		// It will abort if the post the comment belongs to does not exist
		const post = await this.postService.getPostById(postID);

		// It will abort if the comment does not exist
		const comment = await this.getCommentById(commentID);

		// Abort if the comment does not belong to the post
		if (comment[CaseCasted.postID] !== post.id) {
			throw new ForbiddenException();
		}

		// Abort if the comment does not belong to the authenticated user
		if (comment[CaseCasted.userID] !== user.id) {
			throw new ForbiddenException();
		}

		await this.pool.execute("UPDATE `comment` SET `text` = ? WHERE `id` = ?", [
			text,
			commentID,
		]);
		const updatedComment = await this.getCommentById(commentID);
		return updatedComment;
	}

	async deleteComment(
		postID: number,
		commentID: number,
		user: AuthenticatedUser,
	) {
		// It will abort if the post the comment belongs to does not exist
		const post = await this.postService.getPostById(postID);

		// It will abort if the comment does not exist
		const comment = await this.getCommentById(commentID);

		// Abort if the comment does not belong to the post
		if (comment[CaseCasted.postID] !== post.id) {
			throw new ForbiddenException();
		}

		// Abort if the comment does not belong to the authenticated user
		if (comment[CaseCasted.userID] !== user.id) {
			throw new ForbiddenException();
		}

		await this.pool.execute("DELETE FROM `comment` WHERE `id` = ?", [
			commentID,
		]);
		return commentID;
	}
}
