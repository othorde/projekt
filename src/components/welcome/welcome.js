import React from "react";
import { useNavigate } from "react-router-dom"

//styles
import { Wrapper, 
    Content,
    Picture,
    AStore,
    Gplay,
    Textbox,
    Downloadable,
    Btn,
    Btn2,
    BtnContainer
} from './Form.styles.js';

import welcomePage from '../../images/welcomepage.jpg';
import g1 from '../../images/g1.png';
import g2 from '../../images/g2.png';


const Welcome = () => {
    const navigate = useNavigate()
    const login = (e)  => {
        // slå ihop dessa
        e.preventDefault()
        navigate("/login")    
    }
    const register = (e)  => {
        e.preventDefault()
        navigate("/login")
    }

    return (
        <Wrapper>
            <Content >    
                <Textbox> 
                    <h1> Snabba och prisvärdiga resor! </h1>
                    <h2> Ladda ner appen idag </h2>
                    <Downloadable>
                        <AStore><img src={g2} alt="download Appstore" width="100%" height="100%" /></AStore>
                        <Gplay><img src={g1} alt="download google" width="100%" height="100%" /></Gplay>
                    </Downloadable>
                </Textbox>
                <BtnContainer>
                <Btn>    
                    <form onSubmit={login} >
                        <input type="submit" value="Logga in"/>
                    </form>
                </Btn>
                <Btn2>
                    <form onSubmit={register} >
                        <input type="submit" value="Registrera"/>
                    </form>
                </Btn2>
                </BtnContainer>

            </Content >
            <Picture><img src={welcomePage} alt="guy on scooter" width="100%" height="100%" /></Picture>
        </Wrapper>
    )
}

export default Welcome;