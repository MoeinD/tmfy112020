const express = require('express')
const router = express.Router()
const projectController = require('./projects.controller')

const responseHelper = require('../../_helpers/responseHelper')
const asyncMiddleware = require('../../_helpers/async_router_middleware')

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const projects = await projectController
      .findAllProject(req.body)
      .catch(err => {
        return responseHelper.sendError(res, 400, err)
      })

    return responseHelper.sendJson(res, { projects: projects, status: 200 })
  })
)

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const project = await projectController.addProject(req.body).catch(err => {
      return responseHelper.sendError(res, 400, err)
    })

    console.log('we are here added new projet ', project)
    return responseHelper.sendJson(res, { project: project, status: 200 })
  })
)

router.put(
  '/:id',
  asyncMiddleware(async (req, res) => {
    console.log('this is the project id for editing ', req.params.id)
    const project = await projectController
      .editProject(req.params.id, req.body)
      .catch(err => {
        return responseHelper.sendError(res, 400, err)
      })
    console.log('we are here at the end of edtining the project ', project)
    return responseHelper.sendJson(res, { project: project, status: 200 })
  })
)

router.delete(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const response = await projectController
      .deleteProject(req.params.id)
      .catch(err => {
        console.log('this is the error for deleteing the project ', err)
        return responseHelper.sendError(res, 400, err)
      })
    console.log('we have removed the project ', response)
    return responseHelper.sendJson(res, { status: 200, project: response })
  })
)
module.exports = router
