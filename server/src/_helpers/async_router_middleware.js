/**
 * Created by Mohammad
 */

/**
 * Function to handle returned Promise from async functions
 * Use this to wrap async functions give given to router
 * @param fn
 * @returns {function(*=, *=, *=)}
 *
 * Code modified from: https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
 */
const asyncMiddleware = fn => (req, res, next) => {
  // Wrap the function in a Promise resolve to suppress unhandled Promise err
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error('AsyncMiddleware error - ' + new Date())
    console.error(err)
  })
}

module.exports = asyncMiddleware
