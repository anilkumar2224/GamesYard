import React from 'react';
import '../tictoctoe/tictoc.css'
import Popup from "../snake/level"
import Score from "../snake/scroe"
import Loading from '../loding'
// class Tictoc extends React.Component{
//     render(){
//         return(
//             <h1>Tic Toc Toe</h1>
//         );
//     }
// }
// export default Tictoc;
var comp
function Square(props) {
  if(props.value==='O'){
    comp ="comp";
  }else{
    comp="user";
  }
    return (
      <button className={`square ${comp}`} id={props.id} onClick={props.onClick} >
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
   
    renderSquare(i) {
     
      return (
       
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          id={"id"+i}
        />
      );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  function Line(props){
    var style={
      transform:`rotate(${props.angle}deg)`,
      left:props.left,
      top:props.top,
      height:"200px",
      backgroundColor:props.color

    }
    return(
      <hr className="line" style={style}></hr>
    );

  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        angle:90,
        top:50,
        left:50,
        gameover:false,
       color:"red",
       showPopup:true,
        selectedLevel:"false",
        restart:false,
        Score:0,
        mode:false,
        selection:"random",
        turn:"human",
        tie:false,
        isLoading: true
         
        
         
      };
    }
    componentDidMount() {
      this.setState({isLoading: false})
  }
  //   componentDidUpdate( ){
  //  if( this.calculateWinner(this)){
  //    this.setState({
  //      gameover:true
  //    })
  //  }
   
    
    // }
    calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      const linedata=[
        [90,-52,147],
        [90,47,147],
        [90,150,147],
        [0,50,47],
        [0,47,147],
        [0,50,249],
        [315,47,147],
        [45,47,147]
      ]
      //console.log(squares);
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a]!=null && squares[a] === squares[b] && squares[a] === squares[c]) {
          //console.log(squares[a],squares[b],squares[c]);
          const [angle,top,left]=linedata[i];
          // return squares[a];
          if( squares[a]==='X'){
          this.setState({
             angle:angle,
             top:top,
             left:left,
             gameover:true,
             color:"red",
             Score:1
          })
          
        }else{
          this.setState({
            angle:angle,
            top:top,
            left:left,
            gameover:true,
            color:"black",
            Score:0
         })
         
        }
        setTimeout(()=>{
          document.exitFullscreen();
          this.setState({
            restart:true
         })
         
        },1000);
        return  true; 
        }
      }
      let openSpots = 0;
      for (let i = 0; i < 9; i++) {
       
          if (squares[i] ==null) {
            openSpots++;
          }
        
      }
      if(openSpots===0)
      {
        this.setState({
          gameover:true,
          Score:"tie",
          angle:0,
            top:0,
            left:0,
            tie:true
        });
        setTimeout(()=>{
          document.exitFullscreen();
          this.setState({
            restart:true
         })
        },1000);
       return true;
      }
      else
      return null;
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
 

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber+1 );
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if(squares[i]==null){
      if(this.state.selection==='2-player'){

      if(!this.state.gameover){
      const history = this.state.history.slice(0, this.state.stepNumber+1 );
      const current = history[history.length-1];
      const squares = current.squares.slice();
 
      squares[i] = this.state.xIsNext ? "X" : "O";  
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
      if (this.calculateWinner(squares)||squares[i]) {
       
        return;
      }
    }
  }else if(this.state.selection==='random'){
    if(!this.state.gameover){
   
if(this.state.turn==='human'){
  const history = this.state.history.slice(0, this.state.stepNumber+1 );
  const current = history[history.length-1];
  const squares = current.squares.slice();
  squares[i] = 'X'; 
 
 this.setState({
  history: history.concat([
    {
      squares: squares
    }
  ]),
  stepNumber: history.length,
  xIsNext: !this.state.xIsNext,
     turn:'ai'
 },()=>{
  if(!this.state.gameover){
  this.getAI();
  }
 });
 if (this.calculateWinner(squares)||squares[i]) {
       
  return;
}
 
}
}


  }
}
    }
    
    getAI(){
      if(!this.state.gameover){
      const history = this.state.history.slice(0, this.state.stepNumber+1 );
      const current = history[history.length-1];
      const squares = current.squares.slice();  
      let x=9;
      //console.log("ai called");
    for(let i=0;i<9;i++){
        if(squares[i]===null){
            x=i;
            break;
        }
    }
     
     if(x!==9){
      squares[x]='O';
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        turn:"human"
      });
       
      if (this.calculateWinner(squares)) {
       
        return;
      }
  }
}


  }
    // handleClick(i) {
    //   if(!this.state.gameover){
    //   const history = this.state.history.slice(0, this.state.stepNumber+1 );
    //   const current = history[history.length-1];
    //   const squares = current.squares.slice();
 
      
      
     
    //   // this.bestMove();
     
    //   squares[i] = "X";  
    //   this.setState({
    //     history: history.concat([
    //       {
    //         squares: squares
    //       }
    //     ]),
    //     stepNumber: history.length,
    //     xIsNext: !this.state.xIsNext,
    //   });
    //   this.bestMove();
    //   if (this.calculateWinner(squares) || squares[i]) {
       
    //     return;
    //   }

    // }
    
    // }
     bestMove() {
      // AI to make its turn
      let bestScore = -Infinity;
      let move;
      let i;
      const history = this.state.history.slice(0, this.state.stepNumber+1 );
      const current = history[history.length-1];
      const squares = current.squares.slice();
      //console.log(squares);
      for ( i= 0; i < 9; i++) {
        
          // Is the spot available?
          if (squares[i] == null) {
            
            squares[i] = 'O';
            //console.log(squares);
            let score = this.minimax(squares, 0, false);
            //console.log(score);
            squares[i] = null;
            if (score > bestScore) {
              bestScore = score;
              move = i;
            
          }
        }
      }
    //console.log(move);
    squares[move] ='O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
    //console.log(squares);
    // currentPlayer = human;
   
    }
    
     
    
 minimax(squares, depth, isMaximizing) {
   
  let result =this.calculateWinner(squares);
  //console.log(result);
  let scores={
    X:10,
    O:-10,
    tie:0
  }
  if (result !== null) {
    //console.log(scores[result]);
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      
        // Is the spot available?
        if (squares[i] ==null) {
          squares[i] = 'O';
          let score = this.minimax(squares, depth + 1, false);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      
        // Is the spot available?
        if (squares[i] == null) {
          squares[i] = 'X';
          let score = this.minimax(squares, depth + 1, true);
          squares[i] =null;
          bestScore = Math.min(score, bestScore);
        }
      
    }
    return bestScore;
  }
}
  
    // jumpTo(step) {
    //   this.setState({
    //     stepNumber: step,
    //     xIsNext: (step % 2) === 0
    //   });
    // }
    
    
  
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      // const winner = this.calculateWinner(current.squares);
  
      // const moves = history.map((step, move) => {
      //   const desc = move ?
      //     'Go to move #' + move :
      //     'Go to game start';
      //   return (
      //     <li key={move}>
      //       <button onClick={() => this.jumpTo(move)}>{desc}</button>
      //     </li>
      //   );
      // });
  
      // let status;
      // if (winner) {
      //   status = "Winner: " + winner;
      
      // } else {
      //   status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      // }
  
      return (
        this.state.isLoading ? <Loading type={'spinningBubbles'} color={'blue'}/> 
          : 
        <div className="b">
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          {
           this.state.gameover&&!this.state.tie?
           <Line angle={this.state.angle} top={this.state.top} left={this.state.left} color={this.state.color}/>
           :null 
          }
          {/* <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div> */}
        </div>
        {this.state.showPopup ? 
                <Popup
                  closePopup={()=>{
                    var elem = document.documentElement;
                    elem.requestFullscreen();
                    this.setState({
                       selection:"random",
                       showPopup: !this.state.showPopup
                  })
                      
                  }}
                  gameName={"Tic Toc Toe"}
                  speed={(e)=>{
                      let x=parseInt(e.target.id);
                      if(x===200){
                        var elem = document.documentElement;
                        elem.requestFullscreen();
                       this.setState({
                        selection:"2-player",
                        showPopup: !this.state.showPopup
                         
                      })
                      }else if(x===100){
                        var elem = document.documentElement;
                        elem.requestFullscreen();
                        this.setState({
                          selection:"random",
                          showPopup: !this.state.showPopup
                           
                        })
                      }
                     
                  }}
                />
                : null
              }
    {this.state.restart?
    <Score
        result={this.state.Score}
        text={"wannna play again ?"}
        mode={this.state.mode}
        restart={()=>{
          var elem = document.documentElement;
          elem.requestFullscreen();
           this.setState({
            history: [
              {
                squares: Array(9).fill(null)
              }
            ],
            stepNumber: 0,
            xIsNext: true,
            angle:90,
            top:50,
            left:50,
            gameover:false,
           color:"red",
           showPopup:false,
            selectedLevel:"false",
            restart:false,
            Score:0,
            mode:false,
            tie:false,
            turn:"human"
           
           })
                }}
          
        
    />
      :null
      }

        
        </div>
      );
    }
  }
  
  // ========================================
  
 export default Game;
  
  