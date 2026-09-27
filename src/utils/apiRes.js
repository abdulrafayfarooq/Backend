class apiRes {
    constructor(message = "Success", statusCode, data) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export default apiRes;
