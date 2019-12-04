require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const newStripeAccount = async (req, res) => {
    stripe.accounts.create(
        {
          type: 'custom',
          country: 'US',
          email: 'bob+4@example.com',
          requested_capabilities: [
            'card_payments',
            'transfers',
          ],
          business_type: 'company',
          business_profile: {
            mcc: 8999,
            url: 'http://topviewsports.com',
          },
          company: {
              address: {
                  city: 'Pendleton',
                  country: 'US',
                  line1: '19 Maverick Dr',
                  line2: '',
                  postal_code: '29670',
                  state: 'SC',
              },
              name: 'Top View Sports',
              phone: '0000000000',
              tax_id: '000000000',

          },
          external_account: {
              object: 'bank_account',
              country: 'US',
              currency: 'USD',
              routing_number: '110000000',
              account_number: '000123456789',
          },
          tos_acceptance: {
              date: 1554232875,
              ip: '198.21.229.137',
              user_agent: null,
          }
        },
        function(err, account) {
            if (err) {
                res.status(500).send({error: err});
            } else {
                stripe.accounts.createPerson(
                    account.id,
                    {
                        first_name: 'Jane', 
                        last_name: 'Diaz ',
                        ssn_last_4: '0000',
                        dob: {
                            day: '03',
                            month: '03',
                            year: '1998',
                        },
                        address: {
                            city: 'Pendleton',
                            country: 'US',
                            line1: '19 Maverick Dr',
                            line2: '',
                            postal_code: '29670',
                            state: 'SC',
                        },
                        phone: '0000000000',
                        email: 'bob4@gmail.com',
                        relationship: {
                            owner: true,
                            representative: true,
                        }
                    },
                    function(err, person) {
                        if (err) {
                            res.status(500).send({error: err});
                        } else {
                            stripe.accounts.update(
                                account.id,
                                {company: {owners_provided: true}},
                                function(err, account) {
                                    res.sendStatus(200)
                                }
                              );
                        }
                    }
                );
            }
        }
      );
}

module.exports = {
    newStripeAccount
}