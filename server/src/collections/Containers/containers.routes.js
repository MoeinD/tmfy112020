const express = require('express');
const router = express.Router();
const containersController = require('./containers.controller');

const responseHelper = require('../../_helpers/responseHelper')
const asyncMiddleware = require('../../_helpers/async_router_middleware')


router.post('/', asyncMiddleware(async (req, res) => {
    const container = await containersController.addContainer(req.body).catch(err => responseHelper.sendError(res, 400, err));
    return responseHelper.sendJson(res, { container: container, status: 200 });
}))

/**this for getting the list of the container  */
router.post('/fetch', asyncMiddleware(async (req, res) => {
    // const containerData = JSON.parse(req.params.containerData);
    console.log('this is the container data ', req.body);
    const container = await containersController.getContainer(req.body).catch(err => responseHelper.sendError(res, 400, err));
    console.log('this is the response for the getter ', container)
    return responseHelper.sendJson(res, { container: container, status: 200 });
}))

/**delete section  */
router.delete('/:container', asyncMiddleware(async (req, res) => {
    const containerBody = JSON.parse(req.params.container);
    console.log('this  is the container body ', containerBody);
    const container = await containersController.deleteContainer(containerBody).catch(err => responseHelper.sendError(res, 400, err));
    return responseHelper.sendJson(res, { container: container, status: 200 })
}))

module.exports = router;