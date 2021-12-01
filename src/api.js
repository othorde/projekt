
import { API_URL, defaultConfigPut } from "./config";


const defaultConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
	},
};


const Api =  {


    getAUser: async(id) => {
        try {
            const endpoint = `${API_URL}/customers/${id}`;
            let res = await (await fetch(endpoint)).json();
            return res
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

    // När det är fixat med OAUTH funkar denna antagligen
    logginUserViaGit: async (username)  => {
        try {
            const endpoint = `${API_URL}/customers/login`
            let res = await (
                await fetch(endpoint, {
                  ...defaultConfig,
                  body: JSON.stringify({username: username} )
                })
              ).json();
            return res

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

    updateUserFunds: async (addToBalance, id) => {
        try {
            console.log(addToBalance, id)
            const endpoint = `${API_URL}/customers/balance`;
            let res;
            res = await (
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        _id: id,
                        balance: addToBalance,
                    })
                })).json();
            console.log(res.data.result)
            
            if(res.data.result === "Object: 619b5e6fe8cf630e43c0aff4 updated") {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log((error))
        }
	},

}

export default Api
