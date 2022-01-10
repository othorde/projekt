import { renderHook } from "@testing-library/react-hooks";
import { useFetchAllCities } from "../Hooks/useFetchAllCities";


afterEach(() => {
    global.fetch.mockClear();
  });
  
  afterAll(() => {
    global.fetch.mockRestore();
  });

const data = [
    {
        "_id": "61bb46c2eae13a828da83b24",
        "city": "Göteborg",
        "amount_of_bikes": 0,
        "position": {
            "polygonePart1": {
                "lat": 57.697371,
                "lng": 11.919066
            },
            "polygonePart2": {
                "lat": 57.706604,
                "lng": 11.991612
            },
            "polygonePart3": {
                "lat": 57.677011,
                "lng": 12.008765
            },
            "polygonePart4": {
                "lat": 57.675208,
                "lng": 11.942541
            }
        },
        "parking_zones": [
            {
                "amount_of_bikes_zone": 0,
                "color": "DarkSlateGrey",
                "position": {
                    "polygonePart1": {
                        "lat": 57.698379,
                        "lng": 11.970003
                    },
                    "polygonePart2": {
                        "lat": 57.697318,
                        "lng": 11.970582
                    },
                    "polygonePart3": {
                        "lat": 57.697662,
                        "lng": 11.974155
                    },
                    "polygonePart4": {
                        "lat": 57.699158,
                        "lng": 11.972095
                    }
                }
            },
        ]
    },
];



describe("useFetchAllCities", () => {

    it("should producec error msg", async () => {
       // Mock API
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));

        // Execute
        const { result, waitForNextUpdate } = renderHook(() =>
            useFetchAllCities()
        );
        await waitForNextUpdate();

        // Assert
        expect(result.current).toStrictEqual({
            cities: undefined,
            loadingCities: false,
            messageCities: "Något gick fel med hämtningen från servern"
        });
    });
})
