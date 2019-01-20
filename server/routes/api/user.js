const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = mongoose.model('User');



// Create new user

router.post('/register', auth.optional, (req, res, next) => {
  // @TODO get registration process
  const { body: { user }} = req;
  console.log(req.body);
  console.log("Attempting to register user:", user);

  if(!user) {
    return res.status(422).json({
      errors: {
        user: "is required"
      }
    });
  }

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
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
  let token = passportUser.generateJWT();

  return finalUser.save().then(
    () => res.json({
      token,
      user: finalUser.toAuthJSON()
    }),
    (err) => res.status(422).json({
      errors: {
        database: err
      }
    })
  );
});

/**
Login
**/
router.post('/login', auth.optional, (req,res,next) => {
  const { body: { username, password }} = req;

  console.log("Attempting to login user:", username);

  if(!username) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if(!password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  return passport.authenticate('local', {session: false}, (error, passportUser, info) => {
    if (error) {
      return next(error);
    }

    if (passportUser) {
      const user = passportUser;
      let token = passportUser.generateJWT();

      return user.save().then(
        () => res.json({ user: user.toAuthJSON(), token }),
        (err) => res.status(422).json({
          errors: {
            database: err
          }
        })
      );
    }

    return res.status(400).send({ error, info });
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
  const { payload: { _id } } = req;
  console.log(req.payload)

  return User.findById(_id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;
