tailwind.config = {
	// variants: {
	// 	scrollbar: ['rounded']
	// },
	plugins: [
		// require('tailwind-scrollbar')({ nocompatible: true }),

		({
			addComponents,
			theme
		}) => {
			const screens = theme("screens", {});
			const maxWidths = {
				sm: `max-width: ${screens.sm}`, // 576px
				md: `max-width: ${screens.md}`, // 768px
				lg: `max-width: ${screens.lg}`, // 992px
				xl: `max-width: ${screens.xl}`, // 1200px
				xl2: `max-width: ${screens.xl2}`, // 1270
				'2xl': `max-width: ${screens['2xl']}`, // 1400px (thêm breakpoint mới)
				'3xl': `min-width: ${screens['3xl']}`,
			};

			const containers = {
				".container": {
					maxWidth: "1239px",
					'@screen 3xl': { // Thêm quy tắc cho breakpoint mới
						maxWidth: "1239px", // Kích thước container cho màn hình lớn hơn
					},
					'@screen 2xl': { // Thêm quy tắc cho breakpoint mới
						maxWidth: "1239px", // Kích thước container cho màn hình lớn hơn
					},
					"@screen xl2": {
						maxWidth: "1160px",
					},
					"@screen xl": {
						maxWidth: "960px",
					},
					"@screen lg": {
						maxWidth: "720px",
					},
					"@screen md": {
						maxWidth: "540px",
					},
					"@screen sm": {
						maxWidth: "100%",
						paddingLeft: "16px",
						paddingRight: "16px",
					},

					marginLeft: 'auto',
					marginRight: 'auto',
				},
			};

			addComponents(maxWidths);
			addComponents(containers);
		},
		function ({
			addUtilities
		}) {
			const newUtilities = {
				'.scrollbar': {
					'&::-webkit-scrollbar': {
						'width': '5px',
					},
					'&::-webkit-scrollbar-track': {
						'background': 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						'background': '#FA6B04',
						'border-radius': '5px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						'background': '#FA6B04',
					},
				},
				'.scrollbarmain': {
					'&::-webkit-scrollbar': {
						'width': '5px',
					},
					'&::-webkit-scrollbar-track': {
						'background': 'transparent',
					},
					'&::-webkit-scrollbar-thumb': {
						'background': '#FA6B04',
						'border-radius': '5px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						'background': '#FA6B04',
					},
				},
			}
			addUtilities(newUtilities, ['responsive', 'hover']);
		}
	],

	theme: {

		container: {
			center: true,
		},
		screens: {
			"3xl": {
				'min': "1440px",
			},
			"2xl": {
				'max': "1440px",
			},
			'xl2': {
				'max': "1269.98px",
			},
			'xl': {
				'max': "1199.98px",
			},
			'lg': {
				'max': "991.98px",
			},
			'md': {
				'max': "767.98px",
			},
			'sm': {
				'max': "575.98px",
			},
		},
		extend: {
			colors: {
				adminColorTertiary: "#303841", //nền trong
				adminColorMain: "#38414A",  //nền box
				header: "#38414a", //button
				adminColorHeadline: "#9097A7", // text
				adminColorHeadlineHover: "#434A50", //button
				adminColorHighlight: "#ffd803", //button
				main: "#F0F0F0", //button,
				xanh: `#22BC9A`,
				do: `#EF556F`,
				xanhhover: `#16A085`,
				dohover: `#CD485C`,
				bginput: `#464F5B`,
				box: `#36404A`,
				bgimage: `#424E5A`,
				textHover: `#B4C6DB`,
				color3: "#FA6B04",
				text: "#94A0aD",
				chu: "#FFC234",
			},
			fontFamily: {
				font_main: ['Poppins', 'sans-serif'],
				THAI_CONG: ['Montserrat', 'sans-serif'],
				KIM_QUANG: ["Quicksand", 'sans-serif']
			},
			backgroundImage: {
				'section7': 'linear-gradient(to bottom, white 50%, #0000001A 50%)',
			},

		},

	},

};
// Kiểm tra xem 'module' có tồn tại không (Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = tailwind.config;
   } else {
	// Trình duyệt environment
	window.tailwind.config = tailwind.config;
   }