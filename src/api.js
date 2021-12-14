
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
            return false
        }
    },

    getAllUsers: async() => {
        try {
            const endpoint = `${API_URL}/customers`;
            let res = await (await fetch(endpoint)).json();
            return res
        } catch (error) {
            return false
        }
    },

    getACity: async (whatCity) => {
        try {
            const endpoint = `${API_URL}/cities/${whatCity}`;
            let res = await (await fetch(endpoint)).json();
            return res.data
        } catch (error) {
            return false
        }
	},

    getAllCitys: async () => {
        try {
            const endpoint = `${API_URL}/cities`;
            let res = await (await fetch(endpoint)).json();
            return res.data
        } catch (error) {
            return false
        }
	},

    getAllScooters: async () => {
        try {
            const endpoint = `${API_URL}/scooter`;
            let res = await (await fetch(endpoint)).json();
            return res.data
        } catch (error) {
            return false
        }
	},

    getAllChargePost: async (city, matching) => {
        try {
            const endpoint = `${API_URL}/cities/posts/${city}`;
            let res = await (await fetch(endpoint)).json();

            if(matching) {
                const result = res.data.filter(elem => elem.color == matching ? elem.amount_of_bikes_post : null);
                return result
            }
            return res.data
        } catch (error) {
            return false
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
            return false
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
            if(res.data.result === `Object: ${id} updated`) {
                return true
            }
            return false      
        } catch (error) {
            return false      
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
            if(res.data.result === `Object: ${id} updated`) {
                return true
            }
            return false      
        } catch (error) {
            return false      
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

            if(res.data.result === `Object: ${varForUpdate.id} updated`) {
                return true
            }
            return false
        } catch (error) {
            return false      
        }
	},


    updateUserFunds: async (addToBalance, id) => {
        try {
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
            
            if(res.data.result === `Object: ${id} updated`) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
	},


    updateNrBikesChargePost: async (city, amount_of_bikes, color) => {
        try {
            const endpoint = `${API_URL}/cities/posts/update`;
            let res;
            res = await(
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        city: city,
                        amount_of_bikes: amount_of_bikes,
                        color: color
                    })
                })).json();

            if(res.data.result === `City post: ${city} updated`) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
	},
    
    updateNrBikesParkZone: async (city, amount_of_bikes, color) => {
     
        try {
            const endpoint = `${API_URL}/cities/zones/update`;
            let res;
            res = await(
                await fetch(endpoint, {
                    ...defaultConfigPut,
                    body: JSON.stringify({
                        city: city,
                        amount_of_bikes: amount_of_bikes,
                        color: color
                    })
                })).json();
            
            if(res.data.result === `City zone: ${city} updated`) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
	},
}

export default Api
