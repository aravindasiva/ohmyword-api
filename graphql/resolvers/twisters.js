const Twister = require('../../models/Twister')

module.exports = {
  Mutation: {
    async createTwister(_, { twisterInput: { twister, level, createdBy } }) {

      const newTwister = new Twister({
        twister: twister,
        level: level,
        createdBy: createdBy,
        createdAt: new Date().toISOString()
      })

      const res = await newTwister.save()
      console.log('res', res)
      return {
        id: res.id,
        ...res._doc
      }
    }
  },
  Query: {
    async getTwisters() {
      try {
        const twisters = await Twister.find().sort({ createdAt: -1 });
        return twisters;
      } catch (err) {
        throw new Error(err);
      }
    }  }
}