const Router = require('express');
const router = new Router();
const controllerevent = require('../controllers/listController');

router.post('/events', controllerevent.createEvent);
router.get('/events', controllerevent.getAllEvents);
router.get('/events/:id', controllerevent.getOneEvent);
router.put('/events', controllerevent.getUpdateEvent);
router.delete('/events/:id', controllerevent.getDeleteEvent);


module.exports = router;
