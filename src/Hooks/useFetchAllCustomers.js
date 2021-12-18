import {useState, useEffect} from 'react';
import Api from "../Api";

// hämtar alla användare som finns registrerade vid mount
// retunerar alla och error
export const useFetchAllCustomers = () => {

    const [allCustomers, setAllCustomers] = useState([]);
    const [errorAllCustomers, setErrorAllCustomers] = useState(false);

    // hämtar, sparar till state
    const fetchData = async () => {
        try {
            setErrorAllCustomers(false)
            let res = await Api.getAllUsers();
            res.data && setAllCustomers(res.data);
        } catch (error) {
            setErrorAllCustomers(true)
        }
    }

    /* Hämtar endast vid mount */
    useEffect(() => {
        fetchData()
    }, [])

    return {allCustomers, errorAllCustomers}
}