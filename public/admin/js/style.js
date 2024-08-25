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
						await Swal.fire({
							position: "top-end",
							icon: "success",
							title: "Cập nhật thành công!",
							showConfirmButton: false,
							timer: 1500
						   });
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

const currentSidebarLi = window.location.pathname;
const sidebarLi = document.querySelectorAll(`li[sidebar-li]`);
if (sidebarLi.length > 0) {
	sidebarLi.forEach(item => {
		const taga = item.querySelector('a');
		const link = taga.getAttribute('href');
		if (currentSidebarLi == link) {
			item.style.color = 'white'
		}

	});
}

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
				console.log(link)
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
if(logOut){
	logOut.addEventListener('click', (event) => {
		event.preventDefault();
		fetch(`/admin/auth/logout`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(async (data) => {
				if(data.code == 200){
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

console.log('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cĐây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sao chép-dán nội dung nào đó vào đây để bật một tính năng của Web hoặc có mục đích "hack" Web của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào Web của bạn.! \nWeb này được xây dựng bởi Trần Kim Quang', 'color: white; font-size: 20px; font-weight: ;');

console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
console.warn('%cDừng lại! ', 'color: red; font-size: 50px; font-weight: bold;');
