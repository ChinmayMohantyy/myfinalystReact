import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {socket} from '../../services/socket/socket'
import * as actionTypes from '../../redux/actionTypes'
import axios from 'axios'
import {Spinner} from 'react-bootstrap'
import Note1 from './Note1'
import {motion} from 'framer-motion'








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

const Pattern3 = (props) => {

  // const str = 'SET_NOTE'
  // const str1 = 'note'
  // const str2 = props.note.toString()
  // const finalStr = (str.concat('', str2))
  // const NoteStr = (str1.concat('', str2))
  const finalStr = props.FinalStr
  const NoteStr = props.NoteStr




  console.log(NoteStr)
  const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');
  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const dispatch = useDispatch();
  const [note, setNote] = useState([])
  const [newNote, setNewNote] = useState([])
  const [disclosures, setDisclosures] = useState([])
  const [loading, setLoading] = useState(false)
  const [dummy, setDummy] = useState(props.note4)
  const [math, setMath] = useState('')
  const [nid, setNld] = useState('')
  const [totalCy, setTotaCy] = useState('')
  const [totalPy, setTotaPy] = useState('')  
  const [noteOpen, setNoteOpen] = useState(false)
  console.log(newNote,'newNote new notes')

useEffect(() => {
  
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
    }
    const fd = new FormData()
    fd.append('notes_no',props.note);
    setLoading(true)
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
        setLoading(false)
        console.log(res,'response  npotes notes resonse response response')
        console.log('ssss',finalStr) 
        dispatch({type: actionTypes[finalStr],payload:res.data.notes.data})
        setNld(res.data.notes.nlid)    
        setNote(res.data.notes.data)
        
        res.data.notes.data.map((row,i)=>{
          // if(newNote)
            row.sub_grp.map((rw,i)=>{
                newNote.length >= 1 && newNote.map((note,ix)=>{
                  if(note.sub_grp === rw.sub_grp.sub_grp && rw.fs_grp === 'Non Current Assets' ){
                    console.log(rw.sub_grp.sub_grp,'note')
                    const arr = newNote
                    // arr[ix].append( )
                    Object.assign(arr[ix], {"c_cy":rw.sub_grp.cy_amt,"c_py":rw.sub_grp.py_amt})
                    // console.log(arr[ix])
                    // console.log(arr,'arr arr arr arr')
                    setNewNote(arr)
                    setMath(Math.random())
                  }
                })
    
                if(rw.fs_grp === 'Current Assets'){
                    const  New = {sid:rw.sid,sub_grp:rw.sub_grp.sub_grp,nc_cy:rw.sub_grp.cy_amt,nc_py:rw.sub_grp.py_amt}
                    const arr = newNote
                    arr.push(New)
                    setNewNote(arr)
                    setMath(Math.random())
    
                }
            })
        })
        console.log("we're done heres")
        
      }).catch(err=>{
        setLoading(false)
        
      })
      return () => {
          // dispatch({type: actionTypes[finalStr],payload:note})              
    }    
}, [])

// useEffect(() => {
//   // console.log(Note,'note sa')
//   setNote(Note)

// }, [Note])


function handleChange(e,data,a,field){
  const content ={}
  console.log(data,'data')
  // console.log(e.target.value)
  // console.log(data)
  console.log(note,'note here ')
  // console.log(field)
  // console.log(typeof project_id,'projectid')
  // console.log(typeof TB_ID,'tb_id')
  // console.log(typeof nid,'nid')
  // console.log(typeof a.sid,'sid')
  const changes = note
  changes.map((notes,i)=>{
    console.log(notes,'here')
    // if(i === 0){        
        note[0].notes_disclosures.map((grp,i)=>{
          if(grp.notes_disclosures === data.notes_disclosures){
            
            if(field === 'currentYear'){
              grp.cy_amt= Number(e.target.value)
            }
            
            if(field === 'prevYear'){
              grp.py_amt= Number(e.target.value)
            }
          }
        })
      
  // }
  console.log(  changes,'changes here ')
  
})
  setNote(changes)
  setTotaPy(Math.random())
  content.sid = ''
  content.disclosures=''
  content.notes_disclosure=data.notes_disclosures
  content.py_amt = ''
  content.cy_amt = ''
  content.sid = ''
  console.log(nid,'nid here')

  
  if(field === 'currentYear'){
    // const value = e.target.value.replace(/\D/g, "")
    // console.log(value)
    // let { value, min, max } = e.target;
    // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    // console.log(value)
    // content.cy_amt = Number(value)
    // const val = e.target.value
    content.n_d_cy_amt = e.target.value
    content.n_d_py_amt = '0'
    if(e.target.value === ''){
      content.n_d_cy_amt = '0'
    }
    if(data.py_amt){
      content.n_d_py_amt = data.py_amt.toString()
    }

  }
  if(field === 'prevYear'){
    // const value = e.target.value.replace(/\D/g, "")
    // console.log(value)
    // let { value, min, max } = e.target;
    // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    // console.log(value)
    // const val = e.target.value
    content.n_d_py_amt = e.target.value
    content.n_d_cy_amt = '0'
    if(e.target.value === ''){
      content.n_d_cy_amt = '0'
    }
    if(data.cy_amt){
      content.n_d_cy_amt = data.cy_amt.toString()
    }
  }
  
  console.log(content,'content')


  // socket.emit("notes-auto-save", {
  //   project_id: `${project_id}`,
  //   tb_id: `${TB_ID}`,
  //   nlid: `${nid}`,
  //   contents: {
      // sid: `${a.sid}`,
  //     disclosures: "Opening Gross Carrying Amount",
  //     cy_amt: 100 ,
  //     py_amt: 100,
  //   },
  // });
  // socket.emit("notes-auto-save", {
  //   project_id: `${project_id}`,
  //   tb_id: `${TB_ID}`,
  //   nlid: `${nid}`,
  //   contents: content,
  // });

  // socket.on("on-auto-save", (data) => {
  //   //To trigger in the Fetch API (Conventional Model)
  //   console.log("{User Logged IN}", data.updatedNotes);
  //   if(data.updatedNotes){
  //       // console.log(data.updatedNotes.data,'change logged in note 4')
  //       const sub_grp = data.updatedNotes.data
  //       dispatch({type: actionTypes[finalStr],payload:sub_grp})
  //       // setNewNote([])              
  //       setNote(sub_grp)
  //   }


  // });
}

