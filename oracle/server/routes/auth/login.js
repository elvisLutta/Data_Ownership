'use strict';

const router = require('express').Router(),
  User = require('../../models/User'),
  Account = require('../../models/Account');

router.get('/', (req, res) => {

  res.send({success: true, message: 'hello'});
});

router.post('/', async (req, res) => {
  User.findOne({ 'email': req.body.email })
    .then( async (user) => {

      const messages = [];

      if (!user || !user.validUserPassword(req.body.password)) {

        messages.push('Email Does not exist or Password isInvalid');
        return res.send({success: false, message: messages});

      }

      let acc = await Account.find({owner: user.id}).exec();
      return res.send({success: true, user: user, account: acc, notification: true});



    })
    .catch((err) => {

      console.error('ERROR IN User.FindOne() local.login\n\n' + err);
      return res.send({success: false, message: 'error logging in'});

    });
});

module.exports = router;
