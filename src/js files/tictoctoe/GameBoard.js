const GameBoard=(props)=>{
  
    return(
    
        <div className="gameboard" >
            <div className="row">
            <div className="block" id={`id0`} onClick={props.handleClick}>{props.value[0]} </div> 
            < div className="block" id={`id1`}   onClick={props.handleClick}>{props.value[1]}</div>  
            <div className="block" id={`id2`}  onClick={props.handleClick}> {props.value[2]}</div>   
            </div>
            <div className="row">
            <div className="block" id={`id3`}   onClick={props.handleClick}>{props.value[3]}</div> 
            <div className="block" id={`id4`}  onClick={props.handleClick}>{props.value[4]}</div>  
            <div className="block" id={`id5`}  onClick={props.handleClick}>{props.value[5]}</div>   
            </div>
            <div className="row">
            <div className="block" id={`id6`}  onClick={props.handleClick}>{props.value[6]}</div> 
            <div className="block" id={`id7`}   onClick={props.handleClick}>{props.value[7]}</div>  
            <div className="block" id={`id8`}  onClick={props.handleClick}>{props.value[8]}</div>   
            </div>
                
        </div>
        
    )

}
export default GameBoard;