module.exports = model => {
  // Duplicate the ID field.
  model.virtual('id').get(function () {
    return this._id.toHexString()
  })

  // Ensure virtual fields are serialised.
  model.set('toJSON', {
    virtuals: true
  })

  model.options.toJSON.transform = function (doc, ret, options) {
    // remove the _id, __v and password of every document before returning the result
    delete ret._id
    delete ret.__v
    delete ret.password
  }
}
