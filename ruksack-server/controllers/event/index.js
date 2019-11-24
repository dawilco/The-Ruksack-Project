const models = require('../../database/models');

const all = async (req, res) => {
    try {
        const events = await models.Event.findAll();
        res.setHeader('X-Total-Count', events.length);
        return res.status(200).json(events);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const create = async (req, res) => {
    try {
        const address = await models.Address.create(req.body.address);
        const event = await models.Event.create(req.body);
        event.setAddress(address);
        const ret = {
            id: event.id,
            name: event.name,
            notes: event.notes,
            eventStart: event.start,
            eventEnd: event.end,
            updatedAt: event.updatedAt,
            createdAt: event.createdAt,
            address: address
        }
        return res.status(200).json(ret);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const get = async (req, res) => {
    const id = req.params.id
    try {
        const event = await models.Event.findByPk(id);
        return res.status(200).json(event);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}

const update = async (req, res) => {
    try {
        const eventId  = req.params.id;
        const [updated] = await models.Event.update(req.body, {
            where: { id: eventId }
        });
        if (updated) {
            const updatedEvent = await models.Event.findOne({ where: { id: eventId } });
            return res.status(200).json(updatedEvent);
        }
        return res.sendStatus(404);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    all,
    create,
    get,
    update
}