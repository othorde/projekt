
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "../components/User";

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
    const userDetails = {
        data: {
            username: "Joni Baez",
            balance: "500",
            trips: [
                {date:"2021-11-09", price:"25"}, 
                {date:"2021-11-10", price:"50"},
                {date:"2021-11-12", price:"105"}
            ]
        }
    };

    await act(async () => {
        render(<User userDetails={userDetails} />, container);
    });
    
    expect(container.querySelector("[data-label=Användarnamn]").textContent).toContain(userDetails.data.username);
    expect(container.querySelector("[data-label='Första resan']").textContent).toContain(userDetails.data.trips[0].date);
    expect(container.querySelector("[data-label='Senaste resan']").textContent).toContain(userDetails.data.trips[2].date);
    expect(container.querySelector("[data-label='Antal resor']").textContent).toBe("3 ");
    expect(container.querySelector("[data-label='På kontot']").textContent).toBe(userDetails.data.balance + ":- ");
});


it("renders user data, (zero trips) should show: Du har ännu inte gjort någon resa", async () => {
    const userDetails = {
        data: {
            username: "Joni Baez",
            balance: "500",
            trips: []
        }
    };

    await act(async () => {
        render(<User userDetails={userDetails} />, container);
    });
    
    expect(container.querySelector("[data-label=Användarnamn]").textContent).toContain(userDetails.data.username);
    expect(container.querySelector("[data-label='Första resan']").textContent).toContain("Du har ännu inte gjort någon resa");
    expect(container.querySelector("[data-label='Senaste resan']").textContent).toContain("Du har ännu inte gjort någon resa");
    expect(container.querySelector("[data-label='Antal resor']").textContent).toBe("Du har ännu inte gjort någon resa  ");
    expect(container.querySelector("[data-label='På kontot']").textContent).toBe(userDetails.data.balance + ":- ");
});