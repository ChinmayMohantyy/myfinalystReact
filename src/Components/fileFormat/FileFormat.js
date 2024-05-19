import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Select from 'react-select'
import axios from 'axios'
import {motion, transform} from 'framer-motion'
import tick from '../../assets/confirmTb.svg'
import uploadFile from '../../assets/fileFormat.svg'


const FileFormat = (props) => {
    const screen= {
        width:'100%',
        height:'100%',
        position:'fixed',
        zIndex:'999',
        backgroundColor:'#00000099',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    
       
    }
    const container= {
        // minHeight:'60vh',
        borderRadius:'10px',
        maxHeight:'90vh',
        minWidth:'560px',
        padding:'2rem 5rem',    
        zIndex:'15',
        backgroundColor:'white'
    }

    const head = {
    display:'flex'}


const header = {
    fontSize:'1.5rem',
    fontWeight:'700'
}
const para = {
    fontSize:'14px',
    fontWeight:'500',
    marginTop:'6px',
    margin:'0',
    color:'var(--clr-accent)'
}


// const footSelect ={
//     display:'flex',
//     justifyContent:'center',
//     alignItems:'center',
//     marginTop:'1rem'
// }

    
    return (
        <motion.div style={screen} 
        className="screenDiv"
        // onClick={handleClose}
        initial={{opacity:0}}
        animate={{opacity:1}}

        >
            {/* <div style={{display:'flex',flexDirection:'column'}}> */}

            <motion.div style={container} 
            className='col-md-7 col-sm-10'
            initial={{y:'-5vh'}}
            animate={{y:0}} 
            >
                <div style={head}>
                    <div >
                        <h2 style={header}>Trial Balance Format</h2>
                        <p style={para}><img src={tick}/> Please Ensure the header columns are in the first row.</p>
                        <p style={para}><img src={tick}/> Remove Sub-total values in between or at the end.</p>
                        <p style={para}><img src={tick}/> Mandatory columns must include Ledger Codes,Ledger Names & Amount.</p>
                    </div>
                    <div style={{paddingTop:'13px',marginLeft:'auto'}}>
                        <h5 style={{color:'var(--clr-accent)',fontSize:'1rem',fontWeight:'700',cursor:'pointer'}} 
                        onClick={() =>{props.setViewFormat(false)}}
                        >Close</h5>
                    </div>
                </div>

                <div style={{marginTop:'1rem',transform:'scale(0.9)',display:'grid',margin:'auto',justifyContent:'center'}}>
                    <img  src={uploadFile} />


                </div>
            </motion.div>
            {/* </div> */}
            
            
        </motion.div>
    )
}

export default FileFormat
