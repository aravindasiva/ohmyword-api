const { gql } = require('apollo-server')

module.exports = gql`

type User{
  username: String
  email: String
  password: String
  token: String
}

type Twister{
  twister:  String
  level: Int
  createdAt: String
  createdBy: String
}

type Message {
  text: String
  createdAt:String
  createdBy: String
}

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
  level: Int
  createdBy: String
}

input MessageInput {
  text: String
  username: String
}


type Query {
  message(id: ID!) : Message
  user(id: ID!):User
  getUsers: [User]
  getTwisters: [Twister]
}

type Mutation {
  createMessage(messageInput: MessageInput): Message!
  createTwister(twisterInput: TwisterInput): Twister!
  registerUser(registerUserInput: RegisterUserInput ): User
  loginUser(loginUserInput: LoginUserInput): User
}
`