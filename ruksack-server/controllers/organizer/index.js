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
            mcc: 'software',
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
                    {first_name: 'Jane', last_name: 'Diaz '},
                    function(err, person) {
                        if (err) {
                            res.status(500).send({error: err});
                        } else {
                            stripe.accounts.update(
                                account.id,
                                {metadata: {order_id: '6735'}},
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