const mongoose = require('mongoose')
const db = require('../_config/db')

module.exports = {
  connect: async () => {
    const dbResponse = await mongoose
      .connect(db.url)
      .then(console.log('this is the response fro connecing todb '))
      .catch(err => console.log('some error happen for connection'))
  }
}
