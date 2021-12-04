
const axios = require('axios')
const model = require('../models')
module.exports.signup = async (req, res) => {
    try{
        // check values
        // we can check them using packages like JOI
        // let's keep them simple for now
        if(!req.body.name || !req.body.email) return res.status(400).send({message : 'please fill all inputs'})

        await axios.post(`https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST}/members/`,
        {
            'email_address': req.body.email,
            'name' : req.body.name,
            'status': 'subscribed'
        },
        {
            auth: {
              username: "auth",
              password: process.env.MAILCHIMP_KEY
            }
        })
    
      //we may need this for analytics to track how many users are interacting with our widget
      model.Event.create({uuid : req.query.uuid ,event : req.query.event})

      return res.status(200).send({ status: "success" });

    }catch(error){
        console.log("error",error)
        //send it to somewhere when we can receive the error ( like bugsnag or centry )
        return res.status(400).send({ status: "something went wrong" });
    }
};

module.exports.ping = async(req,res) => {
  console.log(req.query.uuid)
  model.Event.create({uuid : req.query.uuid ,event : req.query.event})
  return res.status(200).send({status : 'success'})
}

module.exports.analytics = async(req,res) => {
  if(!['success','open','close'].includes(req.query.event)) return res.status(400).send({message : 'please select one of these events (success,open,close)'})
  let response = await model.sequelize.query(`SELECT		count(uuid) as success
                                              FROM 		  events
                                              WHERE		  event = ?
                                              GROUP BY	uuid`,
    { replacements: [req.query.event], type: model.sequelize.QueryTypes.SELECT }
  )
  console.log(response)
  return res.status(200).send({response : response})
}