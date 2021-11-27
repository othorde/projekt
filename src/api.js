
import { API_URL, defaultConfigPut } from "./config";





const Api =  {
    //EJ aktiv från backend
    getAUser: async(username) => {
        try {/* 
            const endpoint = `${API_URL}/cities/${whatCity}`;
            let res = await (await fetch(endpoint)).json();
            return res */
            console.log("HEJ FRÅN API")

        } catch (error) {
            console.log(error)
        }
    },

    getACity: async (whatCity) => {
        console.log(whatCity)
        try {
            const endpoint = `${API_URL}/cities/${whatCity}`;
            let res = await (await fetch(endpoint)).json();
            return res.data
        } catch (error) {
            console.log(error)
        }
	},

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
            return res.data
        } catch (error) {
            console.log(error)
        }
	},

    updateAScooter: async (id, speed, battery, newPosition, logg) => {
        try {
            const endpoint = `${API_URL}/scooter`;

            let res = await (
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        _id: id,
                        speed: speed,
                        battery: battery
                        // position: newPosition,
                        // logg: logg
                    })
                    })).json();
            console.log(res)
            return res
        } catch (error) {
            console.log((error))
        }
	},

    // EJ Gjorde som den ska, bara dummy
    // Samma med updateUserSubscription måste skapas

    updateUserFunds: async (onepayment, userName) => {
        try {
            // const endpoint = `${API_URL}/??????????`;

            // let res = await (
            //     await fetch(endpoint, {
            //         ...defaultConfigPut,
            //         body: JSON.stringify({
            //             _id: id,
            //             speed: speed,
            //             battery: battery
            //             // position: newPosition,
            //             // logg: logg
            //         })
            //         })).json();
            let res = "OK"
            return res
        } catch (error) {
            console.log((error))
        }
	},
    // EJ klar väntar på backend. EJ Gjorde som den ska, bara dummy
    updateUserSubsc: async (onepayment, userName) => {
        try {
            // const endpoint = `${API_URL}/??????????`;

            // let res = await (
            //     await fetch(endpoint, {
            //         ...defaultConfigPut,
            //         body: JSON.stringify({
            //             _id: id,
            //             speed: speed,
            //             battery: battery
            //             // position: newPosition,
            //             // logg: logg
            //         })
            //         })).json();
            let res = "OK"
            return res
        } catch (error) {
            console.log((error))
        }
	},




    
}

export default Api
