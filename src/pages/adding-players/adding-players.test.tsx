import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AddingPlayersPage } from ".";

Object.defineProperty(window, "matchMedia", {
    value: () => ({
        addListener: jest.fn(),
        removeListener: jest.fn(),
    }),
});

describe("AddingPlayersPage Snapshot", () => {
    it("renders correctly and matches snapshot", () => {
        const { container } = render(
            <BrowserRouter>
                <AddingPlayersPage />
            </BrowserRouter>
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
