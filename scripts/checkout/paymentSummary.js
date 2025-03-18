import { cart, calculateCartQuantity } from "../../data/cart.js";
import { findMatchingProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { findDeliveryOptionById } from "../../data/deliveryOption.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  const cartQuantity = calculateCartQuantity();
  let cartTotalPrice = 0;
  let shipPrice = 0;
  cart.forEach((cartItem) => {
    const matchingProduct = findMatchingProduct(cartItem.productId);
    cartTotalPrice += matchingProduct.priceCents * cartItem.quantity;

    const matchingDelivery = findDeliveryOptionById(cartItem.deliveryOptionId);
    shipPrice += matchingDelivery.priceCents;
  });
  const priceBeforeTax = cartTotalPrice + shipPrice;
  const taxPrice = priceBeforeTax * 0.1;
  const totalPrice = priceBeforeTax + taxPrice;
  const html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              cartTotalPrice
            )}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shipPrice
            )}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              priceBeforeTax
            )}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxPrice
            )}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalPrice
            )}</div>
        </div>

        <button class="place-order-button button-primary
            js-place-order">
            Place your order
        </button>
    `;
  document.querySelector(".js-payment-summary").innerHTML = html;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });

        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('Unexpected error. Try again later.');
      }

      window.location.href = 'orders.html'; 
    });
}
