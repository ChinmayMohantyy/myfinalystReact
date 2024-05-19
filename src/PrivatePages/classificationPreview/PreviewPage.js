import React,{useState,useEffect} from 'react'
import {useTable} from 'react-table'
import {useDispatch,useSelector} from 'react-redux'
import {Form} from 'react-bootstrap'
import axios from 'axios'
import {motion} from 'framer-motion'

import { useHistory } from "react-router-dom";

import {socket} from '../../services/socket/socket'
import * as actionTypes from '../../redux/actionTypes'

import arrowLeftGreen from '../../assets/arrowLeftGreen.svg'
import {Submit} from '../../Components/Button'
import {groupingColumn} from './groupingColumn'
import {Navbar} from '../../Components/Navbar'
import {groupings} from '../../Components/BalanceSheet/mockGrouping'
import TABLE_MOCK from '../../Components/Table/TABLE_MOCK.json'
import './preview.css'

const board ={
    padding:'2rem 4rem',
    minWidth:'1045px',
    backgroundColor:'#E5E5E5',
    minHeight:'calc(100vh - 80px)',

}

const groupingScreen = {
    // backgroundColor:'white',
    width:'100%',
    height:'80vh',
    paddingRight:'15px',
    // overflowY:'scroll',
    borderRadius:'10px'

}

const groupingNav = {
    backgroundColor:'white',
    width:'100%',
    height:'80px',
    borderTopRightRadius:'10px',
    display:'flex',
    justifyContent:'space-between',
    padding:'0 2rem',
    alignItems:'center',
    position:'sticky',
    top:'0'

}
const groupingTable = {
    backgroundColor:'white',
    width:'100%',
    minHeight:'65vh',
    maxHeight:'65vh',
    overflowY:'scroll'

}

const backNav ={
    fontSize:'1.2rem',
    fontWeight:'600',
    color:'#03565A',
    cursor:'pointer'
}

