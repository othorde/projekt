import helpers from '.././helperfunction/helpers'


test('adds 1 + 2 to equal 3', () => {
    let parkzone= [
        {
            "amount_of_bikes_zone": 0,
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

    let coords = {lat:59.33729437740997, lng:18.09945010944404}
    let coordsfalse = {lat:59.333708679792565, lng:18.081112703033217}

    expect(helpers.checkIfCoordInParkingZone(coords, parkzone)).toBe(true);
});
