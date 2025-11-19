export class AppError extends Error {
	public statusCode: number;

	constructor(message: string, statusCode = 500) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestException extends AppError {
	constructor(message = "Bad request") {
		super(message, 400);
	}
}

export class UnauthorizedException extends AppError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

export class ForbiddenException extends AppError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}

export class NotFoundException extends AppError {
	constructor(message = "Resource not found") {
		super(message, 404);
	}
}

export class ConflictException extends AppError {
	constructor(message = "Resource conflict") {
		super(message, 409);
	}
}

export class InternalServerErrorException extends AppError {
	constructor(message = "Internal server error") {
		super(message, 500);
	}
}

export class ServiceUnavailableException extends AppError {
	constructor(message = "Service temporarily unavailable") {
		super(message, 503);
	}
}
