
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Logg from "../components/Logg";

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
        scooter: {
        active_user: null,
        battery: 100,
        city_location: "Malmö",
        is_active: false,
        logg: [{
            end: {
                position: {
                    lat: 55.575206286000416,
                    lng: 12.97877633795938
                },
                time: "16:15:03",
            },
            event: "Simulering för Kund100",
            start: {
                position: {
                    lat: 55.58756263661457,
                    lng: 12.994446022758469,
                },
                time: "16:14:03"
            },
        }],
        },
        user: "Kund100",
    };

    await act(async () => {
        render(<Logg scooter={data} />, container);
    });
    
    expect(container.querySelector("[data-label='Startposition (lat)']").textContent).toContain("55.58756263661457");
    expect(container.querySelector("[data-label='Startposition (lng)']").textContent).toContain("12.994446022758469");
    expect(container.querySelector("[data-label='Starttid']").textContent).toBe("16:14:03 ");
    expect(container.querySelector("[data-label='Slutposition (lat)']").textContent).toBe(" 55.575206286000416");
    expect(container.querySelector("[data-label='Slutposition (lng)']").textContent).toBe(" 12.97877633795938");
    expect(container.querySelector("[data-label='Stopptid']").textContent).toBe(" 16:15:03");
    expect(container.querySelector("[data-label='Event']").textContent).toBe(" Simulering för Kund100 ");


});
