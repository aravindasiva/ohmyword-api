const messagesResolvers = require('./messages')
const usersResolvers = require('./users')
const twistersResolvers = require('./twisters')

module.exports = {
  Query: {
    ...messagesResolvers.Query,
    ...usersResolvers.Query,
    ...twistersResolvers.Query
  },
  Mutation: {
    ...messagesResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...twistersResolvers.Mutation
  }
}