// import {React,useState}from 'react';
import NavBarV2 from './NavBarV2'
import Button from '@mui/material/Button';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Bolt } from '@mui/icons-material';
// import { Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

const SignUp=()=>{
    // const [item1, setItem1] = useState('');
    // const [item2, setItem2] = useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setItem1(event.target.value);
    // };
    // const itemChange = (event: SelectChangeEvent) => {
    //     setItem2(event.target.value);
    // };
    return(
        <div style={{backgroundColor:"#f5f5f5",height:"100rem",padding:"25px"}}>
            <NavBarV2/>
           <div style={{marginTop:"90px"}}>
           
           <center>
         
           <h1><b>Sign up now to get started!</b></h1>
           <h6 style={{color:"gray"}}>With MyFinalyst, you can easily create and audit financial</h6>
<h6 style={{color:"gray"}}>statements for your company or clients.</h6>
</center>

<div style={{width:"45%",marginLeft:"30%",marginTop:"30px"}}>

          <label style={{color:'#696F79'}}><strong>Enter your organization name</strong></label>   
           <input type='text' style={{height:"75px"}}/>
          <label style={{marginTop:"10px",color:'#696F79'}}><strong>Enter your organization e-mail address</strong></label>   
           <input type='text' style={{height:"75px",marginTop:"12px"}}/>
          <label style={{marginTop:"10px",color:'#696F79'}}><strong>Set a password for your account</strong></label>   

           <input type='text' style={{height:"75px"}}/>
          <label style={{marginTop:"10px",color:'#696F79'}}><strong>Confirm your new password</strong></label>   

           <input type='text' style={{height:"75px"}}/>
          
    
    <div style={{display:"flex",flexDirection:"row",width:"100%",marginTop:"12px"}}>
    
    {/* <FormControl sx={{ m: 2}} >
        <Select
       
          value={item1}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{width:"22rem",}}
        >
          <MenuItem value="">
         Item1
          </MenuItem>

          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, }} >
        <Select
          value={item2}
          onChange={itemChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{width:"22rem"}}
        >
          <MenuItem value="">
            Item2
          </MenuItem>

          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      <label>
      <strong style={{color:"#696F79"}}>Select City</strong>
       <select style={{width:"22rem",height:"65px",borderRadius:"5px"}}>
       
        <option  hidden>Item1</option>
        <option>Item1</option>
        <option>Item2</option>
        <option>Item3</option>
       
       </select>
       </label>
       <label style={{marginLeft:"29px"}}>
       <strong style={{color:"#696F79"}}>Select State</strong>
       <select style={{width:"22.5rem",borderRadius:"5px",height:"65px"}}>
        <option hidden>Item2</option>
        <option>Item1</option>
        <option>Item2</option>
        <option>Item3</option>
       </select>
       </label>
    </div>
    <Button style={{backgroundColor:"#03565A",color:"white",height:"65px",width:"100%",marginTop:"10px",fontSize:"20px"}}>
       Create Account
      </Button>

    </div>

    </div>
        </div>
    )
}

export default SignUp;  