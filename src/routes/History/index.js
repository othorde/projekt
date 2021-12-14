import {React, useContext} from "react";
import History from "../../components/History";
import Appcontext from '../../AppContext'

const UserHistory = ()  => {

    const myContext = useContext(Appcontext)
    let user = myContext.userHook;

	return (
        <History user = {user}></History>
    )
}

export default UserHistory

