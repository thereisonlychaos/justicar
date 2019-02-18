const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../auth');
const Record = mongoose.model('Channel');

router.route('/')
  .get(auth.required, getAll)
  .post(auth.required, createNew)
;

function getAll(req, res, next) {
  Record.find({}).then(
    (list) => {
      res.json(list);
    }
  );
}

function createNew(req, res, next) {
  let new_record = new Record(req.body);

  new_record.save().then(
    (err, saved_record) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json(saved_record);
    }
  );
}

function getOne(req, res, next) {

}

function updateOne(req, res, next) {

}

function deleteOne(req, res, next) {

}


module.exports = router;
