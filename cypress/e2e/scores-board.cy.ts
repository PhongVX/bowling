import { addingPlayersSelectors, scoresBoardSelectors } from "../support/selectors";

describe("Scores board page test", () => {
    it("Go to scores board", () => {
      const mockPlayerList = ["Hulk"];
      cy.goToScoresBoard(mockPlayerList, {...addingPlayersSelectors, ...scoresBoardSelectors});
      cy.url().should("include", "/scores-board");
    });
});