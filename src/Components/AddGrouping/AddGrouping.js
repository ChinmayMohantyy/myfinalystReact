import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Submit } from "../Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import { socket } from "../../services/socket/socket";
import swal from "sweetalert";

const screen = {
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: "999",
  backgroundColor: "#00000036",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};
const container = {
  // width:'30%',
  minHeight: "20vh",
  borderRadius: "10px",
  // maxHeight:'90vh',
  padding: "2rem 4rem",

  zIndex: "999",
  backgroundColor: "#f5f7fa",
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
const footSelect = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: "1.2rem",
};

const presetHeader = {
  fontSize: "14px",
  color: "var(--clr-font-mid)",
  margin: "0 15px 5px 0px",
  // width:'1px'
};

const grid = {
  display: "grid",
  gridTemplateColumns: "48% 48% ",
  gridColumnGap: "5%",
  // gridRowGap: '10px'
};

const AddGrouping = (props) => {
  const dispatch = useDispatch();
  const inti = {
    ledger_name: "",
    sub_grp: "",
  };
  const [field, setField] = useState(inti);
  // const [res, setRes] = useState({})
  // console.log(res,'res res res rwss')
  // console.log(field)
  console.log(props.nid, "nid");
  console.log(props.sid, "sid");
  console.log(props.notenum, "notenum");

  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const grouping = useSelector((initialState) => initialState.reducer.grouping);
  const tableData = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const project_id = localStorage.getItem("project_id");

  function handleClose(e) {
    if (e.target.classList.contains("screenDiv")) {
      props.setAddGrouping(false);
    }
  }

  function handleChange(inp, e) {
    console.log(inp);
    console.log(e.target.value);
    // dispatch({type: actionTypes.SET_NOTE4,payload:e.target.value})
    // dispatch({type: actionTypes.SET_NOTE4,payload:res.data.notes.data[0].sub_grp})
    setField({ ...field, [inp]: e.target.value });
  }

  function handleSubmit() {
    if (field.sub_grp.length < 1) {
      swal("", "please enter a valid subgrouping name", "warning");

      return;
    }
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
      // 'Content-Type' : 'application/json'
    };
    console.log(props.newSg.note_grp, "props.newSg");
    console.log(field, "props.newSg");
    const fd = new FormData();
    fd.append("notes_grp", props.newSg.note_grp);
    fd.append("sg", field.sub_grp);
    axios
      .post(`/api/v1/grouping/sg/${project_id}`, fd, { headers })
      .then((res) => {
        console.log(res, "res");
        const grouping1 = grouping;
        console.log(grouping1, "grouping 1");
        grouping1.grp.map((grp, i) => {
          if (grp.fs_grp === props.newSg.fs_grp) {
            console.log(grp);
            grp.notes_grp.map((nts, i) => {
              if (nts.notes_grp === props.newSg.note_grp) {
                console.log(nts, "notes");
                nts.sub_grp.push({
                  sub_grp: field.sub_grp,
                  cy_amt:
                    props.newSg.fs_grp === "Revenue" ||
                    props.newSg.fs_grp === "Shareholder Funds" ||
                    props.newSg.fs_grp === "Non Current Liabilities" ||
                    props.newSg.fs_grp === "Current Liabilities"
                      ? props.newSg.cy
                        ? props.newSg.cy * -1
                        : 0
                      : props.newSg.cy
                      ? props.newSg.cy
                      : 0,
                  py_amt:
                    props.newSg.fs_grp === "Revenue" ||
                    props.newSg.fs_grp === "Shareholder Funds" ||
                    props.newSg.fs_grp === "Non Current Liabilities" ||
                    props.newSg.fs_grp === "Current Liabilities"
                      ? props.newSg.py
                        ? props.newSg.py * -1
                        : 0
                      : props.newSg.py
                      ? props.newSg.py
                      : 0,
                });
              }
            });
          }
        });

        props.setOtherGrouping(grouping1);
        // grouping1.grp =  res.data.grp
        dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grouping1 });
        if (props.newSg.lid) {
          let index = tableData.findIndex((x) => x.lid === props.newSg.lid);
          console.log("index", index);
          let arr = tableData;
          arr[index].sub_grp = field.sub_grp;
          arr[index].cy_amt =
            props.newSg.fs_grp === "Revenue" ||
            props.newSg.fs_grp === "Shareholder Funds" ||
            props.newSg.fs_grp === "Non Current Liabilities" ||
            props.newSg.fs_grp === "Current Liabilities"
              ? props.newSg.cy
                ? props.newSg.cy * -1
                : 0
              : props.newSg.cy
              ? props.newSg.cy
              : 0;
          arr[index].py_amt =
            props.newSg.fs_grp === "Revenue" ||
            props.newSg.fs_grp === "Shareholder Funds" ||
            props.newSg.fs_grp === "Non Current Liabilities" ||
            props.newSg.fs_grp === "Current Liabilities"
              ? props.newSg.py
                ? props.newSg.py * -1
                : 0
              : props.newSg.py
              ? props.newSg.py
              : 0;
          console.log(arr, "ar here after sub grouping ");
          dispatch({ type: actionTypes.SET_TABLE_DATA, payload: arr });
          const body = JSON.stringify(grouping1.grp);
          console.log(body, "body here mate");
          socket.emit("auto-save", {
            project_id: localStorage.getItem("project_id"),
            tb_id: props.newSg.tb_id,
            lid: props.newSg.lid,
            contents: {
              sub_grp: field.sub_grp,
              cy_amt:
                props.newSg.fs_grp === "Revenue" ||
                props.newSg.fs_grp === "Shareholder Funds" ||
                props.newSg.fs_grp === "Non Current Liabilities" ||
                props.newSg.fs_grp === "Current Liabilities"
                  ? props.newSg.cy
                    ? props.newSg.cy * -1
                    : 0
                  : props.newSg.cy
                  ? props.newSg.cy
                  : 0,
              py_amt:
                props.newSg.fs_grp === "Revenue" ||
                props.newSg.fs_grp === "Shareholder Funds" ||
                props.newSg.fs_grp === "Non Current Liabilities" ||
                props.newSg.fs_grp === "Current Liabilities"
                  ? props.newSg.py
                    ? props.newSg.py * -1
                    : 0
                  : props.newSg.py
                  ? props.newSg.py
                  : 0,
            },
          });
        }
        const fd = new FormData();
        // fd.append('disclosures',field.disclosures);
        fd.append("grp", JSON.stringify(grouping1.grp));
        axios
          .post(`/api/v1/grouping/save-grp/${project_id}`, fd, { headers })
          .then((res) => {
            console.log(res, "res");
          })
          .catch((err) => {
            console.log(err, "err");
            console.log(err.response, "err");
          });
        props.setAddGrouping(false);
        props.SetMultiOptions(field);
      })
      .catch((err) => {
        console.log(err, "err");
        console.log(err.response, "err");
      });
    // console.log(grouping1,'grouping 1')
    // console.log(res)
  }

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
        className="col-md-5 col-sm-8"
        initial={{ y: "-5vh" }}
        animate={{ y: 0 }}
      >
        <div style={head}>
          <div>
            <h2 style={header}>Create Sub Grouping</h2>
            {/* <p style={para}>Ledger Codes, Ledger Names, Curent and year amount, Groupings and Trial balance Adjustments are saved to use next time</p> */}
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
                props.setAddGrouping(false);
              }}
            >
              close
            </h5>
          </div>
        </div>
        <div style={grid}>
          {/* <div style={{padding:'0 0',marginTop:'10px '}} className='presetName'>
                        <p style={presetHeader}>Ledger Name<span style={{color:'red'}}>*</span></p>
                        <input style={input} value={field.ledger_name}   
                        onChange={(e)=>{handleChange('ledger_name',e)}}  
                        />
                    </div> */}
          <div
            style={{ padding: "0 0", margin: "10px 0 ", display: "flex" }}
            className="presetName"
          >
            <p style={presetHeader}>
              Subgrouping&nbsp;Name<span style={{ color: "red" }}>*</span>
            </p>
            <input
              style={input}
              value={field.sub_grp}
              type="text"
              onChange={(e) => {
                handleChange("sub_grp", e);
              }}
            />
          </div>
        </div>
        {/* <div style={{ height:'2px',backgroundColor:'var(--clr-font-light)',marginTop:'1.5rem'}}></div>
                <div style={{height:'15rem'}}></div> */}
        <div style={footSelect}>
          {/* <div style={{color:'var(--clr-accent)',fontWeight:'700',cursor:'pointer'}} >Skip </div> */}
          <div
            onClick={() => {
              handleSubmit();
            }}
          >
            {field.sub_grp.length > 1 ? (
              <Submit value="    Create New Input    " sm />
            ) : (
              <Submit value="    Create New Input    " sm disable />
            )}
          </div>
        </div>

        <div></div>
      </motion.div>
    </motion.div>
  );
};

export default AddGrouping;
