import React from 'react';
import '../css/footerstyle.css';

class Footer extends React.Component{
    render(){
        return(
      <div className='footer'>
        
          <div className="Social-media">
       <a href="https://github.com/anilkumar2224"><i className="fa fa-github"></i></a>
      <a href="https://www.linkedin.com/in/anil-kumar-g-23ab911b9/"><i className="fa fa-linkedin"></i></a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=anilkumar22official@gmail.com&body="><i className="fa fa-envelope"></i></a>
       </div>
       <div className='foot'>
         <a href='https://anilkumar2224.github.io/'> &copy;AK</a>
          </div>
      </div>
        );
    }
}
export default Footer;