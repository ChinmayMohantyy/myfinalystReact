import React, { useState, useEffect } from "react";
import "./adjustments.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextareaAutosize } from "@material-ui/core";
import { Navbar } from "../../Components/Navbar";
import adjustment from "../../assets/adjustment.svg";
import arrow from "../../assets/arrowLeftGreen.svg";
import filter from "../../assets/filter.svg";
import AdjustmentFilter from "../../Components/AdjustmentFilter";
import download from "../../assets/download.svg";
import trash from "../../assets/trash.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Submit } from "../../Components/Button";
import { CSVLink } from "react-csv";
import AdjustmentsTable from "../../Components/adjustments/AdjustmentsTable";
import swal from "sweetalert";
import AddIcon from '@mui/icons-material/Add';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Adjustments = () => {
  let history = useHistory();
  const tableData = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const filterData = useSelector((initialState) => initialState.reducer.filter);
  const [line, setLine] = useState([]);
  const [total, setTotal] = useState(0);
  const [object, setObject] = useState({});
  const [filterRow, setFilterRow] = useState([]);
  const [render, setRender] = useState("");
  const [exportAdjustments, setExportAdjustments] = useState([]);
  const [confirmfilClose, SetConfirmFilClose] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [totalFilter, setTotalFilter] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editOn, setEditOn] = useState(false);



  // const footer= {
  const project_id = localStorage.getItem("project_id");

  // }
  const records = {
    width: "100%",
    display: "flex",
    height: "35px",
    backgroundColor: "lightgray",
    border: "2px solid #D0D0D0",
    // justifyContent:'space-around',
    alignItems: "center",
    padding: "0 1rem",
    position: "absolute",
    bottom: "0",
  };

  const adjustmentContainer = {
    maxHeight: "100vh",
    overflowY: "hidden",
  };

  useEffect(() => {
    setExportAdjustments([]);
    if ((line != []) | (line != null)) {
      let total = 0;
      line.map((adj) => {
        var sortedKeys = Object.keys(adj).sort();
        var first = adj[sortedKeys[0]];
        const sum = first.reduce(
          (totalpy, i) => totalpy + Number(i.net_adjusted_amount),
          0
        );
        total += sum;
        console.log(sum, "sum v sumv sum");

        // first.map((value)=>{
        //     console.log(value,'value')

        // })
      });
      console.log(total, "total");
      setTotal(total);
    }
    line.forEach((element) => {
      console.log(element);
      let id = Object.keys(element)[0];
      element[id].forEach((row, index) => {
        console.log(line.length);
        setExportAdjustments((exportAdjustments) => [
          ...exportAdjustments,
          {
            SlNo:line.length,
            Date: element.date ? element.date : "",
            ledgerCode: element[id][index].ledger_code,
            ledgerName: element[id][index].ledger_name,
            branch: element[id][index].branch,
            cy: element[id][index].cy,
            adjustment: element[id][index].adjusted_amount,
            remarks: element.remarks,
          },
        ]);
      });
    });
    // console.log(line);
    // exportAdjustmentsData()
  }, [line]);

  // filter

  function handleApplyFilter() {
    setRender(Math.random());
    console.log(filterData);
    console.log(line, "lineeeeee");
    if (line.length > 0) {
      filterData.map((filter, i) => {
        // console.log(line, "filterfilter", i);
        line.filter((lineResult, i) => {
          let id = Object.keys(lineResult)[0];
          console.log(lineResult[id]);

          if (i === 0) {
            if (filter.column === "" && filter.change === "") {
              return;
            }
            if (
              filter.column !== "ledger_name" &&
              filter.column !== "ledger_code" &&
              filter.select === "Less than"
            ) {
              const res = tableData.filter((line) => {
                console.log(line);
                if (line[`${filter.column}`] < filter.startAmount) {
                  return lineResult;
                }
              });

              console.log(res, "============2");
              setTotalFilter(res);
              return;
            }

            if (
              filter.column !== "ledger_name" &&
              filter.column !== "ledger_code" &&
              filter.select === "Greater than"
            ) {
              const res = tableData.filter((line) => {
                if (line[`${filter.column}`] > Number(filter.startAmount)) {
                  return lineResult;
                }
              });

              console.log(res, "============2");
              setTotalFilter(res);
              return;
            }

            if (
              filter.column !== "ledger_name" &&
              filter.column !== "ledger_code" &&
              filter.select === "Equal to"
            ) {
              const res = tableData.filter((line) => {
                if (line[`${filter.column}`] === Number(filter.startAmount)) {
                  return lineResult;
                }
              });

              console.log(res, "============2");
              setTotalFilter(res);
              return;
            }
            const res = lineResult[id].filter((line) => {
              console.log(line[`${filter.column}`]);
              if (
                line[`${filter.column}`]
                  .toLowerCase()
                  .includes(`${filter.change}`.toLowerCase())
              ) {
                console.log("ksksksks");
                return lineResult;
              }
            });
            console.log(res, "============3");
            // setLine(res);
            return;
          }
          // lineResult[id].filter((result,i) => {
          //     console.log(i);

          // });
        });
      });
    }
  }
  console.log(exportAdjustments);

  // const handleClose = () => {
  //   setFilterShow(false);
  // };

  // const setFilterShow = () => {
  //   console.log("kjhgvcx");
  //   setFilter(true);
  // };

  const csvLink = {
    data: [...exportAdjustments],
    filename: "Adjustment.csv",
  };

  function handleOptions() {
    if (editOn) {
      swal(
        "",
        "Please Save the adjustment to create new adjustments",
        "warning"
      );
      return;
    }
    setShowCreate(true);
    // setEditOn(true)
  }


  console.log(showCreate);

  return (
    <div style={adjustmentContainer}>
      <Navbar text="Adjustments" />
      <div className="adjustmentsMenu">
        <div
          className="adjustment"
          style={{ marginLeft: "0" }}
          onClick={() => {
            history.push(`/conventional/${project_id}`);
          }}
        >
          <img
            src={arrow}
            alt="arrow"
            style={{ transform: "scale(0.7)", marginRight: "5px" }}
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
          <img src={download} alt="export" />
          <CSVLink {...csvLink}>
            <p style={{ color: "black" }}>Export</p>
          </CSVLink>
        </div>
        <div
          className="adjustment"
          onClick={() => {
            history.push("/deletedadjustments");
          }}
        >
          <img src={trash} alt="trash" />
          <p>Deleted items</p>
        </div>
        <div
          className="adjustment"
          onClick={() => {
            history.push("/adjustmentslog");
          }}
        >
          <img src={adjustment} />
          <p>Adjustment Logs</p>
        </div>

        <div
          className="adjustment"
          onClick={() => {
            handleOptions()
          }}
        >
          <AddIcon/>
          <p>New Adjustment</p>
        </div>
      </div>

      <AdjustmentFilter
        show={filterShow}
        handleApplyFilter={handleApplyFilter}
        setFilterShow={setFilterShow}
        setObject={setObject}
        setFilterRow={setFilterRow}
        filterRow={filterRow}
        SetConfirmFilClose={SetConfirmFilClose}
      />

      <AdjustmentsTable
        setLine={setLine}
        exportAdjustments={exportAdjustments}
        setExportAdjustments={setExportAdjustments}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        setEditOn={setEditOn}
        editOn={editOn}
      />
      <div style={records}>
        <div style={{ color: "grey", fontWeight: "600" }}>
          {line.length} Records
        </div>
        <div style={{ color: "grey", fontWeight: "600", marginLeft: "auto" }}>
          (+) stands for Debit, (-) stands for Credit
        </div>
      </div>
      {/* modal */}
    </div>
  );
};

export default Adjustments;
