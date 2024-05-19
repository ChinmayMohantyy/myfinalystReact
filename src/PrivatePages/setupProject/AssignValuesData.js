import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./setUpProject.css";
import { Submit } from "../../Components/Button";
import Select from "react-select";
import axios from "axios";
import { motion } from "framer-motion";
import swal from "sweetalert";
import Box from "@mui/material/Box";

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
const inputBox = {
  color: "black",
  fontSize: "1rem",
  fontWeight: "500",
  textAlign: "left",
  border: "none",
  width: "100%",
  backgroundColor: "rgba(0,0,0,0)",
};
function AssignValuesData(props) {
  //   let init = {
  //     LedgerCode: "",
  //     currentBalance: "",
  //     ledgerName: "",
  //     previousBalance: "",
  //     tbAmount: "",
  //   };
  const [show, setShow] = useState(false);
  //   const [Name, setName] = useState(init);
  const [temp, setTemp] = useState([]);
  const [info, setInfo] = useState([]);
  // const [valid, setValid] = useState(false)
  const [valid, setValid] = useState(true);
  const [option, setOption] = useState([]);
  const [ledgerNameOption, setLedgerNameOption] = useState([]);
  const [currentOption, setCurrentOption] = useState([]);
  const [previousOption, setPreviousOption] = useState([]);
  const [newcolumn, serNewColumn] = useState(false);
  // const [options, setOptions] = useState([])
  const [columnname, setColumnName] = useState({
    columnname: "",
  });
  const i = props.index;
  const fileData = props.projectData;
  console.log(fileData, "all the files data");
  console.log(props.index, "index");
  console.log(info, "info here man");
  let header = props.headers;
  console.log(
    props.headers,
    "headers heresssssssssssssssssssssssssssssssssssssssssss"
  );

  const units = [
    { value: "Whole Numbers", label: "Whole Numbers" },
    // { value: 'Tens', label: 'Tens' },
    { value: "Hundreds", label: "Hundreds" },
    { value: "Thousands", label: "Thousands" },
    { value: "Lakhs", label: "Lakhs" },
    { value: "Crores", label: "Crores" },
  ];

  useEffect(() => {
    setOption([]);
    console.log(props.headers, "headerssssssssssss");
    props.headers.map((val) => {
      // setOption(...option,{ 'value': val , 'label':             val })
      setOption((option) => [...option, { value: val, label: val }]);
      // setOptions(options => [...options,{ 'value': val ,'label': val }])
    });
  }, []);

  const handleSelect = (field, e) => {
    props.setName({ ...props.Name, [field]: e.value });
    if (field === "LedgerCode") {
      const res = option.filter((line) => {
        if (!(line.value === e.value)) {
          return line;
        }
      });
      setLedgerNameOption(res);
      // setCurrentOption([])
    } else if (field === "ledgerName") {
      const res = ledgerNameOption.filter((line) => {
        if (!(line.value === e.value)) {
          return line;
        }
      });
      setCurrentOption(res);
      // setPreviousOption([])
    } else if (field === "currentBalance") {
      const res = currentOption.filter((line) => {
        if (!(line.value === e.value)) {
          return line;
        }
      });
      setPreviousOption(res);
    }
  };

  function handleValid() {
    let arr = Object.values(props.Name);
    const obj = arr;

    console.log(obj);
    console.log(props.Name);
    //    let key = Object.Keys(Name)

    if (props.Name.LedgerCode === "" && props.Name.ledgerName === "") {
      setValid(false);
      return;
    } else if (props.Name.LedgerCode === "" || props.Name.ledgerName === "") {
      setValid(true);
    }

    if (
      props.Name.currentBalance === "" ||
      props.Name.previousBalance === "" ||
      props.Name.tbAmount.includes === ""
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
    console.log(obj, "valid lalal");
    console.log(props.Name, "Name valid lalal");
    // console.log(key,'valid')
  }
  console.log(valid, "valid");
  useEffect(() => {
    let obj = Object.values(props.Name);
    let headers = header.filter((item) => !obj.includes(item));
    setTemp(headers);
    console.log(props.Name, "this is name");
    handleValid();
  }, [props.Name]);

  function handleNewInput() {
    if (newcolumn === true) {
      serNewColumn(false);
    } else {
      serNewColumn(true);
    }
  }

  function handleModal() {
    console.log("clicked");
    setShow(false);
    props.setShow(false);
  }

  useEffect(() => {
    // console.log('inside the usestate', props.Show)
    setShow(props.show);
    setInfo(props.info);
    console.log(props.info, "file data");
  }, [props.show]);

  const handleNewColumn = (e) => {
    console.log(e);
    setColumnName({ columnname: e });
  };
  const handleNewColumnUpdate = () => {
    const auth = localStorage.getItem("auth_token");
    console.log(auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    const project_id = localStorage.getItem("project_id");
    const temp_id = fileData[i]["tmp_id"];
    let data = {
      column_name: columnname.columnname,
    };
    axios
      .post(
        `api/v1/tb-mapping/upload-column-name/${project_id}/${temp_id}`,
        data,
        { headers }
      )
      .then((response) => {
        console.log(response, "response---------");
        if (response.status === 200) {
          serNewColumn(false);
          swal("", response.data.message, "success");
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });
  };

  console.log(columnname);
  return (
    <div className="Map">
      <Modal
        show={show}
        aria-labelledby="example-modal-sizes-title-lg"
        dialogClassName="modal-90w"
        centered
        size="xl"
      >
        <Modal.Body>
          <motion.div
            className="mapping-container"
            initial={{ y: "-5vh" }}
            animate={{ y: 0 }}
          >
            <div className="file-name">
              <div className="mapHeader">
                <h1>{info[0] ? info[0].name : "File Name"}</h1>
                <p>
                  confirm the column headings given in the above mentioned file.
                </p>
              </div>
              <div>
                <img></img>
              </div>
            </div>
            <div className="input-map">
              <div className="map-input">
                <p>
                  Name of the Branch
                  {/* <span>*</span> */}
                </p>
                <Select
                  placeholder=""
                  as="select"
                  options={option}
                  // onChange={(e)=>{handleSelect('branchName',e)}}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                    spacing: {
                      ...theme.spacing,
                      controlHeight: 50,
                    },
                  })}
                />
                {/* <input type='text'
                                    onChange={(e)=>{handleChange('branchName',e)}} 
 
                                    /> */}
              </div>
              <div className="map-input">
                <p>
                  Ledger Code
                  <span>{props.Name.ledgerName ? "" : "*"}</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  options={option}
                  onChange={(e) => {
                    handleSelect("LedgerCode", e);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                    spacing: {
                      ...theme.spacing,
                      controlHeight: 50,
                    },
                  })}
                />
              </div>
              <div className="map-input">
                <p>
                  Ledger Name<span>{props.Name.LedgerCode ? "" : "*"}</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  // options={ledgerNameOption}
                  options={option}
                  onChange={(e) => {
                    handleSelect("ledgerName", e);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                    spacing: {
                      ...theme.spacing,
                      controlHeight: 50,
                    },
                  })}
                />
              </div>
              <div className="map-input">
                <p>
                  Current year Net Balance Column<span>*</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  // options={currentOption}
                  options={option}
                  onChange={(e) => {
                    handleSelect("currentBalance", e);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                    spacing: {
                      ...theme.spacing,
                      controlHeight: 50,
                    },
                  })}
                />
              </div>
              <div className="map-input">
                <p>
                  Previous year Net Balance Column<span>*</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  // options={previousOption}
                  options={option}
                  onChange={(e) => {
                    handleSelect("previousBalance", e);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                    spacing: {
                      ...theme.spacing,
                      controlHeight: 50,
                    },
                  })}
                />
              </div>
              <div className="map-input">
                <p>
                  Amount in Trial Balance<span>*</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  options={units}
                  onChange={(e) => {
                    handleSelect("tbAmount", e);
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                    spacing: {
                      ...theme.spacing,
                      controlHeight: 50,
                    },
                  })}
                />
              </div>
              <div
                className="map-input"
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "2rem",
                }}
              >
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "grey",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleNewInput();
                  }}
                >
                  +&nbsp;Add&nbsp;column
                </p>
                &nbsp;&nbsp;&nbsp;&nbsp;
                {newcolumn && (
                  <input
                    type="text"
                    style={{ width: "400px" }}
                    onChange={(e) => {
                      handleNewColumn(e.target.value);
                    }}
                  />
                )}
                {newcolumn && (
                  <div className="submit-btn" onClick={handleNewColumnUpdate}>
                    {<Submit sm value="save" />}
                  </div>
                )}
              </div>
            </div>
            <div className="map-button">
              <div
                className="close-btn"
                style={{ cursor: "pointer" }}
                onClick={handleModal}
              >
                Close
              </div>
              <div className="submit-btn" onClick={props.handleSubmit}>
                {<Submit sm value="Confirm & proceed" />}
              </div>
            </div>
          </motion.div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default AssignValuesData;
