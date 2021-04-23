
import './board1.css';
const Board=(props)=>{
    var  style={
            left:`${props.Dot[0]}%`,
            top:`${props.Dot[1]}%`
        }
  
    return(
        <div className="playboard">

       {props.wall.map((wall,i)=>{
          var cc='';
           if(wall[0]===0||wall[0]===4||wall[0]===8||wall[0]===64||wall[0]===68||wall[0]===72){
              cc='#bbffb7';
               
           }else if(  (wall[1]===12||wall[1]===4)&&(wall[0]===16||wall[0]===24||wall[0]===32||wall[0]===40||wall[0]===48||wall[0]===56)||(wall[0]===60&&wall[1]===0)){
                cc='#ffffff';
           }
           else if(  (wall[1]===8||wall[1]===16)&&(wall[0]===12||wall[0]===20||wall[0]===28||wall[0]===36||wall[0]===44||wall[0]===52)||(wall[0]===16&&wall[1]===20)){
             cc='#ffffff';
        }
           else{
                cc='#e7e5ff';
           }
    const style={
      left:`${wall[0]}%`,
      top:`${wall[1]}%`,
      backgroundColor:cc
    }
    return(
<div className="bloc" key={i}  style={style}></div>
    )
  })}
    {props.fooddot.map((fdot,i)=>{
 const style1={
    left:`${fdot[0]}%`,
    top:`${fdot[1]}%`,
  }
  return(
<div className="fooddot" key={i}  style={style1}></div>
  )
})
}
<div className="dot"  style={style}></div>
        </div>
     
    )
  

}
export default Board;