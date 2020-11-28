const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelMapper = require('../../_helpers/model_mapper');
const schemaName = 'Container';

const containerSchema = new Schema({
    fillContainer: { type: String, trim: true },
    Row: { type: Array },
});

/* * use  the model mapper for removing the _id and __v and all the password fileds */
modelMapper(containerSchema);

exports.container = mongoose.model(schemaName, containerSchema);