function brackets(val){


  if(val<0){
      return '('+ (-1*val).toLocaleString('en-IN') +')'
  }
  return val.toLocaleString('en-IN')
  
}


const c_cy = newNote.reduce((totalpy, i) => totalpy +  Number(i.c_cy), 0);
const nc_cy = newNote.reduce((totalCy, i) => totalCy +  Number(i.nc_cy), 0);
const c_py = newNote.reduce((totalpy, i) => totalpy +  Number(i.c_py), 0);
const nc_py = newNote.reduce((totalCy, i) => totalCy +  Number(i.nc_py), 0);

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
                  console.log(row,'row row rwo rwo wro wor')
                  console.log('hey')
  
                  return(
                      <tr key={ix} style={{backgroundColor:'white',fontSize:'1rem'}}>
                        <th style={{backgroundColor:'white',height:'60px',textAlign:'left',paddingLeft:'1rem', fontSize:'15px',fontWeight:'500'}}>{row.sub_grp}</th>
                        <th style={{backgroundColor:'white',fontSize:'15px',fontWeight:'500'}}>{row.c_cy && brackets(row.c_cy)}</th>
                        <th style={{backgroundColor:'white',fontSize:'15px',fontWeight:'500'}}>{row.nc_cy && brackets(row.nc_cy)}</th>
                        <th style={{backgroundColor:'white',fontSize:'15px',fontWeight:'500'}}>{row.c_py && brackets(row.c_py)}</th>
                        <th style={{backgroundColor:'white',fontSize:'15px',fontWeight:'500'}}>{row.nc_py && brackets(row.nc_py)}</th>
                        <th style={{backgroundColor:'white',textAlign:'left',paddingLeft:'3rem'}}></th>
                      </tr>
                  
                  )
                  
                })}         
                </tbody>
                <tfoot>
                  <tr style={{backgroundColor:'#F0DBC8',color:'#e1e1e1'}}>
                    <th style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'1rem',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}}>TOTAL</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}} colSpan='1' >{c_cy && brackets(c_cy) }</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}} colSpan='1' >{nc_cy && brackets(nc_cy) }</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}} colSpan='1' >{c_py && brackets(c_py) }</th>
                    <th style={{width:'10%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}} colSpan='1' >{nc_py && brackets(nc_py) }</th>
                    <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem',backgroundColor:'#F0DBC8'}}></th>
                  </tr>
                </tfoot>
          </table>
          <div style={{margin:'1.5rem',textAlign:'center',fontSize:'1rem',fontWeight:'600'}}>Break-up of security details</div>
          <div style={{padding:'0 2rem 2rem 2rem'}}>
          <table>
                <thead >
                  <tr style={{backgroundColor:'grey'}}>
                  <th style={{width:'40%',height:'20px',textAlign:'left',paddingLeft:'1rem'}}>PARTICULAR</th>
                  <th style={{width:'20%'}} >As at March 31, 2021</th>
                  <th style={{width:'20%'}} >As at March 31, 2020</th>
                  {/* <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th> */}
                  </tr>
                </thead>
                <tbody>
                {note.map((dscl,ix)=>{
                  console.log(dscl,'dscl here ere r er e')
                  if(ix === 0){
                      console.log(dscl,'dscl here ere r er e')
                      const cy = dscl.notes_disclosures.reduce((totalpy, i) => totalpy +  Number(i.cy_amt), 0);
                      const py = dscl.notes_disclosures.reduce((totalCy, i) => totalCy +  Number(i.py_amt), 0);
                        return dscl.notes_disclosures.map((dl,i)=>{

                            if(i === 4){
                              return(
                                <>
                                
                                <tr style={{backgroundColor:'white'}}>
                                <th style={{width:'40%',height:'30px',textAlign:'left',paddingLeft:'1rem',fontSize:'15px',fontWeight:'500'}}>{dl.notes_disclosures}</th>
                                <th style={{width:'20%',fontSize:'15px',fontWeight:'500'}}>
                                  <div style={inputDiv}>
                                      <input type="number" 
                                      value={dl.cy_amt}  
                                      style={input} 
                                      onChange={(e)=>{handleChange(e,dl,dscl,'currentYear')}}
                                      onBlur={()=>{
                                        // handleLeave()
                                        // console.log('youre out')
                                      }}
                                      />
                                    </div>
                                  {/* {dl.cy_amt} */}
                                  </th>
                                <th style={{width:'20%',fontSize:'15px',fontWeight:'500'}} >
                                <div style={inputDiv}>
                                      <input type="number" 
                                      value={dl.py_amt}  
                                      style={input} 
                                      onChange={(e)=>{handleChange(e,dl,dscl,'prevYear')}}
                                      onBlur={()=>{
                                        // handleLeave()
                                        // console.log('youre out')
                                      }}
                                      />
                                    </div>
                                    {/* {dl.py_amt} */}
                                    </th>
                                {/* <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem',fontSize:'15px',fontWeight:'500'}}></th> */}
                                </tr> 
                                <tr style={{backgroundColor:'#F0DBC8',color:'#e1e1e1'}}>
                                  <th style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'1rem',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}}>
                                    <div style={{display:'flex'}}>
                                    NET
                                    <span style={{marginLeft:'auto'}} >
                                      {cy === c_cy+nc_cy && py === c_py+nc_py  ? null: 
                                      <i title='the net difference is not balancing' style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' />
                                      }
                                      </span>
                                    </div>
                                    </th>
                                  <th style={{width:'20%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8',textAlign:'end',paddingRight:'22px'}} >{cy  && brackets(cy) }</th>
                                  <th style={{width:'20%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8',textAlign:'end',paddingRight:'22px'}} >{py  && brackets(py) }</th>
                                  {/* <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem',backgroundColor:'#F0DBC8'}}></th> */}
                                </tr>
                                </> 
                              )
                            }

                            console.log(dl) 
                            return(

                                <tr style={{backgroundColor:'white'}}>
                            <th style={{width:'40%',height:'30px',textAlign:'left',paddingLeft:'1rem',fontSize:'15px',fontWeight:'500'}}>{dl.notes_disclosures}</th>
                            <th style={{width:'20%',fontSize:'15px',fontWeight:'500'}}>
                              <div style={inputDiv}>
                                  <input type="number" 
                                  value={dl.cy_amt}  
                                  style={input} 
                                  onChange={(e)=>{handleChange(e,dl,dscl,'currentYear')}}
                                  onBlur={()=>{
                                    // handleLeave()
                                    // console.log('youre out')
                                  }}
                                  />
                                </div>
                              {/* {dl.cy_amt} */}
                              </th>
                            <th style={{width:'20%',fontSize:'15px',fontWeight:'500'}} >
                            <div style={inputDiv}>
                                  <input type="number" 
                                  value={dl.py_amt}  
                                  style={input} 
                                  onChange={(e)=>{handleChange(e,dl,dscl,'prevYear')}}
                                  onBlur={()=>{
                                    // handleLeave()
                                    // console.log('youre out')
                                  }}
                                  />
                                </div>
                                </th>
                            </tr>    
                                )

                        })

                    }

                })}     
                </tbody>
                <tfoot>
                  <tr style={{backgroundColor:'#F0DBC8',color:'#e1e1e1'}}>
                    <th style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'1rem',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8'}}>TOTAL</th>
                    <th style={{width:'20%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8',textAlign:'end',paddingRight:'22px'}} >{c_cy+nc_cy  && brackets(c_cy + nc_cy) }</th>
                    <th style={{width:'20%',fontSize:'15px',fontWeight:'500',backgroundColor:'#F0DBC8',textAlign:'end',paddingRight:'22px'}} >{c_py+nc_py  && brackets(c_py + nc_py) }</th>
                    {/* <th style={{width:'20%',textAlign:'left',paddingLeft:'3rem',backgroundColor:'#F0DBC8'}}></th> */}
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

            
        </div>
    )
}

export default Pattern3
