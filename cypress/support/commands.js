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

Cypress.Commands.add("userLogin1", (userEmail, userPass) => {
  cy.contains("Вход и регистрация").click({ force: true });
  cy.get(":nth-child(3) > .frm").type(userEmail);
  cy.get(":nth-child(4) > .frm").type(userPass);
  cy.get(".btn-main").click({ force: true });
});
Cypress.Commands.add("changePass", (newPassword) => {
  cy.get(
    '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med'
  ).click();
  cy.get(".layout-column-start > :nth-child(1) > .frm").type(newPassword);
  cy.get(
    ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm"
  ).type(newPassword);
  cy.get(".layout-row-end > .btn-service").click();
});
