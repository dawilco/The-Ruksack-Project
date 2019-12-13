const models = require('../../database/models');

const create = async (req, res) => {
    try {
        const user = await models.User.findByPk(req.user.id);
        const participant = await user.getParticipant();
        const event = await models.Event.findByPk(req.body.EventId);

        event.addParticipant(participant, { through: 
            {
                amountPaid: req.body.amountPaid,
                customDataField: req.body.customDataField
            }
        });

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

module.exports = {
    create
}