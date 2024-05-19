import React,{useState,useEffect} from 'react'
import './authStyles.css'
import accountant from '../assets/g10.svg'
import Logo from '../assets/Logo-my.svg'
import { Form } from "react-bootstrap";
import ForgotPwd from './ForgotPwd';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {GoogleLogin} from 'react-google-login'
import {Submit} from '../Components/Button'
import {useHistory} from 'react-router-dom'



const RetypePassword = ({ match: {params}}) => {
    let history = useHistory()
    const [error, seterror] = useState(false)
    const [Value, setValue] = useState({NewPassword:'',RetypePassword:''})
    const [ShowPwd, setShowPwd] = useState(false)
    const [ShowCmpwd, setShowCmpwd] = useState(false)

    
    function handleChange(e){
        setValue({...Value,[e.target.name]:e.target.value})
        console.log(Value,error,'values and errors')
    }
    
    function validation(){
        
        const err = (Value.NewPassword === Value.RetypePassword | Value.RetypePassword.length === 0 ? false : true)
        seterror(err)
        
    }
    
    useEffect(() => {
        validation()
        
    },[Value])
    
    
    // const responseGoogle = (res) => {
    //     console.log(res,'response from google')
    // };

    function handleSignUp(){
        // console.log(Value, 'Value');
        const fd = new FormData()
        fd.append('new_password',Value.NewPassword);
        fd.append('retype_password',Value.RetypePassword);
        axios.post(`api/v1/auth/reset-password/${params.id}`,fd)
        .then(res =>{
            history.push('/');
        })
        .catch(err=>{
            console.log(err.response)
            alert(err.response.data.error)  
        })
    }


    return (
        <div className='conatiner'>
            <div className="column-1">
                <div className="logo" style={{display:'flex'}}><img src={Logo}></img></div>
                <div className="pg-title" style={{display:'flex'}}><h1>Reset Password</h1></div> 
                <div className="password-signin" style={{display:'flex',flexDirection:'column'}}>
                    <h3>Enter New Password</h3>
                        <input type="text" id="fname"  onChange={handleChange} value={Value.NewPassword} name="NewPassword" placeholder=""  type={!ShowPwd? "password" :"text"}/>
                        <i onClick={()=>setShowPwd(!ShowPwd)} class= {ShowPwd ? "fas fa-eye" : "far fa-eye-slash"} />
                </div>  
                <div className="password-signin" style={{display:'flex',flexDirection:'column'}}>
                    <h3>Retype Password</h3>
                        <input type="text" id="fname"  onChange={handleChange} value={Value.RetypePassword} name="RetypePassword" placeholder=""  type={!ShowCmpwd? "password" :"text"}/>
                        <i onClick={()=>setShowCmpwd(!ShowCmpwd)} class= {ShowCmpwd ? "fas fa-eye" : "far fa-eye-slash"} />
                        {error ? <p style={{color:'red',marginRight:'auto',fontSize:'15px'}}>password doesn't match</p> : null}

                </div>  
            
                <div className='submit' onClick={handleSignUp} >{error? <Submit  disable value="Update password"/> : <Submit   value="Update password"/> }</div>
            
            </div>
            <div className="column-2"><img src={accountant} alt='accountant working' ></img></div>
        </div>
    )
}

export default RetypePassword
