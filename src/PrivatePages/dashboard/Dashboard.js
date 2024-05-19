import React,{useEffect,useState,useContext} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'
import { useHistory } from "react-router-dom";
import { Submit } from '../../Components/Button'
import arrow from '../../assets/arrowGreen.svg'
import {Navbar} from '../../Components/Navbar'
import {motion} from 'framer-motion'
import {logout} from '../../authentication/authUtilities'
import { ThemeContext } from "../../helper/DarkModeContext";



import axios from 'axios'
import './dashboard.css'

const container ={
    // minHeight:'100vh',
    // backgroundColor:'white',
    width:'100%',
    background: 'linear-gradient(to bottom, #03565A 30%,white 60%  ,white 30%)',
    padding:'0 4rem',
    display:'flex',
    paddingTop:'2rem'

}



const box2={
    flex:'3',
    height:'80vh',
    backgroundColor:' rgba(0, 0, 0, 0.2)',
    borderRadius:'6px'
}

const card={
    height:'13rem',
    width:'20rem',
    borderRadius:'6px',
    backgroundColor:"#ccc   ",
    display:'flex',
    paddingTop:'2rem',
    cursor:'not-allowed',
    boxShadow: "8px 10px 2px 1px rgba(255, 255, 255, .2)"
}

const card1={
    height:'13rem',
    width:'20rem',
    borderRadius:'6px',
    backgroundColor:"white",
    display:'flex',
    paddingTop:'2rem',
    cursor:'pointer',
    boxShadow: "8px 10px 2px 1px rgba(255, 255, 255, .2)"
}

const Dashboard = (props) => {
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    let history = useHistory()
    const { theme } = useContext(ThemeContext);


    const box1={
        flex:'8',
        height:'80vh',
        // backgroundColor:' rgba(0, 0, 0, 0.2)',
        marginRight:'2rem',
        borderRadius:'6px',
        display:'grid',
        gridTemplateColumns:'repeat(3, 32%)',
        gridGap:'1rem',
        padding:'4rem 2rem',
        background: `${theme ? "rgba(0, 0, 0, 0.2)" : "#363535"}`,
        // width:'5rem'

    }
    // const data = {
    //     "share_ids": [],
    //     "access_projects": [],
    //     "_id": "610816df81d92d79dc8ba18c",
    //     "user_id": "60e001910cf3aa08fe723167",
    //     "project_name": "filter 1",
    //     "company_type": "Trading",
    //     "gaap_selection": "Indian Gaap",
    //     "current_year": "2020-03-31T00:00:00.000Z",
    //     "previous_year": "2020-03-31T00:00:00.000Z",
    //     "type_fs": "Standalone Fs",
    //     "preset_name": "not available",
    //     "__v": 0
    // }
    // useEffect(() => {
    //     const auth = localStorage.getItem('auth_token')
    //     let headers = {
    //         'x-auth-token' : auth,
    //         // 'Content-Type' : 'application/json'
    //     }
    //     axios.get(`api/v1/tb-onboarding/get-all-projects`,{headers})
    //     .then(response => {
    //         console.log(response.data.project_list,'response response')    
    //         setData(response.data.project_list)   
    //       })
    //       .catch(error =>{
    //           console.log(error.response,'error')
    //       }
    //         )
    // }, [])
    // function handleClick(e,id){
    //     console.log(id)
    //     const auth = localStorage.getItem('auth_token')
    //     let headers = {
    //         'x-auth-token' : auth,
    //         // 'Content-Type' : 'application/json'
    //     }
    //     axios.get(`api/v1/tb-onboarding/get-tb/${id}`,{headers})
    //     .then(response => {
    //         dispatch({type: actionTypes.SET_RESTART,payload:'arr'})
    //         dispatch({type: actionTypes.SET_NOTERESTART,payload:'arr'})
    //         console.log(response.data,'response response')
    //         dispatch({type: actionTypes.SET_TB_ID,payload:response.data.tb_id})
    //         localStorage.setItem('project_id', response.data.project_id)
    //         history.push('/createProject/DataMapping')
    //       })
    //       .catch(error =>{
    //           console.log(error.response,'error')
    //       }
    //         )
    // }


    function handlelogout(){
        logout()
        props.history.push('/')
    }

    return (
        <>
            <Navbar text='Financial Year: 2021 - 2022'  home />
        <motion.div style={container}>
            <div style={box1}>
                <motion.div
                // whileHover={{
                //     scale: 1.02,
                //     backgroundColor:'var(--clr-bg)'
                //     // transition: { duration: 0.1 },
                //   }} 
                style={card}>
                    <div style={{height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><h2 style={{fontSize:'1.4rem',alignContent:'center'}}>Analytics</h2></div>
                    <div style={{marginLeft:'auto',height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><img style={{height:'1.8rem'}} src={arrow}/></div>
                </motion.div>
                <motion.div
                // whileHover={{
                //     scale: 1.02,
                //     backgroundColor:'var(--clr-bg)'
                //     // transition: { duration: 0.1 },
                //   }} 
                style={card}>
                    <div style={{height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><h2 style={{fontSize:'1.4rem',alignContent:'center'}}>Presets</h2></div>
                    <div style={{marginLeft:'auto',height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><img style={{height:'1.8rem'}} src={arrow}/></div>
                </motion.div>
                <motion.div
                // whileHover={{
                //     scale: 1.02,
                //     backgroundColor:'var(--clr-bg)'
                //     // transition: { duration: 0.1 },
                //   }} 
                style={card}>
                    <div style={{height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><h2 style={{fontSize:'1.4rem',alignContent:'center'}}>Reports</h2></div>
                    <div style={{marginLeft:'auto',height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><img style={{height:'1.8rem'}} src={arrow}/></div>
                </motion.div>
                <motion.div
                // whileHover={{
                //     scale: 1.02,
                //     backgroundColor:'var(--clr-bg)'
                //     // transition: { duration: 0.1 },
                //   }}
                style={card}>
                    <div style={{height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><h2 style={{fontSize:'1.4rem',alignContent:'center'}}>Lease Calculation Tools</h2></div>
                    <div style={{marginLeft:'auto',height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><img style={{height:'1.8rem'}} src={arrow}/></div>
                </motion.div>
                <motion.div
                onClick={()=>{
                    history.push('/investment-register')
                }}
                whileHover={{
                    scale: 1.02,
                    backgroundColor:'var(--clr-bg)',
                    transition: { duration: 0.1 },
                }}
                style={card1}>
                    <div style={{height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><h2 style={{fontSize:'1.4rem',alignContent:'center'}}>Investment Register</h2></div>
                    <div style={{marginLeft:'auto',height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><img style={{height:'1.8rem'}} src={arrow}/></div>
                </motion.div>
                <motion.div
                onClick={()=>{
                    history.push('/createfinancialstatement')
                }}
                whileHover={{
                    scale: 1.02,
                    backgroundColor:'var(--clr-bg)'

                }}
                style={card1}>
                    <div style={{height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><h2 style={{fontSize:'1.4rem',alignContent:'center'}}>Financial Statements</h2></div>
                    <div style={{marginLeft:'auto',height:'100%',dispaly:'flex',alignItems:'center',padding:'1rem'}}><img style={{height:'1.8rem'}} src={arrow}/></div>
                </motion.div>
            </div>
            {/* <div style={box2}>
                <div  onClick={handlelogout} ><p className='logout_btn'style={{marginLeft:'auto', textAlign:'end',marginTop:'10px',marginRight:'1rem',color:'var(--clr-bg)',cursor:'pointer'}}>log out</p></div>

            </div> */}



        </motion.div>
         </>
    )
}

export default Dashboard
