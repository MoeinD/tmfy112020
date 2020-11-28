const sidebarModel = require('./sidebar.models').sidebar
const userModel = require('../users/users.model').user

exports.findAllSidebar = async sidebarData => {
  console.log(
    'this is the body that we request in sidebar controller',
    sidebarData
  )
}

exports.findAllSidebar = async projectData => {
  return new Promise((resolve, reject) => {
    sidebarModel
      .find()
      .then(projects => {
        resolve(projects)
      })
      .catch(err => {
        reject(err)
      })
  })
}
