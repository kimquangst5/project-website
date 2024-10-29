AOS.init();
const header = document.querySelector('header');
const listCategory = header.querySelector("[list-category]");
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

const arrowFunctionListCategory = () => {
	
	if (!listCategory) return;
	const width = listCategory.clientWidth
	const menu = listCategory.nextElementSibling;
	menu.classList.add(`w-[${width}px]`)
	const listLi = menu.querySelectorAll('li');
	if (listLi.length == 0) return;
	listLi.forEach(it => {
		const height = it.scrollHeight
		it.classList.toggle(`mt-[-${height}px]`)
		it.addEventListener("dblclick", () => {

			const link = it.querySelector('a')
			link.click();
		});
	});


	listCategory.addEventListener('click', () => {
		if (!menu) return;
		const icon = listCategory.querySelector('i');
		if (!icon) return;
		icon.classList.toggle('-rotate-90')
		menu.style.display = "block"
		const lii = menu.querySelector('li');
		if (!lii) return;

		const allIcon = menu.querySelectorAll('i');
		if (allIcon.length == 0) return;
		allIcon.forEach(icon => {
			if (!icon.className.includes('-rotate-90')) return;
			icon.classList.toggle('-rotate-90')

		});

		console.log("QUANG")

		let bool = false
		const listLevel1 = menu.querySelectorAll(`li[level='1']`);
		if (listLevel1.length == 0) return;
		listLevel1.forEach(it => {
			console.log(it)
			const height = it.scrollHeight
			if (it.className.includes(`mt-[-${height}px]`)){
				console.log("ok")
				bool = true
			}
			it.classList.toggle(`mt-[-${height}px]`)
			it.classList.add(`duration-1000`)
		});
		if (!bool) {
			const allLi = menu.querySelectorAll(`li`);
			allLi.forEach(it => {
				const height = it.scrollHeight
				if (!it.className.includes(`mt-[-${height}px]`))
					it.classList.toggle(`mt-[-${height}px]`)
				it.classList.add(`duration-1000`)
			});
		}
	});
	const listli = menu.querySelectorAll(`li[level]`);
	if (listli.length == 0) return;
	listli.forEach(async (item) => {
		item.addEventListener('click', () => {
			const icon = item.querySelector('i');
			if (!icon) return;
			icon.classList.toggle('-rotate-90')
			const level = item.getAttribute('level');
			const con = item.parentElement.querySelectorAll(`li[level='${level}']`);
			if (con.length == 0) return;
			con.forEach(iy => {
				if (iy == item) return;
				const next = iy.nextElementSibling;
				if (!next) return;
				const allLI = next.querySelectorAll('li');

				if (allLI.length == 0) return;
				allLI.forEach(element => {
					const h = element.clientHeight
					if (!element.className.includes(`mt-[-${h}px]`)) {
						element.classList.toggle(`mt-[-${h}px]`)
					}
				});
				const iconn = iy.querySelector('i');
				if (!iconn) return;
				if (iconn.className.includes(`-rotate-90`))
					iconn.classList.toggle(`-rotate-90`)
			});


			const ul = item.nextElementSibling
			if (!ul) return;
			if (!(ul.tagName.toLowerCase() == 'ul')) return;
			const valueul = ul.getAttribute('level')
			const listLI = ul.querySelectorAll('li');
			if (listLI.length == 0) return;
			let check = false
			listLI.forEach(li => {
				const valueli = li.getAttribute('level')
				if (valueli != valueul) return;
				const h = li.scrollHeight;
				li.classList.toggle(`mt-[-${h}px]`)
				li.classList.add(`duration-1000`)
				if (!li.className.includes(`mt-[-${h}px]`))
					check = true

			});
			if (check == false) {
				let liCHA;
				listLI.forEach(li => {
					const h = li.scrollHeight;
					if (li.className.includes(`mt-[-${h}px]`)) return;
					li.classList.toggle(`mt-[-${h}px]`)
					li.classList.add(`duration-1000`)
					liCHA = li.parentElement.previousElementSibling
				});
				if (!liCHA) return;
				const icon = liCHA.querySelector('i');
				if (!icon) return;
				if (!(icon.className.includes('-rotate-90'))) return;
				icon.classList.toggle(`-rotate-90`)
			}
		});
	});
}
arrowFunctionListCategory();


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

	const input = formSearch.querySelector('input');
	if (input) {
		input.addEventListener("input", () => {

			fetch(`/tim-kiem/suggest?key=${input.value}`, {
					method: "GET",
					headers: {
						'Content-Type': 'application/json'
					},

				})
				.then(res => res.json())
				.then(data => {
					if (data.code == 200) {
						const formSeachQuick = formSearch.querySelector('[form-search-quick]');
						if (formSeachQuick) {
							const length = input.value.trim().replace(/\s+/g, ' ').length
							if (length > 2) {
								if (!formSeachQuick.className.includes('py-[20px]')) {
									formSeachQuick.classList.toggle('py-[20px]')
								}
								const products = data.products.map(it =>
									`
										<div class="flex gap-[10px] border-[1px] border-[#DDE1EF] rounded-[10px]">
											<a class="h-[70px] rounded-[9px] truncate" href='/product/detail/${it.slug}'><img class="aspect-square h-full object-cover" src=${it.thumbnail[0]} alt="" /></a>
											<div>
												<a class="font-bold line-clamp-1 text-chu" href='/product/detail/${it.slug}'>${it.title}</a>
												<div class="font-bold line-clamp-1">Giá: ${(parseInt(((it.price - (it.price * it.discountPercentage) / 100).toFixed(0))/1000) * 1000).toLocaleString()}đ</div>
												<div class="font-bold line-clamp-1">Giảm: ${it.discountPercentage}%</div>
											</div>
										</div>
									`
								)
								formSeachQuick.innerHTML = products.join("")
							} else {
								formSeachQuick.innerHTML = '';
								if (formSeachQuick.className.includes('py-[20px]')) {
									formSeachQuick.classList.toggle('py-[20px]')
								}
							}

						}



					}
				})

		})
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
		let quantity = 1;
		if (add && sub) {
			add.addEventListener('click', () => {
				stock.value = parseInt(stock.value) + 1
				if (price) {
					const getPrice = price.getAttribute("priceTotal");
					if (getPrice) {
						let PRICE = parseInt(parseInt(getPrice) * parseInt(stock.value))
						price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
						price.innerHTML = parseInt(price.innerHTML);
						PRICE = PRICE.toLocaleString('en-EN')
						price.innerHTML = PRICE
					}
					const allPrice = document.querySelector('[all-price]')
					if (allPrice) {
						const getPriceTotalAll = allPrice.getAttribute("all-price");
						if (getPriceTotalAll) {
							const value = stock.getAttribute('value');
							if (value) {
								let PRICE = (parseInt(getPriceTotalAll) - (parseInt(value) * parseInt(getPrice))) + (parseInt(parseInt(getPrice) * parseInt(stock.value)))
								PRICE = PRICE.toLocaleString('en-EN')
								allPrice.innerHTML = PRICE


							}
						}
					}
				}
				localStorage.setItem('quantity', parseInt(stock.value))

			});
			sub.addEventListener('click', () => {
				if (parseInt(stock.value) != 1) {
					stock.value = parseInt(stock.value) - 1
					const getPrice = price.getAttribute("priceTotal");
					if (getPrice) {
						let PRICE = parseInt(parseInt(getPrice) * parseInt(stock.value))
						quantity = stock.value
						price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
						price.innerHTML = parseInt(price.innerHTML);
						PRICE = PRICE.toLocaleString('en-EN')
						price.innerHTML = PRICE
					}
					const allPrice = document.querySelector('[all-price]')
					if (allPrice) {
						const getPriceTotalAll = allPrice.getAttribute("all-price");
						if (getPriceTotalAll) {
							const value = stock.getAttribute('value');
							if (value) {
								let PRICE = (parseInt(getPriceTotalAll) - (parseInt(value) * parseInt(getPrice))) + (parseInt(parseInt(getPrice) * parseInt(stock.value)))
								PRICE = PRICE.toLocaleString('en-EN')
								allPrice.innerHTML = PRICE


							}
						}
					}
				}
				localStorage.setItem('quantity', parseInt(stock.value))

			});

			stock.addEventListener('change', () => {
				const getPrice = price.getAttribute("priceTotal");
				if (getPrice) {
					if (parseInt(stock.value) >= 1) {
						let PRICE = parseInt(parseInt(getPrice) * parseInt(stock.value))
						price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
						price.innerHTML = parseInt(price.innerHTML);
						PRICE = PRICE.toLocaleString('en-EN')
						price.innerHTML = PRICE
					} else {
						if (Math.abs(parseInt(stock.value)) == 0) {
							stock.value = '1'
						}
						if (isNaN) {
							stock.value = '1'
						}
						stock.value = Math.abs(parseInt(stock.value))
						let PRICE = parseInt(parseInt(getPrice) * Math.abs(parseInt(stock.value)))
						price.innerHTML = parseInt(getPrice) * parseInt(stock.value)
						price.innerHTML = parseInt(price.innerHTML);
						PRICE = PRICE.toLocaleString('en-EN')
						price.innerHTML = PRICE
					}
				}
				const allPrice = document.querySelector('[all-price]')
				if (allPrice) {
					const getPriceTotalAll = allPrice.getAttribute("all-price");
					if (getPriceTotalAll) {
						const value = stock.getAttribute('value');
						if (value) {
							let PRICE = (parseInt(getPriceTotalAll) - (parseInt(value) * parseInt(getPrice))) + (parseInt(parseInt(getPrice) * parseInt(stock.value)))
							PRICE = PRICE.toLocaleString('en-EN')
							allPrice.innerHTML = PRICE


						}
					}
				}
				localStorage.setItem('quantity', parseInt(stock.value))

			})

		}
		const addCart = cal.querySelector('[add-cart]');
		if (addCart) {
			addCart.addEventListener('click', () => {
				const link = addCart.getAttribute('add-cart');
				if (link) {
					const stock = document.querySelector('[stock]');
					const quantity = localStorage.getItem('quantity');
					if (quantity) {
						const data = {
							quanlity: parseInt(quantity)
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
										localStorage.setItem("icon-add-cart", true)
										window.location.reload()

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
	});
}


const addCart = document.querySelectorAll('[add-cart]');
if (addCart.length > 0) {
	addCart.forEach(cart => {
		cart.addEventListener('click', () => {
			const link = cart.getAttribute('add-cart');
			if (link) {
				const stock = document.querySelector('[stock]');
				const value = stock.innerHTML
				const quanlity = parseInt(stock.value);
				if (quanlity) {
					const data = {
						quanlity: parseInt(quanlity)
					}
					if (data) {
						// fetch(link, {
						// 		method: "POST",
						// 		headers: {
						// 			"Content-Type": "application/json",
						// 		},
						// 		body: JSON.stringify(data)
						// 	})
						// 	.then(res => res.json())
						// 	.then(dataItem => {
						// 		if (dataItem.code == 200) {
						// 			localStorage.setItem("icon-add-cart", true)
						// 			window.location.reload()

						// 		}
						// 		if (dataItem.code == 400) {
						// 			window.location.reload();
						// 		}
						// 	})
					}
				}


			}

		});
	});
}

const animation = document.querySelectorAll('[animation]');
if (animation.length > 0) {
	animation.forEach(it => {
		const div = it.querySelector('div');
		if (div) {
			const width = div.clientWidth;
			if (width) {
				div.classList.add(`group-hover:ml-[0px]`, `ml-[-${width}px]`)
			}
		}
	});
}

const saveCart = document.querySelector('[save-cart]');
if (saveCart) {
	saveCart.addEventListener('click', () => {
		const calculate = document.querySelectorAll('[calculate]');
		if (calculate.length > 0) {
			let array = []
			calculate.forEach(cal => {
				const input = cal.querySelector('input');
				if (input) {
					let quantity = parseInt(input.value);
					let id = input.getAttribute('stock')
					let dataSend = {
						id: id,
						quantity: quantity
					}
					array.push(dataSend)
				}
			});
			fetch('/order/cart-update', {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						array
					})
				})
				.then(res => res.json())
				.then(data => {
					if (data.code == 200) {
						location.reload();
					}
				})

		}
	});

}

const cartsChoose = document.querySelectorAll('[carts-choose]');
if (cartsChoose.length > 0) {
	cartsChoose.forEach(cart => {
		const chooseAtributes = cart.querySelector('[choose-attribute]')
		if (chooseAtributes) {
			const boxCart = cart.querySelector('[box-cart]');

			chooseAtributes.addEventListener("click", () => {
				boxCart.classList.toggle(`hidden`)
				setTimeout(() => {
					boxCart.classList.toggle(`opacity-0`)
					boxCart.classList.toggle(`mt-[-50px]`)

				}, 300);
			});

			const exit = cart.querySelector('[exit]')
			exit.addEventListener("click", () => {
				boxCart.classList.toggle(`opacity-0`)
				boxCart.classList.toggle(`mt-[-50px]`)
				setTimeout(() => {
					boxCart.classList.toggle(`hidden`)

				}, 300);
			});
		}
	});
}

// ALEART
const Success = document.querySelector('[update]');
if (Success) {
	const value = Success.getAttribute('update');
	const title = JSON.parse(value)[0]

	Swal.fire({
		position: "top-end",
		icon: "success",
		title: title,
		showConfirmButton: false,
		timer: 2000
	});
}

const error = document.querySelector('[error]');
if (error) {
	const value = error.getAttribute('error');
	if (value) {
		const title = JSON.parse(value)[0]

		Swal.fire({
			position: "top-end",
			icon: "error",
			title: title,
			showConfirmButton: false,
			timer: 3000
		});
	}

}

const noViewPermission = document.querySelector(`[no-view-permission]`);
if (noViewPermission) {
	Swal.fire({
		position: "top-center",
		icon: "error",
		title: "Bạn không xem được nội dung này!",
		showConfirmButton: false,
		timer: 1500
	});
	setTimeout(() => {
		history.back()
	}, 1500);
}
// ALEART

const buttonPayment = document.querySelector('[button-payment]');
if (buttonPayment) {
	buttonPayment.addEventListener('click', () => {
		const body = buttonPayment.closest('body');
		if (body) {
			const buttonFormPayment = body.querySelector(`button[type="submit"][button-submit-form]`);
			if (buttonFormPayment) {
				buttonFormPayment.click();
			}
		}
	});
}


const iconUser = document.querySelector('[icon-user]');
if (iconUser) {
	const boxLogin = document.querySelector('[box-login]');
	iconUser.addEventListener('click', () => {
		if (boxLogin) {
			boxLogin.classList.toggle('hidden');
			setTimeout(() => {
				boxLogin.classList.toggle('mt-[-30px]');
				boxLogin.classList.toggle('opacity-0');
			}, 200);

		}
	});
	const exit = boxLogin.querySelector('[exit]');
	if (exit) {
		if (boxLogin) {
			exit.addEventListener('click', () => {
				boxLogin.classList.toggle('mt-[-30px]');
				boxLogin.classList.toggle('opacity-0');
				setTimeout(() => {
					boxLogin.classList.toggle('hidden');
				}, 400);
			});
			boxLogin.addEventListener('click', (event) => {
				if (event.target.className.includes('fixed')) {
					exit.click();
				}
			});
		}

	}
	const buttonSubmitBoxLogin = boxLogin.querySelector('[button-submit-box-login]')
	if (buttonSubmitBoxLogin) {
		buttonSubmitBoxLogin.addEventListener('click', () => {
			grecaptcha.enterprise.ready(async () => {
				const token = await grecaptcha.enterprise.execute('6LdHk2kqAAAAAE89jQYnLGcsL5N86qiFvj1KBAy1', {
					action: 'submit'
				});

				const input = document.createElement('input');
				input.setAttribute('type', 'hidden');
				input.setAttribute('name', 'recaptchaToken');
				input.setAttribute('value', token);
				const form = boxLogin.querySelector('form');
				form.appendChild(input);
				console.log(boxLogin);

				const submit = boxLogin.querySelector(`button[type='submit']`)
				if (submit) {
					submit.click();
				}
			})
		})
	}
}

const listInput = document.querySelectorAll(`input[type="password"]`);
if (listInput.length > 0) {
	listInput.forEach(input => {
		const iconEye = input.nextElementSibling;
		if (iconEye) {
			const eye = iconEye.getAttribute('icon-eye');
			if (eye) {
				iconEye.addEventListener('click', () => {
					const value = input.getAttribute('type');
					if (value == 'text') {
						input.setAttribute("type", "password");
						iconEye.classList.replace("fa-eye", "fa-eye-slash")
					} else {
						input.setAttribute("type", "text");
						iconEye.classList.replace("fa-eye-slash", "fa-eye")
					}
				});
			}
		}
	});
}

const boxShowMenuProfile = document.querySelector('[box-show-menu-profile]');
if (boxShowMenuProfile) {
	const next = boxShowMenuProfile.nextElementSibling;
	if (next) {
		boxShowMenuProfile.addEventListener('click', () => {
			next.classList.toggle('hidden')
			next.classList.toggle('mt-[50px]')
			setTimeout(() => {
				next.classList.toggle('opacity-0')
			}, 200);
		});

	}
}

const boxMethodPayBank = document.querySelector('[box-method-pay-bank]')
if (boxMethodPayBank) {
	const buttonMethodPayBank = document.querySelector('[button-method-pay-bank]')
	if (buttonMethodPayBank) {
		const inputMethodPay = document.querySelector('[input-method-pay]');
		inputMethodPay.value = 'cash'
		buttonMethodPayBank.addEventListener('click', () => {
			buttonMethodPayBank.classList.toggle('border-chu')
			buttonMethodPayBank.classList.toggle('text-chu')

			const buttonpre = buttonMethodPayBank.previousElementSibling
			buttonpre.classList.toggle('border-chu')
			buttonpre.classList.toggle('text-chu')

			boxMethodPayBank.classList.toggle('mt-[-30px]')
			boxMethodPayBank.classList.toggle('hidden')
			setTimeout(() => {
				boxMethodPayBank.classList.toggle('opacity-0')
			}, 300);
			if (boxMethodPayBank.className.includes('opacity-0')) {
				inputMethodPay.value = "transfer"
			} else {
				inputMethodPay.value = "cash"
			}
		})
		const buttonpre = buttonMethodPayBank.previousElementSibling
		buttonpre.addEventListener('click', () => {
			buttonMethodPayBank.click()
		})
	}
}

const demGiayOtp = document.querySelector('[count-s-otp]');
if (demGiayOtp) {
	const div = demGiayOtp.querySelector('div');
	setInterval(() => {
		if (parseInt(div.innerHTML) != 0) {
			const value = parseInt(div.innerHTML) - 1;
			div.innerHTML = value
			if (parseInt(div.innerHTML) == 0) {
				history.back();
			}
		}
	}, 1000);

}

const listUrlLoginGmail = document.querySelectorAll('[url-login-gmail]');
if (listUrlLoginGmail.length > 0) {
	listUrlLoginGmail.forEach(it => {
		it.addEventListener('click', (event) => {
			event.preventDefault();
			const link = it.getAttribute('href');
			const origin = window.location.origin
			if (link) {
				fetch(link, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							URL_ORIGIN: origin
						})
					})
					.then(res => res.json())
					.then(data => {
						if (data.code == 200) {
							window.location.href = data.message
						}
					})
			}
		});

	});
}

