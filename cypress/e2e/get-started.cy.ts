describe("Get Started page test", () => {
    it("Click on start game and navigate to Adding Players page", () => {
      cy.startGame();
      cy.url().should("include", "/adding-players");
    });
});