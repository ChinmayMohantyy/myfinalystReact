import React, { useState, useEffect, useContext } from "react";
import { Submit } from "../Button";
import Select from "react-select";
import { motion } from "framer-motion";
import swal from "sweetalert";
import axios from "axios";
import "./share.css";
import { color } from "@mui/system";
import { useParams } from "react-router-dom";
import { AccessProjectContext } from "../../helper/DarkModeContext";

const initialErrors = { email: false, message: "Must be a valid email" };
const ShareScreen = (props) => {
  const [error, seterror] = useState(initialErrors);
  const [valid, setValid] = useState(false);
  const [Value, setValue] = useState({ email: "" });
  const [setprofile, setProfileData] = useState([]);

  const { access, setAccess } = useContext(AccessProjectContext);

  const screen = {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "999",
    backgroundColor: "#00000036",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };
  const container = {
    width: "50%",
    minHeight: "40vh",
    borderRadius: "10px",
    maxHeight: "70vh",
    minWidth: "560px",
    padding: "2rem",
    zIndex: "15",
    backgroundColor: "#F1F2F5",
  };

  const header = {
    fontSize: "2rem",
    fontWeight: "600",
  };
  const para = {
    fontSize: "15px",
    fontWeight: "400",
    marginTop: "0px",
    color: "#696F79",
  };
  const mail = {
    minHeight: "4rem",
    marginTop: "1rem",
    display: "flex",
    width: "100%",
  };

  const para2 = {
    fontSize: "13px",
    fontWeight: "600",
    margin: "0 0 2px 0",
    color: "var(--clr-font-mid)",
  };
  const name = {
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 0 0",
    color: "var(--clr-font-mid)",
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

  const span = {
    color: "rgba(207, 7, 7, 0.815) ",
  };

  const submit = {
    width: "3rem",
    height: "3rem",
    flex: "1",
    paddingLeft: "10px",
    marginTop: "30px",
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
  const error_message = {
    color: "red",
  };

  const projectId = useParams();

  const options = [
    { value: "Edit", label: "Edit access" },
    { value: "Audit", label: "Audit Access" },
    { value: "View", label: "View access" },
    { value: "Remove", label: "Remove" },
  ];
  useEffect(() => {
    validation();
    console.log(valid);
  }, [Value]);

  useEffect(() => {
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
  }, []);

  function handleClick() {
    props.SetShareScreen(false);
  }
  function handleClose(e) {
    if (e.target.classList.contains("screenDiv")) {
      props.SetShareScreen(false);
    }
  }

  const handleInvite = () => {
    if (error.email) {
      console.log("jsjs");
      console.log(Value);
      console.log(props);
      const auth = localStorage.getItem("auth_token");
      console.log(auth);
      let headers = {
        "x-auth-token": auth,
        "Content-Type": "application/json",
      };

      let data = {
        email: Value.email,
        project_id: props.projectid,
      };
      axios
        .post(`api/v1/auth/send-email`, data, { headers })
        .then((response) => {
          console.log(response, "response---------");
          if (response.status === 200) {
            props.SetShareScreen(false);
            swal("", response.data.message, "success");
          }
        })
        .catch((error) => {
          seterror({ email: false, message: error.response.data.error });
          console.log(error.response.data.error, "error");
        });
    }
  };

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

  function handleChange(e, email) {
    console.log(e.value);
    // setValue({ ...Value, [e.target.label]: e.target.value });
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    console.log(project_id);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };

    let data = {
      access: e.value,
      project_id: project_id,
      email: email,
    };
    axios
      .post(`api/v1/auth/userAcccess`, data, { headers })
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          props.SetShareScreen(false);
          swal("", response.data.message, "success");
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }

  const selected = (projects) => {
    const filteredProjects = projects.filter((p) => {
      console.log(p);
      if (p.project_id === projectId.pid) {
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

  console.log(props.projectid);
  return (
    <motion.div
      style={screen}
      className="screenDiv"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={container}
        className="col-md-4 col-sm-6"
        initial={{ y: "-5vh" }}
        animate={{ y: 0 }}
      >
        <div style={{ display: "flex" }}>
          <div>
            <h2 style={header}>Share Project</h2>
            <p style={para}>
              Give permision to your team members to edit <br />
              or view the same project.
            </p>
          </div>
          <div style={{ paddingTop: "13px", marginLeft: "auto" }}>
            <h5
              style={{
                color: "var(--clr-accent)",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClick();
              }}
            >
              Close
            </h5>
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
              onChange={handleChange}
              name="email"
              value={Value.email}
              //  onChange={(e)=>{handleChange('LedgerCode',e)}}
              // onChange={(e) => {setValue({...value,['projectName']:e.target.value})}}
            ></input>
            <span>
              <p style={error_message}>{error.email ? "" : error.message}</p>
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
                    // value={user.access_projects.filter(
                    //   (option) =>
                    //     "View access" === "View access" &&
                    //     option.project_id === projectId.pid
                    // )}
                    // value={Value.companyNature}
                    onChange={(e) => handleChange(e, user.email)}
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
      </motion.div>
    </motion.div>
  );
};

export default ShareScreen;
