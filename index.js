const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const MONGODB = "mongodb+srv://ohmyword:OhMyWord@ohmyword.t1jll.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose.connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo Db is connected")
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`)
  })