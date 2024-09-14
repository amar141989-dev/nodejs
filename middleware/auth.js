const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
    try {
        const authHeader = req.headers["authentication"]
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return res.status(403).send(JSON.stringify({status:403, message: "Access forbidden!"}));
        const decoded = jwt.verify(token, "secret#@123");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send(JSON.stringify({status:401, message: "Specified token is not valid!"}));
    }
};

module.exports = validateToken