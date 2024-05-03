require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Unauthorized, token does not exist"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            message: "Token does not exist"
        });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: "Cannot verify JWT token. " + err
            });
        } else if (decoded) {
            req.user = decoded;
            next();
        }
        else {
            res.status(401).json({
                message: "Token is invalid or expired"
            });
        }
    });
};
