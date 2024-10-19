const countJs = document.querySelector('[section-1]');
if (countJs) {
	const listCountJs = countJs.querySelectorAll('[count-js-section-1]');
	if (listCountJs.length > 0) {
		listCountJs.forEach(it => {
			const value = parseInt(it.innerHTML - 50)
			if (value) {
				console.log(value)
				anime({
					targets: it,
					innerHTML: [value, value + 50],
					easing: 'easeOutQuad', // Easing mượt mà hơn
					round: 1,
					duration: 5000,

				});
			}
		})
	}
	
}

const logo = document.querySelector('[logo-website]');
	if(logo){
		console.log(logo)
		// anime({
		// 	targets: logo.src,
		// 	strokeDashoffset: [anime.setDashoffset, 0],
		// 	easing: 'easeInOutSine',
		// 	duration: 1500,
		// 	delay: function(el, i) { return i * 250 },
		// 	direction: 'alternate',
		// 	loop: true
		//    });
	}
