import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import * as actionTypes from "../../redux/actionTypes";
import swal from "sweetalert";
import { Navbar } from "../../Components/Navbar";
import "./conventional.css";
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
import DeletedFile from "../../Components/deletedItems/DeletedFile";
import PopulateFs from "../../Components/populateFs/PopulateFs";
import ExpandLedger from "../../Components/expandLedger/ExpandLedger";
import AddLedger from "../../Components/addLedger/AddLedger";
import SwitchMode from "../../Components/switchMode/SwitchMode";
import AddGrouping from "../../Components/AddGrouping/AddGrouping";
import Confirmation from "../../Components/confirmationMenu/confirmationMenu";
import ShareScreen from "../../Components/shareScreen/ShareScreen";
import { socket } from "../../services/socket/socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import folder from "../../assets/folder.svg";
import Snackbar from "@mui/material/Snackbar";
import { AccessProjectContext } from "../../helper/DarkModeContext";
import AssignValuesData from "../setupProject/AssignValuesData";
import ProgressBar from "@ramonak/react-progress-bar";
import { Alert } from "@mui/material";
import DeleteDuplicate from "../../Components/deletedItems/DeleteDuplicate";

import { column } from "../../Components/Table/column";

// import Stack from '@mui/material/core/Stack';
// import Button from '@mui/material/Button';
// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from '@mui/material/lab/Alert`';
// import Example from '../../Components/reactTable/Table'
// import App from '../../Components/ReactTable/Table'
const style = {
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

const totalDiff = {
  color: "#e65308",
  fontWeight: "bold",
  marginLeft: "35px",
};
const Conventional = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const tableData = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const filterData = useSelector((initialState) => initialState.reducer.filter);
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const grouping = useSelector((initialState) => initialState.reducer.grouping);
  const [state, setstate] = useState([
    { column: "", select: "", change: "", startAmount: "", endAmount: "" },
  ]);
  const [filterRow, setFilterRow] = useState([]);
  const [totalRow, setTotalRow] = useState([]);
  const [totalFilter, setTotalFilter] = useState([]);
  const [filterShow, setFilterShow] = useState(false);
  const [object, setObject] = useState({});
  const [select, setSelect] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedMenu, setDeleteMenu] = useState(false);
  const [populateFs, setPopulateFs] = useState(false);
  const [switchMode, setSwitchMode] = useState(false);
  const [addLedger, setAddLedger] = useState(false);
  const [expandLedger, setExpandLedger] = useState(false);
  const [addLedgerAbove, setAddLedgerAbove] = useState(false);
  const [addLedgerBelow, setAddLedgerBelow] = useState(false);
  const [otherGrouping, setOtherGrouping] = useState(grouping);
  const [confirmation, setConfirmation] = useState(false);
  const [addGrouping, setAddGrouping] = useState(false);
  const [confirmationMenu, setConfirmationMenu] = useState();
  const [render, setRender] = useState("");
  // const [filterObject,SetFilterObject]= useState([])
  const [confirmfilClose, SetConfirmFilClose] = useState(false);
  const [hideItems, SetHideItems] = useState(false);
  const [multiOptions, SetMultiOptions] = useState("");
  const [newSg, SetNewSg] = useState();
  const [shareScreen, SetShareScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const project_id = localStorage.getItem("project_id");
  const [tb_upload, uploadTb] = useState(false);
  const [deleteRow, setDeleteRow] = useState(false);
  const [hiddenFilter, setHiddenFilter] = useState([]);
  const auth = localStorage.getItem("auth_token");

  const [updateRows, setUpdateRows] = useState(false);
  const [showAssignValues, setAssignValues] = useState(false);

  const { access, setAccess } = useContext(AccessProjectContext);
  const [fileUpload, setFileUpload] = useState("");
  const [type, setType] = useState("");
  const [headerdata, setHeaders] = useState([]);
  const [info, setinfo] = useState([]);
  const [index, setIndex] = useState("");
  const [countdata, getDataCount] = useState("");
  const [updateTabs, setUpdateTabs] = useState(false);

  const [openDuplicateModal, setDuplicateModal] = useState(false);

  const [duplicateItems, setDuplicateItems] = useState([]);

  let init = {
    LedgerCode: "",
    currentBalance: "",
    ledgerName: "",
    previousBalance: "",
    tbAmount: "",
  };
  const [Name, setName] = useState(init);
  const [tempID, setTempID] = useState("");

  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };

  let vertical = "bottom";
  let horizontal = "right";

  const hiddenFileInput = React.useRef(null);

  const existFileInput = React.useRef(null);

  const projectId = useParams();

  // let total_cy = 0;
  // let total_adjusted = 0;

  useEffect(() => {
    console.log(TB_ID);
    setLoading(true);
    setFilterShow(false);
    fetchUserProfile();
    fetchConvential();
    setFileUpload("");
  }, [deleteRow, updateRows]);

  console.log(filterShow);

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
        console.log(response.data.data.line_items, "response basic table");
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
        console.log(unique, " Unique");
        console.log(duplicates, "Duplicates");

        setTotalRow(response.data.data.line_items);
        setDeleteRow(false);
        setLoading(false);
        setUpdateRows(false);
      });
    const someData = tableData;
    const total_cy = someData.reduce((totalCy, i) => totalCy + Number(i.cy), 0);
    const total_py = someData.reduce((totalPy, i) => totalPy + Number(i.py), 0);
    const total_adjusted = someData.reduce(
      (totalPy, i) => Number(totalPy) + Number(i.adjusted_amount),
      0
    );

    return () => {
      console.log("ssss==========", JSON.stringify(grouping.grp));
      const fd = new FormData();
      fd.append("grp", JSON.stringify(grouping.grp));
      axios
        .post(`api/v1/grouping/save-grp/${project_id}`, fd, { headers })
        .then((res) => {
          console.log(res, "response  npotes notes resonse response response");
          console.log("ssss", JSON.stringify(grouping));
        })
        .catch((err) => {
          console.log(err.response);
          // if(err.response.data){

          //   alert(err.response.data.error)
          // }
        });
    };
  };

  // console.log(hideItems, "selectedRows selectedRows show");
  // console.log(totalRow, "selectedRows selectedRows show");
  // console.log(filterShow, "filter show");
  // console.log(tableData, "filter show table data");
  // console.log(filterRow, filterData, "filter row");
  // console.log(totalFilter, "totalFilter filter row");

  function handleDrop() {
    setConfirmDelete(!confirmDelete);
  }
  useEffect(() => {
    setRender(Math.random());
  }, [grouping]);

  function handleModal() {
    // console.log(data);
    uploadTb(true);
  }
  const handleClose = () => {
    uploadTb(false);
  };
  function handleApplyFilter() {
    console.log("lalalalal");
    setRender(Math.random());
    // setTotalFilter()

    // console.log(filterData);

    if (filterData.length > 0) {
      filterData.map((filter, i) => {
        console.log(filter, "filterfilter", i);

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
      });
    }
  }
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

  const card = {
    borderRadius: "6px",
    border: "2px solid lightGrey",
    width: "13rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "8rem",
    padding: "2rem",
    cursor: "pointer",
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

  // let hideData = ""
  function groupHideItems() {
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
      SetHideItems(true);
      setHiddenFilter((hiddenFilter) => [...hiddenFilter, filtredData]);
      // setTotalFilter();
    }
    // hideData = filterData
    // console.log(filtredData);
  }
  useEffect(() => {
    handleFetchHeader();

    const project_id = localStorage.getItem("project_id");
    axios
      .get(`/api/v1/tb-mapping/get-temp-model/${project_id}`, { headers })
      .then((response) => {
        console.log(response.data, "response ====================");
        // setinfo(dat);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  }, []);
  const handleFetchHeader = () => {
    const project_id = localStorage.getItem("project_id");
    // const temp_id = projectData[index].data.tmp_id;
    const temp_id = localStorage.getItem("temp_id");
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
    };
    axios
      .get(
        `/api/v1/tb-mapping/heading-classification/${project_id}/${temp_id}`,
        { headers }
      )
      .then((response) => {
        console.log(response.data, "response ====================");
        setHeaders(response.data.headers_list);
        // setinfo(dat);
        setIndex(index);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  const handleSubmit = () => {
    console.log("alalal");
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
          console.log(
            "hello new tb",
            response.data.result.data[0].segregatedJson
          );

          console.log(response, "data");
          setFileUpload(fileListAsArray);
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

  // console.log(tableData);

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
      // props.setConfirmation(true)
      // props.setConfirmationMenu(type)
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
              // dispatch({
              //   type: actionTypes.SET_DELET_ROW,
              //   payload: element,
              // });
              //   dispatch(setCartAdded(response.data.product))
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
  return (
    <>
      {shareScreen ? (
        <ShareScreen SetShareScreen={SetShareScreen} projectid={project_id} />
      ) : null}
      {addGrouping ? (
        <AddGrouping
          setOtherGrouping={setOtherGrouping}
          newSg={newSg}
          SetMultiOptions={SetMultiOptions}
          setAddGrouping={setAddGrouping}
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
      {expandLedger ? (
        <ExpandLedger
          close={setExpandLedger}
          name="Ledger Detail"
          select={select}
        />
      ) : null}
      {switchMode ? (
        <SwitchMode
          close={setSwitchMode}
          name="Choose a Mapping Mode"
          currentMode="1"
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
      <div>
        <Navbar text="Financial Year: 2021 - 2022" />
        <div className="conventionalMenu">
          {select.length < 1 ? null : (
            <div
              className="delete"
              // style={{ height: "100%", width: "80px" }}
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
            <img src={filter} alt="filter" />
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
            <div
              className="addTb"
              onClick={(e) => {
                handleModal();
              }}
            >
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
        {/* <BasicTable setSelect={setSelect} setLoading={setLoading} tableData={someData}/> */}
        {!loading && (
          <BasicTable
            multiOptions={multiOptions}
            otherGrouping={otherGrouping}
            SetNewSg={SetNewSg}
            setAddGrouping={setAddGrouping}
            totalFilter={totalFilter}
            hideItems={hideItems}
            setTotalRow={setTotalRow}
            setSelect={setSelect}
            loading={loading}
            setLoading={setLoading}
            filterShow={filterShow}
            // tableData={someData}
            SetHideItems={SetHideItems}
            hiddenFilter={hiddenFilter}
            fetchConvential={setUpdateRows}
            setUpdateTabs={setUpdateTabs}
            getdata={getDataCount}
          />
        )}
        <div
          style={{
            position: "sticky",
            // display: "flex",
            bottom: "0.5rem",
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
        {/* <div style={{position: 'sticky', bottom:'2rem', width: '100%', padding: '5px 10px',backgroundColor: 'grey', 
        }}><img src={plus} onClick={() => setAddLedger(true)}/></div> */}
        <div
          style={{
            position: "sticky",
            display: "flex",
            bottom: "0",
            width: "100%",
            padding: "5px 20px",
            backgroundColor: "var(--clr-font-light)",
          }}
        >
          {/* <img src={plus} alt="plus" onClick={() => setAddLedger(true)} /> */}
          {/* <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "rgb(70,72,71)",
              marginLeft: "1rem",
            }}
          >
            TB difference
          </div> */}

          {/* <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
              position: "absolute",
              left: "15%",
              color: "grey",
              padding: "0px 5px",
              marginLeft: "2rem",
            }}
          >
            current year amount :{" "}
            {(total_cy - total_adjusted).toLocaleString("en-IN")}
          </div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "500",
              position: "absolute",
              left: "35%",
              color: "grey",
              marginLeft: "3rem",
            }}
          >
            previous year amount :{" "}
            {total_py ? total_py.toLocaleString("en-IN") : "0"}
          </div> */}

          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
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
            ></Alert>
          </Snackbar>
          {/* <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            // open={calculateCY() - calculatePY() !== 0 ? true : false}
            open={true}
            message={
              // <React.Fragment>
              //   <div style={totalDiff}>
              //     TB NOT BALANCING CY BY{" "}
              //     <span> {calculateCY().toLocaleString("en-IN")}</span>
              //   </div>
              //   <div style={totalDiff}>
              //     TB NOT BALANCING PY BY{" "}
              //     <span> {calculatePY().toLocaleString("en-IN")}</span>
              //   </div>
              // </React.Fragment>

              // {calculateCY() + "," + calculatePY()}
              // {(total_cy - total_adjusted).toLocaleString("en-IN")}
            }
          /> */}
        </div>
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
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
    </>
  );
};

export default Conventional;
