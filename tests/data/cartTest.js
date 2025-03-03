import {
  addToCart,
  cart,
  loadFromStorage,
  removeFromCart,
} from "../../data/cart.js";

const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    document.querySelector(".js-test-container").innerHTML = `
      <input type="number" value="1" class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
    `;
    spyOn(localStorage, "setItem");
  });

  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage();

    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
    document.querySelector(".js-test-container").innerHTML = "";
  });
});

describe("test suite: removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
  });

  it("remove a productId in the cart", () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify([
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ])
    );
  });

  it("remove a productId not in the cart", () => {
    removeFromCart("abc-xyz-aloha-123");
    expect(cart.length).toEqual(2);
    expect(localStorage.getItem).toHaveBeenCalledTimes(2);  
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
