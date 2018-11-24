const router = require('express').Router()
const session = require('express-session')
const MessagingResponse = require('twilio').twiml.MessagingResponse;
//are your routes correct below?
const {Recipe, User, Preference} = require('../db/models')
const Sequelize = require('sequelize')
const {recommend} = require('../db/graphDb')
const accountSid = 'AC73c8fa517d3e83ccc4c9c6897586ce8e';
const authToken = '9622761b850dfc615521b37b1266db99';
const client = require('twilio')(accountSid, authToken);

// router.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   const message = twiml.message()

//   message.body('The Robots are coming! Head for the hills!');
//   message.media('https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });



router.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();
 // console.log('test')
  if (req.body.Body == 'Show me') {

    try {
      const number = '+13364136015'
      const {from} = req.body
     // console.log(req.body, 'req.body')

      //const user = await User.findByPhoneNumber(from)

      const user = User.findOne({
        where: {
          phone: number
        }
      })
      // const recommendations = await recommend(1)
      // .then(data => {
      //   Recipe.findIds(data)
      //   console.log(recommendations, 'rec')
      // })

      const recommendations =  await recommend(1)
      console.log(recommendations, 'recommendation twilio')
      const uId = recommendations[0].recipeId
      const next = await Recipe.findById(uId)
     // const recs = await Recipe.findIds(recommendations)
     // console.log(recs, 'recs')
      const answer = next.sourceRecipeUrl
    twiml.message(`Okay, try this: ${answer}`);

    } catch (err) {
      console.error(err)
    }

  } else if (req.body.Body == '2') {
    twiml.message('Good to know, let\'s try something else');
  }
    else if (req.body.Body == '3') {
      twiml.message('Not too bad!')
    }
    else if (req.body.Body == '4') {
      twiml.message('Hey, that\'s pretty good!')
    }
    else if (req.body.Body == '5') {
      twiml.message('Great! We will send you more recipes like this.')
    }
   else {
    twiml.message(
      'Please enter a number between 1 and 5'
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = router
