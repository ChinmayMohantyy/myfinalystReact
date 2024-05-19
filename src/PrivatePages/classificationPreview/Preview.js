import React,{useEffect,useState} from 'react'
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import axios from 'axios'
import * as actionTypes from '../../redux/actionTypes'
import arrowLeftGreen from '../../assets/arrowLeftGreen.svg'
import {Navbar} from '../../Components/Navbar'
import {Submit} from '../../Components/Button'
import download from '../../assets/download.svg'
import PreviewCard from '../../Components/populateFs/PreviewCard'
import './preview.css'
import ExportExcel from '../../Components/excelExport/ExportExcel'

const main ={
    padding:'1rem 4rem',
    minWidth:'1045px',
    backgroundColor:'#E5E5E5',
    minHeight:'calc(100vh - 80px)',
}


const submitExport = {
    display:'flex', 
    alignItems:'center',
    padding:'0 3rem',
    // backgroundColor:'white'

}
const exportText = {
    marginLeft:'auto',
    color:'#03565A',
    fontSize:'1rem',
    fontWeight:'600',
    width:'5rem'
}
const button = {
    marginLeft:'2rem'

}


const backNav ={
    fontSize:'1.2rem',
    fontWeight:'600',
    color:'#03565A',
    cursor:'pointer'
}

// const grid = {
//     display:'grid',
//     gridTemplateColumns:'repeat(4, 23%)',
//     gridGap:'2rem',
//     margin:'1rem 0',
//     maxHeight:'70vh',
//     overflowY:'scroll',
//     padding:'0 2rem'
// }



const Preview = () => {
    let history = useHistory()
    const [classification, setClassification] = useState([]) // classification_fs object
    const classification_fs = Object.keys(classification)
    console.log(classification_fs)
    function handleClick(){
        history.push('/financialstatement')
    }
    
    const auth = localStorage.getItem('auth_token')
    const project_id = localStorage.getItem('project_id');
    const TB_ID = useSelector(initialState => initialState.reducer.tb_id) 

        let headers = {
            'x-auth-token' : auth,
            // 'Content-Type' : 'application/json'

        }

    useEffect(() => {
        axios.get(`/api/v1/fs-classification/get-fs/${project_id}/${TB_ID}`,{headers})
        .then(response => {
            console.log(response.data.classification_list,'response response')
            setClassification(response.data.classification_list)
       
          })
          .catch(error =>{
              console.log(error.response,'error')
          }
            )
    }, [])


return (
    <>
        <Navbar text='Classification Preview' /> 
        <div style={main}>
        <div style={submitExport}>
            <div style={{color:'#03565A',display:'flex'}}>
                <div style={backNav} onClick={() => { history.push(`/conventional/${project_id}`) }}>
                    <img src={arrowLeftGreen} style={{marginRight:'10px'}}/>
                </div>
                <h2 style={{fontSize:'1.5rem', fontWeight:'700'}}>
                    Classification Preview</h2>
            </div>
            <div style={exportText}>
                {/* <img src={download} style={{marginRight:'5px'}}/>
                Export */}
                <ExportExcel />
            </div>
            <div style={button} onClick={() => handleClick()}><Submit value='Confirm Grouping' sm />
            </div>
        </div>
        <div  id='gridScroll' className='grid'>
            {classification_fs.map((dat,ix)=> {
                return(

                    <PreviewCard name={dat} data={classification[dat]} key={ix}/>
                )  
            })
            }
        </div>

        </div>
        
    </>
)
}

export default Preview




