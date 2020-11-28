const express = require('express')
const router = express.Router()

const sidebarController = require('./sidebar.controllers')

const responseHelper = require('../../_helpers/responseHelper')
const asyncMiddleware = require('../../_helpers/async_router_middleware')

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    console.log('this is the body of the req ', req.body)
    const sidebar = await sidebarController
      .findAllSidebar(req.body)
      .catch(err => {
        return responseHelper.sendError(res, 400, err)
      })
    console.log('this is the response ', sidebar)
    return responseHelper.sendJson(res, { sidebar: sidebar, status: 200 })
  })
)

module.exports = router
