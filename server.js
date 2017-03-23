let express  = require('express');
let mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://user:user@ds137530.mlab.com:37530/passerelle_de_memoire');

app.listen(8080);
app.use('/', express.static('/dist'));

app.get('/', (req, res) => {
	res.sendFile('/index.html');
})

app.get('/img/:name', (req, res) => {
	let fileName = req.params.name
	res.sendFile(__dirname + '/dist/resources/' + fileName);
})