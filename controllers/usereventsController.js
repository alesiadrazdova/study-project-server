const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

class usereventsController {    
    async registrEvent(req, res) {
        try {
            const eventId = req.body._id;
            const decoded = jwt.verify(req.body.token, secret, 'jwt');
            let userID = decoded.id;

            let user = await User.findOne({ userID }).populate('userevents');   
            user.userevents.push(eventId);

            await user.save();

            res.json(user.userevents);

        } catch (e) {
            console.log(e);
        }
    }
    async getAllEvents(req, res) {
        try {   
            const decoded = jwt.verify(req.body.token, secret, 'jwt');
            const userID = decoded.id;

            console.log(userID)
            const user = await User.findOne({ userID }).populate('userevents');  
            console.log(user)

            res.json(user.userevents);

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new usereventsController();