import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ScoresBoardPage } from ".";

describe("GetStartedPage Snapshot", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <ScoresBoardPage />
      </BrowserRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
