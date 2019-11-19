const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'))

router.get('/events', controllers.getEvents);
router.get('/events/:id', controllers.getEvent);
router.post('/events', controllers.createEvent);
router.put('/events/:id', controllers.updateEvent);

router.get('/events/:id/participants', controllers.getEventParticipants)

router.get('/participants', controllers.getParticipants)
router.get('/participants/:id', controllers.getParticipant);
router.post('/participants', controllers.createParticipant);
router.put('/participants/:id', controllers.updateParticipant);

module.exports = router;