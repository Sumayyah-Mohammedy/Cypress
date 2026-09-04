# SauceDemo Cypress Automation

End-to-end UI test automation for [SauceDemo](https://www.saucedemo.com) built with Cypress, following the Page Object Model (POM) and reusable custom commands.

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
