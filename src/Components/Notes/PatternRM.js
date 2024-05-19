import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {socket} from '../../services/socket/socket'
import * as actionTypes from '../../redux/actionTypes'
import {Spinner} from 'react-bootstrap'
import {motion} from 'framer-motion'

import Note1 from './Note1'




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

const PatternRM = (props) => {

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
  const [dummy, setDummy] = useState(props.note4)
  const [loading, setLoading] = useState(false)
  const [nid, setNld] = useState('')
  const [noteOpen, setNoteOpen] = useState(false)

  // console.log(nid,'note values')
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
    fd.append('notes_no',9);
    setLoading(true)
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
      console.log(res,'header')
      const fd = new FormData()
      fd.append('notes_no',props.note);
      axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
      .then(res =>{
        setLoading(false)
        console.log(res,'response  npotes notes resonse response response')
        console.log(res.data.fetchNt.data,'response  npotes notes resonse response response')
        setNote(res.data.fetchNt.data)
        console.log('ssss',res.data.data.fetchNt.data) 
        dispatch({type: actionTypes[finalStr],payload:res.data.fetchNt.data})              
  
      }).catch(err=>{
  
      })            

    }).catch(err=>{

    })
    return () => {
    }    
    }, [])


    // const sub_py =  0
    // const sub_cy = 0
    const sub_py = note.reduce((totalpy, i) => totalpy +  Number(i.py_amt), 0);
    const sub_cy = note.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
  
    if(note == null | note == [] | loading){
      return(
        <div style={{height:'80vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" />
          <Spinner animation="grow" size="sm" />
        </div>
      )
    }
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
              {note.map((sub,i)=>{
                // console.log(sub)
                const py = 0
                const cy = 0;
                // const py = sub.reduce((totalPy, i) => totalPy +  Number(i.py_amt), 0);
                // const cy = sub.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
                console.log(sub,"sub")
                // console.log(cy)
                return(
                  <tbody key={i}>
                    <tr  style={level3}>
                    <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem'}}>{sub.rm_b}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{sub.cy_amt}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{sub.py_amt}</td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                        {/* {sub.sub_grp.cy_amt-cy != 0 || sub.sub_grp.py_amt-py !=0 ? <i style={{marginLeft:'20px',color:'darkred',transform:'scale(1.2)'}}className='fas fa-times-circle' /> 
                        :<i style={{marginLeft:'20px',color:'darkgreen',transform:'scale(1.2)'}} class="fas fa-check-circle"/>} */}
                    </td>
                    </tr>
                    {/* <tr   style={{backgroundColor:'rgb(238, 233, 233)',color:'#e1e1e1'}}>
                    <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem',fontWeight:'600',fontSize:'14px'}}>Net Difference</td>  
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',fontWeight:'600',fontSize:'14px'}}>{(sub.sub_grp.cy_amt-cy).toLocaleString('en-IN')}</td>
                    <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem',fontWeight:'600',fontSize:'14px'}}>{(sub.sub_grp.py_amt-py).toLocaleString('en-IN')}</td> 
                    <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                    </tr> */}
                {/* <tr  className='n4addInput'>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem',cursor:'pointer'}}
                  onClick={()=>{
                    props.setShowCreateInput(true)
                    props.setNid(nid)
                    props.setSid(sub.sid)
                    props.setNoteNum(props.note)
                  }}
                  >+ Create New Input</td>
                  <td style={{width:'10%'}}></td>
                  <td style={{width:'10%'}}></td>
                  <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                </tr>  */}
                </tbody>
                )
              })}
                <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}> Total amount</td>
                  <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{(sub_cy).toLocaleString('en-IN')}</td>
                  <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem'}}>{(sub_py).toLocaleString('en-IN')}</td>
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

export default PatternRM
