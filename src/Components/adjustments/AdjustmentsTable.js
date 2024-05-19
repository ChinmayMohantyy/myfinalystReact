import React, { useState, useEffect, useContext } from "react";
import { List, TextareaAutosize } from "@material-ui/core";
import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Select from "react-select";
import { Submit } from "../Button";
import { socket } from "../../services/socket/socket";
import moment from 'moment';

import "../../resource/style/extra.css";

import cross from "../../assets/cross.svg";
import ExcelFile from "react-export-excel/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-export-excel/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-export-excel/dist/ExcelPlugin/elements/ExcelColumn";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import 'react-datepicker/dist/react-datepicker.css'
// import DatePicker from 'react-date-picker'
import DatePicker from "react-datepicker";
import { Spinner, DropdownButton, Dropdown } from "react-bootstrap";
import {
  AccessProjectContext,
  ThemeContext,
} from "../../helper/DarkModeContext";
import AddLedger from "../addLedger/AddLedger";

const AdjustmentsTable = (props) => {
  const dispatch = useDispatch();

  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const auth = localStorage.getItem("auth_token");
  let headers = {
    "x-auth-token": auth,
  };
  const project_id = localStorage.getItem("project_id");
  const [line, setLine] = useState([]);
  const [adjusted, setAdjusted] = useState([]);
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  const [editval, setEditval] = useState(null);
  const [options, setOptions] = useState([]);
  // const [showCreate, setShowCreate] = useState(false);
  // const [editOn, setEditOn] = useState(false);
  const [remark, setRemark] = useState("");
  const [render, setRender] = useState("");
  const [value, setValue] = useState("");
  const [updateValue, setupdateValue] = useState("");
  const [codeoptions, setCodeOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState({});
  const [isUpdate, setUpdate] = useState(false);
  const [findproject,getProjectFind] = useState("");
  const span = line.length;
  const { theme } = useContext(ThemeContext);

  const { access, setAccess } = useContext(AccessProjectContext);

  console.log(moment(findproject.previous_year).format("DD/MM/yy"));
  // console.log(editval)

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "48% 48% ",
    gridColumnGap: "5%",
    // gridRowGap: '10px'
  };
  const head = {
    display: "flex",
  };

  const header = {
    fontSize: "2rem",
    fontWeight: "600",
  };
  const input = {
    width: "20vw",
    height: "3rem",
    borderRadius: "6px",
    outline: "none",
    border: "1px solid #D0D0D0",
    padding: "10px",
    fontSize: "20px",
    margin: "15px",
    color: "var(--clr-font-dark)",
  };
  const presetHeader = {
    fontSize: "14px",
    color: "var(--clr-font-mid)",
    margin: "0 15px 5px 0px",
    // width:'1px'
  };

  const footSelect = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "1.2rem",
  };

  useEffect(() => {
    axios
      .get(`api/v1/adjustments/fetch-ledger/${project_id}/${TB_ID}`, {
        headers,
      })
      .then((res) => {
        console.log(res, "response  npotes notes resonse response response");

        setItems(res.data.ledger_list);
      })
      .catch((err) => {
        console.log(err.response);
      });

    fetchAdjustments();
    // handleOptions();
  }, [isUpdate]);

  const fetchAdjustments = () => {
    axios
      .get(`api/v1/adjustments/fetch-adjustments/${project_id}/${TB_ID}`, {
        headers,
      })
      .then((res) => {
        console.log(
          res,
          " sadasdas response  npotes notes resonse response response"
        );

        setAdjusted(res.data.adjustments);
        props.setLine(res.data.adjustments);
        setUpdate(false)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    return () => {
      <ExcelFile
        filename={"Export Adjustments"}
        element={
          <div>
            <img style={{ marginRight: "5px" }} />
            Export
          </div>
        }
      >
        <ExcelSheet data={adjusted} name="Ledger Data">
          <ExcelColumn label="Ledger Code" value="ledger_code" />
          <ExcelColumn label="ledger_name" value="ledger_name" />
          <ExcelColumn label="Current Year" value="cy" />
          <ExcelColumn
            label="Net Adjusted Amount"
            value="net_adjusted_amount"
          />
          <ExcelColumn label="Previous Year" value="py" />
          <ExcelColumn label="fS Group" value="fs_grp" />
          <ExcelColumn label="Notes Group" value="note_grp" />
          <ExcelColumn label="Sub Group" value="sub_grp" />
        </ExcelSheet>
      </ExcelFile>;
    };
    props.setExportAdjustments(false);
  }, [props.exportAdjustments]);

  useEffect(() => {
    items.map((val) => {
      console.log(val, "val here");
      // setOptions(options => [...options,{ 'value': val.ledger_code  ,'label': `${val.ledger_code} - ` }])
      setOptions((options) => [
        ...options,
        { value: val.lid, label: `${val.ledger_name}` },
      ]);

      setCodeOptions((codeoptions) => [
        ...codeoptions,
        {
          value: val.lid,
          label: `${val.ledger_code}`,
        },
      ]);
    });

    axios
    .get(`api/v1/tb-onboarding/findProjects/${project_id}`, {
      headers,
    })
    .then((response) => {
      console.log(response.data);
      getProjectFind(response.data)
    });

    return () => {
      setOptions([]);
      setCodeOptions([]);
    };

    
     
  }, [items]);

  console.log(options);

  function handleSelect(e) {
    console.log(e.target.textContent);
    if (e) {
      items.map((tab) => {
        if (line.some((user) => user.lid === tab.lid)) {
          // swal("", "Ledger Item already selected", "warning")
          return;
        }
        console.log(tab.ledger_name);

        if (tab.ledger_name === e.target.textContent) {
          const content = tab;
          content.isAdjusted = true;
          content.adjusted_amount = 0;
          console.log(content, "contetn");
          console.log(line, "contetn");
          let newList = line.concat(content);

          setLine([...line, content]);
        }
      });
    }
  }

  function handleSelectcode(e) {
    console.log(e.target.textContent);
    console.log(items);
    if (e) {
      items.map((tab) => {
        if (line.some((user) => user.lid === tab.lid)) {
          console.log("ghjjjjjjjjjjjjjjjj");
          // swal("", "Ledger Item already selected", "warning")
          return;
        }
        if (tab.ledger_code === e.target.textContent) {
          const content = tab;
          content.isAdjusted = true;
          content.adjusted_amount = 0;
          let newList = line.concat(content);

          console.log(line);
          console.log(newList);

          setLine([...line, content]);
        }
      });
    }
  }

  function handleChange(i, e, field) {
    if (field === "adjusted_amount") {
      let newLine = line;
      newLine[i].adjusted_amount = e.target.value;
      newLine[i].net_adjusted_amount = line[i].cy + Number(e.target.value);
      console.log(newLine, "line i");
      let val = Math.random();
      setLine(newLine);
      setEditval(val);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handlePost() {
    console.log("kakakaka");
    console.log(value);
    line.map((li) => {
      if ((li.adjusted_amount === "") | (li.adjusted_amount === 0)) {
        swal("", "Adjustments cant be empty", "warning");
        return;
      }
    });
    if (line.length === 0) {
      swal("", "Adjustments cant be empty", "warning");
      return;
    }
    const sum = line.reduce(
      (totalpy, i) => totalpy + Number(i.adjusted_amount),
      0
    );
    if (sum == 0) {
      let ledger_items = [];
      adjusted.map((adj, i) => {
        var sortedKeys = Object.keys(adj).sort();
        var first = adj[sortedKeys[0]];
        console.log(first.length, "length");
        first.map((val, ix) => {
          if (
            ledger_items.length > 0 &&
            ledger_items.some((user) => user.lid === val.lid)
          ) {
            let index1 = ledger_items.findIndex((x) => x.lid === val.lid);
            ledger_items[index1].adjusted_amount =
              Number(ledger_items[index1].adjusted_amount) +
              Number(val.adjusted_amount);
          } else {
            ledger_items.push({
              lid: val.lid,
              ledger_name: val.ledger_name,
              ledger_code: val.ledger_code,
              branch: val.branch,
              adjusted_amount: Number(val.adjusted_amount),
              cy: Number(val.cy),
            });
          }
        });
      });

      line.map((itm) => {
        if (
          ledger_items.length > 0 &&
          ledger_items.some((user) => user.lid === itm.lid)
        ) {
          let index1 = ledger_items.findIndex((x) => x.lid === itm.lid);
          ledger_items[index1].adjusted_amount =
            Number(ledger_items[index1].adjusted_amount) +
            Number(itm.adjusted_amount);
        } else {
          ledger_items.push({
            lid: itm.lid,
            ledger_name: itm.ledger_name,
            ledger_code: itm.ledger_code,
            branch: itm.branch,
            adjusted_amount: Number(itm.adjusted_amount),
            cy: Number(itm.cy),
          });
        }
      });
      console.log(
        ledger_items,
        "ledger_items ledger_itemsledger_items ledger_items"
      );
      const auth = localStorage.getItem("auth_token");
      let headers = { "x-auth-token": auth };
      const line_dat = line;
      const string = {};
      string.data = line_dat;
      string.remarks = remark;
      string.date = value.date;
      let stringAdjustment = JSON.stringify(string);
      let stringItems = JSON.stringify(ledger_items);
      console.log(stringAdjustment);
      // console.log(date,"dateeeeeeeeeeeee");
      console.log(stringItems, `${project_id}/${TB_ID}`);
      const fd = new FormData();
      fd.append("adjustments", stringAdjustment);
      fd.append("ledger_items", stringItems);
      axios
        .post(
          `/api/v1/adjustments/save-adjustment-line-item/${project_id}/${TB_ID}`,
          fd,
          { headers }
        )
        .then((res) => {
          console.log(res, "response  npotes notes resonse response response");
          fetchAdjustments();
          setLine([]);
          axios
            .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
              headers,
            })
            .then((response) => {
              dispatch({
                type: actionTypes.SET_TABLE_DATA,
                payload: response.data.data.line_items,
              });
            });
        })
        .catch((err) => {
          console.log(err.response);
          fetchAdjustments();
          setLine([]);
        });
    }
    if (sum != 0) {
      swal("", "Adjustments sum should be 0", "warning");
    }
  }

  const adjustmentsTable = {
    minWidth: "1045px",
    maxHeight: "75vh",
    overflowY: "scroll",
    minHeight: "77vh",
  };

  function handleDelete(id, i) {
    const value = id[0];
    let ledger_items = [];
    adjusted.map((adj, ind) => {
      var sortedKeys = Object.keys(adj).sort();
      var first = adj[sortedKeys[0]];
      // console.log(first.length,'length')
      if (ind === i) {
        let stringAdjustment = JSON.stringify(adj);
        console.log(stringAdjustment);
        console.log(first, "inx");
        return first.map((val, ix) => {
          if (
            ledger_items.length > 0 &&
            ledger_items.some((user) => user.lid === val.lid)
          ) {
            let index1 = ledger_items.findIndex((x) => x.lid === val.lid);
          } else {
            ledger_items.push({
              lid: val.lid,
              ledger_name: val.ledger_name,
              ledger_code: val.ledger_code,
              branch: val.branch,
              isAdjusted: false,
              adjusted_amount: 0,
              cy: Number(val.cy),
            });
          }
        });
      }
      first.map((val, ix) => {
        if (
          ledger_items.length > 0 &&
          ledger_items.some((user) => user.lid === val.lid)
        ) {
          let index1 = ledger_items.findIndex((x) => x.lid === val.lid);
          ledger_items[index1].adjusted_amount =
            Number(ledger_items[index1].adjusted_amount) +
            Number(val.adjusted_amount);
        } else {
          ledger_items.push({
            lid: val.lid,
            ledger_name: val.ledger_name,
            ledger_code: val.ledger_code,
            branch: val.branch,
            isAdjusted: true,
            adjusted_amount: Number(val.adjusted_amount),
            cy: Number(val.cy),
          });
        }
      });
    });
    // console.log(ledger_items)
    let stringItems = JSON.stringify(ledger_items);
    console.log(stringItems);
    const fd = new FormData();
    fd.append("ledger_items", stringItems);
    console.log(headers, `${project_id}/${TB_ID}/${value}`);
    // fetch(`http://localhost:8081/api/v1/adjustments/delete-adjustment-line-item/${project_id}/${TB_ID}/${value}`, {
    fetch(
      `https://myfinalystapi.icodexa.com/api/v1/adjustments/delete-adjustment-line-item/${project_id}/${TB_ID}/${value}`,
      {
        method: "DELETE",
        body: fd,
        headers: { "x-auth-token": auth },
      }
    )
      .then((res) => {
        console.log(res, "delete-adjustment response");
        axios
          .get(`api/v1/adjustments/fetch-adjustments/${project_id}/${TB_ID}`, {
            headers,
          })
          .then((res) => {
            console.log(res, "fetch-adjustments response");
            setAdjusted(res.data.adjustments);
            props.setLine(res.data.adjustments);
            const arr = [];
            res.data.adjustments.map((adj) => {
              console.log(adj, "adj da");
              var sortedKeys = Object.keys(adj).sort();
              var first = adj[sortedKeys[0]];
              first.map((val, ix) => {
                console.log(val.lid, "val here");
                const content = {};
                content.lid = val.lid;
                content.adjusted_amount = val.adjusted_amount;
                content.updated_adjusted_amount = val.adjusted_amount;
                arr.push(content);
              });
            });
            axios
              .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
                headers,
              })
              .then((response) => {
                dispatch({
                  type: actionTypes.SET_TABLE_DATA,
                  payload: response.data.data.line_items,
                });
                setRender(Math.random());
              });
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((error) => console.log(error));
  }

  function handleEdit(i, first, value, date) {
    setEdit(i);
    setLine(first);
    setRemark(value);
    setupdateValue({ updatedate: date });
    props.setShowCreate(false);
    props.setEditOn(true);
  }

  const nf = new Intl.NumberFormat();

  function handleSaveEdit(id) {
    line.map((li) => {
      if ((li.adjusted_amount === "") | (li.adjusted_amount === 0)) {
        swal("", "Adjustments cant be empty", "warning");
        return;
      }
    });
    if (line.length === 0) {
      swal("", "Adjustments cant be empty", "warning");
      return;
    }
    const sum = line.reduce(
      (totalpy, i) => totalpy + Number(i.adjusted_amount),
      0
    );
    if (sum == 0) {
      const value = id[0];
      let ledger_items = [];
      adjusted.map((adj, i) => {
        var sortedKeys = Object.keys(adj).sort();
        var first = adj[sortedKeys[0]];
        console.log(first.length, "length");
        first.map((val, ix) => {
          if (
            ledger_items.length > 0 &&
            ledger_items.some((user) => user.lid === val.lid)
          ) {
            let index1 = ledger_items.findIndex((x) => x.lid === val.lid);
            ledger_items[index1].adjusted_amount =
              Number(ledger_items[index1].adjusted_amount) +
              Number(val.adjusted_amount);
          } else {
            ledger_items.push({
              lid: val.lid,
              ledger_name: val.ledger_name,
              ledger_code: val.ledger_code,
              branch: val.branch,
              adjusted_amount: Number(val.adjusted_amount),
              cy: Number(val.cy),
            });
          }
        });
      });

      // line.map((itm)=>{
      //   if(ledger_items.length > 0 && ledger_items.some(user => user.lid === itm.lid)){
      //     let index1 = ledger_items.findIndex(x => x.lid === itm.lid)
      //     ledger_items[index1].adjusted_amount = Number(ledger_items[index1].adjusted_amount) +  Number(itm.adjusted_amount)
      //   }
      //   else{
      //     ledger_items.push({'lid':itm.lid,'ledger_name':itm.ledger_name,'ledger_code':itm.ledger_code,'branch':itm.branch,'adjusted_amount':Number(itm.adjusted_amount),'cy':Number(itm.cy)})
      //   }
      // })
      // console.log(ledger_items,'ledger_items ledger_itemsledger_items ledger_items')
      const auth = localStorage.getItem("auth_token");
      let headers = { "x-auth-token": auth };
      const string = {};
      string.data = line;
      string.remarks = remark;
      string.date = updateValue.updatedate;
      let stringAdjustment = JSON.stringify(string);
      let stringItems = JSON.stringify(ledger_items);
      console.log(stringAdjustment);
      console.log(stringItems);
      console.log(value);
      const fd = new FormData();
      fd.append("adjustment", stringAdjustment);
      fd.append("ledger_items", stringItems);
      axios
        .post(
          `/api/v1/adjustments/edit-adjustment/${project_id}/${TB_ID}/${value}`,
          fd,
          { headers }
        )
        .then((res) => {
          setEdit(null);
          props.setEditOn(false);
          console.log("save here man ");
          console.log(res, "response  npotes notes resonse response response");
          axios
            .get(
              `api/v1/adjustments/fetch-adjustments/${project_id}/${TB_ID}`,
              { headers }
            )
            .then((res) => {
              console.log(
                res,
                " sadasdas response  npotes notes resonse response response"
              );
              setAdjusted(res.data.adjustments);
              props.setLine(res.data.adjustments);
              props.setShowCreate(false);
              setRender(Math.random());
            })
            .catch((err) => {
              console.log(err.response);
            });
          setLine([]);
          axios
            .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
              headers,
            })
            .then((response) => {
              dispatch({
                type: actionTypes.SET_TABLE_DATA,
                payload: response.data.data.line_items,
              });
            });
        })
        .catch((err) => {
          console.log(err.response);
          axios
            .get(
              `api/v1/adjustments/fetch-adjustments/${project_id}/${TB_ID}`,
              { headers }
            )
            .then((res) => {
              console.log(
                res,
                " sadasdas response  npotes notes resonse response response"
              );
              setAdjusted(res.data.adjustments);
              props.setLine(res.data.adjustments);
              props.setShowCreate(false);
              props.setEditOn(false);
              //  setEditOn(false)
              setRender(Math.random());
            })
            .catch((err) => {
              props.setEditOn(false);
              console.log(err.response);
            });
          setLine([]);
        });
    }
    if (sum != 0) {
      swal("", "Adjustments sum should be 0", "warning");
    }
  }

  function handleCancel() {
    setEdit(null);
    setLine([]);
    props.setShowCreate(false);
    props.setEditOn(false);
  }

  function handleOptions() {
    if (props.editOn) {
      swal(
        "",
        "Please Save the adjustment to create new adjustments",
        "warning"
      );
      return;
    }
    setRemark("");
    // setEditOn(true)
  }

  function handleAddOption() {
    setOpen(true);
  }

  function handleRemark(e) {
    setRemark(e.target.value);
  }

  function handleSubmitName() {
    console.log("nbvcx");
  }

  function handleDrop(i) {
    var arr1 = line;
    delete arr1[i];
    var arr2 = line.splice(i, 1);
    // const result = line.filter((row,ix) => ix !== i )
    console.log(arr1, "arr1 spliced arr");
    setLine(arr1);
    setRender(Math.random());
    // console.log(result,' result spliced arr')
    // console.log(arr2,'spliced arr')
    // setRemark(e.target.value)
  }


  function handleDataChange(e){
    console.log(e);
  }

  console.log(props.showCreate);
  console.log(value.date);
  return (
    <React.Fragment>
      {open && (
        <AddLedger close={setOpen} name="Add Ledger Below" select={select} tb_id={TB_ID} setUpdate={setUpdate}/>
      )}
      <div className="adjustmentsTable" style={adjustmentsTable}>
        <table
          className={`${access.access === "View" ? "disabled-table" : ""}`}
        >
          <thead style={{ fontSize: "2rem" }}>
            <tr>
              <th
                style={{
                  width: "4%",
                  maxWidth: "8%",
                  height: "62px",
                  textAlign: "left",
                }}
              >
                S no
              </th>
              <th
                style={{
                  width: "4%",
                  maxWidth: "8%",
                  height: "62px",
                  textAlign: "left",
                }}
              >
                Date
              </th>
              <th style={{ width: "8%", maxWidth: "9%" }}>Ledger Code</th>
              <th style={{ width: "20%", maxWidth: "20%" }}>Ledger Name</th>
              <th style={{ width: "2%", maxWidth: "5%", textAlign: "center" }}>
                BRANCH/SEGMENT
              </th>
              <th
                style={{
                  width: "9%",
                  maxWidth: "9%",
                  height: "62px",
                  textAlign: "center",
                }}
              >
                31 Mar 2021
              </th>
              <th style={{ width: "10%", maxWidth: "10%" }}>Adjustments</th>
              <th style={{ width: "20%", maxWidth: "20%" }}>Remarks</th>
              <th
                style={{
                  width: "15%",
                  maxWidth: "15%",
                  textAlign: "left",
                  paddingLeft: "3rem",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {adjusted.map((adj, i) => {
              var sortedKeys = Object.keys(adj).sort();
              var first = adj[sortedKeys[0]];
              console.log(first.length, "length");
              const date = adj["date"];
              console.log(adj["remarks"], adj.remarks, "adj adj adj length");
              if (i == edit) {
                // setEditval(first)
                return (
                  <>
                    {line.map((lines, i) => {
                      if (i === 0) {
                        return (
                          <tr
                            style={{
                              background: `${theme ? "" : "#363535"}`,
                            }}
                            key={i}
                          >
                            <td
                              style={{ height: "150px", textAlign: "center" }}
                              rowSpan={span + 1}
                            >
                              {adjusted.length}
                            </td>
                            <td
                              style={{ textAlign: "center" }}
                              rowspan={span + 1}
                            >
                              {/* <input
                                type="date"
                                maxDate={moment().toDate()}
                                value={updateValue.updatedate}
                                onChange={(e) => {
                                  setupdateValue({
                                    ...updateValue,
                                    ["updatedate"]: e.target.value,
                                  });
                                }}
                              ></input> */}
                              <DatePicker dateFormat="dd/MM/yyyy" selected={moment(updateValue.updatedate).toDate()}
                              // value={updateValue.updatedate}
                                onChange={(e) => {
                                  setupdateValue({
                                    ...updateValue,
                                    ["updatedate"]: e,
                                  });
                              }}
                              minDate={moment(findproject.previous_year).toDate()}
                              maxDate={moment(findproject.current_year).toDate()}/>
                            </td>
                            <td
                              style={{
                                height: "150px",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {" "}
                              {lines.ledger_code}
                            </td>
                            <td
                              style={{
                                height: "150px",
                                textAlign: "left",
                                color: "GrayText",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div>{lines.ledger_name}</div>
                              <div
                                style={{ marginLeft: "auto" }}
                                onClick={() => {
                                  handleDrop(i);
                                }}
                              >
                                <img src={cross} />
                                {/* {lines.ledger_name} */}
                              </div>
                            </td>
                            <td
                              style={{ height: "150px", textAlign: "center" }}
                            >
                              {lines.branch}
                            </td>
                            <td
                              style={{
                                height: "150px",
                                textAlign: "right",
                                paddingRight: "10px",
                              }}
                            >
                              {nf.format(lines.cy)}
                            </td>
                            <td
                              style={{ height: "150px", textAlign: "center" }}
                            >
                              <input
                                type="number"
                                value={lines.adjusted_amount}
                                onChange={(e) => {
                                  handleChange(i, e, "adjusted_amount");
                                }}
                                style={{
                                  maxWidth: "140px",
                                  border: "none",
                                  textAlign: "right",
                                }}
                              />
                            </td>
                            <td
                              style={{ textAlign: "center" }}
                              rowspan={span + 1}
                            >
                              {line.length === 0 ? null : (
                                <TextareaAutosize
                                  style={{
                                    paddingLeft: "10px",
                                    width: "100%",
                                    border: "none",
                                  }}
                                  aria-label="maximum height"
                                  value={remark}
                                  onChange={(e) => {
                                    handleRemark(e);
                                  }}
                                  maxRows={line.length}
                                  placeholder="enter your remark here ..."
                                />
                              )}
                            </td>
                            <td
                              style={{ textAlign: "left" }}
                              rowspan={span + 1}
                            >
                              {line.length === 0 ? null : (
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    paddingLeft: "10px",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    onClick={() => {
                                      handleSaveEdit(sortedKeys);
                                    }}
                                  >
                                    <Submit value="  save  " sm />
                                  </div>
                                  <div
                                    onClick={() => {
                                      handleCancel();
                                    }}
                                  >
                                    <p
                                      style={{
                                        fontWeight: "600",
                                        color: "#03565A",
                                        fontSize: "1.1rem",
                                        margin: "0",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Cancel
                                    </p>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr
                          style={{
                            background: `${theme ? "" : "#363535"}`,
                          }}
                          key={i}
                        >
                          <td style={{ height: "150px", textAlign: "center" }}>
                            {lines.ledger_code}
                          </td>
                          <td
                            style={{
                              height: "150px",
                              textAlign: "left",
                              color: "GrayText",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>{lines.ledger_name}</div>
                            <div
                              style={{ marginLeft: "auto" }}
                              onClick={() => {
                                handleDrop(i);
                              }}
                            >
                              <img src={cross} />
                              {/* {lines.ledger_name} */}
                            </div>
                          </td>
                          <td style={{ height: "150px", textAlign: "center" }}>
                            {lines.branch}
                          </td>
                          <td
                            style={{
                              height: "150px",
                              textAlign: "right",
                              paddingRight: "10px",
                            }}
                          >
                            {nf.format(lines.cy)}
                          </td>
                          <td style={{ height: "150px", textAlign: "center" }}>
                            <input
                              type="number"
                              value={lines.adjusted_amount}
                              onChange={(e) => {
                                handleChange(i, e, "adjusted_amount");
                              }}
                              style={{
                                maxWidth: "140px",
                                border: "none",
                                textAlign: "right",
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <tr
                      style={{
                        background: `${theme ? "" : "#363535"}`,
                      }}
                    >
                      <td style={{ height: "150px", textAlign: "center" }}>
                        <DropdownButton
                          id="dropdown-item-button"
                          onClick={(e) => {
                            handleSelectcode(e);
                          }}
                          title={
                            // row.original.sub_grp
                            //   ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                            //   :
                            "Select Ledger Code"
                          }
                        >
                          {codeoptions.map((opt, ix) => {
                            return (
                              <Dropdown.Item as="button" key={ix}>
                                {opt.label}
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                      </td>

                      <td
                        style={{
                          height: "150px",
                          textAlign: "center",
                          color: "black",
                        }}
                      >
                        {/* <Select
                        placeholder=""
                        as="select"
                        options={options}
                        // placeholder='select to add'
                        isClearable
                        onChange={(e) => {
                          handleSelect(e);
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: "0px",
                          colors: {
                            ...theme.colors,
                            borderColor: "white",
                            backgroundColor: "white",
                            primary25: "#03565a98",
                            primary: "#03565A",
                          },
                          spacing: {
                            ...theme.spacing,
                            controlHeight: 20,
                          },
                        })}
                      /> */}

                        <DropdownButton
                          //   value={row.note_grp}
                          id="dropdown-item-button"
                          // onClick={(e) =>
                          //   handleChanges(e, ind, row, "sub_grp")
                          // }
                          onClick={(e) => {
                            handleSelect(e);
                          }}
                          title={
                            // row.original.sub_grp
                            //   ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                            //   :
                            "Select Ledger Name"
                          }
                        >
                          {options.map((opt, ix) => {
                            return (
                              <Dropdown.Item as="button" key={ix}>
                                {opt.label}
                              </Dropdown.Item>
                            );
                          })}
                        </DropdownButton>
                      </td>
                      <td style={{ height: "150px", textAlign: "center" }}></td>

                      <td style={{ height: "150px", textAlign: "center" }}></td>
                      <td style={{ height: "150px", textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}></td>
                    </tr>
                  </>
                );
              }
              return first.map((val, ix) => {
                // console.log(val,ix,'individual rows')
                const inx = first.length;
                const height = inx * 45 - 10;
                const value = adj["remarks"];
                const date = adj["date"];
                console.log(height, "what");
                if (ix === 0) {
                  return (
                    <tr
                      style={{
                        background: `${theme ? "" : "#363535"}`,
                      }}
                      key={ix}
                    >
                      <td
                        style={{ height: "150px", textAlign: "center" }}
                        rowSpan={first.length}
                      >
                        {i + 1}
                      </td>
                      <td
                        style={{ textAlign: "center", padding: "10px" }}
                        rowSpan={first.length}
                      >
                        <div
                          style={{
                            maxHeight: `${height}px`,
                            // ,maxHeight:'80px'
                            overflowY: "scroll",
                          }}
                        >
                          {moment(date).format("DD/MM/yy")}
                        </div>
                      </td>
                      <td style={{ height: "150px", textAlign: "center" }}>
                        {val.ledger_code}
                      </td>
                      <td
                        style={{
                          height: "150px",
                          textAlign: "left",
                          paddingLeft: "10px",
                        }}
                      >
                        {val.ledger_name}
                      </td>
                      <td style={{ height: "150px", textAlign: "center" }}>
                        {val.branch}
                      </td>
                      <td
                        style={{
                          height: "150px",
                          textAlign: "right",
                          paddingRight: "10px",
                        }}
                      >
                        {nf.format(val.cy)}
                      </td>
                      <td
                        style={{
                          height: "150px",
                          textAlign: "right",
                          paddingRight: "10px",
                        }}
                      >
                        {nf.format(val.adjusted_amount)}
                      </td>
                      <td
                        style={{ textAlign: "center", padding: "10px" }}
                        rowSpan={first.length}
                      >
                        <div
                          style={{
                            maxHeight: `${height}px`,
                            // ,maxHeight:'80px'
                            overflowY: "scroll",
                          }}
                        >
                          {value}
                        </div>
                      </td>
                      <td style={{ textAlign: "left" }} rowSpan={first.length}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            paddingLeft: "10px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            onClick={() => {
                              handleEdit(i, first, value, date);
                            }}
                          >
                            <Submit value="  Edit  " sm />
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleDelete(sortedKeys, i);
                            }}
                          >
                            <p
                              style={{
                                fontWeight: "600",
                                color: "#03565A",
                                fontSize: "1.1rem",
                                margin: "0",
                              }}
                            >
                              Delete
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr
                      style={{
                        background: `${theme ? "" : "#363535"}`,
                      }}
                      key={ix}
                    >
                      <td style={{ height: "150px", textAlign: "center" }}>
                        {val.ledger_code}
                      </td>
                      <td
                        style={{
                          height: "150px",
                          textAlign: "left",
                          paddingLeft: "10px",
                        }}
                      >
                        {val.ledger_name}
                      </td>
                      <td style={{ height: "150px", textAlign: "center" }}>
                        {val.branch}
                      </td>
                      <td
                        style={{
                          height: "150px",
                          textAlign: "right",
                          paddingRight: "10px",
                        }}
                      >
                        {nf.format(val.cy)}
                      </td>
                      <td
                        style={{
                          height: "150px",
                          textAlign: "right",
                          paddingRight: "10px",
                        }}
                      >
                        {nf.format(val.adjusted_amount)}
                      </td>
                    </tr>
                  );
                }
              });
            })}

            {props.showCreate && line.length > 0 && (
              <>
                {props.showCreate &&
                  line.map((lines, i) => {
                    console.log(lines, " map");
                    if (i === 0) {
                      return (
                        <tr
                          style={{
                            background: `${theme ? "" : "#363535"}`,
                          }}
                          key={i}
                        >
                          <td
                            style={{ height: "150px", textAlign: "center" }}
                            rowSpan={span + 1}
                          >
                            {adjusted.length + 1}
                          </td>
                          <td
                            style={{ textAlign: "center" }}
                            rowspan={span + 1}
                          >
                            {/* <input
                              type="date"
                              maxDate={moment().toDate()}
                              value={value.date}
                              // onChange={(e) => {
                              //   setValue({
                              //     ...value,
                              //     ["date"]: e.target.value,
                              //   });
                              // }}
                            ></input> */}
                                <DatePicker dateFormat="dd/MM/yyyy" selected={value.date}
                             minDate={moment(findproject.previous_year).toDate()}
                             maxDate={moment(findproject.current_year).toDate()}/>
                          </td>
                          <td style={{ height: "150px", textAlign: "center" }}>
                            {lines.ledger_code}
                          </td>
                          <td
                            style={{
                              height: "150px",
                              textAlign: "left",
                              color: "GrayText",
                              paddingLeft: "10px",
                              paddingRight: "10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div>{lines.ledger_name}</div>
                            <div
                              style={{ marginLeft: "auto" }}
                              onClick={() => {
                                handleDrop(i);
                              }}
                            >
                              <img src={cross} />
                              {/* {lines.ledger_name} */}
                            </div>
                          </td>
                          <td style={{ height: "150px", textAlign: "center" }}>
                            {lines.branch}
                          </td>
                          <td
                            style={{
                              height: "150px",
                              textAlign: "right",
                              paddingRight: "10px",
                            }}
                          >
                            {nf.format(lines.cy)}
                          </td>
                          <td style={{ height: "150px", textAlign: "center" }}>
                            <input
                              type="number"
                              onChange={(e) => {
                                handleChange(i, e, "adjusted_amount");
                              }}
                              style={{
                                maxWidth: "140px",
                                border: "none",
                                textAlign: "right",
                              }}
                            />
                          </td>
                          <td
                            style={{ textAlign: "center" }}
                            rowspan={span + 1}
                          >
                            {line.length === 0 ? null : (
                              <TextareaAutosize
                                style={{
                                  paddingLeft: "10px",
                                  width: "100%",
                                  border: "none",
                                }}
                                aria-label="maximum height"
                                maxRows={1}
                                value={remark}
                                onChange={(e) => {
                                  handleRemark(e);
                                }}
                                placeholder="enter your remark here ..."
                              />
                            )}
                          </td>
                          <td style={{ textAlign: "left" }} rowspan={span + 1}>
                            {line.length === 0 ? null : (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  paddingLeft: "10px",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  onClick={() => {
                                    handlePost();
                                  }}
                                >
                                  <Submit value="  save  " sm />
                                </div>
                                <div
                                  onClick={() => {
                                    handleCancel();
                                  }}
                                >
                                  <p
                                    style={{
                                      fontWeight: "600",
                                      color: "#03565A",
                                      fontSize: "1.1rem",
                                      margin: "0",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Cancel
                                  </p>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        style={{
                          background: `${theme ? "" : "#363535"}`,
                        }}
                        key={i}
                      >
                        <td style={{ height: "150px", textAlign: "center" }}>
                          {lines.ledger_code}
                        </td>

                        <td
                          style={{
                            height: "150px",
                            textAlign: "left",
                            color: "GrayText",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div>{lines.ledger_name}</div>
                          <div
                            style={{ marginLeft: "auto" }}
                            onClick={() => {
                              handleDrop(i);
                            }}
                          >
                            <img src={cross} />
                            {/* {lines.ledger_name} */}
                          </div>
                        </td>
                        <td style={{ height: "150px", textAlign: "center" }}>
                          {lines.branch}
                        </td>
                        <td
                          style={{
                            height: "150px",
                            textAlign: "right",
                            paddingRight: "10px",
                          }}
                        >
                          {nf.format(lines.cy)}
                        </td>
                        <td style={{ height: "150px", textAlign: "center" }}>
                          <input
                            type="number"
                            onChange={(e) => {
                              handleChange(i, e, "adjusted_amount");
                            }}
                            style={{
                              maxWidth: "140px",
                              border: "none",
                              textAlign: "right",
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                <tr
                  style={{
                    background: `${theme ? "" : "#363535"}`,
                  }}
                >
                  <td
                    style={{
                      height: "150px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {/* <p
                      style={{
                        fontSize: "1.1rem",
                        fontSize: "500",
                        padding: "0",
                        margin: "5px",
                        color: "var(--clr-accent)",
                        cursor: "pointer",
                      }}
                    >
                      + add options
                    </p> */}
                    {/* <Select
                      placeholder=""
                      as="select"
                      options={codeoptions}
                      // placeholder='select to add'
                      isClearable
                      onChange={(e) => {
                        handleSelectcode(e);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: "0px",
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
                          controlHeight: 20,
                          // zIndex:0
                        },
                      })}
                    /> */}

                    {/* dropdown */}
                    <DropdownButton
                      id="dropdown-item-button"
                      onClick={(e) => {
                        handleSelectcode(e);
                      }}
                      title={
                        // row.original.sub_grp
                        //   ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                        //   :
                        "Select Ledger Code"
                      }
                    >
                      {codeoptions.map((opt, ix) => {
                        return (
                          <Dropdown.Item as="button" key={ix}>
                            {opt.label}
                          </Dropdown.Item>
                        );
                      })}
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontSize: "500",
                            padding: "0",
                            margin: "5px",
                            color: "var(--clr-accent)",
                          }}
                          onClick={() => {
                            handleAddOption();
                          }}
                        >
                          + add options
                        </p>
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td
                    style={{
                      height: "150px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {/* <p
                      style={{
                        fontSize: "1.1rem",
                        fontSize: "500",
                        padding: "0",
                        margin: "5px",
                        color: "var(--clr-accent)",
                        cursor: "pointer",
                      }}
                    >
                      + add options
                    </p> */}
                    {/* <Select
                      placeholder=""
                      as="select"
                      options={options}
                      // placeholder='select to add'
                      isClearable
                      onChange={(e) => {
                        handleSelect(e);
                      }}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: "0px",
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
                          controlHeight: 20,
                          // zIndex:0
                        },
                      })}
                    /> */}

                    {/* dropdown */}
                    <DropdownButton
                      //   value={row.note_grp}
                      id="dropdown-item-button"
                      // onClick={(e) =>
                      //   handleChanges(e, ind, row, "sub_grp")
                      // }
                      onClick={(e) => {
                        handleSelect(e);
                      }}
                      title={
                        // row.original.sub_grp
                        //   ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                        //   :
                        "Select Ledger Name"
                      }
                    >
                      {/* {groupings.grp.map((opt, ix) => {
                          if (row.original.fs_grp === opt.fs_grp) {
                            return opt.notes_grp.map((notes) => {
                              if (
                                notes.notes_grp === row.original.note_grp
                              ) {
                                return notes.sub_grp.map((sub, ix) => {
                                  return (
                                    <Dropdown.Item as="button" key={ix}>
                                      {sub.sub_grp}
                                    </Dropdown.Item>
                                  );
                                });
                              }
                            });
                          }
                        })} */}

                      {options.map((opt, ix) => {
                        return (
                          <Dropdown.Item as="button" key={ix}>
                            {opt.label}
                          </Dropdown.Item>
                        );
                      })}
                      <Dropdown.Divider />
                    </DropdownButton>
                  </td>
                  <td style={{ height: "150px", textAlign: "center" }}></td>
                  <td style={{ height: "150px", textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}></td>
                  {/* <td style={{textAlign:'center',}}></td> */}
                  {/* <td style={{textAlign:'center'}} rowspan={span + 1}>
                            {line.length === 0? null : 
                            <TextareaAutosize  
                            style={{paddingLeft:'10px',width:'100%',border:'none'}} 
                            aria-label="maximum height" 
                            maxRows={1} 
                            value={remark}
                            onChange={(e)=>{handleRemark(e)}}
                            placeholder="enter your remark here ..." />
                            }
                        </td>  */}
                </tr>
              </>
            )}
            {props.showCreate && line.length === 0 && (
              <>
                <tr
                  style={{
                    background: `${theme ? "" : "#363535"}`,
                  }}
                >
                  <td style={{ height: "150px", textAlign: "center" }}></td>
                  <td style={{ height: "150px", textAlign: "center" }}>
                    {/* <input
                      type="date"
                      maxDate={moment().toDate()}
                      onChange={(e) => {
                        setValue({ ...value, ["date"]: e.target.value });
                      }}
                    ></input> */}
                     <DatePicker dateFormat="dd/MM/yyyy" 
                     placeholderText="Select Date"
                     selected={value.date}
                     onChange={(e) => {
                      setValue({ ...value, ["date"]: e });
                    }}
                    minDate={moment(findproject.previous_year).toDate()}
                    maxDate={moment(findproject.current_year).toDate()}/>
                  </td>
                  <td
                    style={{
                      height: "150px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {/* <p
                    style={{
                      fontSize: "1.1rem",
                      fontSize: "500",
                      padding: "0",
                      margin: "5px",
                      color: "var(--clr-accent)",
                      cursor: "pointer",
                    }}
                  >
                    + add options
                  </p> */}
                    {/* <Select
                    placeholder=""
                    as="select"
                    options={codeoptions}
                    // placeholder='select to add'
                    isClearable
                    onChange={(e) => {
                      handleSelectcode(e);
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: "0px",
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
                        controlHeight: 20,
                        // zIndex:0
                      },
                    })}
                  /> */}

                    {/* dropdown */}
                    <DropdownButton
                      id="dropdown-item-button"
                      onClick={(e) => {
                        handleSelectcode(e);
                      }}
                      title={
                        // row.original.sub_grp
                        //   ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                        //   :
                        "Select Ledger Code"
                      }
                    >
                      {codeoptions.map((opt, ix) => {
                        return (
                          <Dropdown.Item as="button" key={ix}>
                            {opt.label}
                          </Dropdown.Item>
                        );
                      })}
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <p
                          style={{
                            fontSize: "1.1rem",
                            fontSize: "500",
                            padding: "0",
                            margin: "5px",
                            color: "var(--clr-accent)",
                          }}
                          onClick={() => {
                            handleAddOption();
                          }}
                        >
                          + add options
                        </p>
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td
                    style={{
                      height: "150px",
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {/* <p
                    style={{
                      fontSize: "1.1rem",
                      fontSize: "500",
                      padding: "0",
                      margin: "5px",
                      color: "var(--clr-accent)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleAddOption();
                    }}
                  >
                    + add options
                  </p> */}
                    {/* <Select
                    placeholder=""
                    as="select"
                    options={options}
                    // placeholder='select to add'
                    isClearable
                    onChange={(e) => {
                      handleSelect(e);
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: "0px",
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
                        controlHeight: 20,
                        // zIndex:0
                      },
                    })}
                  /> */}

                    {/* dropdown */}
                    <DropdownButton
                      //   value={row.note_grp}
                      id="dropdown-item-button"
                      // onClick={(e) =>
                      //   handleChanges(e, ind, row, "sub_grp")
                      // }
                      onClick={(e) => {
                        handleSelect(e);
                      }}
                      title={
                        // row.original.sub_grp
                        //   ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                        //   :
                        "Select Ledger Name"
                      }
                    >
                      {/* {groupings.grp.map((opt, ix) => {
                          if (row.original.fs_grp === opt.fs_grp) {
                            return opt.notes_grp.map((notes) => {
                              if (
                                notes.notes_grp === row.original.note_grp
                              ) {
                                return notes.sub_grp.map((sub, ix) => {
                                  return (
                                    <Dropdown.Item as="button" key={ix}>
                                      {sub.sub_grp}
                                    </Dropdown.Item>
                                  );
                                });
                              }
                            });
                          }
                        })} */}

                      {options.map((opt, ix) => {
                        return (
                          <Dropdown.Item as="button" key={ix}>
                            {opt.label}
                          </Dropdown.Item>
                        );
                      })}
                      <Dropdown.Divider />
                    </DropdownButton>
                  </td>
                  <td style={{ height: "150px", textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}></td>
                  <td style={{ textAlign: "center" }}></td>
                </tr>
              </>
            )}
          </tbody>
          {props.showCreate ? null : (
            <tfoot>
              <tr>
                <td
                  style={{
                    height: "55px",
                    fontSize: "2rem",
                    color: "#03565A",
                    cursor: "pointer",
                  }}
                  // onClick={() => {
                  //   handleOptions();
                  // }}
                >
                  
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </React.Fragment>
  );
};

export default AdjustmentsTable;
