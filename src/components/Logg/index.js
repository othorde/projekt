import {React, useState, useEffect} from "react";
//styles
import {StyleLogg} from './Form.styles.js'
// random nr, vissa värden är null och id måste vara unikt
const { v4: uuidv4 } = require('uuid');

const Logg = ({scooter}) => {
    const [logg, setLogg] = useState({})

    useEffect(() => {
        setLogg(scooter.scooter)
    }, [scooter])

    useEffect(() => {
    }, [setLogg, logg])

    return (
        <>
        <StyleLogg>
            {logg && logg.logg ? (
            <table>
                <caption>Logg</caption>
                <tbody>
                    {logg.logg.slice(0).reverse().map(elem => 
                    <tr key={uuidv4()}>
                        <td data-label="Användare"> {elem.user}</td>
                        <td data-label="Startposition (lat)"> {elem.start.position.lat}  </td>
                        <td data-label="Startposition (lng)">  {elem.start.position.lng } </td>
                        <td data-label="Starttid">{elem.start.time} </td>
                        <td data-label="Slutposition (lat)"> {elem.end.position.lat}</td>
                        <td data-label="Slutposition (lng)"> {elem.end.position.lng}</td>
                        <td data-label="Stopptid"> {elem.end.time}</td>
                        <td data-label="Event" > {elem.event} </td>
                    </tr>
                    )}
                </tbody>
                </table>
            ): (null)}
        </StyleLogg>
        </>
    )

}

export default Logg