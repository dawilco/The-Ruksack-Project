require('dotenv').config();
const helpers = require('./helpers');
const models = require('../../database/models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const newStripeAccount = (req, res) => {
    console.log(req);
    if (req.user.role !== 'organizer') {
        return res.status(401).send({error: 'Not Authorized'})
    }
    stripe.accounts.create(
        {
          type: 'custom',
          country: req.body.country,
          email: req.body.email,
          requested_capabilities: req.body.requested_capabilities,
          external_account : req.body.external_account,
          business_profile: {
            mcc: req.body.business_profile.mcc,
            url: req.body.business_profile.url,
          },
          account_token: req.body.account_token
        },
        function(err, account) {
            if (err) {
                return res.status(500).send({error: err});
            } else {
                helpers.updateOrganizerStripeId(req.user.id, account.id).then(() => {
                    return res.sendStatus(201);
                }).catch((err) => {
                    return res.status(500).send({error: err})
                });
            }
        }
    );
}

const newStripeRepresenative = async (req, res) => {
    if (req.user.role !== 'organizer') {
        return res.status(401).send({error: 'Not Authorized'})
    }
    helpers.getUserOrganizer(req.user.id).then((organizer) => {
        const stripeId = organizer.dataValues.stripeId;
        stripe.accounts.createPerson(
            stripeId,
            {person_token: req.body.person_token},
            function(err, person) {
                if (err) {
                    console.log(err)
                    return res.status(500).send({error: err.message});
                } else {
                    stripe.accounts.update(
                        stripeId,
                        {account_token: req.body.account_token},
                        function(err, account) {
                            return res.sendStatus(201);
                        }
                    );
                }
            }
        );
    }).catch((err) => {
        return res.status(500).send({error: err})
    });
    console.log(stripeId);
}


module.exports = {
    newStripeAccount,
    newStripeRepresenative
}