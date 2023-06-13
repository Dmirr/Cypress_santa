// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");
Cypress.Commands.add("userLogin", (userEmail, userPass) => {
  cy.contains("Вход и регистрация").click({ force: true });
  cy.get(loginPageElements.loginField).type(userEmail);
  cy.get(loginPageElements.passField).type(userPass);
  cy.get(loginPageElements.loginButton).click({ force: true });
});
Cypress.Commands.add("changePass", (newPassword) => {
  cy.get(loginPageElements.accountPage).click();
  cy.get(".layout-column-start > :nth-child(1) > .frm").type(newPassword);
  cy.get(
    ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm"
  ).type(newPassword);
  cy.get(".layout-row-end > .btn-service").click();
});
