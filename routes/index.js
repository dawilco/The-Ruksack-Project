const { Router } = require('express');
const auth = require('../middleware/auth');
const controllers = require('../controllers');
const eventControllers = require('../controllers/event');
const authControllers = require('../controllers/auth');
const organizerControllers = require('../controllers/organizer');

const router = Router();

router.get('/', (req, res) => res.send('Welcome'));

// ----------------------Auth---------------------- //
router.post('/login', authControllers.authUser);
router.post('/registration', authControllers.newUser);

// ----------------------Events---------------------- //
router.get('/events', eventControllers.all);
router.get('/events/:id', eventControllers.get);
router.post('/events', eventControllers.create);
router.put('/events/:id', eventControllers.update);

router.get('/events/:id/participants', controllers.getEventParticipants);

// ----------------------Events---------------------- //
router.post('/organizer/stripe/company', auth, organizerControllers.newStripeAccount);
router.post('/organizer/stripe/representative', auth, organizerControllers.newStripeRepresenative);

// --------------------Participants-------------------- //
router.get('/participants', controllers.getParticipants);
router.get('/participants/:id', controllers.getParticipant);
router.post('/participants', controllers.createParticipant);
router.put('/participants/:id', controllers.updateParticipant);

module.exports = router;