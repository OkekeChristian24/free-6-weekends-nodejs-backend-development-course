import { AuthenticatedUser } from "../user.types";

declare global {
	namespace Express {
		interface Request {
			user: AuthenticatedUser;
		}
	}
}

// declare module "express-serve-static-core" {
// 	interface Request {
// 		user: AuthenticatedUser;
// 	}
// }

export {};
