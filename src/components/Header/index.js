import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet, useNavigate  } from "react-router-dom";
//style
import { Container, Logga, Nav, SignOut, StyledMenu } from './Form.styles.js';
//components
import Burger from "../BurgerMenu/index";
//import Menu from "../Menu/index"
import AppContext from "../../AppContext";

const Header = () => {
    let tag = localStorage.getItem("tag");


    const [customer, setCustomer] = useState(Boolean);
    const [admin, setAdmin] = useState(Boolean);
    const [open, setOpen] = useState(false);
    const myContext = useContext(AppContext);
    const auth = myContext.auth;
    let navigate = useNavigate();

    useEffect(() => {

        function checkWhoLoggedIn(){
            let tag = localStorage.getItem("tag");
            if (tag == '"customer"' || myContext.user.tag == "customer") {
                setCustomer(true);
            } else if (tag == '"admin"' || myContext.user.tag == "admin") {
                setAdmin(true);
            }
        }
        checkWhoLoggedIn()

    }, [tag])


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
                <Link to="/login/home" > Svenska Elsparkcyklar</Link> 
                <Link to="/login/home" > Hem </Link> 
                {admin &&
                <>
                <Link to="/admin" > Admin </Link> 
                <Link to="/account" > Hantera kunder </Link>
                </>
                }
                {customer === true &&
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
                    <Link to="/login/home" > Hem </Link> 
                    {admin &&
                    <>
                    <Link to="/admin" > Admin </Link> 
                    <Link to="/account" > Hantera kunder </Link>
                    </>
                    }
                    {customer === true &&
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

