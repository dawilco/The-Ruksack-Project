const models = require("../database/models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op

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
        const event = await models.Event.findByPk(req.params.id, {
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
    const queryParams = {
        limit: 25, 
        order: [
            ['lastName', 'ASC']
        ],
    }
    if (req.query.limit) {
        queryParams.limit = req.query.limit;
    }
    if (req.query.offset) {
        queryParams.offset = req.query.offset;
    }
    if (req.query.filters) {
    }
    try {
        const participants = await models.Participant.findAll(queryParams);
        res.setHeader('X-Total-Count', participants.length);
        return res.status(200).json(participants);
    } catch (err) {
        return res.status(500).json({ error: error.message });
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
    createParticipant,
    getParticipants,
    getEventParticipants,
    getParticipant,
    updateParticipant
};