import React, { useEffect, useState } from "react";
import "./setUpProject.css";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import date from "../../assets/date.svg";
import sidebar1 from "../../assets/sidebar-1.svg";
import tick from "../../assets/confirmTb.svg";
import folder from "../../assets/folder.svg";
import bin from "../../assets/delete.svg";
import AssignValues from "./AssignValues";
import AssignSheet from "./AssignSheet";
import { Kutton, Submit } from "../../Components/Button";
import FileFormat from "../../Components/fileFormat/FileFormat";
import UploadMethod from "../../Components/uploadMethod/UploadMethod";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import swal from "sweetalert";

// | file.type === '.csv' | file.type === ' application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const UploadTb = () => {
  const dispatch = useDispatch();
  const PROJECT_DATA = useSelector((state) => state.reducer.projectData);
  const SHEET_DATA = useSelector((state) => state.reducer.sheetData);
  const TB_ID = useSelector((state) => state.reducer.tb_id);
  let history = useHistory();
  const [Data, setData] = useState([]);
  const [File, setFile] = useState([]);
  const [Highlighted, setHighlighted] = useState("");
  const [show, setShow] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [info, setinfo] = useState([]);
  const [confirm, setConfirm] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [index, setIndex] = useState("");
  const [viewFormat, setViewFormat] = useState(false);
  const [uploadMethod, setUploadMethod] = useState(true);
  const [method, setMethod] = useState("");
  const [v, setV] = useState();

  const checker = confirm.every((v) => v === true);
  console.log(method, " confirm ------------------ state");
  console.log(projectData, " confirm ------------------ state");
  console.log(File, "the state");
  useEffect(() => {
    console.log(TB_ID, "tb_id tb_id tb_id tb_id ");
  }, [TB_ID]);
  console.log(TB_ID, "tb_id tb_id tb_id tb_id ");

  function handleModal(dat, index) {
    if (method === "MultiFile") {

      console.log(projectData, "project data here");
      console.log(index);
      const project_id = localStorage.getItem("project_id");
      const temp_id = projectData[index].data.tmp_id;
      console.log(temp_id, "chiiiiiiiiiiiiiiii");
      const auth = localStorage.getItem("auth_token");
      let headers = {
        "x-auth-token": auth,
        // 'Content-Type' : 'application/json'
      };
      axios
        .get(
          `/api/v1/tb-mapping/heading-classification/${project_id}/${temp_id}`,
          { headers }
        )
        .then((response) => {
          console.log("response ====================",response.data);
          setHeaders(response.data.headers_list);
          setinfo(dat);
          setIndex(index);
          setShow(!show);
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    }

    if (method === "MultiSheet") {
      setShowSheet(!showSheet);
      setIndex(index);
    }
  }

  function fileDelete(dat, index) {
    console.log(dat[0].name, "here");
    const arr = Data.filter((item) => dat[0].name != item[0].name);
    setData(arr);
    let resultArr = projectData.filter((_, i) => {
      return index !== i;
    });
    setProjectData(resultArr);
    let deleteValid = confirm.filter((_, i) => {
      return index !== i;
    });
    setConfirm(deleteValid);
    console.log(arr, "arr here");
  }

  function saveProjectData(data) {
    let copiedArr = [...projectData];
    copiedArr.push(data);
    setProjectData(copiedArr);
    dispatch({ type: actionTypes.SET_PROJECT_DATA, payload: copiedArr });
    console.log(copiedArr, "projectdata=========================");
  }

  function handleDrop(e) {
    console.log(e.dataTransfer.files);
    setHighlighted(false);
    // const fileListAsArray = Array.from(e.dataTransfer.files)
    e.preventDefault();
    const fileListAsArray = Array.from(e.dataTransfer.files);
    if (
      (fileListAsArray[0].type === "application/vnd.ms-excel") |
      (fileListAsArray[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setData((Data) => [...Data, fileListAsArray]);
      setConfirm((confirm) => [...confirm, false]);
      const auth = localStorage.getItem("auth_token");
      let headers = {
        "x-auth-token": auth,
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      };
      const project_id = localStorage.getItem("project_id");
      const fd = new FormData();
      fd.append("file", fileListAsArray[0]);
      // for (var data of fd) {
      //     console.log(data);
      //   }
      if (method === "MultiFile") {
        axios
          .post(`/api/v1/uploads/upload-tb/${project_id}`, fd, { headers })
          .then(({ data }) => {
            console.log("helllo");
            console.log(data, "data");
            saveProjectData(data);
          })
          .catch((error) => {
            console.log(error.response, "error");
            console.log(error, "error");
          });
      }
      if (method === "MultiSheet") {
        console.log("MultiSheet");
        axios
          .post(`/api/v1/uploads/upload-tb-multiple-Sheets/${project_id}`, fd, {
            headers,
          })
          .then(({ data }) => {
            console.log(data, "data");
            let copiedArr = [...projectData];
            copiedArr.push(data);
            setProjectData(copiedArr);
            saveProjectData(data);
          })
          .catch((error) => {
            console.log(error.response, "error");
          });
      }
    }
  }

  function handleSubmit() {
    if (checker && confirm.length > 0) {
      const checker = confirm.every((v) => v === true);
      const auth = localStorage.getItem("auth_token");
      let headers = {
        "x-auth-token": auth,
        // 'Content-Type' : 'application/json'
      };
      const project_id = localStorage.getItem("project_id");
      axios
        .get(`/api/v1/tb-mapping/get-tb/${project_id}`, { headers })
        .then((response) => {
          console.log(response.data, "response after tb upload");
          dispatch({
            type: actionTypes.SET_TB_ID,
            payload: response.data.tb_id,
          });
          history.push(`/createProject/DataMapping/${project_id}`);
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    }
    if (confirm.length === 0 || !checker) {
      swal(
        "",
        "Upload a file and map the header to move to next step",
        "warning"
      );
    }

    console.log(checker, "true or false validation");
    // if(checker & confirm.length > 0 ){
    //     console.log(projectData,'pdata here,,,,,,,,,,,,,,,,,,,,')
    //     history.push('/createProject/DataMapping')
    //     // axios.get(`api/v1/tb-mapping/conventional-mode/${project_id}/${TB_ID}`,{headers})
    //     // .then(response => {
    //     //     console.log(response.data,'response after tb upload')
    //     //   })
    //     //   .catch(error =>{
    //     //       console.log(error.response,'error')
    //     //   }
    //     //     )

    // }
  }
  console.log(checker, "checker here");

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  function handleChange(e) {
    console.log(e);
    console.log(e.target.files);
    console.log(method);
    e.preventDefault();
    const fileListAsArray = e.target.files;
    if (
      (fileListAsArray[0].type === "application/vnd.ms-excel") |
      (fileListAsArray[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      setData((Data) => [...Data, fileListAsArray]);
      setConfirm((confirm) => [...confirm, false]);
      const auth = localStorage.getItem("auth_token");
      let headers = {
        "x-auth-token": auth,
        // "Content-Type": "multipart/form-data",

        "Content-Type": "application/json",
      };
      const project_id = localStorage.getItem("project_id");
      const data = new FormData();
      // data.append("name", "sankar");
      data.append("file", fileListAsArray[0]);

      // let fd = {
      //   file: fileListAsArray[0],
      // };

      console.log(data);
      if (method === "MultiFile") {
        console.log("dj dipak");
        axios
          .post(`/api/v1/uploads/upload-tb/${project_id}`, data, { headers })
          .then((data) => {
            console.log("hello multi");
            console.log(data, "data");
            setProjectData(data);
            saveProjectData(data);
          })
          .catch((error) => {
            console.log(error.data, "error");
            console.log(error.response, "error");
            console.log(error, "error");
          });
      }
      if (method === "MultiSheet") {
        axios
          .post(
            `/api/v1/uploads/upload-tb-multiple-Sheets/${project_id}`,
            data,
            {
              headers,
            }
          )
          .then(({ data }) => {
            console.log(data, "data");
            let copiedArr = [...projectData];
            copiedArr.push(data);
            setProjectData(copiedArr);
            saveProjectData(data);
          })
          .catch((error) => {
            console.log(error.response, "error");
          });
      }
    }
  }

  console.log(Data, "=============y========");

  return (
    <div className="containerQuestionnaire">
      {viewFormat ? <FileFormat setViewFormat={setViewFormat} /> : null}
      {uploadMethod && (
        <UploadMethod
          setUploadMethod={setUploadMethod}
          setViewFormat={setViewFormat}
          setMethod={setMethod}
        />
      )}
      {showSheet && (
        <AssignSheet
          setShowSheet={setShowSheet}
          index={index}
          confirm={confirm}
          setConfirm={setConfirm}
          projectData={projectData}
          info={info}
        />
      )}
      {show && (
        <AssignValues
          show={show}
          setShow={setShow}
          info={info}
          index={index}
          confirm={confirm}
          setConfirm={setConfirm}
          projectData={projectData}
          headers={headers}
        />
      )}

      <div className="track">
        <div className="progressBar">
          <div className="vector-2"></div>
          <div className="progressRoute">
            <div className="track1">
              <h4>Project Creation</h4>
              <p>
                fill basic details for creating <br />a project
              </p>
            </div>
            <div className="track1">
              <h4>File Upload</h4>
              <p>
                Upload individual or multiple <br />
                Trial Balance
              </p>
            </div>
            <div className="track1">
              <h4>Data Mapping</h4>
              <p>
                Map feneral Ledgers to financial <br />
                Statement
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Form>
          <div className="">
              <Form.File id="formcheck-api-custom" custom>
              <Form.File.Input  />
              <div className="class" style={{backgroundColor:'red',height:'100vh',width:'30px'}}></div>

              <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
              </Form.File>
          </div>
      </Form> */}
      <div className="main" style={{ padding: "4rem 9rem" }}>
        <div className="header" style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "5px" }}>Upload Trial Balances</h1>
        </div>
        <div className="suffix-format">
          File you upload must contain Ledger code, ledger name, and current
          year amount.
        </div>
        <div className="sufix-small">
          <p
            style={{
              color: "var(--clr-accent)",
              margin: "0",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => {
              setViewFormat(true);
            }}
          >
            click here
          </p>
          <p style={{ margin: "0rem", fontSize: "1rem", marginLeft: "10px" }}>
            {" "}
            to view the format
          </p>
        </div>
        {Data.length == 0 && (
          <div
            onClick={() => {
              setUploadMethod(true);
            }}
            style={{
              cursor: "pointer",
              marginTop: "20px",
              textAlign: "right",
              fontWeight: "500",
              color: "var(--clr-accent)",
              textDecoration: "underline",
            }}
          >
            change upload mode
          </div>
        )}
        <div
          className="DnD"
          style={{ backgroundColor: Highlighted }}
          onDragEnter={() => {
            setHighlighted("#e9ebf0");
          }}
          onDragLeave={() => {
            setHighlighted("");
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleDrop}
        >
          <div className="folder" onClick={handleClick}>
            <img src={folder} alt="folder" />
            <input
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
          <h3>Upload files here to prepare financial statements</h3>
          <p>
            Note: File must contain Ledger Code, Ledger Name, Net Balance for
            Current Year
          </p>
        </div>
        <div style={{ marginTop: "2rem" }}>
          {Data.map((dat, index) => {
            return (
              <div className="file-show" key={index}>
                <div>
                  <img
                    src={bin}
                    alt="bin"
                    onClick={() => {
                      fileDelete(dat, index);
                    }}
                  ></img>
                </div>
                <div
                  style={{
                    marginLeft: "1rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      margin: "0",
                    }}
                  >
                    {dat[0].name}
                  </h4>
                  {/* <p style={{fontSize:'0.9rem',marginTop:'0px',color:'var(--clr-font-semi)'}}>Upload Complete</p> */}
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    alignItems: "center",
                    color: "var(--clr-accent)",
                  }}
                >
                  {confirm[index] ? (
                    <img src={tick} style={{ marginTop: "10px" }} alt="tick" />
                  ) : (
                    <p
                      style={{
                        fontWeight: "700",
                        cursor: "pointer",
                        margin: "0",
                      }}
                      onClick={() => handleModal(dat, index)}
                    >
                      {method === "MultiSheet" ? (
                        <Submit sm variant="secondary" value="Select columns" />
                      ) : (
                        <Submit sm variant="secondary" value="Select columns" />
                      )}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className='upload-TB'  ><input type="submit" value="Continue"  onClick={() => { history.push('/createProject/DataMapping') }}/></div> */}
        <div
          className="upload-TB"
          onClick={() => {
            handleSubmit();
          }}
        >
          {checker & (confirm.length > 0) ? (
            <Submit value="Continue" />
          ) : (
            <Submit disable value="Continue" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTb;
