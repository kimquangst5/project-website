// const prefixAdmin = require('../../../config/system')

// Fillter Status
const buttonStatus = document.querySelectorAll(`button[button-status]`);
if (buttonStatus.length > 0) {
	let url = new URL(window.location.href);
	buttonStatus.forEach(button => {
		button.addEventListener('click', () => {
			const status = button.getAttribute('button-status') || '';
			url.searchParams.delete('page')
			if (status) {
				url.searchParams.set('status', status)
			} else {
				url.searchParams.delete('status')
			}
			window.location.href = url.href;
		});
	});
	const statusCurrent = url.searchParams.get('status') || '';
	const buttonStatusCurrent = document.querySelector(`button[button-status = '${statusCurrent}']`);
	buttonStatusCurrent.classList.add('bg-[#FA6B04]', 'text-[white]')
}
// End Fillter Status

// Search
const formSearch = document.querySelector(`form[form-search]`);
if (formSearch) {
	let url = new URL(window.location.href)
	formSearch.addEventListener('submit', (event) => {
		event.preventDefault();
		const value = event.target.elements[0].value;
		if (value) {
			url.searchParams.set('key', value)
		} else {
			url.searchParams.delete('key')
		}
		window.location.href = url.href
	});
}
// End Search

// Pagination
const buttonPagination = document.querySelectorAll(`li[button-pagination]`);

if (buttonPagination.length > 0) {
	let url = new URL(window.location.href);
	buttonPagination.forEach(button => {
		button.addEventListener('click', () => {
			const value = button.getAttribute('button-pagination') || '';
			if (value) {
				url.searchParams.set('page', value);
			} else {
				url.searchParams.delete('page');
			}
			window.location.href = url.href;
		});
	});
	const valueCurrent = url.searchParams.get('page') || '1';
	const buttonPagiCurr = document.querySelector(`li[button-pagination = '${valueCurrent}' ]`);
	buttonPagiCurr.classList.add('bg-[#FA6B04]', 'text-[white]')
}

const pagination = document.querySelector(`ul[phanTrang]`);

if (pagination) {
	const value = pagination.getAttribute('phanTrang');
	const totalPage = pagination.getAttribute('totalPage');
	if (value == 0 || totalPage == 1) {
		pagination.style.display = 'none'
	}
}

const buttonAnglesLeft = document.querySelector(`li[button-angles-left]`);
if (buttonAnglesLeft) {
	let url = new URL(window.location.href);
	buttonAnglesLeft.addEventListener('click', () => {
		url.searchParams.delete('page')
		window.location.href = url.href
	});
}

const buttonAnglesRight = document.querySelector(`li[button-angles-right]`);
if (buttonAnglesRight) {
	let url = new URL(window.location.href);
	buttonAnglesRight.addEventListener('click', () => {
		const value = buttonAnglesRight.getAttribute('button-angles-right')
		url.searchParams.set('page', value)
		window.location.href = url.href
	});
}

const buttonAngleLeft = document.querySelector(`li[button-angle-left]`);
if (buttonAngleLeft) {
	let url = new URL(window.location.href);
	buttonAngleLeft.addEventListener('click', () => {
		const value = buttonAngleLeft.getAttribute('button-angle-left')
		url.searchParams.set('page', value - 1)
		window.location.href = url.href
	});
}

const buttonAngleRight = document.querySelector(`li[button-angle-right]`);
if (buttonAngleRight) {
	let url = new URL(window.location.href);
	buttonAngleRight.addEventListener('click', () => {
		const value = buttonAngleRight.getAttribute('button-angle-right')
		url.searchParams.set('page', parseInt(value) + 1)
		window.location.href = url.href
	});
}
// Hết Pagination

// Change Status
const buttonChangeStatus = document.querySelectorAll(`button[link]`);

