import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";
import dateFormat from "dateformat";
// import './pnl.css'

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

function ConsolePnlStatement(props) {
    const [rows, setRows] = useState([]);
  const [no, setNo] = useState([]);
  const [setprojectdata, setProjectData] = useState([]);
  console.log(no, "nonononon");
  const dispatch = useDispatch();
  console.log(rows, "hey hey hey hey");
  const fsRows = Object.keys(rows);
  console.log(fsRows, "hey hey hey hey");
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const auth = localStorage.getItem("auth_token");
  const project_id = localStorage.getItem("project_id");
  const [isParentChecked, setIsParentChecked] = useState(false);
  const [datashow, dataShow] = useState(false);
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };
  useEffect(() => {
    setRows(props.rows);
    // axios
    //   .get(`/api/v1/pnl/generate-pnl/${project_id}/${TB_ID}`, { headers })
    //   .then((response) => {
    //     console.log(response, "response response");
    //     console.log(response.data.pnl_statement, "response response");
    //     setRows(response.data.pnl_statement);
    //   })
    //   .catch((error) => {
    //     console.log(error.response, "error");
    //   });
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

  useEffect(() => {
    axios
      .get(`/api/v1/tb-onboarding/get-all-projects`, { headers })
      .then((response) => {
        console.log(
          response.data.project_list.filter((i) => i._id == project_id),
          "response response"
        );
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

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  function handleSelect(key) {
    // props.setKey('Notes2')
    // props.scrollToTop()
    // props.setNote(key)
    props.setTempValue(key + 37);
    // dispatch({type: actionTypes.SET_PLNO,payload:key})
  }

  const handleParentClick = (i, e, rowData, id, row) => {
    console.log(i);
    console.log(e);
    console.log(rows[row]);
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
  return (
    <>
    <div className="tableSheet">
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
            {/* <th style={{ width: "40%" }}>PARTICULAR</th>
            <th style={{ width: "10%" }}>Notes</th> */}
            <th style={{ width: "25%" }}>
               {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
            </th>
            <th style={{ Width: "25%" }}>
            {" "}
              {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
            </th>

            <th style={{ width: "25%" }}>
               {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
            </th>
            <th style={{ Width: "25%" }}>
               {" "}
              {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
            </th>
{/* adjustment */}
            <th style={{ width: "25%" }}>
               {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
            </th>
            <th style={{ Width: "25%" }}>
             {" "}
              {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
            </th>
            <th style={{ Width: "25%" }}>
                OPENING
            </th>
            {/* Total */}
            <th style={{ width: "25%" }}>
               {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
            </th>
            <th style={{ Width: "25%" }}>
             {" "}
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
            const cy = rows[row].reduce((totalCy, i) => totalCy + i.cy, 0);
            const py = rows[row].reduce((totalPy, i) => totalPy + i.py, 0);

            console.log(cy, "CY");
            const index = i + 1;
            let cy_0 = 0;
            let py_0 = 0;
            if (rows["Revenue"]) {
              cy_0 = rows["Revenue"].reduce(
                (totalCy, i) => totalCy + i.cy,
                0
              );
              py_0 = rows["Revenue"].reduce(
                (totalPy, i) => totalPy + i.py,
                0
              );
            }

            let cy_1 = 0;
            let py_1 = 0;
            if (rows["Expenses"]) {
              cy_1 = rows["Expenses"].reduce(
                (totalCy, i) => totalCy + i.cy,
                0
              );
              py_1 = rows["Expenses"].reduce(
                (totalPy, i) => totalPy + i.py,
                0
              );
            }

            let cy_tax = 0;
            let py_tax = 0;
            if (rows["Expenses"]) {
              cy_tax = rows["Expenses"][8].cy;
              py_tax = rows["Expenses"][8].py;
            }

            const profit_py = py_0 - py_1;
            const profit_cy = cy_0 - cy_1;
            console.log(cy_tax, "cy_tax row eow ");
            console.log(py_tax, "py_tax row eow ");

            return (
              <>
                <tr key={i}>
                  <td style={total2}>
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        handleParentClick(i, e, rows[row], "parent", row);
                      }}
                    />
                    {i + 1}.{row}
                  </td>
                  <td style={total2}></td>
                  <td style={total2}>
                   {cy?cy.toLocaleString("en-IN"):'-'}
                  </td>
                  <td style={total2}>
                   {py?py.toLocaleString("en-IN"):'-'}
                  </td>

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
                    const number = index + 36;
                    const length = rows[row].length - 1;
                    console.log(length, "length length length");
                    return (
                      <>
                        <tr key={ix}>
                          <td style={level2}>
                            <input
                              type="checkbox"
                              checked={line?.isChecked}
                              value="child"
                              onChange={(e) =>
                                handleChildClick(e, line.notes_grp, row)
                              }
                            />
                            {line.notes_grp}
                          </td>
                          <td
                            onClick={() => {
                              handleSelect(number - 37);
                            }}
                            style={Note}
                          >
                            {index + 36}
                          </td>
                          <td>{line.cy? line.cy.toLocaleString("en-IN")
                          :'-'}</td>
                          <td>{line.py?line.py.toLocaleString("en-IN"):'-'}</td>

                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        {i === 1 && ix === 9 && (
                          <tr>
                            <td style={total}>
                              Profit before exceptional items and tax
                            </td>
                            <td style={total}></td>
                            <td style={total}>
                              {profit_cy
                                ? profit_cy.toLocaleString("en-IN")
                                : "-"}
                            </td>
                            <td style={total}>
                              {profit_py
                                ? profit_py.toLocaleString("en-IN")
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
                  }
                  const ins = ix + 1;
                  return (
                    <div key={ix}>
                      <tr>
                        <td style={level2}>{line.notes_grp}</td>
                        <td
                          onClick={() => {
                            // handleSelect(index + 39 - 37)
                          }}
                          style={Note}
                        >
                          {index + 38}
                        </td>
                        <td>{line.cy.toLocaleString("en-IN")}</td>
                        <td>{line.py.toLocaleString("en-IN")}</td>

                        <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                      </tr>
                      {i === 1 && ix === 9 && (
                        <tr>
                          <td style={total}>
                            Profit before exceptional items and tax
                          </td>
                          <td style={total}></td>
                          <td style={total}>
                            {profit_cy
                              ? profit_cy.toLocaleString("en-IN")
                              : "-"}
                          </td>
                          <td style={total}>
                            {profit_py
                              ? profit_py.toLocaleString("en-IN")
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
                    </div>
                  );
                })}
                {i === 1 && (
                  <tr>
                    <td style={total}>Profit for the year</td>
                    <td style={total}></td>
                    <td style={total}>
                      {profit_cy + cy_tax
                        ? (profit_cy + cy_tax).toLocaleString("en-IN")
                        : "-"}
                    </td>
                    <td style={total}>
                      {profit_py + py_tax
                        ? (profit_py + py_tax).toLocaleString("en-IN")
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
    </div>
  </>
  )
}

export default ConsolePnlStatement

