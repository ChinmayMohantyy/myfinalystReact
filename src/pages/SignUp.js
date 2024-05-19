import React,{useState,useEffect} from 'react'
import './authStyles.css'
import accountant from '../assets/g10.svg'
import Logo from '../assets/Logo-my.svg'
import {Form} from "react-bootstrap";
import {Link} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
import { Submit } from '../Components/Button';
import swal from 'sweetalert';
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../redux/actionTypes'




const SignUp = (props) => {
    // console.log("signup");
    const dispatch = useDispatch();

    const [error, seterror] = useState({email:true,password:true,confirmPwd:true})
    const [Value, setValue] = useState({email:'',password:'',confirmPwd:''})
    const [ShowPwd, setShowPwd] = useState(false)
    const [ShowCmpwd, setShowCmpwd] = useState(false)
    
    function handleChange(e){
        setValue({...Value,[e.target.name]:e.target.value})
        // console.log(e.target.value,'hey')
        // console.log(Value.email,'2here')
    }
    useEffect(() => {
        validation()

    },[Value])
    function validation(){
        let temp = {...error}
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        temp.email = (pattern.test(Value.email)| Value.email.length === 0 ? true : false) 
        temp.password= (Value.password.length > 6 | Value.password.length === 0  ? true : false)
        temp.confirmPwd= (Value.password === Value.confirmPwd | Value.confirmPwd.length === 0 ? true : false)
        seterror(temp)
       
    }
    // console.log(Value.email,'3here')


    const responseGoogle = (res) => {
        console.log(res,'success response from google')
        console.log(res.profileObj.imageUrl,'image response from google')
        console.log(res.profileObj.email,'email response from google')
        console.log(res.profileObj.name,'success response from google')
        console.log(res.accessToken,'accessToken success response from google')
        dispatch({type: actionTypes.SET_PROFILE_IMAGE,payload:res.profileObj.imageUrl})              
        dispatch({type: actionTypes.SET_PROFILE_EMAIL,payload:res.profileObj.email})              
        dispatch({type: actionTypes.SET_PROFILE_NAME,payload:res.profileObj.name})
        const fd = new FormData()
        fd.append('name',res.profileObj.name)
        fd.append('email',res.profileObj.email)
        fd.append('profile_image',res.profileObj.imageUrl)
        fd.append('google_auth_token',res.googleId)
        axios.post('/api/v1/auth/gauth-signup',fd)
        .then(res =>{
            console.log(res,'api call')
            localStorage.setItem('auth_token', res.data.token)
            props.history.push('/dashboard')
        })
        .catch(err=>{
            // console.log(err.response)
            // swal(err.response.data.error)
            swal("", err.response.data.error , "error");
            // swal("", err.response.data.error , "error");
            
        })  
        
        
    };
    
    const responseError = (res) => {
        swal("", res.error , "error");
        // console.log(res,'error response from google')
    };

    function handleSignUp(){
        if(Value.email.length === 0 | Value.password.length === 0 |  Value.confirmPwd.length === 0   ){
            swal("", "fill all the required fields!", "warning");

        }
        else{

            const fd = new FormData()
            fd.append('email',Value.email)
            fd.append('password',Value.password)
            axios.post('api/v1/auth/sign-up',fd)
            .then(res =>{
                props.history.push('/')
                console.log(res,'api call')
                swal("", "please check your mail to activate your account !", "success");
                // console.log(fd,'form data call')
            })
            .catch(err=>{
                // console.log(err.response)
                swal("", err.response.data.error, "warning");
                // alert(err.response.data.error)  
            })  
        }
        }

    



    return (
        <div className='conatiner'>
            
            <div className="column-1">
                <div className="logo" style={{display:'flex'}}><img src={Logo} alt='LOGO'></img></div>
                <div className="pg-title" style={{display:'flex'}}><h1>Sign Up</h1></div>
                <div className="emailId" style={{display:'flex',flexDirection:'column'}}>
                    <h3>Enter Email Id*</h3>
                     <input onChange={handleChange}  name="email" value={Value.email} type="text" id={error.email? "fname" :'error' }  placeholder=""/>
                    {error.email? null:  <p style={{color:'red',margin:'0rem auto 0 0'}}>Invalid Email</p> }
                </div>  
                <div className="password" style={{display:'flex'}}>
                    <div className="cl-1" style={{display:'flex',flexDirection:'column'}}>
                        <h3>Enter Password</h3>
                        <input onChange={handleChange} name="password" value={Value.password} type= {!ShowPwd ? "password" :"text"} id={error.password? "pw" :'error' }  placeholder=""/>
                        <i onClick={()=>setShowPwd(!ShowPwd)} class= {ShowPwd ? "fas fa-eye" : "far fa-eye-slash"} /> 
                        {/* <i class="far fa-eye-slash"/> */}
                        {error.password? null: <p style={{color:'red',margin:'1.2rem auto 0 0',fontSize:'15px'}}>atleast 8 characters</p> }

                    </div>
                    <div className="cl-2" style={{display:'flex',flexDirection:'column'}}>
                        <h3>Confirm Password</h3>
                        <input onChange={handleChange} name="confirmPwd" value={Value.confirmPwd} type={!ShowCmpwd? "password" :"text"} id={error.password? "confirm-pw" :'error' }  placeholder=""/>
                        <i onClick={()=>setShowCmpwd(!ShowCmpwd)} class= {ShowCmpwd ? "fas fa-eye" : "far fa-eye-slash"} />
                        {error.confirmPwd ? null : <p style={{color:'red',margin:'1.2rem auto 0 0',fontSize:'15px'}}>password doesn't match</p>}
                    </div>
                </div>
                 
                <div className='submit'onClick={handleSignUp}>{ error.email & error.confirmPwd & error.password ?  <Submit   value="Sign Up" /> :  <Submit disable  value="Sign Up" /> }</div>
                <div className='split'><p><span>or</span></p></div>
                 <GoogleLogin
                className="google-button"
                buttonText="Sign Up with Google"
                clientId='661989732207-a17ni01sjrqicni6g59bqcv3uhjnannt.apps.googleusercontent.com'
                onSuccess={responseGoogle}
                onFailure={responseError}
                // isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                />
                {/* <div className='google-login'><button style={{display:'flex', justifyContent:'center',alignItems:'baseline'}}><i className='fab fa-google'/><p>Continue with Gmail</p></button></div> */}
                <div className='sign-up' style={{display:'flex', alignItems:'center',justifyContent:'center'}}><Link to="/">Already have an account?<span>  Sign In</span></Link></div>
                <div className='terms' style={{display:'flex',justifyContent:'center',alignItems:'center'}}><p>By joining, you agree to the </p><a href="/"> Terms</a><p> and</p><a  href="/"> Privacy policy</a></div>
                {/* <div className='sign-up' style={{display:'flex', alignItems:'center',justifyContent:'center'}}><Link to="/signUpV2"><span>  SignUpV2</span></Link></div> */}

            </div>
            <div className="column-2"><img src={accountant} alt='accountant working'></img></div>
            
            
        </div>
    )
}

export default SignUp
