import products from "../api/products.json";
import { finalCartValue } from "./finalCartValue";
import { getCartProductFromsLs } from "./getCartProducts";
import { showToast } from "./showToast";
totalPrice();
let cartProducts = getCartProductFromsLs();

let filterProducts = products.filter((curProd) => {
    
    return cartProducts.some((curElem) => curElem.id === curProd.id);
    
});

console.log(filterProducts);

// showing cart products in cart page
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {

    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;

        const productClone = document.importNode(templateContainer.content, true);
        
        const lsActualData = fetchQuantityFromCartLs(id, price);

        productClone.querySelector('#cardValue').setAttribute("id", `card${id}`);
        productClone.querySelector('.first .category').textContent = category;
        productClone.querySelector('.first a .productName').textContent = name;
        productClone.querySelector('.first a .productImage').src = image;
        
        productClone.querySelector('.productPriceCart').textContent = `₹${lsActualData.price}`;
        productClone.querySelector('.last .stockElement .quantity').textContent = lsActualData.quantity;

        // updating price and quantity by increment and decrement button
        productClone.querySelector('.last .stockElement').addEventListener("click", (event) => {
            incrementDecrement(event, id, stock, price);
        });

        // remove cartProduct from addToCart
        productClone
        .querySelector(".last .remove-to-cart-btn")
        .addEventListener("click", () => removeProdFromCart(id)); 

        cartElement.appendChild(productClone);
    })
     
}
showCartProduct();

// gatting quantity and price from local storage
function fetchQuantityFromCartLs(id, price) {
    let cartProduct = getCartProductFromsLs();

    let existingProduct = cartProducts.find((curProd) => curProd.id === id);

    let quantity =  1;

    if (existingProduct) {
        quantity = existingProduct.quantity;
        price = existingProduct.price;
    }

    return {quantity, price};
}


// removing the products form cart page
function removeProdFromCart(id){
    let cartProducts = getCartProductFromsLs();
    cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    // update the local storage after removing the icon

    localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

    // to remove the div onclick

    let removeDiv = document.getElementById(`card${id}`);

    if(removeDiv) {
        removeDiv.remove();
        // show toast when product removed to cart
        showToast("delete",id);
    }

    finalCartValue(cartProducts);
    totalPrice();
}

// updating product quantity and price in LS and addToCart
function incrementDecrement(event, id, stock, price){
    const currentCardElement = document.querySelector(`#card${id}`);

    const productQuantity = currentCardElement.querySelector(".stockElement .quantity");
    const productPrice = currentCardElement.querySelector('.productPriceCart');

    let quantity = 1;
    let localStoragePrice = 0;

    // get the data from localstorage
    let cartProductsLs = getCartProductFromsLs();
    let existingProduct = cartProductsLs.find((curprod) => curprod.id === id);

    if(existingProduct){
        quantity = existingProduct.quantity;
        localStoragePrice = existingProduct.price;
    }
    else{
        localStoragePrice = price;
        price = price;
    }

    if (event.target.className === "cartInc") {
        if (quantity < stock) {
            quantity += 1;
        } else if (quantity === stock) {
            quantity = stock;

            localStoragePrice = price * stock;
        }
    }

    if (event.target.className === "cartDec") {
        if (quantity > 1) {
            quantity -= 1;
        }
    }

    // finally we will update the price in localstorage
    localStoragePrice = price * quantity;
    localStoragePrice = Number(localStoragePrice.toFixed(2));

    let updatedCart = { id, quantity, price: localStoragePrice};

    updatedCart = cartProductsLs.map((curProd) => {
        return curProd.id === id ? updatedCart : curProd 
    });

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

    // updating price and quantity on addCart html page
    productQuantity.innerText = quantity;
    productPrice.innerText = `₹${localStoragePrice}`;

    finalCartValue(updatedCart);
    totalPrice();
};



// Editing the selected price summary box
function totalPrice(){
    let subTotal = document.querySelector(".productSubTotal");
    let finalPrice = document.querySelector(".productFinalTotal");
    let getPrice = 0;

    // data taken from local storage
    let lsData =  getCartProductFromsLs();

    lsData.forEach((currentProd)=>{
         getPrice = getPrice + Number(currentProd.price);
    });

    subTotal.innerText = "₹" + getPrice;

    if (getPrice<=5000 && getPrice>0) {
        finalPrice.innerText ="₹" + Number(getPrice + 50 + 40);
    }
    else if (getPrice>5000) {
        finalPrice.innerText = "₹" + Number(getPrice+50);
    }
    else{
        finalPrice.innerText = "₹" + 0;
    }
   


}  
