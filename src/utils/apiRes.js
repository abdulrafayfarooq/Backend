class apiRes extends Response {
    constructor(message="Success", statusCode,data) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.success = statusCode<400;

    }
}

module.exports = apiRes;