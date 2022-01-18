const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

class usereventsController {    
    async registrEvent(req, res) {
        try {
            const eventId = req.body._id;
            const decoded = jwt.verify(req.body.token, secret, 'jwt');
            let userID = decoded.id;

            const user = await User.findOne({ userID }).populate('userevents');   
            user.userevents.push(eventId);

            await user.save();

            res.json(user.userevents);

        } catch (e) {
            console.log(e);
        }
    }
    async getAllEvents(req, res) {
        try {            
            const { userevents } = req.body;
            const allUserEvents = await User.find({ userevents });
            res.json(allUserEvents);

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new usereventsController();
