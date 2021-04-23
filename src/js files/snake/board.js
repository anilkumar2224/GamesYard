
import '../snake/board.css';


const Board = (props) => {
  var style1;
  if(props.snakeDot.length%5===0){
  style1={
    left:`${props.fooddot[0]}%`,
    top:`${props.fooddot[1]}%`,
    background:'gold',

  }
}else{
 style1={
    left:`${props.fooddot[0]}%`,
    top:`${props.fooddot[1]}%`,
  }
}


return (

      <div className="board">

        
  {props.wall.map((wall,i)=>{
    const style={
      left:`${wall[0]}%`,
      top:`${wall[1]}%`
    }
    return(
<div className="wall" key={i}  style={style}></div>
    )
  })}
   {props.snakeDot.map((dot,i)=>{
     var style;
     if(i===props.snakeDot.length-1){
    style={
        left:`${dot[0]}%`,
        top:`${dot[1]}%`,
        background:"orange"
      }
     }else{
    style={
      left:`${dot[0]}%`,
      top:`${dot[1]}%`
    }
  }
    return(
<div className="snake-dot" key={i}  style={style}></div>
    )
  })}
  
<div className="food"   style={style1}></div>
</div>
    

  );
        };

  export default Board;