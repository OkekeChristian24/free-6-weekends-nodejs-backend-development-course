import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { CreatePostDTO, UpdatePostDTO } from "../dtos/post.dto";
import { UserService } from "../../users/services/user.service";
import { SuccessMessages } from "../../../common/messages/success.message";
import { AuthenticatedUser } from "../../../common/types/user.types";

export class PostController {
	constructor(private postService: PostService) {}

	// POST /posts              (protected - create post)
	async createPost(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as CreatePostDTO;
			const authUser = req.user as AuthenticatedUser;
			const result = await this.postService.createPost(data, authUser);

			return res
				.status(201)
				.json({ data: result, message: SuccessMessages.POST_CREATED });
		} catch (error) {
			next(error);
		}
	}

	// GET /posts          (public - list posts)
	async getAllPosts(req: Request, res: Response, next: NextFunction) {
		try {
			const page = Number(req.query.page as string) || 1;
			const limit = Number(req.query.limit as string) || 20;
			const posts = await this.postService.getAllPosts(page, limit);
			return res.status(200).json({ data: posts });
		} catch (error) {
			next(error);
		}
	}

	// GET /posts/:postID      (public - single post)
	async getPost(req: Request, res: Response, next: NextFunction) {
		try {
			const { postID } = req.params;
			const post = await this.postService.getPostById(Number(postID));
			return res.status(200).json({ data: post });
		} catch (error) {
			next(error);
		}
	}

	// PUT /posts/:postID          (protected & ownership guard)
	async updatePost(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body as UpdatePostDTO;
			const { postID } = req.params;
			const authUser = req.user as AuthenticatedUser;
			const result = await this.postService.updatePost(
				Number(postID),
				data,
				authUser,
			);

			return res
				.status(201)
				.json({ data: result, message: SuccessMessages.POST_UPDATED });
		} catch (error) {
			next(error);
		}
	}

	// DELETE /posts/:postID        (protected & ownership guard)
	async deletePost(req: Request, res: Response, next: NextFunction) {
		try {
			const { postID } = req.params;
			const authUser = req.user as AuthenticatedUser;
			const result = await this.postService.deletePost(
				Number(postID),
				authUser,
			);

			return res.status(201).json({ data: result, message: "Post deleted" });
		} catch (error) {
			next(error);
		}
	}
}
