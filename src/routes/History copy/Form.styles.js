import styled from "styled-components";


// export const Wrapper = styled.div `
//     position: relative;
//     min-height: 100vh;
//     width: 100vw;
//     height: 100vh;
//     background: blue;

// `

// export const Content = styled.div `

//  {
//     min-height: 100vh;

//     padding-bottom: 8em;    /* Footer height */
//   }

// `

/* box-sizing: border-box; BÖR VARA I BODY ?
margin: 0; padding: 0; border: 0;
background: blue; */


export const Container = styled.div `{
    background-color: lightblue;
    min-height: 100vh;
    width: 90%; 
    margin 0 auto;
    display: flex;
    flex-direction: row;

}
    
`;


//  /* tablet style */
//  @media screen and(max-width: 1000px) {
//     flex-direction: row;
//     background-color: red;

// }

// /* phone style */
// @media screen and(max-width: 700px) {

// }


export const Main = styled.div `{
 
    background-color:blue;
    flex: 1 0 auto;
    display: flex;
    flex-flow: row wrap;

    /* smaller screens and laptops */
    @media (max-width: 1025px) {
        background-color: red;
        color: pink;
    }
    
    /* ipads */
    @media (max-width: 700px) {
        background-color: blue;
        color: red;
        flex-direction: column;
    }

     
    /* mobile */
    @media (max-width: 480px) {
        background-color: blue;
        color: red;
    }

  
}
`

export const MainBlock = styled.div `{
    background-color:grey;
    border: 2px solid black;
    min-height: 250px;
    flex: 1 0 50%;


    
}

`

// export const Footer = styled.div `
//     background-color:orange;
//     border: 2px solid black;
//     min-height: 250px;
//     flex: 1 0 auto;

// `