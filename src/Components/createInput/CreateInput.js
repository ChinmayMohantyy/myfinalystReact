    import React,{useState,useEffect} from 'react'
    import { useHistory } from "react-router-dom";
    import {motion} from 'framer-motion'
    import {Submit} from '../Button'
    import axios from 'axios'
    import {useDispatch,useSelector} from 'react-redux'
    import * as actionTypes from '../../redux/actionTypes'



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

    const grid={
        display:'grid',
        gridTemplateColumns: '48% 48% ',
        gridColumnGap: '5%',
        // gridRowGap: '10px'
    }

    const CreateInput = (props) => {
        const dispatch = useDispatch();

        const inti ={
            disclosures:'',
            cy_amt:'',
            py_amt:''

        }
        const [field, setField] = useState(inti)
        // const [res, setRes] = useState({})

        // console.log(res,'res res res rwss')
        // console.log(field)
        console.log(props.nid,'nid')
        console.log(props.sid,'sid')
        console.log(props.notenum,'notenum')
        
        const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
        const project_id = localStorage.getItem('project_id');

        
        
        function handleClose(e){
            if (e.target.classList.contains('screenDiv')){
                props.setShowCreateInput(false)
        
            }
        }

        function handleChange(inp,e){
            console.log(inp)
            console.log(e.target.value)
            // dispatch({type: actionTypes.SET_NOTE4,payload:e.target.value})              
            // dispatch({type: actionTypes.SET_NOTE4,payload:res.data.notes.data[0].sub_grp})              


            setField({...field,[inp]:e.target.value})

        }

        function handleSubmit(){
            const auth = localStorage.getItem('auth_token')    
            let headers = {
                'x-auth-token' : auth,
                // 'Content-Type' : 'application/json'
        
            }
            const fd = new FormData()
            fd.append('disclosures',field.disclosures);
            fd.append('cy_amt',Number(field.cy_amt));
            fd.append('py_amt',Number(field.py_amt));
            
            axios.post(`api/v1/notes/add-input/${project_id}/${TB_ID}/${props.nid}/${props.sid}`,fd,{headers})
            .then(res =>{

                dispatch({type: actionTypes.SET_RENDERNOW,payload:Math.random()})              
                
                if(props.notenum === '3'){
                console.log(res,'response resonse response response in 3 or 5')
                console.log(res.data.notes,'---------8hewew------------3')
                console.log(props.str,'---------8hewew------------3')
                if(res.data.notes){
                    dispatch({type: actionTypes.SET_NOTE3,payload:res.data.notes})              
                }
                props.setRender(Math.random())
                return
                }
                if(props.notenum === '5'){
                console.log(res,'response resonse response response in 3 or 5')
                console.log(res.data.notes,'---------8hewew------------3')
                console.log(props.str,'---------8hewew------------3')
                
                dispatch({type: actionTypes.SET_NOTE5,payload:res.data.notes})              
                props.setRender(Math.random())
                return
                }

                if(
                    props.notenum === '4' ||
                    props.notenum === '7' ||
                    props.notenum === '12(b)' ||
                    props.notenum === '12(c)' ||
                    props.notenum === '16'

                    ){
                    // console.log(res.data.notes[0].sub_grp,'---------------------4')
                    
                    dispatch({type: actionTypes[props.str],payload:res.data.notes[0].sub_grp})              
                }
                if(props.notenum === 5){
                    
                    console.log(res.data.notes,'---------------------5')
                dispatch({type: actionTypes[props.str],payload:res.data.notes})              
            }
                props.setRender(Math.random())
            }).catch(err=>{
            // console.log(err.response)
            // if(err.response.data){
                // console.log('response from notes4  no')
                console.log(err,'response resonse response response')
                alert(`${err.response}`)  
            // }

            })
            props.setShowCreateInput(false)



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
                            <h2 style={header}>Create New Input</h2>
                            {/* <p style={para}>Ledger Codes, Ledger Names, Curent and year amount, Groupings and Trial balance Adjustments are saved to use next time</p> */}
                        </div>
                        <div style={{paddingTop:'13px',marginLeft:'auto'}}>
                            <h5 style={{color:'var(--clr-accent)',fontSize:'1rem',fontWeight:'700',cursor:'pointer'}} onClick={()=>{props.setShowCreateInput(false)}} >close</h5>
                        </div>
                    </div>
                    <div style={grid}>
                        <div style={{padding:'0 0',marginTop:'10px '}} className='presetName'>
                            <p style={presetHeader}>Name of the Input<span style={{color:'red'}}>*</span></p>
                            <input style={input} value={field.disclosures}   onChange={(e)=>{handleChange('disclosures',e)}}  />
                        </div>
                        <div style={{padding:'0 0',marginTop:'10px '}} className='presetName'>
                            <p style={presetHeader}>Current Year Amount<span style={{color:'red'}}>*</span></p>
                            <input style={input} value={field.cy_amt} type='number' onChange={(e)=>{handleChange("cy_amt",e)}} />
                        </div>
                        <div style={{padding:'0 0',marginTop:'10px '}} className='presetName'>
                            <p style={presetHeader}>Previous Year Amount<span style={{color:'red'}}>*</span></p>
                            <input style={input} value={field.py_amt}  type='number' onChange={(e)=>{handleChange('py_amt',e)}}/>
                        </div>

                    </div>
                    {/* <div style={{ height:'2px',backgroundColor:'var(--clr-font-light)',marginTop:'1.5rem'}}></div>
                    <div style={{height:'15rem'}}></div> */}
                    <div style={footSelect}>
                        {/* <div style={{color:'var(--clr-accent)',fontWeight:'700',cursor:'pointer'}} >Skip </div> */}
                        <div onClick={()=>{handleSubmit()}}><Submit value='    create New Input    ' sm /></div>
                    </div>
                
                <div >

            </div>
                </motion.div>
                
                
            </motion.div>
        )
    }

    export default CreateInput
