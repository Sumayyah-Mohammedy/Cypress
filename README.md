# SauceDemo Cypress Automation

End-to-end UI test automation for [SauceDemo](https://www.saucedemo.com) built with Cypress, following the Page Object Model (POM) and reusable custom commands.

## Tech Stack
- Cypress (JavaScript)
- Page Object Model
- Custom Cypress commands

## Project Structure
```
saucedemo-cypress/
├── cypress.config.js
├── package.json
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js                # Login failure + success scenarios
│   │   └── productNavigation.cy.js    # Product listing, detail page, cart
│   ├── pageObjects/
│   │   ├── LoginPage.js
│   │   ├── InventoryPage.js
│   │   └── ProductPage.js
│   ├── support/
│   │   ├── commands.js                # cy.login, cy.loginAsStandardUser, etc.
│   │   └── e2e.js
│   └── fixtures/
│       └── users.json                 # Test credentials
```

## Setup
```bash
npm install
```

## Running Tests

Interactive Test Runner:
```bash
npm run cy:open
```

Headless run (CI mode):
```bash
npm run cy:run
```

Headless run in Chrome:
```bash
npm run cy:run:chrome
```

## Test Coverage

**Login (`login.cy.js`)**
- Empty username / empty password validation errors
- Invalid credentials error
- Locked-out user error
- Dismissing the error banner
- Successful login and redirect to `/inventory.html`
- Key homepage UI components visible after login (title, product grid, sort dropdown, cart icon, menu)

**Product Navigation (`productNavigation.cy.js`)**
- Product names and prices render correctly on the listing page
- Navigating into a product detail page preserves name/price
- Back-to-products navigation
- Adding a product to cart from the detail page
- Adding multiple products from the listing page and verifying cart count/contents
- Sorting products by price (low → high)

## Custom Commands (`cypress/support/commands.js`)
| Command | Description |
|---|---|
| `cy.login(username, password)` | Logs in via the LoginPage object |
| `cy.loginAsStandardUser()` | Logs in with fixture credentials and asserts landing on inventory page |
| `cy.addProductToCart(productName)` | Adds a product to the cart by name |
| `cy.openProduct(productName)` | Opens a product's detail page by name |
| `cy.assertCartCount(expectedCount)` | Asserts the cart badge count (or its absence when 0) |
| `cy.logout()` | Logs the current user out |

## Notes
- Test credentials live in `cypress/fixtures/users.json` — update there if SauceDemo's demo accounts change.
- `baseUrl` is set to `https://www.saucedemo.com` in `cypress.config.js`, so specs use relative paths (`cy.visit('/')`).
- Retries are enabled for run mode (`retries.runMode: 1`) to reduce flake from network timing.
