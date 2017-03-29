import $ from 'jquery'

export class DragOn {
	
	constructor(element){

		this.el = element;

		this.layers = [];

		this.cursor = {
			down : false,
			
			posX : 0,
			posY : 0,
			
			history: [], // used to compute average deltas
		}

		this.velocity = {
			x: 0,
			y: 0,
		}

		$(element).css({
			'width': window.innerWidth,
			'height' : window.innerHeight,
			'perspective' : '32px',
			'overflow' : 'hidden',
			'position' : 'relative',
			'perspective-origin' : '50% 50%',
			'cursor' : 'grab'
		})

	// on mouse down => drag start
		$(element).on('mousedown', (e)=>{
			
			this.cursor.down = true;

		// reset cursor history
			this.cursor.history = [];

			this.cursor.posY = e.pageY;
			this.cursor.posX = e.pageX;

		// reset velocity
			this.velocity = {x:0, y: 0};

			$(element).css({
				'cursor' : 'grabbing'
			})

		});

	// on mouse up => drag end
		$(element).on('mouseup', (e)=>{
			
			this.cursor.down = false;
		
		// average deltas	
			let h = this.cursor.history;
			h.unshift({x: e.pageX, y: e.pageY })
			let deltas = [];

			for (var i = 0; i < h.length; i++) {
				if (h[i+1]) {
					deltas.push(
						{
							x: h[i].x-h[i+1].x,
							y: h[i].y-h[i+1].y
						}
					)
				}
			}

			let avgDelta = (a)=>{
				let t = 0;
				for (var i = 0; i < deltas.length; i++) {
					t += deltas[i][a];
				}
				return t / deltas.length;
			}
			
			$(element).css({
				'cursor' : 'grabbing'
			})
		// set velocity
			this.velocity.x = Math.abs(avgDelta('x')) > 2 ? -avgDelta('x') : 0;
			this.velocity.y = Math.abs(avgDelta('y')) > 2 ? -avgDelta('y') : 0;
			
		});
	
	// on mouse move => move camera
		$(element).on('mousemove', (e)=>{
			
			if (!this.cursor.down) {return};

			this.cursor.history.unshift({x: this.cursor.posX, y: this.cursor.posY});

			if (this.cursor.history.length > 3) { this.cursor.history.pop() };

			this.cursor.posY = e.pageY;
			this.cursor.posX = e.pageX;

			let deltaX = this.cursor.history[0].x - e.pageX
			let deltaY = this.cursor.history[0].y - e.pageY;
			
			$(element).scrollTop( $(element).scrollTop() + deltaY );
			$(element).scrollLeft( $(element).scrollLeft() + deltaX );

		});

		this.animate();
	}

	add(layer) {
		this.layers.push(layer);
		return layer;
	}
	
	find(id) {
		
		for (let i = 0; i < this.layers.length; i++) {

			if (this.layers[i].el == id) return this.layers[i];
		}

		return false;
	}

// move view on element
	focusOn(element) {

		if (typeof element == 'string') {
			element = this.find(element);
		}
		let $el = $(element.el);
		
		let x = parseInt($el.css('left')) - $(this.el).width()/2 + $el.width()/2;
		let y = parseInt($el.css('top')) - $(this.el).height()/2 + $el.height()/2;

		$(this.el).scrollTop(y);
		$(this.el).scrollLeft(x);
	}

// smoothly move to element
	moveTo(element, callback) {
				
		if (typeof element == 'string') {
			element = this.find(element);
		}
		let $el = $(element.el);
		
		let x = parseInt($el.css('left')) - $(this.el).width()/2 + $el.width()/2;
		let y = parseInt($el.css('top')) - $(this.el).height()/2 + $el.height()/2;
		
		$(this.el).animate({
			scrollLeft:x +'px',
			scrollTop:y +'px'
		}, 1000, ()=>{
			callback(element);
		});
	}

	animate() {

		let $el = $(this.el);

	// reduce velocity
		this.velocity.x *= 0.99;
		this.velocity.y *= 0.99;
	
	// apply velocity
		$el.scrollTop($el.scrollTop() + this.velocity.y);
		$el.scrollLeft($el.scrollLeft() + this.velocity.x);
	}

	getCenter(){
		
		let x = $(this.el).scrollLeft() + $(this.el).width()/2;
		let y = $(this.el).scrollTop() + $(this.el).height()/2;
		
		return {x:x, y:y}
	}

	getDistanceTo(r) {
		
		let rPos = r.getCenter();
		let cPos = this.getCenter();

		let dist = Math.sqrt(Math.pow(rPos.x-cPos.x, 2) + Math.pow(rPos.y-cPos.y, 2));
		
		return dist;
	}

/*	isInView(element){

		let left  = parseInt($(element.el).css('left'));
		let top   = parseInt($(element.el).css('top'));
		let right = parseInt($(element.el).css('left')) + $(element.el).width();
		let down  = parseInt($(element.el).css('top')) + $(element.el).height();

		let screenLeft  = parseInt($(this.el).css('left'));
		let screenTop   = parseInt($(this.el).css('top'));
		let screenRight = parseInt($(this.el).css('left')) + $(this.el).width();
		let screenDown  = parseInt($(this.el).css('top')) + $(this.el).height();

	}*/

/*	distanceFromCenter(element) {

		return 
	}*/
}

export class Element {
	
	constructor(element, z) {
		this.el = element;
		this.z  = z;
		$(element).css({
			'position' : 'absolute',
			'user-select' : 'none',
			'transform': 'translateZ('+ z +'px)',
			'z-index' : z 
		});
	}
	
	setPosition(x, y){

		if (x) $(this.el).css('left', x + 'px');
		if (y) $(this.el).css('top',  y + 'px');
	}

	getCenter(){

		let x = parseInt($(this.el).css('left')) + $(this.el).width()/2;
		let y = parseInt($(this.el).css('top')) + $(this.el).height()/2;

		return {x:x, y:y};
	}

	setZ(z) {
		this.z = z;
		$(this.el).css({
			'transform': 'translateZ('+ z +'px)',
			'z-index' : z 
		})
	}
}