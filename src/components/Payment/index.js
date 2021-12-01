import {React, useState} from "react";
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

    // KOLLA vad meddelandena blir från backend
    const handleSubmit = async (event)  => {
        event.preventDefault();

        let showMsgSubs = false;
        let showMsgOnePay = false;
        let msg = "";
        let result;
        let id;
        let currentBalance;
        let newBalance;

        if (onePayment && typeof(props.userDetails.data._id, String)) {

            currentBalance = props.userDetails.data.balance;
            newBalance = parseInt(currentBalance) + parseInt(onePayment);
            showMsgOnePay = true;
            id = props.userDetails.data._id;
            console.log(newBalance, "hääär")
            if (newBalance) {
                result = await Api.updateUserFunds(newBalance, id);
                msg = "Din insättning har gått igenom";
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
            {msgForUser.showMsgOnePay ? <p>{msgForUser.msg}</p> : (<p> {"Sätt in valfritt belopp "}</p>)}
            <form onSubmit={handleSubmit} className = "register">
                <label>
                <input
                    placeholder="Belopp att sätta in"
                    type="number" 
                    name="onepayment"
                    required
                    value={onePayment || ""} 
                    onChange={(e) => setOnePayment(e.target.value)}
                />
                </label>
                <Delimiter></Delimiter>
                <input type="submit" value="Sätt in" />
            </form>
            </StylePayment>

        </Content>
	);
}

export default Payment

