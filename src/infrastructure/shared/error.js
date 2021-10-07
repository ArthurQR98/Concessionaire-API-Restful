function error(code, message) {
    new Error();
    error.status = code;
    error.message = message;
    throw error;
}

module.exports = error;