const viewCarts = document.querySelector('[view-carts]');
if (viewCarts) {
	viewCarts.addEventListener('click', () => {
		const listCart = document.querySelector('[list-cart]');
		const chil = listCart.querySelector('div');
		if (listCart) {
			listCart.classList.toggle('hidden')
			setTimeout(() => {
				chil.classList.toggle('mr-[-80px]')
				chil.classList.toggle('opacity-0')

			}, 200);
			listCart.addEventListener('click', (event) => {
				if (event.target.className.includes('fixed')) {
					chil.classList.add('mr-[-80px]')
					chil.classList.add('opacity-0')
					setTimeout(() => {
						listCart.classList.add('hidden')

					}, 800);
				}
			});
		}
		const exit = listCart.querySelector('[exsit]');
		if (exit) {
			exit.addEventListener('click', () => {
				listCart.classList.toggle('hidden')
				setTimeout(() => {

				}, 100);
			});
		}
	});
}

window.addEventListener('load', () => {
	if (localStorage.getItem('icon-add-cart') == 'true') {
		const iconAddCart = document.querySelector('[view-carts]');
		if (iconAddCart) {
			iconAddCart.click();
			localStorage.removeItem('icon-add-cart')
		}
	}
})

const swipperProductDetail = document.querySelector('[swipper-product-detail]');
if (swipperProductDetail) {
	new Viewer(swipperProductDetail)
	var swiper = new Swiper(".mySwiper", {
		loop: true,
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesProgress: true,
		speed: 1000 // Thời gian chuyển động giữa các slide là 1000ms (1 giây)
	});
	var swiper2 = new Swiper(".mySwiper2", {
		loop: true,
		spaceBetween: 5,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: swiper,
		},
		speed: 1000, // Thời gian chuyển động giữa các slide là 1000ms (1 giây)
		slideToClickedSlide: true, // Cho phép chuyển đến slide được click từ thumbnail
	});
}



