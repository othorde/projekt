// import {useState, useEffect } from 'react'
// import Api from '../api';


// export const useFetchACity = (whatcity) => {

// 	const [city, setCity] = useState();
// 	const [loadingCity, setLoadingCity] = useState();
// 	const [messageCity, setMessageCity] = useState();
//     const [charging_posts, setCharging_posts] = useState([])
//     const [allParkingZones, setAllParkingZones] = useState([])

// 	const fetchData = async () => {
//         try {
//             setLoadingCity(true)
//             const allCity = await Api.getACity()

//             if(allCity.length > 0) {
//                 setCity(allCity[0].city);
//                 setCharging_posts(allCity[0].charging_posts);
//                 setAllParkingZones(allCity[0].parking_zones);
//             } else {
//                 setMessageCity("Städerna kunde ej läsas in")
//             }
            
//         } catch (error) {
//             setMessageCity("Något gick fel med hämtningen från servern")
//         }
//         setLoadingCity(false)
//     }
    
// 	/* Kör funktionen  */
// 	useEffect(() => {
// 		fetchData()
// 	}, [])

// 	return {city, charging_posts, allParkingZones, loadingCity, messageCity}
// }








// /* Hämtar städer */
// useEffect(() => {
// 	const getAllCities = async () => {

// 	let allCities = await Api.getAllCitys();
// 	allCities.forEach(element => {
// 		setAllCharging_posts(element.charging_posts)
// 		setAllParkingZones(element.parking_zones)
// 		});
// 	}
// 	getAllCities()
// 	checkAllUsersTrips()

// }, [user, state, loading, error, message])