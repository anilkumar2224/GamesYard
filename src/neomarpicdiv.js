import React from 'react';
import {  
	Link 
} from 'react-router-dom'; 
import './css/neomorphism.css';
import LottieAnimation from './Lottie';
import home from './animation/game.json';
import one from './animation/snake.json';
import two from './animation/pong.json';
import three from './animation/hard.gif';
import four from './animation/tictoc.json';
import five from './animation/asteroid.json';
import './css/sidenavstyle.css';
 const GetStart=(props)=>{
     if(props.display){
        return(
           
           <div> <button  className="btnn start" ><Link to={props.value}>start</Link></button></div>
           
        );
     }
     else{
         return null;
     }
    }

    

class Neodiv extends React.Component{
    constructor() {
        super();
        this.state = { windowWidth:200, height:200,animi:home,display:false,link:null,level:'easy',game:"GamesYard",strike:false};
      }

    getLevel(){
        return this.state.level;
    }
     handleClick = (e) => {
     const name=e.target.id;
     if(name==='one'){
        this.setState({ animi: one,display:true,link:'snake',game:"Snake Game",strike:false});
       
     }else if(name==='two'){
        this.setState({ animi: two,display:true,link:'pingpong',game:"Ping Pong",strike:false});
     }else if(name==='three'){
        this.setState({ animi: three,display:true,link:'impossible',game:"Impossible",strike:true});  
     }else if(name==='four'){
        this.setState({ animi: four,display:true,link:'tictoc',game:"Tic Tac Toe",strike:false});
     }else if(name==='five'){
        this.setState({ animi: five,display:true,link:'Reacteroids',game:"Space Battle",strike:false});
    }
        
        
     }
 
    
    
     UNSAFE_componentDidMount() {
        
      window.addEventListener("resize", this.handleResize);
     }
   
   
    render(){
        return(
            <>
            <div className="neodiv">
                <ul >
                    <li><button  className="btnn one" id="one" onClick={this.handleClick}>Snake</button></li>
                    <li><button className="btnn two" id="two" onClick={this.handleClick}>Ping pong</button></li>
                    <li><button className="btnn three" id="three" onClick={this.handleClick}><del>Im</del> 	&nbsp;possible</button></li>
                    <li><button className="btnn four" id="four" onClick={this.handleClick}>Tic Tac Toe</button></li>
                    <li><button className="btnn five" id="five" onClick={this.handleClick}>Space Battle</button></li>
                </ul>
                
               
            </div>
            <  div className='sidenav' > 
           

            
            <div className="content">
                <h1 className="h" >Let's</h1>
                <h2 data-heading="A">Play Game</h2>
                <h1 className="h1">Let's</h1>
                <h3 data-heading="K">Make Fun</h3>
            </div>
            <div className="iphone-x" >
  <div className="side">
    <div className="screen">

      <div className="card">
        <div className="imgBx">
          {this.state.strike?
           <img className="gif" src={this.state.animi} alt='profile'/>
          :
        <LottieAnimation lotti={this.state.animi} height={this.state.height} width={this.state.windowWidth}  play={true}/>
          }
        </div>
        <div className="details">
          {this.state.strike?
          <h1><del className="del">{this.state.game.substring(0,2)}</del>{this.state.game.substring(2)}</h1>
          :<h1>{this.state.game}</h1>
          }
        
        </div>
      </div>
   
    <div className="play">
    <GetStart  display={this.state.display} value={this.state.link}/>
    </div>
    </div>
  </div>
  <div className="line"></div>
  <div className="header">
    <div className="sensor-1"></div>
    <div className="sensor-2"></div>
    <div className="sensor-3"></div>
  </div>
  <div className="volume-button"></div>
  <div className="power-button"></div>
</div>







            </div>
            </>
        );
    }
}

export default Neodiv;