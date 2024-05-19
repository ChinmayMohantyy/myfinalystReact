import React from 'react'
import {logout} from '../authentication/authUtilities'


const Inside = (props) => {
    function handlelogout(){
        logout()
        props.history.push('/')
    }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',backgroundColor:'grey'}}>
            <button onClick={handlelogout} style={{padding:'0.5rem 4rem',backgroundColor:'black',color:'yellow',fontSize:'2rem',fontWeight:'600'}}>Logout</button>
            
        </div>
    )
}

export default Inside
