import {React} from "react";
/* style */
import { FooterLink, Delimiter, Content} from './Form.styles.js';


const Footer = () => {
    return (
        <Content>
            <Delimiter></Delimiter>
            <FooterLink><a href={"https://www.bth.se/utbildning/program-och-kurser/kurser/20232/BR4QJ/"}target="_blank" rel="noreferrer noopener"> Kurs</a></FooterLink>
            <FooterLink><a href={"https://github.com/"}> Api</a></FooterLink>
            <FooterLink> <a href={"https://github.com/"}> <span className="Oss">Projekt</span><span className="Av"> Projekt av Alexander, Johanna, Jonathan, Oliver</span> </a></FooterLink>
        </Content>
    )
}

export default Footer