if (buttonChangeStatus.length > 0) {
	buttonChangeStatus.forEach(button => {
		button.addEventListener('click', () => {
			let link = button.getAttribute('link');
			fetch(link, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(res => res.json())
				.then(async data => {
					if (data.code == 200) {
						window.location.reload();
					}
					if (data.code == 400) {
						window.location.reload();
					}
				})
		});


	});
}
// Hết Change Status

// Change Status Many Product
const checkAll = document.querySelector(`[name="checkAll"]`);
if (checkAll) {
	checkAll.addEventListener('click', () => {
		const checkItem = document.querySelectorAll(`input[name="checkItem"]`);
		if (checkItem.length > 0) {
			checkItem.forEach(item => {
				item.checked = checkAll.checked
			});
		}
	});
}

const checkItem = document.querySelectorAll(`input[name="checkItem"]`);
if (checkItem.length > 0) {
	checkItem.forEach(item => {
		item.addEventListener('click', () => {
			let itemChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);

			if (itemChecked.length == checkItem.length) {
				checkAll.checked = true
			} else {
				checkAll.checked = false
			}
		});
	});
}

const tickItem = document.querySelectorAll(`[tickItem]`);
if (tickItem.length > 0) {
	tickItem.forEach(item => {
		item.addEventListener('click', () => {
			const parent = item.parentElement;
			const input = parent.querySelector('input');
			input.checked = !input.checked
			let itemChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);
			if (itemChecked.length > 0) {
				if (itemChecked.length == checkItem.length) {
					checkAll.checked = true
				} else {
					checkAll.checked = false
				}

			}
			// input.checked = !input.checked
		});
	});
}
// Hết Change Status Many Product

// Box Actions
const boxActions = document.querySelector(`[box-actions]`);
if (boxActions) {
	const button = boxActions.querySelector('button');
	if (button) {
		button.addEventListener('click', () => {
			const select = boxActions.querySelector('select');
			const value = select.value;
			let itemChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);
			// let listNameImages = document.querySelectorAll(`[nameImageImg]`);

			let ids = [];
			let nameImages = [];
			if (value && itemChecked.length > 0) {
				itemChecked.forEach(input => {
					ids.push(input.value);
					const parent = input.parentElement;
					const cha = parent.parentElement;
					const image = cha.querySelector('img');
					const tenImage = image.getAttribute('nameImageImg');
					if (tenImage) {
						nameImages.push(tenImage);
					}

				});

				const data = {
					status: value,
					ids: ids,
					nameImages: nameImages
				};


				const link = boxActions.getAttribute('box-actions');
				fetch(link, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					})
					.then(res => res.json())
					.then(data => {
						if (data.code == 200) {
							window.location.reload();
						}

					})
			}
		});
	}
}
// Hết Box Actions

// Xóa bản ghi
const buttonDelete = document.querySelectorAll(`[button-delete]`);
if (buttonDelete.length > 0) {
	buttonDelete.forEach(button => {
		button.addEventListener('click', () => {
			const link = button.getAttribute('button-delete');
			if (link) {
				fetch(link, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
					})
					.then(res => res.json())
					.then(data => {
						if (data.code == 200) {
							window.location.reload();
						}
						if (data.code == 400) {
							window.location.reload();
						}
					})
			}

		});
	});
}
// Xóa bản ghi

