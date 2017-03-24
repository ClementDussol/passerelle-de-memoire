let mongoose = require('mongoose');
let Tag = require('./../model/Tag');
let Resource = require('./../model/Resource');
let fs = require('fs');

console.log('coucou');

// connect to database
mongoose.connect('mongodb://user:user@ds137530.mlab.com:37530/passerelle_de_memoire');

// drop collection content
Tag.remove({}, (err) => { if (err) throw(err); });
Resource.remove({}, (err) => { if (err) throw(err); });

let TYPES = [
	'image',
	'texte',
	'vidéo'
]

let CATEGORIES = [

	'travail',
	'amour',
	'jeunesse',
	'Histoire',
	'pensées'
]

let TAGS = [

	'philosophie', 
	'jeunesse', 
	'femmes', 
	'quotidien', 
	'famille', 
	'Monique', 
	'Histoire', 
	'seconde guerre mondiale', 
	'occupation',
	'Claire',
	'donner',
	'partage',
	'mariage',
	'emotion',
	'Le Mans',
	'évènement',
	'sport',
	'souvenirs',
	'24 heures',
	'automobile',
	'naissance',
	'animaux',
	'ferme',
	'poulains',
	'amour',
	'rencontres',
	'bal',
	'guerre',
	'radio',
	'commerce',
	'vie professionnelle',
	'travail',
	'parents',
	'vacances',
	'voyage',
	'Bourgogne',
	'Mai 1968',
	'usine',
	'Renault',
	'grève',
	'Marcel',
	'photographie',
	'passion',
	'prix',
	'technologie',
	'appareil',
	'vache',
	'école',
	'éducation',
	'pêche',
	'ouvrier',
	'politique',
	'syndicats',
	'RPR',
	'militantisme',
	'congrès',
	'Chirac',
	'bonheur',
	'santé',
	'vie',
	'religion',
	'communion',
	'beret',
	'Joseph',
	'paysan',
	'métiers',
	'costume',
	'fascisme',
	'parti'
];

let LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

// INSERT TAGS
let tags = [];

TAGS.forEach((t)=>{
	tags.push({name:t});
})

Tag.collection.insert(tags, (err)=>{
	if (err) throw err;
	console.log('saved Tags');
});

// INSERT RESOURCES
let resources = [];

// create images resources
let i = 0;
fs.readdir('./dist/resources', (err, files) => {
 
	if (err) throw err;
	files.forEach(file => {
		let r =
		{
			title: file,
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			content: '/img/' + file,
			type:'image',
			category: CATEGORIES[i],
			tags: randomTags()
		}

		console.log(r);
		resources.push(r);

		i++
		if (i >= CATEGORIES.length) {i = 0}
	});
});

// create text resources
let c = 0;
for (let i = 0; i < 30; i++) {
	let str = LOREM.substring(-1, Math.ceil(Math.random()*(LOREM.length/2)));
	console.log(str);
	let r =
	{
		title: 'Lorem ipsum dolor',
		description: '',
		content: str,
		type:'texte',
		category: CATEGORIES[c],
		tags: randomTags()
	}

	resources.push(r);

	c++;
	if (c >= CATEGORIES.length) {c = 0}
}

