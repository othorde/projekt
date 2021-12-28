import {React, useEffect, useState} from "react";
import {Content, UserInfo} from "./Form.style"

/* sätter alla värden initialt till loading, i väntan på att den ska bli klar */
const initialValue = {
    username: "Loading...",
    email: "Loading...",
    totalCost: "Loading...",
    firstTrip: "Loading...",
    totalNumberOfTrips: "Loading...",
    lastTrip: "Loading...",
    balance: "Loading..."
}

export default function User({userDetails}) {

    const [userInfo, setUserInfo] = useState(initialValue);
    /* vid mount och om userDetails ändras så sätt värden. 
       Sätter generaliserade värden och senare specifika om användaren gjort resor
    */
    useEffect(() => {
        let data;
        if (userDetails) {
            data = userDetails.data;
            setUserInfo(({
                username: data.username,
                totalCost: "0",
                firstTrip: "Du har ännu inte gjort någon resa",
                totalNumberOfTrips: "Du har ännu inte gjort någon resa ",
                lastTrip: "Du har ännu inte gjort någon resa ",
                balance: data.balance
            }));
        }
        if(data && data.trips.length > 0) {
            let totalCost = 0;
            let firstTrip;
            let totalNumberOfTrips;
            let lastTrip;

            data.trips.forEach(elem => {
                totalCost += parseInt(elem.price);
            });
            
            firstTrip = data.trips[0].date;
            totalNumberOfTrips = data.trips.length;
            lastTrip = data.trips[totalNumberOfTrips-1].date;

            setUserInfo(({
                username: data.username,
                totalCost: totalCost,
                firstTrip: firstTrip,
                totalNumberOfTrips: totalNumberOfTrips,
                lastTrip: lastTrip,
                balance: data.balance
            }));
        } 
    }, [userDetails])

    /* Populerar tabell */
	return (
        <Content>
            {
            <UserInfo> 
                <table>
                <caption>Dina uppgifter</caption>
                <thead>
                    <tr>
                        <th scope="col">Användarnamn</th>
                        <th scope="col">Första resan</th>
                        <th scope="col">Senaste resan</th>
                        <th scope="col">Antal resor</th>
                        <th scope="col">På kontot</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={userInfo.username}>
                    <td data-label="Användarnamn"> {userInfo.username} </td>
                    <td data-label="Första resan"> {userInfo.firstTrip} </td>
                    <td data-label="Senaste resan"> {userInfo.lastTrip} </td>
                    <td data-label="Antal resor">{userInfo.totalNumberOfTrips} </td>
                    <td data-label="På kontot">{userInfo.balance}:- </td>
                    </tr>
                </tbody>
                </table>
            </UserInfo>
            }
        </Content>
	);
}