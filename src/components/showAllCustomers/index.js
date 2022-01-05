import {React, useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//hooks
import { useFetchAllCustomers } from "../../Hooks/useFetchAllCustomers";
//components
import Loader from "../Loader";
import History from "../History";
import Payment from "../Payment";
//styles
import {
    Container,
    Main,
    UserInfo,
    StylePayment,
    StyleHistory,
    ForwardBackwards} from './Form.styles';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

/* värden från början */
const initialValue = {
    showCustomer: false,
    id: "",
    username: "",
    from: "admin"
}
const initialValueCustomerBalance = {
    show: false,
    id: "",
    username: "",
    pageY: ""
}
const initialValueIndex = {
    start: 0,
    stop: 19,
    nrOfResults: "",
}

/* Visar alla användare, specifika resor samt ändra kontobalans */
const ShowAllCustomers = ()  => {
    const {allCustomers, errorAllCustomers} = useFetchAllCustomers(); // hämtar alla anv från hook
    const [showCustomerTrips, setShowCustomerTrips] = useState(initialValue);
    const [changeCustomerBalance, setChangeCustomerBalance] = useState(initialValueCustomerBalance);
    const [pageIndex, setPageIndex] = useState(initialValueIndex); // vilken sida admin är på, visar 20 resultat från arr

    useEffect(() => {
    }, [allCustomers, errorAllCustomers])

    /* Om admin vill se specifik kund. Sätter state som blir true och visas som History i return */
    function showSpecificCustomer(id, username) {

        setChangeCustomerBalance(initialValueCustomerBalance)// resetar denna dvs visar ej denna längre
        setShowCustomerTrips({
            showCustomer: !showCustomerTrips.showCustomer,
            id: id,
            username: username,
            from: "admin"
        })
    }
    /* Om admin vill justera kontobalans. Sätter state som blir true och visas som user i return */
    function changeUserBalance(id, username) {
        
        setShowCustomerTrips(initialValue) // resetar dvs visar ej denna längre
        setChangeCustomerBalance({
            show: !changeCustomerBalance.show,
            id: id,
            username: username,
        })
    }

    /* kollar vilken sida användaren är på & hur många användare som finns att visa */
    function changeIndex(whereTo) {
        let perPage = 20;
        let newStartIndex = pageIndex.start;
        let newStopIndex = pageIndex.stop;
        let maxIndex = allCustomers.length;

        if(whereTo === "forward") { // Framåt
            newStartIndex = (newStartIndex + perPage); // nytt värde fram + 20
            newStopIndex = (newStopIndex + perPage);
            if(newStopIndex > maxIndex ) { // Om det blir större än maxvärde
                newStopIndex = maxIndex; // sätt det till maxvärdet
                newStartIndex = maxIndex - 20; // och sätt startindex till maxvärde - 20
            }
        } else {
            newStartIndex = (newStartIndex - perPage); // nytt värde tillbaka - 20
            newStopIndex = (newStopIndex - perPage);
            if (newStartIndex < 0) { // om värdet är mindre än 0, resetas det till 0 och 19
                newStartIndex = 0;
                newStopIndex = 19;
            }
        }
        /* sätter värden för vilken sida(index) samt hur lång arrayn är, så vi vet max antal sidor*/
        setPageIndex({
            start: newStartIndex,
            stop: newStopIndex,
            nrOfResults: allCustomers.length,
        });
    }

	return (
        <>
        {/* Tillbaka btn, visas endast när alla man är inne på en specifik användare */}
        {showCustomerTrips.showCustomer ? ( 
        <button style={{ height: "3em", width: "7em", border: "1px solid black"}} 
            onClick= {showSpecificCustomer}> Tillbaka </button>
            ): (null)
        }
        <Container>            
            <Main>
                {allCustomers.length > 0 ? (
                    !showCustomerTrips.showCustomer &&
                <UserInfo>
                    <table>
                    <caption>Alla Användare</caption>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Användarnamn</th>
                            <th scope="col">På kontot</th>
                            <th scope="col">Antal Resor</th>
                            <th scope="col">Se alla resor</th>
                            <th scope="col">Justera saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allCustomers.slice([pageIndex.start], [pageIndex.stop]).map(elem => 
                        <tr key={elem._id}>
                        <td data-label="Id"> {elem._id}  </td>
                        <td data-label="Användarnamn"> {elem.username} </td>
                        <td data-label="På kontot">{elem.balance}:- </td>
                        <td data-label="Antal Resor">{elem.trips.length} </td>
                        <td data-label="Se alla resor">{ <button className="button vertical-align:middle" onClick={(e) => 
                            showSpecificCustomer(elem._id, elem.username, e)}><span>Visa</span></button>} </td>
                        <td data-label="Justera saldo">{ <button className="button vertical-align:middle" onClick={(e) => 
                            changeUserBalance(elem._id, elem.username, e)}><span>Ändra </span></button>} </td>
                        </tr>
                    )
                    }
                    </tbody>
                    </table>
                </UserInfo>
                ) : (
                    <Loader/>
                )}
                {/* Om man vill se användarens alla resor */}
                {showCustomerTrips.showCustomer && 
                <>
                <StyleHistory>
                        <History customer={showCustomerTrips}></History>
                </StyleHistory>
                </>
                }
                {/* Om man vill ändra användarens kontobalans */}
                {changeCustomerBalance.show && 
                <StylePayment pageY = {changeCustomerBalance.pageY}>
                        <Payment customer={changeCustomerBalance}></Payment>
                </StylePayment>
                }
            </Main>
        </Container>
        {/* Visar pilarna, endast vid vyn där alla anv är med, tar bort den när man går in på enskild anv */}
        {!showCustomerTrips.showCustomer &&
        <>
        <p style={{"fontWeight":"bold"}}>Visar {pageIndex.start}-{pageIndex.stop} av {allCustomers.length} resultat </p>  
        <ForwardBackwards>
            <div className="back"><FontAwesomeIcon icon={faArrowLeft} size="3x" onClick={() => changeIndex("back")}/></div>
            <div className="forward"><FontAwesomeIcon icon={faArrowRight} size="3x" onClick={() => changeIndex("forward")}/></div>
        </ForwardBackwards>
        </>
        }
        </>
    )
}

export default ShowAllCustomers
