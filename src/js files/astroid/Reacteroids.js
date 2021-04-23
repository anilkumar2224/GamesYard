import React, { Component } from 'react';
import Ship from '../astroid/Ship';
import Asteroid from '../astroid/Astroid';
import { randomNumBetweenExcluding } from '../astroid/helpers'
import '../astroid/style.css';
import Popup from '../snake/level'
import ReactNipple from 'react-nipple';
import axois from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

export class Reacteroids extends Component {
  constructor() {
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      },
      context: null,
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        space : 0,
      },
      asteroidCount: 3,
      currentScore: 0,
      topScore: localStorage['topscore'] || 0,
      inGame: false,
      showPopup:true,
      mode:true,
      isLoading: true
    }
    this.ship = [];
    this.asteroids = [];
    this.bullets = [];
    this.particles = [];

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

  handleResize(value, e){
    this.setState({
      screen : {
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: window.devicePixelRatio || 1,
      }
    });
  }

  handleKeys(value, e){
    let keys = this.state.keys;
   
    if(e.keyCode === KEY.LEFT   || e.keyCode === KEY.A) keys.left  = value;
    if(e.keyCode === KEY.RIGHT  || e.keyCode === KEY.D) keys.right = value;
    if(e.keyCode === KEY.UP     || e.keyCode === KEY.W) keys.up    = value;
    if(e.keyCode === KEY.SPACE) keys.space = value;
    this.setState({
      keys : keys
    });
  }
 
 async componentDidMount() {
  this.setState({isLoading: false})
    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    window.addEventListener('resize',  this.handleResize.bind(this, false));
     this.timer();
     this.startGame();
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context: context });
    requestAnimationFrame(() => {this.update()});
      window.addEventListener('touchend',()=>{
        let keys = this.state.keys;
        keys.space=false;
       this.setState({
          keys : keys
        });
      });
      
    
  }
 
 keyDown(){
  window.addEventListener('touchend',()=>{
    let keys = this.state.keys;
    keys.left=false;
    keys.up=false;
    keys.right=false;
    this.setState({
      keys : keys
    });
  });
 }

  // componentWillUnmount() {
  //   window.removeEventListener('keyup', this.handleKeys);
  //   window.removeEventListener('keydown', this.handleKeys);
  //   window.removeEventListener('resize', this.handleResize);
  // }

  update() {
    const context = this.state.context;
   

    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);

    // Motion trail
    context.fillStyle = '#000';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    // Next set of asteroids
    if(!this.asteroids.length){
      let count = this.state.asteroidCount + 1;
      this.setState({ asteroidCount: count });
      this.generateAsteroids(count)
    }

    // Check for colisions
    this.checkCollisionsWith(this.bullets, this.asteroids);
    this.checkCollisionsWith(this.ship, this.asteroids);

    // Remove or render
    this.updateObjects(this.particles, 'particles')
    this.updateObjects(this.asteroids, 'asteroids')
    this.updateObjects(this.bullets, 'bullets')
    this.updateObjects(this.ship, 'ship')

    context.restore();

    // Next frame
    requestAnimationFrame(() => {this.update()});
  }

  addScore(points){
    if(this.state.inGame){
      this.setState({
        currentScore: this.state.currentScore + points,
      });
    }
  }

  startGame(){
    
    this.setState({
      inGame: true,
      currentScore: 0,
    });

    // Make ship
    let ship = new Ship({
      position: {
        x: this.state.screen.width/2,
        y: this.state.screen.height/2
      },
      create: this.createObject.bind(this),
      onDie: this.gameOver.bind(this)
    });
    this.createObject(ship, 'ship');

    // Make asteroids
    this.asteroids = [];
    this.generateAsteroids(this.state.asteroidCount)
  }
  postdata(){
    const newScore={
        astroidScore:this.state.currentScore,
        }
        const token=localStorage.getItem('jwttoken');
        const response=axois.post(process.env.BACKEND_URL+'/updatescore', newScore,{
            headers:{
              Authorization:token?`Bearer ${token}`:""
            }
        });
  response.then(data=>{
      //console.log(data);
  }).catch(err=>{
   //console.log(err);
   this.notify2();
  })
 
}
  gameOver(){
  
    this.setState({
      inGame: false,
    });
this.postdata();
    // Replace top score
    if(this.state.currentScore > this.state.topScore){
      this.setState({
        topScore: this.state.currentScore,
      });
      localStorage['topscore'] = this.state.currentScore;
    }
  }

  generateAsteroids(howMany){
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let asteroid = new Asteroid({
        size: 80,
        position: {
          x: randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x-60, ship.position.x+60),
          y: randomNumBetweenExcluding(0, this.state.screen.height, ship.position.y-60, ship.position.y+60)
        },
        create: this.createObject.bind(this),
        addScore: this.addScore.bind(this)
      });
      this.createObject(asteroid, 'asteroids');
    }
  }

  createObject(item, group){
    this[group].push(item);
  }

  updateObjects(items, group){
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        this[group].splice(index, 1);
      }else{
        items[index].render(this.state);
      }
      index++;
    }
  }

  checkCollisionsWith(items1, items2) {
    var a = items1.length - 1;
    var b;
    for(a; a > -1; --a){
      b = items2.length - 1;
      for(b; b > -1; --b){
        var item1 = items1[a];
        var item2 = items2[b];
        if(this.checkCollision(item1, item2)){
          item1.destroy();
          item2.destroy();
        }
      }
    }
  }

  checkCollision(obj1, obj2){
    var vx = obj1.position.x - obj2.position.x;
    var vy = obj1.position.y - obj2.position.y;
    var length = Math.sqrt(vx * vx + vy * vy);
    if(length < obj1.radius + obj2.radius){
      return true;
    }
    return false;
  }


  timer(){
    let box=document.getElementById('mod');
    let box2=document.getElementById('box'); 
    // box.style.display='none';
    box.style.width='120px';
    box.style.height='50px';
    box.style.fontSize='30px';
    box.style.textAlign='center';
    box.style.alignContent='center';
    box.style.justifyContent='center';
    box.style.position='relative';
    box.style.alignSelf='center';
    box.style.top='50%';
    box.style.left='50%';
    box.style.marginTop='-50px';
    box.style.marginLeft='-50px';
    box.style.padding='0';
    let x=3;
    box.innerHTML="Ready?";
   let id= setInterval(() => {
    box2.style.opacity='1';
    box.style.width='100px';
    box.style.height='100px';
    box.style.fontSize='80px';
   
    box.innerHTML=x;
        //console.log(x);
        
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
 
  handleClick(){
    let keys = this.state.keys;
    keys.space = true;
    this.setState({
      keys : keys
    });
    // this.keyDown;
    
  }

  render() {
    
    let endgame;
    let message;

    if (this.state.currentScore <= 0) {
      message = '0 points... So sad.';
    } else if (this.state.currentScore >= this.state.topScore){
      message = 'Top score with ' + this.state.currentScore + ' points. Woo!';
    } else {
      message = this.state.currentScore + ' Points though :)'
    }

    if(!this.state.inGame){
      endgame = (
        <div className="endgame">
          <p>Game over, man!</p>
          <p>{message}</p>
          <button className="button"
            onClick={ this.startGame.bind(this) }>
            try again?
          </button>
        </div>
      )
    }

    return (
      <>
       <ToastContainer />
      <div>
     
        { endgame }
        <span className="score current-score" >Score: {this.state.currentScore}</span>
        <span className="score your-top-score" >Top Score: {this.state.topScore}</span>
        <span className="controls" >
          Use [A][S][W][D] or [←][↑][↓][→] to MOVE<br/>
          Use [SPACE] to SHOOT
        </span>
        <canvas ref="canvas" className="canvas"
          width={this.state.screen.width * this.state.screen.ratio}
          height={this.state.screen.height * this.state.screen.ratio}
        />
        <button className="fire" onClick={this.handleClick.bind(this)}></button>
      </div>
      <div className="nipple">
        
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ mode: 'static', position: { top: '80%', left: '30%' } }}
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

                           let keys = this.state.keys;
                            if(data.angle.degree>135&&data.angle.degree<=225){
                              
                               keys.left  = true;
                              this.setState({
                                keys : keys
                              });
                              this.keyDown();
                            }
                            else if(data.angle.degree>45&&data.angle.degree<=135)
                            {
                              keys.up  = true;
                              this.setState({
                                keys : keys
                              });
                              this.keyDown(); 
                            }
                            else if((data.angle.degree>315&&data.angle.degree<=360)||(data.angle.degree<=45&&data.angle.degree>=0))
                            {
                              keys.right = true;
                              this.setState({
                                keys : keys
                              });
                              this.keyDown(); 
                            }
                           

                        }

                        }
                />
            </div>
      {this.state.showPopup ? 
      
      
                <Popup
                  
                  mode={this.state.mode}
                 
                />
                : null
              }
      </>
    );
  }
}