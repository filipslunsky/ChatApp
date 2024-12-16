const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticateLoginToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = user;
        next();
    });
};

module.exports = {
    authenticateLoginToken
};