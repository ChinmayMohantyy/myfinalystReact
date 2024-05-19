import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Button } from "react-bootstrap";
import axios from "axios";
import * as actionTypes from "../../redux/actionTypes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { socket } from "../../services/socket/socket";
import folder from "../../assets/folder.svg";
import ProgressBar from "@ramonak/react-progress-bar";
import {
  SplitPane,
  SplitPaneProps,
  ResizerOptions,
  CollapseOptions,
  SplitPaneHooks,
} from "react-collapse-pane";

import { Navbar } from "../../Components/Navbar";
// import './conventional.css'
import switchModes from "../../assets/switchMode.svg";
import filter from "../../assets/filter.svg";
import hide from "../../assets/hide.svg";
import trash from "../../assets/trash.svg";
import share from "../../assets/share.svg";
import more from "../../assets/more.svg";
import adjustment from "../../assets/adjustment.svg";
import { Submit } from "../../Components/Button";
import plus from "../../assets/plus.svg";
import Filter from "../../Components/Filter";
import BasicTable from "../../Components/Table/BasicTable";
import DeleteSelected from "../../Components/deleteSelected/DeleteSelected";
import TemplateTabs from "../../Components/templateTabs/TemplateTabs";
import DeletedFile from "../../Components/deletedItems/DeletedFile";
import PopulateFs from "../../Components/populateFs/PopulateFs";
import ExpandLedger from "../../Components/expandLedger/ExpandLedger";
import AddLedger from "../../Components/addLedger/AddLedger";
import AddGrouping from "../../Components/AddGrouping/AddGrouping";
import Confirmation from "../../Components/confirmationMenu/confirmationMenu";
import ShareScreen from "../../Components/shareScreen/ShareScreen";
import SwitchMode from "../../Components/switchMode/SwitchMode";
import "./template.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import { Alert, Snackbar } from "@mui/material";
import { AccessProjectContext } from "../../helper/DarkModeContext";
import DeleteDuplicate from "../../Components/deletedItems/DeleteDuplicate";
import { red } from "@mui/material/colors";
import AssignValuesData from "../setupProject/AssignValuesData";
// import Stack from '@mui/material/core/Stack';
// import Button from '@mui/material/Button';
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from '@mui/material/lab/Alert`';
// import Example from '../../Components/reactTable/Table'
// import App from '../../Components/ReactTable/Table'

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 620,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const wrapper = {
  color: "red",
};

const inputFiles = {
  borderRadius: "6px",
  border: "2px solid lightGrey",
  width: "13rem",
  height: "8rem",
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const head = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "3rem",
};

const header = {
  fontSize: "2.2rem",
  fontWeight: "700",
};
const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const totalDiff = {
  color: "#e65308",
  fontWeight: "bold",
  marginLeft: "35px",
};

