// cypress/pageObjects/InventoryPage.js

class InventoryPage {
  // ---------- Locators ----------
  get pageTitle() {
    return cy.get('.title');
  }

  get inventoryList() {
    return cy.get('.inventory_list');
  }

  get inventoryItems() {
    return cy.get('.inventory_item');
  }

  get itemNames() {
    return cy.get('.inventory_item_name');
  }

  get itemPrices() {
    return cy.get('.inventory_item_price');
  }

  get addToCartButtons() {
    return cy.get('button[id^="add-to-cart"]');
  }

  get cartIcon() {
    return cy.get('.shopping_cart_link');
  }

  get cartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  get sortDropdown() {
    return cy.get('.product_sort_container');
  }

  get burgerMenuButton() {
    return cy.get('#react-burger-menu-btn');
  }

  get logoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  // ---------- Actions ----------
  openProductByName(name) {
    this.itemNames.contains(name).click();
    return this;
  }

  openProductByIndex(index) {
    this.itemNames.eq(index).click();
    return this;
  }

  addProductToCartByName(name) {
    cy.contains('.inventory_item', name).within(() => {
      cy.get('button[id^="add-to-cart"]').click();
    });
    return this;
  }

  sortBy(optionValue) {
    this.sortDropdown.select(optionValue);
    return this;
  }

  goToCart() {
    this.cartIcon.click();
    return this;
  }

  logout() {
    this.burgerMenuButton.click();
    this.logoutLink.should('be.visible').click();
    return this;
  }

  // ---------- Assertions ----------
  assertOnInventoryPage() {
    cy.url().should('include', '/inventory.html');
    this.pageTitle.should('be.visible').and('have.text', 'Products');
    return this;
  }

  assertProductCountGreaterThan(count) {
    this.inventoryItems.should('have.length.greaterThan', count);
    return this;
  }

  assertKeyUiComponentsVisible() {
    this.pageTitle.should('be.visible');
    this.inventoryList.should('be.visible');
    this.sortDropdown.should('be.visible');
    this.cartIcon.should('be.visible');
    this.burgerMenuButton.should('be.visible');
    return this;
  }
}

export default new InventoryPage();
