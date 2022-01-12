import {useState, useEffect } from 'react'
import {getAllCitys} from '../Api';

/* Hämtar alla städer */
export const  useFetchAllCities = () => {

	const [cities, setCities] = useState();
	const [loadingCities, setLoadingCities] = useState();
	const [messageCities, setMessageCities] = useState();

	const fetchData = async () => {
        try {
            setLoadingCities(true)
            const allCities = await getAllCitys()
            allCities.length > 0 ? setCities(allCities) : setMessageCities("Städerna kunde ej läsas in");
            
        } catch (error) {
            setMessageCities("Något gick fel med hämtningen från servern")
        }
        setLoadingCities(false)
    }
    
	/* Kör funktionen endast vid mount */
	useEffect(() => {
		fetchData()
	}, [])

	return {cities, loadingCities, messageCities}
}








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