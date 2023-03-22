const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async(req, res, next) => {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.id);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports =auth