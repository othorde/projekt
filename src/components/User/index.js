import {React, useEffect, useState} from "react";
import Api from "../../api";
import {Content, UserInfo} from "./Form.style"

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
                        long: "15.584790"
                    },
                    time: "16:08"
                },
                stop: {
                    position: {
                        lat: "56.164527",
                        long: "15.584790"
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
                        long: "15.584790"
                    },
                    time: "12:04"
                },
                stop: {
                    position: {
                        lat: "56.164527",
                        long: "15.584790"
                    },
                    time: "12:44"
                }
            }
        ],
        balance: "500"
    }
]


const initialValue = {
    username: "Could not get information",
    email: "",
    totalCost: "",
    firstTrip: "",
    lastTrip: "",
    balance: ""
}

export default function User() {
    // get user by username
    // Kanske får hämta data redan vid inlogg, 
    // ska ändå hämtas för att kolla om user eller admin
    const [userInfo, setUserInfo] = useState(initialValue);

    useEffect(() => {
        if (data[0]) {
            data = data[0];
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
                username: data.firstName + " " + data.sirName,
                email: data.email,
                totalCost: totalCost,
                firstTrip: firstTrip,
                totalNumberOfTrips: totalNumberOfTrips,
                lastTrip: lastTrip,
                balance: data.balance
            }));
        } 
    }, [])


	return (
        <Content>   
            <UserInfo> 
                <table>
                <caption>Dina uppgifter</caption>
                <thead>
                    <tr>
                        <th scope="col">Namn</th>
                        <th scope="col">E-post</th>
                        <th scope="col">Första resan</th>
                        <th scope="col">Senaste resan</th>
                        <th scope="col">Antal resor</th>
                        <th scope="col">Total kostnad</th>
                        <th scope="col">På kontot</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td data-label="Namn"> {userInfo.username} </td>
                    <td data-label="Email"> {userInfo.email} </td>
                    <td data-label="Första resan"> {userInfo.firstTrip} </td>
                    <td data-label="Senaste Resan"> {userInfo.lastTrip} </td>
                    <td data-label="Antal resor">{userInfo.totalNumberOfTrips} </td>
                    <td data-label="Total kostnad">{userInfo.totalCost}:- </td>
                    <td data-label="På konton">{userInfo.balance}:- </td>
                    </tr>
                </tbody>
                </table>
            </UserInfo>
        </Content>
	);
}