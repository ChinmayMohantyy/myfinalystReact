import React from 'react'
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Select from "react-select";
// import "./templateTabs.css";

// import BalanceSheet from "./BalanceSheet";
// import PnlStatement from "./PnlStatement";
// import Pattern1 from "./Pattern1";
// import Pattern2 from "./Pattern2";
// import Pattern3 from "./Pattern3";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ConsoleBalanceSheet from './consoleTabs/ConsoleBalanceSheet';
import ConsolePnlStatement from './consoleTabs/ConsolePnlStatement';
import ConsolePattern1 from './consoleTabs/ConsolePattern1';
import ConsolePattern2 from './consoleTabs/ConsolePattern2';
import ConsolePattern3 from './consoleTabs/ConsolePattern3';



function ConsoleTemplateTabs(props) {
    const [group, setGroup] = useState();
  const [rows, setRows] = useState([]);
  const [hideData, setHideData] = React.useState([]);
  const [hideChildData, sethideChildData] = useState([]);

  const shortcut = {
    color: "var(--clr-accent)",
    fontWeight: "600",
    fontSize: "1rem",
    marginLeft: "1rem",
    cursor: "pointer",
    borderRadius: "50%",
    border: "2px solid var(--clr-accent)",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const options = [
    { value: 0, label: "Balance Sheet" },
    { value: 1, label: "PNL statement" },
    { value: 2, label: "Note - Property, Plant & Equipment" },
    { value: 3, label: "Note - Capital Work-In Progress" },
    { value: 4, label: "Note - Investment Properties" },
    { value: 5, label: "Note - Goodwill" },
    { value: 6, label: "Note - Other Intangible Assets" },
    { value: 7, label: "Note - Deferred Tax Assets" },
    { value: 8, label: "Note - Other non-current Assets" },
    { value: 9, label: "Note - Financial Assets - Investments" },
    { value: 10, label: "Note - Financial Assets - Loans" },
    { value: 11, label: "Note - Financial Assets - Other Financial Assets" },
    { value: 12, label: "Note - Contract assets" },
    {
      value: 13,
      label: "Note - Investments Accounted for using the equity method",
    },
    { value: 14, label: "Note - Inventories" },
    { value: 15, label: "Note - Financial Assets - Trade Receivables" },
    { value: 16, label: "Note - Financial Assets - Cash and cash equivalents" },
    { value: 17, label: "Note - Other current assets" },
    { value: 18, label: "Note - Assets classified as held for sale" },
    { value: 19, label: "Note - Equity Share Capital" },
    {
      value: 20,
      label:
        "Note - other equity - equity component of compound financial instruments",
    },
    { value: 21, label: "Note - other equity - reserves and surplus" },
    { value: 22, label: "Note - other equity - other reserves" },
    { value: 23, label: "Note - Non Controlling Interest" },
    { value: 24, label: "Note - Financial Liabilities - Borrowings" },
    {
      value: 25,
      label: "Note - Financial liabilities - Other Financial Liabilities",
    },
    { value: 26, label: "Note - Provisions" },
    { value: 27, label: "Note - Employee benefit obligations" },
    { value: 28, label: "Note - Deferred tax liabilities" },
    { value: 29, label: "Note - Government grants" },
    { value: 30, label: "Note - Other Non-Current Liabilities" },
    { value: 31, label: "Note - Financial Liabilities - Trade Payable" },
    { value: 32, label: "Note - Contract Liabilities" },
    { value: 33, label: "Note - Current tax Liabilities" },
    { value: 34, label: "Note - Other Current Liabilities" },
    {
      value: 35,
      label:
        "Note - Liabilities directly associated with assets classified as held for sale",
    },
    { value: 36, label: "NOTE 36" },
    { value: 37, label: "NOTE 37" },
    { value: 38, label: "NOTE 38" },
    { value: 39, label: "NOTE 39" },
    { value: 40, label: "NOTE 40" },
    { value: 41, label: "NOTE 41" },
    { value: 42, label: "NOTE 42" },
    { value: 43, label: "NOTE 43" },
    { value: 44, label: "NOTE 44" },
    { value: 45, label: "NOTE 45" },
  ];

  const [value, setValue] = React.useState(0);
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const [isHide, setHide] = useState(false);

  React.useEffect(() => {
    setRows([]);
    setHide(false);

    fetchBalanceSheet();
  }, [value, props.updateTabs]);

  const fetchBalanceSheet = () => {
    setHideData([]);
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };

    console.log(typeof value);
    console.log(value);
    if (value === 0) {
      axios
        .get(`/api/v1/bs/generate-bs/${project_id}/${TB_ID}`, { headers })
        .then((response) => {
          // setLoading(false)
          console.log(response.data.balance_sheet, "response response");
          setRows(response.data.balance_sheet);
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    } else {
      axios
        .get(`/api/v1/pnl/generate-pnl/${project_id}/${TB_ID}`, { headers })
        .then((response) => {
          console.log(response, "response response");
          console.log(response.data.pnl_statement, "response response");
          setRows(response.data.pnl_statement);
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleSelect(e) {
    if (e == null) {
      return;
    }
    setValue(e.value);
  }

  React.useEffect(() => {
    console.log(rows);
    console.log(hideData);
    // setRows([])
    if (hideData.length > 0) {
      hideData.map((hidedata) => {
        console.log(rows[hidedata]);
        delete rows[hidedata];
      });

      console.log(rows);
    } else {
    }
  }, [isHide]);

  const handleEye = () => {
    if (isHide) {
      setHide(false);
      fetchBalanceSheet();
    } else {
      setHide(true);
    }
  };

  const handleOptions = (o) => {
    setRows([]);
    if (o === 0) {
      setValue(0);
    } else {
      setValue(1);
    }
  };

  console.log(rows);
  console.log(hideChildData);
  return (
    <div style={{ width: "100%" }}>
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "60%", height: "60px" }}>
              <Select
                as="select"
                options={options}
                placeholder="select the notes"
                isClearable
                onChange={(e) => {
                  handleSelect(e);
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: "6px",
                  zIndex: "0",
                  colors: {
                    ...theme.colors,
                    borderColor: "white",
                    backgroundColor: "white",
                    primary25: "#03565a98",
                    primary: "#03565A",
                  },
                  spacing: {
                    ...theme.spacing,
                    // controlHeight: 20,
                  },
                })}
              />
            </th>
            <th style={{}}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  onClick={(e) => {
                    handleOptions(0);
                    // setValue(0);
                  }}
                  style={shortcut}
                >
                  BS
                </div>
                <div
                  onClick={(e) => {
                    handleOptions(1);
                    // setValue(1);
                  }}
                  style={shortcut}
                >
                  PNL
                </div>
                {/* <div
                  onClick={(e) => {
                    handleEye();
                  }}
                  style={shortcut}
                >
                  {!isHide ? (
                    <i class="far fa-eye-slash"></i>
                  ) : (
                    <i class="far fa-eye"></i>
                  )}
                </div> */}
                <div></div>
              </div>
            </th>
            {/* <th style={{}}>Previous year</th> */}
            {/* <th style={{}}>Current year</th> */}
            {/* <th style={{minWidth:'200px',width: '20vw',}}>Guidances</th> */}
          </tr>
        </thead>
      </table>
    </div>
    <Box className="MuiBox-rootTab" sx={{ width: "100%" }}>
      <TabPanel style={{ margin: "0", padding: "0" }} value={value} index={0}>
        <ConsoleBalanceSheet
        setTempValue={setValue}
        setGroup={setGroup}
        rows={rows}
        setHideData={setHideData}
        hideData={hideData}
        hideChildData={hideChildData}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <ConsolePnlStatement
            setTempValue={setValue}
            rows={rows}
            setHideData={setHideData}
            hideData={hideData}
            hideChildData={hideChildData}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ConsolePattern1
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
            note_no={3}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ConsolePattern1
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
            note_no={3}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ConsolePattern1
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
            note_no={4}
          />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ConsolePattern1
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
            note_no={5}
          />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <ConsolePattern1
            note_no={5}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <ConsolePattern1
            note_no={7}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <ConsolePattern1
            note_no={8}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <ConsolePattern2
            note_no="6(a)"
            group={0}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <ConsolePattern2
            note_no="6(c)"
            group={0}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={11}>
          <ConsolePattern2
            note_no="6(e)"
            group={0}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
          {/* <Pattern2 note_no='6(e)'  SetNewSg={props.SetNewSg} setAddGrouping={props.setAddGrouping} /> */}
        </TabPanel>
        <TabPanel value={value} index={12}>
          <ConsolePattern2
            note_no="6A"
            group={0}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={13}></TabPanel>
        <TabPanel value={value} index={14}>
          <ConsolePattern1
            note_no="9"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={15}>
          <ConsolePattern1
            note_no="6(b)"
            group={0}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={16}>
          <ConsolePattern1
            note_no="6(d)"
            group={0}
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={17}>
          <ConsolePattern1
            note_no="10"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={18}>
          <ConsolePattern1
            note_no="11"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={19}>
          {/* <Pattern1 note_no={3} /> */}
        </TabPanel>
        <TabPanel value={value} index={20}>
          <ConsolePattern1
            note_no="13(a)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
          {/* <Pattern1 note_no={3} /> */}
        </TabPanel>
        <TabPanel value={value} index={21}>
          {/* <Pattern1 note_no={3} /> */}
          <ConsolePattern1
            note_no="12(b)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        {/* <TabPanel value={value} index={22}>
                </TabPanel> */}
        <TabPanel value={value} index={22}>
          <ConsolePattern1
            note_no="12(c)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={23}>
          {/* <Pattern1 note_no={3} /> */}
        </TabPanel>
        
        <TabPanel value={value} index={24}>
          <ConsolePattern3
            note_no="13(a)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={25}>
          <ConsolePattern3
            note_no="13(b)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={26}>
          <ConsolePattern1
            note_no="14"
            c_no=""
            nc_no=""
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={27}>
          <ConsolePattern3
            note_no="15"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={28}>
          <ConsolePattern1
            note_no="16"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={29}>
          <ConsolePattern3
            note_no="18"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={30}>
          <ConsolePattern1
            note_no="18(b)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
          {/* <Pattern1 note_no={3} /> */}
        </TabPanel>
        <TabPanel value={value} index={31}>
          <ConsolePattern1
            note_no="13(c)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={32}>
          <ConsolePattern2
            note_no="6A"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={33}>
          <ConsolePattern1
            note_no="17"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={34}>
          <ConsolePattern1
            note_no="19"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={35}>
          {/* <Pattern1 note_no='17' /> */}
        </TabPanel>
        <TabPanel value={value} index={36}>
          <ConsolePattern1
            note_no="20"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={37}>
          <ConsolePattern1
            note_no="21(a)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={38}>
          <ConsolePattern1
            note_no="21(b)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={49}>
          <ConsolePattern1
            note_no="22(a)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={40}>
          <ConsolePattern1
            note_no="22(b)"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={41}>
          <ConsolePattern1
            note_no="23"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={42}>
          <ConsolePattern1
            note_no="24"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={43}>
          {/* <Pattern1 note_no='17' /> */}
        </TabPanel>
        <TabPanel value={value} index={44}>
          {/* <Pattern1 note_no='17' /> */}
        </TabPanel>
        <TabPanel value={value} index={45}>
          <ConsolePattern1
            note_no="25"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={46}>
          <ConsolePattern1
            note_no="26"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={47}>
          <ConsolePattern1
            note_no="27"
            SetNewSg={props.SetNewSg}
            setAddGrouping={props.setAddGrouping}
          />
        </TabPanel>
        <TabPanel value={value} index={48}>
          {/* <Pattern1 note_no='17' /> */}
        </TabPanel>
        <TabPanel value={value} index={49}>
          {/* <Pattern1 note_no='17' /> */}
        </TabPanel>
        <TabPanel value={value} index={50}>
          {/* <Pattern1 note_no='17' /> */}
        </TabPanel>
    </Box>
  </div>
  )
}

export default ConsoleTemplateTabs
