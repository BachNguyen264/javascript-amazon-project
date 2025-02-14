export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(productId){
    const selector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selector.value);
    let matchingItem = findMatchingItem(productId);
    if(matchingItem){
        matchingItem.quantity += quantity;    
    }else{
        cart.push({
            productId,
            quantity
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    //Cách 1: chỉnh sửa mảng gốc, không cần sửa const-> let
    // const index = cart.findIndex((cartItem) => cartItem.productId === productId);
    // if (index !== -1) {
    //   cart.splice(index, 1);
    // } else {
    //   alert("Product not found or already deleted");
    // }
    cart = cart.filter(cartItem => cartItem.productId !== productId);
    saveToStorage();
}

function saveToStorage(){
    const prevCart = localStorage.getItem('cart');
    const newCart = JSON.stringify(cart);
    if (prevCart !== newCart) {
        localStorage.setItem('cart', newCart);
    }
}

export function calculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId,newQuantity){
    let matchingItem = findMatchingItem(productId);
    matchingItem.quantity = newQuantity; 
    saveToStorage();
}

function findMatchingItem(productId){
    return cart.find(cartItem => cartItem.productId === productId);
}