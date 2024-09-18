const header = document.querySelector('header');
let last = 0;
if (header) {
	const height = header.clientHeight
	document.addEventListener('scroll', (event) => {
		let scrollTop = document.documentElement.scrollTop;
		const list = header.querySelector("[list-category]");
		const menu = list.nextElementSibling;
		if (scrollTop > last) {
			header.style.top = `-${height}px`
			menu.style.display = `none`
			const icon = listCategory.querySelector('i');
			if (icon) {
				if (icon.className.includes('-rotate-90')) {
					icon.classList.toggle('-rotate-90')

				}
			}

		} else {
			header.style.top = `0px`;
			menu.style.display = `block`
			const icon = listCategory.querySelector('i');
			if (icon) {
				if (!icon.className.includes('-rotate-90')) {
					icon.classList.toggle('-rotate-90')

				}
			}

		}
		last = scrollTop;
	});
}


const listCategory = header.querySelector("[list-category]");
if (listCategory) {
	const width = listCategory.clientWidth
	const menu = listCategory.nextElementSibling;
	menu.classList.add(`w-[${width}px]`)
	const listLi = menu.querySelectorAll('li');
	if (listLi.length > 0) {
		listLi.forEach(it => {
			const height = it.scrollHeight
			it.classList.toggle(`mt-[-${height}px]`)
			it.addEventListener("dblclick", () => {

				const link = it.querySelector('a')
				link.click();
			});
		});
	}


	listCategory.addEventListener('click', () => {
		if (menu) {
			const icon = listCategory.querySelector('i');
			if (icon) {
				icon.classList.toggle('-rotate-90')
			}
			menu.style.display = "block"
			const lii = menu.querySelector('li');
			if (lii) {
				const h = lii.clientHeight
				if (lii.className.includes(`mt-[-${h}px]`)) {
					const allIcon = menu.querySelectorAll('i');
					if (allIcon.length > 0) {
						allIcon.forEach(icon => {
							if (icon.className.includes('-rotate-90')) {
								icon.classList.toggle('-rotate-90')
							}
						});
					}
				}

			}
			let bool = false
			const listLevel1 = menu.querySelectorAll(`li[level='1']`);
			if (listLevel1.length > 0) {
				listLevel1.forEach(it => {
					const height = it.scrollHeight
					if (it.className.includes(`mt-[-${height}px]`)) {
						bool = true
					}
					it.classList.toggle(`mt-[-${height}px]`)
					it.classList.add(`duration-1000`)
				});
			}
			if (bool == false) {
				const allLi = menu.querySelectorAll(`li`);
				allLi.forEach(it => {
					const height = it.scrollHeight
					if (!it.className.includes(`mt-[-${height}px]`)) {
						it.classList.toggle(`mt-[-${height}px]`)
					}
					it.classList.add(`duration-1000`)
				});
			}
			const listli = menu.querySelectorAll(`li[level]`);
			if (listli.length > 0) {
				listli.forEach(async (item) => {
					item.addEventListener('click', () => {
						const icon = item.querySelector('i');
						if (icon) {
							icon.classList.toggle('-rotate-90')
						}
						const level = item.getAttribute('level');
						const con = item.parentElement.querySelectorAll(`li[level='${level}']`);
						if (con.length > 0) {
							con.forEach(iy => {
								if (iy != item) {
									const allLI = iy.nextElementSibling.querySelectorAll('li');

									if (allLI.length > 0) {
										allLI.forEach(element => {
											const h = element.clientHeight
											if (!element.className.includes(`mt-[-${h}px]`)) {
												element.classList.toggle(`mt-[-${h}px]`)
											}
										});
										const iconn = iy.querySelector('i');
										if (iconn) {
											if (iconn.className.includes(`-rotate-90`)) {
												iconn.classList.toggle(`-rotate-90`)

											}

										}
									}
								}
							});
						}


						const ul = item.nextElementSibling
						if (ul) {
							if (ul.tagName.toLowerCase() == 'ul') {
								const valueul = ul.getAttribute('level')
								const listLI = ul.querySelectorAll('li');
								if (listLI.length > 0) {
									let check = false
									listLI.forEach(li => {
										const valueli = li.getAttribute('level')
										if (valueli === valueul) {
											const h = li.scrollHeight;
											li.classList.toggle(`mt-[-${h}px]`)
											li.classList.add(`duration-1000`)
											if (!li.className.includes(`mt-[-${h}px]`)) {
												check = true

											}
										}
									});
									if (check == false) {
										let liCHA;
										listLI.forEach(li => {
											const h = li.scrollHeight;
											if (!li.className.includes(`mt-[-${h}px]`)) {
												li.classList.toggle(`mt-[-${h}px]`)
												li.classList.add(`duration-1000`)
												liCHA = li.parentElement.previousElementSibling
											}
										});
										if (liCHA) {
											const icon = liCHA.querySelector('i');
											if (icon) {
												if (icon.className.includes('-rotate-90')) {
													icon.classList.toggle(`-rotate-90`)
												}
											}
										}
									}


								}
							}
						}


					});
				});
			}

		}
	});
}

