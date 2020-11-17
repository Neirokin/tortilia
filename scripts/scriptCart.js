const doc = document;

//------список товаров------
let cartContainer = doc.getElementById('cartContainer');
let selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts'));
let cartTitle = doc.getElementById('cartTitle');
var XHR = new XMLHttpRequest();
XHR.open('GET', './scripts/json/products.json');
XHR.responseType = 'json';
XHR.send();
XHR.onload = function(){
	let products = XHR.response.cakes;
	for(let i = 0; i < selectedProducts.length; i++){
		products.forEach(product => {
			if(selectedProducts[i].name == product.name){
				let newRow = `<div class="row cart-row py-2 pr-2 shadow-sm">
								<div class="col-1">
						<img src="${product.img}" class="img-fluid">
					</div>
					<div class="col cart-product-name">
					<p id="productInCartName">
							${selectedProducts[i].name}
						</p>
						</div>
					<div class="col-1 text-right">
						<p id='productInCartPrice' class="mt-2 mb-0">${selectedProducts[i].price}$</p>
					</div>
					<div class="col-2 text-right cart-plus-minus">
					<button class="btn turtle-btn shadow-sm" onclick="Plus(this.nextElementSibling)"><i class="fas fa-plus"></i></button>
						<span id="productCount">1</span>
					<button class="btn turtle-btn shadow-sm" onclick="Minus(this.previousElementSibling)"><i class="fas fa-minus"></i></button>
					</div>
					<div class="col-2 cart-row-buy-remove text-center shadow-sm">
					<button class="btn turtle-btn stretched-link" data-toggle="modal" data-target="#modalWindow">Купить</button>
					</div>
					<div class="col-2 cart-row-buy-remove text-center shadow-sm">
						<button class="btn turtle-btn stretched-link"onclick="Delete(this)">Удалить</button>
					</div>
				</div>`;
				cartContainer.insertAdjacentHTML('beforeend', newRow);
			}
		});
	}
}

//-------количество товара---------
function Plus(product){
	let productCount = product.innerText;
	productCount++;
	product.innerText = productCount;
}

function Minus(product){
	let productCount = product.innerText;
	if (productCount != 1){
		productCount--;
		product.innerText = productCount;
	}
}

//------удаление товара------
function Delete(deleteButton){
	let thisProductName = deleteButton.parentElement.parentElement.children[1].innerText;
	let objSelectedProducts = JSON.parse(sessionStorage.selectedProducts);

	for(let i = 0; i < objSelectedProducts.length; i++){
		if(thisProductName == objSelectedProducts[i].name){
			objSelectedProducts.splice(i, 1);
		}
	}

	sessionStorage.setItem('selectedProducts', JSON.stringify(objSelectedProducts));

	let productRow = deleteButton.parentElement.parentElement;
	productRow.remove();
}