const Template = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const tableData = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const filterData = useSelector((initialState) => initialState.reducer.filter);
  const grouping = useSelector((initialState) => initialState.reducer.grouping);

  const [filterRow, setFilterRow] = useState([]);
  const [totalRow, setTotalRow] = useState([]);
  const [totalFilter, setTotalFilter] = useState([]);
  const [filterShow, setFilterShow] = useState(false);
  const [object, setObject] = useState({});
  const [select, setSelect] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedMenu, setDeleteMenu] = useState(false);
  const [populateFs, setPopulateFs] = useState(false);
  const [otherGrouping, setOtherGrouping] = useState(grouping);
  const [addLedger, setAddLedger] = useState(false);
  const [expandLedger, setExpandLedger] = useState(false);
  const [addLedgerAbove, setAddLedgerAbove] = useState(false);
  const [addLedgerBelow, setAddLedgerBelow] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [addGrouping, setAddGrouping] = useState(false);
  const [confirmationMenu, setConfirmationMenu] = useState();
  const [switchMode, setSwitchMode] = useState(false);
  const [render, setRender] = useState("");

  // const [filterObject,SetFilterObject]= useState([])
  const [confirmfilClose, SetConfirmFilClose] = useState(false);
  const [newSg, SetNewSg] = useState();
  const [hideItems, SetHideItems] = useState(false);
  const [shareScreen, SetShareScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const [hiddenFilter, setHiddenFilter] = useState([]);

  const [updateRows, setUpdateRows] = useState(false);
  const [tb_upload, uploadTb] = useState(false);
  const [deleteRow, setDeleteRow] = useState(false);
  const { access, setAccess } = useContext(AccessProjectContext);
  const [rowData, setRowData] = useState({});
  const [countdata, getDataCount] = useState("");
  const [updateTabs, setUpdateTabs] = useState(false);
  const [duplicateItems, setDuplicateItems] = useState([]);
  const [openDuplicateModal, setDuplicateModal] = useState(false);
  const [showAssignValues, setAssignValues] = useState(false);
  const [info, setinfo] = useState([]);
  const [index, setIndex] = useState("");
  const [headerdata, setHeaders] = useState([]);
  const [tempID, setTempID] = useState("");
  const [type, setType] = useState("");

  let init = {
    LedgerCode: "",
    currentBalance: "",
    ledgerName: "",
    previousBalance: "",
    tbAmount: "",
  };
  const [Name, setName] = useState(init);

  const project_id = localStorage.getItem("project_id");
  const auth = localStorage.getItem("auth_token");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };

  let vertical = "bottom";
  let horizontal = "right";

  const projectId = useParams();

  useEffect(() => {
    setLoading(true);
    fetchUserProfile();
    fetchConvential();
  }, [deleteRow, updateRows]);

  const fetchUserProfile = () => {
    axios.get(`api/v1/auth/get-profile`, { headers }).then((response) => {
      if (response.status === 200) {
        const filtredAccessProjects =
          response.data.user.data.access_projects.filter((project) => {
            return project.project_id === projectId.pid;
          });

        console.log(filtredAccessProjects);

        if (filtredAccessProjects.length > 0) {
          setAccess(filtredAccessProjects[0]);
        } else {
          setAccess({ access: "All", project_id: "" });
        }
        console.log(projectId.pid);
        // console.log(response.data.user.data);
      }
    });
  };

  const fetchConvential = () => {
    axios
      .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, { headers })
      .then((response) => {
        console.log(
          response.data.data.line_items,
          "dat dat dat datd ddat dat dat dat dat dta dat d"
        );
        dispatch({
          type: actionTypes.SET_TABLE_DATA,
          payload: response.data.data.line_items,
        });

        const unique = [];

        const duplicates = response.data.data.line_items.filter((o) => {
          if (unique.find((i) => i.ledger_code === o.ledger_code)) {
            return true;
          }
          unique.push(o);
          return false;
        });

        setDuplicateItems(duplicates);
        // setData(response.data.data.line_items)
        // props.setLoading(false)
        setTotalRow(response.data.data.line_items);
        setDeleteRow(false);
        setLoading(false);
        setUpdateRows(false);
      });
  };

  console.log(hideItems, "selectedRows selectedRows show");
  console.log(totalRow, "selectedRows selectedRows show");
  console.log(filterShow, "filter show");
  console.log(tableData, "filter show table data");
  console.log(filterRow, filterData, "filter row");
  console.log(totalFilter, "totalFilter filter row");

  useEffect(() => {
    if (!hideItems) {
      console.log(totalRow, "total row res here");
      setLoading(true);
      axios
        .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
          headers,
        })
        .then((response) => {
          console.log(
            response.data.data.line_items,
            "dat dat dat datd ddat dat dat dat dat dta dat d"
          );
          dispatch({
            type: actionTypes.SET_TABLE_DATA,
            payload: response.data.data.line_items,
          });
          setLoading(false);
        });
      // dispatch({type: actionTypes.SET_TABLE_DATA,payload:response.data.data.line_items})
      // handleApplyFilter()
      console.log(tableData, "res here");
      return;
    }
    setLoading(true);
    const res = tableData.filter((line) => {
      if (line.fs_grp == "" || line.note_grp == "" || line.sub_grp == "") {
        return line;
      }
    });
    dispatch({ type: actionTypes.SET_TABLE_DATA, payload: res });
    console.log(res, "res here");
    setLoading(false);
    // handleApplyFilter()
    //filter here
    //tableData
    //filterRow
  }, [hideItems]);

  console.log(countdata);
  function handleApplyFilter() {
    setRender(Math.random());

    if (filterData.length > 0) {
      filterData.map((filter, i) => {
        console.log(filter, "filterfilter", i);

        if (i === 0) {
          if (filter.column === "" && filter.change === "") {
            return;
          }
          // if (filter.change === "" && filter.column !== "FINAL AMT") {
          //   const res = tableData.filter((line) => {
          //     if (line[`${filter.column}`] === "") {
          //       return line;
          //     }
          //   });
          //   console.log(res, "============1");
          //   setTotalFilter(res);
          //   return;
          // }
          if (
            filter.column !== "ledger_name" &&
            filter.column !== "ledger_code" &&
            filter.select === "Less than"
          ) {
            const res = tableData.filter((line) => {
              console.log(line);
              if (line[`${filter.column}`] < filter.startAmount) {
                return line;
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
                return line;
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
                return line;
              }
            });

            console.log(res, "============2");
            setTotalFilter(res);
            return;
          }

          const res = tableData.filter((line) => {
            if (
              line[`${filter.column}`]
                .toLowerCase()
                .includes(`${filter.change}`.toLowerCase())
            ) {
              return line;
            }
          });

          console.log(res, "============3");
          setTotalFilter(res);
          return;

          // const res = tableData.filter((line) => {
          //   if (
          //     line[`${filter.column}`]
          //       .toLowerCase()
          //       .includes(`${filter.change}`.toLowerCase())
          //   ) {
          //     return line;
          //   }
          // });
        }

        // if (i === 0) {
        //   // if(!filter.column === '' && !filter.change === ''){
        //   // }
        //   if (filter.column === "" && filter.change === "") {
        //     // setTotalFilter(tableData)
        //     return;
        //     // const res = tableData.filter((line)=>{if(line[`${filter.column}`].toLowerCase().includes(`${filter.change}`.toLowerCase())){return line}})
        //   }
        //   if (filter.change === "" && filter.column !== "ADJUSTED AMT") {
        //     const res = tableData.filter((line) => {
        //       if (line[`${filter.column}`] === "") {
        //         return line;
        //       }
        //     });
        //     setTotalFilter(res);
        //     return;
        //   }
        //   // const res2 = tableData.filter((line)=>{if(line[`${filter.column}`] === `${filter.change}`){return(line)}})

        //   if(filter.column === "ADJUSTED AMT"){

        //   const res = tableData.filter((line) => {
        //     if(line.net_adjusted_amount >= filter.startAmount && line.net_adjusted_amount <= filter.endAmount){
        //         return line;
        //     }
        //   });

        //   console.log(res, "==============");
        //   }else{
        //     const res = tableData.filter((line) => {
        //       if (
        //         line[`${filter.column}`]
        //           .toLowerCase()
        //           .includes(`${filter.change}`.toLowerCase())
        //       ) {
        //         return line;
        //       }
        //     });
        //   }

        //   console.log(res, "res result filter here ");
        //   setTotalFilter(res);
        //   console.log(filter.column, "filter here ");
        //   console.log(res, "filter result here ");
        //   console.log(`${filter.change}`, "filter result here ");
        //   return;
        // }
        // if (filter.column === "" && filter.change === "") {
        //   return;
        // }
        // if (filter.change === "") {
        //   const res = totalFilter.filter((line) => {
        //     if (line[`${filter.column}`] === "") {
        //       return line;
        //     }
        //   });
        //   console.log(res);
        //   setTotalFilter(res);
        //   return;
        // }
        // const res = totalFilter.filter((line) => {
        //   if (
        //     line[`${filter.column}`]
        //       .toLowerCase()
        //       .includes(`${filter.change}`.toLowerCase())
        //   ) {
        //     return line;
        //   }
        // });
        // console.log(res, "res result filter here ");
        // setTotalFilter(res);
        // console.log(filter.column, "filter here ");
        // console.log(res, "filter result here ");
        // console.log(`${filter.change}`, "filter result here ");
      });
    }
    // if (filterData.length > 0) {
    //   filterData.map((filter, i) => {
    //     console.log(filter, "filterfilter");
    //     if (i === 0) {
    //       // if(!filter.column === '' && !filter.change === ''){
    //       // }
    //       if (filter.column === "" && filter.change === "") {
    //         // setTotalFilter(tableData)
    //         return;
    //         // const res = tableData.filter((line)=>{if(line[`${filter.column}`].toLowerCase().includes(`${filter.change}`.toLowerCase())){return line}})
    //       }
    //       if (filter.change === "") {
    //         const res = tableData.filter((line) => {
    //           if (line[`${filter.column}`] === "") {
    //             return line;
    //           }
    //         });
    //         setTotalFilter(res);
    //         return;
    //       }
    //       // const res2 = tableData.filter((line)=>{if(line[`${filter.column}`] === `${filter.change}`){return(line)}})
    //       const res = tableData.filter((line) => {
    //         if (
    //           line[`${filter.column}`]
    //             .toLowerCase()
    //             .includes(`${filter.change}`.toLowerCase())
    //         ) {
    //           return line;
    //         }
    //       });
    //       console.log(res, "res result filter here ");
    //       setTotalFilter(res);
    //       console.log(filter.column, "filter here ");
    //       console.log(res, "filter result here ");
    //       console.log(`${filter.change}`, "filter result here ");
    //       return;
    //     }
    //     if (filter.column === "" && filter.change === "") {
    //       return;
    //     }
    //     if (filter.change === "") {
    //       const res = totalFilter.filter((line) => {
    //         if (line[`${filter.column}`] === "") {
    //           return line;
    //         }
    //       });
    //       console.log(res);
    //       setTotalFilter(res);
    //       return;
    //     }
    //     const res = totalFilter.filter((line) => {
    //       if (
    //         line[`${filter.column}`]
    //           .toLowerCase()
    //           .includes(`${filter.change}`.toLowerCase())
    //       ) {
    //         return line;
    //       }
    //     });
    //     console.log(res, "res result filter here ");
    //     setTotalFilter(res);
    //     console.log(filter.column, "filter here ");
    //     console.log(res, "filter result here ");
    //     console.log(`${filter.change}`, "filter result here ");
    //   });
    // }
    // if(filterData.length == 0){
    //     setTotalFilter(tableData)
    //     return
    // }
  }

  function handleDrop(e) {
    setConfirmDelete(!confirmDelete);
  }

  useEffect(() => {
    setRender(Math.random());
  }, [grouping]);

  useEffect(() => {
    handleApplyFilter();
  }, [filterData]);
  // function handleDelete(){
  //     setDeleteMenu(true)
  // }
  // const someData = confirmfilClose ?  filterRow : tableData

  const hiddenFileInput = React.useRef(null);

  const existFileInput = React.useRef(null);

  const handleChange = (e, type) => {
    e.preventDefault();
    setType(type);
    const fileListAsArray = e.target.files;
    if (
      (fileListAsArray[0].type === "application/vnd.ms-excel") |
      (fileListAsArray[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      const auth = localStorage.getItem("auth_token");
      let headers = {
        "x-auth-token": auth,
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
      };
      const project_id = localStorage.getItem("project_id");
      const data = new FormData();
      data.append("file", fileListAsArray[0]);

      axios
        .post(`/api/v1/uploads/upload-headers/${project_id}`, data, {
          headers,
        })
        .then((response) => {
          console.log("hello new tb");
          console.log(response, "data");
          // setFileUpload(fileListAsArray);
          // setHeaders(response.data.header_list);
          setHeaders(Object.keys(response.data.result.data[0].segregatedJson));
          setTempID(response.data.tmp_id);
          setAssignValues(true);
          uploadTb(false);
        })
        .catch((error) => {
          console.log(error.data, "error");
          console.log(error.response, "error");
          console.log(error, "error");
        });
    }

    console.log(fileListAsArray);

    console.log(e.target.files);
  };

  const handleOpen = (type) => {
    if (type === "new") {
      hiddenFileInput.current.click();
    } else {
      existFileInput.current.click();
    }
  };

  function groupHideItems() {
    console.log(tableData);
    setHiddenFilter([]);
    setRender(Math.random());
    let filtredData = "";
    if (hideItems) {
      SetHideItems(false);
      setHiddenFilter(tableData);
    } else {
      filtredData = tableData.filter((row) => {
        if (row.sub_grp === "") {
          return { row };
        }
      });

      console.log(filtredData);
      SetHideItems(true);
      setHiddenFilter((hiddenFilter) => [...hiddenFilter, filtredData]);
    }
  }

  let total_cy = 0;
  let total_adjusted = 0;
  let someData = "";
  if (tableData.length > 0) {
    someData = tableData;
    total_cy = someData.reduce((totalCy, i) => totalCy + Number(i.cy), 0);
    const total_py = someData.reduce((totalPy, i) => totalPy + Number(i.py), 0);
    total_adjusted = someData.reduce(
      (totalPy, i) => Number(totalPy) + Number(i.adjusted_amount),
      0
    );
    const total_amnt = total_cy - total_adjusted;
  }

  const calculateCY = () => {
    let total = 0;

    tableData.forEach((element) => {
      if (element.cy !== 0) {
        total = total + Number(element.cy);
      }
    });

    console.log(total);
    return total;
  };

  const calculatePY = () => {
    let total = 0;

    tableData.forEach((element) => {
      if (element.py !== 0) {
        total = total + Number(element.py);
      }
    });

    console.log(total);
    return total;
  };

  function handleSelect(type) {
    console.log("kakakakakakak", type);

    if (type === "Delete Record") {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will be able to view deleted logs in the deleted items menu",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let row = select;
          console.log(row[0].tb_id, row[0].lid, "clicked red");
          const auth = localStorage.getItem("auth_token");
          const project_id = localStorage.getItem("project_id");
          let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
          };

          axios
            .delete(`api/v1/conventional-mode/delete/${project_id}`, {
              headers: headers,
              data: { row },
            })
            .then((response) => {
              console.log(
                response.data,
                " delete response ---------------------------------"
              );
              fetchConvential();
              setDeleteRow(true);
            })
            .catch((error) => {
              console.log(error.response, "error");
            });

          swal("Ledger has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Ledger not deleted!");
        }
      });
    }

    setConfirmDelete(false);
  }

  const handleSubmit = () => {
    console.log("hello");
    // console.log(Name);
    // console.log(tempID);
    let data = {
      ledger_name: Name.ledgerName,
      ledger_code: Name.LedgerCode,
      branch: Name.branchName,
      py: Name.previousBalance,
      cy: Name.currentBalance,
    };

    console.log(data);

    axios
      .post(
        `/api/v1/tb-mapping/heading-classification/${project_id}/${tempID}`,
        data,
        { headers }
      )
      .then((response) => {
        console.log(response, "response");
        if (type === "new") {
          const auth = localStorage.getItem("auth_token");
          let headers = {
            "x-auth-token": auth,
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
          };
          const project_id = localStorage.getItem("project_id");
          axios
            .post(`/api/v1/uploads/existing-tb/${project_id}/${tempID}`, data, {
              headers,
            })
            .then((response) => {
              console.log("hello new tb");
              console.log(response, "data");
              // eliminateDupe(response.data.data.line_items);
              // setProjectData(data);
              // saveProjectData(data);
              dispatch({
                type: actionTypes.SET_TABLE_DATA,
                payload: response.data.data.line_items,
              });
              setAssignValues(false);
              setUpdateRows(true);
              // setLoading(true);
            })
            .catch((error) => {
              console.log(error.data, "error");
              console.log(error.response, "error");
              console.log(error, "error");
            });
        } else {
          // setData((Data) => [...Data, fileListAsArray]);
          // setConfirm((confirm) => [...confirm, false]);
          const auth = localStorage.getItem("auth_token");
          let headers = {
            "x-auth-token": auth,
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
          };
          const project_id = localStorage.getItem("project_id");
          axios
            .post(`/api/v1/uploads/merge-tb/${project_id}/${tempID}`, data, {
              headers,
            })
            .then((response) => {
              console.log("hello multi");
              console.log(response, "data");
              // eliminateDupe(response.data.data.line_items);
              // dispatch({
              //   type: actionTypes.SET_TABLE_DATA,
              //   payload: response.data.data.line_items,
              // });
              setAssignValues(false);
              setUpdateRows(true);
            })
            .catch((error) => {
              console.log(error.data, "error");
              console.log(error.response, "error");
              console.log(error, "error");
            });
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  return (
    <div style={{ maxHeight: "100vh" }}>
      {shareScreen ? <ShareScreen SetShareScreen={SetShareScreen} /> : null}
      {addGrouping ? (
        <AddGrouping
          setOtherGrouping={setOtherGrouping}
          newSg={newSg}
          setAddGrouping={setAddGrouping}
          setRowData={setRowData}
          rowData={rowData}
        />
      ) : null}
      {populateFs ? <PopulateFs setPopulateFs={setPopulateFs} /> : null}
      {deletedMenu ? (
        <DeletedFile
          setDeleteMenu={setDeleteMenu}
          select={select}
          setUpdateRows={setUpdateRows}
        />
      ) : null}
      {addLedger ? (
        <AddLedger close={setAddLedger} name="Create a new Ledger Item" />
      ) : null}
      {switchMode ? (
        <SwitchMode
          close={setSwitchMode}
          name="Choose a Mapping Mode"
          currentMode="2"
        />
      ) : null}
      {expandLedger ? (
        <ExpandLedger
          close={setExpandLedger}
          name="Ledger Detail"
          select={select}
        />
      ) : null}
      {addLedgerAbove ? (
        <AddLedger
          close={setAddLedgerAbove}
          name="Add Ledger Above"
          select={select}
        />
      ) : null}
      {addLedgerBelow ? (
        <AddLedger
          close={setAddLedgerBelow}
          name="Add Ledger Below"
          select={select}
        />
      ) : null}
      {confirmation ? (
        <Confirmation
          setConfirmation={setConfirmation}
          confirmationMenu={confirmationMenu}
          select={select}
        />
      ) : null}

      {showAssignValues ? (
        <AssignValuesData
          show={showAssignValues}
          setShow={setAssignValues}
          info={info}
          index={index}
          setName={setName}
          Name={Name}
          // confirm={confirm}
          // setConfirm={setConfirm}
          // projectData={projectData}
          handleSubmit={handleSubmit}
          headers={headerdata}
        />
      ) : null}
      <div style={{ maxHeight: "77vh", overflowY: "hidden" }}>
        <Navbar text="Financial Year: 2021 - 2022" />
        <div className="conventionalMenu" style={{ zIndex: "9" }}>
          {select.length < 1 ? null : (
            <div
              className="delete"
              // style={{ height: "100%", width: "30px" }}
              onClick={() => {
                handleSelect("Delete Record");
              }}
            >
              {/* <i class="fas fa-minus-circle" ></i>
                <span>{select.length}</span> */}
              {/* <img style={{ transform: "scale(0.85)" }} src={more}></img> */}
              <img src={trash} alt="trash" />
              <p>Delete record</p>
            </div>
          )}
          <div
            className="switchMode"
            onClick={() => {
              setSwitchMode(!switchMode);
            }}
          >
            <img src={switchModes} />
            <p>Switch Mode</p>
          </div>
          <div
            className="filter"
            onClick={() => {
              setFilterShow(!filterShow);
            }}
          >
            <img src={filter} />
            <p>Filter</p>
          </div>
          <div
            className="hideItem"
            onClick={() => {
              groupHideItems();
            }}
          >
            <i class={hideItems ? "fas fa-eye" : "far fa-eye-slash"}></i>
            <p>{hideItems ? "show grouped items" : "Hide grouped items"}</p>
          </div>
          <div
            className="deletedItem"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDeleteMenu(true);
            }}
          >
            <img src={trash} />
            {/* <span style={{color:'rgba(207, 7, 7, 0.815) '}}>{select.length}</span> */}
            <p>Deleted items</p>
          </div>
          <div
            className="adjustment"
            onClick={() => {
              history.push("/adjustments");
            }}
          >
            <img src={adjustment} />
            <p>Adjustment</p>
          </div>
          <div
            className="share"
            onClick={() => {
              SetShareScreen(true);
            }}
          >
            <img src={share} />
            <p>Share</p>
          </div>
          <div className="uploadConventional">
            <div className="addTb" onClick={() => uploadTb(true)}>
              <img src={plus} />
              <h4>upload trial balance</h4>
            </div>
            <div
              className="populateTemplate"
              onClick={() => setPopulateFs(true)}
            >
              <Submit sm value="Populate Fs template" />
            </div>
          </div>
        </div>

        <Filter
          show={filterShow}
          handleApplyFilter={handleApplyFilter}
          setFilterShow={setFilterShow}
          setObject={setObject}
          setFilterRow={setFilterRow}
          filterRow={filterRow}
          SetConfirmFilClose={SetConfirmFilClose}
        />
        {confirmDelete ? (
          <DeleteSelected
            setDeleteRow={setDeleteRow}
            fetchConvential={fetchConvential}
            setConfirmDelete={setConfirmDelete}
            select={select}
            setConfirmation={setConfirmation}
            setConfirmationMenu={setConfirmationMenu}
            setExpandLedger={setExpandLedger}
            setAddLedgerBelow={setAddLedgerBelow}
            setAddLedgerAbove={setAddLedgerAbove}
          />
        ) : null}

        {/* <div className='conventionnalTable'>
            <div className='rowHeader'>
                <div className="ledgerCode">
                    <input type="checkbox"  />
                    <p>LEDGER CODE</p>
                </div>
                <div className="ledgerName"><p>LEDGER NAME</p></div>
                <div className="branch"><p>BRANCH</p></div>
                <div className="year2021"><p>YEAR 2021</p></div>
                <div className="year2020"><p>YEAR 2020</p></div>
                <div className="adjustedAmt"><p>ADJUSTED AMT</p></div>
                <div className="finalAmt"><p>FINAL AMT</p></div>
                <div className="fsGrouping"><p>FS GROUPING</p></div>
                <div className="notesGrouping"><p>NOTES GROUPING</p></div>
                <div className="subGrouping"><p>SUB GROUPING</p></div>
            </div>
        </div> */}
        <div>
          {loading && (
            <div
              style={{
                height: "80vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="grow" size="sm" />
              <Spinner animation="grow" style={{ margin: "1rem" }} />
              <Spinner animation="grow" size="sm" />
            </div>
          )}
          <div
            className="tabsinside"
            style={{ width: "100%", maxHeight: "77vh", overflow: "hidden" }}
          >
            <SplitPane
              minSizes={[600, 300]}
              initialSizes={[60, 40]}
              // style={{height:'77vh',overflowY:'scroll'}}
              split="vertical"
              collapseOptions={{
                beforeToggleButton: <Button>⬅</Button>,
                afterToggleButton: <Button>➡</Button>,
                overlayCss: { backgroundColor: "black" },
                buttonTransition: "zoom",
                buttonPositionOffset: -20,
                collapsedSize: 50,
                collapseTransitionTimeout: 350,
                // minSizes:[2,1],
              }}
              resizerOptions={{
                css: {
                  width: "5px",
                  //   background: 'rgba(0, 0, 0, 0.4)',
                  background: "#03565ade",
                },
                hoverCss: {
                  width: "5px",
                  background: "4px solid rgba(0, 0, 0)",
                },
                grabberSize: "1rem",
              }}
            >
              <div style={{ maxHeight: "77vh", overflow: "scroll" }}>
                {!loading && (
                  <BasicTable
                    template={true}
                    SetNewSg={SetNewSg}
                    setAddGrouping={setAddGrouping}
                    totalFilter={totalFilter}
                    hideItems={hideItems}
                    setTotalRow={setTotalRow}
                    setSelect={setSelect}
                    loading={loading}
                    setLoading={setLoading}
                    tableData={someData}
                    hiddenFilter={hiddenFilter}
                    fetchConvential={setUpdateRows}
                    setRowData={setRowData}
                    rowData={rowData}
                    setUpdateTabs={setUpdateTabs}
                    getdata={getDataCount}
                  />
                )}
                <div
                  style={{
                    position: "sticky",
                    // display: "flex",
                    bottom: "0rem",
                    width: "100%",
                    padding: "5px 20px",
                    backgroundColor: "var(--clr-font-light)",
                  }}
                >
                  {countdata < 20 && (
                    <ProgressBar bgColor="#D96B62" completed={countdata} />
                  )}
                  {countdata >= 20 && countdata <= 50 && (
                    <ProgressBar bgColor="#648CF3" completed={countdata} />
                  )}
                  {countdata > 50 && countdata <= 80 && (
                    <ProgressBar bgColor="#C3CB43" completed={countdata} />
                  )}
                  {countdata > 80 && (
                    <ProgressBar bgColor="#53D05C" completed={countdata} />
                  )}
                </div>
              </div>

              <div style={{ maxHeight: "77vh", overflowY: "scroll" }}>
                <div
                  style={{ minHeight: "77vh", width: "40vw" }}
                  onDragEnter={() => {
                    // setHighlighted('#e9ebf0')
                  }}
                  onDragLeave={() => {
                    // setHighlighted('')
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  // onDrop={handleDrop}
                >
                  <TemplateTabs
                    SetNewSg={SetNewSg}
                    setAddGrouping={setAddGrouping}
                    updateTabs={updateTabs}
                  />
                </div>
              </div>
            </SplitPane>
          </div>
        </div>

        {/* <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={calculateCY() - calculatePY() !== 0 ? true : false}
          message={
            <React.Fragment>
              <div style={totalDiff}>
                TB not balancing cy by{" "}
                <span> {calculateCY().toLocaleString("en-IN")}</span>
              </div>
              <div style={totalDiff}>
                TB not balancing py by{" "}
                <span> {calculatePY().toLocaleString("en-IN")}</span>
              </div>
            </React.Fragment>
          }
        /> */}

        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          // sx={{ padding: "6px 0px 6px 14px" }}
          open={
            calculateCY() - calculatePY() !== 0 || duplicateItems.length > 0
              ? true
              : false
          }
        >
          <Alert
            severity="warning"
            sx={{ cursor: "pointer", padding: "6px 0px 6px 14px" }}
            onClick={() => setDuplicateModal(true)}
          >
            {/* <b>Warning alert ({duplicateItems.length}) !</b> */}
          </Alert>
        </Snackbar>
      </div>

      {openDuplicateModal && (
        <DeleteDuplicate
          duplicateItems={duplicateItems}
          openDuplicateModal={openDuplicateModal}
          setDuplicateModal={setDuplicateModal}
          calculateCY={calculateCY}
          calculatePY={calculatePY}
          fetchConvential={setUpdateRows}
        />
      )}

      <Modal
        open={tb_upload}
        onClose={() => uploadTb(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={center}>
              <h3 style={header}>Choose One</h3>
            </div>
            <div style={head}>
              {/* <div
                  style={card}
                  // onClick={()=>{handleSelectMethod('MultiFile')}}
                >
                  <p style={{ textAlign: "center" }}>
                    <input type="file" />
                    New TB upload
                  </p>
                </div> */}

              <div style={inputFiles} onClick={() => handleOpen("new")}>
                <img src={folder} alt="folder" style={{ marginLeft: "56px" }} />
                <input
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ref={hiddenFileInput}
                  onChange={(e) => handleChange(e, "new")}
                  style={{ display: "none" }}
                />
                Existing TB upload
              </div>

              <div style={inputFiles} onClick={() => handleOpen("exist")}>
                <img src={folder} alt="folder" style={{ marginLeft: "40px" }} />
                <input
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  ref={existFileInput}
                  onChange={(e) => handleChange(e, "exist")}
                  style={{ display: "none" }}
                />
                New TB upload
              </div>
            </div>
            <div style={{ display: "flex", padding: "0 1rem" }}>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "var(--clr-accent)",
                  textAlign: "center",
                }}
              >
                {" "}
                <i
                  class="fas fa-info-circle"
                  style={{ color: "var(--clr-accent)" }}
                ></i>{" "}
                Make sure only one sheet is present if one file is uploaded at a
                time
              </p>
            </div>
            {/* </div> */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Template;
