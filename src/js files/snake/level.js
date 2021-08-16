import './popup.css'
import BackBut from '../back/back'
const Popup=(props)=> {
  var btn1,btn2;
  if(!props.mode){
    btn1 ="2-player";
     btn2="play with AI";
  }else{
     btn1="Easy";
     btn2="Medium";
  }
    return (
      <>
     
      <div className="box" id='box'>
       
    
      <div className="modal-container" id="m3-o" >
       
        <BackBut  link={'/home'} color={'#FFF'}/>
      
     
        <div className="modal" id="mod" >
          <h1 className="modal__title">{props.gameName}</h1>
          <p className="modal__text">{props.text}</p>
          <p className="modal__text"><b>Choose Level :</b></p>
          <button className="modal__btn" id='200' onClick={props.speed}>{btn1}</button>
          <button className="modal__btn" id='100' onClick={props.speed}>{btn2}</button>
          {props.mode?
           <button className="modal__btn" id='80' onClick={props.speed}>Hard</button>:null}
         
          <a  className="link-2" onClick={props.closePopup}></a>
          <p id='timer'></p>
        </div>
      </div>
    </div>
    </>
    );
}
export default Popup;
