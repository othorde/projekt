import {React} from "react";
import { About, Project, Us, Delimiter, Content} from './Form.styles.js';


const Footer = () => {
    


    return (

  
        <Content>
            <Delimiter></Delimiter>
            <About><a href={"https://www.bth.se/utbildning/program-och-kurser/kurser/20232/BR4QJ/"}target="_blank" rel="noreferrer noopener"> About</a></About>
            <Project><a href={"https://github.com/"}> Project</a></Project>
            <Us><a href={"https://www.bth.se/utbildning/program-och-kurser/kurser/20232/BR4QJ/" } target="_blank" rel="noreferrer noopener">  Us</a></Us>
        </Content>

    )

}

export default Footer

