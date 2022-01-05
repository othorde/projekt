const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));


import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AppContext from "../AppContext";
import Header from '../components/Header/index';

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
    localStorage.setItem('tag', JSON.stringify('admin'));

	act(() => {
        render(
            <AppContext.Provider value={true}>
                <Header />
            </AppContext.Provider>
        , container);
	});
	
    expect(container.textContent).toContain("Svenska Elsparkcyklar");


});

