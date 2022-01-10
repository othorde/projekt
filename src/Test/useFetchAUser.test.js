import { renderHook } from "@testing-library/react-hooks";
import { useFetchAUser } from "../Hooks/useFetchAUser";


const res = {
    "data": {
        "_id": "619b5e6fe8cf630e43c0aff4",
        "username": "alex",
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
    }
}

let trips = [
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




const dataWithNoTrips = {
    "data": {
        "_id": "61a728164706989c7483b637",
        "username": "Oliver",
        "tag": "customer",
        "balance": 65471,
        "trips": []
    }
};

afterEach(() => {
  global.fetch.mockClear();
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("useFetchAUser", () => {

    it("should return correct data after fetch", async () => {
        let fakeid = 1;
        // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(res),
        }));

        // Execute
        const { result, waitForNextUpdate } = renderHook(() =>
        useFetchAUser(fakeid)
        );
        await waitForNextUpdate();

        // Assert
        expect(result.current).toStrictEqual({
        aUser: trips,
        aUserLoading: false,
        aUserMessage: "Loading...",
        });
    });

    it("should display that no trip has been made", async () => {
        let fakeid = 1;
        // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(dataWithNoTrips),
        }));

        // Execute
        const { result, waitForNextUpdate } = renderHook(() =>
        useFetchAUser(fakeid)
        );
        await waitForNextUpdate();

        // Assert
        expect(result.current).toStrictEqual({
        aUser: [],
        aUserLoading: false,
        aUserMessage: "Ingen resa gjord",
        });
    });
})
