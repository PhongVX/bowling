import { addingPlayersSelectors } from "../support/selectors";

const { 
    playerNameInput,
    addPlayerButton,
    startGameButton,
    playerNameInputError,
    playerList,
    alertMessage,
} = addingPlayersSelectors;

describe("Adding Players page test", () => {
    beforeEach(() => {
        cy.startGame();
    });

    it("should display UI elements on Adding Players page", () => {
      cy.get(playerNameInput).should("be.visible");
      cy.get(addPlayerButton).should("be.visible");
      cy.get(startGameButton).should("be.visible");
    });

    describe('Frontend Validation', () => {
        it("Should not leave the empty Player name", () => {
            cy.get(addPlayerButton).click();
            cy.get(playerNameInputError).should('have.text', 'Player name cannot be empty!');
        });

        it("Should not start game without players", () => {
            cy.get(startGameButton).click();
            cy.get(alertMessage).should('have.text', 'Please add players to continue!');
        });

        it("Should not add over 5 players", () => {
            const mockPlayerList = ["Captain America", "Nick", "Hulk", "Spider man", "Iron man", "Thor"];
          
            cy.wrap(mockPlayerList).each((mockPlayerName, index) => {
              cy.get(playerNameInput).type(mockPlayerName as any);
              cy.get(addPlayerButton).click();
              if (index < 5) {
                cy.get(playerList).should("contain.text", `#${index + 1}: ${mockPlayerName}`);
              }
            });
          
            cy.get(alertMessage).should("have.text", "You can only add up to 5 players!");
          });

        it("Should start game with at least 1 player", () => {
            const mockPlayerName = 'John';
            cy.get(playerNameInput).type(mockPlayerName);
            cy.get(addPlayerButton).click();
            cy.get(playerList).should('have.text', `#1: ${mockPlayerName}`);
            cy.get(startGameButton).click();
        });
    });
});