const jwt = require('jsonwebtoken');
const { secret } = require('../config');

 const withAuth= function  (req, res, next) {

        try {
            const token = req.body.token;

            if (!token) {
                return res.status(401).json({ message: 'Unauthorizet: No token provided' });
            } else {
                jwt.verify(token, secret, function (err, decoded) {
                    if(err) {
                        return res.status(401).json({ message: 'Invalid token' });
                    } else {
                        req.user = decoded;
                    }
                });
               
            } 
            next();

        } catch (e) {
            console.log(e);
            return res.status(401).json({ message: 'Unauthorizet: No token provided' });
        }
};

module.exports = withAuth;
  