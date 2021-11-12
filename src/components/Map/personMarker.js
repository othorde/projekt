import {React, useEffect, useState, useRef } from "react";


//styles
import {Style2, BtnStyle} from './Form.styles'
import bike from '../../images/bike.png'



export default function PersonMarker(props) {
    const Marker = ({ Marker }) => <div>{Marker}</div>;

	// const latitude = props.coordinates.latitude;
	// const longitude = props.coordinates.longitude;
    // console.log(latitude)
	return (
            <Marker
                key={2}
                lat={56.1589}
                lng={13.7668}>
                <BtnStyle>
             
                    <div className="crime-marker" style={{width:"10px", height:"10px", background: "red"}}> 
                    <img className = "person" src={bike} alt="person"/>
                    </div>
                </BtnStyle>
            </Marker>
	);
}

