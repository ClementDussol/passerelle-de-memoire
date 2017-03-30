let mongoose = require('mongoose');
let Tag = require('./../model/Tag');
let Resource = require('./../model/Resource');
let fs = require('fs');

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

let TEXTES = [
	{
		title: 'Le débarquement et la bataille de Normandie',
		content: "« La guerre, avec tout son cortège de désordres et de terreurs me faisait connaître l’humanité telle qu’elle est, pire ou meilleure qu’elle n’apparaît » écrit au sortir de la guerre, en 1944, la jeune Manchoise Marcelle Hamel. Le 25 août 1944, la ville d’Honfleur est libérée par la 6e aéroportée britannique. Avec la libération de ce port pittoresque, l’ensemble de la Basse-Normandie est alors délivrée de l’occupation allemande, qui aura duré quatre longues années.\n\nLe 6 juin 1944, l’opération Neptune, point de départ de l’entreprise Overlord, plonge la région dans une spirale aussi destructrice que libératrice. En l’espace de quelques heures, cette paisible région se transforme en un des plus grands champs de bataille de l’histoire militaire contemporaine. Prévue pour ne durer que trois semaines, la bataille de Normandie s’éternise : les troupes alliées s’enlisent dans la trame normande du bocage, l’occupant allemand résiste. Douze semaines sont nécessaires pour délivrer la région. Le matériel, point fort de l’armée alliée, est la clef de voûte de cette réussite. Pour les Alliés, il n’est plus question de mener un combat de fantassins, coûteux en soldats. En économisant ainsi leurs hommes, les stratèges entrevoient une nouvelle conception de la guerre1 utilisant avions, bombes, chars et obus. Un véritable rouleau compresseur s’abat alors sur la région. Au plus fort des combats, près de deux millions de combattants s’affrontent. Au milieu de cette bataille, un million de Bas-Normands assistent, impuissants, au déroulement des opérations et sont encerclés par ces soldats. \n \n Certes, le 25 août 1944 la région est libérée. Mais elle est aussi ravagée, méconnaissable : la population a payé un lourd tribut pour accéder à cette liberté tant espérée, près de 20.000 civils normands, dont 14.000 bas-normands2, y ont laissé la vie. À ce bilan humain s’ajoutent les destructions matérielles, tout aussi dramatiques pour la population. Des villes entières sont rayées de la carte : Saint-Lô est réduite à un amas de ruines, des quartiers entiers de Caen sont rasés, des bourgades telles que Villers-Bocage ou Aunay-sur-Odon sont sinistrées à près de 80 %. La campagne, pièce maîtresse de l’économie d’avant-guerre, ne bénéficie pas de meilleures conditions. Des dizaines de milliers d’hectares de terres agricoles sont retournées par les bombes et les obus et une partie du cheptel est décimée3."
	},
	{
		title : "Service du travail obligatoire - Des mois entre parenthèses",
		content: "Né en 1922, Louis Pesnel suit ses études à Bayeux lorsque le conflit éclate. À l’arrivée des Allemands en Normandie, en 1940, le jeune homme rejoint sa famille dans le Cotentin, à Montfarville. Il y exerce alors les deux activités familiales : le travail en mer et celui de la terre. L’auteur nous livre ici un témoignage en deux parties, correspondant aux grandes périodes de son existence durant la Seconde Guerre mondiale. Le premier chapitre est le résultat d’une enquête opérée en 1995 concernant le STO (Service du Travail Obligatoire). Institué par une loi datée du 16 février 1943, le STO vise à répondre aux nouvelles exigences allemandes concernant l’envoi de main-d’œuvre sur le territoire du Reich. Conformément à cette loi, qui impose aux Français (de sexe masculin, nés dans les années 1920, 1921 et 1922) un service de travail de deux ans outre Rhin, Louis Pesnel quitte sa Normandie en mars 1943 pour rejoindre un camp de travailleurs à Wilhelmshaven, importante ville portuaire de Basse-Saxe. Ce questionnaire, reprenant les grandes étapes de la vie du requis en Allemagne, permet de mettre en lumière les conditions du départ, le quotidien des travailleurs en Allemagne, les relations avec les Allemands, jusqu’à son retour en Normandie en décembre 1943, suite à l’obtention d’une permission. En décidant de ne pas regagner l’Allemagne, Louis Pesnel ouvre une nouvelle page de son histoire : l’ancien requis devient alors réfractaire. Cette vie « entre parenthèses » du réfractaire est retracée en 1998. Caché dans un premier temps dans les fermes du Bessin, il rejoint Montfarville et son Cotentin pour y vivre les « semaines fiévreuses » marquées par le Débarquement et l’arrivée des troupes Alliées."
	},
	{
		title : "L'Ange de la prison",
		content: "À ma connaissance, dans le quartier des femmes, les Allemands n’ont pas rassemblé les femmes qui devaient être fusillées. Elles n’ont pas été mises en rangs. Il semble bien que les autorités de la prison ont choisi celles qu’il fallait exécuter et ils sont allés les chercher individuellement, une à une, dans leurs cellules. J’en trouve la preuve dans le fait que j’ai rencontré une seule femme que l’on conduisait à la mort. On nous a dit que deux ou trois femmes avaient été fusillées ; je n’ai pu en obtenir confirmation.\n\nCelle que j’ai vue avait dit précédemment à des prisonniers : « J’ai été arrêtée par erreur. Je n’ai pas d’inquiétude. Je ne vais pas rester longtemps ici, mon “ami” est dans la police allemande, dans la Gestapo. Il est parti “en permission” en Allemagne voici quelques jours. À son retour, il me fera certainement libérer. »\n\nIl y a tout lieu de penser que l’Allemand de la Gestapo avait commis quelque faute ou maladresse, qu’il avait été rappelé en Allemagne, que l’on avait arrêté son « amie », qui fut « supprimée » peut-être parce qu’on craignait qu’elle n’ait recueilli quelques confidences…\n\nAprès les exécutions, la gardienne allemande, sans donner évidemment d’explications, nous a offert les affaires personnelles de cette femme. Nous les avons, bien entendu, refusées.\n\nJe n’ai pas vu les exécutions, mais, comme les autres prisonnières, j’ai entendu le matin les coups de feu qui ont repris dans la soirée vers 16 ou 17 heures environ (on nous avait pris nos montres...)6. Après les dernières salves, le soir, nous avons pu, Mlle Dreabeck et moi, ouvrir une petite fenêtre et regarder dans la cour où avaient eu lieu les exécutions. Nous avons vu des soldats allemands, sous la surveillance d’un gradé, laver un mur et un caniveau à grande eau pour faire disparaître les traces de sang. Le gradé, levant les yeux, nous a aperçues, il a hurlé des mots que nous avons mal compris. Évidemment, il nous ordonnait de refermer la fenêtre et de disparaître."
	},
	{
		title : "« Demande-leur deux francs »",
		content: "Comme la plupart des Français en ce dimanche matin, 4 juin 1944, j’écoute, très tôt, la BBC, espérant apprendre qu’enfin ils avaient débarqué.\n\nRien... mais les nouvelles sont, néanmoins, bonnes. Rome est délivrée, Badoglio1 donne sa démission, Churchill, Eisenhower et de Gaulle tiennent conférence à Londres2. Les Russes avancent en Pologne et en Roumanie. Le dénouement paraît inéluctable et proche.\n\nII fait un temps splendide. Tout va bien.\n\nDepuis plusieurs semaines « on » sent qu’il va, qu’il doit, se passer LE grand événement. Les bombardements en France redoublent. Les Soviétiques réclament de plus en plus un effort supplémentaire des Alliés. En Italie, partout, les Allemands sont sur la défensive. Les messages personnels, tous mystérieux, se multiplient3. Le Débarquement, sujet de toutes les conversations, sur lequel les Allemands ont d’abord ironisé, devient maintenant, à l’ouest, leur sujet de préoccupation principal.\n\nII semble [im]minent.\n\nAvec mes amis nous faisons des pronostics, sans cesse renouvelés, sur les lieux présumés des opérations. Tristes stratèges, aucun ne prévoit notre région immédiate !\n\nSur le plan intérieur la situation se tend. Chaque jour des amis sont arrêtés par la Gestapo. C’est Junger, alias Dufour, qui conduit les opérations.\n\nComme [dans] une tragédie supérieurement montée, l’intensité, la tension grandissent. Il convient d’arriver maintenant au dénouement. Les nerfs sont à vif.\n\nJe vais avoir 23 ans le 2 août prochain. Membre, modeste, de la résistance (OCM)4, j’attends des instructions pour participer plus activement à l’effort de guerre. Dans l’immédiat je ne suis pas encore remis d’une grande frayeur. Quelques jours auparavant mon réseau a été sérieusement démantelé. Dufour est venu dans mon bureau arrêter mon chef direct, M. Deffes. L’affaire n’est pas terminée, et je ne suis pas encore rassuré. C’est donc pour moi, comme pour beaucoup d’autres, une raison supplémentaire d’attendre avec la plus grande impatience le débarquement, libérateur à de nombreux titres.\n\nLe lendemain\n\nMatinée sans histoire passée au bureau, place du Champ de Mars, où je réapparais après une « cavale » de quelques jours suite aux arrestations en série opérées dans mon réseau.\n\nL’après-midi, en compagnie de trois amis, je joue aux cartes dans une maison située sur l’emplacement actuel du restaurant « La Laitière normande », derrière la poste. Vers l6 heures notre attention est attirée par de violents tirs de DCA5. Très nourris, ils proviennent de canons antiaériens installés sur des miradors montés sur des toits, dans les environs de la gare et sur l’EPS6 de jeunes filles de la route de Carentan. Les Allemands visent, à vue, des avions américains, dont nous distinguons nettement les étoiles, qui piquent sur la gare.\n\nAppuyés sur la rambarde de la fenêtre nous sommes au spectacle. Nous voyons ces chasseurs-bombardiers fondre sur la gare, se redresser au dernier moment, monter en chandelle, faire un grand tour et revenir sur l’objectif. Comme au cinéma. Pour un peu nous aurions applaudi nos amis pour leur courage, leur sang-froid, et sifflé les Allemands si maladroits ! Ces aviateurs amis nous confortent dans l’idée que les Alliés ne bombardent pas à l’aveuglette les objectifs où des civils courent des risques. Ce rodéo nous [conforte] dans l’idée que les journaux et la radio mentent en présentant les aviateurs alliés comme ne se souciant pas des civils, lors des opérations du genre. Décidément, « Radio-Paris ment, Radio-Paris est allemand »7. Ce sentiment de totale sécurité, de confiance absolue, faillit nous coûter la vie 48 heures plus tard.\n\n23 heures : je suis à mon domicile quand un bruit énorme nous attire vers la fenêtre. C’est un avion, paraissant en difficulté, qui frôle les toits. II se dirige vers Tessy. Nous apprenons rapidement que ce bombardier s’est effectivement abattu vers le pont de Gourfaleur. Plusieurs aviateurs, canadiens, seront dès le lendemain retrouvés carbonisés. Affreux. Avant de m’endormir, j’écoute les dernières informations en provenance de Londres. Les messages personnels sont de plus en plus nombreux."
	},
	{
		title: "Ma valise en fer",
		content: 'Yann, l’aîné des petits enfants a eu cette idée originale de cadeau pour les 90 ans de sa grand mère, Louise. Il a demandé à Jérôme de mettre en forme ses mémoires et ce fut très bien fait à la grande satisfaction de tous les membres de la famille qui en ont fait l’acquisition. Louise en est ravie et chacun, alors heureux de mieux connaître une partie de ses racines, de se plaire à évoquer avec sa mère, sa grand mère, son arrière grand mère tel ou tel épisode de sa longue existence... \n\n"Je raconterais cor bien d’autres choses..., nous dit Louise aujourd’hui".'
	}
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


for (let i = 0; i < 15; i++) {
	let rand = Math.floor(Math.random()*TEXTES.length);
	let text = TEXTES[rand];
	let r =
	{
		title: text.title,
		description: '',
		content: text.content,
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
	let nb = 3 + Math.ceil(Math.random()*9);
	for (var i = 0; i < nb; i++) {

		let rand = Math.floor(Math.random()*TAGS.length);
		if (r.indexOf(TAGS[rand]) > -1) {continue}
		r.push(TAGS[rand]);
	}

	return r;
}