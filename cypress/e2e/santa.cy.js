import { faker } from "@faker-js/faker";
describe("Santa login", () => {
  it("user can login", () => {
    let oldPass = "test2077";
    let newPass = faker.internet.password(8); //8 charters
    cy.log(newPass);
    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    cy.get(":nth-child(3) > .frm").type("testdmirr@gmail.com");
    cy.get(":nth-child(4) > .frm").type(oldPass);
    cy.get(".btn-main").click();
    cy.contains("Коробки").should("exist");
    cy.changePass(newPass);
    cy.contains("Выйти с сайта").click();

    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    cy.get(":nth-child(3) > .frm").type("testdmirr@gmail.com");
    cy.get(":nth-child(4) > .frm").type(oldPass);
    cy.get(".btn-main").click();
    cy.contains("Неверное имя пользователя").should("exist");
    cy.get(":nth-child(4) > .frm").clear().type(newPass);
    cy.get(".btn-main").click();
    cy.changePass(oldPass);
  });
});
