const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const { db } = require('../models/User');

class usereventsController {
    async registrEvent(req, res) {
        try {
            const eventId = req.body._id;
            const decoded = jwt.verify(req.body.token, secret, 'jwt');
            let userID = decoded.id;

            let user = await User.findById(userID).populate('userevents');
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

            const user = await User.findById(userID).populate('userevents');

            res.json(user.userevents);

        } catch (e) {
            console.log(e);
        }
    }

    async deleteUserevent(req, res) {

        try {
            const decoded = jwt.verify(req.headers.token, secret, 'jwt');
            const userID = decoded.id;

            let user = await User.findById(userID);


            const id = req.params.id;

            if (!id) {
                res.status(400).json({ message: 'id not specified' });
            };
            
            console.log(user.userevents)

            db.users.update({}, {$unset:{"userevents.$": id}});
            db.users.update({}, {$pull:{"userevents": null}});
            
            // db.User.updateOne({
            //     _id: userID
            // }, {
            //     $set: {
            //         'userevents.$': {
            //              id
            //         }
            //     }
            // })

            // db.users.update({
            //     _id: userID
            // }, {
            //     $pull: {
            //         'userevents': {
            //             _id: id
            //         }
            //     }
            // })




            return res.json(user);



        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new usereventsController();
