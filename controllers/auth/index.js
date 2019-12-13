const crypto = require('crypto');
const models = require('../../database/models');

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

const newUser = async (req, res) => {
    const salt = Date.now();
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
        if (req.body.participant) {
            const participant = await models.Participant.create(
                {
                    firstName: req.body.participant.firstName,
                    lastName: req.body.participant.lastName,
                    comment: req.body.participant.comment,
                    gender: req.body.participant.gender,
                    birthday: req.body.participant.birthday
                }
            );
            user.setParticipant(participant);
        } else if (req.body.organizer) {
            const organizer = await models.Organizer.create(
                {
                    name: req.body.organizer.name,
                    phone: req.body.organizer.phone
                }
            );
            user.setOrganizer(organizer);
        }
        const token = user.generateAuthToken();
        return res.status(200).json({auth: token})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    authUser,
    newUser
}