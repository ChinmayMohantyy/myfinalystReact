// const navbar=()=>{
//     return(
//         <>
// navbar new
//         </>
//     )
// };
// export default navbar;
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import {Link} from 'react-router-dom';


const navbar=()=>{

  return (
    <AppBar 
    style={{backgroundColor:"#03565A",height:"90px"}}>
    <Link  to="/" style={{color:"white"}}> <h5 style={{display:"flex",justifyContent:"flex-end",marginTop:28,marginRight:"80px",color:"white"}}><span style={{color:"#FFFFFF99",marginRight:"10px"}}>Already have an account?</span> LogIn.</h5></Link>
    
    </AppBar>
  );
}
export default navbar;