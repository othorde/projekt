import {React, useState, useContext, useEffect} from "react";
//components
import User from "../../components/User/index.js";
import Api from "../../api.js";
import AppContext from "../../AppContext.js";
//styles
import { Content, Delimiter, StylePayment, StylePayment2, Subscription} from "./Form.styles.js";

const initialValue = {
    showMsgSubs: false,
    showMsgOnePay: false,
    msg: ""
}



const Payment = () => {
    const myContext = useContext(AppContext);
    const [msgForUser, setMsgForUser] = useState(initialValue);
    const [subscription, setSubscription] = useState(0);
    const [onePayment, setOnePayment] = useState(0);
    const [IfUserHasSubsc, setIfUserHasSubsc] = useState("");
    const [msgForUnsubscribe, setMsgForUnsubscribe] = useState({showMsg: false, msg: ""});

    const checkIfSubscription = async() => {
        //setIfUserHasSubs(myContext.user.subscription)
        //setIfUserHasSubsc()
    }

    let userName = myContext.user.username;


    const handleUnSubscribe = async(event) => {
        event.preventDefault();

       let result = await Api.updateUserSubsc();
       let msg;
        console.log(result)
       if(result == "OK") {
           msg = "Prenumerationen avslutad";
           setIfUserHasSubsc(false)
       } else {
            msg = "Prenumerationen gick ej att avsluta";

       }
       setMsgForUnsubscribe({showMsg: true, msg: msg})
    }

    // KOLLA vad meddelandena blir från backend
    const handleSubmit = async (event)  => {
        event.preventDefault();

        let showMsgSubs = false;
        let showMsgOnePay = false;
        let msg = "";
        let result;

        if (subscription !== 0) {
            showMsgSubs = true;
            result = await Api.updateUserSubsc(subscription, userName);
            msg = "Din prenumeration är nu godkänd"
            setIfUserHasSubsc(true);

        } else if (onePayment) {
            showMsgOnePay = true;
            if (onePayment) {
                result = await Api.updateUserFunds(onePayment, userName);
                msg = "Din insättning har gått igenom";
            }
        } 
        if (result != "OK") {
            msg = "Något gick fel... testa igen senare"
        } 
        setMsgForUser({ 
            showMsgSubs: showMsgSubs,
            showMsgOnePay: showMsgOnePay,
            msg: msg,
        })
        setOnePayment(0);
        setSubscription(0);
    }

    useEffect(() => {
        checkIfSubscription()
    }, [setMsgForUser, msgForUser])

	return (
        <Content>
            <StylePayment>
            {msgForUser.showMsgOnePay ? <p>{msgForUser.msg}</p> : (<p> {"Minsta möjliga insättning (100:-) "}</p>)}
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

            {IfUserHasSubsc ? (
                <StylePayment> {/*   Om det redan finns en prenumeration  */}
                    {(msgForUnsubscribe.showMsg) ? (<p>{msgForUnsubscribe.msg}</p> )
                    : (<p>{"Du har en pågående prenumeration "}</p>) }
                    
                    <form onSubmit={handleUnSubscribe} className = "register">
                        <Delimiter></Delimiter>
                        <input type="submit" value="Avsluta Prenumeration" />
                    </form>
                </StylePayment>
            ):( 
                <StylePayment2> {/*   Finns ej någon prenumeration  */}
                    {msgForUser.showMsgSubs ? (<p>{msgForUser.msg}</p>) 
                    : (<p> {"Prenumerationen kan avslutas närsomhelst "} </p>)}
                    <form onSubmit={handleSubmit} className = "register">
                        <label >
                        <input
                            placeholder="Belopp per månad"
                            type="number" 
                            name="subscription"
                            required
                            value={subscription || ""} 
                            onChange={(e) => setSubscription(e.target.value)}
                        />
                        </label>
                        <Delimiter></Delimiter>
                        <input type="submit" value="Prenumerera" />
                    </form>
                </StylePayment2>
                )
            }
        </Content>
	);
}

export default Payment

