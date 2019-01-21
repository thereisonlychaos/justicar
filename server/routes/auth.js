const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

console.log("SECRET:", process.env.SECRET);

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;
