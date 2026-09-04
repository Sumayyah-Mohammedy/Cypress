// cypress/support/e2e.js
// This file runs before every single spec file.
// Import custom commands here so they're available in every test.
import './commands';

// Example: fail fast on uncaught app exceptions is Cypress default behavior.
// If SauceDemo ever throws a benign console error, you can selectively ignore it here:
// Cypress.on('uncaught:exception', (err) => {
//   if (err.message.includes('some known benign error')) return false;
// });
