const doc = document;

let productTitle = doc.getElementsByTagName('h2');
let pageTitle = doc.getElementById('title');
let productPrice = doc.getElementById('productPrice');
let btnAddToCart = doc.getElementById('addToCart');
let glProductPrice;

productTitle[0].textContent = sessionStorage.getItem('glProductName');
pageTitle.textContent = sessionStorage.getItem('glProductName');

var XHR = new XMLHttpRequest();
XHR.open('GET', './scripts/json/products.json');
XHR.responseType = 'json';
XHR.send();
XHR.onload = function(){
	debugger
	let products = XHR.response.cakes;
	products.forEach(product => {
		if(sessionStorage.glProductName == product.name){
			glProductPrice = product.price;
			productPrice.textContent = product.price + '$';
			doc.getElementById('productImg').src = product.img;
			doc.getElementById('productInfo').textContent = product.info;
			doc.getElementById('productDescription').textContent = product.description;
		}
	});
};

btnAddToCart.onclick = function(){
	let count = 0;
	if(sessionStorage.selectedProducts != undefined){
		let objSelectedProducts = JSON.parse(sessionStorage.selectedProducts);
		for(let i = 0; i < objSelectedProducts.length; i++){
			if(objSelectedProducts[i].name == sessionStorage.glProductName){
				count--;
				break;
			}
		}
		if(count != -1){
			objSelectedProducts.push({name: sessionStorage.getItem('glProductName'), price: glProductPrice});
			sessionStorage.setItem('selectedProducts', JSON.stringify(objSelectedProducts));
		}
	}
	else{
		sessionStorage.setItem('selectedProducts', JSON.stringify([{name: sessionStorage.getItem('glProductName'), price: glProductPrice}]));
	}
}

