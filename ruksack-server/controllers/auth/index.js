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

module.exports = {
    authUser,
    newUser
}