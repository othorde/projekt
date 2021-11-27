import {React, useState, useEffect} from "react";
//styles
import {Container, Main, MainBlock, UserHistory, MapContainer} from './Form.styles'
import MapForUser from '../../components/MapForUser/index'



let data = [
    {
        id: "1",
        tag: "customer",
        firstName: "Johanna",
        sirName: "Persson",
        email: "johanna@example.se",
        trips: [
            {
                id: "1",
                date: "2021-11-08",
                price: "25",
                start: {
                    position: {
                        lat: "56.164527",
                        lng: "15.584790"
                    },
                    time: "16:08"
                },
                stop: {
                    position: {
                        lat: "56.164527",
                        lng: "15.584790"
                    },
                    time: "16:22"
                }
            },
            {
                id: "2",
                date: "2021-11-09",
                price: "55",
                start: {
                    position: {
                        lat: "56.164527",
                        lng: "15.584790"
                    },
                    time: "12:04"
                },
                stop: {
                    position: {
                        lat: "56.164527",
                        lng: "15.584790"
                    },
                    time: "12:44"
                }
            },
                        {
                id: "2",
                date: "2021-11-09",
                price: "55",
                start: {
                    position: {
                        lat: "56.164527",
                        lng: "15.584790"
                    },
                    time: "12:04"
                },
                stop: {
                    position: {
                        lat: "56.174671",
                        lng: "15.600234"     
                    },    
                    time: "12:44"
                } 

            },
        ],
        balance: "500"
    }
]


const initialValue = {
    showMap: false,
    startCoord: "",
    stopCoord: "",
}

const History  = ()  => {

    const [userHistory, setUserHistory] = useState([]);
    const [showMapForUser, setShowMapForUser] = useState(initialValue);



    useEffect(() => {
        console.log(data[0])

        if (data[0]) {
            data = data[0];
        }
        setUserHistory(data.trips)
        console.log(userHistory)
    }, [])


    // räknar ut tiden som resan tog
    const calculateTravelTime = (startTime, stopTime) => {
        let hours;
        let minutes;
        let splitStart;
        let splitStop;

        if (startTime && stopTime) {
        
            splitStart = startTime.split(":");
            splitStop = stopTime.split(":");
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
    function showMap(startCoord, stopCoord) {
        setShowMapForUser({
            showMap: !showMapForUser.showMap,
            startCoord: startCoord,
            stopCoord: stopCoord
        })
    }

    useEffect(() => {

      
    }, [showMapForUser, setShowMapForUser])

	return (
        <Container>  
            <Main>
            {showMapForUser.showMap }
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
                    {userHistory.map(elem => 
                        <tr>
                        <td data-label="Datum"> {elem.date} </td>
                        <td data-label="Starttid"> {elem.start.time} </td>
                        <td data-label="Sluttid">{elem.stop.time} </td>
                        <td data-label="Total tid">{calculateTravelTime(elem.start.time, elem.stop.time)} </td>
                        <td data-label="Visa på karta" >
                            {<button className="button vertical-align:middle"  onClick={() => 
                            showMap(elem.start.position, elem.stop.position)}><span>Färd </span></button>}
                        </td>
                      
                        <td data-label="Kostnad">{elem.price}:- </td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                    
                </UserHistory>
            </Main>
            <MapContainer>
                {showMapForUser.showMap &&
                <MapForUser showMapForUser = {showMapForUser}> här </MapForUser>
                }
            </MapContainer>
        </Container>
    )
}

export default History







