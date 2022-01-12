
import { API_URL } from "./config";

/* Hämtar en användare */
export async function getAUser(id) {
    try {
        const endpoint = `${API_URL}/customers/${id}`;
        let res = await (await fetch(endpoint)).json();
        return res
    } catch (error) {
        return false
    }
};

/* Hämtar alla användare  */
export async function getAllUsers() {
    try {
        const endpoint = `${API_URL}/customers`;
        let res = await (await fetch(endpoint)).json();
        return res
    } catch (error) {
        return false
    }
};

/* Hämtar en stad  */
export async function getACity(whatCity) {
    try {
        const endpoint = `${API_URL}/cities/${whatCity}`;
        let res = await (await fetch(endpoint)).json();
        return res.data
    } catch (error) {
        return false
    }
};

/* Hämtar alla städer */
export async function getAllCitys() {
    try {
        const endpoint = `${API_URL}/cities`;
        let res = await (await fetch(endpoint)).json();
        return res.data
    } catch (error) {
        return false
    }
};

/* Hämtar alla scootrar */
export async function getAllScooters() {
    try {
        const endpoint = `${API_URL}/scooter`;
        let res = await (await fetch(endpoint)).json();
        return res.data
    } catch (error) {
        return false
    }
};

/* Hämtar alla laddstationer, retunerar antal cyklar som finns */
export async function getAllChargePost(city, matching) {
    try {
        const endpoint = `${API_URL}/cities/posts/${city}`;
        let res = await (await fetch(endpoint)).json();
        let result = false;
        if(matching) {
            res.data.forEach(element => {
                if (element.color === matching) {
                    result = element.amount_of_bikes_post
                }
            });
            return result
        }
    } catch (error) {
        return false
    }
};

/* Loggar in användaren */
export async function logginUserViaGit(username) {

    const defaultConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
    };

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
};

/* Uppdaterar en scooter */
export async function updateAScooter(id, speed, battery, newPosition, token) {

    const defaultConfigPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'x-access-token': token
        }
    }

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
};

/* Uppdaterar en scooters användare */
export async function updateAScootersUser(id, token) {

    const defaultConfigPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'x-access-token': token
        }
    }

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
};

/* Uppdaterar scooterns logg */
export async function updateAScootersLogg(varForUpdate, token) {

    const defaultConfigPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'x-access-token': token
        }
    }

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
};

/* Uppdaterar användarens kontobalans */
export async function updateUserFunds(addToBalance, id, token) {
    const defaultConfigPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'x-access-token': token
        }
    }

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
};

/* Uppdaterar antalet cyklar i chargepost */
export async function updateNrBikesChargePost(city, amount_of_bikes, color, token){
    
    const defaultConfigPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'x-access-token': token
        }
    }

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
};

/* Uppdaterar antalet cyklar i parkzone */
export async function  updateNrBikesParkZone(city, amount_of_bikes, color, token) {

    const defaultConfigPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'x-access-token': token
        }
    }
    
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
};


