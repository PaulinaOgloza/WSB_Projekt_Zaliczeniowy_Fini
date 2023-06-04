const currentProducts = products;

const productsSection = document.querySelector('.products');

const renderProducts = (items) => {
	for (let i = 0; i < items.length; i++) {
		const newProduct = document.createElement('div');
		newProduct.className = 'product-item';
		newProduct.innerHTML = `<img src="${items[i].image}" alt="product-image">
    <p class="product-name">${items[i].name}</p>
    <p class="product-show">${items[i].show}</p>
    <p class="product-description">${items[i].description}</p>
    <p class="product-price"><span class="price">${items[i].price} $</span>
    <button type='submit' id="add-to-cart" class="product-add-to-basket-btn" onclick="scrollToSectionById('popup1')">Purchase</button></p>`;

		productsSection.appendChild(newProduct);
	}
};

window.onload = () => {
	renderProducts(currentProducts);
};

const btn = document.querySelector('#btn');
const radioButtons = document.querySelectorAll('input[name="payment"]');
const output = document.querySelector('#output');
const errorText = document.querySelector('.error-text');

btn.addEventListener('click', (e) => {
	e.preventDefault();

	let selectedPayment = false;
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			selectedPayment = true;
			break;
		}
	}

	if (selectedPayment) {
		output.innerText = 'Payment method selected.';
		errorText.style.display = 'none';
	} else {
		output.innerText = '';
		errorText.style.display = 'block';
	}
});

const popup1 = document.getElementById('popup1');

const scrollToTopBtns = document.querySelectorAll('.scroll-to-top-btn');

scrollToTopBtns.forEach((button) => {
	button.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});
});

const firstName = document.querySelector('#firstname');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup2 = document.querySelector('.popup-end');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');

	formBox.classList.add('error');
	errorMsg.textContent = msg;

	const paymentContainer = document.querySelector('.paymentContainer');
	const radioButtons = paymentContainer.querySelectorAll(
		'input[name="payment"]'
	);

	let isPaymentSelected = false;
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			isPaymentSelected = true;
			break;
		}
	}

	if (!isPaymentSelected) {
		const paymentErrorMsg = document.querySelector('.payment-error-text');
		paymentErrorMsg.textContent = 'Please select a payment method.';
		paymentErrorMsg.style.display = 'block';
	}
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
	const errorMsg = formBox.querySelector('.error-text');
	errorMsg.textContent = '';

	const paymentErrorMsg = document.querySelector('.payment-error-text');
	paymentErrorMsg.style.display = 'none';
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkName = (input, min) => {
	const name = input.value.trim();

	if (name.split(' ').length !== 2) {
		showError(input, 'Please enter your first and last name');
	} else {
		clearError(input);
		updateNameFormInput(name);
	}
};

const updateNameFormInput = (name) => {
	const nameFormInput = document.querySelector('#name-form-input');
	nameFormInput.textContent = name;
};

const pushMechaPicture = (productId) => {
	const mechaPopup = document.querySelector('#mecha-popup');
	const product = products.find((product) => product.id === productId);

	if (product) {
		const imageElement = document.createElement('img');
		imageElement.src = product.image;
		mechaPopup.innerHTML = ''; // Clear existing content
		mechaPopup.appendChild(imageElement);
	}
};

// Example usage
const productId = 2; // ID of the product you want to display
pushMechaPicture(productId);

const popupEnd = document.querySelector('#popup-end');

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([firstName]);
	checkName(firstName, 2);
	popupEnd.classList.toggle('show');
	updateNameFormInput(firstName.value.trim());
});

clearBtn.addEventListener('click', (e) => {
	e.preventDefault();

	[firstName].forEach((el) => {
		el.value = '';
		clearError(el);
	});
});

const closePopup = document.querySelector('.close');

closePopup.addEventListener('click', (e) => {
	e.preventDefault();

	popupEnd.classList.toggle('show');
});

// termin dostawy

const deliveryDateField = document.querySelector('#delivery-date');

const currentDate = new Date();

const deliveryDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);

const formattedDeliveryDate = deliveryDate.toISOString().split('T')[0];

deliveryDateField.value = formattedDeliveryDate;

// akcesoria

const accessoriesContainer = document.querySelector('#accessories');
const cartContainer = document.querySelector('#cart');
const cart = [];

function addToCart(productId) {
	const product = product.find((item) => item.id === productId);
	if (product) {
		cart.push(product);
		renderCart();
	}
}

function removeFromCart(productId) {
	const index = cart.findIndex((item) => item.id === productId);
	if (index !== -1) {
		cart.splice(index, 1);
		renderCart();
	}
}

function renderAccessories() {
	accessoriesContainer.innerHTML = '';

	products1.forEach((product) => {
		const item = document.createElement('div');
		item.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button id="add-to-cart" class="add-to-cart-button" onclick="addToCart(${product.id})">+</button>
      <button id="remove-from-cart" class="remove-from-cart-button" onclick="removeFromCart(${product.id})">-</button>
    `;
		accessoriesContainer.appendChild(item);
	});
}

function renderCart() {
	cartContainer.innerHTML = '';

	cart.forEach((product) => {
		const item = document.createElement('li');
		item.innerText = `${product.name} - $${product.price}`;
		cartContainer.appendChild(item);
	});
}

renderAccessories();

// back to shop button

function scrollToSectionById(sectionId) {
	const section = document.getElementById(sectionId);
	if (section) {
		section.scrollIntoView({ behavior: 'smooth' });
	}
}

const backToList = document.querySelector('.backtolist');
backToList.addEventListener('click', (e) => {
	e.preventDefault();
	scrollToSectionById('our-mechas');
});

// product to form

const goToForm = document.querySelector('#add-to-cart');
goToForm.addEventListener('click', (e) => {
	e.preventDefault();
	scrollToSectionById('popup1');
});

// our mechas button navigation

const navOurMechas = document.querySelector('.navbar-our-mechas');
navOurMechas.addEventListener('click', (e) => {
	e.preventDefault();
	scrollToSectionById('our-mechas');
});
