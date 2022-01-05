
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PopUp from "../components/PopUp";

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

it("renders scooter data", async () => {

        const PopupInfo = {
            whatToShow: "Scooter",
            content: {
                active_user: "Kund99",
                battery: 95,
                city_location: "Malmö",
                is_active: true,
                speed: 0,
                start_time: "16:14:03",
                _id: "61bca9ad31544da7cd554252",
                position: {
                    lat: 55.57043602583394,
                    lng: 13.001035273364412
                }, logg: [
                ]
            }
        };

    await act(async () => {
        render(<PopUp PopupInfo={PopupInfo} />, container);
    });
    
    expect(container.querySelector("[data-label='Scooter ID']").textContent).toContain(PopupInfo.content._id);
    expect(container.querySelector("[data-label='Aktiv']").textContent).toContain(" I användning ");
    expect(container.querySelector("[data-label='Användare']").textContent).toContain(PopupInfo.content.active_user);
    expect(container.querySelector("[data-label='Batteri']").textContent).toContain( PopupInfo.content.battery );
    expect(container.querySelector("[data-label='Stad']").textContent).toContain(PopupInfo.content.city_location);
    expect(container.querySelector("[data-label='Latitude']").textContent).toContain(PopupInfo.content.position.lat);
    expect(container.querySelector("[data-label='Longitude']").textContent).toContain(PopupInfo.content.position.lng);
    expect(container.querySelector("[data-label='Starttid']").textContent).toContain(PopupInfo.content.start_time);
    expect(container.querySelector("[data-label='Hastighet']").textContent).toContain(PopupInfo.content.speed);
});


it("renders city data", async () => {

    const PopupInfo = {
        whatToShow: "City",
        content: {
            city: "Malmö",
            amount_of_bikes: 100,
        }
    };

    await act(async () => {
        render(<PopUp PopupInfo={PopupInfo} />, container);
    });

    expect(container.querySelector("[data-label='Stad']").textContent).toContain(PopupInfo.content.city);
    expect(container.querySelector("[data-label='Antal cyklar']").textContent).toContain(PopupInfo.content.amount_of_bikes);

});

it("renders LoadStation data", async () => {

    const PopupInfo = {
        whatToShow: "LoadStation",
        content: {
            color: "NOCOLOR",
            amount_of_bikes_post: 1,
        }
    };

    await act(async () => {
        render(<PopUp PopupInfo={PopupInfo} />, container);
    });

    expect(container.querySelector("[data-label='Färgkod']").textContent).toContain(PopupInfo.content.color);
    expect(container.querySelector("[data-label='Antal cyklar']").textContent).toContain(PopupInfo.content.amount_of_bikes_post);

});

it("renders ParkingZone data", async () => {

    const PopupInfo = {
        whatToShow: "ParkingZone",
        content: {
            color: "NOCOLOR",
            amount_of_bikes_zone: 2
        }
    };

    await act(async () => {
        render(<PopUp PopupInfo={PopupInfo} />, container);
    });

    expect(container.querySelector("[data-label='Färgkod']").textContent).toContain(PopupInfo.content.color);
    expect(container.querySelector("[data-label='Antal cyklar']").textContent).toContain(PopupInfo.content.amount_of_bikes_zone);

});