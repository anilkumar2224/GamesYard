import React from 'react';
import './style.css';
import './register.css';
import './login.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Loading from '../loding'
import {  Redirect } from 'react-router-dom';


var a=0;
var b=0;

class Auth extends React.Component{
    state={
      redirect: false,
      isLoading:false
    }
   componentDidMount() {
      if(localStorage.getItem('jwttoken')){
        this.setState({ redirect: true });
      }
  }
 
  notify=()=>{
    toast.success('registered successfully', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      width:'200px'
      });
    }
    notifyy=()=>{
      toast.warning('Invalid Email', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
    notifyerror=()=>{
      toast.error('Please enter valid Email or Phone number and password', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }
      notifyerror1=()=>{
        toast.error('Please check password', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        }
        notifyerror2=()=>{
          toast.error('Username taken', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          }
          notifyerror3=()=>{
            toast.error('Invalid Eamil  or Passward', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            }
            notifyerror4=()=>{
              toast.warning('Please Enter All Fields', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
              }
              notifyerror5=()=>{
                toast.error('Email is already taken', {
                  position: "top-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
                }
login(){
    const Icard=document.getElementById('cube1');
const right=document.getElementById('right');
const front=document.getElementById('front');
    setTimeout(()=>{
        
        front.style.display='flex';
        
    },130);
    Icard.classList.remove('leftrotate');
    setTimeout(()=>{
        if(a===1){
        right.style.display='none';
        a=0;
        }
       
    },1000);


   };

signup=()=>{
    const Icard=document.getElementById('cube1');
const right=document.getElementById('right');
const front=document.getElementById('front');
    setTimeout(()=>{
        
        right.style.display='block';
        
    },130);
   
    Icard.classList.add('leftrotate');
    setTimeout(()=>{
        
        front.style.display='none';
        b=0;
        
       
    },1000);
    a=1; 
  
    };

 logauth=(e)=>{
e.preventDefault();
this.setState({isLoading: true});
const email=document.getElementById('name').value;
  const password=document.getElementById('password').value;
  if(email===''||password===''){
    // document.getElementById('password').value='';
    this.notifyerror();
    this.setState({isLoading: false});
  }else{
  const data={
    email:email,
    password:password,
    
  }
 axios.post('https://agile-dawn-02443.herokuapp.com/login',data).then(res=>{
  //console.log(res);
  localStorage.setItem('jwttoken',res.data.token);
  //console.log(res.data.token);
  //console.log(localStorage.getItem('jwttoken'));
 
    this.setState({
      isLoading:false,
    });
    window.location.href='/home';
    
 
}).catch(err=>{
  //console.log(err);
  // document.getElementById('password').value='';
  this.setState({isLoading:false});
  this.notifyerror3();
})

  }

}
  regauth=(e)=>{
    e.preventDefault();
  const email=document.getElementById('email').value;
  const username=document.getElementById('username').value;
  const password=document.getElementById('pass').value;
  const password1=document.getElementById('pass1').value;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
  if(email===''|| username===''||password===''|| password1===''){
    this.notifyerror4();
  }else if(!re.test(String(email).toLowerCase())){
     this.notifyy();
  }else{
  if(password===password1){
 
  const data={
    email:email,
    about:'Hey there i am playing games!',
    username:username,
    password:password,
    snakeScore:0,
    astroidScore:0,
    imgurl:''
  }
 axios.post('https://agile-dawn-02443.herokuapp.com/register',data).then(data=>{
    //console.log(data);
    if(data.data==='User Already Exists')
    this.notifyerror2();
    else if(data.data==='Email Already Exists')
    this.notifyerror5();
    else if(data.data==="Invalid Email")
    this.notifyy();
    else{
    document.getElementById('register').reset();
    this.notify();
    this.login();
    }
  }).catch(err=>{
    //console.log(err);
   
   
  })
}else{
  //console.log('password does\'t matched');
  this.notifyerror1();
}
}

  }


    render(){
      const { redirect } = this.state;

      if (redirect) {
        
        return <Redirect to='/home'/>;
        
      }else{
        return(
          
          <>
           <ToastContainer />
        <div className="block">
        <div className="auth_navbar">
            <div className="auth_logo">
                GamesYard
            </div>
        </div>
        <div className="cardblock">
         
          <div className="container">
            <div className="cube-container">
              <div className="cube cube1" id="cube1">
                <div className="box box1 front" id="front">
                  <span id="root1">
                    <section className="section-all">
                
        
                      <main className="main1" role="main">
                        <div className="wrapper">
                          
                          <article className="article">
                            <div className="auth_content">
                            
                              <div className="login-box">
                              <div className="header">
                          <p>Welcome!</p>
                            </div>
                                <div className="form-wrap">
                                
                                  <form className="form" id="logform" onSubmit={this.logauth}>
                
                                    <div className="input-box">
                                      <input type="text" id="name" aria-describedby="" placeholder="Email" aria-required="true"  name="username"  required />
                                    </div>  
                
                                    <div className="input-box">
                                      <input type="password" name="password" id="password" placeholder="Password"  aria-required="true"  required />
                                    </div>  
                
                                    <span className="button-box">
                                      <button className="log_btn" type="submit" name="submit" onClick={this.logauth}>
                                      {this.state.isLoading ? <Loading type={'bubbles'} color= {'white'}/>  :"Log in"}
                                        </button>
                                    </span>  
                      
                                   
                                    
                                  </form>
                                </div> 
                              </div> 
                
                              <div className="register-box">
                                <p className="tex">Don't have an account?<a id="signup" onClick={this.signup}>Sign up</a></p>
                              </div> 
                
                      
                            </div> 
                          </article>
                        </div> 
                      </main>
                
                    
                    </section>
                  </span>
                      
                </div>

                <div className="box box1 right" id="right">
                  <main>
                    <div className="page">
                        <div className="header">
                          <p>Sign up to play games and make fun.</p>
                        </div>
                        <div className="container">
                          <form action="post" id="register">
                            <input type="text" placeholder=" Email" id="email" required/>
                            <input type="text" placeholder="Username" id="username" required/>
                            <input type="password" placeholder="Password" id="pass" required/>
                             <input type="password" placeholder="Confirm Password"  id="pass1" required/>
                            <button  type="submit" onClick={this.regauth}>Sign up</button>
                          </form>  
                        </div>
                    </div>
                    <div className="option">
                       <p>Have an account? <a id="login" onClick={this.login}>Log in</a></p>
                    </div>
                  
                  </main>
                                        
                     
                </div>
                
          
              </div>
         
            </div>
          </div>
         

        </div>

        <div className="foot1">
            &copy;AK
        </div>

        </div>
</>
        )
    }
  }
}

export default Auth;
