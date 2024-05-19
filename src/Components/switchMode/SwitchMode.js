import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Select from 'react-select'
import { useHistory } from "react-router-dom";

import axios from 'axios'
import {motion} from 'framer-motion'

import * as actionTypes from '../../redux/actionTypes'
import {Submit} from '../Button'

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
    width:'50%',
    minHeight:'40vh',
    borderRadius:'10px',
    maxHeight:'70vh',
    minWidth:'560px',
    padding:'2rem', 


    zIndex:'15',
    backgroundColor:'white'
}

const head = {
    display:'flex'
}


const header = {
    fontSize:'2rem',
    fontWeight:'600',
    textAllign:'center'
}
const para = {
    fontSize:'14px',
    fontWeight:'400',
    marginTop:'0px',
    color:'#696F79'
}


const footSelect ={
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'1rem'

}

const inputGrid = {
    display:'grid',
    gridTemplateColumns:'32% 32% 32%',
    gridGap:'1rem',
    marginTop:'1rem',
    // overflowX:'scroll',
    // overflowY:'none'

}

const para2 = {
    fontSize:'14px',
    fontWeight:'600',
    margin:'0 0 10px 0',
    color:'var(--clr-font-mid)'
}

const details ={
    maxHeight:'20rem',
    overflowY:'scroll'
}

const input = {
    height:'48px',
    width:'100%',
    padding:'10px',
    outline:'none',
    border:'1px solid #cacacabf',
    borderRadius:'6px',

    ':focus-visible':{
        border:'1px solid black',

    }
}    

const span ={
    color:'rgba(207, 7, 7, 0.815) '
}

const SwitchMode = (props) => {
    let history = useHistory()

    console.log(props.select,'here mate')
    const project_id = localStorage.getItem('project_id'); 

    const [click, setClick] = useState('')


    function handleClose(e){
        if (e.target.classList.contains('screenDiv')){
            props.close(false)

        }
    }


    function handleSelect(mode){
        console.log('hey clicked ')
        if(mode === '1'){
            
            console.log(props.currentMode,'hey clicked ')
            if(props.currentMode === '1'){
                props.close(false)
            }
            history.push(`/Conventional/${project_id}`)
        }               
        if(mode === '2'){
            if(props.currentMode === '2'){
                props.close(false)
            }
            history.push(`/template/${project_id}`)
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
            className='col-md-10 col-sm-10'
            initial={{y:'-5vh'}}
            animate={{y:0}} 
            >
                <div style={head}>
                    <div style={{paddingTop:'0',marginLeft:'30%'}} >
                        <h2 style={header}>{props.name}</h2>
                        <p style={para}>This feature allows you to switch to a more intutive method of mapping  </p>
                    </div>
                    <div style={{paddingTop:'13px',marginLeft:'auto'}}>
                        <h5 style={{color:'var(--clr-accent)',fontSize:'1rem',fontWeight:'700',cursor:'pointer'}} 
                        onClick={() =>{props.close(false)}}
                        >Close</h5>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-around',margin:'5rem 0'}}>
                <div className="cMode">
                    <motion.div 
                    className={click === '1'? 'modeImg-1_active' : 'modeImg-1'  } 
                    onClick={()=> handleSelect('1')} 
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.1 },
                      }}
                    ></motion.div>
                    <div className="modeContent">
                        <h1>Conventional Mode</h1>
                        <p>This mode allows you to assign individual ledgers<br/>to respective financial statements, and their notes</p>
                    </div>
                </div>
                    <div className="tMode">
                        <motion.div className={click === '2'? 'modeImg-2_active' : 'modeImg-2'  } 
                        onClick={()=> handleSelect('2')}
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                            }}

                        ></motion.div>
                        <div className="modeContent">
                            <h1>Template Mode</h1>
                            <p>This mode allows you to assign one or more <br/>
                            ledgers to a given FS template, and all you have to<br/>
                            do is drag and drop the ledgers.</p>
                        </div>
                    </div>
                </div>
            <div >
        </div>
            </motion.div>       
        </motion.div>
    )
}

export default SwitchMode
