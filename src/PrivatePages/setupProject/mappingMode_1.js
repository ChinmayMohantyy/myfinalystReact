import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";

import { Submit } from "../../Components/Button";
import * as actionTypes from "../../redux/actionTypes";

const MappingMode = ({ match: { params } }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const [click, setClick] = useState();
  console.log(TB_ID, "1111111111111111111111111111111111");
  const project_id = localStorage.getItem("project_id");
  const auth = localStorage.getItem("auth_token");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };

  console.log(params, "mapping mode");
  function handleSelect(name) {
    console.log(name, '"nae"');
    setClick(name);
  }

  function eliminateDupe(data) {
    // console.log(data,'elimination loop --------------------------------------- elimination loop')
    let line_items = [];
    const list = data.reverse();
    // console.log(list,'list no reverse dupe here elimination loop --------------------------------------- elimination loop')
    list.map((line, i) => {
      if (line_items.length < 1) {
        line_items.push(line);
        return;
      }
      if (line.ledger_code) {
        if (
          line_items.some(
            (user) =>
              user.ledger_code === line.ledger_code &&
              user.branch === line.branch
          )
        ) {
          return;
        }
      }
      // if(line_items.some(user => user.ledger_code === line.ledger_code)){
      if (
        line_items.some(
          (user) =>
            user.ledger_name === line.ledger_name && user.branch === line.branch
        )
      ) {
        return;
      }
      line_items.push(line);
    });
    const replace_tb = line_items.reverse();
    const new_tb = JSON.stringify(replace_tb);
    console.log(
      new_tb,
      "no reverse dupe here elimination loop --------------------------------------- elimination loop"
    );
    const fd = new FormData();
    fd.append("tb", new_tb);
    axios
      .post(`api/v1/project/replace-tb/${project_id}/${TB_ID}`, fd, { headers })
      .then((res) => {
        console.log(res, "response for ");
        dispatch({ type: actionTypes.SET_TABLE_DATA, payload: replace_tb });
      })
      .catch((err) => {
        console.log(err.response, "response error");
      });
    // console.log(line_items.reverse(),'no reverse dupe here elimination loop --------------------------------------- elimination loop')
    // console.log(line_items,'no dupe here elimination loop --------------------------------------- elimination loop')
  }

  function populateTable() {
    axios
      .get(`api/v1/tb-mapping/conventional-mode/${project_id}/${TB_ID}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data, "response after tb upload");
        axios
          .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
            headers,
          })
          .then((response) => {
            eliminateDupe(response.data.data.line_items);
            // dispatch({type: actionTypes.SET_TABLE_DATA,payload:response.data.data.line_items})
            console.log(
              response.data,
              "dat dat dat datd ddat dat dat dat dat dta dat d"
            );
            // history.push(`/conventional/${params.pid}`)
          });
      })
      .catch((error) => {
        console.log(error.response, "error");
      });

    axios
      .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, { headers })
      .then((response) => {
        dispatch({
          type: actionTypes.SET_TABLE_DATA,
          payload: response.data.data.line_items,
        });
        console.log(
          response.data,
          "dat dat dat datd ddat dat dat dat dat dta dat d"
        );
        if (click === "1") {
          history.push(`/Conventional/${params.pid}`);
        }
        if (click === "2") {
          history.push(`/template/${params.pid}`);
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
    // const Response = await axios.get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`,{headers})
    // console.log(Response,'response after the first api')
  }

  return (
    <div className="containerQuestionnaire">
      <div className="track">
        <div className="progressBar">
          <div className="vector-3"></div>
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
      <div className="main" style={{ padding: "4rem 9rem 0 9rem " }}>
        <div className="modeHeader">
          <h1>Choose a mapping mode</h1>
          <p>This step is important to map the trial balance ledger</p>
          <p>to Financial Statement</p>
        </div>
        <div className="cMode">
          <motion.div
            className={click === "1" ? "modeImg-1_active" : "modeImg-1"}
            onClick={() => handleSelect("1")}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1 },
            }}
          ></motion.div>
          <div className="modeContent">
            <h1>Conventional Mode</h1>
            <p>
              This mode allows you to assign individual ledgers
              <br />
              to respective financial statements, and their notes
            </p>
          </div>
        </div>
        <div className="tMode">
          <motion.div
            className={click === "2" ? "modeImg-2_active" : "modeImg-2"}
            onClick={() => handleSelect("2")}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.1 },
            }}
          ></motion.div>
          <div className="modeContent">
            <h1>Template Mode</h1>
            <p>
              This mode allows you to assign one or more <br />
              ledgers to a given FS template, and all you have to
              <br />
              do is drag and drop the ledgers.
            </p>
          </div>
        </div>

        <div
          className="post"
          onClick={() => {
            populateTable();
          }}
        >
          {(click === null) | (click === "") ? (
            <Submit disable value="Proceed" />
          ) : (
            <Submit value="Proceed" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MappingMode;
