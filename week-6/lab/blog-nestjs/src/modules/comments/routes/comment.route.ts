import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { CommentService } from "../services/comment.service";
import { PostService } from "../../posts/services/post.service";
import pool from "../../../configs/database.config";
import { UserService } from "../../users/services/user.service";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import {
	createCommentValidator,
	updateCommentValidator,
} from "../../../common/validators/comment.validator";
import { validate } from "../../../common/middlewares/validate.middleware";
import { RedisService } from "../../../providers/redis.provider";
import redis from "../../../configs/redis.config";

// mergeParams - for nesting APIs
const router = Router({ mergeParams: true });

const userService = new UserService(pool);
const redisService = new RedisService(redis);
const postService = new PostService(pool, redisService);
const commentService = new CommentService(postService, userService, pool);
const commentController = new CommentController(commentService);

// POST /posts/:postID/comments       (protected - create comment)
router.post(
	"/",
	authMiddleware,
	createCommentValidator,
	validate,
	commentController.createComment.bind(commentController),
);

// GET /posts/:postID/comments         (public - get all comments of a post)
router.get("/", commentController.getCommentsOfPost.bind(commentController));

// PUT /posts/:postID/comments/:commentID    (protected - update a comment)
router.put(
	"/:commentID",
	authMiddleware,
	updateCommentValidator,
	validate,
	commentController.updateComment.bind(commentController),
);

// DELETE /posts/:postID/comments/:commentID    (protected - delete a comment)
router.delete(
	"/:commentID",
	authMiddleware,
	commentController.deleteComment.bind(commentController),
);

export default router;
