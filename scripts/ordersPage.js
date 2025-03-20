import { orders } from "../data/orders.js"
import { formatDate } from "./utils/date.js";
import { formatCurrency } from "./utils/money.js";
import { loadProductsFetch, findMatchingProduct} from "../data/products.js"
import { renderCartQuantity } from "../data/cart.js";

function renderOrderContainer(){
  let containerHTML = "";

  orders.forEach((order)=>{
      containerHTML += `
          <div class="order-container">

            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${formatDate(order.orderTime)}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>

            <div class="order-details-grid js-order-details-${order.id}">
            </div>
          </div>
      `
  });
  document.querySelector('.js-orders-grid').innerHTML = containerHTML;
}

async function renderOrderDetail(){
  try {
    await loadProductsFetch();  
  } catch (error) {
    alert("Unexpected error while loading the products. Try again later.");  
  } 
  orders.forEach((order)=>{
    let productHTML = '';
    order.products.forEach((product)=>{
      const matchingProduct = findMatchingProduct(product.productId);
      productHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(product.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
    })
    document.querySelector(`.js-order-details-${order.id}`).innerHTML = productHTML;
  });
}

renderCartQuantity('js-cart-quantity');
renderOrderContainer();
renderOrderDetail();