// Khôi phục bản ghi
const buttonRestore = document.querySelectorAll(`button[restore]`);
if (buttonRestore.length > 0) {
	buttonRestore.forEach(button => {
		button.addEventListener('click', () => {
			const id = button.getAttribute('restore');
			fetch(`/admin/product/trash/${id}`, {
					method: 'PATCH',
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(res => res.json())
				.then(data => {
					if (data.code == 200) {
						window.location.reload();
					}
				})

		});
	});
}
// Hết Khôi phục bản ghi

// Xóa vĩnh viễn bản ghi
const permanentlyDelete = document.querySelectorAll(`button[permanently-delete]`);
if (permanentlyDelete.length > 0) {
	permanentlyDelete.forEach(button => {
		button.addEventListener('click', () => {
			const id = button.getAttribute('permanently-delete');
			const nameImage = button.getAttribute('nameImage');
			fetch(`/admin/product/trash/${id}/${nameImage}`, {
					method: 'DELETE',
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(res => res.json())
				.then(data => {
					if (data.code == 200) {
						window.location.reload();
					}
				})

		});
	});
}
// Hết Xóa vĩnh viễn bản ghi

// Thay đổi vị trí sản phẩm
const listPosition = document.querySelectorAll(`input[name="position"]`);

if (listPosition.length > 0) {
	listPosition.forEach(input => {
		input.addEventListener('change', () => {
			const link = input.getAttribute('link');
			const position = parseInt(input.value);

			const data = {
				position: position
			}

			fetch(link, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data)
				})
				.then(res => res.json())
				.then(data => {
					location.reload();
				})
		});
	});
}
// Hết Thay đổi vị trí sản phẩm

// Show Alert
const showAlert = document.querySelector(`[show-alert]`);
if (showAlert) {
	let time = showAlert.getAttribute('show-alert') || 1000;
	const times = parseInt(time)

	setTimeout(() => {
		showAlert.classList.add('hidden')
	}, times);
}
// Hết Show Alert

const upploadImage = document.querySelector(`[upload-image]`);

if (upploadImage) {
	const input = upploadImage.querySelector(`[upload-image-input]`);
	const images = upploadImage.querySelector(`img`);
	input.addEventListener('change', () => {
		const file = input.files[0];

		if (file) {
			images.src = URL.createObjectURL(file)
		}
	});
	images.addEventListener('click', () => {
		const link = images.src;
		window.open(link, '_blank');
	});
}

// SORT Sắp xếp
const sort = document.querySelector(`[sort]`);
if (sort) {
	const select = sort.querySelector('select');
	const button = sort.querySelector('button');
	if (select) {
		const url = new URL(window.location.href);
		select.addEventListener('change', () => {
			const [sortKey, sortValue] = select.value.split('-');
			if (sortKey && sortValue) {
				url.searchParams.set('sortKey', sortKey);
				url.searchParams.set('sortValue', sortValue);
			}
			window.location.href = url.href;
		});
		const sortKeyCurrent = url.searchParams.get('sortKey');
		const sortValueCurrent = url.searchParams.get('sortValue');
		const option = select.querySelector(`option[value='${sortKeyCurrent}-${sortValueCurrent}']`);
		if (option) {
			option.selected = true;
		}
		if (button) {
			button.addEventListener('click', () => {
				url.searchParams.delete('sortKey')
				url.searchParams.delete('sortValue');
				window.location.href = url.href;
			});
		}
	}
}
// HẾT SORT Sắp xếp

// Permission Phân quyền
const tablePermissions = document.querySelector(`table[table-permissions]`);
if (tablePermissions) {
	const checkAll = tablePermissions.querySelectorAll(`thead input[type="checkbox"]`);
	if (checkAll.length > 0) {
		checkAll.forEach((button, index) => {
			button.addEventListener('click', () => {
				const checkItem = tablePermissions.querySelectorAll(`tbody input[type="checkbox"]`);
				if (checkItem.length > 0) {
					let dem = index;
					checkItem.forEach((it, i) => {
						if (i == dem) {
							it.checked = button.checked;
							dem += checkAll.length;
						}
					});
				}
			});
		});
	}
	const checkItem = tablePermissions.querySelectorAll(`tbody input[type="checkbox"]`);
	if (checkItem.length > 0) {
		checkItem.forEach((button, i) => {
			button.addEventListener('click', () => {
				if (button.checked == false) checkAll[i % checkAll.length].checked = button.checked;
				else {
					let dem = i % checkAll.length;
					let total = 0;
					let cnt = 0;
					checkItem.forEach((it, ix) => {
						if (ix == dem) {
							dem += checkAll.length;
							total++;
							if (it.checked == true) cnt++
						}
					});
					if (total == cnt) checkAll[i % checkAll.length].checked = true;
					else checkAll[i % checkAll.length].checked = false;
				}
			});
		});
	}

	const buttonSubmit = document.querySelector(`header a[roles]`);
	if (buttonSubmit) {
		const roles = [];
		buttonSubmit.addEventListener('click', (event) => {
			event.preventDefault();
			const listId = tablePermissions.querySelectorAll(`[role-id]`);
			if (listId.length > 0) {
				listId.forEach(id => {
					const value = id.getAttribute('role-id');
					const inputElement = tablePermissions.querySelectorAll(`[data-id]:checked`);
					if (inputElement.length > 0) {
						let permission = [];
						inputElement.forEach(input => {
							const dataId = input.getAttribute('data-id');
							if (value == dataId) {
								const parent = input.parentElement.parentElement;
								const dataName = parent.getAttribute('data-name');
								permission.push(dataName);
							}
						});
						const role = {
							id: value,
							permission: permission
						}
						roles.push(role);
					}
				});
				const link = tablePermissions.getAttribute('table-permissions');
				fetch(link, {
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(roles)
					})
					.then(res => res.json())
					.then(data => {
						if (data.code == 200) {
							Swal.fire({
								title: "Cập nhật thành công!",
								text: data.message,
								icon: "success",
								showConfirmButton: false,
								timer: 1500
							});
						}
					})
			}
		});
	}

}


// BUTTON LOGIN ADMIN
const loginAdmin = document.querySelector(`[login-admin]`);
if (loginAdmin) {
	loginAdmin.addEventListener('submit', (event) => {
		event.preventDefault();
	});
	const button = loginAdmin.querySelector('button');
	if (button) {
		button.addEventListener('click', () => {
			const inputusename = loginAdmin.querySelector(`input[type="text"]`);
			const inputpassword = loginAdmin.querySelector(`input[type="password"]`);
			const usename = inputusename.value
			const password = inputpassword.value
			const dataLogin = {
				usename: usename,
				password: password
			}
			fetch('/admin/auth/login', {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(dataLogin),
				})
				.then(res => res.json())
				.then(async (data) => {
					if (data.code == 200) {
						await Swal.fire({
							position: "top-end",
							icon: "success",
							title: "Đăng nhập thành công!",
							showConfirmButton: false,
							timer: 1500
						});
						location.href = "/admin/dashboard"
						await Swal.fire({
							position: "top-center",
							icon: "success",
							title: "Hello Kim Quang",
							showConfirmButton: false,
							timer: 5000
						});

					}
					if (data.code == 400) {
						await Swal.fire({
							position: "top-end",
							icon: "error",
							title: "Đăng nhập thất bại!",
							showConfirmButton: false,
							timer: 1500
						});
						location.href = "/admin"
					}
				})
		});

	}
}

// ĐĂNG XUẤT
const logOut = document.querySelector(`[log-out]`);
if (logOut) {
	logOut.addEventListener('click', () => {
		fetch(`/admin/auth/logout`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(res => res.json())
			.then(async (data) => {
				if (data.code == 200) {
					await Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Đăng xuất thành công!",
						showConfirmButton: false,
						timer: 1500
					});
					window.location.href = data.message
				}
			})
	});
}

// HEADER
const main = document.querySelector('main');
const header = document.querySelector('header');
let last = 0;
main.addEventListener('scroll', (event) => {
	let scrollTop = main.scrollTop;
	if (scrollTop > last) {
		header.style.top = `-50px`;
	} else header.style.top = `0px`;
	last = scrollTop;
});
// HẾT HEADER

// buttonSubmitEditProduct
const buttonSubmitEdit = document.querySelector(`[buttonSubmitEditProduct]`);
if (buttonSubmitEdit) {
	buttonSubmitEdit.addEventListener('click', (async) => {
		const form = document.querySelector('form[formsSubmitEditProduct]');
		if (form) {
			const button2 = form.querySelector('button[type="submit"]');
			if (button2) {
				button2.click();

			}
		}

	});
}

// buttonSubmitCreateProduct
const buttonSubmitCreate = document.querySelector(`[buttonSubmitCreateProduct]`);
if (buttonSubmitCreate) {
	buttonSubmitCreate.addEventListener('click', () => {
		const form = document.querySelector('form[formsSubmitCreateProduct]');
		if (form) {
			const button2 = form.querySelector('button[type="submit"]');
			if (button2) {
				button2.click();
			}
		}
	});
}

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
	const title = JSON.parse(value)[0]

	Swal.fire({
		position: "top-end",
		icon: "error",
		title: title,
		showConfirmButton: false,
		timer: 3000
	});
}

