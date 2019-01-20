const jwt = require("express-jwt");

const getTokenFromHeaders = (req) => {
  console.log("getting Token from headers")
  const { headers: { authorization } } = req;
  console.log("Authorization", authorization);

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
};

module.exports = auth;
