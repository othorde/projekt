import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
import History from '../components/History';


const aUser = [
    {
        "id": "1",
        "date": "2021-11-08",
        "price": "25",
        "start": {
            "position": {
                "lat": 59.3153,
                "lng": 18.0344
            },
            "time": "12.06"
        },
        "stop": {
            "position": {
                "lat": 59.3195,
                "lng": 18.0682
            },
            "time": "12.16"
        }
    },
    
]

const cities = [
    {
        "_id": "61bb5ba5eae13a828da83b29",
        "city": "Stockholm",
        "amount_of_bikes": 0,
        "position": {
            "polygonePart1": {
                "lat": 59.362932,
                "lng": 18.011736
            },
            "polygonePart2": {
                "lat": 59.371701,
                "lng": 18.152629
            },
            "polygonePart3": {
                "lat": 59.285905,
                "lng": 18.191607
            },
            "polygonePart4": {
                "lat": 59.263958,
                "lng": 17.972737
            }
        },
        "parking_zones": [
            {
                "amount_of_bikes_zone": 0,
                "color": "Purple",
                "position": {
                    "polygonePart1": {
                        "lat": 59.305226,
                        "lng": 18.081246
                    },
                    "polygonePart2": {
                        "lat": 59.306799,
                        "lng": 18.080437
                    },
                    "polygonePart3": {
                        "lat": 59.307174,
                        "lng": 18.083087
                    },
                    "polygonePart4": {
                        "lat": 59.305672,
                        "lng": 18.083837
                    }
                }
            },
            {
                "amount_of_bikes_zone": 0,
                "color": "DarkBlue",
                "position": {
                    "polygonePart1": {
                        "lat": 59.295805,
                        "lng": 18.070012
                    },
                    "polygonePart2": {
                        "lat": 59.294286,
                        "lng": 18.082198
                    },
                    "polygonePart3": {
                        "lat": 59.289124,
                        "lng": 18.08665
                    },
                    "polygonePart4": {
                        "lat": 59.287806,
                        "lng": 18.078757
                    }
                }
            },
            {
                "amount_of_bikes_zone": 0,
                "color": "Aqua",
                "position": {
                    "polygonePart1": {
                        "lat": 59.31262,
                        "lng": 18.038154
                    },
                    "polygonePart2": {
                        "lat": 59.314263,
                        "lng": 18.034356
                    },
                    "polygonePart3": {
                        "lat": 59.314586,
                        "lng": 18.036706
                    },
                    "polygonePart4": {
                        "lat": 59.313209,
                        "lng": 18.039168
                    }
                }
            },
            {
                "amount_of_bikes_zone": 0,
                "color": "Red",
                "position": {
                    "polygonePart1": {
                        "lat": 59.34149,
                        "lng": 18.070716
                    },
                    "polygonePart2": {
                        "lat": 59.340352,
                        "lng": 18.076016
                    },
                    "polygonePart3": {
                        "lat": 59.338213,
                        "lng": 18.074321
                    },
                    "polygonePart4": {
                        "lat": 59.338924,
                        "lng": 18.070008
                    }
                }
            }
        ],
        "charging_posts": [
            {
                "amount_of_bikes_post": 7,
                "color": "Green",
                "position": {
                    "polygonePart1": {
                        "lat": 59.312465,
                        "lng": 18.065576
                    },
                    "polygonePart2": {
                        "lat": 59.315411,
                        "lng": 18.064117
                    },
                    "polygonePart3": {
                        "lat": 59.316054,
                        "lng": 18.068101
                    },
                    "polygonePart4": {
                        "lat": 59.313923,
                        "lng": 18.070775
                    }
                }
            },
            {
                "amount_of_bikes_post": 2,
                "color": "Teal",
                "position": {
                    "polygonePart1": {
                        "lat": 59.339325,
                        "lng": 18.063147
                    },
                    "polygonePart2": {
                        "lat": 59.339872,
                        "lng": 18.064966
                    },
                    "polygonePart3": {
                        "lat": 59.338213,
                        "lng": 18.065966
                    },
                    "polygonePart4": {
                        "lat": 59.337748,
                        "lng": 18.064469
                    }
                }
            },
            {
                "amount_of_bikes_post": 17,
                "color": "Pink",
                "position": {
                    "polygonePart1": {
                        "lat": 59.333461,
                        "lng": 18.034012
                    },
                    "polygonePart2": {
                        "lat": 59.331412,
                        "lng": 18.032955
                    },
                    "polygonePart3": {
                        "lat": 59.330846,
                        "lng": 18.036678
                    },
                    "polygonePart4": {
                        "lat": 59.332926,
                        "lng": 18.037708
                    }
                }
            }
        ]
    }
]

const loadingCities = "";
const messageCities = "";
let aUserLoading = false;
 

const aUserMessage = "fakeloading..";

jest.mock('../Hooks/useFetchAUser', () => ({
    useFetchAUser: () => {return {aUser, aUserLoading, aUserMessage}}
}));
jest.mock('../Hooks/useFetchAllCities', () => ({
    useFetchAllCities: () => {return {cities, loadingCities, messageCities}}
}));

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
    jest.clearAllMocks();

});

it("renders and displays content, testing Datum", async () => {
    let data =  {
        "showCustomer": true,
        "id": "619b5e6fe8cf630e43c0aff4",
        "username": "othor",
        "from": "admin"
    }
    let input;

	await act(async () => {
        
        render(<History customer = {data}/>, container);
        input = await screen.findByText("Datum")
        
	});

    expect(await screen.findByText("2021-11-08"));
    expect(await screen.findByText("37:-"));

});
