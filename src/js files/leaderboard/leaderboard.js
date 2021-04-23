import axios from 'axios';
import React from 'react'
import Loading from '../loding';
import './lbstyle.css';
import BackBut from '../back/back'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
class Leaderboard extends React.Component{
	state= {
        title: 'Leaderboard',
		snaketopusers:[],
		astroidtopusers:[],
		isLoading: true,
		
    }

	
	notifyy=()=>{
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
		let a=0;
		let b=0;

		const token=localStorage.getItem('jwttoken');
		await axios.get('https://agile-dawn-02443.herokuapp.com/getstopusers',{
			headers:{
				Authorization:token?`Bearer ${token}`:""

			}
		}).then(res=>{
			// console.log(res.data);
			this.setState({
				snaketopusers:res.data
			})
			a=1;
		}).catch(err=>{
			// console.log(err);
			this.setState({isLoading: false});
			this.notifyy();
			
		});
	   await axios.get('https://agile-dawn-02443.herokuapp.com/getatopusers',{
			headers:{
				Authorization:token?`Bearer ${token}`:""

			}
		}).then(res=>{
			// console.log(res.data);
			this.setState({
				astroidtopusers:res.data
			})
			b=1;
			
		}).catch(err=>{
			// console.log(err);
			this.setState({isLoading: false});
			this.notifyy();
		})
	
		  if(a===1&&b===1)
			this.setState({isLoading: false});
	
		
	}
	render() {
		return (
			this.state.isLoading ? <Loading type={'spin'} color={'blue'}/> 
			: 
            <>
			<ToastContainer />
			<BackBut  link={'/home'} color={'#12427e'}/>
            <Title title={this.state.title} className={"Title1"}  />
            <div className="wrap_cover">
    
			<div className="Leaderboard">
                <div className="heading1">
                 <h1> Snake Game </h1>
                </div>
				<List people={this.state.snaketopusers} />
			</div>
            <div className="Leaderboard">
                <div className="heading2" >
                 <h1> Astroid Game </h1>
                </div>
				<List people={this.state.astroidtopusers} />
			</div>
            </div>
            </>
		);
	}
};

class Title extends React.Component  {
	render() {
		return (
			<div className={this.props.className} >{this.props.title}</div>
		);
	}
};

class List extends React.Component{

	render() {
		
		
		let peopleList=this.props.people;
	
		let people = peopleList.map(function (row,i) {
		
			   let image='';
			   if(row[0]===''||row[0]===undefined){
			 image=' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKUle0pFonwi2vcfhdFmDoFytTlMnRhJc-pYCCmX2jkIpEwR6gWRcoirCsNTSubfWyAo&usqp=CAU';
			}else{
				image=row[0];
			}
				return <Person name={row[1]} score={row[2]} image={image} key={i}  />
			} );
			
	
		
		return (
			<ul>
				{people}
			</ul>
		);

	}
};

class Person extends React.Component{
	render() {
		return (
			<li className="Person">
				<div className="Image" style={{ backgroundImage: 'url(' + this.props.image + ')'}}></div>
				<div className="Name">{this.props.name}</div>
				<div className="Score">{this.props.score}</div>
			</li>
		);
	}
}

// Render
export default Leaderboard;
