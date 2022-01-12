
import { 
    getAUser,
    getAllUsers,
    getACity,
    getAllCitys,
    getAllScooters,
    getAllChargePost,
    updateAScooter,
    logginUserViaGit,
    updateAScootersUser,
    updateAScootersLogg,
    updateUserFunds,
    updateNrBikesChargePost,
    updateNrBikesParkZone,
    } from ".././Api";

const data = {
    "data": {
        "_id": "619b5e6fe8cf630e43c0aff4",
        "username": "testsson",
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

const data2 = {
    "data": [
        {
            "amount_of_bikes_post": 5,
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
            "amount_of_bikes_post": 19,
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


afterEach(() => {
    global.fetch.mockClear();
});
  
afterAll(() => {
global.fetch.mockRestore();
});

describe( "testing Api",() => {

    it("getAUser should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));
        const getFakeUser = await getAUser("fakeid");
    
        expect(getFakeUser).toEqual(data);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("getAUser should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const getFakeUser = await getAUser("fakeid");
    
        expect(getFakeUser).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("getAllUsers should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));
        const getAllFakeUsers = await getAllUsers();
    
        expect(getAllFakeUsers).toEqual(data);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("getAllUsers should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const getAllFakeUsers = await getAllUsers();
    
        expect(getAllFakeUsers).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("getACity should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));
        const getAFakeCity = await getACity("fakeCity");
    
        expect(getAFakeCity).toEqual(data.data);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("getACity should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const getAFakeCity = await getACity("fakeCity");
    
        expect(getAFakeCity).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("getAllCitys should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));
        const getAllFakeCity = await getAllCitys();
    
        expect(getAllFakeCity).toEqual(data.data);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("getAllCitys should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const getAllFakeCity = await getAllCitys();
    
        expect(getAllFakeCity).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    
    it("getAllScooters should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        }));
        const getAllFakeScooters = await getAllScooters();
    
        expect(getAllFakeScooters).toEqual(data.data);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("getAllScooters should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const getAllFakeScooters = await getAllScooters();
    
        expect(getAllFakeScooters).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("getAllChargePost should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data2),
        }));
        const getAllFakeChargePost = await getAllChargePost("Stockholm", "Green");
    
        expect(getAllFakeChargePost).toEqual(data2.data[0].amount_of_bikes_post);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("getAllChargePost should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const getAllFakeChargePost = await getAllChargePost();
    
        expect(getAllFakeChargePost).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("logginUserViaGit should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve("fakeinfo"),
        }));
        const fakeLogginUserViaGit = await logginUserViaGit("fakeusername");
    
        expect(fakeLogginUserViaGit).toEqual("fakeinfo");
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    
    it("logginUserViaGit should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeLogginUserViaGit = await logginUserViaGit("fakeusername");
    
        expect(fakeLogginUserViaGit).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateAScooter should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({data: {result: "Object: fakeid updated"}}),
        }));
        const fakeupdateAScooter = await updateAScooter("fakeid", 2, 100, "fake", "faketoken");
    
        expect(fakeupdateAScooter).toEqual(true);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateAScooter should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeupdateAScooter = await updateAScooter("fakeid", 2, 100, "fake", "faketoken");
        expect(fakeupdateAScooter).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateAScootersUser should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({data: {result: "Object: fakeid updated"}}),
        }));
        const fakeupdateAScootersUser = await updateAScootersUser("fakeid", "faketoken");
    
        expect(fakeupdateAScootersUser).toEqual(true);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateAScootersUser should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeupdateAScootersUser = await updateAScootersUser("fakeid", "faketoken");
        expect(fakeupdateAScootersUser).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("updateAScootersLogg should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({data: {result: "Object: fakeid updated"}}),
        }));
        const fakeupdateAScootersLogg = await updateAScootersLogg({id: "fakeid"}, "faketoken");
    
        expect(fakeupdateAScootersLogg).toEqual(true);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateAScootersLogg should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeupdateAScootersLogg = await updateAScootersLogg("fakeid", "faketoken");
        expect(fakeupdateAScootersLogg).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateUserFunds should return correct data", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({data: {result: "Object: fakeid updated"}}),
        }));
        const fakeupdateUserFunds = await updateUserFunds("fakebalance", "fakeid", "faketoken");
    
        expect(fakeupdateUserFunds).toEqual(true);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateUserFunds should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeupdateUserFunds = await updateUserFunds("fakebalance", "fakeid", "faketoken");
        expect(fakeupdateUserFunds).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });


    it("updateNrBikesChargePost should return correct data", async () => {
        let city = "Stockholm"
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({data: {result: `City post: ${city} updated`}}),
        }));
        const fakeupdateNrBikesChargePost = await updateNrBikesChargePost(city, "4", "red", "faketoken");
    
        expect(fakeupdateNrBikesChargePost).toEqual(true);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateNrBikesChargePost should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeupdateNrBikesChargePost = await updateNrBikesChargePost("Stockholm", "4", "red", "faketoken");
        expect(fakeupdateNrBikesChargePost).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateNrBikesParkZone should return correct data", async () => {
        let city = "Stockholm"
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({data: {result: `City zone: ${city} updated`}}),
        }));
        const fakeupdateNrBikesParkZone = await updateNrBikesParkZone(city, "4", "red", "faketoken");
    
        expect(fakeupdateNrBikesParkZone).toEqual(true);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("updateNrBikesParkZone should return false when promise reject", async () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.reject(),
        }));
        const fakeupdateNrBikesParkZone = await updateNrBikesParkZone("Stockholm", "4", "red", "faketoken");
        expect(fakeupdateNrBikesParkZone).toEqual(false);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

})
