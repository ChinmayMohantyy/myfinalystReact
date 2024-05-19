import React,{useState,useEffect} from 'react';
import {Navbar} from '../../Components/Navbar';
import './presets.css';
import axios from 'axios';
import { Submit } from '../../Components/Button';
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";






const page={
    height:'calc(100vh - 80px)',
    backgroundColor:'rgb(229, 229, 229)',
    padding:'2rem 5rem',
    minWidth:'1045px'
}

const base = {
    // backgroundColor:'white', 
    width:'100%',
    height:'100%',
}

const heading = {
    fontSize:'2.5rem',
    fontWeight:'700',
    marginBottom:'0px'
}

const para = {
    fontWeight:'400',
    fontSize:'14px',
    marginTop:'15px'
  
}

const input={
    height:'45px',
    width:'330px',
    borderRadius:'6px',
    padding:'0 40px 0 10px',
    border:'2px solid var(--clr-font-light)'
}

const box={
    height:'65vh',
    // backgroundColor:'white',
    padding:'0'
}


const Presets = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')
    const [presets, setPresets] = useState([])
    
    let history = useHistory()
    
    const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,

    }
    const project_id = localStorage.getItem('project_id');

    useEffect(() => {
        const auth = localStorage.getItem('auth_token')
        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'

        }
        axios.get(`/api/v1/presets/fetch-presets`,{headers})
        .then(response => {
            console.log(response.data.presets_list,'response response')    
            setPresets(response.data.presets_list)   
          })
          .catch(error =>{
              console.log(error.response,'error')
          }
            )

    }, [])

    function handleChange(e){
        setSearch(e.target.value)
    }


    function handleReplace(id){
        const fd = new FormData()
        fd.append('attribute','ledger_name');
        // console.log(auth,'auth')
        axios.post(`/api/v1/presets/apply-presets/${project_id}/${TB_ID}/${id}`,fd,{headers})
        .then(response => {
            console.log(response.data,' delete response ---------------------------------')
            axios.get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`,{headers})
           .then(response => {
               dispatch({type: actionTypes.SET_TABLE_DATA,payload:response.data.data.line_items}) 
               swal("Preset has been applied Sucessfully!", {
                icon: "success",
            });
        }).catch(error =>{
            console.log(error.response,'error')
            // swal("", {error['response']}, "error");
        })  
        history.push(`/Conventional/${project_id}`)               
        })
        .catch(error =>{
            console.log(error.response,'error')
        }
        )
    }



    return (
    <>
     <Navbar text='Adjustments'/>
     <div style={page}>
         <div style={base}>
            <div style={{display:'flex',marginBottom:'1rem'}}>
                 <div style={{}}>
                     <h1 style={heading}>Presets Overview</h1>
                     <p style={para}>Find all the presets from the previous projects created with this account</p>
                 </div>
                 <div className='searchInput' style={{marginLeft:'auto',width:'350px',paddingTop:'1.5rem'}}>
                    <input style={input} onChange={(e)=>{handleChange(e)}} 
                    // name="password" 
                    value={search}
                    type= "text" 
                    // id={error.password? "pw" :'error' }
                    placeholder=""/>
                    <i class= "fas fa-search" />
                </div>
            </div>
            <div style={box} id='gridScroll2' className='grid'>
                {presets.filter(pre => pre.preset_name.toLowerCase().includes(search.toLowerCase())).map((pre,ix)=>{
                    const timestamp = pre.createdAt
                    const date = timestamp.slice(0,10)
                    console.log(timestamp,'timestamp timestamptimestamp timestamp')
                    // var formatted = timestamp.format("yyyy/mm/dd hh:MM:ss");
                    return(
                        <div style={{height:'210px',width:'410px',backgroundColor:'White',display:'flex',padding:'1rem',borderRadius:'6px'}} key={ix}>
                            <div style={{flexBasis:'2',width:'200',height:'50px'}}>
                                <p style={{marginTop:'0',fontSize:'1.4rem',fontWeight:'600',marginBottom:'5px'}}>{pre.preset_name}</p>
                                <p style={{marginTop:'0',color:'GrayText',fontSize:'15px'}}>created on {date}</p>
                                {/* <p style={{marginTop:'0',color:'GrayText',fontSize:'15px',marginBottom:'5px'}}></p> */}
                            </div>
                            <div style={{width:'120px',marginLeft:'auto',flexBasis:'1'}}>
                                <div onClick={()=>{handleReplace(pre._id)}}>
                                    <Submit value="Replace" variant='secondary' sm/>
                                </div>
                            </div>

                        </div>
                    )
                })}


            </div>
         </div>

     </div>
    </>
    )
}

export default Presets
