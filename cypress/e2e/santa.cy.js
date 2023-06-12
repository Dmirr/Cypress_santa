import { faker } from "@faker-js/faker";
const loginPageElements = require("../fixtures/pages/loginPageSelectors.json");
const userLoginData = require("../fixtures/pages/userLoginData.json");

describe("Santa login UI&API", () => {
  it.only("user can`t login with old password - UI", () => {
    let newPass = faker.internet.password(8); //8 charters
    cy.log(newPass);
    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    cy.userLogin(userLoginData.userEmail, userLoginData.userPass);
    cy.contains("Коробки").should("exist");
    cy.changePass(newPass);
    cy.contains("Выйти с сайта").click();

    cy.visit("https://santa-secret.ru");
    cy.contains("Вход и регистрация").click({ force: true });
    cy.get(loginPageElements.loginField).type(userLoginData.userEmail);
    cy.get(loginPageElements.passField).type(userLoginData.userPass);
    cy.get(loginPageElements.loginButton).click();
    cy.contains("Неверное имя пользователя").should("exist");
    cy.get(loginPageElements.passField).clear().type(newPass);
    cy.get(".btn-main").click();
    cy.changePass(userLoginData.userPass);
  });

  it("user can login with new password - API,UI", () => {
    let newPass = faker.internet.password(8);
    cy.log(newPass);
    cy.request({
      method: "PUT",
      headers: {
        Cookie:
          "_ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b:santa-secret.ru; _ym_isad=2; top100_id=t1.7627570.2108586738.1680379156247; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4MDM3OTE1OSwiZXhwIjoxNjgyOTcxMTU5fQ.-4-9MJGrHyqueOQlTWI70lFzJQO-2EcJmpLkU76v898; _ohmybid_cmf=2; last_visit=1680371968027::1680379168027; _pm_=69ibfe9d8zq1ktsbe2xzz6qxh4xsyg0snv2; t3_sid_7627570=s1.410775940.1680379156258.1680379168149.1.3",
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
      method: "PUT",
      headers: {
        Cookie:
          "_ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b:santa-secret.ru; _ym_isad=2; top100_id=t1.7627570.2108586738.1680379156247; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4MDM3OTE1OSwiZXhwIjoxNjgyOTcxMTU5fQ.-4-9MJGrHyqueOQlTWI70lFzJQO-2EcJmpLkU76v898; _ohmybid_cmf=2; last_visit=1680371968027::1680379168027; _pm_=69ibfe9d8zq1ktsbe2xzz6qxh4xsyg0snv2; t3_sid_7627570=s1.410775940.1680379156258.1680379168149.1.3",
      },
      url: "https://santa-secret.ru/api/account/password",
      body: { password: oldPass },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