const autoSlick = document.querySelectorAll('[autoplay-slick]');
if (autoSlick.length > 0) {
	autoSlick.forEach(autoSlick => {
		if (autoSlick) {
			new Swiper(".mySwiper", {
				loop: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				},
				slidesPerView: 'auto',
				spaceBetween: 10,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
				},
				breakpoints: {
					"@0.00": {
						slidesPerView: 1,
						spaceBetween: 10,
					},
					"@0.75": {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					"@1.00": {
						slidesPerView: 3,
						spaceBetween: 40,
					},
					"@1.50": {
						slidesPerView: 4,
						spaceBetween: 50,
					},
				},
			});
		}
	})
}

const productNew = document.querySelector('[product-new]');
if (productNew) {
	const top = productNew.getBoundingClientRect().top + window.pageYOffset
	const button = document.querySelector('[button-section-1]');
	if (button) {
		button.addEventListener('click', () => {
			if (button) {
				window.scrollTo({
					top: top,
					behavior: 'smooth' // Cuộn mượt mà
				});

			}
		})
	}

}

const pagination = document.querySelector('[totalPage]');
if (pagination) {
	const listPage = pagination.querySelectorAll('[button-pagination]');
	const totalPage = parseInt(pagination.getAttribute('totalPage'))
	let url = new URL(window.location.href);
	const page = parseInt(url.searchParams.get('page'));
	if (listPage.length > 0) {
		listPage.forEach(page => {
			page.addEventListener('click', () => {
				const value = parseInt(page.getAttribute("button-pagination"));
				if (value == 1 || value > totalPage || value < 1) {
					url.searchParams.delete("page");
				} else {
					url.searchParams.set("page", value);
				}
				window.location.href = url.href
			})

		})
	}
	if (page) {
		const button = document.querySelector(`[button-pagination = '${page}']`)
		if (button) {
			button.classList.toggle('rounded-[50%]')
		}
	} else {
		const button = document.querySelector(`[button-pagination = '1']`)
		if (button) {
			button.classList.toggle('rounded-[50%]')
		}
	}
	const right = pagination.querySelector('[button-angle-right]');
	if (right) {
		right.addEventListener('click', () => {
			if (page) {
				if (page < totalPage)
					url.searchParams.set("page", page + 1);
			} else {
				url.searchParams.set("page", 2);
			}
			window.location.href = url.href
		})
	}
	const left = pagination.querySelector('[button-angle-left]');
	if (left) {
		left.addEventListener('click', () => {
			if (page) {
				if (page > 2) {
					url.searchParams.set("page", page - 1);
				} else if (page == 2) {
					url.searchParams.delete("page");
				}
				window.location.href = url.href
			}
		})
	}
	const lefts = pagination.querySelector('[button-angles-left]');
	if (lefts) {
		lefts.addEventListener('click', () => {
			if (page) {
				url.searchParams.delete("page");
				window.location.href = url.href
			}
		})
	}

	const rights = pagination.querySelector('[button-angles-right]');
	if (rights) {
		rights.addEventListener('click', () => {
			url.searchParams.set("page", totalPage);
			window.location.href = url.href
		})
	}
}

