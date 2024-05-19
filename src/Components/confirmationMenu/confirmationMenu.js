import axios from 'axios';
import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'
import AddLedger from '../addLedger/AddLedger'



const ConfirmationMenu = (props) => {
    const dispatch = useDispatch();


    const popup = {

        display: 'flex',
        position: 'fixed',
        top: '26%',
        height: '10rem',
        width: '30%',
        backgroundColor: '#F1F2F5',
        zIndex: '30',
        left: '34%',
        borderRadius: '6px',
        boxShadow: '4px 6px 8px 0px #C0C0C060',
        padding:'2rem',
        justifyContent:'center',
        flexDirection:'column'
    }

    const select = {
        display:'flex',
        // justifyContent:'flex-end',
        justifyContent:'space-around',
    }
    const button ={
        height:'2rem',
        width:'3rem',
        backgroundColor:'rgba(207, 7, 7, 0.815)',
        color:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'6px',
        cursor:'pointer'
    }
    const button2 ={
        height:'2rem',
        width:'3rem',
        color:'white',
        backgroundColor:'var(--clr-accent)',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'6px',
        cursor:'pointer',
        marginLeft:'1rem'
    }

    const header = {
        display:'flex',
        justifyContent:'center',
        marginBottom:'2rem',
        fontSize:'1rem',
        fontWeight:'600',
        textAlign:'center'
    
    }

    function handleClick(){
        let row = props.select
        console.log(row[0].tb_id,row[0].lid,'clicked red')
        const auth = localStorage.getItem('auth_token')
        const project_id = localStorage.getItem('project_id'); 
        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'

        }
        axios.delete(`api/v1/conventional-mode/delete/${project_id}/${row[0].tb_id}/${row[0].lid}`,{headers})
            .then(response => {
                console.log(response.data,' delete response ---------------------------------')
                dispatch({type: actionTypes.SET_DELET_ROW,payload:row})

            //   dispatch(setCartAdded(response.data.product))        
              })
              .catch(error =>{
                  console.log(error.response,'error')
              }
                )
        props.setConfirmation(false)


        // props.setConfirmDelete(false)
        
    }


    return (
        <>
        <div style={popup}>
            <div style={header}>

            Are you sure you want to delete the selected Line Items?
            </div>
            <div style={select}>
                <div style={button} onClick={() => props.setConfirmation(false)}>
                    No
                </div>
                <div style={button2}onClick={() =>handleClick()}>
                    yes
                </div>
                
            </div>


            
        </div>
        </>
    )
}

export default ConfirmationMenu
