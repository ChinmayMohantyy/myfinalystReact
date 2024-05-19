import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { socket } from "../../../services/socket/socket"
import * as actionTypes from "../../../redux/actionTypes";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import dateFormat from "dateformat";

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
  const total = {
    lineHeight: "22px",
    letterSpacing: "0px",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "#e0e0e0",
    borderBottom: "1px solid #cfcccc",
    paddingRight: "10px",
    // height:'30px'
  };
  const level2 = {
    lineHeight: "20px",
    fontSize: "16px",
    fontWeight: "500",
    // color:'green'
  };
  const total2 = {
    lineHeight: "22px",
    letterSpacing: "0px",
    fontSize: "18px",
    fontWeight: "600",
    backgroundColor: "#f2e2b6",
    borderBottom: "1px solid #cfcccc",
  };
  const Note = {
    lineHeight: "20px",
    fontSize: "16px",
    fontWeight: "5   00",
    color: "var(--clr-accent)",
    cursor: "pointer",
  };
  
  const level4 = {
    lineHeight: "20px",
    fontSize: "16px",
    fontWeight: "400",
    // marginLeft:'100px',
    // color:'green'
  };

  

function ConsoleBalanceSheet(props) {
    console.log(props);
    const dispatch = useDispatch();
    const rows = props.rows;
    // const [rows, setRows] = useState([]);
    const [no, setNo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [setprojectdata, setProjectData] = useState([]);
    const fsRows = Object.keys(rows);
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };
    // console.log(fsRows, 'hey hey hey hey' )
    const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
    const [isParentChecked, setIsParentChecked] = useState(false);
    const [datashow, dataShow] = useState(false);
    const [clicked, setClicked] = useState(false);
  
    useEffect(() => {
      console.log("hey ");
      let noArr = [];
  
      fsRows.map((row, i) => {
        rows[row].map((line, ix) => {
          // console.log(line, "aval");
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
      // console.log(noArr)
      setNo(noArr);
      // props.setNoteNum2(noArr.length)
      // console.log(noArr.length,'noArr.length noArr.length noArr.length')
    }, [rows]);
  
    useEffect(() => {
      axios
        .get(`/api/v1/tb-onboarding/get-all-projects`, { headers })
        .then((response) => {
          let projectFind = response.data.project_list.filter(
            (i) => i._id == project_id
          );
          projectFind.forEach((element) => {
            console.log(element.current_year);
            setProjectData(element);
          });
        })
        .catch((error) => {
          console.log(error.response, "error");
        });
    }, []);
  
    function handleClick(key) {
      // props.setTempValue(key + 3);
      props.setTempValue(key);
  
      console.log(key)
    }
  
    const toggle = (index) => {
      if (clicked === index) {
        //if clicked question is already active, then close it
        return setClicked(null);
      }
  
      setClicked(index);
    };
    const numberFormat = (value) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(value);
  
    const handleParentClick = (i, e, rowData, id, row) => {
      console.log(i);
      console.log(e);
      console.log(rows);
      console.log(fsRows);
      console.log(id);
      console.log(row);
      const { checked } = e.target;
      if (checked) {
        const foundArr = props.hideData.includes(row);
        if (!foundArr) {
          props.hideData.push(row);
        }
  
        // props.setHideData(hideData=>[...hideData,row])
        rows[row].map((user) => {
          if (id === "parent") {
            console.log("lslsl");
            setIsParentChecked(i);
            dataShow(user);
  
            user.isChecked = checked;
          } else {
            if (user.id === id) {
              user.isChecked = checked;
            }
            const isAllChildsChecked = rowData.every(
              (user) => user.isChecked === true
            );
            // if (isAllChildsChecked) {
            //   setIsParentChecked(checked);
            // } else {
            //   setIsParentChecked(false);
            // }
          }
          return user;
        });
      } else {
        const index = props.hideData.indexOf(row);
        if (index > -1) {
          // only splice array when item is found
          props.hideData.splice(index, 1); // 2nd parameter means remove one item only
        }
        rows[row].map((user) => {
          if (id === "parent") {
            setIsParentChecked("");
            dataShow(user);
            user.isChecked = checked;
          } else {
            if (user.id === id) {
              user.isChecked = checked;
            }
            const isAllChildsChecked = rowData.every(
              (user) => user.isChecked === false
            );
            // if (isAllChildsChecked) {
            //   setIsParentChecked(checked);
            // } else {
            //   setIsParentChecked(false);
            // }
          }
          return user;
        });
      }
    };
  
    const handleChildClick = (e, data, parent) => {
      console.log(e);
      console.log(data);
      console.log(parent);
      props.hideChildData.push(data, parent);
    };
    console.log(fsRows, "---------------");
    console.log(rows, "+++++++++++++");


  return (
    <>
    <div
      className="tableSheet"
      // initial={{y:'-5vh'}}
      // animate={{y:0}}
    >
      <table style={{ width: "100%" }}>
        <thead>
        <tr>
            <th rowspan="2" style={{ width: "50%",
                  height: "50px",
                  textAlign: "left",
                  paddingLeft: "2rem",}}>PARTICULAR	</th>
            <td rowspan="2"  style={{ maxWidth: "10%" }}>Notes</td>
            <td colspan="2" style={{ width: "25%" }}>ABC</td>
            <td colspan="2" style={{ width: "25%" }}>XYZ</td>
            <td colspan="3" style={{ width: "25%" }}>ADJUSTMENT</td>
            <td colspan="3" style={{ width: "25%" }}>TOTAL</td>
        </tr>
          
            <tr style={{ backgroundColor: "#A2C0C2" }}>
  
              <th style={{ width: "25%" }}>
                 {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ Width: "25%" }}>
                 {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
              </th>
              {/* <th style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th> */}

              <th style={{ width: "25%" }}>
                 {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ Width: "25%" }}>
                 {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ width: "25%" }}>
                 {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ Width: "25%" }}>
                 {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ Width: "25%" }}>
                OPENING
              </th>
              <th style={{ width: "25%" }}>
                 {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ Width: "25%" }}>
                 {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
              </th>
              <th style={{ Width: "25%" }}>
                OPENING
              </th>
            </tr>
        </thead>
        <tbody
        //   style={{
        //     background: `${theme ? "" : "#363535"}`,
        //     color: `${theme ? "" : "#fff"}`,
        //   }}
        >
          {fsRows.map((row, i) => {
            console.log(rows[row], "Row data");
            const cy = rows[row].reduce((totalCy, i) => totalCy + i.cy, 0);
            const py = rows[row].reduce((totalPy, i) => totalPy + i.py, 0);
            console.log(cy, "Row d ata");
            let cy_0 = 0;
            let py_0 = 0;
            if (rows["Non Current Assets"]) {
              cy_0 = rows["Non Current Assets"].reduce(
                (totalCy, i) => totalCy + i.cy,
                0
              );
              py_0 = rows["Non Current Assets"].reduce(
                (totalPy, i) => totalPy + i.py,
                0
              );
            }

            let cy_1 = 0;
            let py_1 = 0;

            if (rows["Current Assets"]) {
              cy_1 = rows["Current Assets"].reduce(
                (totalCy, i) => totalCy + i.cy,
                0
              );
              py_1 = rows["Current Assets"].reduce(
                (totalPy, i) => totalPy + i.py,
                0
              );
            }

            const total_assets_py = py_0 + py_1;
            const total_assets_cy = cy_1 + cy_0;
            let cy_3 = 0;
            let py_3 = 0;
            let cy_4 = 0;
            let py_4 = 0;
            cy_3 = rows["Non Current Liabilities"].reduce(
              (totalCy, i) => totalCy + i.cy,
              0
            );
            py_3 = rows["Non Current Liabilities"].reduce(
              (totalPy, i) => totalPy + i.py,
              0
            );
            cy_4 = rows["Current Liabilities"].reduce(
              (totalCy, i) => totalCy + i.cy,
              0
            );
            py_4 = rows["Current Liabilities"].reduce(
              (totalPy, i) => totalPy + i.py,
              0
            );
            // console.log(py_0,cy_0,py_1,cy_1,'totals')
            const total_liabilities_py = py_3 + py_4;
            const total_liabilities_cy = cy_3 + cy_4;
            console.log(cy_3, py_3);
            const index = i + 1;
            return (
              <>
                <tr key={i}>
                  <td style={total2}>
                    {/* <input
                      type="checkbox"
                      onClick={(e) => {
                        handleParentClick(i, e, rows[row], "parent", row);
                      }}
                    /> */}
                    {row}
                  </td>
                  <td style={total2}></td>
                  <td style={total2}>
                    {/* {row === "Shareholder Funds" ||
                    row === "Revenue" ||
                    row === "Non Current Liabilities" ||
                    row === "Current Liabilities"
                      ? Math.abs(cy.toLocaleString("en-IN"))
                      : cy.toLocaleString("en-IN")} */}
                  {cy ? cy.toLocaleString("en-IN") : "-"}
                  </td>
                  <td style={total2}>
                    {/* {row === "Shareholder Funds" ||
                    row === "Revenue" ||
                    row === "Non Current Liabilities" ||
                    row === "Current Liabilities"
                      ? py
                        ? Math.abs(py.toLocaleString("en-IN"))
                        : "0"
                      : py
                      ? py.toLocaleString("en-IN")
                      : "0"} */} {py ? py.toLocaleString("en-IN") : "-"}
                  </td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                  <td style={total2}></td>
                </tr>
                {rows[row].map((line, ix) => {
                  // console.log(line);
                  const index = no.findIndex(
                    (x) =>
                      x.notes_grp.toLowerCase() ===
                      line.notes_grp.toLowerCase()
                  );

                  const number = index + 3;
                  if (
                    no.length > 0 &&
                    no.some(
                      (user) =>
                        user.notes_grp.toLowerCase() ===
                        line.notes_grp.toLowerCase()
                    )
                  ) {
                    return (
                      <>
                        <tr key={ix}>
                          <td style={level2}>
                            {/* <input
                              type="checkbox"
                              checked={line?.isChecked}
                              value="child"
                              onChange={(e) =>
                                handleChildClick(e, line.notes_grp, row)
                              }
                            /> */}
                            {line.notes_grp}
                          </td>
                          <td
                            onClick={() => {
                              // handleClick(number - 3);
                              handleClick(Number(index + 2));
                            }}
                            style={Note}
                          >
                            {index + 3}
                            {/* {line.notes_no} */}
                          </td>
                          <td>
                            {line.cy ? line.cy.toLocaleString("en-IN") : "-"}
                          </td>
                          <td>
                            {line.py ? line.py.toLocaleString("en-IN") : "-"}
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
                      </>
                    );
                  }
                  if (i == 0 && ix == 7) {
                    return (
                      <>
                        <tr key={ix}>
                          <td style={level2}>Financial Assets</td>
                          <td style={Note}></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr key={ix}>
                          <td style={level4}>- {line.notes_grp}</td>
                          <td
                            onClick={() => {
                              handleClick(number - 3);
                            }}
                            style={Note}
                          >
                            {index + props.NoteNumber + 1}
                          </td>
                          <td>
                            {line.cy
                              ? Math.abs(line.cy).toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td>
                            {line.py
                              ? Math.abs(line.py).toLocaleString("en-IN")
                              : "-"}
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
                      </>
                    );
                  }
                  if (i === 1 && ix === 1) {
                    return (
                      <>
                        <tr key={ix}>
                          <td style={level2}>Financial Assets</td>
                          <td style={Note}></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr key={ix}>
                          <td style={level4}>- {line.notes_grp}</td>
                          <td
                            onClick={() => {
                              handleClick(number - 3);
                            }}
                            style={Note}
                          >
                            {index + props.NoteNumber + 1}
                          </td>
                          <td>
                            {line.cy
                              ? Math.abs(line.cy).toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td>
                            {line.py
                              ? Math.abs(line.py).toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                      </>
                    );
                  }
                  if (i === 2 && ix === 1) {
                    return (
                      <>
                        <tr key={ix}>
                          <td style={level2}>Other Equity</td>
                          <td style={Note}></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr key={ix}>
                          <td style={level4}>- {line.notes_grp}</td>
                          <td
                            onClick={() => {
                              handleClick(number - 3);
                            }}
                            style={Note}
                          >
                            {index + props.NoteNumber + 1}
                          </td>
                          <td>
                            {line.cy
                              ? Math.abs(line.cy).toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td>
                            {line.py
                              ? Math.abs(line.py).toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                      </>
                    );
                  }
                  if (i === 1 || i === 0) {
                    if (line.notes_grp.includes("Financial Assets")) {
                      return (
                        <>
                          <tr key={ix}>
                            <td style={level4}>- {line.notes_grp}</td>
                            <td
                              onClick={() => {
                                handleClick(number - 3);
                              }}
                              style={Note}
                            >
                              {index + props.NoteNumber + 1}
                            </td>
                            <td>
                              {line.cy
                                ? Math.abs(line.cy).toLocaleString("en-IN")
                                : "-"}
                            </td>
                            <td>
                              {line.py
                                ? Math.abs(line.py).toLocaleString("en-IN")
                                : "-"}
                            </td>
                            <td></td>
                            <td></td>
                          <td></td>
                          <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </>
                      );
                    }
                  }
                  if (i === 2) {
                    if (line.notes_grp.includes("other equity")) {
                      return (
                        <>
                          <tr key={ix}>
                            <td style={level4}>- {line.notes_grp}</td>
                            <td
                              onClick={() => {
                                handleClick(number - 3);
                              }}
                              style={Note}
                            >
                              {index + props.NoteNumber + 1}
                            </td>
                            <td>
                              {line.cy
                                ? Math.abs(line.cy).toLocaleString("en-IN")
                                : "-"}
                            </td>
                            <td>
                              {line.py
                                ? Math.abs(line.py).toLocaleString("en-IN")
                                : "-"}
                            </td>
                            <td></td>
                            <td></td>
                          <td></td>
                          <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                          </tr>
                        </>
                      );
                    }
                  }
                  return (
                    <>
                      <tr key={ix}>
                        <td style={level2}>{line.notes_grp}</td>
                        <td
                          onClick={() => {
                            handleClick(index - 3);
                          }}
                          style={Note}
                        >
                          {ix}
                        </td>
                        <td>
                          {line.cy
                            ? Math.abs(line.cy).toLocaleString("en-IN")
                            : "-"}
                        </td>
                        <td>
                          {line.py
                            ? Math.abs(line.py).toLocaleString("en-IN")
                            : "-"}
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
                    </>
                  );
                })}
                {i === 1 && (
                  <tr>
                    <td style={total}>Total Non Current & Current Assets</td>
                    <td style={total}></td>
                    <td style={total}>
                      {total_assets_cy
                        ? total_assets_cy.toLocaleString("en-IN")
                        : "-"}
                    </td>
                    <td style={total}>
                      {total_assets_py
                        ? total_assets_py.toLocaleString("en-IN")
                        : "-"}
                    </td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                  </tr>
                )}
                {i === 4 && (
                  <tr>
                    <td style={total}>
                      Total Non Current & Current Liabilities
                    </td>
                    <td style={total}></td>
                    <td style={total}>
                      {total_liabilities_cy
                        ? total_liabilities_cy.toLocaleString("en-IN")
                        : "-"}
                    </td>
                    <td style={total}>
                      {total_liabilities_py
                        ? total_liabilities_py.toLocaleString("en-IN")
                        : "-"}
                    </td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                    <td style={total}></td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      <table style={{width:"100%"}}>
  
</table>
    </div>
  </>
  )
}

export default ConsoleBalanceSheet

