const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');


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

    async deleteUserEvent(req, res) {

        try {
            const decoded = jwt.verify(req.headers.token, secret, 'jwt');
            const userId = decoded.id;

            const eventId = req.params.id;

            // User.findOneAndUpdate({ _id: userId }, { $pull: { userevents: {_id: eventId }} }, function(eventId) {
            //     if (!eventId) {
            //         return res.status(400).json({ message: 'Event not exists' });
            // }
            // });

           // User.findOneAndUpdate({ _id: userId }, { $pull: { userevents: {_id: eventId }} }, { returnNewDocument: true })
           //      .then(updatedDocument => {
           //          if(updatedDocument) {
           //              console.log(`Successfully updated document: ${updatedDocument}.`)
           //          } else {
           //              console.log("No document matches the provided query.")
           //          }
           //
           //          return res.json(updatedDocument.userevents);
           //      })
           //      .catch(err => console.error(`Failed to find and update document: ${err}`))

            User.findOneAndUpdate(
                { _id: userId },
                { $pull: { userevents: {$in: [eventId]} } },
                { new: true }
            )
                .then(templates => {
                    console.log(templates.userevents);

                    return res.json(templates.userevents);

                })
                .catch(err => console.log(err));


            // let userId = await User.findById(userID);
            // console.log(db.collections.users)

            // console.log(db.events)

            // if (!eventId) {
            //     res.status(400).json({ message: 'id not specified' });
            // };

            // console.log(user.userevents)

            // db.collections.users.updateOne({}, {$unset:{"userevents.$": id}});
            // db.collections.users.updateOne({}, {$pull:{"userevents": null}});

            // db.users.updateOne({_id : user }, {$pull: {userevents: id}})

            // db.users.update({}, {$unset:{"userevents.$": ObjectId(eventId)}});
            // db.users.update({}, {$pull:{"userevents": null}});

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

            // return res.json(user);


        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new usereventsController();
