import React from 'react';
import '../snake/snake.css';
import Board from './board';
import Popup from './level';
import Score from './scroe';
import ReactNipple from 'react-nipple';
import axois from 'axios';
import Loading from '../loding'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
var wallArray=[
    [0,0],
    [0,4],
    [0,8],
    [0,12],
    [0,16],
    [0,20],
    [0,44],
    [0,48],
    [0,52],
    [0,56],
    [0,60],
    [0,64],
    [0,68],
    [0,72],
    [0,76],
    [0,80],
    [0,84],
    [0,88],
    [0,92],
    [0,96],
    [4,96],
    [8,96],
    [24,96],
    [28,96],
    [32,96],
    [36,96],
    [40,96],
    [40,92],
    [40,88],
    [40,84],
    [40,68],
    [36,68],
    [32,68],
    [28,68],
    [28,64],
    [28,60],
    [28,56],
    [28,52],
    [24,68],
    [20,68],
    [16,68],
    [12,68],
    [8,68],
    [4,68],
    [44,96],
    [48,96],
    [52,96],
    [56,96],
    [60,96],
    [64,96],
    [68,96],
    [72,96],
    [76,96],
    [80,96],
    [84,96],
    [88,96],
    [92,96],
    [96,96],
    [96,92],
    [96,88],
    [96,84],
    [96,80],
    [96,76],
    [96,72],
    [96,68],
    [96,64],
    [96,60],
    [96,56],
    [96,52],
    [96,48],
    [96,44],
    [96,20],
    [96,16],
    [96,12],
    [96,8],
    [96,4],
    [96,0],
    [92,0],
    [88,0],
    [84,0],
    [80,0],
    [76,0],
    [72,0],
    [68,0],
    [64,0],
    [60,0],
    [56,0],
    [56,4],
    [56,8],
    [56,12],
    [56,16],
    [56,20],
    [56,24],
    [56,28],
    [56,32],
    [56,36],
    [56,40],
    [56,44],
    [56,48],
    [56,52],
    [56,52],
    [60,52],
    [64,52],
    [68,52],
    [72,52],
    [88,52],
    [92,52],
    [52,0],
    [48,0],
    [44,0],
    [40,0],
    [36,0],
    [32,0],
    [28,0],
    [24,0],
    [8,0],
    [4,0],
];

var elem = document.documentElement;


const recursive=()=>{
    let a= Math.floor((Math.random()*89)/4)*4+4;
    let b=Math.floor((Math.random()*89)/4)*4+4;
    let c=0;
  wallArray.forEach(data=>{
      if(data[0]===a && data[1]===b){
          c=1;
      }
    
  });
  if(c!==1){
    c=0;
    return [a,b];
  }else{
    c=0;
      return recursive();
  }
}
const intialSate={
    
        direction:'RIGHT',
        speed:150,
        fooddot:recursive(),
        snakeDot:[
            [8,8],
            [12,8]
           
        ],
        wall:wallArray,
        showPopup: true,
        id:0,
        score:false,
        result:0,
        mode:true,
        isLoading: true

}
var a=1;

class Snake extends React.Component{
 
    state=intialSate;
    componentDidMount(){
        this.setState({isLoading: false})
        // setInterval(this.moveSnake,this.state.speed);
        document.onkeydown=this.onKeyDown;
          
          /* Safari */
             
  
    
    }
    
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    componentDidUpdate(){
        this.isSnakeCollapsed();
        this.isOutOfBorders();
        this.checkIfEat();
    }

    startGame(){
        if(!this.state.showPopup && a===2){
        this.setState({id:setInterval(this.moveSnake,this.state.speed)});  
        a=1;
        
           elem.requestFullscreen();
        }
    }
    onKeyDown=(e)=>{
        e=e||window.event;
        let movementdir=this.state.direction;
      if(e.keyCode===37&& movementdir!=='RIGHT'){
          this.setState({
              direction:'LEFT'
          });
      }
      else if(e.keyCode===38&& movementdir!=='DOWN')
      {
        this.setState({
            direction:'UP'
        }); 
      }
      else if(e.keyCode===39&& movementdir!=='LEFT')
      {
        this.setState({
            direction:'RIGHT'
        }); 
      }
      else if(e.keyCode===40&& movementdir!=='UP')
      {
        this.setState({
            direction:'DOWN'
        }); 
      }
    }

    moveSnake=()=>{
        let dots=[...this.state.snakeDot];
        let head=dots[dots.length-1];

        switch (this.state.direction) {
            case 'LEFT':
                head=[head[0]-4,head[1]];
                break;
                case 'RIGHT':
                head=[head[0]+4,head[1]];
                break;
                case 'UP':
                head=[head[0],head[1]-4];
                break;
                case 'DOWN':
                head=[head[0],head[1]+4];
                break;
                default:
                    
        
        }
        dots.push(head);//adds new head
        dots.shift();//removes tail
        this.setState({snakeDot:dots});
    }
    growSnake(){
        let newSnake=[...this.state.snakeDot];
        newSnake.unshift([]);
        this.setState({
            snakeDot:newSnake
        });
    }
    checkIfEat(){
        let head=this.state.snakeDot[this.state.snakeDot.length-1];
        if(this.state.snakeDot.length%5===0&&(head[0]===this.state.fooddot[0]&& head[1]===this.state.fooddot[1])){
            this.setState({
                fooddot:recursive()
            });
            let newSnake=[...this.state.snakeDot];
            newSnake.unshift([]);
            newSnake.unshift([]);
            this.setState({
                snakeDot:newSnake
            });
            
    
        }
        else if(head[0]===this.state.fooddot[0]&& head[1]===this.state.fooddot[1]){
            this.setState({
                fooddot:recursive()
            });
            this.growSnake();
        }
        }
        
