const projectModel = require('./projects.models').project

exports.findAllProject = async projectData => {
  return new Promise((resolve, reject) => {
    projectModel
      .find(projectData)
      .then(projects => {
        resolve(projects)
      })
      .catch(err => {
        reject(err)
      })
  })
}

exports.addProject = async projectData => {
  const newProject = new projectModel(projectData)
  return new Promise((resolve, reject) => {
    newProject
      .save()
      .then(addedProject => {
        console.log('the new project has been added ', addedProject)
        resolve(addedProject)
      })
      .catch(err => {
        console.log('we have the err for adding the new project ', err)
        reject(err)
      })
  })
}

/** this is the block for editing the exsiting project */
exports.editProject = async (id, projectData) => {
  console.log('this is the porject ofr editting ', projectData)
  // const editProject = await projectModel.findById(id)
  var editingProject = await projectModel.findById(id)

  console.log(
    'this is the project that we are looking to edit ',
    editingProject
  )
  /** now we found the project and must update it */
  Object.assign(editingProject, projectData)
  console.log('this is new eding project after merging ', editingProject)
  /** now we need to save the project */
  return new Promise((resolve, reject) => {
    editingProject
      .save()
      .then(editedProject => {
        resolve(editedProject)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/** this is the method for deleting the project */
exports.deleteProject = async id => {
  var project = await projectModel.findById(id)
  console.log('we find the project for deleting ', project)
  if (project === undefined) {
    return new Promise.reject({
      code: 400,
      message: 'Could not find the project to delete'
    })
  }
  return project.remove()
}
