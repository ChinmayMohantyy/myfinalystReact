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
import { useParams } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "../dashboard/dashboard.css";
import { ViewContext } from "../../helper/DarkModeContext";
import Grid from "@mui/material/Grid";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { ThemeContext } from "../../helper/DarkModeContext";
import { AccessProjectContext } from "../../helper/DarkModeContext";



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
const span = {
  color: "rgba(207, 7, 7, 0.815) ",
};
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

const folderData = {
  marginRight: "9px",
  cursor:"Pointer",
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
const email = {
  fontSize: "13px",
  fontWeight: "500",
  margin: "0 0 0 0",
  color: "black",
};
const list = {
  // backgroundColor:'white',
  maxHeight: "176px",
  overflowY: "scroll",
  paddingRight: "10px",
  paddingTop: "2px",
};
const para = {
  fontSize: "15px",
  fontWeight: "400",
  marginTop: "0px",
  color: "#696F79",
};
const submit = {
  width: "8rem",
  height: "3rem",
  flex: "1",
  paddingLeft: "10px",
  marginTop: "30px",
};
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
}));
const initialErrors = { email: false, message: "Must be a valid email" };
const AddFiles = (props) => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [name, setName] = useState(null);
  const [renameProject, setRenameProject] = useState(false);
  const [setfile, setFile] = useState(false);
  const [setgetfile,setGetFile] = useState([]);
  const [setgetproject,setGetProject] = useState([]);
  const [clickFolder, setClickFolder] = useState(false);
  const [renameData, setRenameData] = useState({
    id: "",
    name: "",
  });
  const [folder, setfolder] = useState([])
  const { directoryView, setDirectoryView } = useContext(ViewContext);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  let history = useHistory();
  const auth = localStorage.getItem("auth_token");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };
  const { access, setAccess } = useContext(AccessProjectContext);
  const [shareProject, setShareProject] = useState(false);
  const [projectId,setProjectId]=useState(0);
  const [isUpdate,setUpdate]=useState(false);
  const options = [
    { value: "Edit", label: "Edit access" },
    { value: "Audit", label: "Audit Access" },
    { value: "View", label: "View access" },
    { value: "Remove", label: "Remove" },
  ];
  const [error, seterror] = useState(initialErrors);
  const [Value, setValue] = useState({ email: "" });
  const [valid, setValid] = useState(false);
  const [setprofile, setProfileData] = useState([]);

  console.log(props.location.pathname);
  let y = props.location.pathname;
  let z = y.split("/")
  let c = z[2];
  console.log(c);
  useEffect(() => {
    setfolder([])
    axios
      .get(`api/v1/tb-onboarding/get-all-projects`, { headers })
      .then((response) => {
        console.log(response.data.project_list, "response response");
        setData(response.data.project_list);
        response.data.project_list.forEach(element => {
            console.log(element);
            setfolder(folder=>[...folder,{value:element.project_name,label:element.project_name}])
        });
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  }, [renameProject]);

  useEffect(() => {
    fetchFoldersData()
    activateUser()
    validation()
  },[isUpdate])

  const fetchFoldersData=()=>{
    axios
    .get(`api/v1/folder/get-all-folders/`, { headers })
    .then((response) => {
      console.log(response.data.getFolder.filter( i => i._id == c), "response response");
      let folderProject = response.data.getFolder.filter( i => i._id == c);
      console.log(folderProject);
      setUpdate(false)
      // setGetProject(response.data.getFolder.filter( i => i._id == c))
      // setData(response.data.project_list);
      folderProject.forEach(element => {
          console.log(element.line_items);
      setGetProject(element.line_items)

      });
    })
    .catch((error) => {
      console.log(error.response, "error");
    });
  }
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
      swal("Cannot found any TB inside this project");
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
        swal("Project has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Project not deleted!");
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

  const handleClose = () => {
    setRenameProject(false);
    setClickFolder(false);
    setShareProject(false);
    setRenameData({
      id: "",
      projectName: "",
    });
    setFile(false);
  };

  const handleProjectChange = (id, e) => {
    setRenameData({
      id: id,
      projectName: e.target.value,
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

  const handleAddFile = () => {
    setFile(true);

  }

  const handleSave = () => {
    let id = c;
    console.log(id);
    console.log(setgetfile);
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    let data = {
      setgetfile: setgetfile,
      Fid: id
    }


    console.log(data);

    axios
      .post(`api/v1/folder/update-folder/${id}`, data, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          setFile(false);
          swal("", response.data.message, "success");
        }
        fetchFoldersData();

      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });

  };

  const handleChange=(e)=>{
    console.log(e);
    if(e.length > 0){
      
    e.forEach(element => {
      data.forEach(data => {
        if(data.project_name === element.value){

          // let arr = setgetfile.filter(function(item) {
          //   return item.project_name !== element.value
          // })

          // console.log(arr);





          const found = setgetfile.find(f=>f.project_name === element.value);
          console.log(found);
          if(!found){
          setGetFile(setgetfile=>[...setgetfile,data])
          }
        }
      });
    });
  }else{
    setGetFile([])
  }


    console.log(data);
  }
  
  const handleShareProject = (e,id) => {
    setShareProject(true);
    setProjectId(id)
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
  const handleAccessChange=(e,email)=>{
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
          setUpdate(true)
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

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

    const handleChangeEmail = (e) => {
      console.log(e.target.value);
    setValue({email: e.target.value });
    }
  return (
    <div style={container}>
      <div style={header}>
        <div
          style={dname}
          className="back"
          onClick={() => {
            history.push("/createfinancialstatement");
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
                handleAddFile();
            }}
          >
            <Submit value="Add Files" sm />
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
          <table
           style={{
            background: `${theme ? "" : "#363535"}`,
            color:`${theme ? "" : "#fff"}`
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

                <th style={{ width: "15%", fontSize: "1rem" }}>FS Type</th>
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
              {setgetproject.map((dat, i) => {
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
                      <td
                        style={{
                          color: "black",
                          fontSize: "1rem",
                          fontWeight: "500",
                          textAlign: "center",
                          paddingLeft: "2rem",
                        }}
                      >
                        {dat.type_fs}
                      </td>
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
                    <td
                      style={{
                        color: "black",
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        paddingLeft: "2rem",
                      }}
                    >
                      {dat.type_fs}
                    </td>
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
                          // onClick={(e) => {
                          //   handleClick(e, dat._id);
                          // }}
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
            </tbody>
          </table>

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

        <Modal
            open={setfile}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 811 }}>
              <div>
                <h2 id="child-modal-title">CHOOSE FOLDER NAME</h2>
                <p>Choose Folder Name</p>
                  <Select placeholder='Select Folder' options={folder}  isMulti
                      onChange={(e) =>handleChange(e)}      
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
                  onClick={(e) => {
                    handleSave(e);
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
                className={`${access.access === "View" ? "disabled-table" : ""}`}
              >
                <div style={{ flex: "3" }}>
                  <p style={para2}>
                    Add Email Address Here<span style={span}>*</span>
                  </p>
                  <input
                    type="text"
                    style={input}
                    placeholder="Enter Email..."
                    onChange={(e) => handleChangeEmail(e, Value.email)}
                    name="email"
                    value={Value.email}
                  ></input>
                  <span>
                    <p style={error_message}>{error.email ? "" : error.message}</p>
                  </span>
                </div>
                <div style={submit} 
                onClick={handleInvite}
                >
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
                          <p style={email}>user ({user.email_verification_status})</p>
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

export default AddFiles;
