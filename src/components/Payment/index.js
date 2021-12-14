import {React, useState, useEffect} from "react";
//components
import Api from "../../api.js";
//styles
import { Content, Delimiter, StylePayment} from "./Form.styles.js";

const initialValue = {
    showMsg: false,
    msg: ""
}

/* Denna komponent används på två ställen,
   hantera kunder och konto.
   Tar props för att hämta info om användare
*/
const Payment = (props) => {
    const [msgForUser, setMsgForUser] = useState(initialValue);
    const [onePayment, setOnePayment] = useState(0);
    const [adminOrNot, setAdminOrNot] = useState(false); // Om det är admin som ska ändra eller ej

    useEffect(() => { /* Om det är admin som ska göra justeringen på saldot */
        if (props && props.customer) {
            setAdminOrNot(true)
        }
    }, [props])

    /* När användaren klickar på uppdatera Nytt saldo/Ändra saldo */
    const handleSubmit = async (event)  => {
        event.preventDefault();
        let showMsg = false;
        let msg = "";
        let result;
        let id;
        let currentBalance;
        let newBalance;

        if (onePayment && props) { // Om state är satt, dvs vilket belopp som ska sättas in / justeras till
            if(adminOrNot) { // Om det är en admin
                id = props.customer.id;  // om admin justerar blir det det belopp man skriver in.
                newBalance = onePayment;
            } else {
                id = props.userDetails.data._id;
                currentBalance = props.userDetails.data.balance;
                newBalance = parseInt(currentBalance) + parseInt(onePayment); 
            }
            /* Uppdaterar användarens kontobalans */
            try {
                showMsg = true;
                result = await Api.updateUserFunds(newBalance, id);
                if(result === true) {
                    msg = "Din insättning har gått igenom";
                    if(adminOrNot) {
                        msg = "Saldot är justerat";
                    }
                }
            } catch (error) {
                msg = "Något gick fel. Beror på servern.";
            }
        } 
        setMsgForUser({ 
            showMsg: showMsg,
            msg: msg,
        })
        setOnePayment(0);
    }

    /* Tennary operator används för att justera texten beroende på vem det är som ska göra förändringen */
	return (
        <Content>
            <StylePayment>
            {msgForUser.showMsg ? <p>{msgForUser.msg}</p> : (<p> {adminOrNot ? (`VARNING! \n Du justerar kunds saldo`) : ("Sätt in valfritt belopp ")}</p>)}
            <form onSubmit={handleSubmit} className = "register">
                <label>
                <input
                    placeholder={adminOrNot ? ("Nytt saldo") : ("Belopp att sätta in")}
                    type="number" 
                    name="onepayment"
                    required
                    value={onePayment || ""} 
                    onChange={(e) => setOnePayment(e.target.value)}
                />
                </label>
                <Delimiter></Delimiter>
                <input type="submit" value={adminOrNot ? ("Ändra saldo") : ("Sätt in")} />
            </form>
            </StylePayment>
        </Content>
	);
}

export default Payment

