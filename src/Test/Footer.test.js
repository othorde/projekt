import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Footer from '../components/Footer/index';

let container = null;

beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});


it("renders with the right content", () => {
	act(() => {
		render(<Footer />, container);
	});
	expect(container.textContent).toContain("Kurs");
	expect(container.textContent).toContain("Projekt Projekt av Alexander, Johanna, Jonathan, Oliver");
});