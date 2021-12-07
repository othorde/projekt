import {React, useState, useEffect} from "react";
//components
import Api from "../../api.js";
//styles
import { Content, Delimiter, StylePayment} from "./Form.styles.js";

const initialValue = {
    showMsgSubs: false,
    showMsgOnePay: false,
    msg: ""
}

const Payment = (props) => {
    const [msgForUser, setMsgForUser] = useState(initialValue);
    const [onePayment, setOnePayment] = useState(0);
    const [adminOrNot, setAdminOrNot] = useState(false);

    useEffect(() => { /* Om det är admin som ska göra justeringen på saldot */
        if (props && props.customer) {
            setAdminOrNot(true)
        }
    }, [props])


    const handleSubmit = async (event)  => {
        event.preventDefault();

        let showMsgSubs = false;
        let showMsgOnePay = false;
        let msg = "";
        let result;
        let id;
        let currentBalance;
        let newBalance;

        if (onePayment && props) {

            if(!adminOrNot) {
                id = props.userDetails.data._id;
                currentBalance = props.userDetails.data.balance;
                newBalance = parseInt(currentBalance) + parseInt(onePayment);
                showMsgOnePay = true;
            }
            if(adminOrNot) { // om admin justerar blir det det belopp man skriver in.
                id = props.customer.id; 
                newBalance = onePayment; 
            }

            if (newBalance) {
                result = await Api.updateUserFunds(newBalance, id);
                msg = "Din insättning har gått igenom";

                if(adminOrNot) {
                    msg = "Saldot är justerat";
                }
            }
        } else {
            msg = "Något gick fel... testa igen senare (id)"
        } 
        if (result !== true) {
            msg = "Något gick fel... testa igen senare"
        } 
        setMsgForUser({ 
            showMsgSubs: showMsgSubs,
            showMsgOnePay: showMsgOnePay,
            msg: msg,
        })
        setOnePayment(0);
    }

	return (
        <Content>
            <StylePayment>
            {msgForUser.showMsgOnePay ? <p>{msgForUser.msg}</p> : (<p> {adminOrNot ? (`VARNING! \n Du justerar kunds saldo`) : ("Sätt in valfritt belopp ")}</p>)}
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

