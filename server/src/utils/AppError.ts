export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Raccourcis pour les cas d'usage les plus fréquents
export class NotFoundError extends AppError {
  constructor(resource = "Ressource") {
    super(`${resource} introuvable`, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Requête invalide") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Non authentifié") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Accès refusé") {
    super(message, 403);
  }
}