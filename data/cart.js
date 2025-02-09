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
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;   
        }
    });
    if(matchingItem){
        matchingItem.quantity += quantity;    
    }else{
        cart.push({
            productId,
            quantity
        });
    }
    saveToStorage('cart',cart);
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
    saveToStorage('cart',cart);
}

function saveToStorage(key,saveItem){
    localStorage.setItem(key,JSON.stringify(saveItem));
}