const doc = document;

let selectedProduct = doc.getElementsByClassName("product");

for (let i = 0; i < selectedProduct.length; i++) {
    selectedProduct[i].addEventListener("click", function() {
        window.sessionStorage.setItem('glProductName', selectedProduct[i].innerText);
    });
};


  