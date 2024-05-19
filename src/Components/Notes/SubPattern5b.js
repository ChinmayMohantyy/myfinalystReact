import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import plus from '../../assets/plus.svg'



const input={
    height:'100%',
    width:'100%',
    border:'none',
    textAlign:'center',
    background:'transparent'
  }
  


const SubPattern5 = (props) => {
    const [total, setTotal] = useState([])
    const [sum, setSum] = useState([])
    const [note, setNote] = useState([])
    const [nid, setNld] = useState('')
    const [math, setMath] = useState('')
    console.log(props.data,'dat hre')
    console.log(props.ix,'dat hre')
    console.log(total,'dat hremate mate')
    console.log(sum,'sum here bruh dat hremate mate')
    console.log(note,'note dat hremate mate')

    const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
    // const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
    const project_id = localStorage.getItem('project_id');

    useEffect(() => {
        const auth = localStorage.getItem('auth_token')    
        let headers = {
            'x-auth-token' : auth,
        }
        const fd = new FormData()
        fd.append('notes_no',props.note);
        axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
        .then(res =>{
            // setLoading(false)
            console.log(res,'response  npotes notes resonse response response')
            setNld(res.data.notes.nlid)
            setNote(res.data.notes.data[props.ix])

        }).catch(err=>{
            // setLoading(false)
        })
        
    }, [props.data])
    
    // useEffect(() => {
        
    //     console.log(note,'het thet')
        
    //     props.data && props.data.sub_grp.map((grp,i) =>{
            
    //     })
    // }, [note])
    // props.data.sub_grp.reduce()
   
    const cy =0
    const py = 0
    // console.log(props.data.sub_grp,'hey this is new')
    if(props.data){
        const cy = props.data.sub_grp.reduce((totalcy, i) => totalcy +  Number(i.sub_grp.cy_amt), 0);
        const py = props.data.sub_grp.reduce((totalpy, i) => totalpy +  Number(i.sub_grp.py_amt), 0);
    }
    // const cy = note.sub_grp.reduce((totalcy, i) => totalcy +  Number(i.sub_grp.cy_amt), 0);
    // const py = note.sub_grp.reduce((totalpy, i) => totalpy +  Number(i.sub_grp.py_amt), 0);


    function handleChange(e,grp,ip,dscl,field){

        var arr1 = props.data
        console.log(arr1,grp,dscl,e.target.value,field,'changes here')
        console.log(dscl,'changes here')
        console.log(ip,'changes here')
        arr1.sub_grp.map((sub,i)=>{
            console.log(sub.sid,grp.sid,'here isa answer')
            if(sub.sid === grp.sid){
                console.log(sub.sid,'here is a match my man')
                console.log(sub,'here is a match my man')
                sub.disclosures.map((dsc,ix)=>{
                    console.log(dsc,'disclosures here man')
                    console.log(field,'field field field here man')
                    console.log(dsc.did,dscl.did,'disclosures here man')
                    if(dsc.did === dscl.did || ix === ip){
                        console.log(dsc[field],e.target.value,'here')
                        dsc[field] = e.target.value
                        console.log(dsc[field],e.target.value,'after here')
                    }
                    
                })
            }
        })
        props.handleNote(arr1)
        setMath(Math.random())
    }

    function handleAdd(grp,dscl,i,field){

        var arr1 = props.data
        // console.log(arr1,grp,dscl,e,field,'changes here')

        // arr1.sub_grp.map((sub,i)=>{
        //     if(sub.sid === grp.sid){
        //         // console.log(sub.sid,'here ')
        //         sub.disclosures.map((dsc,ix)=>{
        //             if(ix === i){
        //                 console.log(dsc[field],e.target.value,'here')
        //                 dsc[field] = e.target.value
        //                 console.log(dsc[field],e.target.value,'after here')
        //             }
                    
        //         })
        //     }
        // })

        // props.handleNote(arr1)
        // setMath(Math.random())

         


    }

    function handlePlus(sub,ix){
        console.log(sub,ix)
        const object = {
            "Borrowings": "",
            "Coupon / interest rate": "",
            "Current Year": "",
            "Maturity Date": "",
            "Previous Year": "",
            "Terms of repayment": "",
        }
        const data =  props.data
        console.log(props.data,'here')
        data.sub_grp.map((grp)=>{
            if(grp.sid === sub.sid){
                console.log(sub.disclosures)
                sub.disclosures.push(object)
            }
        })
        console.log(data,'data here')
        props.handleNote(data)
        setMath(Math.random())
    }


    return (
        <>
        <div style={{padding:'1rem 2rem'}} >
            <table>
                <thead >
                  <tr style={{backgroundColor:'#A2C0C2'}}>
                  <th style={{width:'60%',height:'50px',textAlign:'left', fontSize:'1.2rem',paddingLeft:'2rem',color:'var(--clr-accent)'}}>TOTAL</th>
                  <th style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'var(--clr-accent)'}}>As at March 31, 2021</th>
                  <th style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'var(--clr-accent)'}}  >As at March 31, 2020</th>
                  </tr>
                </thead >
                <tbody>
                {props.data && props.data.notes_disclosures.map((grp,ix)=>{
                {/* {note && note.notes_disclosures.map((grp,ix)=>{ */}
                    return(
                        <tr style={{backgroundColor:'#A2C0C270'}} key={ix}>
                        <td style={{width:'60%',height:'50px',textAlign:'left',paddingLeft:'2rem', fontSize:'1.1rem',color:'black'}}>{grp.notes_disclosures}</td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'black'}} >{Math.abs(grp.cy_amt)}</td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'black'}} >{Math.abs(grp.py_amt)}</td>
                        </tr>
                    )
                })}
                <tr style={{backgroundColor:'#A2C0C270'}}>
                        <td style={{width:'60%',height:'50px',textAlign:'left',paddingLeft:'2rem', fontSize:'1.1rem',color:'black'}}>Total Borrowings</td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'black'}} >{Math.abs(cy)}
                        {/* <input type="number" 
                                  style={input} 
                                  /> */}
                        </td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'black'}} >{Math.abs(py)}
                        {/* <input type="number" 
                                  style={input}             
                                  /> */}
                        </td>
                        </tr>
                </tbody>
            </table>


        </div>
        <div style={{padding:'1rem 2rem'}}>
        {props.data && props.data.sub_grp.map((grp,ix)=>{

            console.log(grp,'grp')
            return(
                <>
                <div style={{marginBottom:'3rem'}} key={ix}>
                <table >
                     <tr style={{backgroundColor:'var(--clr-bg)'}}>
                        <th style={{backgroundColor:'var(--clr-bg)',fontWeight:'500',width:'60%',height:'50px',textAlign:'left', fontSize:'1.2rem',paddingLeft:'2rem',color:'black',border:'none'}} >{grp.sub_grp.sub_grp}</th>
                        <th style={{backgroundColor:'var(--clr-bg)',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}>{Math.abs(grp.sub_grp.cy_amt)}</th>
                        <th style={{backgroundColor:'var(--clr-bg)',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}  >{Math.abs(grp.sub_grp.py_amt)}</th>
                     </tr>
                </table>
                <table>
                <thead >
                    <tr style={{backgroundColor:'var(--clr-font-light)',border:'none'}}>
                        <th style={{width:'16.6%',fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left',height:'50px',border:'none'}}>Borrowings</th>
                        <th style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}>Coupon / interest rate</th>
                        <th style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}  >Current Year</th>
                        <th style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}  >Maturity Date</th>
                        <th style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}>Previous Year</th>
                        <th style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}  >Terms of repayment</th>
                    </tr>
                </thead >
                <tbody>

                {grp.disclosures.map((dsc,i)=>{
                    console.log(dsc,'dsc')
                    return(
                    <tr style={{border:'none'}}>
                        <td style={{width:'16.6%',fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left',height:'50px'}}>
                            {/* {dsc[`Company Name`]} */}
                            <input type="text" 
                                  value={dsc[`Borrowings`]}
                                  placeholder= 'Borrowings'  
                                  style={{ height:'100%',
                                  width:'100%',
                                  border:'none',
                                  textAlign:'left',
                                  background:'transparent',
                                  paddingTop:'0px',
                                  fontSize:'14px'
                                }} 
                                  onChange={(e)=>{handleChange(e,grp,i,dsc,'Borrowings')}}
                                  onBlur={()=>{
                                    // handleLeave()
                                    // console.log('youre out')
                                }}
                                />
                        </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Equity Shares - Current Year`]} */}
                            <input type="number" 
                                  value={dsc[`Coupon / interest rate`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Coupon / interest rate')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                  />
                        </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}  >
                            {/* {dsc[`Equity Shares - Previous Year`]} */}
                            <input type="number" 
                                  value={dsc[`Current Year`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Current Year')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                    />
                        </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Amount - Current Year`]} */}
                            <input type="number" 
                                  value={dsc[`Maturity Date`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Maturity Date')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                    />
                        </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Amount - Current Year`]} */}
                            <input type="number" 
                                  value={dsc[`Previous Year`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Previous Year')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                    />
                        </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Amount - Previous Year`]} */}
                            <input type="number" 
                                  value={dsc[`Terms of repayment`]}  
                                  style={input} 
                                  onChange={(e)=>{handleChange(e,grp,i,dsc,'Terms of repayment')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                  />
                        </td>
                    </tr>
)
})}
                    <tr style={{border:'none'}}>
                        <td style={{width:'16.6%',fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left',height:'50px'}}>
                            <img src={plus} onClick={(e)=>{handlePlus(grp,ix)}} />
                            </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}> </td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}} ></td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}></td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}  ></td>
                        <td style={{width:'16.6%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}  ></td>
                    </tr>
                </tbody>
                </table>
        {/* { !((ix+1) % 3 ) && sum[((ix+1)/3) -1] && <div style={{marginTop:'3rem'}}>
                <table >
                    <tr style={{backgroundColor:'#A2C0C270'}}>
                    <th style={{backgroundColor:'#A2C0C270',fontWeight:'500',width:'60%',height:'50px',textAlign:'left', fontSize:'1.2rem',paddingLeft:'2rem',color:'black',border:'none'}} >{sum[((ix+1)/3)-1].grp}</th>
                    <th style={{backgroundColor:'#A2C0C270',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}>{sum[((ix+1)/3)-1].cy_amt}</th>
                    <th style={{backgroundColor:'#A2C0C270',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}  >{sum[((ix+1)/3)-1].py_amt}</th>
                    </tr>
                </table>
            </div>} */}
        </div>
        </>

        )

        })}
        </div>

        </>
    )
}

export default SubPattern5
