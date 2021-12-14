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

const initialValue = {
    showMap: false,
    startCoord: "",
    stopCoord: "",
}

const History = (props)  => {
    let user;
    let id;
    
    // För att bestämma vilka props som ska användas
    if(props && props.user) {
        user = props.user;
        id = props.user.value.id
    } else if ( props && props.customer) {
        id = props.customer.id;
    }

    const {aUser, aUserMessage, aUserLoading} = useFetchAUser(id);
    const {cities, messageCities, loadingCities} = useFetchAllCities(); 
    const [showMapForUser, setShowMapForUser] = useState(initialValue);
    const [allCharging_posts, setAllCharging_posts] = useState([]); //parkering 
    const [allParkingZones, setAllParkingZones] = useState([]); // laddstationer
    const [userInvoice, setUserInvoice] = useState([]); // Alla uppg som visas

    /* Loopa städer, sätt värden till state */
    const getAllCities = async () => {
        if (cities) {
            cities.forEach(city => {
                setAllCharging_posts(city.charging_posts);
                setAllParkingZones(city.parking_zones);
            });
        }
    }

    /* Rendera */
    useEffect(() => {
        getAllCities()
        checkAllUsersTrips()
    }, [user, aUser, aUserMessage, cities, loadingCities, aUserLoading])

    /* rendera om setUserInvoice ändras */
    useEffect(() => {
    }, [setUserInvoice, userInvoice, showMapForUser, setShowMapForUser])


    /* "huvudfunktion" Loopar igenom alla användarens resor och 
        kontrollerar resedetaljer mha de andra funktionerna
    */
        function checkAllUsersTrips() {

            let arrayOfTrips = []
            aUser.forEach(trip => {
    
                let time = getTimeOfTrip(trip.start.time, trip.stop.time)
                let tripEnded = [trip.stop.position.lat, trip.stop.position.lng];
                let tripStarted = [trip.start.position.lat, trip.start.position.lng];
                let startAtParkingZone = checkIfCoordInParkingZone(tripStarted, allParkingZones);
                let endedAtParkingZone = checkIfCoordInParkingZone(tripEnded, allParkingZones);
                let startChargePoint = checkIfCoordInChargingPost(tripStarted, allCharging_posts);
                let endedAtChargePoint = checkIfCoordInChargingPost(tripEnded, allCharging_posts);
                let prices = checkUserPrices(startAtParkingZone, startChargePoint, endedAtParkingZone, endedAtChargePoint, time);
    
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

    /* Räknar ut kunds pris */
    const checkUserPrices = (startAtParkingZone, startChargePoint, endedAtParkingZone, endedAtChargePoint, time) => {

            let prices = {
                startFee: 10,
                discount: 0,
                minFee: 2.5 * time,
            }
        
            /* Om en resa börjar i fri parkering och slutar på en definerad blir startavg lägre */
            if((startAtParkingZone && startAtParkingZone.returned === false)
            || (startChargePoint && startChargePoint.returned === false)) {
                if ((endedAtParkingZone && endedAtParkingZone.returned === true) 
                || (endedAtChargePoint && endedAtChargePoint.returned === true)) {
                    prices.startFee = 8;
                    prices.discount = 2;
                    return prices
                }
            }

            /* startavg högre (12) om man ej lämnar inom stationerna */
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

    /*  visa upp karta, beroende på var användaren klickar på skärmen
        det gör att kartan enkelt ses när mna trycker på den och
        man ex är i mobilläge
    */
    function showMap(startCoord, stopCoord, e) {

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

    /* Retunerar, men visar "loading" om userInvoice, loadingCities eller aUserLoading ej är klar */
	return (
        <Container>  
            <Main showMap = {showMapForUser.showMap} >
                <UserHistory> 
                    {userInvoice.length > 0 && !loadingCities && !aUserLoading ? (
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
                            <tr key={elem.id}>
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
                        <Loader> <p>{aUserMessage || messageCities}</p> </Loader>
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
