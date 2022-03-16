const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo Db is connected")
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`)
  })