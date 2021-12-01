import {React, useState, useEffect} from "react";

//components
import MapForUser from '../../components/MapForUser/index'
import Api from "../../api";
//styles
import {Container, Main, UserHistory, MapContainer} from './Form.styles'


const initialValue = {
    showMap: false,
    startCoord: "",
    stopCoord: "",
}

const History  = ()  => {

    const [userHistory, setUserHistory] = useState([]);
    const [showMapForUser, setShowMapForUser] = useState(initialValue);
    let data;

    useEffect(() => {

        async function fetchData() {
            let res = await Api.getAUser("619b5e6fe8cf630e43c0aff4");
            console.log(data)
            if (res && res.data) {
                data = res.data;
                setUserHistory(data.trips)
            }
        }
        fetchData();
    }, [])


    // räknar ut tiden som resan tog
    const calculateTravelTime = (startTime, stopTime) => {
        let hours;
        let minutes;
        let splitStart;
        let splitStop;

        if (startTime && stopTime) {
        
            splitStart = startTime.split(".");
            splitStop = stopTime.split(".");
            hours = splitStop[0] - splitStart[0];
            minutes = splitStop[1] - splitStart[1];

            if (hours !== 0) {
                return `${hours} h ${minutes} min`
            } 
            return `${minutes} min`
        } 
        return `hmm, något gick snett`
    }
    /// visa karta
    function showMap(startCoord, stopCoord, e) {
        setShowMapForUser({
            showMap: !showMapForUser.showMap,
            startCoord: startCoord,
            stopCoord: stopCoord,
            pageY: e.pageY
        })
    }

    useEffect(() => {
      
    }, [showMapForUser, setShowMapForUser])

	return (
        <Container>  
            <Main showMap = {showMapForUser.showMap} >
                <UserHistory> 
                    <table>
                    <caption>Din Historik</caption>
                    <thead>
                        <tr>
                            <th scope="col">Datum</th>
                            <th scope="col">Starttid</th>
                            <th scope="col">Sluttid</th>
                            <th scope="col">Total tid</th>
                            <th scope="col">Visa på karta</th>
                            <th scope="col">Kostnad</th>
                        </tr>
                    </thead>
                    <tbody>
                    {userHistory.length > 0 ? (
                    userHistory.map(elem => 
                        <tr>
                        <td data-label="Datum"> {elem.date}  </td>
                        <td data-label="Starttid"> {elem.start.time} </td>
                        <td data-label="Sluttid">{elem.stop.time} </td>
                        <td data-label="Total tid">{calculateTravelTime(elem.start.time, elem.stop.time)} </td>
                        <td data-label="Visa på karta" >
                            { <button className="button vertical-align:middle" onClick={(e) => 
                            showMap(elem.start.position, elem.stop.position, e)}><span>Färd </span></button>}
                        </td>
                        <td data-label="Kostnad">{elem.price}:- </td>
                        </tr>
                    )
                    ) : (<p> Loading.... </p>)}
                    </tbody>
                    </table>
                </UserHistory>
            </Main>
            <MapContainer  showMap = {showMapForUser.showMap} pageY={showMapForUser.pageY} >
                {showMapForUser.showMap &&
                    <MapForUser showMapForUser = {showMapForUser}> </MapForUser>
                }
            </MapContainer>
        </Container>
    )
}

export default History







