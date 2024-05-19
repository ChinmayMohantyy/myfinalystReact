import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { motion } from "framer-motion";

import * as actionTypes from "../../redux/actionTypes";
import { Submit } from "../Button";
import "./addledger.css";
import swal from "sweetalert";

const screen = {
  width: "100%",
  height: "76%",
  position: "fixed",
  zIndex: "999",
  backgroundColor: "#00000036",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};
const container = {
  width: "50%",
  minHeight: "40vh",
  borderRadius: "10px",
  maxHeight: "70vh",
  minWidth: "560px",
  padding: "2rem",

  zIndex: "15",
  backgroundColor: "white",
};

const head = {
  display: "flex",
};

const header = {
  fontSize: "2rem",
  fontWeight: "600",
};
const para = {
  fontSize: "14px",
  fontWeight: "400",
  marginTop: "0px",
  color: "#696F79",
};

const footSelect = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
};

const inputGrid = {
  display: "grid",
  gridTemplateColumns: "32% 32% 32%",
  gridGap: "1rem",
  marginTop: "1rem",
  // overflowX:'scroll',
  // overflowY:'none'
};

const para2 = {
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 10px 0",
  color: "var(--clr-font-mid)",
};

const input = {
  height: "48px",
  width: "100%",
  padding: "10px",
  outline: "none",
  // border:'1px solid #cacacabf',
  borderRadius: "6px",

  ":focus-visible": {
    border: "1px solid black",
  },
};

const span = {
  color: "rgba(207, 7, 7, 0.815) ",
};

