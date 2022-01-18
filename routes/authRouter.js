const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const eventsController = require('../controllers/usereventsController');
const { check } = require('express-validator');
const roleMiddleware = require('../middleware/roleMiddleware');
const withAuth = require('../middleware/eventMiddleware');


router.post('/registration', [
    check('username', 'Username cannot be empty').notEmpty(),
    check('password', 'Password must be more than 4 and less than 10 characters').isLength({ min: 4, max: 10 }),
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);
router.post('/userevents', withAuth, eventsController.registrEvent);
router.post('/userevents/all', eventsController.getAllEvents);

module.exports = router;
