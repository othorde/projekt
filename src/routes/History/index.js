import {React, useState, useEffect, useContext} from "react";

//components
import MapForUser from '../../components/MapForUser/index'
import Loader from '../../components/loader/loader'
//styles
import {Container, Main, UserHistory, MapContainer} from './Form.styles'
//other
import Api from "../../api";
import Appcontext from '../../AppContext'
var pointInPolygon = require('point-in-polygon');

const initialValue = {
    showMap: false,
    startCoord: "",
    stopCoord: "",
}


const History = (props)  => {

    const [userHistory, setUserHistory] = useState([]);
    const [showMapForUser, setShowMapForUser] = useState(initialValue);
    const [message, setMessage] = useState("Loading.....");
    const [allCharging_posts, setAllCharging_posts] = useState([]) //parkering och laddstationer
    const [allParkingZones, setAllParkingZones] = useState([])
    const [userInvoice, setUserInvoice] = useState([])


    const myContext = useContext(Appcontext)
    let user = myContext.userHook;
    let data;
   

    /* Hämtar städer */
    useEffect(() => {
        const getAllCities = async () => {

        let allCities = await Api.getAllCitys();
        allCities.forEach(element => {
            setAllCharging_posts(element.charging_posts)
            setAllParkingZones(element.parking_zones)
            });
        }
        getAllCities()
        checkAllUsersTrips()

    }, [userHistory, setUserHistory])

    /* hämtar användare */
    useEffect(() => {
        async function fetchData() {
            if(user && user.value.id) {
                let id = user.value.id;
                /* Om props läs därifrån */
                if(props && props.customer) {
                    id = props.customer.id;
                }
                let res = await Api.getAUser(id);
                if (res && res.data) {
                    data = res.data;
                    if(data.trips.length > 0) {
                        setUserHistory(data.trips)
                    } else {
                        setMessage("Ingen resa gjord")
                    }
                }
            }
        }
        fetchData();
    }, [user])

    /* Ritar om, om userInvoice ändras */
    useEffect(() => {
    }, [setUserInvoice, userInvoice])

    /* Loopar igenom alla användarens resor och 
        kontrollerar resedetaljer mha de andra funktionerna
    */
    function checkAllUsersTrips() {
        let arrayOfTrips = []
        userHistory.forEach(trip => {
            var startFee = 10;
            var discount = 0;
            let time = getTimeOfTrip(trip.start.time, trip.stop.time)
            let timeFee = 2.5 * time;

            var tripEnded = [trip.stop.position.lat, trip.stop.position.lng];
            var tripStarted = [trip.start.position.lat, trip.start.position.lng];
            var startAtParkingZone = checkIfCoordInParkingZone(tripStarted);
            var endedAtParkingZone = checkIfCoordInParkingZone(tripEnded);
            var startChargePoint = checkIfCoordInChargingPost(tripStarted);
            var endedAtChargePoint = checkIfCoordInChargingPost(tripEnded);

            /* Om en resa börjar i fri parkering och slutar på en definerad blir startavg lägre */
            if(startAtParkingZone === undefined || startChargePoint === undefined) {
                if (endedAtParkingZone === true || endedAtChargePoint === true) {
                    startFee = 8;
                    discount = 2;
                }
            }
            console.log(endedAtParkingZone, endedAtChargePoint)
            /* extra avg om man ej lämnar inom stationerna */
            if(endedAtParkingZone === undefined && endedAtChargePoint === undefined) {
                startFee = 12;
            }

            const atrip = { 
				tripId: trip.id,
                date: trip.date,
                startTime: trip.start.time,
                stopTime: trip.stop.time,
                tripStartedPos: tripStarted,
                tripEndedPos: tripEnded,
                startAtParkingZone: startAtParkingZone,
                endedAtParkingZone: endedAtParkingZone,
                startChargePoint: startChargePoint,
                endedAtChargePoint: endedAtChargePoint,
                timeOfTrip: time,
                startFee: startFee,
                timeFee: timeFee,
                discount: discount,
                totalCost: (timeFee + startFee)
            }
            arrayOfTrips.push(atrip);
        })
        setUserInvoice(arrayOfTrips)
        return userInvoice
    }

    /*  loopara igenom alla chargingposts, 
        ser om koordinaterna finns inuti polygon,
        retunerar endast true */
    function checkIfCoordInParkingZone(tripEnded) {
        let res;
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
            res = checkIfPointInPolyGon(tripEnded, polyGon);

            if(res === true) {
                return true
            }
        }
    }

    /*  loopara igenom alla chargingposts,
        ser om koordinaterna finns inuti polygon,
        retunerar endast true */
    function checkIfCoordInChargingPost(tripEnded) {
        let res;
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
            res = checkIfPointInPolyGon(tripEnded, polyGon);

            if(res === true) {
                return true
            }
       } 
    }

    /* Räknar ut tiden för resan, gör om till sekunder 
        subtraherar och dividerar för att få ut minuter
    */
    function getTimeOfTrip(starttime, stoptime) {

        var arrStarttime = starttime.split(".");
        var arrStoptime = stoptime.split("."); 

        arrStarttime[0] = arrStarttime[0] * 60 * 60;
        arrStarttime[1] = arrStarttime[1] * 60;
        arrStoptime[0] = arrStoptime[0] * 60 * 60;
        arrStoptime[1] = arrStoptime[1] * 60;
        
        var stopTime = arrStoptime[0] + arrStoptime[1];
        var startTime = arrStarttime[0] + arrStarttime[1];
        var time = (stopTime - startTime) / 60;

        return time
    }
    /* Retunerar true/false om punkt finns i polygon */
    function checkIfPointInPolyGon(point, polygone) {

        return pointInPolygon(point, polygone);
    }


    /*  visa kartar upp karta, beroende på var användaren klickar */
    function showMap(startCoord, stopCoord, e) {
        console.log(startCoord, stopCoord)
        let pageY = e.pageY;
            if(props && props.customer) {
                pageY = pageY - 200;
            }


        setShowMapForUser({
            showMap: !showMapForUser.showMap,
            startCoord: startCoord,
            stopCoord: stopCoord,
            pageY: pageY
        })
    }
    /* ritar om  */
    useEffect(() => {
    }, [showMapForUser, setShowMapForUser])

	return (
        <Container>  
            <Main showMap = {showMapForUser.showMap} >
                <UserHistory> 
                {userInvoice.length > 0 ? (
                <table>
                    <caption> Historik </caption>
                    <thead>
                        <tr>
                            <th scope="col">Datum</th>
                            <th scope="col">Starttid</th>
                            <th scope="col">Sluttid</th>
                            <th scope="col">Total tid</th>
                            <th scope="col">Start avgift</th>
                            <th scope="col">Rabatt</th>
                            <th scope="col">Tid avgift</th>
                            <th scope="col">Visa på karta</th>
                            <th scope="col">Total kostnad</th>

                        </tr>
                    </thead>
                    <tbody>
                        {userInvoice.map(elem => 
                        <tr>
                            <td data-label="Datum"> {elem.date} </td>
                            <td data-label="Starttid">{elem.startTime} </td>
                            <td data-label="Sluttid">{elem.stopTime} </td>
                            <td data-label="Total tid">{elem.timeOfTrip} min </td>
                            <td data-label="Start avgift" >{elem.startFee}:-</td>
                            <td data-label="Rabatt">{elem.discount}:- </td>
                            <td data-label="Minutpris">{elem.timeFee}:- </td>
                            <td data-label="Visa på karta" >
                            { <button className="button vertical-align:middle" onClick={(e) => 
                                showMap(elem.tripStartedPos, elem.tripEndedPos, e)}><span>Färd </span></button>}
                            </td>
                            <td data-label="Total kostnad">{elem.totalCost}:- </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                    ) : (

                       <Loader> <p>{message}</p> </Loader>

                    )}
                </UserHistory>
            </Main>
            <MapContainer showMap = {showMapForUser.showMap} pageY={showMapForUser.pageY} >
                {showMapForUser.showMap &&
                    <MapForUser showMapForUser = {showMapForUser}> </MapForUser>
                }
            </MapContainer>


        </Container>
    )
}

export default History







