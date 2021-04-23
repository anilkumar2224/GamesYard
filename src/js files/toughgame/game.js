import React from 'react';
import Board from './board1';
import './board1.css'
import Popup from "../snake/level"
import Score from "../snake/scroe"
import ReactNipple from 'react-nipple';
import Loading from '../loding'
var wallArray=[
    [0,0],
    [4,0],
    [8,0],
    [56,0],
    [60,0],
    [64,0],
    [68,0],
    [72,0],
    //
    [0,4],
    [4,4],
    [8,4],
    [16,4],
    [20,4],
    [24,4],
    [28,4],
    [32,4],
    [36,4],
    [40,4],
    [44,4],
    [48,4],
    [52,4],
    [56,4],
    [64,4],
    [68,4],
    [72,4],
    //
    [0,8],
    [4,8],
    [8,8],
    [16,8],
    [20,8],
    [24,8],
    [28,8],
    [32,8],
    [36,8],
    [40,8],
    [44,8],
    [48,8],
    [52,8],
    [56,8],
    [64,8],
    [68,8],
    [72,8],
    //
    [0,12],
    [4,12],
    [8,12],
    [16,12],
    [20,12],
    [24,12],
    [28,12],
    [32,12],
    [36,12],
    [40,12],
    [44,12],
    [48,12],
    [52,12],
    [56,12],
    [64,12],
    [68,12],
    [72,12],
    //
    [0,16],
    [4,16],
    [8,16],
    [16,16],
    [20,16],
    [24,16],
    [28,16],
    [32,16],
    [36,16],
    [40,16],
    [44,16],
    [48,16],
    [52,16],
    [56,16],
    [64,16],
    [68,16],
    [72,16],
    //
    [0,20],
    [4,20],
    [8,20],
    [12,20],
    [16,20],
    [64,20],
    [68,20],
    [72,20],
];
var a;
class HardGame extends React.Component{
    
    state={
        wall:wallArray,
    
        fooddot:[
            [16,4],
            [56,8],
            [16,12],
            [56,16]
        ],
        direction:'',
        speed:120,
        Dot:[4,4],
        x:4,
        y:4,
        id:0,
        showPopup:true,
        selectedLevel:"false",
        restart:false,
        Score:0,
        mode:true,
        isLoading: true

    }
    componentDidMount(){
        document.onkeydown=this.onKeyDown;
        this.startGame();
        
    this.setState({isLoading: false});
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
        this.setState({selectedLevel:"true",id: setInterval(()=>{
            this.moveBall();
        }
          ,this.state.speed)});  
        a=1;
        }
      
    }
    componentDidUpdate(){
      this.collisionCheck();  
      this.checkWinner();
    }
    checkWinner(){
        if(this.state.Dot[0]>=64){
        //   console.log("you won ");
        document.exitFullscreen();
          clearInterval(this.state.id);
          if(!this.state.restart){
          this.setState({
            fooddot:[
                [16,4],
                [56,8],
                [16,12],
                [56,16]
            ],
            direction:'',
            Dot:[4,4],
            x:4,
            y:4,
            restart:true,
            Score:1
          })
        }
    
        }
    }
