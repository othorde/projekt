import React from 'react'

//styles
import { Loading, FourOFour, Wrapper } from './Form.styles.js'


const Loader = ({width}) => {
    return (
        <>
        <Wrapper>
            <Loading>
            <div className="loader"></div>
            </Loading>
            <FourOFour width={width}> 
                <div className="FourOFour"> 
                </div> 
            </FourOFour>
        </Wrapper>
        </>
        )        
}

export default Loader