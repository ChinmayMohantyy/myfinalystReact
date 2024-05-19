import React,{useState,useEffect} from 'react'
import {useTable,useRowSelect} from 'react-table'
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import {motion} from 'framer-motion'


import * as actionTypes from '../../redux/actionTypes'
import TABLE_MOCK from '../Table/TABLE_MOCK.json'
import {Submit} from '../Button'
import { deletedColumn } from '../deletedItems/deletedColumn'
import {Checkbox} from '../Table/Checkbox'
import './deletedTable.css'



const screen= {
    width:'100%',
    height:'100%',
    position:'fixed',
    zIndex:'999',
    backgroundColor:'#00000036',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden',
   
}
const container= {
    minHeight:'65vh',
    borderRadius:'10px',
    maxHeight:'70vh',
    // overflowY:'scroll',
    minWidth:'560px',
    padding:'0',    
    zIndex:'15',
    backgroundColor:'white'
}

const header ={

    display:'flex',
    padding:'1rem 2rem 1rem 2rem',
    justifyContent:'space-between',
    backgroundColor:'#F1F2F5',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    position:'sticky',
    top:'0'
    
    
    // borderRadius:'10px',


}

const buttonDiv = {
    display:'flex',
    alignItems:'center'

}
const button = {
    marginLeft:'auto'

}

const para ={
    marginTop:'0px',
    fontWeight:'400',
    fontSize:'1rem',
    color:'var(--clr-font-mid)'
}

// const tableContainer ={

// }




