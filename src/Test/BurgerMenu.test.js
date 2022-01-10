import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import BurgerMenu from '../components/BurgerMenu/index';

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

it("changes value when clicked", () => {
	const setOpen = jest.fn();
	act(() => {
	  render(<BurgerMenu open={false} setOpen={setOpen}/>, container);
	  const button = document.querySelector("[data-testid=burgerButton]");
	  button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

	});
  
	expect(setOpen).toHaveBeenCalledTimes(1);
});