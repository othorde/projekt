import { renderHook } from "@testing-library/react-hooks";
import { useFetchAllCustomers } from "../Hooks/useFetchAllCustomers";
import { act } from "react-dom/test-utils";
const data = [
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
    {
        "_id": "61a728164706989c7483b637",
        "username": "test2",
        "tag": "customer",
        "balance": 65471,
        "trips": []
    },
]

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("useFetchAllCustomers", () => {

    it("should return correct data after fetch", async () => {
       // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));

        // Execute
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetchAllCustomers()
        );

        // Assert
        expect(result.current).toStrictEqual({
            allCustomers: [],
            errorAllCustomers: false,
        });
    });
})
