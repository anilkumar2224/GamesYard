import React from 'react';
import './backbut.css'
import {  
	Link 
} from 'react-router-dom';
const BackBut=(props)=>{

    return(
        <div className="backbut">
            <Link to={props.link}> <div className="sc-gCwZxT iJdziA"><div className="sc-jOVcOr gwxiBP"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="24" viewBox="0 0 14 24" fill={props.color}><defs><clipPath id="LeftArrow_a"><path d="M.508 13.184L10.824 23.5a1.679 1.679 0 102.375-2.375L4.07 11.996l9.13-9.129A1.679 1.679 0 1010.823.492L.508 10.81a1.674 1.674 0 00-.492 1.187c0 .43.164.86.492 1.188zm0 0"></path></clipPath></defs><g clipPath="url(#LeftArrow_a)"><path fill={props.color} d="M0 0H14V24H0z"></path></g></svg></div></div>
            </Link>
        </div>
    )

}
export default BackBut;
