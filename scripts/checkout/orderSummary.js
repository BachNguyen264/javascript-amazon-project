import {
    cart,
    removeFromCart,
    updateQuantity,
    updateDeliveryOption
} from "../../data/cart.js";
import { products, findMatchingProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {deliveryOptions, calculateDeliveryDate, findDeliveryOptionById} from '../../data/deliveryOption.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { updateCheckoutHeader } from "./checkOutHeader.js";
  
export function renderOrderSummary() {
    let cartHtml = "";
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const matchingProduct = findMatchingProduct(productId);
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption =  findDeliveryOptionById(deliveryOptionId); 

      const dateString = calculateDeliveryDate(deliveryOption);
  
      cartHtml += `
          <div class="cart-item-container
            js-cart-item-container
            js-cart-item-container-${productId}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
  
                <div class="cart-item-details">
                  <div class="product-name js-product-name-${productId}">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity js-product-quantity-${productId}">
                    <span>
                      Quantity: <span class="quantity-label">${
                        cartItem.quantity
                      }</span>
                    </span>
                    <span 
                      class="update-quantity-link link-primary js-update-btn"
                      data-product-id = ${productId}
                    >
                      Update
                    </span>
                    <input 
                      type="number" 
                      class="quantity-input js-quantity-input-${productId}" 
                      value=${cartItem.quantity}
                    >
                    <span 
                      class="save-quantity-link link-primary js-save-btn"
                      data-product-id = ${productId}
                    >
                      Save
                    </span>
                    <span 
                      class="delete-quantity-link link-primary js-delete-btn js-delete-link-${productId}"
                      data-product-id = ${productId}
                    >
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(productId, cartItem)}
                </div>
              </div>
            </div>
      `;
    });
  
    document.querySelector(".js-order-summary").innerHTML = cartHtml;
    addDeleteEvent();
    addUpdateEvent();
    addSaveEvent();
    addChangeDeliveryEvent();
    addInputValidation();
  }
  
  function deliveryOptionsHTML(productId,cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 ?
      'FREE'
      :`$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html +=
      `
        <div class="delivery-option js-delivery-option"
          data-product-id= "${productId}"
          data-delivery-option-id = "${deliveryOption.id}"
        >
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }
  
  function addDeleteEvent() {
    document.querySelectorAll(".js-delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const { productId } = button.dataset;
        removeFromCart(productId);
        renderOrderSummary();
        renderPaymentSummary();
        updateCheckoutHeader();
      });
    });
  }
  
  function addUpdateEvent() {
    document.querySelectorAll(".js-update-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const { productId } = button.dataset;
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add("is-editing-quantity");
      });
    });
  }
  
  function addSaveEvent() {
    document.querySelectorAll(".js-save-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const { productId } = button.dataset;
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove("is-editing-quantity");
        const newQuantity = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value
        );
        document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent = newQuantity;
        updateQuantity(productId, newQuantity);
        updateCheckoutHeader();
        renderPaymentSummary();
      });
    });
  }
  
  function addInputValidation() {
    const inputs = document.querySelectorAll(".quantity-input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = Math.max(1, Math.min(1000, input.value));
      });
      input.addEventListener("keydown", (event) => {
        const key = event.key;
        if(key === 'Enter'){
          const productId = input.closest(".cart-item-container").querySelector(".js-save-btn").dataset.productId;
          updateQuantity(productId, Number(input.value));
          renderOrderSummary();
        }
      })
    });
  }
  
  function addChangeDeliveryEvent(){
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
  }
  
  