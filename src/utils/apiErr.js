class apiError extends Error {
    constructor(statusCode, message = "Internal Server Error", errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default apiError;
