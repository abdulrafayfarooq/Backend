const requestHandler = (asyncHandler) => {
    return (req, res, next) => {
        Promise.resolve(asyncHandler(req, res, next)).catch((err) => {
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message || "Internal Server Error",
                errors: err.errors || []
            });
        });
    };
};

export default requestHandler;
