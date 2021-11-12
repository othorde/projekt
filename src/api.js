
import useSwr from "swr";

const Api =  {

    GetCrimes: async ()=> {
        const url = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01"
        const fetcher = (...args) => fetch(...args).then(response => response.json()); //gör om denna sen
        const {data, error} = useSwr(url, fetcher) //gör om denna sen
        const crimes = data && !error ? data.slice(0, 200) : [];

        return crimes;

    },

    
	getAllCrimes: async () => {
		const endpoint = "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01"
		let res = await (await fetch(endpoint)).json();
        return res
	},



}

export default Api
