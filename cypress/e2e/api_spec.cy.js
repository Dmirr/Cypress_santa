import { faker } from "@faker-js/faker";
const dataManagement = require("../fixtures/pages/userLoginData.json");
let loginCookie = {
  Cookie:
    "_ym_uid=16734548431002114789; _ym_d=1673454843; adtech_uid=eb12ecd9-da63-486d-a791-3be86eeeb88b%3Asanta-secret.ru; top100_id=t1.7627570.2108586738.1680379156247; _ohmybid_cmf=2; last_visit=1686644309592%3A%3A1686651509592; t3_sid_7627570=s1.1506702149.1686651488195.1686651515475.5.4; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5MTk3NzksImlhdCI6MTY4NjY4MDQyOSwiZXhwIjoxNjg5MjcyNDI5fQ.VgweiqR270G0VEPcouKsk2ukuDJe1xJQy0QsUkGgMtA",
};
describe("API tests for Secret Santa", () => {
  it("user successfully login", () => {
    cy.request({
      method: "POST",
      url: "/api/login",
      body: {
        email: dataManagement.userEmail,
        password: dataManagement.userPass,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("id", dataManagement.userId);
      expect(response.body).to.have.property("email", dataManagement.userEmail);
    });
  });
  it("user is authorized", () => {
    cy.request({
      method: "GET",
      url: "/api/account",
      headers: loginCookie,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
  it("user unsuccessfull login", () => {
    let failPass = faker.internet.password(5);
    cy.request({
      method: "POST",
      url: "/api/login",
      body: {
        email: dataManagement.userEmail,
        password: failPass,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });
});
