import React from 'react'

//styles
import { Loading, FourOFour, Wrapper } from './Form.styles.js'

/* Används när en sida laddar in async. Laddar alltså denna först tills dess att state eller fetch är klar*/
const Loader = () => {
    return (
        <>
        <Wrapper>
            <Loading>
            <div className="loader"></div>
            </Loading>
            <FourOFour > 
                <div className="FourOFour"> 
                </div> 
            </FourOFour>
        </Wrapper>
        </>
        )        
}

export default Loader