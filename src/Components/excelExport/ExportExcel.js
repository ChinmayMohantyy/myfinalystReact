import React,{useEffect,useState} from "react";
import ReactExport from "react-export-excel";
// import ReactExport from "react-data-export";

import axios from 'axios'
import {Submit} from '../Button'
import {useDispatch,useSelector} from 'react-redux'
import download from '../../assets/download.svg'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = () => {
    const [project, setProject] = useState('')
    const tableData = useSelector(state => state.reducer.tableData)

    const exportText = {
        marginLeft:'auto',
        color:'#03565A',
        fontSize:'1rem',
        fontWeight:'600',
        width:'5rem',
        display:'flex',
        cursor:'pointer'
    }
    
    useEffect(() => {
        const project_id = localStorage.getItem('project_id');
        const auth = localStorage.getItem('auth_token')
        let headers = {
            'x-auth-token' : auth,
        }
        axios.get(`/api/v1/presets/fetch-presets/${project_id}`,{headers})
        .then(response => {
            console.log(response.project.project_name,'response response')
            setProject(response.project.project_name)    
          })
          .catch(error =>{
              console.log(error.response,'error')
          }
            )

    }, [])
    
    return (
        // <div></div>
        <ExcelFile
        filename={project? project : 'Export project'}
        element={<div style={exportText}><img src={download} style={{marginRight:'5px'}}/>Export</div>}>

            <ExcelSheet data={tableData} name="Ledger Data">
                <ExcelColumn label="Ledger Code" value="ledger_code"/>
                <ExcelColumn label="ledger_name" value="ledger_name"/>
                <ExcelColumn label="Current Year" value="cy"/>
                <ExcelColumn label="Net Adjusted Amount" value="net_adjusted_amount"/>
                <ExcelColumn label="Previous Year" value="py"/>
                <ExcelColumn label="fS Group" value="fs_grp"/>
                <ExcelColumn label="Notes Group" value="note_grp"/>
                <ExcelColumn label="Sub Group" value="sub_grp"/>
            </ExcelSheet>
        </ExcelFile>
    );
}

export default ExportExcel