const DeletedFile = (props) => {
    const dispatch = useDispatch();
    const tb_id = useSelector(state => state.reducer.tb_id)
    const [deletedRow, setDeletedRow] = useState([])
    const [change, setChange] = useState(0)
    const [delRows, setDelRows] = useState([])
    const TB_ID = useSelector(initialState => initialState.reducer.tb_id) 

    
    console.log(TABLE_MOCK,'rows rows rows')
    console.log(delRows,'rows rows rows ssssss')
    console.log(deletedRow,'rows rows rows 4454545454545')
    console.log(change,'jdhnskjfljdfhl')
    
    useEffect(()=>{
        const auth = localStorage.getItem('auth_token')
        const project_id = localStorage.getItem('project_id');
        
        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'

        }

        axios.get(`api/v1/conventional-mode/fetch-deleted-items/${project_id}/${tb_id}`,{headers})
        .then(response => {
            console.log(response.data.deleted_items,'response---------------------------------')
            //   dispatch(setCartAdded(response.data.product))
            setDeletedRow(response.data.deleted_items)        
          })
          .catch(error =>{
              console.log(error.response,'error')
            }
            )

        }, [change])
        
        useEffect(() => {
            setDelRows([])
            deletedRow.map((row) => {
                // let dataDel = row.item
                console.log(row,'ssssssssssssss')
                setDelRows(prevArray => [...prevArray, row.item])
                
                        } )
         
        }, [deletedRow, change])

    function handleRestore(row){
       
        const auth = localStorage.getItem('auth_token')
        const project_id = localStorage.getItem('project_id'); 

        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'

        }

        axios.get(`api/v1/conventional-mode/recover-line-item/${project_id}/${row.tb_id}/${row.lid}`,{headers})
        .then(response => {
                console.log(response.data,'response --------------------]]]]]]------------------------')
                dispatch({type: actionTypes.SET_RESTORE_ROW,payload:row})
                // setChange(Math.random())
                axios.get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`,{headers})
                .then(response => {
                    // console.log(response.data.data.line_items,'dat dat dat datd ddat dat dat dat dat dta dat d') 
                    // setData(response.data.data.line_items)
                    dispatch({type: actionTypes.SET_TABLE_DATA,payload:response.data.data.line_items})
                    setChange(Math.random() )
                    props.setUpdateRows(true)
                })
            })
            .catch(error =>{
                console.log(error.response,'error')
            }
            )
    }

    function handleEmpty(){
          
        const auth = localStorage.getItem('auth_token')
        const project_id = localStorage.getItem('project_id'); 

        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'

        }

        axios.get(`api/v1/conventional-mode/delete-trash/${project_id}/${tb_id}`,{headers})
        .then(response => {
                console.log(response.data,'response --------------------]]]]]]------------------------')
                axios.get(`api/v1/conventional-mode/fetch-deleted-items/${project_id}/${tb_id}`,{headers})
                .then(response => {
                    // console.log(response.data.data.line_items,'dat dat dat datd ddat dat dat dat dat dta dat d') 
                    // setData(response.data.data.line_items)
                    setDeletedRow(response.data.deleted_items)        
                })
    
            })
            .catch(error =>{
                console.log(error.response,'error')
            }
            )

    }

    function handleClose(e){
        if (e.target.classList.contains('screenDiv')){
            props.setDeleteMenu(false)

        }
    }

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
          const defaultRef = React.useRef()
          const resolvedRef = ref || defaultRef
      
          React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
          }, [resolvedRef, indeterminate])
      
          return (
            <>
              <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
          )
        }
      )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    }= useTable({
        columns:deletedColumn,
        // data: TABLE_MOCK
        data: delRows
        // data: deleted_file
        },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
              // Let's make a column for selection
              {
                id: 'selection',
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                  <div>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                  </div>
                ),
              },
              ...columns,
            ])
          }
    
    )
    
    return (
        <motion.div style={screen} className="screenDiv" 
        onClick={handleClose}
        initial={{opacity:0}}
        animate={{opacity:1}}
        > 
            <motion.div style={container} 
            className='col-sm-10 col-md-6' 
            initial={{y:'-5vh'}}
            animate={{y:0}}

            > 
                <div  style={header}>
                    <div className="">
                        <h1 style={{fontSize:'2.2rem',fontWeight:'600',marginTop:'1.5rem'}}>Deleted items</h1>
                        <p style={para}>Restore deleted Items from here.</p>
                    </div>
                    <div style={buttonDiv}>
                        {/* <div style={button} onClick={() => {handleEmpty()}}><Submit value="Empty items" sm variant='secondary' /></div> */}
                        <p style={{marginLeft:'1rem',fontWeight:'500',color:'var(--clr-accent)',cursor:"pointer"}} onClick={()=>{props.setDeleteMenu(false)}}>Close</p>
                    </div>
                </div>
            <div className='tableDeleted' id='containerDiv' >
            <table {...getTableProps()} style={{width:'100%'}}>
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
                {rows.map((row,i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell,i) => {

                                if(cell.column.Header == 'ACTION'){
                                    return <td {...cell.getCellProps({
                                        // style: {
                                        //   minWidth: cell.column.minWidth,
                                        //   width: cell.column.width,
                                        // },
                                      })} className='dropMapping'>
                                          <p style={{color:'#03565A',cursor:'pointer'}} onClick={()=> {handleRestore(row.original)}}> Restore </p>

                                        </td>
                                    }

                                // if(cell.column.Header == 'NOTES GROUPING'){
                                //     return <td {...cell.getCellProps({
                                //         style: {
                                //           minWidth: cell.column.minWidth,
                                //           width: cell.column.width,
                                //         },
                                //       })} className='dropMapping'>
                                //          <Form.Control size="lg"  as='select' value={row.sub_grp} onChange={(e) => handleChange(e,i)} >
                                //                         <option key = 'blankChoice' hidden value>Select Level</option>
                                //                         {notesMapping.map((opt)=>{
                                //                             // console.log(Name,'inside ledger code')
                                //                             // console.log(Name.LedgerCode,'inledger code')
                                //                             return(
                                //                             <option>{opt}</option>
                                //                             )
                                //                         })}
                                //                     </Form.Control>

                                //         </td>
                                //     }
                                // if(cell.column.Header == 'SUB GROUPING'){
                                //         return <td {...cell.getCellProps({
                                //             style: {
                                //               minWidth: cell.column.minWidth,
                                //               width: cell.column.width,
                                //             },
                                //           })} className='dropMapping'>
                                //                     <Form.Control size="lg"  as='select' value={row.sub_grp} onChange={(e) => handleChange(e,i)} >
                                //                         <option key = 'blankChoice' hidden value>Select Level</option>
                                //                         {subMapping.map((opt)=>{
                                //                             // console.log(Name,'inside ledger code')
                                //                             // console.log(Name.LedgerCode,'inledger code')
                                //                             return(
                                //                             <option >{opt}</option>
                                //                             )
                                //                         })}
                                //                     </Form.Control>

                                //         </td>
                                //     }
                                // console.log(cell.column.Header,'header');
                                 
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            </tr>
                        )
                        })}
            </tbody>
            
        </table>
        </div>
            </motion.div>
            
            
        </motion.div>
    )
}

export default DeletedFile
