const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map(error => error.msg);
        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 404;
        err.title = 'Bad request.';
        return next(err);
    }
    next();
}

module.exports = handleValidationErrors;
