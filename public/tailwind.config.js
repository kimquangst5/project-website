tailwind.config = {
	// variants: {
	// 	scrollbar: ['rounded']
	// },
	plugins: [
		// require('tailwind-scrollbar')({ nocompatible: true }),

		 ({ addComponents, theme }) => {
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
		function({ addUtilities }) {
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
				color1: "#263238",
				color2: "#BEC2C4",
				color3: "#FA6B04",
			},
			fontFamily: {
				font1: ['source-sans-pro', 'sans-serif'],
				font2: ['Be Vietnam Pro', 'sans-serif'],
			},
			backgroundImage: {
				'section7': 'linear-gradient(to bottom, white 50%, #0000001A 50%)',
			},
			
		},
		
	},
	
};