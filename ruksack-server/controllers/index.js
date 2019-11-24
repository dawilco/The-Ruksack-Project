const models = require("../database/models");
const crypto = require('crypto');

const authUser = async (req, res) => {
    try {
        const user = await models.User.findOne(
            {
            where: {
                email: req.body.email
            }
        });
        if (user) {
            const salt = user.getSalt(); 
            const hash = crypto.createHash('sha256').update(req.body.password+salt).digest('base64');
            if (user.password === hash) {
                token = user.generateAuthToken()
                return res.status(200).json({auth: token})
            } 
        }
        return res.status(401).send("Invalid Login");
    } catch (err) {
        return res.status(500).send({error: err.message})
    }
}

const createParticipant = async (req, res) => {
    try {
        const participant = await models.Participant.create(req.body);
        participant.addEvent(2)
        return res.status(200).json({
            participant
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

const getEventParticipants = async (req, res) => {
    try {
        // will need to change back to param if go the /event/id/participant route
        const event = await models.Event.findByPk(req.query.eventId, {
            include: [
                {
                    model: models.Participant,
                    as: 'Participants'
                }
            ]
        });
        res.setHeader('X-Total-Count', event.Participants.length);
        return res.status(200).json(event.Participants);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getParticipant = async (req, res) => {
    try {
        const participant = await models.Participant.findByPk(req.params.id);
        return res.status(200).json({
            participant
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getParticipants = async (req, res) => {
    if (req.query.eventId) {
        return getEventParticipants(req, res);
    }
    try {
        const participants = await models.Participant.findAll();
        res.setHeader('X-Total-Count', participants.length);
        return res.status(200).json(participants);
    } catch (err) {
        return res.status(500).json({ error: error.message });
    }
}

const newUser = async (req, res) => {
    const salt = new Date().toString();
    const password = req.body.password;
    const hashed = crypto.createHash('sha256').update(password+salt).digest('base64');

    try {
        const user = await models.User.create(
            {
                email: req.body.email,
                role: req.body.role,
                salt: salt,
                password: hashed
            }
        );
        const token = user.generateAuthToken();
        return res.status(200).json({auth: token})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const updateParticipant = async (req, res) => {
    try {
        const participantId  = req.params.id;
        const [updated] = await models.Participant.update(req.body, {
          where: { id: participantId }
        });
        if (updated) {
          const updatedParticipant = await models.Participant.findOne({ where: { id: participantId } });
          return res.status(200).json({ post: updatedParticipant });
        }
        return res.sendStatus(404)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
module.exports = {
    authUser,
    createParticipant,
    getParticipants,
    getEventParticipants,
    getParticipant,
    newUser,
    updateParticipant
};