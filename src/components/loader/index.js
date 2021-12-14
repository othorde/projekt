import React from 'react'

//styles
import { Loading, FourOFour, Wrapper } from './Form.styles.js'


const Loader = (props) => {
    return (
        <>
        <Wrapper>
            <Loading>
            <div class="loader"></div>
            </Loading>
            <FourOFour width={props.width}> 
                <div class="FourOFour"> 
                </div> 
            </FourOFour>
        </Wrapper>
        </>
        )        
}

export default Loader