import { finalCartValue} from "./finalCartValue";
import { getCartProductFromsLs } from "./getCartProducts";
import { showToast } from "./showToast";

getCartProductFromsLs();

export const addToCart = (event, id, stock) => {

    let arrLocalStorageProduct = getCartProductFromsLs();

    const currentProdElem = document.querySelector(`#card${id}`);
    let quantity = currentProdElem.querySelector(".quantity").innerText;
    let price  = currentProdElem.querySelector(".currentPrice").innerText;

    price = price.replace("₹", "");

    // Updating Products value in local storage

    let existingprod = arrLocalStorageProduct.find(
        (curProd) => curProd.id === id
    );

    if (existingprod) {
        quantity = existingprod.quantity + Number(quantity);
        price = Number(price * quantity);
        let updateCart = {id, quantity, price};

        updateCart = arrLocalStorageProduct.map((curProd) => {
            return curProd.id === id ? updateCart : curProd;
        });

        localStorage.setItem("cartProductLS",JSON.stringify(updateCart));
        
        arrLocalStorageProduct = getCartProductFromsLs();

        // show toast when product ADD to cart
        showToast("add", id);
    }

    if (existingprod) {
        // alert("You have already selected this product hence we updated quantity and price");
        return false;
    }


 
    price = Number(price * quantity);
    quantity = Number(quantity);

    let updateCart = {id, quantity, price};
    arrLocalStorageProduct.push(updateCart);
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    //update the cart button value

    finalCartValue(arrLocalStorageProduct);

     // show toast when product ADD to cart
    showToast("add", id);
};   