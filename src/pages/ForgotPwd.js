import React,{useState,useEffect} from 'react'
import {Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/Logo-my.svg'
import close from '../assets/times.svg'
import './authStyles.css' 
import {Link} from 'react-router-dom'
import { Submit } from '../Components/Button';
import axios from 'axios'
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../redux/actionTypes'


const ForgotPwd = (props) => {
    let history = useHistory()
    const dispatch = useDispatch();

    const [Value, setValue] = useState('')
    const [Show, setShow] = useState(false)
    // console.log('Show modal',Show)
    // console.log('props',props)

    function modalshow(){
        // console.log('modal closed')
        setShow(false)
        props.setShow(false)
    }

    useEffect(() => {
        // console.log('inside the usestate', props.Show)
        setShow(props.Show)

    }, [props.Show])

    console.log('api call',Value)
    function handleVerify(){
        console.log('api call',Value)
        const fd = new FormData()
        fd.append('otp',Value)
        axios.post('api/v1/auth/verify-otp',fd)
        .then(res =>{
            console.log(res,'api call')
            // localStorage.setItem('auth_token', res.data.fetchUser.token)
            // dispatch({type: actionTypes.SET_PROFILE_IMAGE,payload:res.data.fetchUser.profile_image})              
            // dispatch({type: actionTypes.SET_PROFILE_EMAIL,payload:res.data.fetchUser.email})              
            // dispatch({type: actionTypes.SET_PROFILE_NAME,payload:res.data.fetchUser.name})
            // props.setShow(false)
            history.push(`/retypepassword/${res.data.fetchUser._id}`)
        })
        .catch(err=>{
            console.log(err.response)
            // swal(err.response.data.error)
            // swal("", err.response.data.error , "error");
  
        })

    }
    

    return (
        <div>

            <Modal
                show={Show}
                aria-labelledby="example-modal-sizes-title-lg"
                dialogClassName="modal-90w"
                centered
                size="lg"

            >

                <Modal.Body>
                    <div style={{minHeight:'85vh',minWidth:'600px',padding:'6rem 6rem 0 6rem'}}>
                        <div className="title" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><img src={Logo} style={{height:'5.5rem'}}></img><img onClick={modalshow} style={{cursor:'pointer'}} src={close}/></div>
                        <div className="Modalemail" style={{display:'flex',flexDirection:'column'}}>
                            <h1 style={{textAlign:'center'}}>Enter OTP</h1>
                            <p>we've sent an OTP to your email address</p>
                            <div style={{padding:'1rem 4rem '}}>
                            <form >

                                <input name="email" style={{textAlign:'center'}} onChange={event => setValue(event.target.value)} type="text" id="fname"  value={Value} placeholder=""/>
                            </form>
                            {/* {error.email ? <p style={{color:'red',marginRight:'auto'}}>Email not registered</p> : null} */}

                            <div className='sendLink' onClick={handleVerify}><Submit value="Verify"/></div>
                            <div className='goback' style={{display:'flex', alignItems:'center',justifyContent:'center'}}><Link to="/signin" onClick={modalshow}>Go back to<span>  Sign In</span></Link></div>
                            </div>
                        </div>  

                    </div>
                </Modal.Body>
            </Modal>
        

        </div>
    )
}

export default ForgotPwd
