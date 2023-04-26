beforeEach(() => {
  cy.visit("/");
});
let userEmail = "testdmirr@gmail.com";
let userPass = "test2077";
describe("Tests for Коробка", () => {
  it("passes", () => {
    cy.userLogin(userEmail, userPass);
    cy.contains("Коробки").click({ force: true });
    cy.contains("Мои Коробки").should("exist");
  });
});
describe("Tests for Создать коробку", () => {
  it("passes", () => {
    cy.userLogin(userEmail, userPass);
    cy.contains("Создать коробку").click();
    cy.contains("Придумайте название коробке").should("exist");
  });
});
describe("Tests for быстрая жеребьевка", () => {
  it("passes", () => {
    cy.userLogin(userEmail, userPass);
    cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.contains(
      "Здесь вы можете провести случайную жеребьевку между участниками"
    ).should("exist");
  });
});
describe("Tests for Личный кабинет", () => {
  it("passes", () => {
    cy.userLogin(userEmail, userPass);
    cy.contains("Дмитрий").click({ force: true });
    cy.contains("Настройки профиля").should("exist");
  });
});
