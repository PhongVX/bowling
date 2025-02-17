import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GetStartedPage } from ".";

describe("GetStartedPage Snapshot", () => {
  it("renders correctly and matches snapshot", () => {
    const { container } = render(
      <BrowserRouter>
        <GetStartedPage />
      </BrowserRouter>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
