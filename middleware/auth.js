// Example of how auth works on client [JUST FOR FOR UNDERSTANDING, THIS FILE DOES NOT DO ANYTHING IN THIS PROJECT]

const { AuthenticationError } = require('apollo-server')

const jwt = require('jsonwebtoken')

module.exports = (context) => {
  // context { ...headers }
  const authHeader = context.req.headers.authorization

  if (authHeader) {
    // Bearer 
    const token = authHeader.split('Bearer')[1];

    if (token) {
      try{
        const user = jwt.verify(token, "SUPER_SECRET_STRING")
        return user;
      }catch(err) {
        throw new AuthenticationError('Invalid or Expired Token')
      }
    }
    throw new Error("Authentication token must be Bearer token")
  }
  throw new Error('Authrorization Header must be provided')
}