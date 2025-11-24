import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { PostService } from "../services/post.service";
import {
	createPostValidator,
	updatePostValidator,
} from "../../../common/validators/post.validator";
import { validate } from "../../../common/middlewares/validate.middleware";
import { authMiddleware } from "../../../common/middlewares/auth.middleware";
import pool from "../../../configs/database.config";
import redis from "../../../configs/redis.config";
import commentRouter from "../../comments/routes/comment.route";
import { RedisService } from "../../../providers/redis.provider";

const router = Router();

const redisService = new RedisService(redis);
const postService = new PostService(pool, redisService);
const postController = new PostController(postService);

router.post(
	"/",
	authMiddleware,
	createPostValidator,
	validate,
	postController.createPost.bind(postController),
);

router.get("/", postController.getAllPosts.bind(postController));

router.get("/redis-test/:count", postController.testRedis.bind(postController));
router.post(
	"/redis-test/:count/invalidate",
	postController.invalidateTestRedis.bind(postController),
);

router.get("/:postID", postController.getPost.bind(postController));

router.put(
	"/:postID",
	authMiddleware,
	updatePostValidator,
	validate,
	postController.updatePost.bind(postController),
);

router.use("/:postID/comments", commentRouter);

export default router;
