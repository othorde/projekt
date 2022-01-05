
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { act } from "react-dom/test-utils";
import AppContext from "../AppContext";
import Home from '../routes/Home';

let container;

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

it("renders without problem when no user is defined ", () => {

	let data = {};
 
	act(() => {
		render(
			<AppContext.Provider value={data}>
				<Home/>
			</AppContext.Provider>
		, container);
	});
	expect(container.textContent).toContain("Välkommen okända besökare");
});

it("renders the defined user", async () => {

	let data = {userHook: {value: {user: "Oliver Andersson"}}};

	act(() => {
		render(
			<AppContext.Provider value={data}>
				<Home/>
			</AppContext.Provider>
		, container);
	});
	expect(container.textContent).toContain("Välkommen Oliver Andersson");
});


