import React from 'react'
import { useHistory } from "react-router-dom";
import {Modal} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import axios from 'axios' 

//file import
import blank from '../../assets/createBlank.svg'
import existing from '../../assets/createExisting.svg'
import './createProject.css'
import * as actionTypes from '../../redux/actionTypes'

const CreateProject = () => {
    let history = useHistory()
    
    const dispatch = useDispatch()

    // const auth = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGUwMDE5MTBjZjNhYTA4ZmU3MjMxNjciLCJpYXQiOjE2MjUyOTMzODF9.9vD3Gs1MPDWV3r4SFh09j59grw-24UWfKjPpwGSGZ3I" 
    // let headers = {
    // 'x-auth-token' : auth,
    // 'Content-Type' : 'application/json'
    // }

    function handleNavigate(docType){
         history.push(`/createProject/${docType}`)
        // dispatch({type:actionTypes.SET_PROJECT_ID, payload:'project_id'})
        // axios.post(`api/v1/tb-onboarding/tb-onboarding`,fd,{headers})
        // .then(response => {
        //     console.log(response,'response')
        // //   dispatch({type: actionTypes.SET_PROJECT_ID,payload:response})
        //     // localStorage.setItem('project_id', res.data.token)

        
        //  })
        // .catch(error =>{
        //   console.log(error.response,'error')

        // })


    }
    
   

    return (
        <div className='maping'>        
            <Modal
                show={true}
                aria-labelledby="example-modal-sizes-title-lg"
                dialogClassName="modal-90w"
                centered
                size="lg"
            >
                <Modal.Body>
                    <div>
                        <div className='heading'><h1>Create a project</h1></div>
                        <div className='chooseTemplate'>
                            <div className="blank"><div className='svg'><img src={blank} onClick={() => handleNavigate('QuestionnaireNew')}></img></div><p>Blank project</p></div>
                            <div className="existing"><div className='svg'><img src={existing} onClick={ () => handleNavigate('QuestionnaireExisting')}></img></div><p>Use Existing Template</p></div>
                        </div> 
                    </div>
                </Modal.Body>
            </Modal>
        

        </div>
    )
}

export default CreateProject