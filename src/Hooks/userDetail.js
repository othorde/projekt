// kan kolla om set use r är samma som vi hämtar
// för att minska hämtningarna


import {useState, useEffect} from 'react';
import Api from '../api';

let initalValue = {
	showLoadCitys: false,
	city: []
}

const userDetail = () => {
    //sparar res i state, så slipper hämta från servern hela tiden. Kanske ändra om vi ska köra nån realtime
    const[resFromApi, setResFromApi] = useState(null); 
    
    const handleSucces = (res) => {


    };
    // funktion som kan toggla state, från andra komponenter



    useEffect(() => {
        async function fetchData() {
            let res = await Api.getAllCitys();
            setResFromApi(res);
            handleSucces(res)
        }
        fetchData();
    },[mapRef, props.ifToShowCity.loadCity])
    return {cityContent, errorForCity, showInfoForCity};
};
export default userDetail;

