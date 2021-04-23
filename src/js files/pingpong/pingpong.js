import React from 'react';
import Board from './Board';
import './ping.css'
import Popup from "../snake/level"
import Loading from '../loding'
var a=1;
class Pong extends React.Component{

    state={
        selectedLevel:"false",
        showPopup: true,
        speed:1,
        mode:true,
        isLoading: true
        
    }
    componentDidMount() {
      this.setState({isLoading: false})
  }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
      startGame(){
        if(!this.state.showPopup && a===2){
          var elem = document.documentElement;
          elem.requestFullscreen();
        this.setState({selectedLevel:"true"});  
        a=1;

        }
    }
    timer(){
        let box=document.getElementById('mod');
        let box2=document.getElementById('box'); 
        let x=3;
      
       let id= setInterval(() => {
        box2.style.opacity='0.8';
        box.style.width='100px';
        box.style.height='100px';
        box.style.textAlign='center';
        box.style.alignContent='center';
        box.style.justifyContent='center';
        box.style.fontSize='80px';
        box.style.position='relative';
        box.style.alignSelf='center';
        box.style.top='50%';
        box.style.left='50%';
        box.style.marginTop='-50px';
        box.style.marginLeft='-50px';
        box.style.padding='0';
            // console.log(x);
            box.innerHTML=x;
            x=x-1;
            if(x===-1){
                x=3;
               clearInterval(id);
               this.setState({
                showPopup: false,
          },()=>{
            this.startGame();
          });
            }
            
        }, 1000);
     
    }
    render(){
        return(
          this.state.isLoading ? <Loading type={'spinningBubbles'} color={'blue'}/> 
          : 
            <>
            <div className="ping">
            <Board start={this.state.selectedLevel} speed={this.state.speed}/>
            </div>
            {this.state.showPopup ? 
                <Popup
                mode={this.state.mode}
                  closePopup={()=>{
                    this.setState({
                       speed:1
                  },()=>{
                    a=2;
                    this.timer();
                  });
                      
                  }}
                  gameName={"Ping Pong"}
                  speed={(e)=>{
                      let x=parseInt(e.target.id);
                      if(x===200){
                       
                       this.setState({
                        speed:1
                         
                      },()=>{
                          a=2;
                          this.timer();
                        });
                      }else if(x===100){
                        this.setState({
                          speed:1.5
                           
                        },()=>{
                            a=2;
                            this.timer();
                          });
                      }else if(x===80){
                        this.setState({
                          speed:2
                           
                        },()=>{
                            a=2;
                            this.timer();
                          });
                      }
                    
                     
                  }}
                />
                : null
              }
            </>
            
        )
    }


}
export default Pong;