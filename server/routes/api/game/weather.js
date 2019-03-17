const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../auth');
const Record = mongoose.model('Weather');
const JusticarIRC = require('../../../../irc/JusticarIRC');

function emitDeleteEvent(deletedWeather) {
  JusticarIRC.events.emit("api_weather_delete", deletedWeather);
};

function emitUpdateEvent(updatedWeather) {
  JusticarIRC.events.emit("api_weather_update", updatedWeather);
};

/**
 * Define controller
 */

let recordCtrl = {};

// List all records
recordCtrl.list = function(req, res, next) {
  Record.find({}, (err, list) => {
      if (err)
        res.status(500).send(err);
      res.status(200).json(list);
    }
  );
};

// Create new record
recordCtrl.create = function(req, res, next) {
  let new_record = new Record(req.body);

  new_record.save(
    (err, saved_record) => {
      if (err)
        res.status(500).json(err);

      emitUpdateEvent(record);

      res.status(201).json(saved_record);
    }
  );
};

// get one record by id
recordCtrl.show = function(req, res, next) {
  Record.findById(req.params.id,
    (err, record) => {
      if (err)
        res.status(500).json(err);
      res.status(200).json(record);
    }
  );
};

// update one record
recordCtrl.update = function(req, res, next) {
  Record.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    {new:true},
    (err, record) => {
      if (err)
        res.status(500).json(err);

      emitUpdateEvent(record);

      res.status(200).json(record);
    }
  );
};

// delete one record
recordCtrl.remove = function(req, res, next) {
  Record.remove(
    {_id: req.params.id},
    (err) => {
        if (err)
          res.status(500).json(err);

        emitDeleteEvent(record);

        res.status(200).json({ message: "record successfully deleted"});
    }
  );
};

recordCtrl.makeCurrent = function(req, res, next) {
  Record.update({}, { current: false }, {multi:true},
    (err) => {
      if (err) res.status(500).json(err);

      Record.findOneAndUpdate({ _id: req.params.id }, {current: true}, {new : true},
        (err, record) => {
            if (err) res.status(500).json(err);

            emitUpdateEvent(record);

            res.status(200).json(record);
        }
      );
    }
  );
};

/**
 * Define routes
 */
router.route('/')
  .get(auth.required, recordCtrl.list)
  .post(auth.required, recordCtrl.create)
;

router.route('/:id')
  .all(auth.required) // @TODO Upgrade this to better control
  .get(recordCtrl.show)
  .post(recordCtrl.update)
  .put(recordCtrl.update)
  .delete(recordCtrl.remove)
;

router.route('/:id/function/makeCurrent')
  .post(auth.required, recordCtrl.makeCurrent);

module.exports = router;
