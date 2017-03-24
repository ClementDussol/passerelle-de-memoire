let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let tagSchema = new Schema({
	name: String
})

let Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;