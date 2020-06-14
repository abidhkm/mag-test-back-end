const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "my-top-secret"
exports.generateToken = (email, id) => {
    return jwt.sign({ email, id }, TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });
}

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}