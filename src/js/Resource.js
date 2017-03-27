import {DragOn, Element} from './DragOn.js';
import $ from 'jquery'

export class Resource extends Element {
	constructor(data, z, parent){

		let el = $('<div>');
		el.attr('id', data._id);
		$(parent).append(el);
		super('#'+data._id, z);
		this.data = data;

		el.addClass(this.data.type);
		el.addClass(this.data.category);
		el.addClass('resource');

		let $title = $('<h2>').text(this.data.title);
		let $desc  = $('<p>').text(this.data.description);
		let $content = null;
		switch (this.data.type) {
			case 'vidéo':
				$content = $('<iframe>').attr({
					src: this.data.content.replace('watch?v=', 'embed/'),
					width: "560",
					height: "315",
					frameborder:"0"
				})
				break;
			case 'texte':
				$content = $('<p>').text(this.data.content);
				break;
			case 'image':
				$content = $('<img>').attr('src', this.data.content);
				break;
		}

		el.append($title);
		el.append($desc);
		el.append($content);

	}

	relativePertinence(r) {
		let len = this.data.tags.length;
		let p = 0;

		for (var i = 0; i < len; i++) {
			if (r.data.tags.indexOf(this.data.tags[i]) < 0) { continue; }
			p ++;
		}

		return p
	}
}

export class Category {
	
	constructor(name) {
		this.entryPoint = null;
		this.name = name;
		this.resources = [];
	}

	add(r) {
		this.resources.push(r);
	}

	orderResources(){
		let len = this.resources.length;

		this.resources.sort((a, b)=>{

			let aPert = this.entryPoint.relativePertinence(a);
			let bPert = this.entryPoint.relativePertinence(b);
			
			return bPert - aPert;
		})
	}

	placeResources(){
		
		let obj = {};

		for (let i = 0; i < this.resources.length; i++) {

			if (this.resources[i] == this.entryPoint) {continue};
			let p = this.resources[i].relativePertinence(this.entryPoint);
			if (obj[p]){
				obj[p].push(this.resources[i]);
			} else {
				obj[p] = [];
				obj[p].push(this.resources[i]);
			}
		}

	}

}