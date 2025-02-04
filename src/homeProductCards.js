const productContainer = document.querySelector('#productContainer');
const productTemplate = document.querySelector('#productTemplate');

export const showProductContainer = (products) => {

    if (!products) {
        return false;
    }

    products.forEach( curProd => {
        
        const { id, name, category, brand, price, stock, description, image } = curProd;

        const productClone = document.importNode(productTemplate.content, true);

        productClone.querySelector(".productimg").src = image;
        productClone.querySelector(".productimg").alt = name;
        productClone.querySelector(".productname").textContent = name;
        productClone.querySelector(".category").textContent = category;
        // productClone.querySelector(".category").textContent = brand;
        productClone.querySelector(".productStock").textContent = stock;
        productClone.querySelector(".productDescription").textContent = description;
        productClone.querySelector(".currentPrice").textContent = `₹${price}`;
        productClone.querySelector(".actualPrice").textContent = `₹${price * 4}`;


        productContainer.append(productClone);
    });
}