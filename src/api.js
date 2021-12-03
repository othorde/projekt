
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

    getAllUsers: async() => {
        try {
            const endpoint = `${API_URL}/customers`;
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

    updateAScooter: async (id, speed, battery, newPosition, active_user, is_active) => {
        try {
            const endpoint = `${API_URL}/scooter`;

            let res = await (
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        _id: id,
                        speed: speed,
                        battery: battery,
                        lat: newPosition.lat,
                        lng: newPosition.lng,
                    })
                    })).json();
            return res
        } catch (error) {
            console.log((error))
        }
	},

    updateAScootersUser: async (id) => {
        try {
            const endpoint = `${API_URL}/scooter/setuser`;

            let res = await (
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        _id: id,
                    })
                    })).json();
            return res
        } catch (error) {
            console.log((error))
        }
	},


    updateAScootersLogg: async (varForUpdate) => {
        try {
            const endpoint = `${API_URL}/scooter/insertLogg`;
            let res = await (
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        _id: varForUpdate.id,
                        active_user: varForUpdate.active_user,
                        event: varForUpdate.event,
                        start_lat: varForUpdate.start_lat,
                        start_lng: varForUpdate.start_lng,
                        start_time: varForUpdate.time,
                        end_lat: varForUpdate.end_lat,
                        end_lng: varForUpdate.end_lng,
                        end_time: varForUpdate.time,
                    })
                    })).json();
            return res
        } catch (error) {
            console.log((error))
        }
	},


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
            
            if(res.data.result === `Object: ${id} updated`) {
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