const AddLedger = (props) => {
  let init = {
    LedgerCode: "",
    branchName: "",
    ledgerName: "",
    fs_grp:"",
    notes_grp:"",
    sub_grp:""
  };
  const TB_ID = useSelector((state) => state.reducer.tb_id);
  const group = useSelector((initialState) => initialState.reducer.grouping);

  const tableData = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const dispatch = useDispatch();
  const [post, setPost] = useState(init);
  console.log(props.select, "here mate");
const [optionfsgrp,setOptionFsgrp] = useState([]);
const [optionnotesgrp,setOptionNotesgrp] = useState([]);
const [optionSubgrp,setOptionSubgrp] = useState([]);

  function handleChange(field, e) {
    setPost({ ...post, [field]: e.target.value });
  }

  function handlePost() {
    console.log(post);
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    const tb_id = localStorage.getItem("tb_id");
    let headers = {
      "x-auth-token": auth,
      // 'Content-Type' : 'application/json'
    };
    const fd={
      "ledger_name": post.ledgerName,
      "ledger_code": post.LedgerCode,
      "branch":post.branchName,
      "fs_grp":post.fs_grp,
      "notes_grp":post.notes_grp,
      "sub_grp":post.sub_grp,
      "cy":0,
      "py":0,
      "adjusted_amount":0,
      "net_adjusted_amount":0,
      "tb_id":props.tb_id,
      "note_no":"",
      "discloures":false,
      "isAdjusted":false,
      "lid":Date.now(),
    }  
    console.log(fd, "fd created");

    try {
      axios
          .post(`/api/v1/uploads/upload-extratb/${project_id}`, fd, {
            headers,
          })
          .then((response) => {
            console.log(response, "response");
            //  setHeaders(response.data.headers_list)
            //   dispatch(setCartAdded(response.data.product))
          })
          .catch((error) => {
            console.log(error.response, "error");
            swal("","Ledger Code Already Exist","error");
          });
    } catch (error) {
      swal("","wrong Data Upload","error");
    }
    props.setUpdate(true);
    props.close(false);


    // if (props.name === "Create a new Ledger Item") {
    //   axios
    //     .post(`/api/v1/conventional-mode/add/${project_id}/${TB_ID}`, fd, {
    //       headers,
    //     })
    //     .then((response) => {
    //       console.log(response, "response");
    //       //  setHeaders(response.data.headers_list)
    //       //   dispatch(setCartAdded(response.data.product))
    //       axios
    //         .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
    //           headers,
    //         })
    //         .then((response) => {
    //           dispatch({
    //             type: actionTypes.SET_TABLE_DATA,
    //             payload: response.data.data.line_items,
    //           });
    //           console.log(
    //             response.data,
    //             "dat dat dat datd ddat dat dat dat dat dta dat d"
    //           );
    //           // history.push('/conventional')
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error.response, "error");
    //     });
    // }
    // if (props.name === "Add Ledger Above") {
    //   const arr = props.select[0];
    //   const pos = tableData.findIndex((value) => value.lid === arr.lid);

    //   fd.append("position", pos);
    //   axios
    //     .post(`/api/v1/ledger/add-ledger/${project_id}/${TB_ID}`, fd, {
    //       headers,
    //     })
    //     .then((response) => {
    //       console.log(response, "response");
    //       //  setHeaders(response.data.headers_list)
    //       //   dispatch(setCartAdded(response.data.product))
    //       axios
    //         .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
    //           headers,
    //         })
    //         .then((response) => {
    //           dispatch({
    //             type: actionTypes.SET_TABLE_DATA,
    //             payload: response.data.data.line_items,
    //           });
    //           console.log(
    //             response.data,
    //             "dat dat dat datd ddat dat dat dat dat dta dat d"
    //           );
    //           // history.push('/conventional')
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error.response, "error");
    //     });
    // }
    // if (props.name === "Add Ledger Below") {
    //   const arr = props.select[0];
    //   const pos = tableData.findIndex((value) => value.lid === arr.lid);

    //   fd.append("position", pos + 1);
    //   axios
    //     .post(`/api/v1/ledger/add-ledger/${project_id}/${TB_ID}`, fd, {
    //       headers,
    //     })
    //     .then((response) => {
    //       console.log(response, "response");
    //       //  setHeaders(response.data.headers_list)
    //       //   dispatch(setCartAdded(response.data.product))
    //       axios
    //         .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
    //           headers,
    //         })
    //         .then((response) => {
    //           dispatch({
    //             type: actionTypes.SET_TABLE_DATA,
    //             payload: response.data.data.line_items,
    //           });
    //           console.log(
    //             response.data,
    //             "dat dat dat datd ddat dat dat dat dat dta dat d"
    //           );
    //           // history.push('/conventional')
    //         });
    //     })
    //     .catch((error) => {
    //       console.log(error.response, "error");
    //     });
    // }
    
  }

  function handleClose(e) {
    if (e.target.classList.contains("screenDiv")) {
      props.close(false);
    }
  }
