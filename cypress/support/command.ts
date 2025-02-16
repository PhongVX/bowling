declare namespace Cypress {
    interface Chainable {
        startGame(): Chainable<void>;
        goToScoresBoard(listPlayer: string[], selectors: Record<string, string>): Chainable<void>;
    }
}

Cypress.Commands.add("startGame", () => {
    cy.visit("/");
    cy.get("[test-id=start-game-button]").should("be.visible");
    cy.get("[test-id=start-game-button]").click();
});

Cypress.Commands.add("goToScoresBoard", (listPlayer: string[], selectors: Record<string, string>) => {
    cy.startGame();
    cy.wrap(listPlayer).each((mockPlayerName, index) => {
        cy.get(selectors.playerNameInput).type(mockPlayerName as any);
        cy.get(selectors.addPlayerButton).click();
        if (index < 5) {
          cy.get(selectors.playerList).should("contain.text", `#${index + 1}: ${mockPlayerName}`);
        }
    });
});
