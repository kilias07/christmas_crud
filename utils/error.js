class ValidationError extends Error {}
class NotFoundError extends Error {}

const handleError = (err, req, res, next) => {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: "Can't find element, ID is incorrect"
            });
    }

    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
        error: err instanceof ValidationError ? err.message : "temporary server error",
    });
}

module.exports = {
    handleError,
    ValidationError,
}