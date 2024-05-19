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

  

const NoteLeases = (props) => {
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
  const [noteOpen, setNoteOpen] = useState(false)
  // console.log(nid,'note values')
  // const noteNo = 4
  // var myVar = eval(NoteStr);
  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');
  // console.log(Note,'hey hey hey')
  useEffect(() => {
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
        // 'Content-Type' : 'application/json'
    }
    const fd = new FormData()
    console.log(props.note,'here is props.note')

    fd.append('notes_no',props.note);
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
      console.log(props.note,'here is props.note')
      if(props.note === '13(c)'){
        console.log(res,'response 13(c)  npotes notes resonse response response')
        setNld(res.data.notes.nlid)    
        setNote(res.data.notes.data[1].sub_grp)
        console.log('ssss',finalStr) 
        dispatch({type: actionTypes[finalStr],payload:res.data.notes.data[1].sub_grp})              
      }
      console.log(res,'response normal  npotes notes resonse response response')
      setNld(res.data.notes.nlid)    
      setNote(res.data.notes.data[0].sub_grp)
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

    
    return (
        <div>
          <table>
                <thead >
                  <tr style={{backgroundColor:'#A2C0C2'}}>
                  <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'2rem'}}></th>
                  <th style={{width:'10%'}}>Current Year</th>
                  <th style={{width:'10%'}}>Previous Year</th>
                  </tr>
                </thead>
                  <tbody>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Opening ROU asset - Gross</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Additions</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Addition on account of business combinations</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Exchange differences</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Disposals</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Transfers</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Closing ROU Asset - Gross</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}>Sum of above (signs to be considered as mentioned)</td>
                    </tr>
                </tbody>

          </table>
          <br/>
          <table>
                <thead >
                  <tr style={{backgroundColor:'#A2C0C2'}}>
                  <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'2rem'}}></th>
                  <th style={{width:'10%'}}>Current Year</th>
                  <th style={{width:'10%'}}>Previous Year</th>
                  </tr>
                </thead>
                  <tbody>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Opening Accumulated Depreciation</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Depreciation during the year</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Impairment loss</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Disposals</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Exchange difference</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                    </tr>
                    <tr  style={level3}>
                      <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Closing Accumulated Depreciation</td>
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}>Sum of above (signs to be considered as mentioned)</td>
                    </tr>
                </tbody>

          </table>
            <br/>
            <table>
                    <thead >
                    <tr style={{backgroundColor:'#A2C0C2'}}>
                    <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'2rem'}}></th>
                    <th style={{width:'10%'}}>Current Year</th>
                    <th style={{width:'10%'}}>Previous Year</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Opening Lease liability</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Additions</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Additions on account of business combinations</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Interest during the year</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Lease payments</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Disposals</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Exchange difference</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}></td>
                        </tr>
                        <tr  style={level3}>
                        <td style={{width:'40%',height:'70px',textAlign:'left',paddingLeft:'2rem',backgroundColor:'#EBEBEB'}}>Closing lease liability</td>
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',backgroundColor:'#EBEBEB'}}>Sum of above (signs to be considered as mentioned)</td>
                        </tr>
                    </tbody>

            </table>
          <br/>
          <table>
                    <tr>
                        <th style={{width:'10%'}}>Current lease liability</th>
                        <th style={{width:'8%'}}></th>
                        <th style={{width:'8%'}}></th>
                    </tr>
                    <tr>
                        <th style={{width:'10%'}}>Non current lease liability</th>
                        <th style={{width:'8%'}}></th>
                        <th style={{width:'8%'}}></th>
                    </tr>

            </table>

          <div style={{display:'flex',marginTop:'1rem',height:'50px',border:'2px solid #e8e8e8'}}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'center',paddingLeft:'1rem',color:'grey'}}><p>Notes here</p></div>
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

export default NoteLeases