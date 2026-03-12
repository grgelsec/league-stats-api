export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    //'this' tells what to attach the stack trace to, this.constructor tells where to start the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/*
the chain when you write throw new NotFoundError('Summoner not found')

1. NotFoundError constructor runs, receives 'Summoner not found'
2. super('Summoner not found', 404) calls AppError's constructor
3. AppError runs super('Summoner not found') which calls Error's constructor — stores the message
4. AppError sets this.statusCode = 404, this.isOperational = true, captures the stack trace
5. You get back a fully built error object with the right message, status code, and stack trace
*/

// prevents you from hardcoding the error codes everywhere
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Invalid or missing authentication credentials") {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message = "Access denied. Lack required privileges to access requested resource.",
  ) {
    super(message, 403);
  }
}
