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

		let $title = $('<h2>').text(this.data.title).addClass('title');
		let $desc  = $('<p>').text(this.data.description).addClass('description');
		let $content = null;
		switch (this.data.type) {
			case 'vidéo':
				
				$content = $('<iframe>').attr({
					src: this.data.content.replace('watch?v=', 'embed/'),
					width: "560",
					height: "315",
					frameborder:"0"
				}).addClass('content')
				
				$desc.addClass('hidden');
				$title.addClass('hidden');
				
				break;
			
			case 'texte':
				
				$content = $('<p>').text(this.data.content).addClass('content');
				
				break;
			
			case 'image':

				$desc.addClass('hidden');
				$title.addClass('hidden');
				
				$content = $('<img>').attr('src', this.data.content).addClass('content');
				
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

	getCenter(){

		let x = parseInt($(this.el).css('left')) + $(this.el).width()/2;
		let y = parseInt($(this.el).css('top')) + $(this.el).height()/2;

		return {x:x, y:y}
	}

	open(){

	}
}

export class Category {
	
	constructor(name, color) {
		this.entryPoint = null;
		this.name = name;
		this.resources = [];
		this.color = color;
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
			
			let x = this.entryPoint.getCenter().x + Math.cos(i) * (50*i+400);
			let y = this.entryPoint.getCenter().y + Math.sin(i) * (50*i+400);
			
			this.resources[i].setPosition(x, y);
			
			if (obj[p]){
				obj[p].push(this.resources[i]);
			} else {
				obj[p] = [];
				obj[p].push(this.resources[i]);
			}
		}
	}
}