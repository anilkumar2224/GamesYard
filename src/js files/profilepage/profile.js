import React from 'react'
import './profilepage.css'
import {GiSnake } from "react-icons/gi";
import {FaRocket}from "react-icons/fa";
import Loading from '../loding';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import BackBut from '../back/back';

const ImgUpload =({
    onChange,
    src
  })=>
    <label  className="custom-file-upload fa fas-upload fas up">
      <div className="img-wrap img-upload" >
        <img  src={src} alt='profile'/>
      </div>
      <input id="photo-upload" type="file" onChange={onChange}/> 
    </label>
  
  
  const Name =({
    onChange,
    value
  })=>
    <div className="pfield">
      <label className='up'>
        Username :
      </label>
      <input 
        id="nname" 
        type="text" 
        onChange={onChange} 
        value={value} 
        placeholder="Enter Username" 
        required/>
    </div>
  
    
  const Status =({
    onChange,
    value
  })=>
    <div className="pfield">
      <label  className='up'>
        About :
      </label>
      <input 
        id="status" 
        type="text" 
        onChange={onChange}  
        value={value} 
        placeholder="Ola! let's make Coca Cola" 
        required/>
    </div>
  
  
  const Profile =({
    onSubmit,
    src,
    name,
    status,
    snakescore,
    astroidscore

  
  })=>
    <div className="pcard">
      <form onSubmit={onSubmit} className='pform'>
        <label className="custom-file-upload fas up">
          <div className="img-wrap" >
            <img  src={src} alt='profile'/>
          </div>
        </label>
        <div className="pname">{name}</div>
        <div className="pstatus">{status}</div>
      
            <div className="static1">
                <div>
                <GiSnake />

                    <h1>Snake Score &nbsp;&nbsp;: {snakescore}</h1>
                </div>
                <div>
                <FaRocket/>
               <h1>Astroid Score : {astroidscore}</h1> 
                </div>
               
              
              </div>
              
           
        <button type="submit" className=" pbutton pedit">Edit Profile </button>
      </form>
    </div>
       
        
  const Edit =({
    onSubmit,
    children,
   
  })=>
    <div className="pcard">
      <form onSubmit={onSubmit} className='peform'>
        <h1>Profile Card</h1>
          {children}
          
            
              <button type="submit" className="pbutton psave">
           
              Save 
              </button>
          
     
      </form>
    </div>
  
  class CardProfile extends React.Component {
    state = {
      file: '',
      imagePreviewUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKUle0pFonwi2vcfhdFmDoFytTlMnRhJc-pYCCmX2jkIpEwR6gWRcoirCsNTSubfWyAo&usqp=CAU',
      name:'',
      status:'',
      active: 'profile',
      snakescore:'',
      astroidscore:'',
      imageuploded:false,
      isLoading:true,
      isLoading2: false,
    
    }
    notify=()=>{
      toast.success('profile updated', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
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
    componentDidMount(){
      const token=localStorage.getItem('jwttoken');
      axios.get('https://agile-dawn-02443.herokuapp.com/getprofile',{
        headers:{
          Authorization:token?`Bearer ${token}`:""
  
        }
      }).then(res=>{
        // //console.log(res.data[0].username);
        this.setState({
          name:res.data[0].username,
          snakescore:res.data[0].snakeScore,
          astroidscore:res.data[0].astroidScore,
          status:res.data[0].about
        })
        if(res.data[0].imgurl!==''){
          this.setState({
            imagePreviewUrl:res.data[0].imgurl,
       
          })
        }
        this.setState({isLoading: false});
      }).catch(err=>{
        this.setState({isLoading: false});
        this.notify2();
       
        // //console.log(err);
      });
     
    }
    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result,
          imageuploded:true
        });
      }
      reader.readAsDataURL(file);
    
    }
    editName = e =>{
      const name = e.target.value;
      this.setState({
        name,
      });
    }
    
    editStatus = e => {
      const status = e.target.value;
      this.setState({
        status,
      });
    }
    
    handleSubmit= e =>{
      e.preventDefault();
      const token=localStorage.getItem('jwttoken');
  
      const {name,status}=this.state;
      let data={};
      this.setState({
        isLoading2: true,
      })

    
      if(this.state.imageuploded){
         data={
          username:name,
          about:status,
          imgurl: this.state.imagePreviewUrl
        }
      }else{
       data={
          username:name,
          about:status,
        }
      }
      // //console.log(data);
    
      axios.post('https://agile-dawn-02443.herokuapp.com/updateprofile',data,{
        headers:{
          Authorization:token?`Bearer ${token}`:""
        }
      }).then(res=>{
        //console.log(res.data);
        this.setState({
          isLoading2: false,
        })
        // this.setState({
        //   astroidtopusers:res.data
        // })
        this.notify();
        
        let activeP = this.state.active === 'profile' ? 'edit' : 'profile';
        this.setState({
          active: activeP,
        })
      }).catch(err=>{
        // //console.log(err);
        this.setState({isLoading: false});
        this.notify2();
      })
     
    }
    chageUI=e=>{
      e.preventDefault();
      let activeP = this.state.active === 'profile' ? 'edit' : 'profile';
      this.setState({
        active: activeP,
      })
    }
    
    render() {
      const {imagePreviewUrl, 
             name, 
             status, 
             active,snakescore,astroidscore} = this.state;
    // //console.log(this.state.imagePreviewUrl);
      return (
        this.state.isLoading ? <Loading type={'spin'} color={'blue'}/> 
        : 
        <div>
          <BackBut  link={'/home'} color={'#12427e'}/>
           <ToastContainer />
          {(active === 'edit')?(
           (this.state.isLoading2)? <Loading type={'bars'} color={'blue'}/> 
           :
            <Edit onSubmit={this.handleSubmit}>
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
              <Name onChange={this.editName} value={name}/>
              <Status onChange={this.editStatus} value={status}/>
        
            </Edit>
          ):(
            <Profile 
              onSubmit={this.chageUI} 
              src={imagePreviewUrl} 
              name={name} 
              status={status} snakescore={snakescore} astroidscore={astroidscore}/>)}
          
        </div>
      )
    }
  }
  

export default CardProfile;
   
