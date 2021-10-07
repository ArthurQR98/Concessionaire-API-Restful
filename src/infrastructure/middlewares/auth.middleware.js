const jwt = require('jsonwebtoken');
const { Error } = require('../shared');
const { JWT_SECRET } = require('../config');

module.exports = function (req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        const error = Error(400, "Token must be sent");
        return error;
    }

    jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
        if (err) {
            const error = Error(401, "Invalid Token");
            return error;
        }

        req.user = decodedToken.user;
        next();
    });
}