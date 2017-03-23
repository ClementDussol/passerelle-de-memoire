let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resourceSchema = new Schema({
	
	title: String,
	description: String,
	content: String,
	category: String,
	tags: Array,
})

let Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;