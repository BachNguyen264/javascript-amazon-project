import {cart, calculateCartQuantity} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOption.js";

export function renderPaymentSummary(){
    const cartQuantity= calculateCartQuantity();
    let cartTotalPrice=0;
    let shipPrice =0;
    cart.forEach((cartItem)=>{
        const matchingProduct = products.find(
            product => product.id === cartItem.productId
        );
        cartTotalPrice += (matchingProduct.priceCents)*(cartItem.quantity);

        const matchingDelivery = deliveryOptions.find(
            option => option.id === cartItem.deliveryOptionId
        );
        shipPrice += matchingDelivery.priceCents;
    });
    const priceBeforeTax = cartTotalPrice + shipPrice;
    const taxPrice = priceBeforeTax * 0.1;
    const totalPrice = priceBeforeTax + taxPrice;
    const html =
    `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(cartTotalPrice)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipPrice)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(priceBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxPrice)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = html;
}