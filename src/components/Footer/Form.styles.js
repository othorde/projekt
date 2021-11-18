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
    height: 20vh;
    position: relative;
    left:0;
    bottom:0;
    background: #1c3d5a;
    border-top: 2px solid black;
`;

export const About = styled.div `
    flex:1;
    font-size: 1.1em;
    text-align: center;
    margin: auto;
    margin-bottom: 2.5em;

    width: 33%;
    a {
        text-decoration: none;
        color: #f1f1f1;
    }
    a:hover {
        color: #ffd343;
    }

`;

export const Project = styled.div `
    flex:1;
    font-size: 1.1em;
    width: 33%;
    text-align: center;
    margin: auto;
    margin-bottom: 2.5em;

    a {
        text-decoration: none;
        color: #f1f1f1;
    }
    a:hover {
        color: #ffd343;
    }

`;

export const Us = styled.div `
    flex:1;
    font-size: 1.1em;
    width: 33%;
    text-align: center;
    margin: auto;
    margin-bottom: 2.5em;

    a {
        text-decoration: none;
        color: #f1f1f1;
    }
    a:hover {
        color: #ffd343;
    }

`;

