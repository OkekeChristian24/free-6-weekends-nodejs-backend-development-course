import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedUser } from "../types/user.types";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_SECRET!);
		req.user = decoded as AuthenticatedUser;
		next();
	} catch {
		res.status(401).json({ message: "Invalid token" });
	}
};
