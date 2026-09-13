class apiError extends Error {
    constructor(
        message = "Internal Server Error", 
        statusCode ,
        errors = [],
        statck = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.statck = statck;
    
    if (this.statck === statck) {
    
    }else {
        error.captureStackTrace(this, this.constructor);
    }
}
}
export { apiError };