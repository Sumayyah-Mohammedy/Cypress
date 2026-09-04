// cypress/pageObjects/LoginPage.js

class LoginPage {
  // ---------- Locators ----------
  get usernameInput() {
    return cy.get('#user-name');
  }

  get passwordInput() {
    return cy.get('#password');
  }

  get loginButton() {
    return cy.get('#login-button');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  get errorCloseButton() {
    return cy.get('.error-button');
  }

  // ---------- Actions ----------
  visit() {
    cy.visit('/');
    return this;
  }

  typeUsername(username) {
    this.usernameInput.clear().type(username);
    return this;
  }

  typePassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  submit() {
    this.loginButton.click();
    return this;
  }

  login(username, password) {
    this.visit();
    this.typeUsername(username);
    this.typePassword(password);
    this.submit();
    return this;
  }

  // ---------- Assertions ----------
  assertErrorMessageContains(text) {
    this.errorMessage.should('be.visible').and('contain.text', text);
    return this;
  }

  assertOnLoginPage() {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    this.loginButton.should('be.visible');
    return this;
  }
}

export default new LoginPage();
