import { NextFunction, Request, Response } from "express";
import { UserService } from "../../users/services/user.service";
import { CommentService } from "../services/comment.service";
import { CreateCommentDTO, UpdateCommentDTO } from "../dtos/comment.dto";
import { PostService } from "../../posts/services/post.service";
import { SuccessMessages } from "../../../common/messages/success.message";
import { AuthenticatedUser } from "../../../common/types/user.types";
import { Controller } from "@nestjs/common";

@Controller("comments")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	// POST /posts/:postID/comments       (protected - create comment)
	async createComment(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as CreateCommentDTO;
			const postID = Number(req.params.postID);
			const authUser = req.user as AuthenticatedUser;
			const result = await this.commentService.createComment(
				postID,
				data,
				authUser,
			);
			return res
				.status(201)
				.json({ data: result, message: SuccessMessages.COMMENT_CREATED });
		} catch (error) {
			next(error);
		}
	}

	// GET /posts/:postID/comments         (public - get all comments of a post)
	async getCommentsOfPost(req: Request, res: Response, next: NextFunction) {
		try {
			const { postID } = req.params;
			const page = Number(req.query.page as string) || 1;
			const limit = Number(req.query.limit as string) || 10;

			const comments = await this.commentService.getCommentsOfPost(
				Number(postID),
				page,
				limit,
			);

			return res.status(200).json({ data: comments });
		} catch (error) {
			next(error);
		}
	}

	// GET /posts/:postID/comments/:commentID    (public - get a comment)
	async getComment(req: Request, res: Response, next: NextFunction) {
		try {
			const commentID = Number(req.params.commentID);
			const comment = await this.commentService.getCommentById(commentID);
			return res.status(200).json({ data: comment });
		} catch (error) {
			next(error);
		}
	}

	// PUT /posts/:postID/comments/:commentID    (protected - update a comment)
	async updateComment(req: Request, res: Response, next: NextFunction) {
		try {
			const postID = Number(req.params.postID);
			const commentID = Number(req.params.commentID);
			const data = req.body as UpdateCommentDTO;
			const authUser = req.user as AuthenticatedUser;

			const updatedComment = await this.commentService.updatePostComment(
				postID,
				data,
				commentID,
				authUser,
			);

			return res.status(201).json({
				data: updatedComment,
				message: SuccessMessages.COMMENT_UPDATED,
			});
		} catch (error) {
			next(error);
		}
	}

	// DELETE /posts/:postID/comments/:commentID    (protected - delete a comment)
	async deleteComment(req: Request, res: Response, next: NextFunction) {
		try {
			const postID = Number(req.params.postID);
			const commentID = Number(req.params.commentID);
			const authUser = req.user as AuthenticatedUser;
			await this.commentService.deleteComment(postID, commentID, authUser);
			return res
				.status(201)
				.json({ data: commentID, message: SuccessMessages.COMMENT_DELETED });
		} catch (error) {
			next(error);
		}
	}
}
