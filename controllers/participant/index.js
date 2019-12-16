const models = require('../../database/models')
const create = async (req, res) => {
    try {
        const participant = await models.Participant.create(req.body);
        participant.addEvent(2)
        return res.status(200).json({
            participant
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    create
}