findDistance(x1,y1,x2,y2){
    return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}

    collisionCheck(){
        if(((this.findDistance(this.state.Dot[0],this.state.Dot[1],this.state.fooddot[0][0],this.state.fooddot[0][1]))<4)||((this.findDistance(this.state.Dot[0],this.state.Dot[1],this.state.fooddot[1][0],this.state.fooddot[1][1]))<4)||((this.findDistance(this.state.Dot[0],this.state.Dot[1],this.state.fooddot[2][0],this.state.fooddot[2][1]))<4)||((this.findDistance(this.state.Dot[0],this.state.Dot[1],this.state.fooddot[3][0],this.state.fooddot[3][1]))<4)){
            clearInterval(this.state.id);
            document.exitFullscreen();
            this.setState({
                wall:wallArray,
                fooddot:[
                    [16,4],
                    [56,8],
                    [16,12],
                    [56,16]
                ],
                direction:'',
                Dot:[4,4],
                x:4,
                y:4,
                restart:true,
                touch:""
            })
         }
     }
   
    onKeyDown=(e)=>{
        e=e||window.event;
     
        if(e.keyCode===37&&(this.state.Dot[0]>0&&(this.state.Dot[0]!==16||this.state.Dot[1]===20)&&!(this.state.Dot[0]===56&&this.state.Dot[1]===0)&&!(this.state.Dot[0]===64&&this.state.Dot[1]!==0))){
        
            this.setState({
                direction:'left',
                Dot:[this.state.Dot[0]-4,this.state.Dot[1]]
            })

        }else if(e.keyCode===38&&(this.state.Dot[1]>0&&!(this.state.Dot[0]===12&&this.state.Dot[1]===20)&&!(this.state.Dot[0]>=16&&this.state.Dot[0]<56&&this.state.Dot[1]<=4))){
            this.setState({
            
                direction:'up',
                Dot:[this.state.Dot[0],this.state.Dot[1]-4]
            })

        }else  if(e.keyCode===39&&(this.state.Dot[0]<8||(this.state.Dot[1]===20&&this.state.Dot[0]===8||this.state.Dot[0]===12)||(this.state.Dot[0]>=16&&this.state.Dot[0]<56&&this.state.Dot[1]!==20)||(this.state.Dot[0]===56&&this.state.Dot[1]===0)||(this.state.Dot[0]>=60&&this.state.Dot[0]<72))){
            this.setState({
               
                direction:'right',
                Dot:[this.state.Dot[0]+4,this.state.Dot[1]]
            })

        }else  if(e.keyCode===40&&(this.state.Dot[1]<20&&!(this.state.Dot[0]>16&&this.state.Dot[0]<=56&&this.state.Dot[1]===16)&&!(this.state.Dot[0]===56&&this.state.Dot[1]===20)&&!(this.state.Dot[0]===60&&this.state.Dot[1]===0))){
            this.setState({
                
                direction:'down',
                Dot:[this.state.Dot[0],this.state.Dot[1]+4]
            })

        }
        
       

       
    
    }
    moveBall(){
     
        if(this.state.fooddot[0][0]===56){
            this.setState({
            x:-4,
            y:4
            })
        }else if(this.state.fooddot[0][0]===16){
            this.setState({
                x:4,
                y:-4
                })
        }
        let samp=this.state.fooddot;
        samp[0][0]=samp[0][0]+this.state.x;
        samp[1][0]=samp[1][0]+this.state.y;
        samp[2][0]=samp[2][0]+this.state.x;
        samp[3][0]=samp[3][0]+this.state.y;
        this.setState({
            fooddot:samp
        })
     
        
    }
    render(){
        return(
            this.state.isLoading ? <Loading type={'spinningBubbles'} color={'blue'}/> 
          : 
            <>
            <div className="boardd">
            
            <Board Dot={[this.state.Dot[0],this.state.Dot[1]]} fooddot={this.state.fooddot} wall={this.state.wall} />

            </div>
            <div className="nipple">
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ mode: 'static', position: { top: '80%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    style={{
                        outline: '1px dashed red',
                        width: 100,
                        height: 100
                        // if you pass position: 'relative', you don't need to import the stylesheet
                    }}
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                    onMove={(evt, data) => 
                        {
                            
                            
                            // console.log(evt, data);
                            // console.log(data.angle.degree)

                            if((data.angle.degree>135&&data.angle.degree<=225)&&((this.state.Dot[0]>0&&!(this.state.Dot[0]>=15.9&&this.state.Dot[0]<=16.1&&this.state.Dot[1]<20))||(this.state.Dot[0]===16&&this.state.Dot[1]>20)&&!(this.state.Dot[0]===56&&this.state.Dot[1]===0)&&!(this.state.Dot[0]===64&&this.state.Dot[1]!==0))){
                                this.setState({
                                    direction:'left',
                                    Dot:[this.state.Dot[0]-0.3,this.state.Dot[1]]
                                })
                            }
                            else if((data.angle.degree>45&&data.angle.degree<=135)&&(this.state.Dot[1]>0&&!(this.state.Dot[0]>10&&this.state.Dot[0]<15.9&&this.state.Dot[1]<=20)&&!(this.state.Dot[0]>=16&&this.state.Dot[0]<56&&this.state.Dot[1]<=4)))
                            {
                                this.setState({
            
                                    direction:'up',
                                    Dot:[this.state.Dot[0],this.state.Dot[1]-0.3]
                                })
                            }
                            else if(((data.angle.degree>315&&data.angle.degree<=360)||(data.angle.degree<=45&&data.angle.degree>=0))&&(this.state.Dot[0]<8||(this.state.Dot[1]>=20&&this.state.Dot[0]<=16)||(this.state.Dot[0]>=16&&this.state.Dot[0]<56&&this.state.Dot[1]<=17)||(this.state.Dot[0]>=55.9&&this.state.Dot[1]<=3)||(this.state.Dot[0]>=60&&this.state.Dot[0]<72)))
                            {
                                this.setState({
               
                                    direction:'right',
                                    Dot:[this.state.Dot[0]+0.3,this.state.Dot[1]]
                                })
                            }
                            else if((data.angle.degree>225&&data.angle.degree<=315)&&(this.state.Dot[1]<20&&!(this.state.Dot[0]>16.1&&this.state.Dot[0]<=57&&this.state.Dot[1]>=15.9)&&!(this.state.Dot[0]===60&&this.state.Dot[1]===0)))
                            {
                                this.setState({
                
                                    direction:'down',
                                    Dot:[this.state.Dot[0],this.state.Dot[1]+0.3]
                                }) 
                            }
                          

                        }

                        }
                />
            </div>
            {this.state.showPopup ? 
                <Popup
                mode={this.state.mode}
                  closePopup={()=>{
                    this.setState({
                       speed:120,
                       showPopup: !this.state.showPopup
                  },()=>{ 
                    a=2;
                    this.startGame();
                  });
                      
                  }}
                  gameName={"Impossible"}
                  speed={(e)=>{
                      let x=parseInt(e.target.id);
                      if(x===200){
                       
                       this.setState({
                        speed:120,
                        showPopup: !this.state.showPopup
                         
                      },()=>{
                          a=2;
                          this.startGame();
                        });
                      }else if(x===100){
                        this.setState({
                          speed:110,
                          showPopup: !this.state.showPopup
                           
                        },()=>{
                            a=2;
                            this.startGame();
                          });
                      }else if(x===80){
                        this.setState({
                          speed:100,
                          showPopup: !this.state.showPopup
                           
                        },()=>{
                            a=2;
                            this.startGame();
                          });
                      }
                    
                     
                  }}
                />
                : null
              }
    {this.state.restart?
    <Score
        result={this.state.Score}
        text={"wannna play again ?"}
        restart={()=>{
            var elem = document.documentElement;
            elem.requestFullscreen();
           this.setState({
            
               id: setInterval(()=>{
                     this.moveBall();   
                      },this.state.speed),
               restart:false,
                Score:0    
                      
                      
                    }); 
                }}
          
        
    />
      :null
      }

        </>
        )
    }

}
export default HardGame;