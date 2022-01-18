const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (roles) {
    return function (req, res, next) {

        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            // const token = req.headers.authorization.split(' ')[1];
            const token = req.body.token;
            if (!token) {
                return res.status(403).json({ message: 'User unauthorisation' });
            }
            const { roles: userRoles } = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true;
                }
            })
            if(!hasRole) {
                return res.status(403).json({ message: 'You do not access'});
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: 'User unauthorisation' });
        }
    }

};
