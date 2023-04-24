import { faker } from "@faker-js/faker";
import { LoginPage } from "../pages/loginPage";
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");

describe("Santa login UI&API", () => {
  let loginPage = new LoginPage();
  let oldPass = "test2077";

  it("user can`t login with old password - UI", () => {
    let newPass = faker.internet.password(8); //8 charters
    cy.log(newPass);
    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    loginPage.login("testdmirr@gmail.com", oldPass);
    // cy.get(":nth-child(3) > .frm").type("testdmirr@gmail.com");
    // cy.get(":nth-child(4) > .frm").type(oldPass);
    // cy.get(".btn-main").click();
    cy.contains("Коробки").should("exist");
    cy.changePass(newPass);
    cy.contains("Выйти с сайта").click();

    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    cy.get(loginPageElements.loginField).type("testdmirr@gmail.com");
    cy.get(loginPageElements.passField).type(oldPass);
    cy.get(loginPageElements.loginButton).click();
    cy.contains("Неверное имя пользователя").should("exist");
    cy.get(":nth-child(4) > .frm").clear().type(newPass);
    cy.get(".btn-main").click();
    cy.changePass(oldPass);
  });

  it.only("user can`t login with old password - API,UI", () => {
    let newPass = faker.internet.password(8);
    cy.log(newPass);
    cy.request({
      metod: "PUT",
      headers: {
        cookie:
          "__ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b:santa-secret.ru; top100_id=t1.7627570.2108586738.1680379156247; _pm_=9v49d985fzyb7p3rsey5w47sleju6x9cisa; _ym_isad=2; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4MjM1NTY2MSwiZXhwIjoxNjg0OTQ3NjYxfQ.1h9ZDY7gD6qVfUM1HoY0j2E0osWPgHXDbOczGzcP-cE; _ohmybid_cmf=2; last_visit=1682354696525::1682361896525; t3_sid_7627570=s1.685668441.1682361797280.1682361896727.7.4",
      },
      url: "https://santa-secret.ru/api/account/password",
      body: { password: newPass },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    loginPage.login("testdmirr@gmail.com", newPass);
    cy.contains("Коробки").should("exist");
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.contains("Выйти с сайта").click();

    cy.request({
      metod: "PUT",
      headers: {
        Cookie:
          "_ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b:santa-secret.ru; top100_id=t1.7627570.2108586738.1680379156247; _pm_=9v49d985fzyb7p3rsey5w47sleju6x9cisa; _ym_isad=2; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4MjM1NTY2MSwiZXhwIjoxNjg0OTQ3NjYxfQ.1h9ZDY7gD6qVfUM1HoY0j2E0osWPgHXDbOczGzcP-cE; _ohmybid_cmf=2; last_visit=1682354696525::1682361896525; t3_sid_7627570=s1.685668441.1682361797280.1682361896727.7.4",
      },
      url: "https://santa-secret.ru/api/account/password",
      body: { password: oldPass },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
