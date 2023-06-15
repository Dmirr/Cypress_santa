beforeEach(() => {
  cy.visit("/");
  cy.userLogin(userLoginData.userEmail, userLoginData.userPass);
});
const userLoginData = require("../fixtures/pages/userLoginData.json");
describe("Tests for Коробка", () => {
  it("passes", () => {
    //cy.userLogin1(userLoginData.userEmail, userLoginData.userPass);
    cy.contains("Коробки").click({ force: true });
    cy.contains("Мои Коробки").should("exist");
  });
});
describe("Tests for Создать коробку", () => {
  it("passes", () => {
    //cy.userLogin1(userLoginData.userEmail, userLoginData.userPass);
    cy.contains("Создать коробку").click();
    cy.contains("Придумайте название коробке").should("exist");
  });
});
describe("Tests for быстрая жеребьевка", () => {
  it("passes", () => {
    //cy.userLogin1(userLoginData.userEmail, userLoginData.userPass);
    cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.contains(
      "Здесь вы можете провести случайную жеребьевку между участниками"
    ).should("exist");
  });
});
describe("Tests for Личный кабинет", () => {
  it("passes", () => {
    //cy.userLogin1(userLoginData.userEmail, userLoginData.userPass);
    cy.contains("Дмитрий").click({ force: true });
    cy.contains("Настройки профиля").should("exist");
  });
});
