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

			});
			stock.value = parseInt(stock.value)
			sub.addEventListener('click', () => {
				if (parseInt(stock.value) != 1) {
					stock.value = parseInt(stock.value) - 1
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
			})
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
			const height = boxCart.clientHeight
			boxCart.classList.toggle(`mt-[-${height + 10}px]`)

			chooseAtributes.addEventListener("click", () => {
				boxCart.classList.toggle(`mt-[-${height + 10}px]`)
				boxCart.classList.add(`duration-1000`)
			});

			const exit = cart.querySelector('[exit]')
			exit.addEventListener("click", () => {
				boxCart.classList.toggle(`mt-[-${height + 10}px]`)
				boxCart.classList.add(`duration-1000`)
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
				// console.log(buttonFormPayment)
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
				if(event.target.className.includes('fixed')){
					exit.click();
				}
			});
		}

	}
}

const listInput = document.querySelectorAll(`input[type="password"]`);
if(listInput.length > 0){
	listInput.forEach(input => {
		const iconEye = input.nextElementSibling;
		if(iconEye){
			const eye = iconEye.getAttribute('icon-eye');
			if(eye){
				iconEye.addEventListener('click', () => {
					const value = input.getAttribute('type');
					if(value == 'text'){
						input.setAttribute("type", "password");
						iconEye.classList.replace("fa-eye", "fa-eye-slash")
					}
					else{
						input.setAttribute("type", "text");
						iconEye.classList.replace("fa-eye-slash", "fa-eye")
					}
				});
			}
		}
	});
}

const boxShowMenuProfile = document.querySelector('[box-show-menu-profile]');
if(boxShowMenuProfile){
	const next  =boxShowMenuProfile.nextElementSibling;
	if(next){
		boxShowMenuProfile.addEventListener('click', () => {
			next.classList.toggle('mt-[50px]')
			setTimeout(() => {
				next.classList.toggle('opacity-0')
			}, 200);
		});

	}
}

const boxMethodPayBank = document.querySelector('[box-method-pay-bank]')
if(boxMethodPayBank){
	const buttonMethodPayBank = document.querySelector('[button-method-pay-bank]')
	if(buttonMethodPayBank){
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
			if(boxMethodPayBank.className.includes('opacity-0')){
				inputMethodPay.value = "transfer"
			}
			else{
				inputMethodPay.value = "cash"
			}
			console.log(inputMethodPay.value)
		})
		const buttonpre = buttonMethodPayBank.previousElementSibling
		buttonpre.addEventListener('click', () => {
			buttonMethodPayBank.click()
		})
	}
}

const demGiayOtp = document.querySelector('[count-s-otp]');
if(demGiayOtp){
	const div = demGiayOtp.querySelector('div');
	setInterval(() => {
		if(parseInt(div.innerHTML) != 0){
		const value = parseInt(div.innerHTML) - 1;
		div.innerHTML = value
		if(parseInt(div.innerHTML) == 0){
			history.back();
		}
	}
	}, 1000);
	
}


// console.log('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.log('%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Web hoặc có mục đích "hack" Web của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào Web của bạn.! \nWeb này được xây dựng bởi Trần Kim Quang', 'color: white; font-size: 20px; font-weight: ;');

// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');