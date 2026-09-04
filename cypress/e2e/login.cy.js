import LoginPage from '../pageObjects/LoginPage';
import InventoryPage from '../pageObjects/InventoryPage';

describe('SauceDemo - Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context('Negative login scenarios', () => {
    it('should show an error when username is empty', () => {
      LoginPage.typePassword('secret_sauce').submit();
      LoginPage.assertErrorMessageContains('Username is required');
      LoginPage.assertOnLoginPage();
    });

    it('should show an error when password is empty', () => {
      LoginPage.typeUsername('standard_user').submit();
      LoginPage.assertErrorMessageContains('Password is required');
      LoginPage.assertOnLoginPage();
    });

    it('should show an error when credentials are invalid', () => {
      cy.fixture('users').then((users) => {
        LoginPage.typeUsername(users.invalidUser.username)
          .typePassword(users.invalidUser.password)
          .submit();
      });
      LoginPage.assertErrorMessageContains(
        'Username and password do not match'
      );
      LoginPage.assertOnLoginPage();
    });

    it('should show a locked-out error for a locked-out user', () => {
      cy.fixture('users').then((users) => {
        LoginPage.typeUsername(users.lockedOutUser.username)
          .typePassword(users.lockedOutUser.password)
          .submit();
      });
      LoginPage.assertErrorMessageContains('locked out');
      LoginPage.assertOnLoginPage();
    });

    it('should allow dismissing the error message', () => {
      LoginPage.submit();
      LoginPage.errorMessage.should('be.visible');
      LoginPage.errorCloseButton.click();
      LoginPage.errorMessage.should('not.exist');
    });
  });

  context('Successful login flow', () => {
    it('should log in with valid credentials and land on the inventory page', () => {
      cy.fixture('users').then((users) => {
        LoginPage.typeUsername(users.standardUser.username)
          .typePassword(users.standardUser.password)
          .submit();
      });
      InventoryPage.assertOnInventoryPage();
    });

    it('should display key homepage UI components after login', () => {
      cy.fixture('users').then((users) => {
        LoginPage.login(users.standardUser.username, users.standardUser.password);
      });
      InventoryPage.assertKeyUiComponentsVisible();
      InventoryPage.assertProductCountGreaterThan(0);
    });

    it('should log in successfully using the cy.loginAsStandardUser custom command', () => {
      cy.loginAsStandardUser();
      InventoryPage.assertKeyUiComponentsVisible();
    });
  });
});
