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

const Note4B = (props) => {

  // const str = 'SET_NOTE'
  // const str1 = 'note'
  // const str2 = props.note.toString()
  const finalStr = props.FinalStr
  const NoteStr = props.NoteStr
  console.log(NoteStr)
  const dispatch = useDispatch();

  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(false)
  const [dummy, setDummy] = useState(props.note4)
  const [random, setRandom] = useState('')
  const [nid, setNld] = useState('')
  const [render, setRender] = useState('')
  const [noteOpen, setNoteOpen] = useState(false)



  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');

  console.log(random,'ranfom')
  console.log(Note,'ranfom')

  useEffect(() => {
    if(Note){
      setNote(Note)
    }
  }, [Note])
  
  useEffect(() => {
      console.log('nothing here mate')
      const auth = localStorage.getItem('auth_token')    
      let headers = {
          'x-auth-token' : auth,
          // 'Content-Type' : 'application/json'
      }
      const fd = new FormData()
      fd.append('notes_no',props.note);
      setLoading(true)
      axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
      .then(res =>{
        setLoading(false)
        console.log(res,'response  npotes notes resonse response response')
        setNld(res.data.notes.nlid)    
        setNote(res.data.notes.data[0].sub_grp)
        console.log('ssss',finalStr) 
        dispatch({type: actionTypes[finalStr],payload:res.data.notes.data[0].sub_grp})              
      }).catch(err=>{
        setLoading(false)
      })
    // }
    // else{
    //   // setNote(Note)
    //   // console.log(Note)

    // }

    // console.log('some nothing here mate')
    // return () => {
    //   // dispatch({type: actionTypes.SET_NOTE4,payload:note})              
    // }    
  }, [])


  useEffect(() => {
    note.map((sub)=>{
      // console.log(sub,'sbsubsub')
        sub.disclosures.map((dis,i)=>{

          console.log(dis)

          if(dis.disclosures === 'Opening Gross Carrying Amount'){
            console.log(dis.disclosures,'dis.disclosures')

            socket.emit("notes-auto-save", {
              project_id: `${project_id}`,
              tb_id: `${TB_ID}`,
              nlid: `${nid}`,
              contents: {
                sid: `${sub.sid}`,
                disclosures: "Opening Gross Carrying Amount",
                cy_amt: `${sub.sub_grp.py_amt}`,
                py_amt: "0",
              },
            });
          }
          if(dis.disclosures === 'Opening Accumulated Depreciation'){
            console.log(dis.disclosures,'dis.disclosures')
            
            socket.emit("notes-auto-save", {
              project_id: `${project_id}`,
              tb_id: `${TB_ID}`,
              nlid: `${nid}`,
              contents: {
                sid: `${sub.sid}`,
                disclosures: "Opening Accumulated Depreciation",
                cy_amt: `${sub.sub_grp.py_amt}`,
                py_amt: "0",
              },
            });
          }
          if(dis.disclosures === 'Opening Accumulated depreciation'){
            console.log(dis.disclosures,'dis.disclosures')
            
            socket.emit("notes-auto-save", {
              project_id: `${project_id}`,
              tb_id: `${TB_ID}`,
              nlid: `${nid}`,
              contents: {
                sid: `${sub.sid}`,
                disclosures: "Opening Accumulated depreciation",
                cy_amt: `${sub.sub_grp.py_amt}`, 
                py_amt: "0",
              },
            });
          }
          if(dis.disclosures === 'Opening Accumulated Amortization'){
            console.log(dis.disclosures,'dis.disclosures')
            
            socket.emit("notes-auto-save", {
              project_id: `${project_id}`,
              tb_id: `${TB_ID}`,
              nlid: `${nid}`,
              contents: {
                sid: `${sub.sid}`,
                disclosures: "Opening Accumulated Amortization",
                cy_amt: `${sub.sub_grp.py_amt}`,
                py_amt: "0",
              },
            });
          }
        })

    })
  },[])

  
  
  function handleChange(e,data,a,field){
    const content ={}

    content.sid = `${a.sid}`
    content.disclosures=data.disclosures
    
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


    var arr = note
    arr.map((line)=>{
      console.log(line,'line here')
      // line[0].map((sub,i)=>{
        if(line.sid === a.sid ){
          console.log(line.sid,'sub here')
          line.disclosures.map((dsc,i)=>{
            if(dsc.did === data.did ){
              dsc.cy_amt = Number(content.cy_amt)
              dsc.py_amt = Number(content.py_amt)
              console.log(dsc,e.target.value,'sdc')
            }
          })
        }
      // })
    })
    console.log(arr,content,'data here ')
    setNote(arr)
    setRender(Math.random())
    
    console.log(content,'content')
    socket.emit("notes-auto-save", {
      project_id: `${project_id}`,
      tb_id: `${TB_ID}`,
      nlid: `${nid}`,
      contents: content,
    });

    socket.on("on-auto-save", (data) => {
      //To trigger in the Fetch API (Conventional Model)
      // console.log("{User Logged IN}", data.updatedNotes);
      if(data.updatedNotes){
          console.log(data.updatedNotes.data[0].sub_grp,'change logged in note 4')
          const sub_grp = data.updatedNotes.data[0].sub_grp
          console.log(sub_grp,'here are change logged in note 4')
          dispatch({type: actionTypes[finalStr],payload:sub_grp})              
          // setNote(sub_grp)
        // if(data.updatedNotes.note_no === '4'){
        //   console.log("{User Logged IN}", data.updatedNotes.data);
        //   // dispatch({type: actionTypes.SET_NOTE4,payload:data.updateNotes.data[0].sub_grp})              
        // }
        // if(data.updatedNotes.note_no === '7'){
        //   console.log("{User Logged IN}", data.updatedNotes.data);
        //   setNote(data.updatedNotes.data[0].sub_grp)
        //   // dispatch({type: actionTypes.SET_NOTE4,payload:data.updateNotes.data[0].sub_grp})              
        // }
      }


    });
  }

  // function handleInput(){
  //   props.setShowCreateInput(true)
  //   props.setNid(nid)
  //   props.setSid(sub.sid)
  //   props.setNoteNum(props.note)
  //   setRandom(Math.random())
  // }

  function handleLeave(){
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
      setNote(res.data.notes.data[0].sub_grp)
      setNld(res.data.notes.nlid)
      // dispatch({type: actionTypes.SET_NOTE4,payload:res.data.notes.data[0].sub_grp})                 
    }).catch(err=>{
    }) }

    const sub_py = note.reduce((totalpy, i) => -totalpy +  Number(i.sub_grp.py_amt), 0);
    const sub_cy = note.reduce((totalCy, i) => -totalCy +  Number(i.sub_grp.cy_amt), 0);
  
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
                  <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'2rem'}}>PARTICULAR</th>
  
                  <th style={{width:'10%'}}>As at March 31, 2021</th>
                  <th style={{width:'10%'}}>As at March 31, 2020</th>
                  <th style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th>
                  </tr>
                </thead>         

              {note.map((sub,i)=>{
                // console.log(sub)
                const py = sub.disclosures.reduce((totalPy, i) => totalPy +  Number(i.py_amt), 0);
                const cy = sub.disclosures.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);

                console.log(sub,"sub")
                // console.log(cy)
                return(
                  <tbody key={i}>
                  <tr  className='n4level3'>
                  <td style={{width:'40%',height:'80px',textAlign:'left',paddingLeft:'2rem'}}>{sub.sub_grp.sub_grp}</td>
  
                  <td style={{width:'10%'}}>{sub.sub_grp.cy_amt && sub.sub_grp.cy_amt.toLocaleString('en-IN')}</td>
                  <td style={{width:'10%'}}>{sub.sub_grp.py_amt && sub.sub_grp.py_amt.toLocaleString('en-IN')}</td>
                  <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>{sub.sub_grp.cy_amt-cy != 0 || sub.sub_grp.py_amt-py !=0 ? 
                  <i style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' /> 
                    :null
                    }</td>                </tr>
                {sub.disclosures.map((dcl,ix) =>{
                  // console.log(sub.sid,'sub')
                  // console.log(dcl,'dcl')
                  if(dcl.disclosures === 'Opening Gross Carrying Amount' || 
                  dcl.disclosures === 'Opening Accumulated depreciation'||
                  dcl.disclosures === 'Opening Accumulated Amortization'||
                  dcl.disclosures === 'Opening Accumulated Depreciation')
                  {
                 if(!(dcl.cy_amt === sub.sub_grp.py_amt)){

                   socket.emit("notes-auto-save", {
                     project_id: `${project_id}`,
                     tb_id: `${TB_ID}`,
                     nlid: `${nid}`,
                     contents: {
                       sid: `${sub.sid}`,
                       disclosures: `${dcl.disclosures}`,
                       cy_amt: `${sub.sub_grp.py_amt}`,
                       py_amt: "0",
                     },
                   });
                   return

 
                 }
                 return(
                  <tr  className='n4disclosure' key={i}>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dcl.disclosures}</td>
                  <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dcl.cy_amt.toLocaleString('en-IN')}</td>
                  <td style={{width:'10%',textAlign:'right' }}>
                    {/* {dcl.py_amt.toLocaleString('en-IN')} */}
                    <input type="number" 
                          value={dcl.py_amt}  
                          style={input} 
                          onChange={(e)=>{handleChange(e,dcl,sub,'prevYear')}}
                          onBlur={()=>{
            
                          }}
                          />
                    </td>
                  <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem' }}></td>
                  </tr>)
                }
                  return(

                    <tr  className='n4disclosure' key={ix}>
                      <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dcl.disclosures}</td>
      
                      <td style={{width:'10%'}}>
                        <div style={inputDiv}>
                          <input type="number" 
                          value={dcl.cy_amt}  
                          style={input} 
                          onChange={(e)=>{handleChange(e,dcl,sub,'currentYear')}}
                          onBlur={()=>{
                            // handleLeave()
                            console.log('youre out')
                          }}
                          />
                        </div>
                      </td>
                      <td style={{width:'10%'}}>
                        <div style={inputDiv}>
                          <input type="number" 
                          value={dcl.py_amt}  
                          style={input} 
                          onChange={(e)=>{handleChange(e,dcl,sub,'prevYear')}}
                          onBlur={()=>{
                            // handleLeave()
                            // console.log('youre out')
                          }}
                          />
                        </div>
                      </td>
                      <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                    </tr>
                  )

                })}
                    <tr   style={{backgroundColor:'rgb(238, 233, 233)',color:'#e1e1e1'}}>
                      <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem',fontWeight:'600',fontSize:'14px'}}>Net Difference</td>  
                      <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',fontWeight:'600',fontSize:'14px'}}>{(sub.sub_grp.cy_amt-cy).toLocaleString('en-IN')}</td>
                      <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem',fontWeight:'600',fontSize:'14px'}}>{(sub.sub_grp.py_amt-py).toLocaleString('en-IN')}</td> 
                      <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                    </tr>
                <tr  className='n4addInput'>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem',cursor:'pointer'}}
                  onClick={()=>{
                    props.setShowCreateInput(true)
                    props.setNid(nid)
                    props.setSid(sub.sid)
                    props.setNoteNum(props.note)
                    props.setRandom(finalStr)
                    // props.setMath(Math.random())
                    // setRandom(Math.random())
                  }}
                  >+ Create New Input</td>
                  <td style={{width:'10%'}}></td>
                  <td style={{width:'10%'}}></td>
                  <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                </tr> 
                </tbody>
                )
              })}
                <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}> Net Carrying amount</td>
                  <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{(sub_cy*-1).toLocaleString('en-IN')}</td>
                  <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem'}}>{(sub_py*-1).toLocaleString('en-IN')}</td>
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

export default Note4B
