import {React, useEffect, useState} from "react";
import {Content, UserInfo} from "./Form.style"

const initialValue = {
    username: "Loading...",
    email: "Loading...",
    totalCost: "Loading...",
    firstTrip: "Loading...",
    totalNumberOfTrips: "Loading...",
    lastTrip: "Loading...",
    balance: "Loading..."
}

export default function User(props) {
    // get user by username
    // Kanske får hämta data redan vid inlogg, 
    // ska ändå hämtas för att kolla om user eller admin
    const [userInfo, setUserInfo] = useState(initialValue);
    let data;

    useEffect(() => {


        if (props.userDetails) {
            data = props.userDetails.data;
        }
        if(data && data.trips) {
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
    }, [props.userDetails])

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
                        <th scope="col">Total kostnad för resor</th>
                        <th scope="col">På kontot</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td data-label="Användarnamn"> {userInfo.username} </td>
                    <td data-label="Första resan"> {userInfo.firstTrip} </td>
                    <td data-label="Senaste Resan"> {userInfo.lastTrip} </td>
                    <td data-label="Antal resor">{userInfo.totalNumberOfTrips} </td>
                    <td data-label="Total kostnad för resor">{userInfo.totalCost}:- </td>
                    <td data-label="På konton">{userInfo.balance}:- </td>
                    </tr>
                </tbody>
                </table>
            </UserInfo>
            }
            
        </Content>
	);
}