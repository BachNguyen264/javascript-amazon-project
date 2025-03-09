import { Product, Clothing, Appliances } from "../../data/products.js";

describe("Test suite: Product", () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });

  it("has the correct properties", () => {
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87,
    });
    expect(product.priceCents).toEqual(1090);
  });

  it("gets the star url", () => {
    expect(product.getStarUrl()).toEqual("images/ratings/rating-45.png");
  });

  it("gets the price", () => {
    expect(product.getPrice()).toEqual("$10.90");
  });

  it("does not display any extra info", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("Test suite: Clothing", () => {
  const obj = {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
    keywords: ["tshirts", "apparel", "mens"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  };
  let clothe;
  beforeEach(() => {
    clothe = new Clothing(obj);
  });

  it("Has sizeChartLink property", () => {
    expect(clothe.sizeChartLink).toEqual("images/clothing-size-chart.png");
  });

  it("gets the stars url", () => {
    expect(clothe.getStarUrl()).toEqual("images/ratings/rating-45.png");
  });

  it("gets the price", () => {
    expect(clothe.getPrice()).toEqual("$7.99");
  });

  it("display extra info", () => {
    expect(clothe.extraInfoHTML()).toContain(
      `<a href="images/clothing-size-chart.png" target="_blank">`
    );
    expect(clothe.extraInfoHTML()).toContain("Size chart");
  });
});

describe("Test suite: Appliance", () => {
  const obj = {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197,
    },
    priceCents: 1899,
    keywords: ["toaster", "kitchen", "appliances"],
    type: "appliances",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png",
  };
  let appliance;
  beforeEach(() => {
    appliance = new Appliances(obj);
  });

  it("Has additional property", () => {
    expect(appliance.instructionsLink).toEqual(
      "images/appliance-instructions.png"
    );
    expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");
  });

  it("gets the stars url", () => {
    expect(appliance.getStarUrl()).toEqual("images/ratings/rating-50.png");
  });

  it("gets the price", () => {
    expect(appliance.getPrice()).toEqual("$18.99");
  });

  it("display extra info", () => {
    expect(appliance.extraInfoHTML()).toContain(
      `<a href="images/appliance-instructions.png" target="_blank">`
    );
    expect(appliance.extraInfoHTML()).toContain("Warranty");
    expect(appliance.extraInfoHTML()).toContain("Instruction");
  });
});
