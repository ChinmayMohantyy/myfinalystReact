import * as actionTypes from '../actionTypes';
import axios from 'axios';

const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGUwMDE5MTBjZjNhYTA4ZmU3MjMxNjciLCJpYXQiOjE2MjUyOTMzODF9.9vD3Gs1MPDWV3r4SFh09j59grw-24UWfKjPpwGSGZ3I" 
let headers = {
    'x-auth-token' : auth,
    'Content-Type' : 'application/json'

}

export const existingProject= (fd) => {
    console.log(fd,'fd');
    return dispatch => {
        axios.post(`api/v1/tb-onboarding/tb-onboarding`,fd,{headers})
        .then(response => {
            console.log(response,'response')
          dispatch({type: actionTypes.SET_PROJECT_ID,payload:response})
        
      })
      .catch(error =>{
          console.log(error.response,'error')

      }
        )
    }
}

export const token =(fd) => {
    return dispatch => {
        axios.post(`api/v1/auth/login`,fd)
        .then(response => {
            console.log(response,'response')
          dispatch({type: actionTypes.SET_AUTH,payload:response})
        
      })
      .catch(error =>{
          console.log(error.response,'error')

      }
        )
    }
}