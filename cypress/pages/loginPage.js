export class LoginPage {
  elements = {
    loginField: () => cy.get(":nth-child(3) > .frm"),
    passField: () => cy.get(":nth-child(4) > .frm"),
    loginButton: () => cy.get(".btn-main"),
  };
  //Доменный метод (описывает действия пользователя)
  login(login, pass) {
    this.elements.loginField().type(login);
    this.elements.passField().type(pass);
    this.elements.loginButton().click();
  }
}

//   inputLogin(login) {
//     this.elements.loginField().type(login);
//   }
//   inputPass(pass) {
//     this.elements.passField().type(pass);
//   }
//   submitLogin() {
//     this.elements.loginButton().click();
//   }
