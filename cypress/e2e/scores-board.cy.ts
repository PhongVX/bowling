import { addingPlayersSelectors, scoresBoardSelectors } from "../support/selectors";

describe("Scores board page test", () => {
    it("Go to scores board", () => {
      const mockPlayerList = ["Hulk", 'Hawkeye', 'Wolverine', 'John'];
      const mockInputRow = [
        {
          name: 'Hulk',
          expected: '168',
          scores: [['X'], ['9', '/'], ['8', '1'], ['7', '/'], ['X'], ['6', '/'], ['5', '3'], ['9', '/'], ['X'], ['7', '/', '8']]
        },
        {
          name: 'Hawkeye',
          expected: '170',
          scores: [['7', '/'], ['X'], ['9', '/'], ['8', '1'], ['7','/'], ['X'], ['6', '/'], ['5', '3'], ['9', '/'], ['X', '9', '/']]
        },
        {
          name: 'Wolverine',
          expected: '160',
          scores: [['8', '1'], ['6', '/'], ['X'], ['9', '/'], ['8','1'], ['7', '/'], ['X'], ['8', '1'], ['7', '/'], ['9', '/', '7']]
        },
        {
          name: 'John',
          expected: '300',
          scores: [['X'], ['X'], ['X'], ['X'], ['X'], ['X'], ['X'], ['X'], ['X'], ['X', 'X', 'X']]
        }
      ];
      cy.goToScoresBoard(mockPlayerList, {...addingPlayersSelectors, ...scoresBoardSelectors});
      cy.url().should("include", "/scores-board");

      cy.window().then((window) => {
        const playersInStorage = JSON.parse(window.localStorage.getItem('players') as string);
        cy.log(playersInStorage)
        cy.wrap(playersInStorage).each((player: any, index) => {
          const scoresOfPlayer = mockInputRow[index].scores;
          cy.wrap(scoresOfPlayer).each((rolls: any, frameIndex) => {
            cy.wrap(rolls).each((roll: string, rollIndex) => {
              cy.get(`[test-id=${player.id}-frame-${frameIndex+1}-roll-${rollIndex+1}]`).type(roll);
            });
          });
          cy.get(`[test-id=${player.id}-total-score]`).should('contain.text', mockInputRow[index].expected);
        });
      });
    });
});