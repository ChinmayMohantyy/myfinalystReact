import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import { useHistory } from "react-router-dom";
import { Submit } from "../../Components/Button";
import { logout } from "../../authentication/authUtilities";
// import {logout} from '../authentication/authUtilities'
import arrow from "../../assets/arrowLeftGreen.svg";
import trash from "../../assets/trash.svg";
import swal from "sweetalert";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import GridOnIcon from "@mui/icons-material/GridOn";
import ReorderIcon from "@mui/icons-material/Reorder";
import Select from 'react-select'
import ViewCompactIcon from "@mui/icons-material/ViewCompact";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "../dashboard/dashboard.css";
import { ViewContext } from "../../helper/DarkModeContext";
import Grid from "@mui/material/Grid";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const container = {
  minHeight: "100vh",
  width: "100%",
  // flexDirection:'row',
  // backgroundColor:'white',
  background: "linear-gradient(to bottom, #03565A 30%,white 60%  ,white 30%)",
  padding: "4rem 4rem",
};

const header = {
  height: "80px",
  width: "100%",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  padding: "0rem 1rem",
  borderRadius: "3px",
  marginBottom: "3rem",
};

const line = {
  height: "70%",
  width: "2px",
  backgroundColor: "rgb(229, 229, 229)",
  marginRight: "2%",
};

const dname = {
  fontSize: "1.1rem",
  fontWeight: "600",
  paddingLeft: "1%",
  paddingRight: "2%",
  color: "var(--clr-accent)",
};

const mainTag = {
  fontSize: "1.15rem",
  fontWeight: "700",
};

const button = {
  padding: "8px",
  width: "180px",
  marginLeft: "auto",
  display: "flex",
  marginRight: "110px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const update = {
  padding: "8px",
  width: "296px",
  marginLeft: "auto",
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));

const Folder = (props) => {
  const [folder, setFolder] = useState(false);
  const [saveFolder, setSaveFolder] = useState({
    folder_name: "",
  });
  const [getFolder, setGetFolder] = useState([]);

  let history = useHistory();

  const handleFolderChange = (e) => {
  console.log(e.target.value);
  setSaveFolder({
      folder_name: e.target.value,
    });
}

useEffect(() => {
    fetchFolder();
  }, []);

const handleUpdate = (e) => {
    console.log(e);

    const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };

    let data = {
      folder_name: saveFolder.folder_name,
    };

    console.log(headers);
    axios
      .post(`api/v1/folder/create-folder`, data, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
            setFolder(false);
            fetchFolder();
          swal("", response.data.message, "success");
        }

        // history.push('/createProject/uploadTb')
      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });
};

const fetchFolder = () => {
    const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    axios
      .get(`api/v1/folder/get-all-folders`, { headers })
      .then((response) => {
        console.log(response, "response response from state");

        setGetFolder(response.data.getFolder)
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
}

const handleAddFolder = () => {
setFolder(true);
}

const handleClose = () => {
setFolder(false);

};

return (
<div style={container}>
    <div style={header}>
    <div
        style={dname}
        className="back"
        onClick={() => {
        history.push("/dashboard");
        }}
    >
        <img
        src={arrow}
        alt="arrow"
        style={{ transform: "scale(0.7)", marginRight: "5px" }}
        />
        Home
    </div>
    <div style={line}></div>
    <div style={mainTag}>Directory</div>

    <div style={button}>
        <div
        style={{ width: "180px" }}
        onClick={() => {
            handleAddFolder();
        }}
        >
        <Submit value="Create new Folder" sm />
        </div>
    </div>
    </div>
    <div
    className="projectcard"
    style={{
        marginTop: "2rem",
        boxShadow: "2px 3px 15px black",
        backgroundColor: "white",
        width: "100%",
        maxHeight: "500px",
        height: "500px",
        overflowY: "scroll",
    }}
    >
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>

            {(getFolder.length > 0 &&
                getFolder.map((dat,i)=>(
                        <Grid item xs={3} 
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            history.push("/folder/"+dat._id);
                          }}
                        >
                        <Item>
                            {dat.folder_name}
                            </Item>
                        </Grid>
                ))
            )}
                    </Grid>
        </Box>

    <Modal
        open={folder}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
    >
        <Box sx={{ ...style, width: 811 }}>
        <div>
            <h2 id="child-modal-title">Create New Folder</h2>
            <p>Add Folder</p>
            <input
            placeholder="Enter Folder.."
            className="form-control"
            onChange={(e) => handleFolderChange(e)}
            value={saveFolder.folder_name}
            ></input>
        </div>
        <div className="col-md-12 row text-right mt-4" style={update}>
            <div
            className="col-md-6"
            style={{ width: "100px" }}
            onClick={(e) => {
                handleUpdate(e);
            }}
            >
            <Submit value="Save" sm />
            </div>
            <div
            className="col-md-6"
            style={{ width: "100px" }}
            onClick={handleClose}
            >
            <Submit value="Close" sm />
            </div>
        </div>
        </Box>
    </Modal>
    </div>
</div>
);
};

export default Folder;
