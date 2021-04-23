import React from 'react';
import LottieAnimation from '../Lottie';
import home from '../animation/game.json';
import '../css/sidenavstyle.css';



class Sidenav extends React.Component{
     


    constructor() {
        super();
        this.state = { windowWidth: 550 , height:300};
      }
    
     handleResize = (e) => {
        window.innerWidth>600?
      this.setState({ windowWidth: 550, height:300 }): this.setState({ windowWidth: 300 , height:300})
     
     };
    
    
     UNSAFE_componentDidMount() {
      window.addEventListener("resize", this.handleResize);
     }
  
    
    render(){
        return(
     
            <div className='sidenav'>
              
           <LottieAnimation lotti={home} height={this.state.height} width={this.state.windowWidth}  play={true}/>
            </div>
        
        );
    }
}
export default Sidenav;