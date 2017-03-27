import $ from 'jquery'

export class DragOn {
	
	constructor(element){

		console.log($(element))
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
			'perspective-origin' : '50% 50%'
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

			console.log(this.cursor.down);
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

		// set velocity
			this.velocity.x = Math.abs(avgDelta('x')) > 2 ? -avgDelta('x') : 0;
			this.velocity.y = Math.abs(avgDelta('y')) > 2 ? -avgDelta('y') : 0;
			
			console.log(this.cursor.down);
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
			
			console.log(deltaX, deltaY);
			$(element).scrollTop( $(element).scrollTop() + deltaY );
			$(element).scrollLeft( $(element).scrollLeft() + deltaX );

		});

		this.animate();
	}

	add(layer) {
		this.layers.push(layer);
		return layer;
	}

	animate() {

		let $el = $(this.el);

	// reduce velocity
		this.velocity.x *= 0.99;
		this.velocity.y *= 0.99;
	
	// apply velocity
		$el.scrollTop($el.scrollTop() + this.velocity.y);
		$el.scrollLeft($el.scrollLeft() + this.velocity.x);

		let self = this;

	// loop
		requestAnimationFrame(()=>{
			self.animate();
		});
	}
}

export class Element {
	constructor(element, z) {
		this.el = element;
		this.z  = z;
		$(element).css({
			'position' : 'absolute',
			'user-select' : 'none',
			'transform': 'translateZ('+ z +'px)'
		});
	}
}

let dragon = new DragOn('#camera');
let layer  = dragon.add(new Element('#layer', -4));
let layer1 = dragon.add(new Element('#layer1', 0));
let layer2 = dragon.add(new Element('#layer2', 4));