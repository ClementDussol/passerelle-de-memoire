import $ from 'jquery'
import TweenLite from 'gsap'

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
		opacity:0,
		display:"none",
		delay:9
		}
	);
	introPlayed = true;
}