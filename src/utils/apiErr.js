class apiError extends Error {
    constructor(
        message = "Internal Server Error", 
        statusCode ,
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.stack = stack;
    
    if (this.stack === stack) {
    
    }else {
        error.captureStackTrace(this, this.constructor);
    }
}
}
export { apiError };