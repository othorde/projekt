
/* Används av movebike samt history */
/* Loopar igenom alla allÅarkeringszones och kollar coords finns i array
   Gör en array och skickar in till checkIfPointInPolygon för att se om 
   coords finns i polyGon som skickas med. Retunerar zone, som endast är true
   om coord finns i polygon som är parkeringszon
*/
export function checkIfCoordInParkingZone(coords, allParkingZones) {
    let res;
    let zone = {
        returned: false,
        color: "",
        amount_of_bikes_zone: ""
    };

    for (var elem of allParkingZones) {
        let polyGon = [
            [elem.position.polygonePart1.lat,
            elem.position.polygonePart1.lng],
            [elem.position.polygonePart2.lat,
            elem.position.polygonePart2.lng],
            [elem.position.polygonePart3.lat,
            elem.position.polygonePart3.lng],
            [elem.position.polygonePart4.lat,
            elem.position.polygonePart4.lng]
        ]
        res = checkIfPointInPolyGon(coords, polyGon);

        // ändra bara zone om res är true
        if(res === true) {
            zone = {
                returned: true,
                color: elem.color,
                amount_of_bikes_zone: elem.amount_of_bikes_zone
            }
        } else {
            continue
        }
    }
    return zone
}

 /*  Gör samma som ovan fast loopar chargingposts */
export function checkIfCoordInChargingPost(coords, allCharging_posts) {

    let res;
    let zone = {
        returned: false,
        color: "",
        amount_of_bikes_post: ""
    };

    for (var elem of allCharging_posts) {
        let polyGon = [
            [elem.position.polygonePart1.lat,
            elem.position.polygonePart1.lng],
            [elem.position.polygonePart2.lat,
            elem.position.polygonePart2.lng],
            [elem.position.polygonePart3.lat,
            elem.position.polygonePart3.lng],
            [elem.position.polygonePart4.lat,
            elem.position.polygonePart4.lng]
        ]

        res = checkIfPointInPolyGon(coords, polyGon);
        // ändra bara zone om res är true
        if (res === true) {
            zone = {
                returned: true,
                color: elem.color,
                amount_of_bikes_post: elem.amount_of_bikes_post
            }
        } else {
            continue
        }
    }
    return zone;

}

/* Retunerar true/false om punkt finns i polygon */
export function checkIfPointInPolyGon(point, polygone) {
    var pointInPolygon = require('point-in-polygon');
    return pointInPolygon(point, polygone);
}