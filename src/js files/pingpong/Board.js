import React, { useRef, useEffect,useState } from 'react';
import ReactNipple from 'react-nipple';
import Score from "../snake/scroe"
import './ping.css';
const Board=(props)=>{
   

let ball=new Ball();
let paddel=new Paddel();
let aipaddel=new Aipaddel();
var id;
const canvasRef = useRef(null);
const [userResult,setUserResult]=useState({
  restart:false,
  result:"",
  score:0,
  a:1 
});
    useEffect(() => {
   
  }, [])
  
  if(props.start==="true" && userResult.restart===false ){
    game();
}
      
function game(){ 
const timer=1;

id=setInterval(function(){
    var context=null;
    const canvas = canvasRef.current;
    if(canvas!=null) {  
         context = canvas.getContext('2d') ; 
    
    context.clearRect(0,0,600,400); 
context.fillStyle = '#fff'
 context.fillRect(0, 0, context.canvas.width, context.canvas.height)
 context.font = '32px serif';
 context.fillStyle="rgba(0,0,0,.7)";
 context.fillText("you : "+paddel.score, 105, 50);
 context.font = '32px serif';
 context.fillStyle="rgba(0,0,0,.9)";
 context.fillText("ai : "+aipaddel.score, 425, 50);
// context.setLineDash([5, 3]);
context.beginPath();
context.moveTo(300,50);
context.lineTo(300, 350);
context.strokeStyle="rgb(133,133,133)";
context.stroke();
paddel.move();
paddel.draw();
aipaddel.move();
aipaddel.draw();
ball.move();
ball.draw();
function reset() {
    // reset ball's value to older values
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = props.speed;
  
    // changes the direction of ball
    ball.vx = -ball.vx;
    ball.vy = -ball.vy;
  }
if (ball.x + 5 >= canvas.width) {
    
    // then user scored 1 point
    paddel.score += 1;
    //console.log("user score :"+paddel.score);
    reset();
  }

  // if ball hit on left wall
  if (ball.x - 5 <= 0) {
  
    // then ai scored 1 point
    aipaddel.score += 1;
    //console.log("aiscore :"+aipaddel.score);
    reset();
   
  }

  function collisionDetect(player, ball) {
    // returns true or false
    player.top = player.y;
    player.right = player.x + 10;
    player.bottom = player.y + 50;
    player.left = player.x;
  
    ball.top = ball.y - 5;
    ball.right = ball.x + 5;
    ball.bottom = ball.y + 5;
    ball.left = ball.x - 5;
  
    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
  }
  

  let player = (ball.x < canvas.width / 2) ? paddel : aipaddel;

  if (collisionDetect(player, ball)) {
    // default angle is 0deg in Radian
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < (player.y + 50 / 2)) {
      // then -1 * Math.PI / 4 = -45deg
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + 50 / 2)) {
      // if it hit the bottom of paddle
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
    }

    /* change velocity of ball according to on which paddle the ball hitted */
    ball.vx = (player === paddel ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.vy= ball.speed * Math.sin(angle);

    // increase ball speed
    if(props.speed===1.5){
      ball.speed += 0.1;
    }else if(props.speed===2){
      ball.speed += 0.15;
    }else if(props.speed===1){
      ball.speed += 0.2;
    }
    
  }}
  else{
        
    clearInterval(id);
   
}
// 
},timer);



};
function Ball(){
    this.x=300;
    this.y=200;
    this.vx=1;
    this.vy=1;
    this.top=0;
    this.left=0;
    this.right=0;
    this.down=0;
    this.speed=props.speed;
    this.move=function(){
        
        if(paddel.score<5 && aipaddel.score===5){
            clearInterval(id);
            //console.log("youlose");
            document.exitFullscreen();
            setUserResult({
              ...userResult,
              restart:true,
              score:paddel.score,
              result:"You lose! play again? "
             });
            
            //  setUserResult({
            //   ...userResult,
            //   score:paddel.score
            //  });
            //  setUserResult({
            //   ...userResult,
            //   result:"wann play again"
            //  });
            
           
            this.x=300;
            this.y=200;
            this.vx=1;
            this.vy=1;
            paddel.score=0;
            aipaddel.score=0;
            paddel.y=175;
             paddel.vy=0;
             aipaddel.y=175;
             aipaddel.vy=0;
            
     
        }else if(paddel.score===5 && aipaddel.score===5){
            clearInterval(id);
            //console.log("draw");
            document.exitFullscreen();
            this.x=300;
            this.y=200;
            this.vx=1;
            this.vy=1;
            setUserResult({
              ...userResult,
              restart:true,
              score:paddel.score,
              result:"Draw! play again? "});
          
            //  setUserResult({
            //   ...userResult,
            //   score:paddel.score
            //  });
            //  setUserResult({
            //   ...userResult,
            //   result:"wann play again"
            //  });
          
            paddel.score=0;
            aipaddel.score=0;
           
           
            paddel.y=175;
            paddel.vy=0;
            aipaddel.y=175;
            aipaddel.vy=0;
        
        }else if(paddel.score===5 && aipaddel.score<5){
            clearInterval(id);
            document.exitFullscreen();
            //console.log("you win");
            // setUserResult({restart:true,
            //   score:paddel.score,
            //   result:"you win :) wanna play again?"});
            setUserResult({
              ...userResult,
              restart:true,
              score:paddel.score,
              result:"You win :) wanna play again? "
             });
            //  setUserResult({
            //   ...userResult,
            //   score:paddel.score
            //  });
            //  setUserResult({
            //   ...userResult,
            //   result:"wann play again"
            //  });
            
            this.x=295;
            this.y=195;
            this.vx=1;
            this.vy=1;
            paddel.score=0;
            aipaddel.score=0;
            paddel.y=175;
             paddel.vy=0;
             aipaddel.y=175;
             aipaddel.vy=0;
      
        }


        if(this.x>=595){
            this.vx=-1;

        }else if(this.x<=5){
            this.vx=1;
        } else if(this.y>=395){
            this.vy=-1;

        }else if(this.y<=5){
            this.vy=1;
        }

        this.x=this.x+this.vx;
        this.y=this.y+this.vy;
    }
    this.draw=function(){
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d') ;
        context.beginPath();
      context.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      context.fillStyle="rgb(40,172,236)";
      context.fill();
    
      
    }
}
function Paddel(){
    this.x=10;
    this.y=175;
    this.vy=0;
    this.score=0;
    this.top=0;
    this.left=0;
    this.right=0;
    this.down=0;
   this.dir=function(val){
    this.vy=val;
 
  
   }
    this.move=function(){

        if(this.y>=350 && this.vy===2){
            this.vy=0;

        }else if(this.y<=0 && this.vy===-2){
            this.vy=0;
        }
        else if(this.y===350 && this.vy===-2){
            this.vy=-2;

        }else if(this.y===0 && this.vy===2){
            this.vy=2;
        }

        this.y=this.y+this.vy;
        
       
        
        
    }
    this.draw=function(){
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d') ;
      context.fillStyle="rgb(96,125,139)";
      roundedRectangle(this.x, this.y, 10, 50,5);
  
    }
    function roundedRectangle(x, y, w, h,radius)
   {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d') ;
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.lineWidth="4";
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);    
  context.fill();
}

}
//ai paddel
function Aipaddel(){
    this.x=580;
    this.y=175;
    this.vy=0;
  this.top=0;
  this.left=0;
  this.right=0;
  this.down=0;
  this.score=0;
 
    this.move=function(){

   
      
this.y += ((ball.y - (this.y + 50 / 2))) * 0.0333*props.speed;

    
       
       
        
        
    }
    this.draw=function(){
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d') ;
      context.fillStyle="rgb(244,67,53)";
      roundedRectangle(this.x, this.y, 10, 50,5);
  
    }
    function roundedRectangle(x, y, w, h,radius)
   {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d') ;
  var r = x + w;
  var b = y + h;
  context.beginPath();
  context.lineWidth="4";
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);    
  context.fill();
}
}

document.addEventListener('keydown',e=>{


    if(e.keyCode===38){
        paddel.dir(-2);

    }
    else if(e.keyCode===40){
        paddel.dir(2);
    }


});
document.addEventListener('keyup',e=>{
    
    
    paddel.dir(0);



});
document.addEventListener('keyup',e=>{
    paddel.dir(0);

});
document.addEventListener('touchend',e=>{
  paddel.dir(0);
})



    return(
      <>
<canvas className="pingboard" ref={canvasRef} {...props} width="600" height="400"/>
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
                            
                            
                            // //console.log(evt, data);
                            // //console.log(data.angle.degree)

                          
                          
                             if(data.angle.degree>45&&data.angle.degree<=135)
                            {
                              paddel.dir(-2);
                            }
                            else if(data.angle.degree>225&&data.angle.degree<=315)
                            {
                              paddel.dir(2);
                            }

                        }

                        }
                />
            </div>
{userResult.restart?
    <Score
        result={userResult.score}
        text={userResult.result}
        restart={()=>{
          setUserResult({
            ...userResult,
            result:"",
            score:0,
            restart:false
          })
        }} 
      />
      :null
      }
</>
    );
}
export default Board;