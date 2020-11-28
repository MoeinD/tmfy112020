/** create by mohammad karimi on 28/03/2019 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const modelMapper = require('../../_helpers/model_mapper')
const schemaName = 'User'
const constants = require('../../_helpers/constants')

const userSchema = new Schema({
  firstname: { type: String, trim: true },
  lastname: { type: String, trim: true },
  email: { type: String, trim: true },
  password: { type: String, trim: true }
})

/** we need to encrypt the password if has been modified */
userSchema.pre('save', function (next) {
  const user = this

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // Generate a salt
  bcrypt.genSalt(constants.PASSWORD_SALT, function (err, salt) {
    if (err) return next(err)

    // Hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // Override the plain text password with the hashed one
      user.password = hash
      next()
    })
  })
})

/** this is the method that for compare the passowrd for login
 * we mybe create a new one for the compare password later
 */
userSchema.methods.comparePassword = (
  candidatePassword,
  userPassword,
  callback
) => {
  // let password = this.password.slice(0)
  bcrypt.compare(candidatePassword, userPassword, (err, isMath) => {
    if (err) return callback(err)
    console.log('the password math?', isMath)
    callback(null, isMath)
  })
}

/** use  the model mapper for removing the _id and __v and all the password fileds */
modelMapper(userSchema)

exports.user = mongoose.model(schemaName, userSchema)
