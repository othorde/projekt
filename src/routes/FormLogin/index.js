import React from "react";
//styles
import { Wrapper, Content, SignIn, Delimiter, ScooterImg } from './Form.styles.js'
import scooterPic from '../../images/scooter.png';
import github from '../../images/github.png'
//other
require('dotenv').config()

/* Login, trycker man på länken skickas info till github om 
   att en anv vill logga in. redirectas till landingpage som sköter resterande
   för inloggning genom github. Se landingpage.
*/
const FormLogin = () => {
    return (
        <Wrapper>
            <Content>
                <ScooterImg>
                    <img src={scooterPic} alt="download google" width="95%" height="95%" />
                </ScooterImg>
                <SignIn>
                    <form className = "register">
                        <img src={github} alt="download google" width="40%" height="40%" />
                        <Delimiter/>
                        <div>
                            <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/login/landingpage`}> Logga in via Github</a>
                        </div>
                    </form>
                </SignIn>
            </Content>
        </Wrapper>
    )
}

export default FormLogin
