import Flip from 'number-flip';

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