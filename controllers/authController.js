const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }

            const { username, password } = req.body;
            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({ message: 'User with the same name already exists' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: 'USER' });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });

            await user.save();
            return res.json({ message: 'User registered successfully' })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async login(req, res) {
        try {
        
            const { username, password } = req.body;
            
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: `User ${username} not found` });
            }
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Wrong password entered' });
            }
            const token = generateAccessToken(user._id, user.roles);
            console.log(user._id)
           
            return res.json({ token });

        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
    async registrEvent(req, res) {
        try {
            const eventId = req.body._id;
            const decoded = jwt.verify(req.body.token, secret, 'jwt');
            let userID = decoded.id;

            console.log(eventId);
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
            console.log(userevents)
            const allUserEvents = await User.find({ userevents });
            res.json(allUserEvents);

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();
