// let cities = [];
// jest.mock('../Hooks/useFetchAllCities', () => ({
//     useFetchAllCities: () => cities = [
        
//         {
//         "_id": "61bb46c2eae13a828da83b24",
//         "city": "Göteborg",
//         "amount_of_bikes": 0,
//         "position": {
//             "polygonePart1": {
//                 "lat": 57.697371,
//                 "lng": 11.919066
//             },
//             "polygonePart2": {
//                 "lat": 57.706604,
//                 "lng": 11.991612
//             },
//             "polygonePart3": {
//                 "lat": 57.677011,
//                 "lng": 12.008765
//             },
//             "polygonePart4": {
//                 "lat": 57.675208,
//                 "lng": 11.942541
//             }
//         },
//         "parking_zones": [
//             {
//                 "amount_of_bikes_zone": 0,
//                 "color": "DarkSlateGrey",
//                 "position": {
//                     "polygonePart1": {
//                         "lat": 57.698379,
//                         "lng": 11.970003
//                     },
//                     "polygonePart2": {
//                         "lat": 57.697318,
//                         "lng": 11.970582
//                     },
//                     "polygonePart3": {
//                         "lat": 57.697662,
//                         "lng": 11.974155
//                     },
//                     "polygonePart4": {
//                         "lat": 57.699158,
//                         "lng": 11.972095
//                     }
//                 }
//             },
//         ],
//         "charging_posts": [
//             {
//                 "amount_of_bikes_post": 1,
//                 "color": "DarkGray",
//                 "position": {
//                     "polygonePart1": {
//                         "lat": 57.69292,
//                         "lng": 11.987044
//                     },
//                     "polygonePart2": {
//                         "lat": 57.692163,
//                         "lng": 11.987698
//                     },
//                     "polygonePart3": {
//                         "lat": 57.692157,
//                         "lng": 11.989307
//                     },
//                     "polygonePart4": {
//                         "lat": 57.693287,
//                         "lng": 11.988202
//                     }
//                 }
//             },
//         ]
//     }]
// }));


// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import History from '../components/History';
// import * as hooks from '../Hooks/useFetchAllCities';

// let container = null;
// beforeEach(() => {
// 	// setup a DOM element as a render target
// 	container = document.createElement("div");
// 	document.body.appendChild(container);
// });

// afterEach(() => {
// 	// cleanup on exiting
// 	unmountComponentAtNode(container);
// 	container.remove();
// 	container = null;
// });

// it("renders with the right content", async () => {
//     let data =  {
//         "showCustomer": true,
//         "id": "619b5e6fe8cf630e43c0aff4",
//         "username": "alex",
//         "from": "admin"
//     }




// 	await act(async () => {
        
//         render(<History customer = {data}/>, container);
// 	});
	
//     expect(container.querySelector("[data-label='Starttid']").textContent).toContain("aa");
// });

