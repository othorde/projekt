import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Payment from "../components/Payment";
import Api from '../../src/Api'


jest.mock("../../src/Api", () => {
  return function DummyMap(props) {
    return (
      true
    );
  };
});


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

it("renders user data", async () => {
 

  const data = {
      "show": true,
      "id": "61a7715e7590d9b342ecb4e3",
      "username": "othorde"
      };

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<Payment customer={data}/>, container);

  //const payment = await container.querySelector("[data-testid]=paymentelement");

  const input = await container.querySelector("[placeholder='Nytt saldo']")
  const button = await container.querySelector('button', /Ändra saldo/i)

  fireEvent.change(input, {target: {value:99}})

  fireEvent.click(button)
  expect(input.value).toBe("99")
  expect(payment).toContain("VARNING")

  });


  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
