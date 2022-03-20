const { gql } = require('apollo-server')

module.exports = gql`
# Types

type User{
  username: String
  email: String
  password: String
  token: String
}

type Twister{
  twister:  String,
  level: Number,
  createdAt: String,
  createdBy: String
}

type Message {
  text: String
  createdAt:String
  createdBy: String
}

# Input Types

input RegisterUserInput {
  username: String
  email: String
  password: String
}

input LoginUserInput {
  email: String
  password: String
}

input TwisterInput {
  twister: String
  level: Number
  createdBy: String
}

input MessageInput {
  text: String
  username: String
}

# Queries

type Query {
  message(id: ID!) : Message
  user(id: ID!):User
  getUsers: [User]
  getTwisters: [Twister]
}

#Mutations

type Mutation {
  createMessage(messageInput: MessageInput): Message!
  registerUser(registerUserInput: RegisterUserInput ): User
  loginUser(loginUserInput: LoginUserInput): User
  createTwister(twisterInput: TwisterInput): Twister!
}
`