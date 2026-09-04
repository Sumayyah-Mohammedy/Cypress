// cypress/support/commands.js
import LoginPage from '../pageObjects/LoginPage';
import InventoryPage from '../pageObjects/InventoryPage';

/**
 * cy.login(username, password)
 * Performs a UI login via the LoginPage object.
 * Usage: cy.login('standard_user', 'secret_sauce')
 */
Cypress.Commands.add('login', (username, password) => {
  LoginPage.login(username, password);
});

/**
 * cy.loginAsStandardUser()
 * Convenience command that logs in with credentials from the users fixture
 * and asserts the user landed on the inventory page.
 */
Cypress.Commands.add('loginAsStandardUser', () => {
  cy.fixture('users').then((users) => {
    LoginPage.login(users.standardUser.username, users.standardUser.password);
  });
  InventoryPage.assertOnInventoryPage();
});

/**
 * cy.addProductToCart(productName)
 * Adds a product to the cart by its visible name from the inventory page.
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  InventoryPage.addProductToCartByName(productName);
});

/**
 * cy.openProduct(productName)
 * Navigates from the inventory page into a product's detail page.
 */
Cypress.Commands.add('openProduct', (productName) => {
  InventoryPage.openProductByName(productName);
});

/**
 * cy.assertCartCount(expectedCount)
 * Asserts the number shown on the shopping cart badge.
 * When expectedCount is 0, asserts the badge does not exist.
 */
Cypress.Commands.add('assertCartCount', (expectedCount) => {
  if (expectedCount === 0) {
    cy.get('.shopping_cart_badge').should('not.exist');
  } else {
    cy.get('.shopping_cart_badge').should('have.text', String(expectedCount));
  }
});

/**
 * cy.logout()
 * Logs the current user out via the burger menu.
 */
Cypress.Commands.add('logout', () => {
  InventoryPage.logout();
});
