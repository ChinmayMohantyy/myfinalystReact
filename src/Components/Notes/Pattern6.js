import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {socket} from '../../services/socket/socket'
import * as actionTypes from '../../redux/actionTypes'
import {Spinner} from 'react-bootstrap'
import Note1 from './Note1'
import {motion} from 'framer-motion'



import axios from 'axios'



const inputDiv={
  height:'100%',
  width:'100%'
}
const input={
  height:'100%',
  width:'100%',
  border:'none',
  textAlign:'end',
  background:'transparent'
}

const flowStyle={
  backgroundColor:'#EBEBEB',
  // backgroundColor:'rgba(0,0,0,0.1)',
  fontSize:'15px',
  fontWeight:'500'}

const rowFlow={
  backgroundColor:'#EBEBEB',
  fontSize:'15px',
  fontWeight:'500'
}
const titleFlow={
  backgroundColor:'#EBEBEB',
  height:'60px',
  textAlign:'left',
  paddingLeft:'1rem',
  // border:'none',
  fontSize:'14px',
  fontWeight:'600'
}

const guidanceFlow={
  backgroundColor:'#EBEBEB',
  textAlign:'left',
  paddingLeft:'3rem'
}

const Pattern6 = (props) => {
  // const str = 'SET_NOTE'
  // const str1 = 'note'
  // const str2 = props.note.toString()
  // const finalStr = (str.concat('', str2))
  // const NoteStr = (str1.concat('', str2))
  const finalStr = props.FinalStr
  const NoteStr = props.NoteStr
  console.log(NoteStr)
  const dispatch = useDispatch();
  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState([])
  const [loading, setLoading] = useState(false)
  const [dummy, setDummy] = useState(props.note4)
  const [math, setMath] = useState('')
  const [nid, setNld] = useState('')
  const [totalCy, setTotaCy] = useState('')
  const [totalPy, setTotaPy] = useState('')
  const [noteOpen, setNoteOpen] = useState(false)

  console.log(newNote,'newNote new notes')
  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');
  // console.log(Note,'hey hey hey')

useEffect(() => {
  // if(Note === [] || Note == undefined || Note.length === 0){
        const auth = localStorage.getItem('auth_token')    
      let headers = {
          'x-auth-token' : auth,
      }
      const fd = new FormData()
      fd.append('notes_no',props.note);
      setLoading(true)
      axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
      .then(res =>{
        console.log(res,'response  npotes notes resonse response response')
          setLoading(false)
          setNld(res.data.notes.nlid)    
          setNote(res.data.notes.data)
          console.log('ssss',finalStr) 
          // dispatch({type: actionTypes[finalStr],payload:res.data.notes.data[0].sub_grp})              
          dispatch({type: actionTypes[finalStr],payload:res.data})              

      }).catch(err=>{
          setLoading(false)

      })
    // }
    //   else{
    //   setNote(Note.data)
    //   setNld(Note.nlid)    
  
      
  
    // }
      return () => {
        
        // dispatch({type: s.SET_NOTE4,payload:note})              
      }    
      
}, [])


useEffect(() => {
    note.map((row,i)=>{
        row.sub_grp.map((rw,i)=>{
            newNote.map((note,ix)=>{
                if(note.sub_grp === rw.sub_grp.sub_grp && rw.fs_grp.includes('Current') && rw.fs_grp.slice(0,7) === 'Current'){
                // if(note.sub_grp === rw.sub_grp.sub_grp && (rw.fs_grp === 'Current Assets' || rw.fs_grp === 'Current Liabilities' ) ){
                  console.log(rw.sub_grp.sub_grp,'note here')
                  const arr = newNote
                  Object.assign(arr[ix], {"c_cy":rw.sub_grp.cy_amt,"c_py":rw.sub_grp.py_amt})
                  console.log(arr[ix],'current arr')
                  console.log(arr,'arr arr arr arr')
                  setNewNote(arr)
                  setMath(Math.random())
                }
              })

            if(rw.fs_grp.includes('Non Current')){
              // if(rw.fs_grp,includes === 'Non Current Assets' || rw.fs_grp === 'Non Current Liabilities' ){
                const  New = {sid:rw.sid,sub_grp:rw.sub_grp.sub_grp,nc_cy:rw.sub_grp.cy_amt,nc_py:rw.sub_grp.py_amt}
                const arr = newNote
                arr.push(New)
                setNewNote(arr)
            }
        })
    })

    return () => {
      setNewNote([])
      
    }

}, [note])



const c_cy = newNote.reduce((totalCy, i) => totalCy +  Number(i.c_cy), 0);
const nc_cy = newNote.reduce((totalCy, i) => totalCy +  Number(i.nc_cy), 0);
const c_py = newNote.reduce((totalpy, i) => totalpy +  Number(i.c_py), 0);
const nc_py = newNote.reduce((totalPy, i) => totalPy +  Number(i.nc_py), 0);
console.log(c_cy,nc_cy,c_py,nc_py,'total s')
  
    if(note == null | note == []){
      return(
        <div style={{height:'80vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
          <Spinner animation="grow" size="sm" />
        </div>
      )
    }
    if(loading){
      return(
        <div style={{height:'80vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" style={{margin:'1rem'}}/>
          <Spinner animation="grow" size="sm" />
        </div>
      )
    }
    return (
        <div>
          <table>
                <thead >
                  <tr style={{backgroundColor:'#A2C0C2'}}>
                  <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'1rem'}}>PARTICULAR</th>
                  <th style={{width:'20%'}} colSpan='2' >As at March 31, 2021</th>
                  <th style={{width:'20%'}} colSpan='2' >As at March 31, 2020</th>
                  <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th>
                  </tr>
                  <tr style={{backgroundColor:'grey'}}>
                    <th style={{height:'10px',textAlign:'left',paddingLeft:'1rem'}}></th>
                    <th style={{}}>Current</th>
                    <th style={{}}>Non Current</th>
                    <th style={{}}>Current</th>
                    <th style={{}}>Non Current</th>
                    <th style={{textAlign:'left',paddingLeft:'3rem'}}></th>
                  </tr>
                </thead>
                <tbody >
                {newNote.map((row,ix)=>{


                //specific to note 6(e) here
                  if(props.note === '6(e)' && ix == 0){
                    return(
                      <>
                        <tr key={ix} style={rowFlow}>
                          <th style={{backgroundColor:'white',height:'60px',textAlign:'left',paddingLeft:'1rem',border:'none', fontSize:'18px',fontWeight:'600'}}>Derivatives</th>
                        </tr>
                        <tr key={ix} style={rowFlow}>
                          <th style={titleFlow}>{row.sub_grp}</th>
                          <th style={flowStyle}>{row.c_cy ? Math.abs(row.c_cy) : 0}</th>
                          <th style={flowStyle}>{row.nc_cy ? Math.abs(row.nc_cy): 0}</th>
                          <th style={flowStyle}>{row.c_py? Math.abs(row.c_py):0}</th>
                          <th style={flowStyle}>{row.nc_py? Math.abs(row.nc_py):0}</th>
                          <th style={guidanceFlow}></th>
                        </tr>
                      </>
                      
                    )
                  }
                  if(props.note === '6(e)' && ix == 3 ){
                    return(
                      <>
                        <tr key={ix} style={rowFlow}>
                          <th style={{backgroundColor:'white',height:'60px',textAlign:'left',paddingLeft:'1rem',border:'none', fontSize:'18px',fontWeight:'600'}}>Others</th>
                          {/* <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={guidanceFlow}></th> */}
                        </tr>
                        <tr key={ix} style={rowFlow}>
                          <th style={titleFlow}>{row.sub_grp}</th>
                          <th style={flowStyle}>{row.c_cy ? Math.abs(row.c_cy) : 0}</th>
                          <th style={flowStyle}>{row.nc_cy ? Math.abs(row.nc_cy) : 0}</th>
                          <th style={flowStyle}>{row.c_py ? Math.abs(row.c_py) : 0}</th>
                          <th style={flowStyle}>{row.nc_py ? Math.abs(row.nc_py) : 0}</th>
                          <th style={guidanceFlow}></th>
                        </tr>
                      </>
                      
                      )
                  }

                  //specific to note
                  if(props.note === '13(b)' && ix == 0){
                    return(
                      <>
                        <tr key={ix} style={rowFlow}>
                          <th style={{backgroundColor:'white',height:'60px',textAlign:'left',paddingLeft:'1rem',border:'none', fontSize:'18px',fontWeight:'600'}}>Derivatives not designated as hedges</th>
                          {/* <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={guidanceFlow}></th> */}
                        </tr>
                        <tr key={ix} style={rowFlow}>
                          <th style={titleFlow}>{row.sub_grp}</th>
                          <th style={flowStyle}>{row.c_cy ? Math.abs(row.c_cy):0}</th>
                          <th style={flowStyle}>{row.nc_cy ? Math.abs(row.nc_cy):0}</th>
                          <th style={flowStyle}>{row.c_py ? Math.abs(row.c_py):0}</th>
                          <th style={flowStyle}>{row.nc_py? Math.abs(row.nc_py):0}</th>
                          <th style={guidanceFlow}></th>
                        </tr>
                      </>
                      
                    )
                  }
                  if(props.note === '13(b)' && ix == 1){
                    return(
                      <>
                        <tr key={ix} style={rowFlow}>
                          <th style={{backgroundColor:'white',height:'60px',textAlign:'left',paddingLeft:'1rem',border:'none', fontSize:'18px',fontWeight:'600'}}>Others</th>
                          {/* <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={flowStyle}></th>
                          <th style={guidanceFlow}></th> */}
                        </tr>
                        <tr key={ix} style={rowFlow}>
                          <th style={titleFlow}>{row.sub_grp}</th>
                          <th style={flowStyle}>{row.c_cy? (Math.abs(row.c_cy)) : 0}</th>
                          <th style={flowStyle}>{row.nc_cy ? Math.abs(row.nc_cy):0}</th>
                          <th style={flowStyle}>{row.c_py ? Math.abs(row.c_py): 0}</th>
                          <th style={flowStyle}>{row.nc_py ? Math.abs(row.nc_py): 0}</th>
                          <th style={guidanceFlow}></th>
                        </tr>
                      </>
                      
                    )
                  }
                  
                  return(
                      <tr key={ix} style={rowFlow}>
                        <th style={titleFlow}>{row.sub_grp}</th>
                        <th style={flowStyle}>{row.c_cy? (Math.abs(row.c_cy)).toFixed(2) : 0}</th>
                        <th style={flowStyle}>{row.nc_cy ? (Math.abs(row.nc_cy)).toFixed(2) : 0}</th>
                        <th style={flowStyle}>{row.c_py ? (Math.abs(row.c_py)).toFixed(2) : 0}</th>
                        <th style={flowStyle}>{row.nc_py ? (Math.abs(row.nc_py)).toFixed(2) : 0}</th>
                        <th style={guidanceFlow}></th>
                      </tr>
                  
                  )
                  
                })}         
                </tbody>
                <tfoot>
                  <tr style={{backgroundColor:'#F0DBC8',color:'#e1e1e1'}}>
                    <th style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'1rem',fontSize:'15px',fontWeight:'500'}}>TOTAL</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500'}} colSpan='1' >{c_cy? (Math.abs(c_cy)).toFixed(2) : 0 }</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500'}} colSpan='1' >{nc_cy ? (Math.abs(nc_cy)).toFixed(2) : 0}</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500'}} colSpan='1' >{c_py ? (Math.abs(c_py)).toFixed(2) : 0}</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500'}} colSpan='1' >{nc_py ? (Math.abs(nc_py)).toFixed(2) :0}</th>
                    <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem'}}></th>
                  </tr>
                </tfoot>
          </table>
          <div style={{display:'flex',marginTop:'1rem',height:'50px',border:'2px solid #e8e8e8'}}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'center',paddingLeft:'1rem'}}><p>Note here</p></div>
            <div onClick={(e)=>{setNoteOpen(!noteOpen)}} style={{display:'flex',alignItems:'center',justifyContent:'center',width:'3rem',background:'#e8e8e8',marginLeft:'auto',marginRight:'2rem',cursor:'pointer'}}>
            <i className="fas fa-pencil-alt" />              {/* <img src/> */}

            </div>

          </div>
          {noteOpen && <motion.div style={{marginBottom:'1rem',padding:'0rem',backgroundColor:'white',border:'2px solid #e8e8e8',borderTop:'none'}}>
            {/* <h1>note 3  </h1> */}
            <Note1 color='grey' />
          </motion.div>}

            
        </div>
    )
}

export default Pattern6
