import React, { useState, useEffect, useContext } from "react";
import { List, TextareaAutosize } from "@material-ui/core";
import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import arrow from "../../assets/arrowLeftGreen.svg";
import { useDispatch, useSelector } from "react-redux";
import AdjustmentlogsFilter from "../../Components/AdjustmentlogsFilter";
import Select from "react-select";
// import {Submit} from '../../Button'
import swal from "sweetalert";
import { socket } from "../../services/socket/socket";
import adjustment from "../../assets/adjustment.svg";
import filter from "../../assets/filter.svg";
import download from "../../assets/download.svg";
import trash from "../../assets/trash.svg";
import { Navbar } from "../../Components/Navbar";
import { CSVLink } from "react-csv";
import moment from "moment";
// import {Submit} from '../../Component/Button'
import {
  AccessProjectContext,
  ThemeContext,
} from "../../helper/DarkModeContext";

// import { handleInputChange } from 'react-select/src/utils';

const AdjustmentsLog = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const auth = localStorage.getItem("auth_token");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };
  const project_id = localStorage.getItem("project_id");
  const { theme } = useContext(ThemeContext);
  const { access, setAccess } = useContext(AccessProjectContext);

  // const format = {
  //     lid: "",
  //     ledger_code: "",
  //     ledger_name: "",
  //     cy: '',
  //     adjusted_amount: '',
  //     net_adjustment_amount: '',
  //     isAdjusted: true,
  //     remarks: "",
  //     user_id: "",
  //   }
  const filterData = useSelector((initialState) => initialState.reducer.filter);
  const [line, setLine] = useState([]);
  const [adjusted, setAdjusted] = useState([]);
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [exportAdjustments, setExportAdjustments] = useState([]);
  const [object, setObject] = useState({});
  const [filterShow, setFilterShow] = useState(false);
  const [confirmfilClose, SetConfirmFilClose] = useState(false);
  const [filterRow, setFilterRow] = useState([]);
  const [render, setRender] = useState("");

  const span = line.length;

  console.log(adjusted);
  console.log(options);
  console.log(line, "line");

  useEffect(() => {
    setExportAdjustments([]);
    axios
      .get(`api/v1/adjustments/fetch-adjustment-logs/${project_id}/${TB_ID}`, {
        headers,
      })
      .then((res) => {
        console.log(
          res.data.logs.adjustment_logs,
          " sadasdas response  npotes notes resonse response response"
        );
        setAdjusted(res.data.logs.adjustment_logs);

        res.data.logs.adjustment_logs.forEach((element) => {
          element.data.forEach((row, index) => {
            setExportAdjustments((exportAdjustments) => [
              ...exportAdjustments,
              {
                modifiedDate: moment(element.timestamp).format("DD/MM/YYYY"),
                modifierEmail: element.email,
                adjustedLedger: row.ledger_name,
                cy: row.cy,
                adjustment: row.adjusted_amount,
                remarks: element.remarks,
              },
            ]);
          });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const adjustmentsTable = {
    minWidth: "1045px",
    //   maxHeight:'95vh',
    //   overflowY:'scroll',
    //   minHeight:'95vh'
    height: "100vh",
  };

  const csvLink = {
    data: [...exportAdjustments],
    filename: "AdjustmentLogs.csv",
  };
  // filter
  function handleApplyFilter() {
    setRender(Math.random());
    console.log(filterData);
    console.log(line, "lineeeeee");
    if (line.length > 0) {
      filterData.map((filter, i) => {
        // console.log(line, "filterfilter", i);
        // line.filter((lineResult, i) => {
        //   let id = Object.keys(lineResult)[0];
        //   console.log(lineResult[id]);
        //   if (i === 0) {
        //       if (filter.column === "" && filter.change === "") {
        //         return;
        //       }
        //         if (
        //           filter.column !== "ledger_name" &&
        //           filter.column !== "ledger_code" &&
        //           filter.select === "Less than"
        //         ) {
        //           const res = tableData.filter((line) => {
        //             console.log(line);
        //             if (line[`${filter.column}`] < filter.startAmount) {
        //             return lineResult;
        //           }
        //         });
        //       console.log(res, "============2");
        //       setTotalFilter(res);
        //       return;
        //     }
        //         if (
        //           filter.column !== "ledger_name" &&
        //           filter.column !== "ledger_code" &&
        //           filter.select === "Greater than"
        //         ) {
        //           const res = tableData.filter((line) => {
        //             if (line[`${filter.column}`] > Number(filter.startAmount)) {
        //               return lineResult;
        //           }
        //         });
        //       console.log(res, "============2");
        //       setTotalFilter(res);
        //       return;
        //     }
        //       if (
        //         filter.column !== "ledger_name" &&
        //         filter.column !== "ledger_code" &&
        //         filter.select === "Equal to"
        //       ) {
        //         const res = tableData.filter((line) => {
        //           if (line[`${filter.column}`] === Number(filter.startAmount)) {
        //             return lineResult;
        //           }
        //         });
        //       console.log(res, "============2");
        //       setTotalFilter(res);
        //       return;
        //     }
        //       const res = lineResult[id].filter((line) => {
        //         console.log(line[`${filter.column}`]);
        //         if (
        //           line[`${filter.column}`]
        //             .toLowerCase()
        //             .includes(`${filter.change}`.toLowerCase())
        //         ) {
        //           console.log("ksksksks");
        //           return lineResult;
        //         }
        //       });
        //         console.log(res, "============3");
        //         // setLine(res);
        //       return;
        //     }
        //   // lineResult[id].filter((result,i) => {
        //   //     console.log(i);
        //   // });
        // });
      });
    }
  }

  // console.log(exportAdjustments);

  const nf = new Intl.NumberFormat();

  return (
    <div className="adjustmentsTable" style={adjustmentsTable}>
      <Navbar text="Adjustments" />
      <div className="adjustmentsMenu">
        <div
          className="adjustment"
          style={{ marginLeft: "0" }}
          onClick={() => {
            history.push("/adjustments");
          }}
        >
          <img
            src={arrow}
            style={{ transform: "scale(0.7)", marginRight: "5px" }}
            alt="arrow"
          />
          <p style={{ fontWeight: "600", color: "var(--clr-accent)" }}>Back</p>
        </div>
        <div
          className="adjustment"
          onClick={() => {
            setFilterShow(!filterShow);
          }}
        >
          <img src={filter} alt="filter" />
          <p>Filter</p>
        </div>
        <div className="adjustment">
          <img src={download} alt="download" />
          <CSVLink {...csvLink}>
            <p style={{ color: "black" }}>Export Logs</p>
          </CSVLink>
          {/* <p style={{ color: "var(--clr-accent q)" }}>Export Logs</p> */}
        </div>
      </div>
      <AdjustmentlogsFilter
        show={filterShow}
        handleApplyFilter={handleApplyFilter}
        setFilterShow={setFilterShow}
        setObject={setObject}
        setFilterRow={setFilterRow}
        filterRow={filterRow}
        SetConfirmFilClose={SetConfirmFilClose}
      />
      <table
        className={`${access.access === "View" ? "disabled-table" : ""}`}
        style={{
          background: `${theme ? "" : "#363535"}`,
        }}
      >
        <thead style={{ fontSize: "2rem" }}>
          <tr>
            <th
              style={{
                width: "7%",
                maxWidth: "15%",
                height: "62px",
                textAlign: "center",
              }}
            >
              MODIFIED DATE
            </th>
            <th style={{ width: "10%", maxWidth: "15%" }}>MODIFIER ID</th>
            <th style={{ width: "13%", maxWidth: "15%" }}>ADJUSTED LEDGERS</th>
            <th style={{ width: "8%", maxWidth: "10%", textAlign: "center" }}>
              CURRENT YEAR
            </th>
            <th
              style={{
                width: "7%",
                maxWidth: "9%",
                height: "62px",
                textAlign: "center",
              }}
            >
              ADJUSTMENT
            </th>
            <th style={{ width: "12%", maxWidth: "15%" }}>REMARKS</th>
            <th style={{ width: "12%", maxWidth: "15%", textAlign: "center" }}>
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {adjusted.map((adj, i) => {
            var email = adj.email;
            //   var sortedKeys = Object.keys(adj.logs).sort();
            //   console.log(sortedKeys)
            //   var first = adj.logs[sortedKeys[0]];
            //   console.log(first.length,'length')
            var date = adj.timestamp.split(",")[0];
            var time = adj.timestamp.split(",")[1];

            return adj.data.map((val, ix) => {
              console.log(val, ix, "individual rows");
              if (ix === 0) {
                return (
                  <tr
                    style={{
                      background: `${theme ? "" : "#363535"}`,
                    }}
                    key={ix}
                  >
                    <td
                      style={{ height: "45px", textAlign: "center" }}
                      rowSpan={adj.data.length}
                    >
                      {date}
                    </td>
                    <td
                      style={{ height: "45px", textAlign: "center" }}
                      rowSpan={adj.data.length}
                    >
                      {email}
                    </td>
                    <td
                      style={{
                        height: "45px",
                        textAlign: "left",
                        paddingLeft: "10px",
                      }}
                    >
                      {val.ledger_name}
                    </td>
                    {/* <td style={{height:'45px',textAlign:'center'}}>{val.branch}</td>   */}
                    <td
                      style={{
                        height: "45px",
                        textAlign: "right",
                        paddingRight: "10px",
                      }}
                    >
                      {nf.format(val.cy)}
                    </td>
                    <td
                      style={{
                        height: "45px",
                        textAlign: "right",
                        paddingRight: "10px",
                      }}
                    >
                      {nf.format(val.adjusted_amount)}
                    </td>
                    <td
                      style={{ textAlign: "center" }}
                      rowSpan={adj.data.length}
                    >
                      {adj.remarks}
                    </td>
                    <td style={{ textAlign: "left" }} rowSpan={adj.data.length}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          paddingLeft: "10px",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            console.log("clicked");
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
                            Restore
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
                    {/* <td style={{height:'45px',textAlign:'center'}}>{val.ledger_code}</td>   */}
                    <td
                      style={{
                        height: "45px",
                        textAlign: "left",
                        paddingLeft: "10px",
                      }}
                    >
                      {val.ledger_name}
                    </td>
                    {/* <td style={{height:'45px',textAlign:'center'}}>{val.branch}</td>   */}
                    <td
                      style={{
                        height: "45px",
                        textAlign: "right",
                        paddingRight: "10px",
                      }}
                    >
                      {nf.format(val.cy)}
                    </td>
                    <td
                      style={{
                        height: "45px",
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
        </tbody>
      </table>
    </div>
  );
};

export default AdjustmentsLog;
