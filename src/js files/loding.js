import React from 'react';
import ReactLoading from 'react-loading';
 import './../css/index.css';
const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={30} width={30} className="loading" />
);
 
export default Loading;