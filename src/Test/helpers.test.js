import {checkIfCoordInParkingZone, checkIfCoordInChargingPost } from '.././helperfunction/helpers'


describe('tests if helperfunctions can find coords in poly', () => {
    let chargePost= [
        {
            "amount_of_bikes_post": 80,
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
    ]

    let parkZone= [
        {
            "amount_of_bikes_zone": 1,
            "color": "Red",
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
    ]

    it("should be found, (chargepost)", () => {

        let coords = [59.313498299178505, 18.066345798669705]
        let res = checkIfCoordInChargingPost(coords, chargePost);
    
        expect(res.returned).toBe(true);
        expect(res.color).toBe("Green");
        expect(res.amount_of_bikes_post).toBe(80);


    })

    it("should not be found, (chargepost)", () => {

        let coordsfalse = [59.333708679792565, 18.081112703033217]
        let resfalse = checkIfCoordInChargingPost(coordsfalse, chargePost);
    
        expect(resfalse.returned).toBe(false);
        expect(resfalse.color).toBe("");
        expect(resfalse.amount_of_bikes_post).toBe("");


    })

    it("should be found, (parkZone)", () => {

        let coords = [59.313498299178505, 18.066345798669705]
        let res = checkIfCoordInParkingZone(coords, parkZone);
    
        expect(res.returned).toBe(true);
        expect(res.color).toBe("Red");
        expect(res.amount_of_bikes_zone).toBe(1);


    })

    it("should not be found, (parkZone)", () => {

        let coordsfalse = [59.333708679792565, 18.081112703033217]
        let resfalse = checkIfCoordInParkingZone(coordsfalse, parkZone);
    
        expect(resfalse.returned).toBe(false);
        expect(resfalse.color).toBe("");
        expect(resfalse.amount_of_bikes_zone).toBe("");
    })
});
