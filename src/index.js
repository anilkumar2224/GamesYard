import React from 'react';
import ReactDOM from 'react-dom';
import { 
	BrowserRouter as Router, 
	Route,  
	Switch 
} from 'react-router-dom'; 
import Snake from "./js files/snake/snake";
import HardGame from "./js files/toughgame/game";
import Tic from "./js files/tictoctoe/tictoc";
import Pong from "./js files/pingpong/pingpong"
import './css/index.css';
import './js files/navbar';
import Navbar from './js files/navbar';
import  Main from './js files/main';
import  Footer from './js files/footer';
import { Reacteroids } from './js files/astroid/Reacteroids';
import LB from './js files/leaderboard/leaderboard'
import Auth from './js files/login/auth'
import Profile from './js files/profilepage/profile'
import Loading from './js files/loding'
import axios from 'axios';
import ProtectedRoute from './protected';
import Notfound from './notfound/notfound';
import Search from './js files/search/search';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

class App extends React.Component{
 
  state={
    isLoading: true,
    name:'',
    imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKUle0pFonwi2vcfhdFmDoFytTlMnRhJc-pYCCmX2jkIpEwR6gWRcoirCsNTSubfWyAo&usqp=CAU'
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
  async componentDidMount(){
   
  const token=localStorage.getItem('jwttoken');
 await axios.get('https://agile-dawn-02443.herokuapp.com/getprofile',{
    headers:{
      Authorization:token?`Bearer ${token}`:""

    }
  }).then(res=>{
    // console.log(res.data[0].username);
    this.setState({
      name:res.data[0].username,
    })
    if(res.data[0].imgurl!==''){
      this.setState({
        imgUrl:res.data[0].imgurl,
   
      })
    }
  
    this.setState({isLoading:false})
    
  }).catch(err=>{
    // console.log(err);
   
    this.setState({isLoading:false})
    this.notify2();
  });

 
    
 
 }


  render(){
   
    return(
      this.state.isLoading ? 
        <Loading type={'spinningBubbles'} color={'blue'}/>
          : 
          
      <div className='maj'>
         <ToastContainer />
        <Navbar  name={this.state.name} imgUrl={this.state.imgUrl}/>
        <Main/>
        <Footer/>
      </div>
   
      
    );
  }
}



ReactDOM.render(

  <Router>
  <Switch> 
  <Route exact path='/' component={Auth} ></Route> 
  
  <ProtectedRoute exact path='/home' component={App} ></ProtectedRoute>
  <ProtectedRoute exact path='/leaderboard' component={LB} ></ProtectedRoute>
  <ProtectedRoute exact path='/profile' component={Profile} ></ProtectedRoute>
  <ProtectedRoute exact path='/snake' component={Snake} ></ProtectedRoute>
  <ProtectedRoute exact path='/pingpong' component={Pong} ></ProtectedRoute>
  <ProtectedRoute exact path='/impossible' component={HardGame} ></ProtectedRoute>
  <ProtectedRoute exact path='/tictoc' component={Tic} ></ProtectedRoute>
  <ProtectedRoute exact path='/Reacteroids' component={Reacteroids} ></ProtectedRoute>
  <ProtectedRoute exact path='/search' component={Search} ></ProtectedRoute>
  <Route  exact path='/*' component={Notfound} ></Route> 
  
</Switch> 
</Router>
,document.getElementById('root') );
export default App;

