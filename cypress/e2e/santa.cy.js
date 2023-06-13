import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";

const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");
const dataManagement = require("../fixtures/pages/userLoginData.json");
let loginCookie = {
  Cookie:
    "_ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b%3Asanta-secret.ru; top100_id=t1.7627570.2108586738.1680379156247; _ohmybid_cmf=2; last_visit=1686644309592%3A%3A1686651509592; t3_sid_7627570=s1.1506702149.1686651488195.1686651515475.5.4; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4NjY4MDQyOSwiZXhwIjoxNjg5MjcyNDI5fQ.VgweiqR270G0VEPcouKsk2ukuDJe1xJQy0QsUkGgMtA",
};
describe("Santa login UI&API", () => {
  let loginPage = new LoginPage();

  it("user can`t login with old password - UI", () => {
    let newPass = faker.internet.password(8); //8 charters
    cy.log(newPass);
    cy.visit("/");
    cy.contains("Вход и регистрация").click({ force: true });
    loginPage.login(dataManagement.userEmail, dataManagement.userPass);
    cy.contains("Коробки").should("exist");
    cy.changePass(newPass);
    cy.contains("Выйти с сайта").click();

    cy.visit("/");
    cy.contains("Вход и регистрация").click({ force: true });
    loginPage.login(dataManagement.userEmail, dataManagement.userPass);
    cy.contains("Неверное имя пользователя").should("exist");
    loginPage.elements.passField().clear().type(newPass);
    loginPage.elements.loginButton().click();
    cy.changePass(dataManagement.userPass);
  });

  it("user can login with new password - API,UI", () => {
    let newPass = faker.internet.password(8);
    cy.log(newPass);
    cy.request({
      method: "PUT",
      headers: loginCookie,
      url: "https://santa-secret.ru/api/account/password",
      body: { password: newPass },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
    cy.visit("/");
    cy.contains("Вход и регистрация").click({ force: true });
    loginPage.login(dataManagement.userEmail, newPass);
    cy.contains("Коробки").should("exist");
    cy.get(loginPageElements.accountPage).click();
    cy.contains("Выйти с сайта").click();

    cy.request({
      method: "PUT",
      headers: loginCookie,

      url: "https://santa-secret.ru/api/account/password",
      body: { password: dataManagement.userPass },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
