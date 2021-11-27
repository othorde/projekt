import styled from 'styled-components';


export const Wrapper = styled.div `
	{	
		font-size: 1em;
        height: 100vh;
        width: 100vw;
        text-align: center;
	}
`;

export const Content = styled.div `
    display: flex;
    flex-direction: column;
    width: 55%;
    height: 100%;
    background-color: #8CF3F3;
    float: left;
    @media screen and (max-width: 550px) {
        {
            width: 100%;
            height: 100%;
        }
      }
`;

export const Textbox = styled.div `
    flex: 1;
    margin-top: 8em;
    height: 70%;
    background-color: #8CF3F3;
    color: black;
    text-align:center;
`;


export const Picture = styled.div `
    margin: auto;
    width: 45%;
    height: 100%;
    float: left;
    position: relative;
    @media screen and (max-width: 550px) {
        {
          display: none;
        }
      }
`;

export const Downloadable = styled.div `
    display:flex;
    flex-direction: row;
    width:100%;
    height:30%;
    justify-content:center;
`;

export const AStore = styled.div `

    flex:2;
    height: 35px;
    max-width: 120px;
    padding-top: 2em;
    padding-right: 0.5em;

`;
export const Gplay = styled.div `
    flex:2;
    max-width: 120px;
    height: 35px;
    padding-top: 2em;
    padding-left: 0.5em;
`;

export const BtnContainer = styled.div `
    display: flex;
    justify-content:center;
    width: 100%;
    height: 30%;
    min-height: 3em;

`
export const Btn = styled.div `
    width: 50%;
    flex: 1;
`;
export const Btn2 = styled.div `
    width: 50%;
    flex: 1;
`;

