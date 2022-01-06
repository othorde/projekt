import {React, useState, useEffect} from "react";

//components
import MapForUser from '../../components/MapForUser/index'
import Loader from '../../components/Loader'
// hook
import {useFetchAUser} from '../../Hooks/useFetchAUser'
import {useFetchAllCities} from '../../Hooks/useFetchAllCities'
//styles
import {Container, Main, UserHistory, MapContainer} from './Form.styles'
//other
import {checkIfCoordInParkingZone, checkIfCoordInChargingPost } from '../../helperfunction/helpers'
const { v4: uuidv4 } = require('uuid');

const initialValue = {
    showMap: false,
    startCoord: "",
    stopCoord: "",
}

/* Tar props, använder id för att hämta info om användare.  */
const History = ({user, customer})  => {
    let theUser;
    let id;
 
    // Kollar om props finns, skickar in props från två olika komponenter, sätter alltid id.     
    if(user) {
        theUser = user;
        id = user.value.id
    } else {
        id = customer.id;
    }
    console.log(id)
    const {aUser, aUserMessage, aUserLoading} = useFetchAUser(id);
    const {cities, messageCities, loadingCities} = useFetchAllCities(); 
    const [showMapForUser, setShowMapForUser] = useState(initialValue);
    const [allCharging_posts, setAllCharging_posts] = useState([]); //parkering 
    const [allParkingZones, setAllParkingZones] = useState([]); // laddstationer
    const [userInvoice, setUserInvoice] = useState([]); // Alla uppg som visas




    /* Rendera och kör funktioner vid mount och om något i arrayn ändras */
    useEffect(() => {

        /* Kollar om cities är satt, Loopa städer, sätt värden till state */
        const getAllCities = async () => {
            cities && cities.forEach(city => {
                city.charging_posts.length > 0 && (setAllCharging_posts(city.charging_posts));
                city.parking_zones.length > 0 && (setAllParkingZones(city.parking_zones));
            });
        }

        /* "huvudfunktion" Loopar igenom alla användarens resor och 
            kontrollerar resedetaljer mha de andra funktionerna
            för att skapa invoice/info om resa
        */
        function checkAllUsersTrips() {

            let arrayOfTrips = [];
            let time;
            let tripEnded;
            let tripStarted;
            let startAtParkingZone;
            let endedAtParkingZone;
            let startChargePoint;
            let endedAtChargePoint;
            let prices;

            aUser.forEach(trip => {
                time = getTimeOfTrip(trip.start.time, trip.stop.time)
                tripEnded = [trip.stop.position.lat, trip.stop.position.lng];
                tripStarted = [trip.start.position.lat, trip.start.position.lng];
                startAtParkingZone = checkIfCoordInParkingZone(tripStarted, allParkingZones);
                endedAtParkingZone = checkIfCoordInParkingZone(tripEnded, allParkingZones);
                startChargePoint = checkIfCoordInChargingPost(tripStarted, allCharging_posts);
                endedAtChargePoint = checkIfCoordInChargingPost(tripEnded, allCharging_posts);
                prices = checkUserPrices(startAtParkingZone, startChargePoint, endedAtParkingZone, endedAtChargePoint, time);

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
                    startFee: prices.startFee,
                    timeFee: prices.minFee,
                    discount: prices.discount,
                    totalCost: (prices.minFee + prices.startFee)
                }
                arrayOfTrips.push(atrip);
            })
            setUserInvoice(arrayOfTrips)
        }

        getAllCities()
        checkAllUsersTrips()
    }, [theUser, aUser, aUserMessage, cities, loadingCities, aUserLoading, allCharging_posts, allParkingZones])

    /* rita om, om något i arrayn ändras */
    useEffect(() => {
    }, [setUserInvoice, userInvoice, showMapForUser, setShowMapForUser])

    
    /* Räknar ut kunds pris */
    const checkUserPrices = (startAtParkingZone, startChargePoint, endedAtParkingZone, endedAtChargePoint, time) => {

        let prices = {
            startFee: 10,
            discount: 0,
            minFee: 2.5 * time,
        }

        /* Om en resa startar i fri parkering och slutar på en definerad blir startavg lägre */
        if((startAtParkingZone && startAtParkingZone.returned === false)
        || (startChargePoint && startChargePoint.returned === false)) {
            if ((endedAtParkingZone && endedAtParkingZone.returned === true) 
            || (endedAtChargePoint && endedAtChargePoint.returned === true)) {
                prices.startFee = 8;
                prices.discount = 2;
                return prices
            }
        }
        /* startavg högre (12:-) om man friparkerar dvs ej lämnar inom park eller laddstation */
        if((endedAtParkingZone && endedAtParkingZone.returned === false)
            && (endedAtChargePoint && endedAtChargePoint.returned === false)) {
                prices.startFee = 12;
                return prices
            }
        return prices
    }

    /* Räknar ut tiden för resan, gör om till sekunder 
       subtraherar och dividerar för att få ut minuter
    */
    const getTimeOfTrip = (starttime, stoptime) => {
        
        var arrStarttime;
        var arrStoptime;
        var stopTime;
        var startTime;
        var time;
   
        arrStarttime = starttime.split(".");
        arrStoptime = stoptime.split("."); 
        arrStarttime[0] = arrStarttime[0] * 60 * 60;
        arrStarttime[1] = arrStarttime[1] * 60;
        arrStoptime[0] = arrStoptime[0] * 60 * 60;
        arrStoptime[1] = arrStoptime[1] * 60;
        stopTime = arrStoptime[0] + arrStoptime[1];
        startTime = arrStarttime[0] + arrStarttime[1];
        time = (stopTime - startTime) / 60;

        return time
    }

    /*
        Tar props som visar var användaren trycker på skärmen med musen.
        Sparar koordinaterna för att visa upp kartan i närheten där man tryckte.
        Då ser man enkelt kartan vid ex mobilläge.
        (om props finns)
    */
    const showMap = (startCoord, stopCoord, e) => {

        let pageY = e.pageY;
        customer && (pageY = pageY - 200);
        
        setShowMapForUser({
            showMap: !showMapForUser.showMap,
            startCoord: startCoord,
            stopCoord: stopCoord,
            pageY: pageY
        })
    }

    /* Retunerar table, men visar loading komponent om loadingCities eller aUserLoading ej är klar */
	return (
        <Container>  
            <Main showMap = {showMapForUser.showMap} >
                <UserHistory> 
                    { !loadingCities && !aUserLoading ? (
                        <table>
                            <caption> Historik </caption>
                            <thead>
                                <tr key={uuidv4()}>
                                    <th scope="col">Datum</th>
                                    <th scope="col">Starttid</th>
                                    <th scope="col">Sluttid</th>
                                    <th scope="col">Total tid</th>
                                    <th scope="col">Visa färd på karta</th>
                                    <th scope="col">Start avgift</th>
                                    <th scope="col">Rabatt</th>
                                    <th scope="col">Tid avgift</th>
                                    <th scope="col">Total kostnad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInvoice.length > 0 ? userInvoice.map(elem => 
                                <tr key={uuidv4()}>
                                    <td data-label="Datum"> {elem.date}</td>
                                    <td data-label="Starttid">{elem.startTime}</td>
                                    <td data-label="Sluttid">{elem.stopTime}</td>
                                    <td data-label="Total tid">{elem.timeOfTrip} min</td>
                                    <td data-label="Visa färd på karta">
                                    { <button className="button vertical-align:middle" onClick={(e) => 
                                        showMap(elem.tripStartedPos, elem.tripEndedPos, e)}><span>Färd </span></button>}
                                    </td>
                                    <td data-label="Start avgift" >{elem.startFee}:-</td>
                                    <td data-label="Rabatt">{elem.discount}:-</td>
                                    <td data-label="Minutpris">{elem.timeFee}:-</td>
                                    <td data-label="Total kostnad">{elem.totalCost}:- </td>
                                </tr>
                                ):  
                                <tr key={uuidv4()}>
                                </tr>}
                            </tbody>
                        </table>
                    ) : ( <Loader> <p>{aUserMessage || messageCities}</p> </Loader> )}
                </UserHistory>
            </Main>
            <MapContainer showMap = {showMapForUser.showMap} pageY={showMapForUser.pageY} >
                {showMapForUser.showMap && <MapForUser showMapForUser = {showMapForUser}> </MapForUser>}
            </MapContainer>
        </Container>
    )
}

export default History
