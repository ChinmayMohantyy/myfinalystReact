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

const Note22B = (props) => {

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
  const [nid, setNld] = useState('')
  const [loading, setLoading] = useState(false)
  const [noteOpen, setNoteOpen] = useState(false)

  // console.log(nid,'note values')
  // const noteNo = 4
  // var myVar = eval(NoteStr);

  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
//   const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');
//   console.log(Note['Opening Balance'],'hey hey hey')
//   console.log(Note['Closing Balance'],'hey hey hey')
//   console.log(Note,'hey hey hey')
  console.log(note,'hey hey hey')

  
  useEffect(() => {
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
        // 'Content-Type' : 'application/json'
    }
    const fd = new FormData()
    setLoading(true)
    fd.append('notes_no',props.note);
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
      setLoading(false)
      console.log(res,'response  npotes notes resonse response response')
      console.log(res.data.fetchNt,'response  npotes notes resonse response response')
    //   setNld(res.data.data.note22)    
      setNote(res.data.fetchNt)
      console.log('ssss',res.data.fetchNt) 
    //   dispatch({type: actionTypes[finalStr],payload:res.data.fetchNt.data[0]})              
      
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

    // console.log('ssss Closing Balance Closing Balance',note.data[0]['Closing Balance']) 

    const sub_py =  0
    const sub_cy = 0
    // const clo_py = 0;
    // const clo_cy =  0
    // const opn_py =  0
    // const opn_cy = 0
    const total = {}
    if(note.data){
        
        total.clo_py = note.data[0]['Closing Balance'].reduce((totalpy, i) => totalpy +  Number(i.py_amt), 0);
        total.clo_cy = note.data[0]['Closing Balance'].reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
        total.opn_py = note.data[0]['Opening Balance'].reduce((totalpy, i) => totalpy +  Number(i.py_amt), 0);
        total.opn_cy = note.data[0]['Opening Balance'].reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
    }

    // console.log(clo_cy,clo_py,opn_cy,opn_py)
  
    if(note == null | note == [] | loading  ){
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
                <tbody >
                    <tr  style={level3}>
                    <td style={{width:'40%',height:'30px',textAlign:'left',paddingLeft:'2rem',color:'black',fontSize:'1.1rem'}}>Closing Balance</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}></td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}></td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                       
                    </td>
                    </tr>
                </tbody>         
              {note.data && note.data[0]['Closing Balance'].map((sub,i)=>{                
                return(
                  <tbody key={i}>
                    <tr  style={level3}>
                    <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem'}}>{sub.rm_b}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{sub.cy_amt}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{sub.py_amt}</td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                    </td>
                    </tr>
                </tbody>
                )
              })}
                <tbody >
                    <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                    <td style={{width:'40%',height:'30px',backgroundColor:' #F0DBC8',textAlign:'left',paddingLeft:'2rem',color:'black',fontSize:'1.1rem'}}>Total Closing Balance</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}>{total.clo_cy ? total.clo_cy : 0}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}>{total.clo_py? total.clo_py : 0}</td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                    
                    </td>
                    </tr>
                </tbody>
                <tbody >
                    <tr  style={level3}>
                    <td style={{width:'40%',height:'30px',height:'50px',textAlign:'left',paddingLeft:'2rem',color:'black',fontSize:'1.1rem'}}>Opening Balance</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}></td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}></td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                    
                    </td>
                    </tr>
                </tbody> 
              {note.data && note.data[0]['Opening Balance'].map((sub,i)=>{
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
                       
                    </td>
                    </tr>
                </tbody>
                )
              })}
               <tbody >
                    <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                    <td style={{width:'40%',height:'30px',height:'50px',backgroundColor:' #F0DBC8',textAlign:'left',paddingLeft:'2rem',color:'black',fontSize:'1.1rem'}}>Total Opening Balance</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}>{total.opn_cy ? total.opn_cy : 0}</td>
                    <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',color:'black',fontSize:'1.1rem'}}>{total.opn_py ? total.opn_py : 0}</td>
                    <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>
                    
                    </td>
                    </tr>
                </tbody> 
                {/* <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}> Total amount</td>
                  <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{(sub_cy).toLocaleString('en-IN')}</td> 
                  <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem'}}>{(sub_py).toLocaleString('en-IN')}</td>
                  <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                </tr>  */}
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

export default Note22B
