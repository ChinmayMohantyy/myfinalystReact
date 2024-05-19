import React, { useState, useEffect } from "react";
import { Tabs, Tab, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./financialStatement.css";
import { Navbar } from "../../Components/Navbar";
import { Submit } from "../../Components/Button";
import BalanceSheet from "../../Components/BalanceSheet/BalanceSheet";
import PNLStatement from "../../Components/pnlStatement/PNLStatement";
import Notes from "../../Components/Notes/Notes";
import PnlNotes from "../../Components/PnlNotes/PnlNotes";
import GeneralNotes from "../../Components/Notes/GeneralNotes";
import CreateInput from "../../Components/createInput/CreateInput";
import Socie from "../../Components/socie/Socie";
import arrowLeftGreen from "../../assets/arrowLeftGreen.svg";
import Select from "react-select";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const main = {
  padding: "2rem 4rem",
  backgroundColor: "rgb(229, 229, 229)",
  minHeight: "calc(100vh - 80px)",
  minWidth: "1045px",
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

const name = {
  fontSize: "15px",
  fontWeight: "500",
  paddingLeft: "1%",
  paddingRight: "2%",
};

const mainTag = {
  fontSize: "1.15rem",
  fontWeight: "700",
};

const button = {
  padding: "8px",
  width: "10rem",
  // marginLeft:'auto'
};
const button3 = {
  padding: "8px",
  width: "15rem",
  marginLeft: "283px",
};
const button2 = {
  padding: "8px",
  width: "15em",
  marginLeft: "auto",
};
const backNav = {
  fontSize: "1.2rem",
  fontWeight: "600",
  color: "#03565A",
  cursor: "pointer",
};

const FinancialStatement = () => {
  let history = useHistory();
  const [key, setKey] = useState("Balance Sheets");
  const [note, setNote] = useState(0);
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [sid, setSid] = useState(null);
  const [nid, setNid] = useState(null);
  const [NoteNumber, setNoteNumber] = useState(1); // the one with the addition logic
  const [notenum, setNoteNum] = useState(1); //
  const [noteName, setNoteName] = useState(""); //
  const [notenum2, setNoteNum2] = useState(1);
  const [rows, setRows] = useState([]);
  const [str, setStr] = useState("");
  const [render, setRender] = useState("");
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  console.log(key, "keykeykey");

  const [precision, setPrecision] = useState("Units");
  const [floatdata, setFloat] = useState();

  const [note4, setNote4] = useState(null);

  const [currentProfit, setCurrentProfit] = useState("");
  const [currentYearProfit, setCurrentYearProfit] = useState("");

  const [comProfit, setComProfit] = useState("");
  const [comYearProfit, setComYearProfit] = useState("");
  const [projectData, setProjectData] = useState({});

  const [headerdata,setDataHeader] = useState("");

  const units = [
    { value: "Units", label: "Units" },
    // { value: 'Tens', label: 'Tens' },
    { value: "Hundreds", label: "Hundreds" },
    { value: "Thousands", label: "Thousands" },
    { value: "Lakhs", label: "Lakhs" },
    { value: "Crores", label: "Crores" },
  ];

  const decimal = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  console.log(note, "note");
  console.log(notenum, "notenum");
  console.log(notenum2, "notenum2");
  console.log(noteName, "note Name note Name notenum2");
  const project_id = localStorage.getItem("project_id");

  useEffect(() => {
    console.log(noteName, "noteName noteName");
    if (noteName == 1) {
      console.log("one clicked da");
      window.scrollTo({
        bottom: 0,
        behavior: "smooth",
      });
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
    };

    fetchProject(headers);
    getFooter();
  }, [noteName]);

  const fetchProject = (headers) => {
    axios
      .get(`/api/v1/project/get-project-details/${project_id}`, { headers })
      .then((response) => {
        setProjectData(response.data.project);
        console.log(response.data, "11111111");
      })
      .catch((error) => {
        console.log(error.response, "here error");
      });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHeader=(e)=>{
    console.log(e.target.value,"==================");
    saveHeader(e.target.value)
  }


  const saveHeader=(val)=>{
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };
    let data ={
      header_name:val
    }
    axios
      .post(`/api/v1/pnl/save-header/${project_id}`,data, { headers })
      .then((response) => {
        console.log(response.data,"KKK");
        // setRows(response.data.balance_sheet);
        getFooter();
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  }

  const getFooter=()=>{
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };
    axios
      .get(`/api/v1/pnl/get-footer/${project_id}`, { headers })
      .then((response) => {
        console.log(response.data,"KKK");
        setDataHeader(response.data.getFooter[0].header_name);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  }
  console.log(floatdata, "precious");

  return (
    <>
      {showCreateInput ? (
        <CreateInput
          setShowCreateInput={setShowCreateInput}
          setRender={setRender}
          str={str}
          sid={sid}
          nid={nid}
          setNote4={setNote4}
          notenum={notenum}
        />
      ) : null}
      {/* <CreateInput/> */}
      <Navbar text="Financial Year: 2021 - 2022" />
      {/* <p
        style={{
          position: "absolute",
          top: "15rem",
          right: "5rem",
          fontSize: "14px",
        }}
      >
        *all amount in INR Lakhs
      </p> */}
      <div style={main}>
        <div style={header}>
          <div style={name}>
            <div
              style={backNav}
              onClick={() => {
                history.push(`/preview`);
              }}
            >
              <img src={arrowLeftGreen} style={{ marginRight: "10px" }} />
            </div>
          </div>
          <div style={line}></div>
          <div style={mainTag}>
            <input
              placeholder="Consolidated Financial Statement"
              style={{ border: "0", width: "20rem" }}
              defaultValue={headerdata}
              onChange={(e)=>handleHeader(e)}
            />
          </div>
          <div style={button3} title="units conversion of the tb amount">
            <Select
              placeholder=""
              as="select"
              options={units}
              isClearable
              onChange={(e) => {
                setPrecision(e.value);
              }}
              defaultInputValue="Units"
              theme={(theme) => ({
                ...theme,
                borderRadius: "6px",
                cursor: "pointer",
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
          <div style={button2}>
          <Select
              placeholder="0"
              as="select"
              options={decimal}
              isClearable
              onChange={(e) => {
                setFloat(e.value);
              }}
              defaultInputValue="2"
            />
          </div>
          <div style={button}>
            <div>
              <Submit value="Save to preset" variant="secondary" sm />
            </div>
          </div>
          <div style={button}>
            <div>
              <Submit value="Export Fs" sm />
            </div>
          </div>
        </div>
        <div>
          <Tabs
            defaultActiveKey="Balance Sheets"
            id="uncontrolled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="Balance Sheets" title="Balance Sheets">
              <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
                <BalanceSheet
                  precision={precision}
                  NoteNumber={NoteNumber}
                  setNoteName={setNoteName}
                  setKey={setKey}
                  setNoteNum2={setNoteNum2}
                  scrollToTop={scrollToTop}
                  rows={rows}
                  setNote={setNote}
                  projectData={projectData}
                  floatdata={floatdata}
                />
              </div>
            </Tab>
            <Tab eventKey="P&L Statement1" title="P&L Statement">
              <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
                <PNLStatement
                  precision={precision}
                  NoteNumber={NoteNumber}
                  notenum2={notenum2}
                  setKey={setKey}
                  scrollToTop={scrollToTop}
                  rows={rows}
                  setCurrentProfit={setCurrentProfit}
                  setCurrentYearProfit={setCurrentYearProfit}
                  setComYearProfit={setComYearProfit}
                  currentProfit={currentProfit}
                  setNote={setNote}
                  setComProfit={setComProfit}
                  projectData={projectData}
                  floatdata={floatdata}
                />
              </div>
              {/* <Sonnet /> */}
            </Tab>
            <Tab eventKey="P&L Statement2" title="CashFlow">
              <div style={{ height: "100vh", backgroundColor: "white" }}></div>
              {/* <Sonnet /> */}
            </Tab>
            <Tab eventKey="P&L Statement3" title="SOCIE">
              <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
                <Socie
                  currentProfit={currentProfit}
                  comProfit={comProfit}
                  currentYearProfit={currentYearProfit}
                  comYearProfit={comYearProfit}
                  projectData={projectData}
                />
              </div>
            </Tab>
            <Tab eventKey="generalNotes" title="General Notes">
              <GeneralNotes setNoteNumber={setNoteNumber} />
              {/* <Sonnet /> */}
            </Tab>
            <Tab eventKey="Notes" title="Balance Sheet Notes">
              <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
                <Notes
                  note={note}
                  setShowCreateInput={setShowCreateInput}
                  setNoteName={setNoteName}
                  setStr={setStr}
                  setNid={setNid}
                  setSid={setSid}
                  setNoteNum={setNoteNum}
                />
              </div>
              {/* <Sonnet /> */}
            </Tab>
            <Tab eventKey="Notes2" title="PNL Statement Notes">
              <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
                <PnlNotes
                  note={note}
                  setShowCreateInput={setShowCreateInput}
                  setNid={setNid}
                  setSid={setSid}
                  setNoteNum={setNoteNum}
                />
              </div>
              {/* <Sonnet /> */}
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default FinancialStatement;