const buttonUpdateCategory = document.querySelector('[buttonUpdateCategory]');
if (buttonUpdateCategory) {
	const form = document.querySelector('[formUpdateCategory]')
	if (form) {
		const button = form.querySelector(`button[type="submit"]`);
		if (button) {
			buttonUpdateCategory.addEventListener('click', () => {
				button.click();
			});
		}
	}
}

const noViewPermission = document.querySelector(`[no-view-permission]`);
if (noViewPermission) {
	Swal.fire({
		position: "top-center",
		icon: "error",
		title: "Bạn không xem được nội dung này",
		showConfirmButton: true,
		// timer: 1500
	});
}

// XỬ LÍ ẢNH LỖI
const imgs = document.querySelectorAll('img');
const emptyImgs = Array.from(imgs).filter(img => {
	return !img.src || img.src === window.location.href || img.src.endsWith('placeholder.jpg');
});
emptyImgs.forEach(img => {
	img.src = '/admin/images/photo.png';
	img.alt = 'Ảnh lỗi';
});
// HẾT LÍ ẢNH LỖI

// buttonRoleCreate
const buttonRoleCreate = document.querySelector(`[button-role-create]`);
if (buttonRoleCreate) {
	buttonRoleCreate.addEventListener('click', () => {
		const form = document.querySelector(`[form-role-create]`);
		if (form) {
			const button = form.querySelector(`button[type='submit']`);
			if (button) {
				button.click();

			}
		}
	});

}

