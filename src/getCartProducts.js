import { finalCartValue } from "./finalCartValue";

export const getCartProductFromsLs = () => {

    let cartProducts = localStorage.getItem("cartProductLS");
    if(!cartProducts){
        return [];
    }

    cartProducts = JSON.parse(cartProducts);

    finalCartValue(cartProducts);

    return cartProducts;
}