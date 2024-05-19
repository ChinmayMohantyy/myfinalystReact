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
import "./createFs.css";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import GridOnIcon from "@mui/icons-material/GridOn";
import ReorderIcon from "@mui/icons-material/Reorder";
import Select from "react-select";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "../dashboard/dashboard.css";
import { ViewContext } from "../../helper/DarkModeContext";
import Grid from "@mui/material/Grid";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { ThemeContext } from "../../helper/DarkModeContext";
import { AccessProjectContext } from "../../helper/DarkModeContext";
import { useParams } from "react-router-dom";

const container = {
  minHeight: "100vh",
  width: "100%",
  // flexDirection:'row',
  // backgroundColor:'white',
  background: "linear-gradient(to bottom, #03565A 30%,white 60%  ,white 30%)",
  padding: "4rem 4rem",
};

const block = {
  backgroundColor: "#F0DBC8",
  minHeight: "80vh",
  // height:'auto',
  boxShadow: "2px 3px 15px black",
  borderRadius: "6px",
  padding: "1rem 6rem",
  marginTop: "1rem",
};

const heading = {
  height: "2rem",
  display: "flex",
  justifyContent: "center",
  marginBottom: "2rem",
};

const font = {
  fontSize: "15px",
  fontWeight: "600",
};

const card = {
  height: "10rem",
  borderRadius: "10px",
  marginBottom: "15px",
  // padding:'2.5rem',
  overflowY: "scroll",
};
const create = {
  height: "10rem",
  borderRadius: "10px",
  marginBottom: "15px",
  backgroundColor: "white",
  display: "flex",
  // flexDirection:'row',
  justifyContent: "center",
  alignItems: "center",
  padding: "0rem 9rem",
};
// padding:'2.5rem',}

