const Router = require('express');
const router = new Router();
const controllerevent = require('../controllers/listController');
const withAuth = require('../middleware/eventMiddleware');

router.post('/event/create', withAuth, controllerevent.createEvent);
router.post('/events', withAuth, controllerevent.getAllEvents);
router.get('/events/:id', controllerevent.getOneEvent);
router.put('/events', controllerevent.getUpdateEvent);
router.delete('/events/:id', controllerevent.getDeleteEvent);


module.exports = router;
