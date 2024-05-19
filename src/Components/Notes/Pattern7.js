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

const level3={
  color:'black',
  fontSize:'18px',
  fontWeight:'500',
  borderTop:'none'

}



const Note8 = (props) => {

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
  const [disclosures, setDisclosures] = useState([])
  const [dummy, setDummy] = useState(props.note4)
  const [nid, setNld] = useState('')
  const [noteOpen, setNoteOpen] = useState(false)

  console.log(note,'note values')
  // const noteNo = 4
  // var myVar = eval(NoteStr);



  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');
  console.log(Note,'hey hey hey')
  
  useEffect(() => {
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
        // 'Content-Type' : 'application/json'
    }
    const fd = new FormData()
    fd.append('notes_no',props.note);
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
      console.log(res,'response  npotes notes resonse response response')
      setNld(res.data.notes.nlid)    
      setNote(res.data.notes.data[0].sub_grp)
      setDisclosures(res.data.notes.data[0].notes_disclosures)
      console.log('ssss',finalStr) 
      dispatch({type: actionTypes[finalStr],payload:res.data.notes.data[0].sub_grp})              

    }).catch(err=>{
      // console.log(err.response)
      // if(err.response.data){

      //   alert(err.response.data.error)  
      // }
    })
    return () => {
      // dispatch({type: actionTypes.SET_NOTE4,payload:note})              
    }    
    }, [])

    function handleChange(e,data,a,field){
      const content ={}
      console.log(data,'data')
  
      content.sid = `${note[0].sid}`
      content.notes_disclosures = data.notes_disclosures
      
      if(field === 'currentYear'){
        content.cy_amt = e.target.value
        content.py_amt = '0'
        if(e.target.value === ''){
          content.cy_amt = '0'
        }
        if(data.py_amt){
          content.py_amt = data.py_amt.toString()
  
        }
      }
      if(field === 'prevYear'){
        content.py_amt = e.target.value
        content.cy_amt = '0'
        if(e.target.value === ''){
          content.py_amt = '0'
        }
        if(data.cy_amt){
          content.cy_amt = data.cy_amt.toString()
        }
        
      }
      
      console.log(content,'content')
      socket.emit("notes-auto-save", {
        project_id: `${project_id}`,
        tb_id: `${TB_ID}`,
        nlid: `${nid}`,
        contents: content,
      });
  
      socket.on("on-auto-save", (data) => {
        if(data.updatedNotes){
            console.log(data.updatedNotes.data[0].sub_grp,'change logged in note 4')
            // const sub_grp = data.updatedNotes.data[0].sub_grp
            // console.log(sub_grp,'here are change logged in note 4')
            // dispatch({type: actionTypes[finalStr],payload:sub_grp})              
            // setNote(sub_grp)
        }
  
  
      });
    }
  


    const sub_py = note.reduce((totalpy, i) => totalpy +  Number(i.sub_grp.py_amt), 0);
    const sub_cy = note.reduce((totalCy, i) => totalCy +  Number(i.sub_grp.cy_amt), 0);
  
    if(note == null | note == []){
      return(
        <div style={{height:'80vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
          <Spinner animation="grow" size="sm" />
        </div>
      )
    }
    // if()
    return (
        <div>
          <table>
                <thead >
                  <tr style={{backgroundColor:'#A2C0C2'}}>
                  <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'2rem'}}>PARTICULAR</th>
  
                  <th style={{width:'10%'}}>As at March 31, 2021</th>
                  <th style={{width:'10%'}}>As at March 31, 2020</th>
                  <th style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th>
                  </tr>
                </thead>         

              {disclosures.map((sub,i)=>{
                // const py = sub.disclosures.reduce((totalPy, i) => totalPy +  Number(i.py_amt), 0);
                // const cy = sub.disclosures.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
                console.log(sub,"sub")
                return(
                  <tbody key={i}>
                    <tr  style={level3}>
                    <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem'}}>{sub.disclosures ? sub.disclosures : sub.notes_disclosures}</td>
                    <td style={{width:'10%',textAlign:'end',paddingLeft:'1rem'}}>
                        <input type="number" 
                                value={sub.cy_amt}  
                                style={input} 
                                onChange={(e)=>{handleChange(e,sub,sub,'currentYear')}}
                                onBlur={()=>{
                                  // handleLeave()
                                  // console.log('youre out')
                                }}
                                />
                      {/* {sub.cy_amt.toLocaleString('en-IN')} */}
                    </td>
                    <td style={{width:'10%',textAlign:'end',paddingLeft:'1rem'}}>
                        <input type="number" 
                                value={sub.py_amt}  
                                style={input} 
                                onChange={(e)=>{handleChange(e,sub,sub,'prevYear')}}
                                onBlur={()=>{
                                  // handleLeave()
                                  // console.log('youre out')
                                }}
                                />
                      {/* {sub.py_amt.toLocaleString('en-IN')} */}
                    </td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                    </td>
                    </tr>
                  </tbody>
                )
              })}
              {note.map((sub,i)=>{
                const py = sub.disclosures.reduce((totalPy, i) => totalPy +  Number(i.py_amt), 0);
                const cy = sub.disclosures.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
                console.log(sub,"sub")
                return(
                  <tbody key={i}>
                    <tr  style={level3}>
                    <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem'}}>{sub.sub_grp.sub_grp}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>
                      {(Math.abs(sub.sub_grp.cy_amt)).toLocaleString('en-IN')}
                    </td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>
                      {(Math.abs(sub.sub_grp.py_amt)).toLocaleString('en-IN')}
                    </td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                    </td>
                    </tr>
                  </tbody>
                )
              })}
                <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{props.note === '17'? 'Net Difference' :  'Total'}</td>
                  <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>
                    {(Math.abs(sub_cy)).toLocaleString('en-IN')}
                  </td>
                  <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem'}}>{(Math.abs(sub_py)).toLocaleString('en-IN')}</td>
                  <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                </tr> 
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
          {/* <div >
          Net Carrying Amount</div> */}
            
        </div>
    )
}

export default Note8
