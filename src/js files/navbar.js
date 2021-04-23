import React from 'react';
import {  
	Link 
} from 'react-router-dom';
import LottieAnimation from '../Lottie';
import home from '../animation/logo.json';
import '../css/navstyle.css';
import Particles from 'react-particles-js';
import {  Redirect } from 'react-router-dom';


class Navbar extends React.Component{

  state={
    logout:false,
    dropdownopen:false,
    name:'',
    imgUrl:'',

  }
openMenu(){
 let drop= document.getElementById('dropmenu1');
 drop.classList.remove('cJPguJ');
drop.classList.add('fOLahO');
}

componentDidMount(){
  this.setState({
    name:this.props.name,
    imgUrl:this.props.imgUrl
  })
  }
onBlur(event) {
 
  if (!event.target.classList.contains('pic')) {
      // do your thing.
      let drop= document.getElementById('dropmenu1');
      drop.classList.add('cJPguJ');
     drop.classList.remove('fOLahO');
     
  }
  
}
logOut=()=>{
  localStorage.removeItem('jwttoken');
this.setState({logout:true});

}





    render(){
      const { logout } = this.state;

      if (logout) {
        
        return <Redirect to='/'/>;
      }else{
       
        return(
       <>
        {this.state.dropdownopen?
       <div className="wrappppper">
<div className="sc-dOkuiw cZSwHq">
  <ul className="sc-hZeNU bykKA">
    <div className="sc-hMjcWo jGpEqr">
      <div className="sc-bLJvFH jdDRis">
        <img data-testid="profileImage" src={this.state.imgUrl} alt="Profile" className="sc-jQMNup kwjCAB" />
          <span className="sc-htpNat sc-bxivhb sc-gwVKww sc-eAudoH bBjrgG">{this.state.name}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" onClick={()=>{this.setState({dropdownopen:false}); }}><g fill="none" fillRule="evenodd" opacity=".8"><path fill="#000000" fillRule="nonzero" d="M11.25 1.808L10.193.75 6 4.942 1.808.75.75 1.808 4.942 6 .75 10.193l1.058 1.057L6 7.057l4.193 4.193 1.057-1.057L7.057 6z"></path><path d="M-3-3h18v18H-3z"></path></g></svg></div><Link to='/profile'><span className="sc-htpNat sc-bxivhb sc-hZSUBg sc-jGFFOr cpZCyr">Profile</span></Link><Link to='/leaderboard'><span className="sc-htpNat sc-bxivhb sc-hZSUBg sc-jGFFOr cpZCyr">Leader Board</span></Link><Link to='/search'><span className="sc-htpNat sc-bxivhb sc-hZSUBg sc-jGFFOr cpZCyr">Search Players</span></Link><span className="sc-htpNat sc-bxivhb sc-hZSUBg sc-jGFFOr cpZCyr" onClick={this.logOut}>Logout</span>
          {/* <span className="sc-htpNat sc-bxivhb sc-hZSUBg sc-jGFFOr cpZCyr">Internships</span> */}
        </ul>
</div>
</div>
      
        :null
        }  
      <div className='navbar' >
          <div className='logo'>
<div className='name'>
    <span>GamesYard</span>
</div>
<div className='image'>
<LottieAnimation lotti={home} height={80} width={80} play={false} />
</div>
          </div>
          <div className="nav_dropdown">
          <i className="fa fa-bars" onClick={()=>{ this.setState({dropdownopen:true}); }} ></i>
          </div>
          <div className='profile'>
            <div className='scorebtn'>
            <button className="btn btn-one" ><Link to='/leaderboard'>Leader Board</Link></button>
            </div>
            <div className='pic' onClick={this.openMenu}  onMouseEnter={this.openMenu} onMouseLeave={this.onBlur}>
                {/* <div className='circle'  >
                <i className="fa fa-user"></i>
                </div> */}
                <div className="sc-giOsra kjleIM"><div className="sc-dXLFzO gJbaGh"><div className="sc-htpNat sc-gZMcBi sc-kasBVs sc-cnTzU dAbVkj">{this.state.name}</div><div className="sc-ckYZGd iKHHPT"><img data-testid="profileImage" src={this.state.imgUrl} alt="Profile" className="sc-jQMNup kwjCAB" /></div></div></div>

                <div className="sc-eweMDZ cJPguJ" id="dropmenu1"><div className="sc-eQGPmX nZqDL"><div data-testid="menuItem" className="sc-dAOnuy kQbeDZ"><Link to='/profile'><div className="sc-htpNat sc-gZMcBi sc-VJcYb sc-cSYcjD deczea">Profile</div></Link></div><div data-testid="menuItem" className="sc-dAOnuy kQbeDZ"><Link to='/search'><div className="sc-htpNat sc-gZMcBi sc-VJcYb sc-cSYcjD deczea">Search Players</div></Link></div><div data-testid="menuItem" className="sc-dAOnuy kQbeDZ"></div><div data-testid="menuItem" className="sc-dAOnuy kQbeDZ"><div className="sc-htpNat sc-gZMcBi sc-VJcYb sc-cSYcjD deczea" onClick={this.logOut}>Logout</div></div></div></div>
            </div>
          </div>
          <Particles
    params={{
        "particles": {
            "number": {
              "value": 380,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#000"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 20,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 70,
              "color": "#000",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 120,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 1
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
	}} />
      </div>
      </>
      
        );
}
    }
}
export default Navbar; 