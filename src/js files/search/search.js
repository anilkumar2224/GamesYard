import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';
import './serachcss.css'
import BackBut from '../back/back'
import {GiSnake } from "react-icons/gi";
import {FaRocket}from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ReactLoading from 'react-loading';



const Profile =({
    src,
    name,
    status,
    snakescore,
    astroidscore

  
  })=>
    <div className="ppcard">
      <form  className='pform'>
        <label className="custom-file-upload fas up">
          <div className="img-wrap" >
            <img  src={src}/>
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
              
      </form>
    </div>


class Search extends React.Component {
 state={
     data:[],
   isLoading: false,
   profile:false,
   selected:{},
   nodata:false,
   pic:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWKUle0pFonwi2vcfhdFmDoFytTlMnRhJc-pYCCmX2jkIpEwR6gWRcoirCsNTSubfWyAo&usqp=CAU',
   noimg:true
 }

 notify2=()=>{
  toast.error('Oops! unable to get players profile', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  }
   handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    
    this.setState({
      isLoading: true,
    })
    const token=localStorage.getItem('jwttoken');
    const data={
        str:string
    }
   axios.post('https://agile-dawn-02443.herokuapp.com/getplayers',data,{
        headers:{
          Authorization:token?`Bearer ${token}`:""
        }
      }).then(res=>{
        // console.log(res.data);
        
        const response=[];
        for(let i in res.data){
            response.push({ 
                id:i,
                name:res.data[i].username,
                obj:res.data[i]   
            }) 

        }
        // const arr=response.map((item,i)=>{
        //     return {id:item,name:item.username}
        // })

        // console.log(response);
      
           if(response.length===0){
            this.setState({
                nodata:true,
                isLoading: false
             })
           }else{
            this.setState({
                data:response,
                isLoading: false
            })
        }
            // console.log(results);
       
        
      }).catch(err=>{
        // console.log(err);
        this.setState({isLoading: false});
        this.notify2();
      
      })
     
    // console.log(string, results)
  }

   handleOnSelect = (item) => {
    // the item selected
    // console.log(item)
 if(item.obj.imgurl!==undefined &&item.obj.imgurl!==''  ){
    this.setState({
        selected:item.obj,
        profile:true,
        nodata:false,
        noimg:false
    })
  }else{
    this.setState({
      selected:item.obj,
      profile:true,
      nodata:false,
      noimg:true
      
  })
  }
  }

   handleOnFocus = () => {
    // console.log('Focused')
    this.setState({
        profile:false,
        
    })
  }
render(){
  return (
    
      <div className='wrapp'>
          <ToastContainer />
      <BackBut  link={'/home'} color={'#12427e'}/>
    <div className="App">
      <header className="App-header">
        <div className='lav'>
         <div>
          <ReactSearchAutocomplete
            items={this.state.data}
            onSearch={this.handleOnSearch}
            onSelect={this.handleOnSelect}
            onFocus={this.handleOnFocus}
            styling={{ zIndex: 2 }}
            placeholder={'search'}
            autoFocus
          />
          </div>
             {
        this.state.isLoading ? 
       
        <ReactLoading type={'spin'} color={'#3897f0'} height={30} width={30} className="lodingbar" />
     
        :
            null}
        </div>
      </header>
    </div>
    <div>
    {
        this.state.profile?<Profile 
        src={this.state.noimg?this.state.pic:this.state.selected.imgurl} 
        name={this.state.selected.username} 
        status={this.state.selected.about} snakescore={this.state.selected.snakeScore} astroidscore={this.state.selected.astroidScore}/>:
        null
    }
    {
       this.state.nodata? <div className="nrf">
        No resluts found !
    </div>:null
    }
     </div>
    </div>
  )
}
}

export default Search;