// create video resources
let videos = [
	{
		title: "Claire Choplin : L'arrivée des allemands",
		description: '',
		content: 'https://www.youtube.com/watch?v=WY6Rt2HfjTg',
		category: 'Histoire',
		type: 'vidéo',
		tags: ['Histoire', 'seconde guerre mondiale', 'occupation', 'jeunesse', 'Claire']
	}, 	
	{
		title: "Claire Choplin : Sous l'occupation allemande",
		description: '',
		content: 'https://www.youtube.com/watch?v=GK_aCYZM6sE',
		category: 'Histoire',
		type: 'vidéo',
		tags: ['Histoire', 'seconde guerre mondiale', 'occupation', 'guerre', 'radio', 'Claire']
	},
	{
		title: "Claire Choplin : La vie enfant",
		description: '',
		content: 'https://www.youtube.com/watch?v=vYwKRmmXHHM',
		category: 'jeunesse',
		type: 'vidéo',
		tags: ['jeunesse', 'parents', 'quotidien', 'famille', 'Claire']
	}, 
	{
		title: "Claire Choplin : Les vacances",
		description: '',
		content: 'https://www.youtube.com/watch?v=syjRgkLz7YY',
		category: 'jeunesse',
		type: 'vidéo',
		tags: ['jeunesse', 'vacances', 'voyage', 'famille', 
		'Bourgogne', 'Claire']
	},
	{
		title: "Claire Choplin : La vie au travail",
		description: '',
		content: 'https://www.youtube.com/watch?v=52OQNdyPpPc',
		category: 'travail',
		type: 'vidéo',
		tags: ['philosophie', 'commerce', 'vie professionnelle', 'travail', 'Claire']
	},
	{
		title: "Claire Choplin : La rencontre",
		description: '',
		content: 'https://www.youtube.com/watch?v=7UkJDvkMBOU',
		category: 'amour',
		type: 'vidéo',
		tags: ['amour', 'rencontres', 'bal', 'mariage', 'Claire']
	},
	{
		title: "Claire Choplin : Les meilleurs souvenirs",
		description: '',
		content: 'https://www.youtube.com/watch?v=j2CZmtWvkJw',
		category: 'jeunesse',
		type: 'vidéo',
		tags: ['souvenirs', 'naissance', 'animaux', 'ferme', 'Claire']
	},
	{
		title: "Claire Choplin : Le bonheur",
		description: '',
		content: 'https://www.youtube.com/watch?v=5R3OWc4O89Q',
		category: 'pensées',
		type: 'vidéo',
		tags: ['philosophie', 'partage', 'donner', 'ferme', 'Claire']
	},
	{
		title: "Marcel Roguet : Mai 68",
		description: '',
		content: 'https://www.youtube.com/watch?v=7tt9MDiqeP8',
		category: 'Histoire',
		type: 'vidéo',
		tags: ['Mai 1968', 'Histoire', 'évènement', 'usine', 'Marcel']
	},
	{
		title: "Marcel Roguet : La photographie",
		description: '',
		content: 'https://www.youtube.com/watch?v=dRMgKidiSI8',
		category: 'jeunesse',
		type: 'vidéo',
		tags: ['photographie', 'passion', 'prix', 'appareil', 'technologie', 'Marcel']
	},
	{
		title: "Marcel Roguet : La vie enfant",
		description: '',
		content: 'https://www.youtube.com/watch?v=Gh1fi0KsnRs',
		category: 'jeunesse',
		type: 'vidéo',
		tags: ['parents', 'jeunesse', 'école', 'vache', 'ferme', 'pêche','Marcel']
	},
	{
		title: "Marcel Roguet : La vie au travail",
		description: '',
		content: 'https://www.youtube.com/watch?v=x0DkbgSsdWk',
		category: 'travail',
		type: 'vidéo',
		tags: ['travail', 'Renault', 'usine', 'Marcel']
	},
	{
		title: "Marcel Roguet : La vie en couple",
		description: '',
		content: 'https://www.youtube.com/watch?v=Xio5o__1UMw',
		category: 'amour',
		type: 'vidéo',
		tags: ['amour', 'rencontres', 'politique', 'mariage', 'Marcel']
	},
	{
		title: "Marcel Roguet : La vie syndicale",
		description: '',
		content: 'https://www.youtube.com/watch?v=VA8foH9eZys',
		category: 'travail',
		type: 'vidéo',
		tags: ['politique', 'RPR', 'syndicats', 'militantisme', 'congrès', 'Chirac', 'Marcel']
	},
	{
		title: "Marcel Roguet : Le bonheur",
		description: '',
		content: 'https://www.youtube.com/watch?v=rM-bsrgNBGI',
		category: 'pensées',
		type: 'vidéo',
		tags: ['bonheur', 'santé', 'vie', 'philosophie', 'religion', 'Marcel']
	},
	{
		title: "Marcel Roguet : Le plus beau souvenir",
		description: '',
		content: 'https://www.youtube.com/watch?v=Jcrk1ZTOVUw',
		category: 'jeunesse',
		type: 'vidéo',
		tags: ['communion', 'souvenir', 'jeunesse', 'religion', 'Marcel']
	}
]

resources = resources.concat(videos);

Resource.collection.insert(resources, (err)=>{
	if (err) throw err;
	console.log('saved Resources');
});

function randomTags(){
	
	let r = [];
	let nb = 3 + Math.ceil(Math.random()*6);
	for (var i = 0; i < nb; i++) {

		let rand = Math.floor(Math.random()*TAGS.length);
		if (r.indexOf(TAGS[rand]) > -1) {continue}
		r.push(TAGS[rand]);
	}

	return r;
}