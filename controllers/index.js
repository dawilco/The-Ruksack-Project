const models = require("../database/models");
const Sequelize = require('sequelize');
const _ = require('lodash');
const Op = Sequelize.Op

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
        where: {}
    }
    if (req.query.limit) {
        queryParams.limit = req.query.limit;
    }
    if (req.query.offset) {
        queryParams.offset = req.query.offset;
    }
    if (req.query.name) {
        queryParams.where = {
            [Op.or]: _.flatten(_.map(['firstName', 'lastName'], function(item){
                return _.map(req.query.name.split(' '), function(q){
                    return {[item]: { [Op.iLike] : `%${q}%`}}
                })
            }))
        }
    }
    try {
        const participants = await models.Participant.findAll(queryParams);
        const total = await models.Participant.findAndCountAll();
        res.setHeader('X-Total-Count', total.count);
        return res.status(200).json(participants);
    } catch (err) {
        return res.status(500).json({ error: err.message });
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
    getParticipants,
    getEventParticipants,
    getParticipant,
    updateParticipant
};