const sort = document.querySelector('[option-fillter]');
if (sort) {
	const url = new URL(window.location.href);
	sort.addEventListener('change', (event) => {
		const value = event.target.value;
		const sortKey = value.split('-')[0]
		const sortValue = value.split('-')[1]
		console.log(sortKey)
		console.log(sortValue)
		url.searchParams.set('sortKey', sortKey)
		url.searchParams.set('sortValue', sortValue)
		window.location.href = url.href
	})
	const sortKeyCurrent = url.searchParams.get('sortKey')
	const sortValueCurrent = url.searchParams.get('sortValue')
	if (sortKeyCurrent && sortValueCurrent) {
		console.log(sortKeyCurrent)
		console.log(sortValueCurrent)
		const option = sort.querySelector(`option[value='${sortKeyCurrent}-${sortValueCurrent}']`);
		if (option) {
			option.selected = true
		}
	}
}

const confirmCart = document.querySelector('[confirm-cart]');
if (confirmCart) {
	confirmCart.addEventListener('click', () => {
		const body = confirmCart.closest('body');
		const saveCart = body.querySelector('[save-cart]');
		localStorage.setItem("savecart", "ok")
		saveCart.click();
	})
	if (localStorage.getItem('savecart')) {
		const link = confirmCart.getAttribute("confirm-cart")
		if (link) {
			localStorage.removeItem('savecart')
			window.location.href = link

		}
	}
}



// console.log('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.log('%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Web hoặc có mục đích "hack" Web của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào Web của bạn.! \nWeb này được xây dựng bởi Trần Kim Quang', 'color: white; font-size: 20px; font-weight: ;');

// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');