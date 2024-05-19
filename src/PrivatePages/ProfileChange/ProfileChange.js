import React, { useState,useEffect } from 'react'
import {Navbar} from '../../Components/Navbar'
import {Submit} from '../../Components/Button'
import swal from "sweetalert";
import axios from "axios";

const ProfileChange=()=>{
    const [setprofile, setProfileData] = useState({
        id: "",
        email: "",
        oldemail:"",
        password:"",
      });
const handleProfileChange = (id,e) => {
  const {name,value} = e.target;
    setProfileData({...setprofile,[name]:value})
}

useEffect(() => {
  const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
  axios
  .get(`api/v1/auth/get-profile`, { headers })
  .then((response) => {
    console.log(response, "response---------");
    if (response.status === 200) {
      setProfileData({
        id: response.data.user.data._id,
        email: response.data.user.data.email,
        oldemail:response.data.user.data.email,
        password:"",
      });
      swal("", response.data.message, "success");
    }

    // history.push('/createProject/uploadTb')
  })
  .catch((error) => {
    console.log(error.response, "error");
    // swal("", error.response.data.error, "error");
  });
},[]);


const handleUpdate = (id,e) => {
    console.log(e);
    const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    axios
      .post(`api/v1/auth/update-profile`,setprofile, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          
          swal("", response.data.message, "success");
        }

        // history.push('/createProject/uploadTb')
      })
      .catch((error) => {
        console.log(error.response, "error");
        // swal("", error.response.data.error, "error");
      });
}




  return (
    <>
    <Navbar text='Adjustments'/>
        <div className='containerQuestionnaire'>
            <div className="main">
                <div className="header"><h1>Update Profile</h1></div>
                <div className='inputs'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className="in-1">
                                <p>Email</p>
                                <input
                                name='email'
                                onChange={(e) => handleProfileChange(setprofile.id,e)}
                                value={setprofile.email}
                                ></input>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className="in-1">
                                <p>Password</p>
                                <input 
                                name='password'
                                onChange={(e) => handleProfileChange(setprofile.id,e)}
                                value={setprofile.password}
                                ></input>
                            </div>
                        </div>
                        <div className='post' onClick={(e) => {
                                    handleUpdate(setprofile.id,e);
                                    }}>
                            <Submit value="Update Profile" />                    
                        </div> 
                    </div>
                </div>
                
            </div>
        </div>
    </>
  
  )
}
export default ProfileChange