const PreviewPage = () => {
    let history = useHistory()
    const dispatch = useDispatch();
    const fSData = useSelector(initialState => initialState.reducer.currentClassification)
    console.log(fSData,'ckick klack')
    const [fs, setFs] = useState([])
    const [edit, setEdit] = useState(false)
    const [random, setRandom] = useState('')
    console.log(random)
    const index = fSData.length

    console.log(fs,'data here')

    const auth = localStorage.getItem('auth_token')
    const project_id = localStorage.getItem('project_id');
    const TB_ID = useSelector(initialState => initialState.reducer.tb_id) 
    const Name = useSelector(initialState => initialState.reducer.currentClassificationName) 
    const py = fSData.reduce((totalPy, i) => totalPy +  i.py, 0);
    const cy = fSData.reduce((totalCy, i) => totalCy +  i.cy, 0);

    useEffect(() => {
        setFs(fSData)

    }, [fSData])

    let headers = {
        'x-auth-token' : auth,
        // 'Content-Type' : 'application/json'
    }
    function HandleSave(){

        axios.get(`/api/v1/fs-classification/get-fs/${project_id}/${TB_ID}`,{headers})
        .then(response => {
            const dat = response.data.classification_list[Name]
            console.log(response.data.classification_list[Name],'response response')
            // setFs(response.data.classification_list[Name])
            dispatch({type: actionTypes.SET_CLASSIFICATION,payload:dat})                    
          })
          .catch(error =>{
              console.log(error.response,'error')
          })
        setEdit(!edit)

    }

    

    function handleChange(e,i,row,field){
        
        const auth = localStorage.getItem('auth_token')
        const project_id = localStorage.getItem('project_id');        
        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'
        }
        // let fs = 'Financial Assets'      
        const TB_ID = row.original.tb_id
        const content ={}
        console.log(row.original.lid,'5454545455')
        if(field === 'fs_grp'){


            let index = fs.findIndex(x => x.lid === row.original.lid)
            console.log('index',index)
            let arr = fs
            arr[index].fs_grp = e.target.value
            arr[index].note_grp = ''
            arr[index].sub_grp = ''
            console.log(arr,'ar here')
            setFs(arr)
            setRandom(Math.random())
            // if(row.original.fs_grp === e.target.value ){
            //     return
            // }
            content.fs_grp = e.target.value
            content.note_grp = ''
            content.sub_grp = ''
        }
        if(field === 'note_grp'){
            // if(row.original.note_grp === e.target.value ){
            //     return
            // }
            let index = fs.findIndex(x => x.lid === row.original.lid)
            console.log('index',index)
            let arr = fs
            arr[index].note_grp = e.target.value
            arr[index].sub_grp = ''
            console.log(arr,'ar here')
            setFs(arr)
            setRandom(Math.random())


            content.fs_grp = row.original.fs_grp
            content.note_grp = e.target.value
            content.sub_grp = ''
            groupings.grp.map((opt) =>{
                if(row.original.fs_grp === opt.fs_grp){
                    opt.notes_grp.map((notes,i)=>{
                        if(notes.notes_grp === e.target.value){
                            content.note_no = notes.notes_no
                            
                        }

                    })


                }

            })
            

        }

        if(field === 'sub_grp'){
            let index = fs.findIndex(x => x.lid === row.original.lid)
            console.log('index',index)
            let arr = fs
            // arr[index].note_grp = e.target.value
            arr[index].sub_grp = e.target.value
            console.log(arr,'ar here')
            setFs(arr)
            setRandom(Math.random())

            content.fs_grp = row.original.fs_grp
            content.note_grp = row.original.note_grp
            content.sub_grp = e.target.value
        }   
        socket.emit("auto-save", {
            project_id: localStorage.getItem('project_id'),
            tb_id: row.original.tb_id,
            lid: row.original.lid,
            contents: content, 
          });
        content.lid = row.original.lid
        // dispatch({type: actionTypes.SET_EDITGROUPING,payload:content})
          // axios.get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`,{headers})
          // .then(response => {
              
              //     axios.get(`/api/v1/fs-classification/get-fs/${project_id}/${TB_ID}`,{headers})
        //     .then(response => {
        //         const dat = response.data.classification_list[Name]
        //         console.log(response.data.classification_list[Name],'response response')
        //         setFs(response.data.classification_list[Name])
        //         dispatch({type: actionTypes.SET_CLASSIFICATION,payload:dat})                    
        //       })
        //       .catch(error =>{
        //           console.log(error.response,'error')
        //       })
        //     dispatch({type: actionTypes.SET_TABLE_DATA,payload:response.data})              
        // })
        // const fSData = useSelector(state => state.currentClassification)
    }
    // console.log('------------==-=-=-=-=-=-=-=--=-=-=-=---------------------------')
    // socket.on("on-auto-save", (data) => {
    //     //To trigger in the Fetch API (Conventional Model)
    //     console.log(data.dataUpdated.contents,'data here --------------------------------- ')
    //     dispatch({type: actionTypes.SET_EDITGROUPING,payload:data.dataUpdated})        

    //   });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }= useTable({
        columns:groupingColumn,
        // data: TABLE_MOCK
        data: fs
        },)

    return (
        <>
        <Navbar text='Classification Preview' />
        <motion.div style={board}
        // initial={{scale:1.1}}
        // animate={{scale:1}}
        // transition={{ duration: 0.5 }}
        // initial={{y:'-5vh'}}
        // animate={{y:'-1vh'}}
        >
            <div style={groupingScreen} >
                <div style={groupingNav}>
                    <div style={backNav} onClick={() => { history.push('/preview') }}>
                        <img src={arrowLeftGreen} style={{marginRight:'10px'}}/>
                        {Name}
                    </div>
                    <div style={{width:'12rem'}} onClick={() =>{HandleSave()}}>
                    {fSData.length === 0 ?
                    <Submit disable  value={edit? 'Save Changes' :'Edit Changes'} sm/> 
                    : 
                    <Submit   value={edit? 'Save Changes' :'Edit Changes'} sm/>}
                    </div>

                </div>
                {console.log(fSData.length,'value calue')}
                <div style={groupingTable} id='groupingScreen' className='classificationTable'>
                {fSData.length === 0 ? 
                // "no"
                <div style={{display:'flex',justifyContent:'center',minHeight:'60vh',alignItems:'center'}}>
                    <h1 style={{fontWeight:'500',fontSize:'20px',color:'lightgray'}}>No Ledgers Mapped to current Classification: {Name}</h1>
                </div> 
                : 
                <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                           headerGroup.headers.map(column => (
                               <th {...column.getHeaderProps()}>
                                   {column.render('Header')}
                               </th>
                               )) 
                        }
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row,ind) => {
                        prepareRow(row)
                        // setIndex(ind)                        
                        // const indexof = ind
                        return (
                            
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell,i) => {

                                if(cell.column.Header == 'ADJUSTED AMT'){
                                    if(cell.row.original.adjusted_amount === 0){

                                        return <td style={{textAlign:'center',padding:'10px'}}>-</td>
                                    }
                                    console.log(cell.row.original.isAdjusted,'cellcellcellcellcellcell')

                                    // return <td style={{textAlign:'right',padding:'10px'}}>nope</td>
                                    return <td style={{textAlign:'right',padding:'10px'}}>{cell.row.original.adjusted_amount.toLocaleString('en-IN')}</td>


                                }
                                if(cell.column.Header == 'CURRENT YEAR'){
                                    // console.log(cell.getCellProps(),'cellcellcellcellcellcell')

                                    return <td {...cell.getCellProps()} style={{textAlign:'right',paddingRight:'10px'}}>{cell.row.original.cy.toLocaleString('en-IN')}</td>


                                }
                                if(cell.column.Header == 'PREVIOUS YEAR'){
                                    // console.log(cell.getCellProps(),'cellcellcellcellcellcell')

                                    // return <td {...cell.getCellProps()} style={{textAlign:'right',paddingRight:'10px'}}>{nf.format(cell.row.original.py)}</td>
                                    return <td {...cell.getCellProps()} style={{textAlign:'right',paddingRight:'10px'}}>{cell.row.original.py.toLocaleString('en-IN')}</td>


                                }

                                if(cell.column.Header == 'FINAL AMT'){
                                    if(cell.row.original.isAdjusted){

                                        return <td style={{textAlign:'right',padding:'10px'}}>{(cell.row.original.cy - cell.row.original.adjusted_amount).toLocaleString('en-IN') }</td>
                                    }
                                    console.log(cell.row.original.isAdjusted,'cellcellcellcellcellcell')

                                    return <td style={{textAlign:'right',padding:'10px'}}>{cell.row.original.cy.toLocaleString('en-IN')}</td>


                                }
                                if(cell.column.Header == 'FS GROUPING'){
                                    return <td {...cell.getCellProps({
                                        style: {
                                            minWidth: cell.column.minWidth,
                                            width: cell.column.width,
                                        },
                                        })} className='dropMapping' >
                                            {edit?
                                            <Form.Control size="lg"  as='select' value={row.fs_grp}  onChange={(e) => handleChange(e,ind,row,'fs_grp')}>
                                            <option key = 'blankChoice' hidden value>{row.original.fs_grp ?  row.original.fs_grp : 'Select a level'}</option> 
                                            { groupings.grp.map((opt,i)=>{
                                                // console.log(Name,'inside ledger code')
                                                // console.log(Name.LedgerCode,'inledger code')
                                                return(
                                                <option key={i}>{opt.fs_grp}</option>
                                                )
                                            })}
                                            </Form.Control>
                                          
                                          : cell.render('Cell') }
                                        </td>
                                    }
                                    if(cell.column.Header == 'NOTES GROUPING'){
                                        return <td {...cell.getCellProps({
                                            style: {
                                              minWidth: cell.column.minWidth,
                                              width: cell.column.width,
                                            },
                                          })} className='dropMapping'> 
                                          {edit?
                                            <Form.Control size="lg"  as='select' value={row.note_grp}  onChange={(e) => handleChange(e, ind, row,'note_grp')} >
                                            <option key = 'blankChoice' hidden value>{row.original.note_grp ?  row.original.note_grp  : 'Select a level'}</option>
                                            { groupings.grp.map((opt)=>{
                                                // console.log(row.original.fs_grp, opt.fs_grp, 'current row - current row option')
                                                if(row.original.fs_grp === opt.fs_grp){
                                                    // console.log(opt.notes_grp,'notessssssssssssssssssssssssssssssss')
                                                    // return(
                                                    // <option>{opt.fs_grp}</option>                                                       
                                                    //     )
                                                    // console.log('matched values',opt.notes_grp)
                                                    return opt.notes_grp.map((notes,i)=>{
                                                        // console.log(notes.notes_grp,'mapping notesgrouping')
                                                        return (<option key={i}>{notes.notes_grp}</option>)
                                                        // return (<option>hey</option>)
                                                        
                                                    })
                                                }
                                            })}
                                            </Form.Control> 
                                          
                                          : cell.render('Cell') }

    
                                            </td>
                                        }
                                    if(cell.column.Header == 'SUB GROUPING'){
                                            return <td {...cell.getCellProps({
                                                style: {
                                                  minWidth: cell.column.minWidth,
                                                  width: cell.column.width,
                                                },
                                              })} className='dropMapping'>
                                                  {edit?
                                           <Form.Control size="lg"  as='select' value={row.sub_grp}  onChange={(e) => handleChange(e,ind, row,'sub_grp')}>
                                           <option key = 'blankChoice' hidden value>{row.original.sub_grp ?  row.original.sub_grp: 'Select a level'}</option>
                                           { groupings.grp.map((opt)=>{
                                   // console.log(row.original.fs_grp, opt.fs_grp, 'current row - current row option')
                                           if(row.original.fs_grp === opt.fs_grp){
                                            return opt.notes_grp.map((notes)=>{
                                                // console.log(notes.notes_grp,'mapping notesgrouping')
                                                if(notes.notes_grp === row.original.note_grp){
                                                    return notes.sub_grp.map((sub,ix) =>{
                                                        // console.log(row.original.note_grp,'row notes group')
                                                        // console.log(notes.notes_grp,'something')
                                                        // console.log(sub.sub_grp,'row notes group')
                                                        // return(<option key={ix}>{sub.sub_grp}</option>)
                                                        return(<option key={ix}>{sub.sub_grp}</option>)
                                                    })

                                                }
                                                

                                                // return (<option>{notes.notes_grp}</option>)
                                                // // return (<option>hey</option>)
                                                
                                            }
                                               )
                                           }})}
                                           </Form.Control>
                                          
                                          : cell.render('Cell') }
                                                        
    
                                                </td>
                                        }
                                 
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            </tr>
                        )
                        })}
                        
                </tbody>
                
                </table>}
                </div> 
                <div style={{height:'2.5rem', backgroundColor:'beige',padding:'5px', paddingLeft:'2rem' , display:'flex'}}>
                    <div >
                        <p style={{marginTop:'5px', fontSize:'15px'}}>Total Assets<span style={{fontSize:'13px', marginLeft:'5px',color:'grey'}}>({index }  Items)</span></p>
                    </div>
                    <div >
                        <p style={{marginTop:'5px', fontSize:'15px',marginLeft:'150px',color:'grey'}}>{cy.toLocaleString('en-IN')}</p>
                    </div>
                    <div >
                        <p style={{marginTop:'5px', fontSize:'15px',marginLeft:'250px',color:'grey'}}>{py.toLocaleString('en-IN')}</p>
                    </div>
                    <div style={{marginLeft:'auto',marginRight:'1rem'}} >
                        <p style={{marginTop:'5px', fontSize:'15px',color:'grey'}}>*all amount in INR Lakhs</p>
                    </div>
                </div> 
            </div>


        </motion.div> 
            
        </>
    )
}

export default PreviewPage