const formSearch = document.querySelector('[form-search]');
if (formSearch) {
	formSearch.addEventListener('submit', (event) => {
		event.preventDefault();
	});
	const button = formSearch.querySelector('button')
	if (button) {
		button.addEventListener("click", () => {
			let input = formSearch.querySelector('input');
			if (input) {
				let value = input.value
				value = value.trim().replace(/\s+/g, ' ')
				if (value) {
					const link = formSearch.getAttribute('form-search')
					if (link) {
						let url = new URL(window.location.origin)
						url.pathname = link
						url.searchParams.set('key', value)
						location.href = url.href
					}

				}
			}
		});
	}
}

const linkCart = document.querySelectorAll('[link-cart]');
if (linkCart.length > 0) {
	linkCart.forEach(item => {
		const listTagI = item.querySelectorAll('i');
		if (listTagI.length > 0) {
			listTagI.forEach(it => {
				it.addEventListener('click', (event) => {
					event.preventDefault()
					const link = it.getAttribute('link');
					if (link) {
						location.href = link
					}
				});
			});
		}
	});

}

const calculate = document.querySelectorAll('[calculate]');
if (calculate.length > 0) {
	calculate.forEach(cal => {
		const add = cal.querySelector('[addition]');
		const sub = cal.querySelector('[subtraction]');
		const stock = cal.querySelector('[stock]');
		const price = cal.querySelector(['[priceTotal]']);
		if (add && sub) {
			add.addEventListener('click', () => {
				stock.value = parseInt(stock.value) + 1
				if(price){
					const getPrice = price.getAttribute("priceTotal");
				if(getPrice){
					let PRICE = parseInt(parseInt(getPrice) * parseInt(stock.value))
					price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
					price.innerHTML = parseInt(price.innerHTML);
					PRICE = PRICE.toLocaleString('en-EN')
					price.innerHTML = PRICE
				}
				}
				
			});
			stock.value = parseInt(stock.value)
			sub.addEventListener('click', () => {
				if (parseInt(stock.value) != 1) {
					stock.value = parseInt(stock.value) - 1
					const getPrice = price.getAttribute("priceTotal");
				if(getPrice){
					let PRICE = parseInt(parseInt(getPrice) * parseInt(stock.value))
					price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
					price.innerHTML = parseInt(price.innerHTML);
					PRICE = PRICE.toLocaleString('en-EN')
					price.innerHTML = PRICE
				}
				}
			});
			stock.addEventListener('change', () => {
				const getPrice = price.getAttribute("priceTotal");
				if(getPrice){
					let PRICE = parseInt(parseInt(getPrice) * parseInt(stock.value))
					price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
					price.innerHTML = parseInt(price.innerHTML);
					PRICE = PRICE.toLocaleString('en-EN')
					price.innerHTML = PRICE
				}
			})
		}
	});
}


const addCart = document.querySelector('[add-cart]');
if (addCart) {
	addCart.addEventListener('click', () => {
		const link = addCart.getAttribute('add-cart');
		if (link) {
			const stock = document.querySelector('[stock]');
			const quanlity = parseInt(stock.value);
			if (quanlity) {
				const data = {
					quanlity: quanlity
				}
				if (data) {
					fetch(link, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(data)
						})
						.then(res => res.json())
						.then(dataItem => {
							if (dataItem.code == 200) {
								window.location.href = '/order/cart-info'
							}
							if (dataItem.code == 400) {
								window.location.reload();
							}
						})
				}
			}


		}

	});
}


console.log('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Web hoặc có mục đích "hack" Web của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào Web của bạn.! \nWeb này được xây dựng bởi Trần Kim Quang', 'color: white; font-size: 20px; font-weight: ;');

console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');