// category-product-trash
const showBox = document.querySelectorAll('[show-box]');
// console.log(showBox.length)
if (showBox.length > 0) {
	showBox.forEach(box => {
		box.addEventListener("click", () => {
			const cha = box.parentElement;
			const contentBox = cha.querySelector('[content-box]');
			if (contentBox) {
				if (contentBox.className.includes('h')) {
					contentBox.classList.remove("h-0", "hidden")
					const icon = box.querySelector('i');
					if (icon) {
						icon.classList.remove("rotate-90")
					}
				} else {
					contentBox.classList.add('h-0', "hidden")
					const icon = box.querySelector('i');
					if (icon) {
						icon.classList.add("rotate-90")
					}
				}
			}
		});
	});
}



// SIDEBAR
const findParentLi = (element) => {
	let currentElement = element.parentElement;
	while (currentElement) {
		if (currentElement.tagName.toLowerCase() === 'li') {
			return currentElement;
		}
		currentElement = currentElement.parentElement;
	}
	return null; // Trả về null nếu không tìm thấy li cha
};

const Aside = document.querySelector('aside');
const path = window.location.pathname;
if (Aside) {
	// const xuLi = (tagCurrent) => {
	const ul = document.querySelector('ul');
	if (ul) {
		const div = ul.querySelectorAll('div');
		if (div.length > 0) {
			div.forEach(async div => {
				const li = div.querySelector('li');
				if (li) {
					const link = li.getAttribute('link');
					if (link) {
						li.addEventListener('click', () => {
							window.location.href = link
						});
						if (path == link) {
							li.style.color = "white"
							const iCha = li.parentElement.querySelector('i');
							if (iCha) {
								iCha.style.color = "white"
							} else {
								// findParentLi(li);
								const litag = findParentLi(li).parentElement.querySelector('li');
								const allLi = findParentLi(li).parentElement
								
								if (allLi) {
									const divParent = li.parentElement.parentElement.parentElement.parentElement;
									divParent.classList.toggle("hover:bg-[#5A5866]")
									if (divParent) {
										const muiTenCurrent = divParent.querySelector("[mui-ten]");
										if (muiTenCurrent) {
											muiTenCurrent.classList.toggle("rotate-90")
										}
									}
									allLi.style.color = "white"
									const ul = allLi.querySelector('ul');
									if (ul) {
										ul.classList.add("text-[white]/70")
									}
								}
							}
						}
						const divCha = li.parentElement;
						if (divCha) {
							divCha.classList.add("hover:text-[white]", "hover:bg-[#5A5866]")
						}
					} else {
						const div = li.parentElement;
						div.classList.add("hover:text-[white]");

						const ulCon = div.querySelector('ul');
						if (ulCon) {
							const listDiv = ulCon.querySelectorAll('div');
							if (listDiv.length > 0) {
								ulCon.classList.add("truncate");
								listDiv.forEach(it => {
									const h = it.clientHeight;
									it.classList.add(`mt-[-${h}px]`)
									it.classList.add("duration-1000")

								});
								setTimeout(() => {
									const pathname = window.location.pathname;
									listDiv.forEach(it => {
										const url = it.querySelector(`[link]`);
										if (url) {
											const link = url.getAttribute("link");
											if (link) {
												if (link == pathname) {
													let ulCHA = it.parentNode;
													const divLIST = ulCHA.querySelectorAll('div');
													if (divLIST.length > 0) {
														divLIST.forEach(div => {
															const h = div.clientHeight;
															div.classList.toggle(`mt-[-${h}px]`)
															it.classList.add("duration-1000")
														});
													}
												}
											}
										}
									});
								}, 1500);
							}
						}

						div.addEventListener("click", () => {
							div.classList.toggle("hover:bg-[#5A5866]")

							const ulParent = div.querySelector('[mui-ten]');
							if (ulParent) {
								ulParent.classList.toggle("rotate-90")
							}
							const ul = div.querySelector('ul');
							const h = ul.clientHeight
							if (ul) {
								const listDiv = ul.querySelectorAll('div');
								if (listDiv.length > 0) {
									ul.classList.add("truncate");
									listDiv.forEach(it => {
										const h = it.clientHeight;
										it.classList.toggle(`mt-[-${h}px]`)
										it.classList.add("duration-1000")
									});
								}
							}
						});
						const ul = div.querySelector('ul');
						if (ul) {
							ul.classList.add("text-[white]/70")
							const itdiv = ul.querySelectorAll('div');
							if (itdiv.length > 0) {
								itdiv.forEach(it => {
									it.classList.add("hover:text-[white]", "hover:bg-[#5A5866]")
								});
							}
						}
					}
				}
			});
		}
	}

	const muiTenLogo = Aside.querySelector('[mui-ten-logo]');
	if (muiTenLogo) {
		muiTenLogo.addEventListener('click', () => {
			const allLi = Aside.querySelectorAll('li');
			if (allLi.length > 0) {
				allLi.forEach(it => {
					it.classList.toggle("hidden")
				});
			}
			const allMuiTen = Aside.querySelectorAll('[mui-ten]');
			if (allMuiTen.length > 0) {
				allMuiTen.forEach(it => {
					it.classList.toggle("hidden")
				});
			}
			const allIcon = Aside.querySelectorAll('i');
			if (allIcon.length > 0) {
				allIcon.forEach(it => {
					// it.classList.toggle("text-[25px]", "w-full")
					it.classList.toggle("pl-[20px]")
					it.classList.toggle("w-full")
					it.classList.toggle("text-[17px]")
				});
			}
			const logo = Aside.querySelector('a');
			if (logo) {
				logo.classList.toggle("hidden")
			}
			Aside.classList.toggle("w-[80px]")
			muiTenLogo.classList.toggle("rotate-180")
		});
	}
}
// HẾT SIDEBAR






// console.log('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.log('%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Web hoặc có mục đích "hack" Web của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào Web của bạn.! \nWeb này được xây dựng bởi Trần Kim Quang', 'color: white; font-size: 20px; font-weight: ;');

// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
// console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');