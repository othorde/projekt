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
    let admin = false; /* byt ut denna sen, checka om det är admin vid inlogg */
    let user = true; /* byt ut denna sen, checka om det är admin vid inlogg */

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
            {auth && (
            <>
                <Nav>
                    {admin &&
                    <>
                    <Link to="/admin" > Admin </Link> 

                    <Nav2> 
                        <Link to="/account" > Hantera kunder </Link>
                        <Link to="/account" > Överblick </Link>
                    </Nav2>
                    </>
                    }
                    {user &&
                    <>
                    <Link to="/home" > Hem </Link> 
                    <Nav2> 
                        <Link to="/account" > Konto </Link>
                        <Link to="/history" > Historik </Link>
                    </Nav2>
                    </>
                    }
                </Nav>
                <SignOut>
                    <form onSubmit={handleSubmit} className = "logout">
                        <input type="submit" value="Logga ut" />
                    </form>
                </SignOut>
                <Outlet/> {/* outlet renderar child  */}
                </>
            )}
            </Content>

        </Wrapper>
    )
}

export default Header

