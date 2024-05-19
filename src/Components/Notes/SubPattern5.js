import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import plus from '../../assets/plus.svg'
import {motion} from 'framer-motion'
import Note1 from './Note1'


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
    const [noteOpen, setNoteOpen] = useState(false)

    console.log(props.data,'dat hre')
    console.log(props.ix,'dat hre')
    console.log(total,'dat hremate mate')
    console.log(sum,'sum here bruh dat hremate mate')
    console.log(math,'note dat hremate mate')

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
        // setLoading(true)
        axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
        .then(res =>{
            // setLoading(false)
            console.log(res,'response  npotes notes resonse response response')
            setNld(res.data.notes.nlid)
            setNote(res.data.notes.data[props.ix])
        }).catch(err=>{
            // setLoading(false)
        })
        
    }, [])
    
    useEffect(() => {

        console.log(note,'het thet')        
        props.data && props.data.sub_grp.map((grp,i) =>{
            console.log(grp.sub_grp.sub_grp.slice(-8))
            if(grp.sub_grp.sub_grp.slice(-7) === ' quoted' || grp.sub_grp.sub_grp.slice(-7) === ' Quoted'){
                console.log(grp.sub_grp.sub_grp)
                console.log(total.some(xts => xts.grp === "quoted"))

                if(!(total.some(xts => xts.grp === "Aggregate Amount of Quoted Investments" || xts.grp === "Aggregate Amount of Quoted Investments"))){
                    const  New = {grp:'Aggregate Amount of Quoted Investments',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = total
                    arr.push(New)
                    setTotal(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = total.findIndex(i => i.grp === "Aggregate Amount of Quoted Investments");
                   console.log(inx)
                   const arr = total
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setTotal(arr)
                   setMath(Math.random())
                }
            }
 
            if(grp.sub_grp.sub_grp.slice(-8) === 'Unquoted' ||grp.sub_grp.sub_grp.slice(-8) === 'unquoted' ||  grp.sub_grp.sub_grp.includes('Unquoted')){
                console.log(grp.sub_grp.sub_grp)
                console.log(total.some(xts => xts.grp === "Unquoted"))

                if(!(total.some(xts => xts.grp === "Aggregate Amount of Unquoted Investments" || xts.grp === "Aggregate Amount of Unquoted Investments"))){
                    const  New = {grp:'Aggregate Amount of Unquoted Investments',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = total
                    arr.push(New)
                    setTotal(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = total.findIndex(i => i.grp === "Aggregate Amount of Unquoted Investments");
                   console.log(inx)
                   const arr = total
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setTotal(arr)
                   setMath(Math.random())
                }
            }

            if(grp.sub_grp.sub_grp.slice(-10) === 'impairment' ||grp.sub_grp.sub_grp.slice(-10) === 'Impairment' ||  grp.sub_grp.sub_grp.includes('impairment')){
                console.log(grp.sub_grp.sub_grp)
                console.log(total.some(xts => xts.grp === "impairment"))

                if(!(total.some(xts => xts.grp === "Aggregate Amount of  impairment in the value of investments" || xts.grp === "Aggregate Amount of  impairment in the value of investments"))){
                    const  New = {grp:'Aggregate Amount of  impairment in the value of investments',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = total
                    arr.push(New)
                    setTotal(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = total.findIndex(i => i.grp === "Aggregate Amount of  impairment in the value of investments");
                   console.log(inx)
                   const arr = total
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setTotal(arr)
                   setMath(Math.random())
                }
            }

            if(grp.sub_grp.sub_grp.includes('equity') || grp.sub_grp.sub_grp.includes('Equity')){
                console.log(grp.sub_grp.sub_grp)

                if(!(sum.some(xts => xts.grp === "Total(Equity Instruments)"))){
                    const  New = {grp:'Total(Equity Instruments)',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = sum
                    arr.push(New)
                    setSum(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = sum.findIndex(i => i.grp === "Total(Equity Instruments)");
                   console.log(inx)
                   const arr = sum
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setSum(arr)
                   setMath(Math.random())
                }
            }

            if(grp.sub_grp.sub_grp.includes('preference shares')){
                console.log(grp.sub_grp.sub_grp)

                if(!(sum.some(xts => xts.grp === "Total(preference shares)"))){
                    const  New = {grp:'Total(preference shares)',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = sum
                    arr.push(New)
                    setSum(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = sum.findIndex(i => i.grp === "Total(preference shares)");
                   console.log(inx)
                   const arr = sum
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setSum(arr)
                   setMath(Math.random())
                }
            }

            if(grp.sub_grp.sub_grp.includes('government securities')){
                console.log(grp.sub_grp.sub_grp)

                if(!(sum.some(xts => xts.grp === "Total(government securities)"))){
                    const  New = {grp:'Total(government securities)',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = sum
                    arr.push(New)
                    setSum(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = sum.findIndex(i => i.grp === "Total(government securities)");
                   console.log(inx)
                   const arr = sum
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setSum(arr)
                   setMath(Math.random())
                }
            }

            if(grp.sub_grp.sub_grp.includes('debentures and bonds')){
                console.log(grp.sub_grp.sub_grp)

                if(!(sum.some(xts => xts.grp === "Total(debentures and bonds)"))){
                    const  New = {grp:'Total(debentures and bonds)',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = sum
                    arr.push(New)
                    setSum(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = sum.findIndex(i => i.grp === "Total(debentures and bonds)");
                   console.log(inx)
                   const arr = sum
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setSum(arr)
                   setMath(Math.random())
                }
            }

            if(grp.sub_grp.sub_grp.includes('mutual funds')){
                console.log(grp.sub_grp.sub_grp)

                if(!(sum.some(xts => xts.grp === "Total(mutual funds)"))){
                    const  New = {grp:'Total(mutual funds)',cy_amt:grp.sub_grp.cy_amt,py_amt:grp.sub_grp.py_amt}
                    const arr = sum
                    arr.push(New)
                    setSum(arr)
                    setMath(Math.random())
                }
                else{
                   var inx = sum.findIndex(i => i.grp === "Total(mutual funds)");
                   console.log(inx)
                   const arr = sum
                   arr[inx].cy_amt += grp.sub_grp.cy_amt
                   setSum(arr)
                   setMath(Math.random())
                }
            }
        })
    }, [note])

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
    
    function handlePlus(sub,ix){
        console.log(sub,ix)
        const object = {
            "Company Name": "",
            "Equity Shares - Current Year": "",
            "Equity Shares - Previous Year": "",
            "Amount - Current Year": "",
            "Amount - Previous Year": ""
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
                {total.map((grp,ix)=>{
                    return(
                        <tr style={{backgroundColor:'#A2C0C270'}} key={ix}>
                        <td style={{width:'60%',height:'50px',textAlign:'left',paddingLeft:'2rem', fontSize:'1.1rem',color:'black'}}>{grp.grp}</td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'black'}} >{Math.abs(grp.cy_amt)}</td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'2rem',color:'black'}} >{Math.abs(grp.py_amt)}</td>
                        </tr>
                    )
                })}
                <tr style={{backgroundColor:'#A2C0C270'}}>
                        <td style={{width:'60%',height:'50px',textAlign:'left',paddingLeft:'2rem', fontSize:'1.1rem',color:'black'}}>Aggregate Market value fo Quoted Instruments</td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'3rem',color:'black'}} >
                        <input type="number" 
                                  style={input} 
                                  />
                        </td>
                        <td style={{width:'20%', fontSize:'0.9rem',paddingLeft:'3rem',color:'black'}} >
                        <input type="number" 
                                  style={input}             
                                  />
                            
                        </td>
                        </tr>
                </tbody>
            </table>


        </div>
        <div style={{padding:'1rem 2rem'}}>
        {props.data && props.data.sub_grp.map((grp,ix)=>{

            console.log(grp)
            return(
                <>
                <div style={{marginBottom:'3rem'}} key={ix}>
                <table >
                     <tr style={{backgroundColor:'var(--clr-bg)'}}>
                        <th style={{backgroundColor:'var(--clr-bg)',fontWeight:'500',width:'60%',height:'50px',textAlign:'left', fontSize:'1.2rem',paddingLeft:'2rem',color:'black',border:'none'}} >{grp.sub_grp.sub_grp}</th>
                        <th style={{backgroundColor:'var(--clr-bg)',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}>{grp.sub_grp.cy_amt}</th>
                        <th style={{backgroundColor:'var(--clr-bg)',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}  >{grp.sub_grp.py_amt}</th>
                     </tr>
                </table>
                <table>
                <thead >
                    <tr style={{backgroundColor:'var(--clr-font-light)',border:'none'}}>
                        <th style={{width:'20%',fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left',height:'50px',border:'none'}}>Company</th>
                        <th style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}>Equity shares of Current year</th>
                        <th style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}  >Equity shares of Previous year</th>
                        <th style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}>Amount of Current year</th>
                        <th style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left',border:'none'}}  >Amount of Previous year</th>
                    </tr>
                </thead >
                <tbody>

                {grp.disclosures.map((dsc,i)=>{ 
                    console.log(dsc,'dsc')
                    return(
                    <tr style={{border:'none'}}>
                        <td style={{width:'20%',fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left',height:'50px'}}>
                            {/* {dsc[`Company Name`]} */}
                            <input type="text" 
                                  value={dsc[`Company Name`]}
                                  placeholder= 'Company Name'  
                                  style={{ height:'100%',
                                  width:'100%',
                                  border:'none',
                                  textAlign:'left',
                                  background:'transparent',
                                  padding:'0',
                                  fontSize:'14px'
                                }} 
                                  onChange={(e)=>{handleChange(e,grp,i,dsc,'Company Name')}}
                                  onBlur={()=>{
                                }}
                                />
                        </td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Equity Shares - Current Year`]} */}
                            <input type="number" 
                                  value={dsc[`Equity Shares - Current Year`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Equity Shares - Current Year')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                  />
                        </td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}  >
                            {/* {dsc[`Equity Shares - Previous Year`]} */}
                            <input type="number" 
                                  value={dsc[`Equity Shares - Previous Year`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Equity Shares - Previous Year')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                    />
                        </td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Amount - Current Year`]} */}
                            <input type="number" 
                                  value={dsc[`Amount - Current Year`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Amount - Current Year')}}
                                  onBlur={()=>{
                                      // handleLeave()
                                      // console.log('youre out')
                                    }}
                                    />
                        </td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left'}}>
                            {/* {dsc[`Amount - Previous Year`]} */}
                            <input type="number" 
                                  value={dsc[`Amount - Previous Year`]}  
                                  style={input} 
                                    onChange={(e)=>{handleChange(e,grp,i,dsc,'Amount - Previous Year')}}
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
                        <td style={{width:'20%',fontSize:'0.8rem',paddingLeft:'2rem',color:'black',textAlign:'left',height:'50px'}}><img src={plus} onClick={(e)=>{handlePlus(grp,ix)}}/></td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}> </td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}} ></td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}></td>
                        <td style={{width:'20%', fontSize:'0.8rem',paddingLeft:'1rem',color:'black',textAlign:'left'}}  ></td>
                    </tr>
                </tbody>
                </table>
        { !((ix+1) % 3 ) && sum[((ix+1)/3) -1] && <div style={{marginTop:'3rem'}}>
                <table >
                    <tr style={{backgroundColor:'#A2C0C270'}}>
                    <th style={{backgroundColor:'#A2C0C270',fontWeight:'500',width:'60%',height:'50px',textAlign:'left', fontSize:'1.2rem',paddingLeft:'2rem',color:'black',border:'none'}} >{sum[((ix+1)/3)-1].grp}</th>
                    <th style={{backgroundColor:'#A2C0C270',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}>{sum[((ix+1)/3)-1].cy_amt}</th>
                    <th style={{backgroundColor:'#A2C0C270',width:'20%',fontWeight:'500',textAlign:'center', fontSize:'0.9rem',paddingLeft:'2rem',color:'black',border:'none'}}  >{sum[((ix+1)/3)-1].py_amt}</th>
                    </tr>
                </table>
            </div>}
        </div>
        </>

        )

        })}
        </div>
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

        </>
    )
}

export default SubPattern5
