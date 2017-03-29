import $ from 'jquery'
import TweenLite from 'gsap'
import {DragOn, Element} from './js/DragOn.js'
import {Resource, Category} from './js/Resource.js'


let winHeight = window.innerHeight;
let introPlayed = false;
let affMenuPlayed = false;

let cloudInitiated = false;

$(document).ready(()=>{
	playMenu();
	
	let scrolli = $("body").scrollTop();
	let interval = setInterval(function () {
	    scrolli = $("body").scrollTop();

	    if (scrolli>(winHeight-300) && !introPlayed){
	    	playIntro();
	    	clearInterval(interval);
		};

	}, 100);

	$(window).scroll((e)=>{

		let scrollTop = $(e.currentTarget).scrollTop();
		
		if (scrollTop > 0) {
			$('nav').attr('id', 'white-nav')
		} else { 
			$('nav').attr('id', '') 
		}

		if (scrollTop >= window.innerHeight*2 - 100 && !cloudInitiated) {
			console.log('coucou');
			Cloud.init();
			cloudInitiated=true;
		}
	})

	$(window).scroll();
});

function playMenu() {
	affMenuPlayed = true;
	let $blackFilter = $(".black-filter");
	TweenLite.from($blackFilter,1.5,
		{
		backgroundColor:"rgba(5,0,4,1)",
		ease: Power1.easeInOut,
		}
	);
	let $baseLine = $("#section1 .base-line");
	TweenLite.from($baseLine, 1.5,
		{
		opacity:0,
		marginLeft:"-30px",
		ease: Power1.easeInOut,
		delay:1.3
		}
	);
	let $button = $("#section1 .button");
	TweenLite.from($button, .7,
		{
		opacity:0,
		display:"none",
		marginTop:"20vh",
		ease: Power1.easeInOut,
		delay:2.1
		}
	);
	let $logo = $('nav .logo');
	TweenLite.from($logo, .5,
		{
		opacity:0,
		ease: Power1.easeInOut,
		delay:.2
		}
	);
	for (var i = 3; i > 0; i--) {
		let $a = $('nav>div>a:nth-child('+i+')');
		TweenLite.from($a,.5,
			{
				opacity:"0",
				delay:.1*i+.3
			}
		);
	};
}

function playIntro() {
	TweenLite.to($('#section2>div'), 3.5,
		{
		opacity:1,
		delay:.2
		}
	);
	TweenLite.to($('#section2>div'), 14,
		{
		marginLeft:"46vw",
		ease: Linear.easeNone
		}
	);
	TweenLite.to($('#section2>div'), 3.4,
		{
			css:
			{
				opacity:0,
				display:"none"
			},
			delay:7.5
		}
	); 
	introPlayed = true;
}

let catColors = {
	amour: '#b081e9',
	Histoire: '#ffdb7d',
	jeunesse: '#8eb9fe',
	pensées: '#e8a382',
	travail: '#ff6faa'
}

let Cloud = {

	currentCategory: {},
	categories: {},
	resources: [],

	preInit(){
		Cloud.drag = new DragOn('#cloud')
		Cloud.drag.add(new Element('#bg', -8))		
	},

	init(){
		
		Cloud.getResources((r)=>{
			
			let len = r.length

			for (let i = 0; i < len; i ++) {
				
				let res = r[i];
				
				let cat = Cloud.categories[res.category]
				
				if ( !cat ) {

					this.categories[r[i].category] = new Category(r[i].category, catColors[r[i].category]);
					cat = this.categories[r[i].category];
				}

				let resource = new Resource(res, -4+Math.round(Math.random()*8), '#cloud');

				if (resource.data.type == 'vidéo') {
					cat.entryPoint = resource;
					cat.entryPoint.setZ(6);
				}

				$(resource.el).css({
					opacity:0,
					transform:'scale(0) translateZ(-16px)'
				})

				Cloud.resources.push(resource);

				cat.add(resource);
				Cloud.drag.add(resource);
			};

			
			var images = $('img');
			var counter = images.length;  // initialize the counter

			function imageLoaded() {
			    // function to invoke for loaded image
			    // decrement the counter
			    counter--;

			    let p = counter*100/images.length;

			    TweenLite.to($('#loadBar'), 0.1, {width: 100-p+'%'});
			    
			    if( counter === 0 ) {

			        $('#loadBar').slideUp();
			        let len = Cloud.resources.length
			        for (var i = 0; i < len; i++) {
			        	
			        	let r = Cloud.resources[i];
						
						setTimeout(()=>{
							TweenLite.to($('#loader'), 1, {opacity:0});
							TweenLite.to($(r.el), 1,
								{
									css:
									{
										opacity:1,
										transform:'scale(1) translateZ('+ r.z +'px)'
									}
								}
							)
						}, 1000 + i *100); 
			        }
			    }
			}

			$('#loadBar').slideDown();


			images.each(function() {
			    if( this.complete ) {
			        imageLoaded.call( this );
			    } else {
			        $(this).one('load', imageLoaded);
			    }
			});


			let bg = Cloud.drag.find('#bg')

			let positions = [

				{x: $(bg.el).width()/4, y:$(bg.el).height()/4},
				{x: $(bg.el).width()/4*3, y:$(bg.el).height()/4},
				{x: $(bg.el).width()/4, y:$(bg.el).height()/4*3},
				{x: $(bg.el).width()/4*3, y:$(bg.el).height()/4*3},
				{x: $(bg.el).width()/2, y:$(bg.el).height()/2}
			]

			let i = 0;

			for (let cat in Cloud.categories) {
				
				let x = positions[i].x
				let y = positions[i].y

				Cloud.categories[cat].entryPoint.setPosition(x, y);
				Cloud.categories[cat].placeResources();			
				Cloud.drag.focusOn(Cloud.categories[cat].entryPoint);

				i++;
			}

			$(Cloud.drag.el).on('click', '.resource', (e)=>{
				
				let id = '#' + $(e.currentTarget).attr('id')
				Cloud.drag.find(id).open();
				Cloud.drag.moveTo(id,(r)=>{
					
				});
			})

			Cloud.animate();
		})

	},

	getResources(callback){
		$.get('/api/resources', (data) => {
			callback(data);
		})
	},

	storeResources(){
		let len = Cloud.vue.resources.length;
		for (let i = 0; i < len; i++) {
			let r = Cloud.vue.resources[i];
			Cloud.vue.categories[r.category].content.push(r);
		}
	},

	getClosestCategory(){
		
		let lowest = 100000000;
		let r = null;
		
		for (let name in this.categories){
			let cat = this.categories[name];

			if (!cat || !cat.entryPoint) {continue};

			let dist = Cloud.drag.getDistanceTo(cat.entryPoint);
			if (dist < lowest) {
				lowest = dist;
				r = cat;
			}
		}

		return r;
	},

	animate(){
		
		Cloud.drag.animate();

		let closest = Cloud.getClosestCategory();

		if (Cloud.currentCategory != closest) {
			Cloud.currentCategory = closest;
			$('#bg').removeClass('travail pensées Histoire jeunesse amour');
			$('#bg').addClass(closest.name);
		}

/*		console.log(Cloud.getClosestCategory());
*/
		requestAnimationFrame(Cloud.animate);
	}
}

Cloud.preInit();