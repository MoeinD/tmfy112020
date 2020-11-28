/** send the response to the clinet if we have the error
 *
 * @param {*} res
 * @param {*} status
 * @param {*} message
 */
const sendError = (res, status, message) => {
  res.header('Content-Type', 'application/json;charset=utf-8')
  res.status(status)
  res.json({
    status: false,
    error: message
  })

  return Promise.reject(message)
}

const sendJson = (res, json) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.status(200)
  return res.json(json)
}

module.exports = {
  sendError: sendError,
  sendJson: sendJson
}
