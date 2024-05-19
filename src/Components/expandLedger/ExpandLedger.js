import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Select from 'react-select'
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
    fontWeight:'600'
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

const AddLedger = (props) => {
    console.log(props.select,'here mate')


    function handleClose(e){
        if (e.target.classList.contains('screenDiv')){
            props.close(false)

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
            className='col-md-7 col-sm-10'
            initial={{y:'-5vh'}}
            animate={{y:0}} 
            >
                <div style={head}>
                    <div >
                        <h2 style={header}>{props.name}</h2>
                        <p style={para}>This section contains all the values of the selected Ledger atributes.</p>
                    </div>
                    <div style={{paddingTop:'13px',marginLeft:'auto'}}>
                        <h5 style={{color:'var(--clr-accent)',fontSize:'1rem',fontWeight:'700',cursor:'pointer'}} 
                        onClick={() =>{props.close(false)}}
                        >Close</h5>
                    </div>
                </div>
                <div style={details} id='list'>
                    {/* <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1>
                    <h1>hehe</h1> */}
                <pre>{JSON.stringify(props.select, null, 2) }</pre>
                        
                </div>
                {/* <div style={footSelect}>
                    <div >
                        <div onClick={()=>{handlePost()}}>

                        <Submit value='Create new Ledger' sm/>
                        </div>
                        </div>
                </div> */}
               
            <div >

        </div>
            </motion.div>
            
            
        </motion.div>
    )
}

export default AddLedger
