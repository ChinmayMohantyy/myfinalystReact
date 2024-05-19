import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {motion} from 'framer-motion'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import swal from 'sweetalert';


import {Submit} from '../Button'
import plus from '../../assets/plus.svg'




const screen= {
    width:'100%',
    height:'100%',
    position:'fixed',
    zIndex:'999',
    backgroundColor:'#00000036',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden',
   
}
const container= {
    // width:'30%',
    minHeight:'20vh',
    borderRadius:'10px',
    // maxHeight:'90vh',
    padding:'2rem 4rem',

    zIndex:'999',
    backgroundColor:'#f5f7fa'
}

const head = {
    display:'flex'
}


const header = {
    fontSize:'2rem',
    fontWeight:'600'
}
const para = {
    fontSize:'14px',
    fontWeight:'400',
    marginTop:'0px',
    color:'#696F79'
}

const input ={
    width:'100%',
    height:'3rem',
    borderRadius:'6px',
    outline:'none',
    border:'1px solid #D0D0D0',
    padding:'10px',
    fontSize:'20px',
    color:'var(--clr-font-dark)'

}
const footSelect ={
    display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:'1.2rem'

}

const presetHeader ={
    fontSize:'14px',
    color:'var(--clr-font-mid)',
    margin:'0 0 5px 0px'
}

const PopulateFs = (props) => {
    let history = useHistory()
    
    const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,

    }
    const project_id = localStorage.getItem('project_id');

    const [preset,setPreset] = useState('')

    function handleClose(e){
        if (e.target.classList.contains('screenDiv')){
            props.setPopulateFs(false)
        }
    }

    function handleCreate(){

        if(preset === ''){
            swal("", "Preset name cant be empty", "warning");
        }
        else{
            const fd = new FormData()
            fd.append('preset_name',preset);
            console.log(auth,'auth')
            axios.post(`/api/v1/presets/save-presets/${project_id}/${TB_ID}`,fd,{headers})
            .then(response => {
                console.log(response.data,' delete response ---------------------------------')
                swal("Preset has been Created!", {
                    icon: "success",
                });
                history.push('/preview')             
            })
            .catch(error =>{
                console.log(error.response,'error')
                // swal("", {error['response']}, "error");
            }
            )
        }
      
    }



    
    return (
        <motion.div style={screen} 
        className="screenDiv"
        onClick={handleClose}
        initial={{opacity:0}}
        animate={{opacity:1}}
        >
            <motion.div style={container} 
            className='col-md-5 col-sm-8' 
            initial={{y:'-5vh'}}
            animate={{y:0}} 
            >
                <div style={head}>
                    <div >
                        <h2 style={header}>Create Preset</h2>
                        <p style={para}>Ledger Codes, Ledger Names, Curent and year amount, Groupings and Trial balance Adjustments are saved to use next time</p>
                    </div>
                    <div style={{paddingTop:'13px'}}>
                        <h5 style={{color:'var(--clr-accent)',fontSize:'1rem',fontWeight:'700',cursor:'pointer'}} onClick={() =>{props.setPopulateFs(false)}}>close</h5>
                    </div>
                </div>
                <div style={{padding:'0 0',marginTop:'10px '}} className='presetName'>
                    <p style={presetHeader}>Name of the Preset<span style={{color:'red'}}>*</span></p>
                    <input style={input} value={preset} onChange={(e)=>{setPreset(e.target.value)}} />
                </div>
                {/* <div style={{ height:'2px',backgroundColor:'var(--clr-font-light)',marginTop:'1.5rem'}}></div>
                <div style={{height:'15rem'}}></div> */}
                <div style={footSelect}>
                    <div style={{color:'var(--clr-accent)',fontWeight:'700',cursor:'pointer'}}  onClick={() => { history.push('/preview') }}>Skip </div>
                    <div onClick={() => {handleCreate()}}><Submit value='  create preset  ' sm /></div>
                </div>
               
            <div >

        </div>
            </motion.div>
            
            
        </motion.div>
    )
}

export default PopulateFs
