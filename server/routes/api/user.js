const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');



// Create new user

router.post('/register', auth.optional, (req, res, next) => {
  // @TODO get registration process
  const { body: { user }} = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required'
      }
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  const finalUser = new User(user);

  finalUser.setPassword(user.password);

  return finalUser.save().then(() => res.json({ user: finalUser.toAuthJSON() }));
});

/**
Login
**/
router.post('/login', auth.optional, (req,res,next) => {
  const { body: { user }} = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required'
      }
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

/**
Logout
**/
router.post('/logout', auth.optional, (req,res,next) => {
  req.logout();
  res.sendStatus(200);
});

/**
Get current user
**/
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
