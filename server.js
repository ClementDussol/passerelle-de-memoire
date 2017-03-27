let express  = require('express');
let mongoose = require('mongoose');

let Resource = require('./src/model/Resource');
let Tag = require('./src/model/Tag');
let app = express();

mongoose.connect('mongodb://user:user@ds137530.mlab.com:37530/passerelle_de_memoire');

app.listen(8080);
app.use('/', express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

app.get('/img/:name', (req, res) => {
	let fileName = req.params.name
	res.sendFile(__dirname + '/dist/resources/' + fileName);
})

app.get('/api/resources/:tag', (req, res) => {
	let tag = req.params.tag
	console.log(typeof tag, tag);
	
	Resource.find({}).where('tags').in([tag]).exec((err, data)=>{
		res.send(data);
	})
})

app.get('/api/resources', (req, res) => {
	
	Resource.find({}).exec((err, data)=>{
		res.send(data);
	})
})

app.get('/api/tags', (req, res) => {
	
	Tag.find({}).select('name').exec((err, data)=>{
		res.send(data);
	})
})