const projecth1 = {
  fontSize: "20px",
  fontWeight: "700",
};
const projectspan = {
  fontSize: "22px",
  fontWeight: "500",
  marginLeft: "1rem",
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
const button4 = {
  padding: "8px",
  width: "180px",
  marginLeft: "auto",
  display: "flex",
  marginRight: "-830px",
};
const button2 = {
  padding: "8px",
  width: "15vw",
  marginLeft: "auto",
};
const buttonhover = {
  color: "green",
};

const inputBox = {
  color: "black",
  fontSize: "1rem",
  fontWeight: "500",
  textAlign: "left",
  border: "none",
  width: "100%",
  backgroundColor: "rgba(0,0,0,0)",
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
const span = {
  color: "rgba(207, 7, 7, 0.815) ",
};
const list = {
  // backgroundColor:'white',
  maxHeight: "176px",
  overflowY: "scroll",
  paddingRight: "10px",
  paddingTop: "2px",
};
const input = {
  height: "48px",
  width: "100%",
  padding: "10px",
  outline: "none",
  border: "1px solid #cacacabf",
  borderRadius: "6px",

  ":focus-visible": {
    border: "1px solid black",
  },
};

const update = {
  padding: "8px",
  width: "296px",
  marginLeft: "auto",
};

const folderData = {
  marginRight: "9px",
  cursor: "Pointer",
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));
const submit = {
  width: "8rem",
  height: "3rem",
  flex: "1",
  paddingLeft: "10px",
  marginTop: "30px",
};
const mail = {
  minHeight: "4rem",
  marginTop: "1rem",
  display: "flex",
  width: "100%",
};
const header1 = {
  fontSize: "2rem",
  fontWeight: "600",
};
const para2 = {
  fontSize: "13px",
  fontWeight: "600",
  margin: "0 0 2px 0",
  color: "var(--clr-font-mid)",
};

const para = {
  fontSize: "15px",
  fontWeight: "400",
  marginTop: "0px",
  color: "#696F79",
};
const profilePic = {
  width: "3rem",
  height: "3rem",
  borderRadius: "50%",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.5rem",
  fontWeight: "500",
};
const error_message = {
  color: "red",
};

const initialErrors = { email: false, message: "Must be a valid email" };
const Dashboard = (props) => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState(null);
  const [renameProject, setRenameProject] = useState(false);
  const [clickFolder, setClickFolder] = useState(false);
  const [renamefolder, setRenameFolder] = useState(false);
  const [shareProject, setShareProject] = useState(false);
  const [setprofile, setProfileData] = useState([]);
  const [renameData, setRenameData] = useState({
    id: "",
    name: "",
  });
  const [renameFolderData, setRenameFolderData] = useState({
    id: "",
    name: "",
  });
  const [findprojectdata, setFindProjectData] = useState([]);
  const [folder, setfolder] = useState(false);
  const { directoryView, setDirectoryView } = useContext(ViewContext);
  const [folderValueData, setFolderValueData] = useState([]);
  const [saveFolder, setSaveFolder] = useState({
    folder_name: "",
  });
  const { theme } = useContext(ThemeContext);
  const [folderid, setFolderId] = useState(0);
  const dispatch = useDispatch();
  let history = useHistory();
  const auth = localStorage.getItem("auth_token");
  const { access, setAccess } = useContext(AccessProjectContext);
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };
  const email = {
    fontSize: "13px",
    fontWeight: "500",
    margin: "0 0 0 0",
    color: "black",
  };
  const options = [
    { value: "Edit", label: "Edit access" },
    { value: "Audit", label: "Audit Access" },
    { value: "View", label: "View access" },
    { value: "Remove", label: "Remove" },
  ];
  const [error, seterror] = useState(initialErrors);
  const [Value, setValue] = useState({ email: "" });
  const [valid, setValid] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [isUpdate, setUpdate] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchFolders();
    accessUser();
    activateUser();
    validation();
    console.log(valid);
  }, [renameProject, isUpdate]);

  function validation() {
    let temp = { ...error };
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    temp.email =
      pattern.test(Value.email) | (Value.email.length == 0) ? true : false;
    if (temp.email) {
      setValid(true);
    } else {
      setValid(false);
    }
    seterror(temp);
    console.log(temp, "validation");
  }

  const activateUser = () => {
    const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    axios
      .get(`api/v1/auth/activate-user`, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          setProfileData(response.data);
          console.log(setprofile);
          swal("", response.data.message, "success");
        }

        // history.push('/createProject/uploadTb')
      })
      .catch((error) => {
        console.log(error.response, "error");
        // swal("", error.response.data.error, "error");
      });
  };

  const handleFolderChange = (e) => {
    console.log(e.target.value);
    setSaveFolder({
      folder_name: e.target.value,
    });
  };

  const fetchFolders = () => {
    axios
      .get(`api/v1/folder/get-all-folders`, { headers })
      .then((response) => {
        console.log(response.data.getFolder, "response response from state");
        setFolderValueData(response.data.getFolder);
        setUpdate(false);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  const accessUser = () => {
    axios
      .get(`api/v1/auth/get-profile`, { headers })
      .then((response) => {
        console.log(response.data.user.data, "user");
        console.log(response.data.user.data.access_projects);
        if (response.data.user.data.access_projects.length > 0) {
          response.data.user.data.access_projects.forEach((element) => {
            fetchAccessProjects(element.project_id);
          });
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  const fetchAccessProjects = (id) => {
    axios
      .get(`api/v1/tb-onboarding/findProjects/${id}`, { headers })
      .then((response) => {
        console.log(response.data, "response response");
        setFindProjectData((findprojectdata) => [
          ...findprojectdata,
          response.data,
        ]);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  const fetchProjects = () => {
    axios
      .get(`api/v1/tb-onboarding/get-all-projects`, { headers })
      .then((response) => {
        console.log(response.data.project_list, "response response");
        setData(response.data.project_list);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  function handleClick(e, id) {
    console.log(id);
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
    };
    axios
      .get(`api/v1/tb-onboarding/get-tb/${id}`, { headers })
      .then((response) => {
        // dispatch({type: actionTypes.SET_RESTART,payload:'arr'})
        // dispatch({type: actionTypes.SET_NOTERESTART,payload:'arr'})
        console.log(response.data, "response response");
        dispatch({ type: actionTypes.SET_TB_ID, payload: response.data.tb_id });
        localStorage.setItem("project_id", response.data.project_id);
        axios
          .get(`api/v1/grouping/fs/${id}`, { headers })
          .then((res) => {
            console.log(res, "resoution resoution");
            console.log(res.data.fs_grp, "resoution");
            if (res.data.fs_grp === []) {
              return;
            }
            const gp_data = {};
            gp_data.grp = res.data.fs_grp;
            dispatch({
              type: actionTypes.SET_EDITSUBGROUPING,
              payload: gp_data,
            });
          })
          .catch((error) => {
            console.log(error.response, "error");
          });
        history.push(`/createProject/DataMapping/${id}`);
      })
      .catch((error) => {
        console.log(error.response, "error");
      swal("","Cannot found any TB inside this project","error");
      });
  }

  function handlelogout() {
    logout();
    props.history.push("/");
  }

  function handleClicks() {
    console.log("single clicked");
  }
  function handleDoubleClicks(dat) {
    console.log(dat, "Double clicked");
    setEdit(dat._id);
    setName(dat.project_name);
    // React.findDOMNode(this.nextComponent).focus()
  }
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const fd = new FormData();
      fd.append("project_name", name);
      axios
        .post(`api/v1/project/rename-project/${edit}`, fd, { headers })
        .then((res) => {
          console.log(res, "error");
          axios
            .get(`api/v1/tb-onboarding/get-all-projects`, { headers })
            .then((response) => {
              console.log(response.data.project_list, "response response");
              setData(response.data.project_list);
              swal("Project name changed!", {
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error.response, "error");
            });
          setEdit(null);
          setName(null);
        })
        .catch((err) => {
          console.log(err, "error");
          setEdit(null);
          setName(null);
        });
    }
  };

  function handleDelete(data) {
    console.log(data);
    // axios
    //   .get(`api/v1/tb-onboarding/get-tb/${data._id}`, { headers })
    //   .then((response) => {
    //     console.log(response.data, "response tbid  response");
    // setData(response.data.project_list)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to view the project",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // axios.get(`api/v1/project/delete-project/${response.data.project_id}/${response.data.tb_id}`,{headers})
        axios
          .get(`api/v1/project/delete-project/${data._id}`, { headers })
          .then((response) => {
            console.log(
              response.data,
              " delete response ---------------------------------"
            );
            //   dispatch(setCartAdded(response.data.product))
            axios
              .get(`api/v1/tb-onboarding/get-all-projects`, { headers })
              .then((response) => {
                console.log(response.data.project_list, "response response");
                setData(response.data.project_list);
              })
              .catch((error) => {
                console.log(error.response, "error");
              });
          })
          .catch((error) => {
            console.log(error.response, "error");
          });
        swal("","Project has been deleted!", {
          icon: "success",
        });
      } else {
        swal("","Project not deleted!","error");
        
      }
    });
    // })
    // .catch((error) => {
    //   console.log(error.response, "error");
    // });
  }

  function handleRename(id, projectName) {
    // console.log(data);
    setRenameProject(true);
    setRenameData({
      id: id,
      projectName: projectName,
    });
  }

  function handleRenameFolder(id, folderName) {
    console.log(folderName);
    setRenameFolder(true);
    setFolderId(id);
    setRenameFolderData({
      folderName: folderName,
    });
  }

  const handleClose = () => {
    setRenameProject(false);
    setClickFolder(false);
    setRenameFolder(false);
    setfolder(false);
    setShareProject(false);
    setRenameData({
      id: "",
      projectName: "",
    });
  };

  const handleProjectChange = (id, e) => {
    setRenameData({
      id: id,
      projectName: e.target.value,
    });
  };

  const handleRenameFolderChange = (id, e) => {
    setRenameFolderData({
      id: id,
      folderName: e.target.value,
    });
  };

  const handleUpdate = (id, e) => {
    console.log(e);

    console.log(renameData);
    const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };

    let data = {
      project_name: renameData.projectName,
    };

    console.log(headers);
    axios
      .post(`api/v1/project/rename-project/${id}`, data, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          setRenameProject(false);
          swal("", response.data.message, "success");
        }

        // history.push('/createProject/uploadTb')
      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });
  };

  const handleRenameUpdate = (e) => {
    let data = {
      folder_name: renameFolderData.folderName,
    };
    console.log(data);
    axios
      .patch(`api/v1/folder/rename-folder/${folderid}`, data, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          setRenameFolder(false);
          swal("", response.data.message, "success");
          fetchFolders();
        }

        // history.push('/createProject/uploadTb')
      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });
  };
  const handleUpdateFolder = (e) => {
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
          setfolder(false);
          fetchFolders();
          swal("", response.data.message, "success");
        }

        // history.push('/createProject/uploadTb')
      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });
  };
  const handleAddFolder = () => {
    setfolder(true);
  };

  const handleFolderDelete = (data) => {
    console.log(data);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to view the Folder",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .get(`api/v1/folder/delete-folder/${data._id}`, { headers })
          .then((response) => {
            console.log(response.data, "response tbid  response");
            fetchFolders();
          })
          .catch((error) => {
            console.log(error.response, "error");
          });
      } else {
        swal("", "Folder Not Deleted", "error");

      }
    });
  };

  const handleShareProject = (e, id) => {
    setShareProject(true);
    setProjectId(id);
  };

  const selected = (projects) => {
    const filteredProjects = projects.filter((p) => {
      console.log(p);
      if (p.project_id === projectId) {
        return p;
      }
    });

    console.log(filteredProjects);
    if (filteredProjects.length > 0) {
      if (filteredProjects[0].access === "Audit") {
        return { value: "Audit", label: "Audit Access" };
      } else if (filteredProjects[0].access === "View") {
        return { value: "View", label: "View access" };
      } else if (filteredProjects[0].access === "Edit") {
        return { value: "Edit", label: "Edit access" };
      } else {
        return;
      }
    } else {
      return "";
    }
  };

  const handleInvite = () => {
    if (error.email) {
      const auth = localStorage.getItem("auth_token");
      console.log(auth);
      let headers = {
        "x-auth-token": auth,
        "Content-Type": "application/json",
      };

      let data = {
        email: Value.email,
        project_id: projectId,
      };
      axios
        .post(`api/v1/auth/send-email`, data, { headers })
        .then((response) => {
          console.log(response, "response---------");
          if (response.status === 200) {
            setShareProject(false);
            // props.SetShareScreen(false);
            swal("", response.data.message, "success");
          }
        })
        .catch((error) => {
          seterror({ email: false, message: error.response.data.error });
          console.log(error.response.data.error, "error");
        });
    }
  };

  function handleChange(e, email) {
    console.log(e.target.value);
    setValue({ email: e.target.value });
  }

  const handleAccessChange = (e, email) => {
    console.log(email);
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };

    let data = {
      access: e.value,
      project_id: projectId,
      email: email,
    };
    axios
      .post(`api/v1/auth/userAcccess`, data, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          setShareProject(false);
          swal("", response.data.message, "success");
          setUpdate(true);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  console.log(data);

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
        <div style={button4}>
          <div
            style={{ width: "180px", marginLeft: "-150px" }}
            onClick={() => {
              handleAddFolder();
            }}
          >
            <Submit value="Create new folder" sm />
          </div>
        </div>
        <div style={button}>
          <div
            style={{ width: "180px" }}
            onClick={() => {
              history.push("/createProject/QuestionnaireNew");
            }}
          >
            {/* <Box
              sx={{
                // p: 2,
                bgcolor: "background.default",
                display: "grid",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Item>elevation</Item>
            </Box> */}
            <Submit value="Create new project" sm />
          </div>
        </div>
        {/* <div style={folderData}>
          <FolderOpenIcon
          style={{fontSize: "35px"}}
          onClick={()=>{
            history.push('/folders')
        }}
          ></FolderOpenIcon>
        </div> */}
        <div>
          <ViewCompactIcon
            titleAccess="Grid View"
            onClick={() => setDirectoryView("grid")}
            sx={{
              color: `${directoryView === "grid" ? "#03565A" : "#000"}`,
              fontSize: "2.7rem",
              cursor: "pointer",
            }}
          />

          <ReorderIcon
            onClick={() => setDirectoryView("list")}
            titleAccess="List View"
            sx={{
              color: `${directoryView === "list" ? "#03565A" : "#000"}`,
              fontSize: "2.3rem",
              cursor: "pointer",
            }}
          />
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
        {directoryView === "list" ? (
          <table
            style={{
              background: `${theme ? "" : "#363535"}`,
              color: `${theme ? "" : "#fff"}`,
            }}
          >
            <thead style={{}}>
              <tr
                style={{
                  backgroundColor: "#A2C0C2",
                  position: "sticky",
                  top: "0",
                  zIndex: "99",
                }}
              >
                <th
                  style={{
                    width: "50%",
                    height: "55px",
                    textAlign: "left",
                    paddingLeft: "2rem",
                    fontSize: "1rem",
                  }}
                >
                  Project Name
                </th>

                {/* <th style={{ width: "15%", fontSize: "1rem" }}>FS Type</th> */}
                <th style={{ width: "15%", fontSize: "1rem" }}>Year Ended</th>
                <th
                  style={{
                    width: "15%",
                    textAlign: "center",
                    fontSize: "1rem",
                    paddingLeft: "3rem",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((dat, i) => {
                if (dat._id === edit) {
                  return (
                    <tr style={{ backgroundColor: "rgba(3, 86, 90,0.4)" }}>
                      <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "start",
                          paddingLeft: "2rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            allignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <div>
                            <input
                              autoFocus={true}
                              style={inputBox}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              onKeyDown={handleKeyDown}
                              value={name}
                            />
                          </div>
                        </div>
                      </td>
                      {/* <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          paddingLeft: "2rem",
                        }}
                      >
                        {dat.type_fs}
                      </td> */}
                      <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          paddingLeft: "2rem",
                        }}
                      >
                        {dat.current_year.slice(0, 10)}
                      </td>
                      <td
                        style={{
                          color: "grey",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          cursor: "pointer",
                          paddingLeft: "2rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            allignItems: "center",
                          }}
                        >
                          {/* <div>{dat.project_name}</div> */}
                          <div
                            className="iconEnter"
                            style={{
                              marginLeft: "auto",
                              marginRight: "20px",
                              cursor: "pointer",
                              color: "grey",
                            }}
                            title="enter"
                            onClick={(e) => {
                              handleClick(e, dat._id);
                            }}
                          >
                            <i
                              style={{ transform: "scale(1.3)" }}
                              className="fas fa-sign-in-alt"
                            />
                          </div>
                          <div
                            style={{ marginRight: "20px", cursor: "pointer" }}
                            title="delete"
                            onClick={() => {
                              handleDelete(dat);
                            }}
                          >
                            <i
                              style={{ transform: "scale(1.3   )" }}
                              className="fas fa-trash-alt"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr>
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "start",
                        paddingLeft: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          allignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          if (e.detail === 1) handleClicks();
                          if (e.detail === 2) handleDoubleClicks(dat);
                        }}
                      >
                        <div>{dat.project_name}</div>
                      </div>
                    </td>
                    {/* <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      {dat.type_fs}
                    </td> */}
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      {dat.current_year.slice(0, 10)}
                    </td>
                    <td
                      style={{
                        color: "grey",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        cursor: "pointer",
                        paddingLeft: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          allignItems: "center",
                        }}
                      >
                        {/* share */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "-23px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="Share"
                          onClick={(e) => {
                            handleShareProject(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fa fa-share-alt"
                          />
                        </div>
                        {/* end share */}
                        {/* rename */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "-26px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="Rename"
                          onClick={(e) => {
                            handleRename(dat._id, dat.project_name);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fa fa-edit"
                          />
                        </div>
                        {/* end rename */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "20px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="enter"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fas fa-sign-in-alt"
                          />
                        </div>
                        <div
                          style={{ marginRight: "20px", cursor: "pointer" }}
                          title="delete"
                          onClick={() => {
                            handleDelete(dat);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            style={{ transform: "scale(1.2)" }}
                            whileHover={{
                              scale: 1.5,
                              color: "red",
                              transition: { duration: 0.1 },
                            }}
                            className="fas fa-trash-alt"
                          />

                          {/* <img src={trash}/> */}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {findprojectdata.map((dat, i) => {
                if (dat._id === edit) {
                  return (
                    <tr style={{ backgroundColor: "rgba(3, 86, 90,0.4)" }}>
                      <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "start",
                          paddingLeft: "2rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            allignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <div>
                            <input
                              autoFocus={true}
                              style={inputBox}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              onKeyDown={handleKeyDown}
                              value={name}
                            />
                          </div>
                        </div>
                      </td>
                      {/* <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          paddingLeft: "2rem",
                        }}
                      >
                        {dat.type_fs}
                      </td> */}
                      <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          paddingLeft: "2rem",
                        }}
                      >
                        {dat.current_year.slice(0, 10)}
                      </td>
                      <td
                        style={{
                          color: "grey",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          cursor: "pointer",
                          paddingLeft: "2rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            allignItems: "center",
                          }}
                        >
                          {/* <div>{dat.project_name}</div> */}
                          <div
                            className="iconEnter"
                            style={{
                              marginLeft: "auto",
                              marginRight: "20px",
                              cursor: "pointer",
                              color: "grey",
                            }}
                            title="enter"
                            onClick={(e) => {
                              handleClick(e, dat._id);
                            }}
                          >
                            <i
                              style={{ transform: "scale(1.3)" }}
                              className="fas fa-sign-in-alt"
                            />
                          </div>
                          <div
                            style={{ marginRight: "20px", cursor: "pointer" }}
                            title="delete"
                            onClick={() => {
                              handleDelete(dat);
                            }}
                          >
                            <i
                              style={{ transform: "scale(1.3   )" }}
                              className="fas fa-trash-alt"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr>
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "start",
                        paddingLeft: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          allignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          if (e.detail === 1) handleClicks();
                          if (e.detail === 2) handleDoubleClicks(dat);
                        }}
                      >
                        <div>{dat.project_name}</div>
                      </div>
                    </td>
                    {/* <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      {dat.type_fs}
                    </td> */}
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      {dat.current_year.slice(0, 10)}
                    </td>
                    <td
                      style={{
                        color: "grey",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        cursor: "pointer",
                        paddingLeft: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          allignItems: "center",
                        }}
                      >
                        {/* share */}
                        {/* <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "-23px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="enter"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fa fa-share-alt"
                          />
                        </div> */}
                        {/* end share */}
                        {/* rename */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "-26px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="Rename"
                          onClick={(e) => {
                            handleRename(dat._id, dat.project_name);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fa fa-edit"
                          />
                        </div>
                        {/* end rename */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "20px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="enter"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fas fa-sign-in-alt"
                          />
                        </div>
                        {/* <div
                          style={{ marginRight: "20px", cursor: "pointer" }}
                          title="delete"
                          onClick={() => {
                            handleDelete(dat);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            style={{ transform: "scale(1.2)" }}
                            whileHover={{
                              scale: 1.5,
                              color: "red",
                              transition: { duration: 0.1 },
                            }}
                            className="fas fa-trash-alt"
                          />
                        </div> */}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {folderValueData.map((fdat, i) => {
                return (
                  <tr>
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "start",
                        paddingLeft: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          allignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          if (e.detail === 1) handleClicks();
                          if (e.detail === 2) handleDoubleClicks(fdat);
                        }}
                      >
                        <div>{fdat.folder_name}</div>
                      </div>
                    </td>
                    {/* <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      Folder
                    </td> */}
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      &nbsp;
                    </td>

                    <td
                      style={{
                        color: "grey",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        cursor: "pointer",
                        paddingLeft: "2rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          allignItems: "center",
                        }}
                      >
                        {/* share */}

                        {/* end share */}
                        {/* rename */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "-80px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="Rename"
                          onClick={(e) => {
                            handleRenameFolder(fdat._id, fdat.folder_name);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fa fa-edit"
                          />
                        </div>
                        {/* end rename */}
                        <div
                          style={{
                            marginLeft: "auto",
                            marginRight: "20px",
                            cursor: "pointer",
                            color: "grey",
                          }}
                          title="enter"
                          onClick={(e) => {
                            history.push("/folder/" + fdat._id);
                            // handleClick(e, );
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{ transform: "scale(1.3)" }}
                            className="fas fa-sign-in-alt"
                          />
                        </div>
                        <div
                          style={{ marginRight: "20px", cursor: "pointer" }}
                          title="delete"
                          onClick={() => {
                            handleFolderDelete(fdat);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            style={{ transform: "scale(1.2)" }}
                            whileHover={{
                              scale: 1.5,
                              color: "red",
                              transition: { duration: 0.1 },
                            }}
                            className="fas fa-trash-alt"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Grid
            container
            rowSpacing={20}
            columnSpacing={{ xs: 1, sm: 2, md: 3, mt: 2 }}
          >
            {data.length > 0 &&
              data.map((dat, i) => (
                <Grid item xs={3}>
                  <Item>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {dat.project_name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {dat.type_fs}
                        </Typography>
                        <Typography variant="body2">
                          {dat.current_year.slice(0, 10)}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          color: "#000",
                          marginLeft: "38px",
                          paddingBottom: "20px",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fa fa-share-alt"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleRename(dat._id, dat.project_name);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fa fa-edit"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fas fa-sign-in-alt"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            handleDelete(dat);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fas fa-trash-alt"
                          />
                        </Button>
                      </CardActions>
                    </Card>
                  </Item>
                </Grid>
              ))}

            {findprojectdata.length > 0 &&
              findprojectdata.map((dat, i) => (
                <Grid item xs={3}>
                  <Item>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {dat.project_name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {dat.type_fs}
                        </Typography>
                        <Typography variant="body2">
                          {dat.current_year.slice(0, 10)}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          color: "#000",
                          marginLeft: "38px",
                          paddingBottom: "20px",
                        }}
                      >
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fa fa-share-alt"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleRename(dat._id, dat.project_name);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fa fa-edit"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleClick(e, dat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fas fa-sign-in-alt"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            handleDelete(dat);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fas fa-trash-alt"
                          />
                        </Button>
                      </CardActions>
                    </Card>
                  </Item>
                </Grid>
              ))}

            {folderValueData.length > 0 &&
              folderValueData.map((fdat, i) => (
                <Grid item xs={3}>
                  <Item>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {fdat.folder_name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Folder
                        </Typography>
                        <Typography variant="body2">&nbsp;</Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          color: "#000",
                          marginLeft: "60px",
                          paddingBottom: "20px",
                        }}
                      >
                        {/* <Button
                        size="small"
                        onClick={(e) => {
                          handleClick(e, fdat._id);
                        }}
                      >
                        <motion.i
                          whileFocus={{ scale: 1.2 }}
                          whileHover={{
                            scale: 1.5,
                            color: "green",
                            transition: { duration: 0.1 },
                          }}
                          style={{
                            transform: "scale(1.3)",
                            color: "rgb(128 128 128)",
                          }}
                          className="fa fa-share-alt"
                        />
                      </Button> */}
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleRename(fdat._id, fdat.folder_name);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fa fa-edit"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={(e) => {
                            handleClick(e, fdat._id);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fas fa-sign-in-alt"
                          />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            handleDelete(fdat);
                          }}
                        >
                          <motion.i
                            whileFocus={{ scale: 1.2 }}
                            whileHover={{
                              scale: 1.5,
                              color: "green",
                              transition: { duration: 0.1 },
                            }}
                            style={{
                              transform: "scale(1.3)",
                              color: "rgb(128 128 128)",
                            }}
                            className="fas fa-trash-alt"
                          />
                        </Button>
                      </CardActions>
                    </Card>
                  </Item>
                </Grid>
              ))}
          </Grid>
        )}

        <Modal
          open={renameProject}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 811 }}>
            <div>
              <h2 id="child-modal-title">Rename Project Name</h2>
              <p>Rename of the project</p>
              <input
                placeholder="Enter name.."
                className="form-control"
                onChange={(e) => handleProjectChange(renameData.id, e)}
                value={renameData.projectName}
              ></input>
            </div>
            <div className="col-md-12 row text-right mt-4" style={update}>
              <div
                className="col-md-6"
                style={{ width: "100px" }}
                onClick={(e) => {
                  handleUpdate(renameData.id, e);
                }}
              >
                <Submit value="Update" sm />
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

        {/* <Modal
            open={clickFolder}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 811 }}>
              <div>
                <h2 id="child-modal-title">CHOOSE FOLDER NAME</h2>
                <p>Choose Foder Name</p>
                  <Select placeholder='Select Folder' options={folder}
                      // onChange={(e) =>handleChange('companyNature',e)}      
                    theme={theme => ({
                            ...theme,
                            borderRadius: '6px',
                            colors: {
                                ...theme.colors,
                                primary25: '#03565a98',
                                primary: '#03565A',
                            },
                    })}/>
              </div>
              <div className="col-md-12 row text-right mt-4" style={update}>
                <div
                  className="col-md-6"
                  style={{ width: "100px" }}
                  // onClick={(e) => {
                  //   handleUpdate(renameData.id, e);
                  // }}
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
        </Modal> */}

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
                  handleUpdateFolder(e);
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

        {/* rename folder */}
        <Modal
          open={renamefolder}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 811 }}>
            <div>
              <h2 id="child-modal-title">Rename Folder Name</h2>
              <p>Rename of the folder</p>
              <input
                placeholder="Enter name.."
                className="form-control"
                onChange={(e) =>
                  handleRenameFolderChange(renameFolderData.id, e)
                }
                value={renameFolderData.folderName}
              ></input>
            </div>
            <div className="col-md-12 row text-right mt-4" style={update}>
              <div
                className="col-md-6"
                style={{ width: "100px" }}
                onClick={(e) => {
                  handleRenameUpdate(renameFolderData.id, e);
                }}
              >
                <Submit value="Update" sm />
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

        {/* share project */}
        <Modal
          open={shareProject}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 811 }}>
            <div>
              <div style={{ display: "flex" }}>
                <div>
                  <h2 style={header1}>Share Project</h2>
                  <p style={para}>
                    Give permision to your team members to edit <br />
                    or view the same project.
                  </p>
                </div>
              </div>
              <div
                style={mail}
                className={`${
                  access.access === "View" ? "disabled-table" : ""
                }`}
              >
                <div style={{ flex: "3" }}>
                  <p style={para2}>
                    Add Email Address Here<span style={span}>*</span>
                  </p>
                  <input
                    type="text"
                    style={input}
                    placeholder="Enter Email..."
                    onChange={(e) => handleChange(e, Value.email)}
                    name="email"
                    value={Value.email}
                  ></input>
                  <span>
                    <p style={error_message}>
                      {error.email ? "" : error.message}
                    </p>
                  </span>
                </div>
                <div style={submit} onClick={handleInvite}>
                  <Submit value="Send Invite" sm />
                </div>
              </div>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "lightgrey",
                  margin: "1rem",
                }}
              ></div>
              <div style={list} id="list">
                {setprofile.length > 0 &&
                  setprofile.map((user, index) => (
                    <div
                      style={{ display: "flex", marginBottom: "1rem" }}
                      key={index}
                    >
                      <div style={profilePic}>
                        {user.email.slice(0, 1).toUpperCase()}
                      </div>
                      <div style={{ marginLeft: "15px" }}>
                        <p style={name}>{user.email}</p>
                        <p style={email}>
                          user ({user.email_verification_status})
                        </p>
                      </div>
                      <div style={{ width: "10rem", marginLeft: "auto" }}>
                        <Select
                          className={`${
                            access.access === "View" ? "disabled-table" : ""
                          }`}
                          placeholder="Select option"
                          options={options}
                          defaultValue={selected(user.access_projects)}
                          value={Value.companyNature}
                          onChange={(e) => handleAccessChange(e, user.email)}
                          theme={(theme) => ({
                            ...theme,
                            outline: "none",
                            border: "1px solid white",
                            // borderRadius: '6px',
                            width: "100%",
                            colors: {
                              ...theme.colors,
                              primary25: "#03565a98",
                              primary: "#03565A",
                            },
                          })}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
