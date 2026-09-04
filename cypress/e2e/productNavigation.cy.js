import InventoryPage from '../pageObjects/InventoryPage';
import ProductPage from '../pageObjects/ProductPage';

describe('SauceDemo - Product Navigation', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
  });

  it('should list products with visible names and prices', () => {
    InventoryPage.itemNames.should('have.length.greaterThan', 0);
    InventoryPage.itemNames.each(($el) => {
      expect($el.text().trim()).to.not.be.empty;
    });
    InventoryPage.itemPrices.each(($el) => {
      expect($el.text().trim()).to.match(/^\$\d+\.\d{2}$/);
    });
  });

  it('should navigate to a product detail page and preserve name and price', () => {
    const productName = 'Sauce Labs Backpack';

    InventoryPage.itemNames
      .contains(productName)
      .parents('.inventory_item')
      .find('.inventory_item_price')
      .invoke('text')
      .then((listedPrice) => {
        InventoryPage.openProductByName(productName);

        ProductPage.assertOnProductPage();
        ProductPage.assertProductNameEquals(productName);
        ProductPage.assertProductPriceMatches(listedPrice);
      });
  });

  it('should allow navigating back to the product list from a product page', () => {
    InventoryPage.openProductByIndex(0);
    ProductPage.assertOnProductPage();
    ProductPage.backToProducts();
    InventoryPage.assertOnInventoryPage();
  });

  it('should add a product to the cart from the product detail page', () => {
    InventoryPage.openProductByIndex(0);
    ProductPage.addToCart();
    ProductPage.removeButton.should('be.visible');
    cy.assertCartCount(1);
  });

  it('should add multiple products to the cart from the inventory page and reflect the cart count', () => {
    cy.addProductToCart('Sauce Labs Backpack');
    cy.addProductToCart('Sauce Labs Bike Light');
    cy.assertCartCount(2);

    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);
  });

  it('should sort products by price (low to high) and reflect the new order', () => {
    InventoryPage.sortBy('lohi');

    InventoryPage.itemPrices
      .then(($prices) => {
        return [...$prices].map((el) =>
          parseFloat(el.textContent.replace('$', ''))
        );
      })
      .then((prices) => {
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sorted);
      });
  });
});
