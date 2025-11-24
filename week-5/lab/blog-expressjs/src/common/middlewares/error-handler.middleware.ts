import { Request, Response, NextFunction } from "express";
import appConfig from "../../configs/app.config";
import { getErrorMessage } from "../utils/helpers";
import { AppError } from "../exceptions";

const DEFAULT_MSG = "Sorry. Something went wrong";

const createErrorObj = (
	errorMsg: string,
	errorType?: string,
	errorPath?: string,
	errorLocation?: string,
) => {
	return {
		type: errorType,
		msg: errorMsg,
		path: errorPath,
		location: errorLocation,
	};
};

export const errorHandler2 = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (res.headersSent || appConfig.debug) {
		console.error(err);
		next(err);
		return;
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		});
	}

	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		message:
			statusCode > 499 ? DEFAULT_MSG : getErrorMessage(err) || DEFAULT_MSG,
	});
};

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err);

	if (res.headersSent || appConfig.debug) {
		next(err);
		return;
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			errors: [createErrorObj(err.message)],
			// message: err.message,
		});
	}

	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		errors: [createErrorObj(DEFAULT_MSG)],
		// message: statusCode > 499 ? DEFAULT_MSG : getErrorMessage(err) || DEFAULT_MSG,
	});
};

export const noRouteHandler = (req: Request, res: Response) => {
	res.status(404).json({ message: "Route not found" });
};
