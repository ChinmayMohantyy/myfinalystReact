import { Box, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from "axios";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 620,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const header = {
    fontSize: "2.2rem",
    fontWeight: "700",
  };
  const center = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const head = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "3rem",
  };


  const inputFiles = {
    borderRadius: "6px",
    border: "2px solid lightGrey",
    width: "13rem",
    height: "8rem",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const para ={
    marginTop:'0px',
    fontWeight:'400',
    fontSize:'1rem',
    color:'var(--clr-font-mid)'
}

const totalDiff = {
    color: "#e65308",
    fontWeight: "bold",
    marginLeft: "35px",
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const DeleteDuplicate=({duplicateItems,openDuplicateModal,setDuplicateModal,calculatePY,calculateCY,fetchConvential})=>{

    const handleDuplicateDelete=(lid)=>{

        let rows={
          lid:lid
        }

        console.log(rows);
        const auth = localStorage.getItem("auth_token");


        const project_id = localStorage.getItem("project_id");
          let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
          };

          axios
            .delete(`api/v1/conventional-mode/duplicate-entry/${project_id}`, {
              headers: headers,
              data: { rows },
            })
            .then((response) => {
              console.log(
                response.data,
                " duplicate response ---------------------------------"
              );
              fetchConvential(true);
              // props.setDeleteRow(true);
            
            })
            .catch((error) => {
              console.log(error.response, "error");
          });
    }


    return (
        <Modal
        open={openDuplicateModal}
        onClose={()=>setDuplicateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div  style={header}>  

            <Stack spacing={2} >
                <Item style={{color:'red',fontWeight:'bold'}}>TB NOT BALANCING CY BY{" "}
                   <span> {calculateCY().toLocaleString("en-IN")}</span></Item>
                <Item style={{color:'red',fontWeight:'bold'}}>TB NOT BALANCING PY BY{" "}
                  <span> {calculatePY().toLocaleString("en-IN")}</span></Item>
            </Stack> 
                <div className="">
                    <h1 style={{fontSize:'2.2rem',fontWeight:'600',marginTop:'1.5rem'}}>Duplicate items</h1>
                    <p style={para}>Remove duplicate Items from here.</p>
                </div>
            </div>
            

            <div className='tableDeleted' id='containerDiv' >
            <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th>LEDGER CODE</th>
                        <th>LEDGER NAME</th>
                        <th>PY</th>
                        <th>CY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {(duplicateItems.length > 0 && 

                        duplicateItems.map((duplicates,i)=>(
                          <React.Fragment>

                            <tr key={duplicates.lid}>
                                <td>{duplicates.ledger_code}</td>
                                <td>{duplicates.ledger_name}</td>
                                <td>{duplicates.py}</td>
                                <td>{duplicates.cy}</td>
                                <td style={{cursor:'pointer'}} onClick={()=>handleDuplicateDelete(duplicates.lid)}>
                                  <RemoveCircleIcon/>
                                </td>

                            </tr>
                            {/* <br /> */}
                          </React.Fragment>

                        ))
                    )}
                </tbody>
                
            </table>
        </div>
          </Typography>
        </Box>
      </Modal>
    )
}

export default DeleteDuplicate;