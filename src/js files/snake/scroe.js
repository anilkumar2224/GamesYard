import './popup.css'
import BackBut from '../back/back'
const Score=(props)=> {
    return (
      <div className="box">

    
      <div className="modal-container" id="m3-o" >
      <BackBut  link={'/home'} color={'#FFF'}/>
        <div className="modal" >
          <h1 className="modal__title">Your Score : {props.result}</h1>
          <p className="modal__text ">{props.text}</p>
          <button className="modal__btn "  onClick={props.restart}>Restart&rarr;</button>
          
              
        </div>
      </div>
    </div>
    );
}
export default Score;