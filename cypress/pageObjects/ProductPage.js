// cypress/pageObjects/ProductPage.js

class ProductPage {
  // ---------- Locators ----------
  get productName() {
    return cy.get('.inventory_details_name');
  }

  get productDescription() {
    return cy.get('.inventory_details_desc');
  }

  get productPrice() {
    return cy.get('.inventory_details_price');
  }

  get addToCartButton() {
    return cy.get('button[id^="add-to-cart"]');
  }

  get removeButton() {
    return cy.get('button[id^="remove"]');
  }

  get backToProductsButton() {
    return cy.get('#back-to-products');
  }

  // ---------- Actions ----------
  addToCart() {
    this.addToCartButton.click();
    return this;
  }

  backToProducts() {
    this.backToProductsButton.click();
    return this;
  }

  // ---------- Assertions ----------
  assertOnProductPage() {
    cy.url().should('include', '/inventory-item.html');
    this.productName.should('be.visible');
    this.productPrice.should('be.visible');
    return this;
  }

  assertProductNameEquals(expectedName) {
    this.productName.should('have.text', expectedName);
    return this;
  }

  assertProductPriceMatches(expectedPrice) {
    this.productPrice.should('have.text', expectedPrice);
    return this;
  }
}

export default new ProductPage();
