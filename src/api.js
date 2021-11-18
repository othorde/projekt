
import { API_URL } from "./config";
const Api =  {

    // GetCrimes: async ()=> {
    //     const url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01"
    //     const fetcher = (...args) => fetch(...args).then(response => response.json()); //gör om denna sen
    //     const {data, error} = useSwr(url, fetcher) //gör om denna sen
    //     const crimes = data && !error ? data.slice(0, 200) : [];

    //     return crimes;

    // },



    getAllCitys: async () => {
        try {
            const endpoint = `${API_URL}/cities`;
            let res = await (await fetch(endpoint)).json();
            return res.data
        } catch (error) {
            console.log(error)
        }
	},

    getAllScooters: async () => {
        try {
            const endpoint = `${API_URL}/scooter`;
            let res = await (await fetch(endpoint)).json();
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
	},

    getAllCitys2: async () => {
        const data = [
            {
                _id: "1231231",
                city: " Åhus",
                amount_of_bikes: "10",
                position: {
                    polygonePart1: {
                        lat: 56.012562,
                        lng: 14.115424 
                    },
                    polygonePart2: {
                        lat: 55.925155,
                        lng: 14.073078 
                    },
                    polygonePart3: {
                        lat: 55.931968,
                        lng: 14.289134 
                    },
                    polygonePart4: {
                        lat: 56.037256,
                        lng: 14.306297 
                    },
                },
            },
            {
                _id: "123123221",
                city: " Stockholm",
                amount_of_bikes: "100",
                position: {
                    polygonePart1: {
                        lat: 59.389894,
                        lng: 17.875983 
                    },
                    polygonePart2: {
                        lat: 59.152629,
                        lng: 17.868818
                    },
                    polygonePart3: {   
                        lat: 59.189469,
                        lng: 18.319379
                    },
                    polygonePart4: {
                        lat: 59.484114,     
                        lng: 18.359537
                    }
                }
            }
        ]
        return data
	},
}

export default Api
