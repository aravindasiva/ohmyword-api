const { ApolloError } = require('apollo-server')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongodb')

module.exports = {
  Mutation: {
    async registerUser(_, { registerUserInput: { username, email, password } }) {
      // Check if old registered user is attempting to do a new register
      const oldUser = await User.findOne({ email })

      // Throw error if user exist
      if (oldUser) {
        throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXISTS')
      }

      // Encrypt password
      var encryptedPassword = await bcrypt.hash(password, 10)

      // Build mongoose model
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword
      })

      // Create JWT and attach to the User model
      const token = jwt.sign(
        { user_id: newUser._id, email },
        "SUPER_SECRET_STRING",
        {
          expiresIn: "2H"
        }
      )

      newUser.token = token

      // Save the user in MongoDB
      const res = await newUser.save()

      return {
        id: res.id,
        ...res._doc
      }
    },

    async loginUser(_, { loginUserInput: { email, password } }) {
      // Check if the user exists with the email provided
      const user = await User.findOne({ email })

      // Check if the provided password equals the encrypted password
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create a new token
        const token = jwt.sign(
          { user_id: user._id, email },
          "SUPER_SECRET_STRING",
          {
            expiresIn: "2h"
          }
        )

        // Attach token to user model that we found above
        user.token = token

        return {
          id: user.id,
          ...user._doc
        }
      } else {
        // If user not exists throw error
        throw new ApolloError('Incorrect email or password', 'INCORRECT_CREDENTIALS')
      }
    }

  },
  Query: {
    async user(_, id) {
      return await User.findById(new ObjectId(id))
    },
    async getUsers() {
      try {
        const users = await User.find().sort({ createdAt: -1 });
        return users;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}
