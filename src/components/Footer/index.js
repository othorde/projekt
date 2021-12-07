import {React} from "react";
/* style */
import { FooterLink, Delimiter, Content} from './Form.styles.js';


const Footer = () => {
    return (
        <Content>
            <Delimiter></Delimiter>
            <FooterLink><a href={"https://www.bth.se/utbildning/program-och-kurser/kurser/20232/BR4QJ/"}target="_blank" rel="noreferrer noopener"> About</a></FooterLink>
            <FooterLink><a href={"https://github.com/"}> Api</a></FooterLink>
            <FooterLink> <a href={"https://github.com/"}> <span class="Oss">Projekt</span><span class="Av"> Projekt av Alexander, Johanna, Jonathan, Oliver</span> </a></FooterLink>
        </Content>
    )
}

export default Footer

