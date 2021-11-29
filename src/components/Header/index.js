import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate  } from "react-router-dom";
//style
import { Container, Logga, Nav, SignOut, StyledMenu } from './Form.styles.js';
//components
import Burger from "../BurgerMenu/index";
//import Menu from "../Menu/index"
import AppContext from "../../AppContext";

const Header = () => {

    const [open, setOpen] = useState(false);
    const myContext = useContext(AppContext);
    const auth = myContext.auth;
    let navigate = useNavigate();
    let admin = true; /* byt ut denna sen, checka om det är admin vid inlogg */
    let user = false; /* byt ut denna sen, checka om det är admin vid inlogg */

    const handleSubmit = async (event)  => {
        myContext.toggleAuth(false);
        localStorage.clear();
        navigate("/");
        event.preventDefault();
    }

    return (
        <> {/* Burgermenu */}
        {auth &&
        <Burger open={open} setOpen={setOpen}> </Burger>
        }
            <StyledMenu open={open}>
                <Link to="/home" > Svenska Elsparkcyklar</Link> 

                <Link to="/home" > Hem </Link> 
                {admin &&
                <>
                <Link to="/admin" > Admin </Link> 
                <Link to="/account" > Hantera kunder </Link>
                </>
                }
                {user &&
                <>
                <Link to="/account" > Konto </Link>
                <Link to="/history" > Historik </Link>
                </>
            }
            <Outlet/>
        </StyledMenu>

        {/* Menu */}
        <Container>
            <Logga> Svenska Elsparkcyklar </Logga>
            {auth && (
            <>
                <Nav>
                    <Link to="/home" > Hem </Link> 
                    {admin &&
                    <>
                    <Link to="/admin" > Admin </Link> 
                    <Link to="/account" > Hantera kunder </Link>
                    </>
                    }
                    {user &&
                    <>
                    <Link to="/account" > Konto </Link>
                    <Link to="/history" > Historik </Link>
                    </>
                    }
                </Nav>
                <Outlet/> {/* outlet renderar child  */}
            <SignOut>
                <form onSubmit={handleSubmit} className = "logout">
                    <input type="submit" value="Logga ut" />
                </form>
            </SignOut>
            </>
            )}
        </Container>
        </>
    )
}

export default Header

