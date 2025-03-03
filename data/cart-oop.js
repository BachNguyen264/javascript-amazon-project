function Cart(localStorageKey){
    const cart = {
    cartItems: undefined,

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: "2",
        },
        ];
    },

    saveToStorage() {
        const prevCart = localStorage.getItem(localStorageKey);
        const newCart = JSON.stringify(this.cartItems);
        if (prevCart !== newCart) {
        localStorage.setItem(localStorageKey, newCart);
        }
    },

    addToCart(productId) {
        const selector = document.querySelector(
        `.js-quantity-selector-${productId}`
        );
        const quantity = Number(selector?.value ||1);
        let matchingItem = this.findMatchingItem(productId);
        if (matchingItem) {
        matchingItem.quantity += quantity;
        } else {
        this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: "1",
        });
        }
        this.saveToStorage();
    },

    findMatchingItem(productId) {
        return cart.cartItems.find((cartItem) => cartItem.productId === productId);
    },

    removeFromCart(productId) {
        //Cách 1: chỉnh sửa mảng gốc, không cần sửa const-> let
        // const index = cart.findIndex((cartItem) => cartItem.productId === productId);
        // if (index !== -1) {
        //   cart.splice(index, 1);
        // } else {
        //   alert("Product not found or already deleted");
        // }
        this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem.productId !== productId
        );
        this.saveToStorage();
    },

    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
        let matchingItem = this.findMatchingItem(productId);
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.findMatchingItem(productId);
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    },
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

