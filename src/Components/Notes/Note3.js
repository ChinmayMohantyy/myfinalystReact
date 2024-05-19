import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {socket} from '../../services/socket/socket'
import * as actionTypes from '../../redux/actionTypes'
import axios from 'axios'
// import {Tooltip} from '@material-ui/core'
// import {Tooltip,OverlayTrigger,Button} from 'react-bootstrap'


const Note3 = (props) => {

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
  const dispatch = useDispatch();

  const [note, setNote] = useState([])
  const [nid, setNld] = useState('')
  const noteNo = 3

  console.log(noteNo)



  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const Note = useSelector(initialState => initialState.reducerNotes.note3)
  const project_id = localStorage.getItem('project_id');

  useEffect(() => {
    if(Note === [] | Note === null |Note === ''){
      const auth = localStorage.getItem('auth_token')    
      let headers = {
          'x-auth-token' : auth,
          // 'Content-Type' : 'application/json'
  
      }
      const fd = new FormData()
      fd.append('notes_no',noteNo);
      // console.log(noteNo)
      
      axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
      .then(res =>{
        console.log(res,'response  npotes notes resonse response response')
        setNote(res.data.notes.data)
        setNld(res.data.notes.nlid)    
      }).catch(err=>{
        // console.log(err.response)
        // if(err.response.data){
  
        //   alert(err.response.data.error)  
        // }
      })
      return
    }
    else{
      setNote(Note)
      // console.log('set ------------------- set')
    }
  }, [])


  useEffect(() => {
    note.map((row)=>{
      row.sub_grp.map((sub,i)=>{
        sub.disclosures.map((dis,i)=>{
          console.log(dis,'disdis dsi dsidsid ')

          if(dis.disclosures === 'Opening Gross Carrying Amount'){
            
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

    })
  },[])

  function handleChange(e,data,a,field){
    const content ={}
    // console.log(e.target.value)
    // console.log(data)
    // console.log(a)
    // console.log(field)
    // console.log(typeof project_id,'projectid')
    // console.log(typeof TB_ID,'tb_id')
    // console.log(typeof nid,'nid')
    // console.log(typeof a.sid,'sid')
    content.sid = `${a.sid}`
    content.disclosures=data.disclosures
    
    if(field === 'currentYear'){
      // const value = e.target.value.replace(/\D/g, "")
      // console.log(value)
      // let { value, min, max } = e.target;
      // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      // console.log(value)
      // content.cy_amt = Number(value)
      content.cy_amt = e.target.value
      if(e.target.value === ''){
        content.cy_amt = '0'
      }
      content.py_amt = data.py_amt.toString()
    }
    if(field === 'prevYear'){
      // const value = e.target.value.replace(/\D/g, "")
      // console.log(value)
      // let { value, min, max } = e.target;
      // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      // console.log(value)
      content.py_amt = e.target.value
      if(e.target.value === ''){
        content.py_amt = '0'
      }
      content.cy_amt = data.cy_amt.toString()
      // content.py_amt = Number(value)
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
    socket.emit("notes-auto-save", {
      project_id: `${project_id}`,
      tb_id: `${TB_ID}`,
      nlid: `${nid}`,
      contents: content,
    });

  }
  socket.on("on-auto-save", (data) => {
    //To trigger in the Fetch API (Conventional Model)
    if(data.updatedNotes){
      console.log("{User Logged IN}", data.updatedNotes.data);
      // setNote(data.updatedNotes.data)
      // dispatch({type: actionTypes.SET_NOTE4,payload:data.updateNotes.data[0].sub_grp})              


    }

  });

  function handleLeave(){
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
        // 'Content-Type' : 'application/json'

    }
    const fd = new FormData()
    fd.append('notes_no',noteNo);
    
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
      console.log(res,'response  npotes notes resonse response response')
      // setNote(res.data.notes.data[0].sub_grp)
      setNld(res.data.notes.nlid)
      dispatch({type: actionTypes.SET_NOTE3,payload:res.data.notes.data})              
    
    }).catch(err=>{
      // console.log(err.response)
      // if(err.response.data){

      //   alert(err.response.data.error)  
      // }
    })

  }
  
  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Simple tooltip
  //   </Tooltip>
  // );
  


  // const level3 ={
  //   backgroundColor:'white',
  //   fontSize: '18px',
  //   fontWeight: '500',
  //   lineHeight: '23px',
  //   textAlign: 'left',
  //   color:'black'


  // }
    return (
        <div className='notes'>
          <table>
            <thead >
                <tr style={{backgroundColor:'#A2C0C2'}}>
                <th style={{width:'40%',height:'90px',textAlign:'left',paddingLeft:'2rem'}}>PARTICULAR</th>
 
                <th style={{width:'10%'}}>As at March 31, 2021</th>
                <th style={{width:'10%'}}>As at March 31, 2020</th>
                <th style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th>
                </tr>
            </thead>
            {note.map((row,i)=>{
              console.log(row,'row row')
              // row.sub_grp.forEach((item)=>{

              //   console.log(item)

              // })
            })}
              {/* {note.map((row,i)=>{
                console.log(row)
                var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
                var chunksize = 2;
                var chunks = [];
                row.sub_grp.forEach((item)=>{
                  if(!chunks.length || chunks[chunks.length-1].length == chunksize)
                  chunks.push([]);

                  chunks[chunks.length-1].push(item);
                });
                console.log(chunks,'chunks');
                return chunks.map((slt,ic)=>{
                  console.log(slt,'slt')

                  const sub_py = slt.reduce((totalpy, i) => -totalpy +  Number(i.sub_grp.py_amt), 0);
                  const sub_cy = slt.reduce((totalCy, i) => -totalCy +  Number(i.sub_grp.cy_amt), 0);

                  return(
  
                    <tbody key={ic}>
                    {slt.map((sub,i)=>{
                      const cy = sub.disclosures.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
                      const py = sub.disclosures.reduce((totalPy, i) => totalPy +  Number(i.py_amt), 0);
                      return(
                        <>
                        <tr  className='n4level3' key={i}> 
                        <td style={{width:'40%',height:'80px',textAlign:'left',paddingLeft:'2rem'}}>{sub.sub_grp.sub_grp}</td>    
                        <td style={{width:'10%'}}>{sub.sub_grp.cy_amt}</td>
                        <td style={{width:'10%'}}>{sub.sub_grp.py_amt}</td>
                        <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                      </tr>
                      {sub.disclosures.map((dis,i)=>{
  
                      if(dis.disclosures === 'Opening Gross Carrying Amount'){
                      return(
                          <tr  className='n4disclosure' >
                          <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dis.disclosures}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.cy_amt}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.py_amt}</td>
                          <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem' }}></td>
                          </tr>)
  
  
                      }
                      if(dis.disclosures === 'Opening Accumulated Amortization'){
                      return(
                          <tr  className='n4disclosure'>
                          <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dis.disclosures}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.cy_amt}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.py_amt}</td>
                          <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem' }}></td>
                          </tr>)
  
  
                      }
                      if(dis.disclosures === 'Opening Accumulated Depreciation'){
                      return(
                          <tr  className='n4disclosure' >
                          <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dis.disclosures}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.cy_amt}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.py_amt}</td>
                          <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem' }}></td>
                          </tr>) 
                      }
                      if(dis.disclosures === 'Opening Accumulated depreciation'){
                      return(
                          <tr  className='n4disclosure' >
                          <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dis.disclosures}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.cy_amt}</td>
                          <td style={{width:'10%',textAlign:'right',paddingRight:'1rem' }}>{dis.py_amt}</td>
                          <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem' }}></td>
                          </tr>) 
                      }
                        return(
                          <tr  className='n4disclosure' key={i}>
                          <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}>{dis.disclosures}</td>
          
                          <td style={{width:'10%'}}>
                            <div style={inputDiv}>
                              <input type="number" 
                              value={dis.cy_amt}  
                              style={input} 
                              onChange={(e)=>{handleChange(e,dis,sub,'currentYear')}}
                              onBlur={()=>{
                                handleLeave()
                                console.log('youre out')
                              }}
                              />
                            </div>
                          </td>
                          <td style={{width:'10%'}}>
                            <div style={inputDiv}>
                              <input type="number" 
                              value={dis.py_amt}  
                              style={input} 
                              onChange={(e)=>{handleChange(e,dis,sub,'prevYear')}}
                              onBlur={()=>{
                                handleLeave()
                                console.log('youre out')}}
                              />
                            </div>
                          </td>
                          <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem' }}></td>
                        </tr>
                            )
  
                      })}
                          <tr  
                          className='n4addInput'
      
                          >
                            <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem' ,cursor:'pointer'}}
                            onClick={()=>{
                              props.setShowCreateInput(true)
                              props.setNid(nid)
                              props.setSid(sub.sid)
                              props.setNoteNum(noteNo)
                            }}
                            >+ Create New Input</td>
                            <td style={{width:'10%'}}></td>
                            <td style={{width:'10%'}}></td>
                            <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                          </tr>
                      <tr  className='' style={{backgroundColor:'rgb(238, 233, 233)',color:'#e1e1e1'}}>
                        <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem',fontWeight:'600',fontSize:'14px'}}>
                          Net Difference
                          </td>  
                        <td style={{width:'10%',textAlign:'end',paddingRight:'1rem',fontWeight:'600',fontSize:'14px'}}>{sub.sub_grp.cy_amt-cy}</td>
                        <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem',fontWeight:'600',fontSize:'14px'}}>{sub.sub_grp.py_amt-py}</td> 
                        <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                      </tr>
  
                      </>
                      )
  
                    })}
                <tr  style={{height:'50px',backgroundColor:' #F0DBC8',padding:'10px 0 0 2rem',alignContent:'center',fontSize:'1.1rem',fontWeight:'600'}}>
                  <td style={{width:'40%',height:'33px',textAlign:'left',paddingLeft:'2rem'}}> Net Carrying amount</td>
                  <td style={{width:'10%',textAlign:'end',paddingRight:'1rem'}}>{sub_cy*-1}</td>
                  <td style={{width:'10%' ,textAlign:'end',paddingRight:'1rem'}}>{sub_py*-1}</td>
                  <td style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}></td>
                </tr> 
                      

                    </tbody>
                      )
                })
                
              })} */}
          
          </table>

            
        </div>
    )
}

export default Note3
