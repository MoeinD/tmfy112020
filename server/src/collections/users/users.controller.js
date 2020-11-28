const userModel = require('./users.model').user

exports.findAllUser = async params => {
  if (params === undefined) {
    return Promise.reject({ code: 400, message: 'Inocrrenct params provided' })
  }

  const users = await userModel.find(params)

  if (users === undefined) {
    return Promise.reject({ code: 404, message: 'Users has not found' })
  }
  console.log('this is the lsit of users ', users)
  return users
}

exports.login = async userData => {
  console.log('this is the body that have for login', userData)
  await loginController()
  function loginController () {
    return new Promise((resolve, reject) => {
      userModel
        .findOne({ email: userData.email })
        .then(user => {
          console.log('we find the user ', user)
          user.comparePassword(
            userData.password,
            user.password,
            (err, isMath) => {
              if (err) {
                return reject(err)
              }
              if (isMath == undefined || isMath === false) {
                console.log('we reject the password ', isMath)
                return reject({ code: 400, message: 'password does not match' })
              }
              /** if we get here the login is sucssfull */
              resolve(user)
            }
          )
        })
        .catch(err => {
          console.log(
            'this is the err for finding the user with this email ',
            err
          )
          reject(err)
        })
    })
  }
}

exports.creatUser = async userData => {
  console.log('this is the body for addig the user ', userData)
  if (userData.firstname === undefined || userData.firstname === '') {
    return Promise.reject({
      code: 400,
      message: 'Please enter your first name'
    })
  }

  const user = new userModel(userData)

  console.log('this is the user model taht should be added ', user)

  /** save new user and return the promise */
  return new Promise((resolve, reject) => {
    user
      .save()
      .then(resolve)
      .catch(error => {
        reject(error)
      })
  })
}
