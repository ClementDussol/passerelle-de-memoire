import $ from 'jquery'
import TweenLite from 'gsap'
import {DragOn, Element} from './js/DragOn.js'

console.log(DragOn);

let winHeight = window.innerHeight;
let introPlayed = false;
let affMenuPlayed = false;

$(document).ready(()=>{
	playMenu();
	
	let scrolli = $("body").scrollTop();
	setInterval(function () {
	    scrolli = $("body").scrollTop();

	    if (scrolli>(winHeight-300) && !introPlayed){
	    	playIntro();
		};
	}, 100);
	
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

let Cloud = {

	init(){
		Cloud.drag = new DragOn('#cloud'),
		Cloud.vue = new Vue({
			el: '#layer',
			data: {
				resources: [],
				categories : {
					amour:{
						entryPoint: null,
						content:[]
					},
					travail:{
						entryPoint: null,
						content:[]
					},
					jeunesse:{
						entryPoint: null,
						content:[]
					},
					pensées:{
						entryPoint: null,
						content:[]
					},
					Histoire:{
						entryPoint: null,
						content:[]
					}
				}
			}
		})

		Cloud.getResources((r)=>{
			Cloud.vue.resources = r;
			Cloud.storeResources();
		})

		Cloud.drag.add(new Element('#layer', 0))
	},

	getResources(callback){
		$.get('/api/resources', (data) => {
			callback(data);
		})
	},

	storeResources(){

		for (let i = 0; i < Cloud.vue.resources.length; i++) {
			let r = Cloud.vue.resources[i];
			Cloud.vue.categories[r.category].content.push(r);
		}
	}
}

Cloud.init();