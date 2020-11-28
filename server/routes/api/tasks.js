const express = require('express')
const mongodb = require('mongodb')
const common = require('./commonMethod')

const router = express.Router()

router.get('/', async (req, res) => {
  const tasks = await common.getCollection('tasks')
  const response = await tasks.find({}).toArray()
  res.send(response)
})

router.post('/', async (req, res) => {
  const task = { ...req.body, createdAt: new Date() }
  const tasks = await common.getCollection('tasks')
  await tasks.insertOne(task)

  res.status(201).send(task)
})

router.delete('/:id', async (req, res) => {
  const tasks = await common.getCollection('tasks')
  await tasks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send(req.params.id)
})

module.exports = router