   isOutOfBorders(){
     let wall=this.state.wall;
     let dots=[...this.state.snakeDot];
     let head=dots[dots.length-1];
  
//      if(head[0]>=96 || head[1]>=96||head[0]<4||head[1]<4){
//   this.onGameOver();
//      }


if (head[0] <= 0 && this.state.direction==='LEFT'){
    head=[96,head[1]];//go left, wrap right
    
dots.shift();//removes tail
dots.push(head);//adds new head
this.setState({snakeDot:dots});
}

else if (head[0] >=96 && this.state.direction==='RIGHT' ){
    head=[0,head[1]];//go right, wrap left
    dots.push(head);//adds new head
dots.shift();//removes tail
this.setState({snakeDot:dots});
} 

else if (head[1] <= 0 && this.state.direction==='UP'){
    head=[head[0],96];//go top, wrap bottom
    dots.push(head);//adds new head
dots.shift();//removes tail
this.setState({snakeDot:dots});
}

else if (head[1] >= 96 && this.state.direction==='DOWN'){
    head=[head[0],0];//go bottom, wrap top
    dots.push(head);//adds new head
dots.shift();//removes tail
this.setState({snakeDot:dots});
}



wall.map((data)=>{
    if(head[0]===data[0] && head[1]===data[1])
    {
         this.onGameOver();
    }
  })

    }
    
    isSnakeCollapsed(){
        let snake=[...this.state.snakeDot];
        let head=snake[snake.length-1];
        snake.pop();
        snake.forEach(dot=>{
        if(head[0]===dot[0] && head[1]===dot[1]){
           this.onGameOver();
        }
        })
    }
    
    notify2=()=>{
        toast.error('Oops! something bad happend', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
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
     postdata(){
        const newScore={
            snakeScore:this.state.snakeDot.length,
            }
            const token=localStorage.getItem('jwttoken');
      const response=axois.post(process.env.REACT_APP_BACKEND_URL+'/updatescore', newScore,{
          headers:{
              Authorization:token?`Bearer ${token}`:""
          }
      });
      response.then(data=>{
        //   console.log(data);
      }).catch(err=>{
    //    console.log(err);
    this.notify2();
      })
     

    }
  onGameOver(){
         // alert(`Game Over Snake Length is ${this.state.snakeDot.length}`);
      this.postdata();
      document.exitFullscreen();
            clearTimeout(this.state.id);
            this.setState({
                score:!this.state.score,
                result:this.state.snakeDot.length,
                fooddot:recursive(),
                direction:'RIGHT',
                snakeDot:[
                    [8,8],
                    [12,8]
                   
                ],
                id:0
        });
        

      


    
    }
    render(){
        return(
            this.state.isLoading ? <Loading type={'spinningBubbles'} color={'blue'}/> 
          : 
            <>
          <ToastContainer />
            <div className="snakegame" >
                <div className="snake_score">
                    <h1>Score : {this.state.snakeDot.length}</h1>
                </div>
            
            <div className="board">
            
            <Board snakeDot={this.state.snakeDot} fooddot={this.state.fooddot} wall={this.state.wall} />

            </div>
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

                            let movementdir=this.state.direction;
                            if(data.angle.degree>135&&data.angle.degree<=225&& movementdir!=='RIGHT'){
                                this.setState({
                                    direction:'LEFT'
                                });
                            }
                            else if(data.angle.degree>45&&data.angle.degree<=135&& movementdir!=='DOWN')
                            {
                              this.setState({
                                  direction:'UP'
                              }); 
                            }
                            else if((data.angle.degree>315&&data.angle.degree<=360)||(data.angle.degree<=45&&data.angle.degree>=0)&& movementdir!=='LEFT')
                            {
                              this.setState({
                                  direction:'RIGHT'
                              }); 
                            }
                            else if(data.angle.degree>225&&data.angle.degree<=315&& movementdir!=='UP')
                            {
                              this.setState({
                                  direction:'DOWN'
                              }); 
                            }

                        }

                        }
                />
            </div>
          {this.state.showPopup ? 
                <Popup
                  closePopup={()=>{
                    this.setState({
                        speed:200,
                        score:false
                  },()=>{
                    a=2;
                    this.timer();
                  });
                      
                  }}
                  mode={this.state.mode}
                  gameName={"Snake Game"}
                  speed={(e)=>{
                      let x=parseInt(e.target.id);
                    this.setState({
                        speed:x,
                        score:false
                    },()=>{
                        a=2;
                        this.timer();
                      });
                     
                  }}
                />
                : null
              }
               {this.state.score ? 
                <Score
                  result={this.state.result}
                  text={"wanna play again!"}
                  restart={()=>{
                    this.setState({
                    score:false
                    },()=>{
                        a=2;
                        this.startGame();
                      });
                   
                  }}
                />
                : null
              }
          </>
        );
    }
}
export default Snake;

