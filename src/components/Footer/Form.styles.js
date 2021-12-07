import styled from "styled-components";


export const Delimiter = styled.div `
	border-bottom: 1px solid #f1f1f1;
	width: 100%;
    height: 2px;
	margin: 20px 16px;
`; 


export const Content = styled.div `

    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    height: 8em;
    position: absolute;
    bottom:0;
    background: #1f2a32;
    border-top: 2px solid black;
`;

export const FooterLink = styled.div `
    flex:1;
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    margin: auto;
    margin-bottom: 2.5em;
    width: 33%;
    

    a {
        text-decoration: none;
        color: #f1f1f1;
        transition: color 0.3s linear;

        .Av { 
            display: none;
            transition: color 0.3s linear;
        }
    }
    a:hover {
        color: #F47BA6;

        .Oss { 
            display: none;
        }
        .Av { display: inline;
        }
    }

`;