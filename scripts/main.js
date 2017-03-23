$(document).ready(()=>{
	let $blackFilter = $(".black-filter");
	TweenLite.from($blackFilter,1.5,
		{
		backgroundColor:"rgba(5,0,4,1)",
		ease: Power1.easeInOut,
		}
	);
	/*for (var i = 2; i > 0; i--) {
		let snIndice = i;
		let $baseLine = $('#section1 .base-line>h1:nth-child('+snIndice+')');
		console.log(snIndice);
		TweenLite.from($baseLine, 1.5,
			{
			opacity:0,
			marginLeft:""+(2*snIndice)+"em",
			ease: Power1.easeInOut,
			delay:.2*snIndice
			}
		);
	}*/
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
	}
});