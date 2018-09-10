const Session = require('../../../models/sessionModel');
const express = require('express');
const router = express.Router();

 router.post('/new', (req, res) => {
      Session.create({
        'sessionTitle': req.body.sessionTitle
      }, (err, task) => {
        if (err) {
          console.log('CREATE Error: ' + err);
          res.status(500).send('Error');
        } else {
          res.status(200).json(session);
        }
      });
    });

module.exports = router;