require('dotenv').config();
const helpers = require('./helpers');
const models = require('../../database/models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const newStripeAccount = async (req, res) => {
    if (req.user.role !== 'organizer') {
        return res.status(401).send({error: 'Not Authorized'})
    }
    stripe.accounts.create(
        {
          type: 'custom',
          country: req.body.country,
          email: req.body.email,
          requested_capabilities: req.body.requested_capabilities,
          business_type: req.body.business_type,
          business_profile: {
            mcc: req.body.business_profile.mcc,
            url: req.body.business_profile.url,
          },
          company: {
              address: {
                  city: req.body.company.address.city,
                  country: req.body.company.address.country,
                  line1: req.body.company.address.line1,
                  line2: req.body.company.address.line2,
                  postal_code: req.body.company.address.postal_code,
                  state: req.body.company.address.state,
              },
              name: req.body.company.name,
              phone: req.body.company.phone,
              tax_id: req.body.company.tax_id,
          },
          external_account: {
              object: req.body.external_account.object,
              country: req.body.external_account.country,
              currency: req.body.external_account.currency,
              routing_number: req.body.external_account.routing_number,
              account_number: req.body.external_account.account_number,
          },
          tos_acceptance: {
              date: Math.floor(Date.now()/1000),
              ip: req.connection.remoteAddress,
              user_agent: req.headers["User-Agent"],
          }
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
            {
                first_name: req.body.first_name, 
                last_name: req.body.last_name,
                ssn_last_4: req.body.ssn_last_4,
                dob: {
                    day: req.body.dob.day,
                    month: req.body.dob.month,
                    year: req.body.dob.year,
                },
                address: {
                    city: req.body.address.city,
                    country: req.body.address.country,
                    line1: req.body.address.line1,
                    line2: req.body.address.line2,
                    postal_code: req.body.address.postal_code,
                    state: req.body.address.state,
                },
                phone: req.body.phone,
                email: req.body.email,
                relationship: {
                    owner: req.body.relationship.owner,
                    representative: req.body.relationship.representative,
                    title: req.body.relationship.title,
                }
            },
            function(err, person) {
                if (err) {
                    console.log(err)
                    return res.status(500).send({error: err.message});
                } else {
                    stripe.accounts.update(
                        stripeId,
                        {company: {owners_provided: true}},
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