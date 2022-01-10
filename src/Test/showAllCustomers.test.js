import React from "react";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import ShowAllCustomers from "../components/showAllCustomers";
import { unmountComponentAtNode } from "react-dom";
import {useFetchAllCustomers} from '../Hooks/useFetchAllCustomers';
import {Loader} from '../components/Loader/index';



const errorAllCustomers = "";
let allCustomers = [
    {
        "_id": "619b5e6fe8cf630e43c0aff4",
        "username": "test1",
        "tag": "admin",
        "balance": 2005,
        "trips": [
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
            }
        ]
    },
];

jest.mock('../Hooks/useFetchAllCustomers', () => ({
    useFetchAllCustomers: () => {return {allCustomers, errorAllCustomers}}
}))

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.clearAllMocks();
})

it("checks if balance is displayed  ", async () => {
    await act(async() => {
        render(<ShowAllCustomers/>, container);
    })
    expect(await screen.findByText("2005:-"));
})


it("checks if input value changes in payment", async () => {
    let input;
    let button;

    await act(async() => {
        render(<ShowAllCustomers/>, container);
        button = await screen.findByTestId('changePayment')
        fireEvent.click(button)
        input = await screen.findByPlaceholderText("Nytt saldo")
        fireEvent.change(input, {target: {value:100}})
    })
    expect(input.value).toBe("100")
})

it("Should display result 0-1 since only one user exists in variable", async () => {
    let button;

    await act(async() => {
        render(<ShowAllCustomers/>, container);
        button = await screen.findByTestId('forward')
        fireEvent.click(button)
    })
    expect(screen.getByText("Visar 0-19 av 1 resultat"))
})

