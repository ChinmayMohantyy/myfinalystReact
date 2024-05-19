import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";

import "./setUpProject.css";
import { Form } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { Submit } from "../../Components/Button";
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import date from "../../assets/date.svg";
import sidebar1 from "../../assets/sidebar-1.svg";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import Select from "react-select";
import { WidgetsTwoTone } from "@material-ui/icons";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const initialState = {
  projectName: "",
  companyNature: "",
  GAAP: "",
  prevDate: moment().subtract(1, "years").toDate(),
  currentDate: moment().toDate(),
};

const gaapOptions = [
  { value: "Indian Gaap", label: "Indian GAAP" },
  { value: "UK Gaap", label: "UK GAAP", isDisabled: true },
  { value: "US Gaap", label: "US GAAP", isDisabled: true },
];

const natureOptions = [
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Trading", label: "Trading", isDisabled: true },
  { value: "NBFC", label: "NBFC", isDisabled: true },
  { value: "Banking", label: "Banking", isDisabled: true },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const QuestionnaireNew = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialState);
  const [valid, setValid] = useState(false);
  const [year, setYear] = useState([]);
  const [option, setoption] = useState(false);
  const [extra, setExtra] = useState("");
  const [previousdata, setPreviousData] = useState("");
  const [renameProject, setRenameProject] = useState(false);

  console.log(value, "value of value");

  useEffect(() => {
    getPreviousYearData();
  }, []);

  const getPreviousYearData = () => {
    setYear([]);
    const data = {
      startDate: moment(value.currentDate).format(),
      prevDate: moment(value.prevDate).format(),
    };
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    axios
      .get(`api/v1/project/previous-year-data/`, {
        params: data,
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.projectsData);
        if (response.data.projectsData.length > 0) {
          response.data.projectsData.forEach((element) => {
            setYear((year) => [...year, { value: element, label: element }]);
          });
        }
      });
  };

  const handleChange = (field, e) => {
    console.log(field);
    console.log(e);
    setValue({ ...value, [field]: e.value });
  };

  let history = useHistory();

  function validationExisting() {
    let obj = Object.values(value);
    console.log(obj, "obj");
    if (obj.includes("") | obj.includes(null)) {
      setValid(false);
    } else {
      setValid(true);
    }
  }

  useEffect(() => {
    validationExisting();
  }, [value]);

  const handleSubmit = () => {
    if (valid) {
      const fd = {
        project_name: value.projectName,
        company_type: value.companyNature,
        gaap_selection: value.GAAP,
        previous_year: value.prevDate,
        current_year: value.currentDate,
        previous_year_data: previousdata,
        extra_data: extra,
        type_fs: "vvv",
        preset_name: "not available",
      };

      console.log(fd, "fd created");
      // dispatch(existingProject(fd))
      // fd.append('email','Value.email');
      // fd.append('password','Value.password');
      // console.log(Value)

      const auth = localStorage.getItem("auth_token");
      let headers = {
        "x-auth-token": auth,
        "Content-Type": "application/json",
      };
      axios
        .post(`api/v1/tb-onboarding/tb-onboarding`, fd, { headers })
        .then((response) => {
          console.log(response, "response");
          history.push("/createProject/uploadTb");
          dispatch({ type: actionTypes.SET_RESTART, payload: "arr" });
          dispatch({ type: actionTypes.SET_NOTERESTART, payload: "arr" });
          localStorage.setItem("project_id", response.data.project_id);
        })
        .catch((error) => {
          console.log(error.response, "error");
          swal("", error.response.data.error, "error");
        });
    } else {
      swal("", "Please Fill All the input Fields", "warning");
    }
  };

  const handleChangedata = (e) => {
    console.log("ggggg");
    console.log(e);
    setoption(true);
    setRenameProject(true);
    // setValue({...value,prevData:e.value})
    setPreviousData(e.value);
  };
  const handleChangeradio = (e) => {
    // setValue({...value,extraData:e.target.value})
    setExtra(e.target.value);
  };

  const handleClose = () => {
    setRenameProject(false);
  };

  const getFinancialDate = (e, type) => {
    if (type === "current") {
      setValue({ ...value, currentDate: e });
    } else {
      setValue({ ...value, prevDate: e });
    }
    getPreviousYearData();
  };

  console.log(moment(value.currentDate).format("DD/MM/yy"));

  return (
    <div className="containerQuestionnaire">
      <div className="track">
        <div className="progressBar">
          <div className="vector-1"></div>
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
      <div className="main">
        <div className="header">
          <h1>Create Blank Project</h1>
        </div>
        <div className="inputs">
          <div className="row">
            <div className="col-md-6">
              <div className="in-1">
                <p>
                  Name of the project<span>*</span>
                </p>
                <input
                  placeholder="Enter name.."
                  onChange={(e) => {
                    setValue({ ...value, ["projectName"]: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="in-1">
                <p>
                  Nature of the company<span>*</span>
                </p>
                <Select
                  placeholder="Select option"
                  options={natureOptions}
                  onChange={(e) => handleChange("companyNature", e)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                  })}
                />
              </div>

              {/* <div className='in-1' style={{marginTop:'30px'}}>
                            <p>Use Previous Financial Year As<span>*</span>     </p>
                            <div className='check' style={{marginTop:'10px'}}>
                                <Form.Check inline label="Standalone Fs" name="group1" type='radio' id={`inline-radio}-1` }  onChange={(e) => {setValue({...value,['fs']:'Standalone Fs'})}} />
                                <Form.Check inline label="Consolidated Fs" name="group1" type='radio' id={`inline-radio}-1`}  onChange={(e) => {setValue({...value,['fs']:'Consolidated Fs'})}} />
                            </div>
                            </div> */}

              {/* new  */}
            </div>
            <div className="col-md-6">
              <div className="in-1">
                <p>
                  selection of GAAP<span>*</span>
                </p>
                {/* <Select
                                    value={value.value}
                                    onChange={handleChange}
                                    options={options}
                                /> */}
                <Select
                  placeholder="Select option"
                  options={gaapOptions}
                  // value={value.companyNature}
                  onChange={(e) => handleChange("GAAP", e)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                  })}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="date-picker">
                <p>
                  Current financial Year<span>*</span>{" "}
                </p>
                {/* <div className="Date" style={{display:'flex'}}> */}
                {/* <img src={date}></img> */}
                <DatePicker
                  value={value.currentDate}
                  dateFormat="DD/MM/yyyy"
                  onChange={(e) => getFinancialDate(e, "current")}
                />
                {/* </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="date-picker">
                <p>
                  Previous financial Year<span>*</span>{" "}
                </p>
                {/* <div className="Date" style={{display:'flex'}}> */}
                {/* <img src={date}></img> */}
                <DatePicker
                  value={value.prevDate}
                  dateFormat="DD/MM/yyyy"
                  onChange={(e) => getFinancialDate(e, "previous")}
                  maxDate={moment().toDate()}
                />
                {/* </div> */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="in-1">
                <p>Previous Year Data</p>

                <Select
                  placeholder="Select option"
                  options={year}
                  value={{ label: previousdata }}
                  // value={value.companyNature}
                  onChange={(e) => handleChangedata(e)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="post"
          onClick={() => {
            handleSubmit();
          }}
        >
          {valid ? (
            <Submit value="Create Project" />
          ) : (
            <Submit value="Create Project" disable />
          )}
        </div>
      </div>
      {/* modal */}
      <Modal
        open={renameProject}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 811 }}>
          <div>
            {option && (
              <div>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={extra}
                    name="radio-buttons-group"
                    onChange={(e) => handleChangeradio(e)}
                  >
                    <FormControlLabel
                      value="Rollforward"
                      control={<Radio />}
                      label="Rollforward CurrentYear of preset as PreviousYea"
                    />
                    <FormControlLabel
                      value="preset as CY"
                      control={<Radio />}
                      label="Copy CY of preset as CY"
                    />
                    <FormControlLabel
                      value="Copy mapping"
                      control={<Radio />}
                      label="Copy mapping (this can be based on ledger code/ledger name)"
                    />
                    <FormControlLabel
                      value="adjustments"
                      control={<Radio />}
                      label="Copy adjustments"
                    />
                    <FormControlLabel
                      value="adjustments and amounts"
                      control={<Radio />}
                      label="Copy adjustments and amounts"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            )}
          </div>

          <div
            className="col-md-6 row text-right mt-4"
            style={{ width: "100px", float: "right" }}
            onClick={handleClose}
          >
            <Submit value="Close" sm />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default QuestionnaireNew;
