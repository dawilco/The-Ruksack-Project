const { Router } = require('express');
const auth = require('../middleware/auth');
const controllers = require('../controllers');
const eventControllers = require('../controllers/event')

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

// ------------Authentication---------------
router.post('/login', controllers.authUser)
router.post('/registration', controllers.newUser)

router.get('/events', eventControllers.all);
router.get('/events/:id', eventControllers.get);
router.post('/events', eventControllers.create);
router.put('/events/:id', eventControllers.update);

router.get('/events/:id/participants', controllers.getEventParticipants)

router.get('/participants', controllers.getParticipants)
router.get('/participants/:id', controllers.getParticipant);
router.post('/participants', controllers.createParticipant);
router.put('/participants/:id', controllers.updateParticipant);

module.exports = router;