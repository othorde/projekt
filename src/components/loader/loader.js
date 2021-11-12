import React from 'react'

//styles
import { Loading, FourOFour, Wrapper } from './Form.styles.js'


const Loader = () => {
    
    return (
        <>
        <Wrapper>
            <Loading>
            <div class="loader"></div>
            </Loading>
            <FourOFour> 
                <div class="FourOFour"> 
                    <h2>404 Page not found :(</h2> 
                </div> 
            </FourOFour>
        </Wrapper>
        </>
        )        
}

export default Loader