import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import {
	errorHandler,
	noRouteHandler,
} from "./common/middlewares/error-handler.middleware";
import allRoutesV1 from "./routes/v1.route";
import appConfig from "./configs/app.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(errorHandler);

// Health check
app.use("/health", (req: Request, res: Response) => {
	res.json({ ok: true, environment: appConfig.env });
});

// Route
app.use("/api", allRoutesV1);

// Catch all route 404 errors
app.use(/(.*)/, noRouteHandler);

// Error handler middleware
app.use(errorHandler);

export default app;
