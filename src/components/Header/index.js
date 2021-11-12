import React, { useContext } from "react";
import { Link, Outlet, useNavigate  } from "react-router-dom";
//style
import { Wrapper, Logga, Nav, Nav2, SignOut, Content } from './Form.styles.js';

//components
import AppContext from "../../AppContext";

const Header = () => {
  
    const myContext = useContext(AppContext);
    const auth = myContext.auth;
    let navigate = useNavigate();
    let admin = true; /* byt ut denna sen, checka om det är admin vid inlogg */

    const handleSubmit = async (event)  => {

        myContext.toggleAuth(false);
        localStorage.clear();

        navigate("/");
        event.preventDefault();
    }

    return (
        <Wrapper>
            <Content>

            <Logga> Svenska Elsparkcyklar </Logga>
            {auth === true ? (
            <>
                <Nav>
                    <Link to="/admin" > Admin </Link> |{" "} {/* Link som global navigation */}
                    <Link to="/account" > Konto</Link>
                    {admin === true ? (
                    <Nav2> 
                        <Link to="/account" > Hantera kunder </Link>
                        <Link to="/account" > Hantera kunder </Link>
                        <Link to="/account" > Hantera kunder </Link>
                        <Link to="/account" > Hantera kunder </Link>

                    </Nav2>
                    ): console.log("FALSE") }

                </Nav>
                <SignOut>
                    <form onSubmit={handleSubmit} className = "logout">
                        <input type="submit" value="Logga ut" />
                    </form>
                </SignOut>
                
                <Outlet/> {/* outlet renderar child  */}
                </>
            ): console.log("FALSE") }
            </Content>

        </Wrapper>
    )
}

export default Header

