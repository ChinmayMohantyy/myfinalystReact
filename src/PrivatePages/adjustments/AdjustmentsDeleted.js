import React,{useState,useEffect,useContext} from 'react'
import {List, TextareaAutosize} from '@material-ui/core';
import * as actionTypes from '../../redux/actionTypes'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useHistory} from 'react-router-dom'

import Select from 'react-select';
// import {Submit} from '../../Button'
import swal from 'sweetalert';
import {socket} from '../../services/socket/socket'
import adjustment from '../../assets/adjustment.svg'
import  filter from '../../assets/filter.svg'
import  download from '../../assets/download.svg'
import  trash from '../../assets/trash.svg'
import {Navbar} from '../../Components/Navbar'
// import {Submit} from '../../Component/Button'
import  arrow from '../../assets/arrowLeftGreen.svg'
import { ThemeContext } from "../../helper/DarkModeContext";

// import { handleInputChange } from 'react-select/src/utils';




const AdjustmentsDeleted = (props) => {
    const dispatch = useDispatch();
    const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
        // 'Content-Type' : 'application/json'

    }
    const project_id = localStorage.getItem('project_id');
    const { theme } = useContext(ThemeContext);

    // const format = {
    //     lid: "",
    //     ledger_code: "",
    //     ledger_name: "",
    //     cy: '',
    //     adjusted_amount: '',
    //     net_adjustment_amount: '',
    //     isAdjusted: true,
    //     remarks: "",
    //     user_id: "",
    //   }
    
    const [line, setLine] = useState([])
    const [adjusted, setAdjusted] = useState([])
    const [items, setItems] = useState([])
    const [options, setOptions] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    const [change, setChange] = useState(0)
    const span = line.length
    let history = useHistory()
    console.log(adjusted)  
    console.log(options)  
    console.log(line,'line')  
    
    
    useEffect(() => {
        fetchDeletedAdjustmentLogs();
    }, [])


    const fetchDeletedAdjustmentLogs=()=>{
      axios.get(`api/v1/adjustments/fetch-deleted-adjustments/${project_id}/${TB_ID}`,{headers})
        .then(res =>{
            console.log(res.data.logs.data,' sadasdas response  npotes notes resonse response response')             
            setAdjusted(res.data.logs.data)
  
        }).catch(err=>{
          setAdjusted([])
          console.log(err.response)   
        })
    }
    
    function handleRestore(ix,val){
      console.log(ix,"ix value");
      console.log(val,"val value");

      const auth = localStorage.getItem('auth_token')
      const project_id = localStorage.getItem('project_id'); 

      let headers = {
          'x-auth-token' : auth,
          'Content-Type' : 'application/json'
      }
      axios.put(`api/v1/adjustments/fetch-delete-adjustments/${project_id}/${TB_ID}`,adjusted,{headers})
      .then(response => {
        console.log('ksksksksksksk');
          console.log(response);
          fetchDeletedAdjustmentLogs()
      })
      .catch(error =>{
          console.log(error.response,'error')
        }
      )
         
    }

    const adjustmentsTable={
      minWidth:'1045px',
    //   maxHeight:'95vh',
    //   overflowY:'scroll',
    //   minHeight:'95vh'
        height:'100vh'
    }
    
    const nf = new Intl.NumberFormat();


    return (
         <div className='adjustmentsTable' style={adjustmentsTable}>
            <Navbar text='Adjustments'/>
            <div className="adjustmentsMenu">
                <div className="adjustment" style={{marginLeft:'0'}}
                        onClick={()=>{ history.push('/adjustments')}}
                    >
                    <img src={arrow} style={{transform:'scale(0.7)',marginRight:'5px'}}/>
                    <p style={{fontWeight:'600',color:'var(--clr-accent)'}}>Back</p>
                </div>
                <div className="adjustment">
                    <img src={filter} />
                    <p>Filter</p>
                </div>
                <div className="adjustment">
                    <img src={download} />
                    <p style={{color:'var(--clr-accent q)'}}>Export Logs</p>
                </div>
            </div>
          <table
           style={{
            background: `${theme ? "" : "#363535"}`,
          }}
          >
                <thead style={{fontSize:'2rem'}} >
                  <tr>
                  <th style={{width:'4%',maxWidth:'8%',height:'62px',textAlign:'left'}}>S no</th>  
                  <th style={{width:'8%',maxWidth:'9%',}}>Ledger Code</th>
                  <th style={{width:'20%',maxWidth:'20%'}}>Ledger Name</th>
                  <th style={{width:'2%',maxWidth:'5%',textAlign:'center'}}>BRANCH/SEGMENT</th>
                  <th style={{width:'9%',maxWidth:'9%',height:'62px',textAlign:'center'}}>31 Mar 2021</th>  
                  <th style={{width:'10%',maxWidth:'10%'}}>Adjustments</th>
                  <th style={{width:'20%',maxWidth:'20%'}}>Email</th>
                  <th style={{width:'15%',maxWidth:'15%',textAlign:'left',paddingLeft:'3rem'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                {adjusted.map((adj,i)=>{           
                  // const str = nf.format(1234567890);       
                  console.log(adj.logs,'adj')
                  var email = adj.email 
                  var sortedKeys = Object.keys(adj.logs).sort();
                  console.log(sortedKeys)
                  var first = adj.logs[sortedKeys[0]];
                  console.log(first.length,'length')
                  return first.map((val,ix)=>{
                    console.log(val,ix,'individual rows')
                    if(ix === 0){
                      return(

                        <tr   style={{backgroundColor:'white'}} key={ix}>
                          <td style={{height:'45px',textAlign:'center'}} rowSpan= {first.length}>{i + 1}</td>  
                          <td style={{height:'45px',textAlign:'center'}}>{val.ledger_code}</td>  
                          <td style={{height:'45px',textAlign:'left',paddingLeft:'10px'}}>{val.ledger_name}</td>  
                          <td style={{height:'45px',textAlign:'center'}}>{val.branch}</td>  
                          <td style={{height:'45px',textAlign:'right',paddingRight:'10px'}}>{ nf.format(val.cy)}</td>  
                          <td style={{height:'45px',textAlign:'right',paddingRight:'10px'}}>{ nf.format(val.adjusted_amount)}</td>  
                          <td style={{textAlign:'center'}} rowSpan= {first.length}>{email}</td> 
                          <td style={{textAlign:'left',}}  rowSpan= {first.length}>
                              <div style={{display:'flex',justifyContent:'space-evenly',paddingLeft:'10px',alignItems:'center'}}>
                                <div style={{cursor:'pointer'}} onClick={()=> {handleRestore(ix,val)}}><p style={{fontWeight:'600',color:'#03565A',fontSize:'1.1rem',margin:'0'}}>Restore</p></div>
                              </div>
                          </td>
                        </tr>
                    )

                    }
                    else{
                      return(
                        <tr   style={{backgroundColor:'white'}} key={ix}>
                        <td style={{height:'45px',textAlign:'center'}}>{val.ledger_code}</td>  
                        <td style={{height:'45px',textAlign:'left',paddingLeft:'10px'}}>{val.ledger_name}</td>  
                        <td style={{height:'45px',textAlign:'center'}}>{val.branch}</td>  
                        <td style={{height:'45px',textAlign:'right',paddingRight:'10px',}}>{ nf.format(val.cy)}</td>  
                        <td style={{height:'45px',textAlign:'right',paddingRight:'10px'}}>{ nf.format(val.adjusted_amount)}</td>  
                    </tr>
                      )
                    }
                  })
                })}
                </tbody>
          </table>            
        </div>
    )
}

export default AdjustmentsDeleted
