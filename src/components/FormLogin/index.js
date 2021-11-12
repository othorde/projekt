import React, {useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//styles
import { Wrapper, Content, SignIn, Delimiter } from './Form.styles.js'
//other
import AppContext from '../../AppContext';



const FormLogin = () => {
    let myContext = useContext(AppContext);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

      const handleSubmit = async (event)  => {

        // kontrollera inlogg, kolla med servern om användaruppg är ok
        localStorage.setItem('user', inputs);
        myContext.toggleAuth(true);
        navigate("/account")

        event.preventDefault();
    }

    return (
        <Wrapper>
            <Content>
                <SignIn>
                    <form onSubmit={handleSubmit} className = "register">
                        <label >
                        <input
                            placeholder ="Email"
                            type="text" 
                            name="username"
                            required
                            value={inputs.username || ""} 
                            onChange={handleChange}
                        />
                        </label>
                        <label>
                            <input 
                            placeholder ="Lösenord"

                            type="password"
                            name="psw"
                            required
                            value={inputs.psw || ""} 
                            onChange={handleChange}
                            />
                            </label>
                            <input type="submit" value="Logga in" />
                            <Delimiter></Delimiter>
                            <input type="submit" value="Skapa konto" />
                    </form>

                </SignIn>

            </Content>
        </Wrapper>
    )
}

export default FormLogin
