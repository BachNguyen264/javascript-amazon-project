import { findMatchingOrder } from "../data/orders.js";
import { loadProductsFetch,findMatchingProduct } from "../data/products.js";
import { formatDateDay } from "./utils/date.js";
import { renderCartQuantity } from "../data/cart.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

const matchingOrder = findMatchingOrder(orderId);
async function renderTracking(){
    try {
        await loadProductsFetch();  
      } catch (error) {
        alert("Unexpected error while loading the products. Try again later.");  
    }
    let trackHTML = '';
    matchingOrder.products.forEach((product)=>{
        const matchingProduct = findMatchingProduct(productId);
        if(product.productId === productId){
            trackHTML = `
                <a class="back-to-orders-link link-primary" href="orders.html">
                    View all orders
                </a>
        
                <div class="delivery-date">
                    Arriving on ${formatDateDay(product.estimatedDeliveryTime)}
                </div>
        
                <div class="product-info">
                    ${matchingProduct.name}
                </div>
        
                <div class="product-info">
                    Quantity: ${product.quantity}
                </div>
        
                <img class="product-image" src="${matchingProduct.image}">
        
                <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
                </div>
        
                <div class="progress-bar-container">
                <div class="progress-bar"></div>
                </div>
            `    
        }
    });
    document.querySelector('.js-order-tracking').innerHTML = trackHTML;
}

renderCartQuantity('js-cart-quantity');
renderTracking();