useEffect(() => {
  setOptionFsgrp([])
  group.grp.map((opt) => {
    console.log(opt.fs_grp);
    setOptionFsgrp(optionfsgrp=>[...optionfsgrp,{"label":opt.fs_grp,"value":opt.fs_grp}]);
  });
}, [])

  function handleGroupChange(field, e){
    setPost({ ...post, [field]: e.value });
    if(field === "fs_grp"){
      setOptionNotesgrp([])
      setOptionSubgrp([])
      setPost({LedgerCode: post.LedgerCode,
      branchName: post.branchName,
      ledgerName: post.ledgerName,
      fs_grp:post.fs_grp,
      notes_grp:"",
      sub_grp:""})
      group.grp.map((opt) => {
        if(opt.fs_grp === e.value){
          opt.notes_grp.forEach(element => {
            setOptionNotesgrp(optionnotesgrp=>[...optionnotesgrp,{"label":element.notes_grp,"value":element.notes_grp}])
          });
        }
      });
      
    }
    if(field === "notes_grp"){
      group.grp.map((opt) => {
          opt.notes_grp.forEach(element => {
            if(element.notes_grp === e.value){
                element.sub_grp.forEach(sub => {
                  setOptionSubgrp(optionSubgrp=>[...optionSubgrp,{"label":sub.sub_grp,"value":sub.sub_grp}])
                });
            }
        });
      });
    }
  }

  console.log(Date.now(),"jhgfd");
  return (
    <motion.div
      style={screen}
      className="screenDiv"
      onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        style={container}
        className="col-md-7 col-sm-10"
        initial={{ y: "-5vh" }}
        animate={{ y: 0 }}
      >
        <div style={head}>
          <div>
            <h2 style={header}>{props.name}</h2>
            <p style={para}>
              This entry will be added to the newly adjusted trial balance too.
            </p>
          </div>
          <div style={{ paddingTop: "13px", marginLeft: "auto" }}>
            <h5
              style={{
                color: "var(--clr-accent)",
                fontSize: "1rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={() => {
                props.close(false);
              }}
            >
              Close
            </h5>
          </div>
        </div>
        <div style={inputGrid}>
          <div className="Ledger">
            <p style={para2}>
              Ledger Code<span style={span}>*</span>
            </p>
            <input
              style={input}
              placeholder="Enter Code.."
              onChange={(e) => {setPost({...post,['LedgerCode']:e.target.value})}}
              // onChange={(e) => {
                
              //   handleGroupChange("LedgerCode", e);
              // }}
              // onChange={(e) => {setValue({...value,['projectName']:e.target.value})}}
            ></input>
          </div>
          <div className="Ledger">
            <p style={para2}>
              Ledger Name<span style={span}>*</span>
            </p>
            <input
              style={input}
              placeholder="Enter Name.."
              onChange={(e) => {setPost({...post,['ledgerName']:e.target.value})}}

              // onChange={(e) => {setValue({...value,['projectName']:e.target.value})}}
            ></input>
          </div>
          <div className="Ledger">
            <p style={para2}>
              Branch Name<span style={span}>*</span>
            </p>
            <input
              style={input}
              placeholder="Enter Branch Name.."
              onChange={(e) => {setPost({...post,['branchName']:e.target.value})}}
              // onChange={(e) => {setValue({...value,['projectName']:e.target.value})}}
            ></input>
          </div>
          <div>
            <p style={para2}>
              Fs Grouping<span style={span}>*</span>
            </p>
            <Select
              placeholder="Select option"
              options={optionfsgrp}
              // value={value.companyNature}
              onChange={(e) => handleGroupChange("fs_grp",e)}
              theme={(theme) => ({
                ...theme,
                outline: "none",
                border: "1px solid white",
                // borderRadius: '6px',
                width: "100%",
                colors: {
                  ...theme.colors,
                  primary25: "#03565a98",
                  primary: "#03565A",
                },
              })}
            />
          </div>
          <div>
            <p style={para2}>
              Notes Grouping<span style={span}>*</span>
            </p>
            <Select
              placeholder="Select option"
              options={optionnotesgrp}
              // value={post.notes_grp}
              // onChange={(e) =>handleChange('GAAP',e)}
              onChange={(e) => handleGroupChange("notes_grp",e)}
              theme={(theme) => ({
                ...theme,
                borderRadius: "6px",
                width: "100%",
                colors: {
                  ...theme.colors,
                  primary25: "#03565a98",
                  primary: "#03565A",
                },
              })}
            />
          </div>
          <div>
            <p style={para2}>
              Sub Grouping<span style={span}>*</span>
            </p>
            <Select
              placeholder="Select option"
              // {mock.map(() => {})}
              // options={optionSubgrp}
              options={optionSubgrp}
              // defaultValue={post.sub_grp}
              // value={post.sub_grp}
              onChange={(e) =>handleGroupChange('sub_grp',e)}
              theme={(theme) => ({
                ...theme,
                borderRadius: "6px",
                width: "100%",
                colors: {
                  ...theme.colors,
                  primary25: "#03565a98",
                  primary: "#03565A",
                },
              })}
            />
          </div>
        </div>
        <div style={footSelect}>
          <div>
            <div
              onClick={() => {
                handlePost();
              }}
            >
              <Submit value="Create new Ledger" sm />
            </div>
          </div>
        </div>

        <div></div>
      </motion.div>
    </motion.div>
  );
};

export default AddLedger;
