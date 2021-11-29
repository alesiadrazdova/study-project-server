
const Event = require('../models/Event');
const { validationResult } = require('express-validator');
const uuid = require('uuid');
const path = require('path');

class listController {
    async createEvent(req, res) {
        
        try {           
            
            const errors = validationResult(req);

            

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Error creating event', errors });
            }

            const { nameevent, description, datestart, dateend, registstart, registend, address } = req.body;
            const existsEvent = await Event.findOne({ nameevent });

            if (existsEvent) {
                return res.status(400).json({ message: 'Event with the same name already exists' });
            }

            const file = req.files.picture;
            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve('static', fileName);
            file.mv(filePath);

            const event = new Event({ nameevent, description, datestart, dateend, registstart, registend, address, picture: fileName });

            // const event = new Event({ nameevent, description, datestart, dateend, registstart, registend, address, picture });

            await event.save();
            return res.status(200).json(event)
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }

    async getAllEvents(req, res) {
        try {
            const events = await Event.find({});
            res.json(events);
        } catch (e) {
            console.log(e);
        }
    }
    async getOneEvent(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ message: 'id not specified' });
            };
            const event = await Event.findById(id);
            return res.json(event);
        } catch (e) {
            console.log(e);
        }
    }
    async getUpdateEvent(req, res) {
        try {
            const event = req.body;
            if (!event._id) {
                res.status(400).json({ message: 'id not specified' });
            }
            const updateEvent = await Event.findByIdAndUpdate(event._id, event, { new: true} );
            return res.json(updateEvent);

        } catch (e) {
            console.log(e);
        }
    }
    async getDeleteEvent(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({ message: 'not specified' });
            };
            const event = await Event.findByIdAndDelete(id);
            return res.json(event);

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new listController();
