import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./setUpProject.css";
import { Submit } from "../../Components/Button";
import Select from "react-select";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import swal from "sweetalert";

const ForgotPwd = (props) => {
  const SHEET_DATA = useSelector((state) => state.reducer.sheetData);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [info, setInfo] = useState([]);
  // const [valid, setValid] = useState(false)
  const [valid, setValid] = useState(true);
  const [sheetvalid, setSheetValid] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [sheets, setSheets] = useState([]);
  let init = {
    LedgerCode: "",
    branchName: "",
    currentBalance: "",
    ledgerName: "",
    previousBalance: "",
    tbAmount: "",
  };
  const [option, setOption] = useState([]);
  const [Name, setName] = useState(init);
  const [sheetId, setSheetId] = useState([]);
  const [currentSheet, setCurrentSheet] = useState("");
  const [update, setUpdate] = useState("");
  const [currentOptions, setCurrentOptions] = useState([]);
  const i = props.index;
  console.log(currentOptions, "currentOptionscurrentOptionscurrentOptions");
  // console.log(props.projectData)
  // console.log(sheetId,'sheeiSsisinaindsi')
  // console.log(props.projectData[i],'props.projectData[props.index]')
  // const tmp_id = props.projectData[props.index].tmp_id
  // const tb_id = props.projectData[props.index].tb_id
  const auth = localStorage.getItem("auth_token");
  const project_id = localStorage.getItem("project_id");

  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };

  // useEffect(() => {

  //     dispatch({type: actionTypes.SET_FILE_DATA_SHEET,payload:currentOptions})

  // }, [currentOptions])

  useEffect(() => {
    // if(SHEET_DATA && SHEET_DATA != []){
    //     setCurrentOptions(SHEET_DATA)
    // }

    let id = props.projectData[props.index].data._id;

    axios
      .get(
        `/api/v1/tb-mapping/get-temp-model-multiple-sheet/${id}/${project_id}`,
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response.data, "response ====================");
        setSheets(response.data.sheet_names);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  }, []);

  useEffect(() => {
    sheets.map((sheet) => {
      // currentOptions
      console.log(sheet);
      setCurrentOptions((currentOptions) => [
        ...currentOptions,
        { sheets: sheet, options: [], save: false, values: init },
      ]);
    });
  }, [sheets, props.setShowSheet]);

  useEffect(() => {
    currentOptions.map((opt, i) => {
      if (opt.sheets === currentSheet) {
        console.log("sheets", currentSheet, opt);
        const arr = currentOptions;
        arr[i].options = option;
        // arr[i]. = options
        console.log(arr);
        setCurrentOptions(arr);
        // dispatch({type: actionTypes.SET_FILE_DATA_SHEET,payload:arr})
      }
    });
  }, [update]);

  useEffect(() => {
    setCurrentOptions(SHEET_DATA);
  }, [SHEET_DATA]);

  // useEffect(() => {
  //     console.log(currentSheet)
  //     const inx = currentOptions.findIndex(ix => ix['sheets'] === currentSheet)

  //     const arr = currentOptions
  //     if(arr[inx]){
  //         arr[inx].values = Name
  //         setCurrentOptions(arr)

  //     }

  //     // currentOptions.map?

  //     console.log(inx,'inx')

  // }, [Name])

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  };
  const sheet = {
    minHeight: "14rem",
    // display:'flex',
    // justifyContent:'space-between',
    // alignItems:'center'
  };
  const tab = {
    height: "3rem",
    backgroundColor: "white",
    marginTop: "1rem",
    display: "flex",
  };

  const units = [
    { value: "Whole Numbers", label: "Whole Numbers" },
    { value: "Tens", label: "Tens" },
    { value: "Hundreds", label: "Hundreds" },
    { value: "Thousands", label: "Thousands" },
    { value: "Lakhs", label: "Lakhs" },
    { value: "Crores", label: "Crores" },
  ];

  function handleValid() {
    let obj = Object.values(Name);
    if (obj.includes("") | (obj.length == 0)) {
      setValid(false);
    } else {
      setValid(true);
    }
  }

  const handleSelect = (field, e) => {
    if (e === null) {
      setName({ ...Name, [field]: "" });
      return;
    }
    console.log(field);
    console.log(e);
    const arr1 = Name;
    const arr2 = { [field]: e.value };
    Object.assign(arr1, arr2);
    setName({ ...Name, [field]: e.value });
    const inx = currentOptions.findIndex((ix) => ix["sheets"] === currentSheet);

    const arr = currentOptions;
    if (arr[inx]) {
      arr[inx].values = arr1;
      setCurrentOptions(arr);
      // dispatch({type: actionTypes.SET_FILE_DATA_SHEET,payload:arr})
    }
    handleValid();
  };

  function handleOpen(index, sheet) {
    console.log(currentOptions[index].options, "inside options");
    if (currentOptions[index].options.length > 0) {
      toggle(index);
      console.log('it"s safe here');
    } else {
      toggle(index);
      setOption([]);
      const fd = new FormData();
      console.log(sheet.sheets, "sheet name");
      setCurrentSheet(sheet.sheets);
      fd.append("sheet_name", sheet.sheets);
      let id = props.projectData[props.index].data._id;
      axios
        .post(
          `/api/v1/tb-mapping/get-temp-model-multiple-sheet/${id}/${project_id}`,
          fd,
          { headers }
        )
        .then((response) => {
          console.log(response, "response response response");
          console.log(response.data.sheet_name, "temp id of each");
          const st_id = response.data.sheet_name;
          const Sheet_id = st_id[sheet.sheets];
          console.log(st_id[sheet], "somethinf");
          setSheetId((sheetId) => [...sheetId, st_id]);
          setName({});
          axios
            .get(
              `/api/v1/tb-mapping/heading-classification/${project_id}/${Sheet_id}`,
              { headers }
            )
            .then((response) => {
              console.log(
                response.data.headers_list,
                "response ===================="
              );
              console.log(response, "response ===========sdsd=========");
              response.data.headers_list.map((val) => {
                setOption((option) => [...option, { value: val, label: val }]);
              });
              console.log(option, "option");
              setUpdate(Math.random());
            })
            .catch((error) => {
              console.log(error.response, "error");
              // swal("",err.response.data.error, "error")
            });
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    }
  }

  // console.log(Name,'name here ---------------- here')
  useEffect(() => {
    const obj = Object.values(Name);
    console.log(obj, "obj obj objobj");
    console.log(sheetvalid, "obj true or false obj objobj");

    if (obj.includes("") | obj.includes(null)) {
      setSheetValid(false);
    } else {
      setSheetValid(true);
    }
  }, [Name]);

  function handleSaveDetails(st, ix) {
    if (sheetvalid && !st.save) {
      const fd = new FormData();
      fd.append("ledger_name", st.values.ledgerName);
      fd.append("ledger_code", st.values.LedgerCode);
      fd.append("branch", st.values.branchName);
      fd.append("py", st.values.previousBalance);
      fd.append("cy", st.values.currentBalance);
      console.log(fd, "fd created");
      // console.log(name,'fd created');
      // const id = sheetId[currentSheet]
      // console.log(id,'here mate ')

      sheetId.map((row) => {
        console.log(row[currentSheet]);
      });
      // const inx = sheetId.findIndex(obj => Object.keys(obj)[0] === currentSheet)
      // console.log(inx)
      console.log(sheetId[ix], "sheet did ");
      const id = sheetId[ix][currentSheet];
      if (id) {
        axios
          .post(
            `/api/v1/tb-mapping/heading-classification/${project_id}/${id}`,
            fd,
            { headers }
          )
          .then((response) => {
            console.log(response, "response");
            setOption(null);
            toggle(null);
            setName({});
            const arr = currentOptions;
            arr[ix].save = true;
            setCurrentOptions(arr);
            // dispatch({type: actionTypes.SET_FILE_DATA_SHEET,payload:arr})
          })
          .catch((error) => {
            console.log(error.response, "error");
          });
      }
      return;
    }
    if (st.save) {
      swal("", "Inputs already Mapped", "warning");
    } else {
      swal("", "Please Fill All the input Fields", "warning");
    }
  }

  function handleConfirm() {
    console.log(sheetvalid);
    if (sheetvalid) {
      props.setShowSheet(false);
      const validation = [...props.confirm];
      validation[i] = true;
      console.log(validation, "assign val validation");
      props.setConfirm(validation);
    }
  }

  function handleClose() {
    swal("", "Please Confirm to proceed", "warning");
    // props.setShowSheet(false)
  }

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
              <div style={header}>
                <div>
                  <h3>{info[0] ? info[0].name : "File Name"}</h3>
                  <p
                    style={{
                      color: "grey",
                      fontWeight: "300",
                      fontSize: "15px",
                    }}
                  >
                    Select the sheet you want and confirm the column headings
                    provided in <br />
                    each sheet individually.
                  </p>
                </div>
                <div className="map-button">
                  <div
                    className="close-btn"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Close
                  </div>
                  <div
                    className="submit-btn"
                    onClick={() => {
                      handleConfirm();
                    }}
                  >
                    {sheetvalid ? (
                      <Submit sm value="Confirm & proceed" />
                    ) : (
                      <Submit sm value="Confirm & proceed" disable />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ sheets }}>
              {currentOptions &&
                currentOptions.map((st, ix) => {
                  console.log(st.options, "options here");
                  const dropdown = st.options;
                  console.log(option, "optionosnofina");
                  console.log(dropdown, "optionosnofina");
                  return (
                    <div key={ix}>
                      <div style={tab}>
                        {/* <div style={{display:'flex',alignItems:'center',margin:'1rem'}}>{ix + 1}</div> */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "1rem",
                          }}
                        >
                          <p>{st.sheets}</p>
                        </div>
                        <div
                          style={{
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            marginRight: "1rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleOpen(ix, st);
                          }}
                        >
                          <i className="fas fa-angle-down" />
                        </div>
                      </div>
                      {clicked === ix && (
                        <div
                          style={{
                            backgroundColor: "white",
                            padding: "0 1rem 1rem 1rem",
                          }}
                        >
                          <div className="input-map">
                            <div className="map-input">
                              <p>
                                Name of the Branch<span>*</span>
                              </p>
                              <Select
                                placeholder=""
                                as="select"
                                options={
                                  !option ||
                                  option == undefined ||
                                  option == null
                                    ? st.options
                                    : option
                                }
                                // options= { !option.length || option == undefined || option == null ? st.options : option}
                                // options= {option != [] || option != undefined  ? option : st.options }
                                isClearable
                                // value={st.values['branchName']}
                                value={st.options.filter(function (option) {
                                  // setUpdate(Math.random())
                                  return (
                                    option.value === st.values["branchName"]
                                  );
                                })}
                                onChange={(e) => {
                                  handleSelect("branchName", e);
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
                                Ledger Code<span>*</span>
                              </p>
                              <Select
                                placeholder=""
                                as="select"
                                // options={option}
                                // options= {option.length == 0 || option == undefined || option == null ? st.options : option}
                                // options= {!option.length || option == undefined || option == null ? st.options : option}
                                options={
                                  !option ||
                                  option == undefined ||
                                  option == null
                                    ? st.options
                                    : option
                                }
                                value={st.options.filter(function (option) {
                                  // setUpdate(Math.random())
                                  return (
                                    option.value === st.values["LedgerCode"]
                                  );
                                })}
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
                                Ledger Name<span>*</span>
                              </p>
                              <Select
                                placeholder=""
                                as="select"
                                // options={option}
                                options={
                                  !option ||
                                  option == undefined ||
                                  option == null
                                    ? st.options
                                    : option
                                }
                                // options= {!option.length || option == undefined || option == null ? st.options : option}

                                // options= {option.length == 0 || option == undefined || option == null ? st.options : option}

                                value={st.options.filter(function (option) {
                                  // setUpdate(Math.random())
                                  return (
                                    option.value === st.values["ledgerName"]
                                  );
                                })}
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
                                // options={option}
                                // options= {option.length == 0 || option == undefined || option == null ? st.options : option}
                                options={
                                  !option ||
                                  option == undefined ||
                                  option == null
                                    ? st.options
                                    : option
                                }
                                // options= {!option.length || option == undefined || option == null ? st.options : option}

                                value={st.options.filter(function (option) {
                                  // setUpdate(Math.random())
                                  return (
                                    option.value === st.values["currentBalance"]
                                  );
                                })}
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
                                // options={option}
                                // options= {!option.length || option == undefined || option == null ? st.options : option}
                                options={
                                  !option ||
                                  option == undefined ||
                                  option == null
                                    ? st.options
                                    : option
                                }
                                // options= {option.length == 0 || option == undefined || option == null ? st.options : option}

                                value={st.options.filter(function (option) {
                                  // setUpdate(Math.random())
                                  return (
                                    option.value ===
                                    st.values["previousBalance"]
                                  );
                                })}
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
                                // value={st.options.filter(function(units) {
                                //     // setUpdate(Math.random())
                                //     return units.value === st.values['tbAmount'];
                                //   })}
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
                            {/* <div className='map-input' style={{display:'flex',alignItems:'center',marginTop:'1rem'}}>
                                                <p style={{fontWeight:'600',fontSize:'1rem',color:'var(--clr-accent)'}}>+ Add column</p>
                                            </div> */}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginTop: "1rem",
                            }}
                          >
                            <div
                              style={{ width: "10rem" }}
                              onClick={() => {
                                handleSaveDetails(st, ix);
                              }}
                            >
                              {sheetvalid && !st.save ? (
                                <Submit sm value="Save details" />
                              ) : (
                                <Submit sm value="Save details" disable />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgotPwd;
