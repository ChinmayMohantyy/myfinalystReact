import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";
import "./pnl.css";
import dateFormat from "dateformat";
import ProgressBar from "@ramonak/react-progress-bar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const type = {
  fontSize: "20px",
  fontWeight: "700",
  lineHeight: "24px",
  letterSpacing: "0px",
};

const level1 = {
  lineHeight: "22px",
  letterSpacing: "0px",
  fontSize: "18px",
  fontWeight: "600",
};

const level2 = {
  lineHeight: "20px",
  fontSize: "16px",
  fontWeight: "500",
};

const level3 = {
  lineHeight: "20px",
  fontSize: "16px",
  fontWeight: "400",
  // color:'blue'
  // transition:'width 2s, height 2s, transform 2s',
};

const total = {
  lineHeight: "22px",
  letterSpacing: "0px",
  fontSize: "18px",
  fontWeight: "600",
  backgroundColor: "#e0e0e0",
  borderBottom: "1px solid #cfcccc",
};

const Note = {
  lineHeight: "20px",
  fontSize: "16px",
  fontWeight: "5   00",
  color: "var(--clr-accent)",
  cursor: "pointer",
};

const PNLStatement = (props) => {
  const [rows, setRows] = useState([]);
  const [no, setNo] = useState([]);
  console.log(no, "nonononon");
  const dispatch = useDispatch();

  console.log(rows, "hey hey hey hey");
  const fsRows = Object.keys(rows);
  console.log(fsRows, "hey hey hey hey");
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const auth = localStorage.getItem("auth_token");
  const project_id = localStorage.getItem("project_id");
  const [fotterdata,setFooterData] = useState("");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };
  useEffect(() => {
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
      getFooter();
  }, []);

  useEffect(() => {
    console.log("hey ");
    let noArr = [];

    fsRows.map((row, i) => {
      rows[row].map((line, ix) => {
        console.log(line, "aval");
        if (
          noArr.length > 0 &&
          noArr.some(
            (user) =>
              user.notes_grp.toLowerCase() === line.notes_grp.toLowerCase()
          )
        ) {
        } else {
          noArr.push({ notes_grp: line.notes_grp });
        }
      });
    });
    console.log(noArr);
    setNo(noArr);
  }, [rows]);

  // const [clicked, setClicked] = useState(false);
  // const toggle = index => {
  //   if (clicked === index) {
  //     return setClicked(null);
  //   }

  //   setClicked(index);
  // };
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  function handleSelect(key) {
    props.setKey("Notes2");
    props.scrollToTop();
    props.setNote(key);
    dispatch({ type: actionTypes.SET_PLNO, payload: key });
  }

  function brackets(val) {
    // const summa = 'Hundreds'
    // const summa = 'Thousands'
    // const summa = 'Lakhs'
    const summa = props.precision;
    const float_value = props.floatdata;
    console.log(props.precision);
    const k = [
      { value: 1, label: "Units", suffix: "" },
      // { value: 10 , label: 'Tens',suffix:''},
      { value: 100, label: "Hundreds", suffix: "" },
      { value: 1000, label: "Thousands", suffix: "" },
      { value: 100000, label: "Lakhs", suffix: "" },
      { value: 10000000, label: "Crores", suffix: "" },
    ];

    const object = k.find((e) => e.label === summa);
    // const total = val / object.value;
    const total = parseFloat( val / object.value).toFixed(float_value);
    console.log(total, "total");

    if (val < 0) {
      const negNum = -1 * total;
      console.log(object, "object hered object");

      return "(" + negNum.toLocaleString("en-IN") + `${object.suffix}` + ")";
    }
    return total.toLocaleString("en-IN") + `${object.suffix}`;
  }

  function handleFooter(e,editor) {
    const data = editor.getData();
    console.log(data);
    saveFooter(data);
  }
  
  const saveFooter=(val)=>{
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };
    let data ={
      name:"p&lstatement",
      footer_name:val
    }
    axios
      .post(`/api/v1/pnl/save-footer-pl/${project_id}`,data, { headers })
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
        console.log(response.data,"KKK22");
        // setRows(response.data.balance_sheet);
        console.log(response.data.getFooter[0],"11111111111111111111111111");
  
        if (response.data.getFooter[0].footer_plstatement.name === "p&lstatement") {
        setFooterData(response.data.getFooter[0].footer_plstatement.footer_name);
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  }

  function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }
  console.log(rows);

  return (
    <>
      <div className="tableSheet">
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ minWidth: "380px", width: "40vw" }}>PARTICULAR</th>
              <th style={{ maxWidth: "60px" }}>Notes</th>
              <th style={{ maxWidth: "60px" }}>
                As at{" "}
                {dateFormat(props.projectData.current_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ maxWidth: "60px" }}>
                As at{" "}
                {dateFormat(props.projectData.previous_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ minWidth: "200px", width: "20vw" }}>Guidances</th>
            </tr>
          </thead>
          <tbody>
            {fsRows.map((row, i) => {
              console.log(row, "row eow ");

              const cy = rows[row].reduce((totalCy, i) => totalCy + i.cy, 0);
              const py = rows[row].reduce((totalPy, i) => totalPy + i.py, 0);
              const index = i + 1;
              const cy_0 = rows["Revenue"].reduce(
                (totalCy, i) => totalCy + i.cy,
                0
              );
              const py_0 = rows["Revenue"].reduce(
                (totalPy, i) => totalPy + i.py,
                0
              );
              const cy_1 = rows["Expenses"].reduce(
                (totalCy, i) => totalCy + i.cy,
                0
              );
              const py_1 = rows["Expenses"].reduce(
                (totalPy, i) => totalPy + i.py,
                0
              );
              const cy_tax = rows["Expenses"][8].cy;
              const py_tax = rows["Expenses"][8].py;
              // const cy_tax =  0
              // const py_tax = 0
              const profit_py = py_0 - py_1;
              const profit_cy = cy_0 - cy_1;
              console.log(
                cy_tax,
                rows["Other Comprehensive Income"],
                "cy_tax row eow "
              );
              console.log(py_tax, "py_tax row eow ");
              props.setCurrentProfit(profit_py + py_tax);
              props.setCurrentYearProfit(profit_cy + cy_tax);
              props.setComProfit(py);
              props.setComYearProfit(cy);

              return (
                <>
                  <tr key={i}>
                    <td style={level1}>{row}</td>
                    {/* <td style={level1}>{i+1}.{row}</td> */}
                    <td></td>
                    <td style={{ fontWeight: "600" }}>
                      {cy ? cy.toLocaleString("en-IN") : "-"}
                    </td>
                    <td style={{ fontWeight: "600" }}>
                      {py ? py.toLocaleString("en-IN") : "-"}
                    </td>
                    <td></td>
                  </tr>

                  {rows[row].map((line, ix) => {
                    if (
                      no.length > 0 &&
                      no.some(
                        (user) =>
                          user.notes_grp.toLowerCase() ===
                          line.notes_grp.toLowerCase()
                      )
                    ) {
                      const index = no.findIndex(
                        (x) =>
                          x.notes_grp.toLowerCase() ===
                          line.notes_grp.toLowerCase()
                      );
                      const number =
                        index + props.NoteNumber + props.notenum2 + 1;
                      const length = rows[row].length - 1;
                      console.log(length, "length length length");
                      // if(line.notes_grp.includes('Purchases')){
                      //     return(
                      //         <tr key={ix}>
                      //             <td style={level2}>{line.notes_grp}</td>
                      //             <td
                      //             // onClick={()=>{handleSelect(number - 37)}}
                      //                 className='notes_numbering' style={{color:'var(--clr-accent)'}}>
                      //                     {/* {index + props.NoteNumber + props.notenum2 + 1} */}
                      //                     </td>
                      //             <td>{line.cy ? ((line.cy)).toLocaleString('en-IN'):0}</td>
                      //             <td>{line.py ? ((line.py)).toLocaleString('en-IN'):0}</td>
                      //             <td></td>
                      //         </tr>
                      //     )
                      // }
                      if (i === 0) {
                        return (
                          <>
                            <tr key={ix}>
                              <td style={level2}>{line.notes_grp}</td>
                              <td
                                onClick={() => {
                                  handleSelect(number - 37);
                                }}
                                className="notes_numbering"
                                style={{ color: "var(--clr-accent)" }}
                              >
                                {index + props.NoteNumber + props.notenum2 + 1}
                              </td>
                              <td>{line.cy ? brackets(line.cy) : "-"}</td>
                              <td>{line.py ? brackets(line.py) : "-"}</td>
                              <td></td>
                            </tr>
                          </>
                        );
                      }
                      return (
                        <>
                          <tr key={ix}>
                            <td style={level2}>{line.notes_grp}</td>
                            <td
                              onClick={() => {
                                handleSelect(number - 37);
                              }}
                              className="notes_numbering"
                              style={{ color: "var(--clr-accent)" }}
                            >
                              {index + props.NoteNumber + props.notenum2 + 1}
                            </td>
                            <td>{line.cy ? brackets(line.cy) : "-"}</td>
                            <td>{line.py ? brackets(line.py) : "-"}</td>
                            <td></td>
                          </tr>
                          {i === 1 && ix === 8 && (
                            <tr>
                              <td style={total}>
                                Profit before exceptional items and tax
                              </td>
                              <td style={total}></td>
                              <td style={total}>
                                {profit_cy ? brackets(profit_cy) : "-"}
                              </td>
                              <td style={total}>
                                {profit_py ? brackets(profit_py) : "-"}
                              </td>
                              <td style={total}></td>
                            </tr>
                          )}
                        </>
                      );
                    }
                    const ins = ix + 1;
                    return (
                      <div key={ix}>
                        <tr>
                          <td style={level2}>{line.notes_grp}</td>
                          <td
                            onClick={() => {
                              handleSelect(index + props.NoteNumber - 37);
                            }}
                            className="notes_numbering"
                            style={{ color: "var(--clr-accent)" }}
                          >
                            {index + props.NoteNumber}
                          </td>
                          <td>{line.cy ? brackets(line.cy) : `-`}</td>
                          <td>{line.py ? brackets(line.py) : `-`}</td>
                          <td></td>
                        </tr>
                        {i === 1 && ix === 8 && (
                          <tr>
                            <td style={total}>
                              Profit before exceptional items and tax
                            </td>
                            <td style={total}></td>
                            <td style={total}>
                              {profit_cy ? brackets(profit_cy) : "-"}
                            </td>
                            <td style={total}>
                              {profit_py ? brackets(profit_py) : "-"}
                            </td>
                            <td style={total}></td>
                          </tr>
                        )}
                      </div>
                    );
                  })}
                  {i === 1 && (
                    <tr>
                      <td style={total}>Profit for the year</td>
                      <td style={total}></td>
                      <td style={total}>
                        {profit_cy + cy_tax
                          ? brackets(profit_cy + cy_tax)
                          : "-"}
                      </td>
                      <td style={total}>
                        {profit_py + py_tax
                          ? brackets(profit_py + py_tax)
                          : "-"}
                      </td>
                      <td style={total}></td>
                    </tr>
                  )}
                  {/* <tr style={{ backgroundColor:'lightBlue'}}>
                        <td style={{border:'None'}} >Sum</td>
                        <td>$180</td>
                        <td>$180</td>
                        <td>$180</td>
                        <td>$180</td>
                        </tr> */}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={{marginTop: "20px"}}>
        <CKEditor
                  style={{minHeight:'70vh',zIndex:'0'}}
                  editor={ ClassicEditor }
                  // data={fotterdata}
                  onReady={editor=>{}}
                  onChange={(e, editor) => {
                    handleFooter(e,editor);
                  }}
                  />
                    <h4 style={{marginLeft:"2rem"}}>
                      <strong>
                      {/* <div dangerouslySetInnerHTML={{_html:fotterdata}} className='editor'></div> */}
                     {
                      removeTags(fotterdata)
                     }
                      </strong>
                    </h4>
      </div>
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
      <ProgressBar bgColor="#D96B62" completed={30} />
      </div>
    </>
  );
};

export default PNLStatement;
