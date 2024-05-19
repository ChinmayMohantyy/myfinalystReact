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

const ForgotPwd = (props) => {
  const [show, setShow] = useState(false);
  const [Name, setName] = useState({
    ledger_code: "",
    cy: "",
    ledger_name: "",
    py: "",
    tbAmount: "",
  });
  const [temp, setTemp] = useState([]);
  const [info, setInfo] = useState([]);
  // const [valid, setValid] = useState(false)
  const [valid, setValid] = useState(true);
  const [option, setOption] = useState([]);
  const [ledgerNameOption, setLedgerNameOption] = useState([]);
  const [currentOption, setCurrentOption] = useState([]);
  const [previousOption, setPreviousOption] = useState([]);
  const [newcolumn, serNewColumn] = useState(false);
  const [columnname, setColumnName] = useState({
    newColumnName: "",
    columns:[]
  });

  // const [options, setOptions] = useState([])
  const i = props.index;
  const fileData = props.projectData;
  // console.log(fileData, "all the files data");
  // console.log(props.index, "index");
  // console.log(info, "info here man");
  let header = props.headers;
  // console.log(
  //   props.confirm,
  //   "headers heresssssssssssssssssssssssssssssssssssssssssss"
  // );

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
    header.map((val) => {
      // setOption(...option,{ 'value': val , 'label':             val })
      setOption((option) => [...option, { value: val, label: val }]);
      // setOptions(options => [...options,{ 'value': val ,'label': val }])
    });
    getNewColumnUpdate();
  }, []);

  const handleSelect = (field, e) => {
    setName({ ...Name, [field]: e.value });
    if (field === "ledger_code") {
      const res = option.filter((line) => {
        if (!(line.value === e.value)) {
          return line;
        }
      });
      setLedgerNameOption(res);
      // setCurrentOption([])
    } else if (field === "ledger_name") {
      const res = ledgerNameOption.filter((line) => {
        if (!(line.value === e.value)) {
          return line;
        }
      });
      setCurrentOption(res);
      // setPreviousOption([])
    } else if (field === "cy") {
      const res = currentOption.filter((line) => {
        if (!(line.value === e.value)) {
          return line;
        }
      });
      setPreviousOption(res);
    }

    // if(e === null ){

    //     console.log(option,'no doubt')
    //     console.log(Name[`${field}`],'no doubt')
    //     const deleted = Name[`${field}`]
    //     // console.log((option => [...option,{ 'value': `${deleted}` ,'label': `${deleted}` }]),'no doubt')
    //     setOption(option => [...option,{ 'value': `${deleted}` ,'label': `${deleted}` }])
    //     setName({...Name,[field]:''})

    //     return
    // }
    // console.log(field)
    // console.log(e)
    // setName({...Name,[field]:e.value})
    // options.filter()
    // const res = option.filter((line)=>{if(!(line.value === e.value)){return line}})
    // setOption(res)
    // console.log(res,'ewaa no doubt')
    // console.log(options,'no doubt')
    // console.log(option,'no doubt')
  };

  function handleValid() {
    let arr = Object.values(Name);
    const obj = arr;

    if (Name.ledger_code === "" && Name.ledger_name === "") {
      setValid(false);
      return;
    } else if (Name.ledger_code === "" || Name.ledger_name === "") {
      setValid(true);
    }

    if (
      Name.cy === "" ||
      Name.py === "" ||
      Name.tbAmount.includes === ""
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
    //    if(
    //        obj.includes('') |
    //        obj.length == 0
    //        ){
    //        setValid(false)

    //       }
    //    else{
    //        setValid(true)

    //    }
    // console.log(obj, "valid lalal");
    // console.log(Name, "Name valid lalal");
    // console.log(key,'valid')
  }

  useEffect(() => {
    let obj = Object.values(Name);
    let headers = header.filter((item) => !obj.includes(item));
    setTemp(headers);
    // console.log(Name, "this is name");
    handleValid();
  }, [Name]);

  function handleSubmit() {
    // console.log(valid);
    // console.log(Name);

    if (valid) {
      let obj = Object.values(Name);
      // console.log(obj, "obj");

      const auth = localStorage.getItem("auth_token");
      const project_id = localStorage.getItem("project_id");
      const temp_id = fileData[0].data.tmp_id;

      // console.log(temp_id);
      let headers = {
        "x-auth-token": auth,
        // 'Content-Type' : 'application/json'
      };

      // let fd = {
      //   ledger_name: Name.ledger_name,
      //   ledger_code: Name.ledger_code,
      //   branch: Name.branch,
      //   py: Name.py,
      //   cy: Name.cy,
      // };
      //  fd.append('cy',Name.cy);
      // console.log(fd, "fd created");
      // console.log("Name--",Name)
      
      axios
        .post(
          `/api/v1/tb-mapping/heading-classification/${project_id}/${temp_id}`,
          Name,
          { headers }
        )
        .then((response) => {
          // console.log(response, "response");

          const validation = [...props.confirm];
          validation[i] = true;
          // console.log(validation, "assign val validation");
          props.setConfirm(validation);
          setOption(null);
          setShow(false);
          props.setShow(false);
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    } else {
      swal("", "please enter the mandatory fields", "warning");
    }
  }

  const handleNewColumnUpdate = () => {
    // console.log("--------handleNewColumnUpdate API call -----")
    const auth = localStorage.getItem("auth_token");
    // console.log("local auth ----",auth);
    if(columnname.newColumnName === ""){
      swal("", "Please enter column name.", "warning");
      return;
    }

    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    const project_id = localStorage.getItem("project_id");
    const temp_id = fileData[0].data.tmp_id;
    let data = {
      column_name: columnname.newColumnName,
    };
    axios
      .post(
        `api/v1/tb-mapping/upload-column-name/${project_id}/${temp_id}`,
        data,
        { headers }
      )
      .then((response) => {
        // console.log("response---------",response);
        if (response.status === 200) {
          serNewColumn(false);
          getNewColumnUpdate();
          swal("", response.data.message, "success");
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
        swal("", error.response.data.error, "error");
      });
  };

  const getNewColumnUpdate = () => {
    // console.log("-------getNewColumnUpdate API call -----")
    const auth = localStorage.getItem("auth_token");
    // console.log("local auth ----",auth);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    const project_id = localStorage.getItem("project_id");
    const temp_id = fileData[0].data.tmp_id;

    axios
      .get(
        `api/v1/tb-mapping/upload-column-name/${project_id}/${temp_id}`,
        { headers }
      )
      .then((response) => {
        // console.log("updated column response---------",response);
        if (response.status === 200 && response.data?.success === true) {
          setColumnName({...columnname, columns:response.data?.column?.column, newColumnName:""});
        }
      })
      .catch((error) => {
        swal("", error.response.data.error, "error");
      });
  };
  useEffect(() => {
    setShow(props.show);
    setInfo(props.info);
  }, [props.show]);

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
                  // onChange={(e)=>{handleSelect('branch',e)}}
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
                                    onChange={(e)=>{handleChange('branch',e)}} 
 
                                    /> */}
              </div>
              <div className="map-input">
                <p>
                  Ledger Code
                  <span>{Name.ledger_name ? "" : "*"}</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  options={option}
                  onChange={(e) => {
                    handleSelect("ledger_code", e);
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
                  Ledger Name<span>{Name.ledger_code ? "" : "*"}</span>
                </p>
                <Select
                  placeholder=""
                  as="select"
                  // options={ledgerNameOption}
                  options={option}
                  onChange={(e) => {
                    handleSelect("ledger_name", e);
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
                    handleSelect("cy", e);
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
                    handleSelect("py", e);
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
                  {
                    columnname.columns && columnname.columns.length > 0 && columnname.columns.map((columnName, i) => (
                        <div className="map-input" key={i}>
                          <p>
                            {columnName?.Header && columnName.Header}
                          </p>
                          <Select
                            placeholder=""
                            as="select"
                            // options={previousOption}
                            options={option}
                            onChange={(e) => {
                              handleSelect(columnName?.accessor && columnName.accessor, e);
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
                    ))
                  }
              
            </div>

            <div>
              <div
                  className="map-input"
                  style={{
                    display: "flex",
                    flexDirection : "column",
                    // alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "grey",
                      cursor:"pointer",
                      width:"100%"
                    }}
                    onClick={() => {
                      // handleNewInput();
                      serNewColumn(!newcolumn);
                    }}
                  >
                    + Add column
                  </p>
                 <div className="d-flex" style={{width:"23rem"}} >
                  {newcolumn && (
                    <>
                    <input
                      type="text"
                      style={{ width: "58%" }}
                      value={columnname.newColumnName}
                      onChange={(e) => {
                        setColumnName({...columnname, newColumnName: e.target.value });
                      }}
                    />
                    <div className="submit-btn" onClick={handleNewColumnUpdate}>
                      {<Submit sm value="save" />}
                    </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            <div className="map-button">
              <div
                className="close-btn"
                style={{ cursor: "pointer" }}
                onClick={()=>{ setShow(false); props.setShow(false);}}
              >
                Close
              </div>
              <div className="submit-btn" onClick={handleSubmit}>
                {<Submit sm value="Confirm & proceed" />}
              </div>
            </div>
          </motion.div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgotPwd;
