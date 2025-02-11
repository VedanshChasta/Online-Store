const cartValue = document.querySelector("#cartValue");

export const finalCartValue = (cartProducts) =>{
    let totalCartValue = 0; 
    cartProducts.forEach(element => {
        totalCartValue += element.quantity;
    });
    return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"> ${totalCartValue} </i>`)
    
};