const mongoose = require('mongoose')

const Schema = mongoose.Schema

const modelMapper = require('../../_helpers/model_mapper')
const schemaName = 'Sidebar'

const sidebarSchema = new Schema({
  currentid: {},
  parentId: {},
  displayname: {}
})

//* * use  the model mapper for removing the _id and __v and all the password fileds */
modelMapper(sidebarSchema)

exports.sidebar = mongoose.model(schemaName, sidebarSchema)
