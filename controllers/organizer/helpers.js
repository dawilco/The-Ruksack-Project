const models = require('../../database/models');

// TODO can this go into the model?
const getStripeAcctId = (userId) => {
    models.find
}

const getUserOrganizer = async (userId) => {
    try {
        user = await models.User.findByPk(userId);
        organizer = await user.getOrganizer();
        return organizer;
    } catch (err) {
        return err;
    }
}
/*
 * userId must have an organizer
 */
const updateOrganizerStripeId = async (userId, stripeId) => {
    try {
        organizer = await getUserOrganizer(userId);
        updated = await organizer.update({
            stripeId: stripeId
        });
    } catch (err) {
        return err;
    }
}

module.exports = {
    getUserOrganizer,
    updateOrganizerStripeId
}