import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../services/socket/socket";
import * as actionTypes from "../../redux/actionTypes";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import dateFormat from "dateformat";
import { ThemeContext } from "../../helper/DarkModeContext";

const total = {
  lineHeight: "22px",
  letterSpacing: "0px",
  fontSize: "18px",
  fontWeight: "600",
  backgroundColor: "#e0e0e0",
  borderBottom: "1px solid #cfcccc",
};
const Pattern1 = (props) => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const Note = useSelector(
    (initialState) => initialState.reducerTemplate.note3
  );
  const group = useSelector((initialState) => initialState.reducer.grouping);
  const change = useSelector((initialState) => initialState.reducer.render);
  const tableData = useSelector((state) => state.reducer.tableData);
  const multiSelected = useSelector((state) => state.reducer.selectedRows);
  const noteNumber = props.note_no;
  const [setprojectdata, setProjectData] = useState([]);
  const [note, setNote] = useState(Note);
  const [grouping, setGrouping] = useState(group);
  const [nid, setNld] = useState("");
  const [highlight, setHighlight] = useState("");
  console.log(highlight, "highlighted");
  console.log(note, nid);
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const selected = useSelector(
    (initialState) => initialState.reducerTemplate.selected
  );
  const auth = localStorage.getItem("auth_token");
  const project_id = localStorage.getItem("project_id");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };

  useEffect(() => {
    setGrouping(group);
    console.log("changed");
  }, [group, change]);

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

  function handleDrop(row, sub, line) {
    console.log("drophere", row, sub, selected);
    let index = tableData.findIndex((x) => x.lid === selected.lid);
    setHighlight({ row: null, sub: null });
    console.log("index", index);
    console.log(row, "this is row arrarrarrarrarr");
    console.log(sub, "this is sub arrarrarrarrarr");
    console.log(line, "this is line arrarrarrarrarr");
    console.log(multiSelected, "multi select");
    if (
      multiSelected.length > 1 &&
      multiSelected.some((sel) => sel.ledger_code === selected.ledger_code)
    ) {
      console.log(multiSelected, "inside multi select");
      const grp = group;
      multiSelected.map((rows) => {
        // console.log(i,"here buddy it should workk now")
        grp.grp.map((opt) => {
          // console.log(rows.fs_grp,'notes nimber note number row.original.notes_grp man')
          if (opt.fs_grp === rows.fs_grp) {
            // console.log(rows.fs_grp,'notes nimber note number row.original.notes_grp man')
            opt.notes_grp.map((notes, i) => {
              // console.log(notes,'notes nimber note number row.original.notes_grp man')
              // console.log(rows,'notes nimber note number row.original.notes_grp man')
              if (notes.notes_grp === rows.note_grp) {
                console.log(
                  notes,
                  "notes nimber note number row.original.notes_grp man"
                );
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === rows.sub_grp) {
                    sub.cy_amt -=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.net_adjusted_amount * -1
                        : rows.net_adjusted_amount;
                    sub.py_amt -=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.py * -1
                        : rows.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
          }
          if (line.fs_grp === opt.fs_grp) {
            console.log(line.fs_grp, "note number row.original.notes_grp man");
            opt.notes_grp.map((notes, i) => {
              // console.log(notes,'notes nimber note number row.original.notes_grp man')
              // console.log(row,'notes nimber note number row.original.notes_grp man')
              // console.log(rows,'notes nimber note number row.original.notes_grp man')
              if (notes.notes_grp === sub.notes_grp) {
                console.log(
                  notes,
                  "notes nimber note number row.original.notes_grp man"
                );
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === row.sub_grp) {
                    sub.cy_amt +=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.net_adjusted_amount * -1
                        : rows.net_adjusted_amount;
                    sub.py_amt +=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.py * -1
                        : rows.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
            return;
          }
        });
      });
      dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
      dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });

      const fd = new FormData();
      fd.append("multiple_line_items", JSON.stringify(multiSelected));
      fd.append("fs_grp", line.fs_grp);
      fd.append("note_grp", sub.notes_grp);
      fd.append("sub_grp", row.sub_grp);
      fd.append("note_no", sub.notes_no);

      console.log(line.fs_grp, "lllllllllll");
      console.log(sub.notes_grp, "aaaaaaaaaa");
      console.log(row.sub_grp, "nnnnnnnnnnn");
      console.log(sub.notes_no, "qqqqqqqqq");

      axios
        .post(
          `/api/v1/conventional-mode/edit-multiple-line-items-grouping/${project_id}/${TB_ID}`,
          fd,
          { headers }
        )
        .then((res) => {
          console.log(
            res,
            "response  npotes notes resonse response response wolking hrere"
          );
          axios
            .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
              headers,
            })
            .then((response) => {
              multiSelected.map((i) => {
                console.log(i, "here buddy it should workk now");
              });
              console.log(
                response,
                "response  npotes notes resonse response response"
              );
              dispatch({
                type: actionTypes.SET_TABLE_DATA,
                payload: response.data.data.line_items,
              });
            })
            .catch((err) => {
              console.log(err.response);
            });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      console.log(row, sub, selected, "outside multi select");
      let arr = tableData;
      console.log(arr);
      const rows = arr[index];
      if (rows.sub_grp != "") {
        const grp = group;
        grp.grp.map((opt) => {
          // console.log(rows.fs_grp,'notes nimber note number row.original.notes_grp man')
          if (opt.fs_grp === rows.fs_grp) {
            // console.log(rows.fs_grp,'notes nimber note number row.original.notes_grp man')
            opt.notes_grp.map((notes, i) => {
              // console.log(notes,'notes nimber note number row.original.notes_grp man')
              // console.log(rows,'notes nimber note number row.original.notes_grp man')
              if (notes.notes_grp === rows.note_grp) {
                console.log(
                  notes,
                  "notes nimber note number row.original.notes_grp man"
                );
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === rows.sub_grp) {
                    sub.cy_amt -=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.net_adjusted_amount * -1
                        : rows.net_adjusted_amount;
                    sub.py_amt -=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.py * -1
                        : rows.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
          }
          if (line.fs_grp === opt.fs_grp) {
            console.log(line.fs_grp, "note number row.original.notes_grp man");
            opt.notes_grp.map((notes, i) => {
              // console.log(notes,'notes nimber note number row.original.notes_grp man')
              // console.log(row,'notes nimber note number row.original.notes_grp man')
              // console.log(rows,'notes nimber note number row.original.notes_grp man')
              if (notes.notes_grp === sub.notes_grp) {
                console.log(
                  notes,
                  "notes nimber note number row.original.notes_grp man"
                );
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === row.sub_grp) {
                    sub.cy_amt +=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.net_adjusted_amount * -1
                        : rows.net_adjusted_amount;
                    sub.py_amt +=
                      line.fs_grp === "Revenue" ||
                      line.fs_grp === "Shareholder Funds" ||
                      line.fs_grp === "Non Current Liabilities" ||
                      line.fs_grp === "Current Liabilities"
                        ? rows.py * -1
                        : rows.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
            return;
          }
        });
        console.log(grp, "grp here");
        dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
        dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });
        setGrouping(grp);
        arr[index].fs_grp = line.fs_grp;
        arr[index].note_grp = sub.notes_grp;
        arr[index].sub_grp = row.sub_grp;
        dispatch({ type: actionTypes.SET_TABLE_DATA, payload: arr });
        const content = {
          fs_grp: line.fs_grp,
          note_grp: sub.notes_grp,
          sub_grp: row.sub_grp,
        };
        console.log(content, "contentcontentcontentcontent");
        socket.emit("auto-save", {
          project_id: localStorage.getItem("project_id"),
          tb_id: TB_ID,
          lid: selected.lid,
          contents: content,
        });
        return;
      }
      const grp = group;
      console.log(grp, "grp before  here");
      grp.grp.map((opt) => {
        if (line.fs_grp === opt.fs_grp) {
          console.log(line.fs_grp, "note number row.original.notes_grp man");
          opt.notes_grp.map((notes, i) => {
            // console.log(notes,'notes nimber note number row.original.notes_grp man')
            // console.log(row,'notes nimber note number row.original.notes_grp man')
            // console.log(rows,'notes nimber note number row.original.notes_grp man')
            if (notes.notes_grp === sub.notes_grp) {
              console.log(
                notes,
                "notes nimber note number row.original.notes_grp man"
              );
              notes.sub_grp.map((sub) => {
                if (sub.sub_grp === row.sub_grp) {
                  sub.cy_amt +=
                    line.fs_grp === "Revenue" ||
                    line.fs_grp === "Shareholder Funds" ||
                    line.fs_grp === "Non Current Liabilities" ||
                    line.fs_grp === "Current Liabilities"
                      ? rows.net_adjusted_amount * -1
                      : rows.net_adjusted_amount;
                  sub.py_amt +=
                    line.fs_grp === "Revenue" ||
                    line.fs_grp === "Shareholder Funds" ||
                    line.fs_grp === "Non Current Liabilities" ||
                    line.fs_grp === "Current Liabilities"
                      ? rows.py * -1
                      : rows.py;
                  console.log(sub, "note number row.original.notes_grp man");
                }
              });
              console.log(notes, "note number row.original.notes_grp man");
            }
          });
          return;
        }
      });
      console.log(grp, "grp after  here");
      dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
      dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });
      setGrouping(grp);
      console.log(line);
      console.log(sub);
      console.log(row);
      arr[index].fs_grp = line.fs_grp;
      arr[index].note_grp = sub.notes_grp;
      arr[index].sub_grp = row.sub_grp;
      dispatch({ type: actionTypes.SET_TABLE_DATA, payload: arr });
      const content = {
        fs_grp: line.fs_grp,
        note_grp: sub.notes_grp,
        sub_grp: row.sub_grp,
      };

      console.log(content);
      socket.emit("auto-save", {
        project_id: localStorage.getItem("project_id"),
        tb_id: TB_ID,
        lid: selected.lid,
        contents: content,
      });
    }
  }

  socket.on("on-auto-save", (data) => {
    //To trigger in the Fetch API (Conventional Model)
    console.log("{User Logged IN 1}", data);
    // axios.get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`,{headers})
    // .then(response => {
    //     // console.log(response.data.data.line_items,'dat dat dat datd ddat dat dat dat dat dta dat d')
    //     // setData(response.data.data.line_items)
    // dispatch({type: actionTypes.SET_TABLE_DATA,payload:response.data})
    // })
  });

  function brackets(val) {
    if (val < 0) {
      return "(" + (-1 * val).toLocaleString("en-IN") + ")";
    }
    return val > 0 ? val.toLocaleString("en-IN") : val;
  }

  function handleAdd() {
    props.setAddGrouping(true);
    const content = {
      // fs_grp : line.fs_grp,
      // note_grp: sub.notes_grp
    };
    grouping.grp.map((first, i) => {
      // console.log(first,'first')
      first.notes_grp.map((sec, ix) => {
        // console.log(sec.notes_no,'sec fsirst')
        // console.log(sec,'sec fsirst')
        // console.log(noteNumber,'note nosec fsirst')
        if (sec.notes_no == noteNumber) {
          // console.log('equLal note nosec fsirst')
          content.note_grp = sec.notes_grp;
          content.fs_grp = first.fs_grp;
          return;
        }
      });
    });
    console.log(content);
    props.SetNewSg(content);
  }

  const sub_py = note.reduce(
    (totalpy, i) => -totalpy + Number(i.sub_grp.py_amt),
    0
  );
  const sub_cy = note.reduce(
    (totalCy, i) => -totalCy + Number(i.sub_grp.cy_amt),
    0
  );

  return (
    <div>
      <table>
        <thead>
          <tr style={{ backgroundColor: "#A2C0C2" }}>
            <th
              style={{
                width: "50%",
                height: "50px",
                textAlign: "left",
                paddingLeft: "2rem",
              }}
            >
              PARTICULAR
            </th>

            <th style={{ width: "25%" }}>
              As at {dateFormat(setprojectdata.current_year, "mmmm dS, yyyy")}
            </th>
            <th style={{ Width: "25%" }}>
              As at {dateFormat(setprojectdata.previous_year, "mmmm dS, yyyy")}
            </th>
            {/* <th style={{width:'25%',textAlign:'left',paddingLeft:'3rem'}}>Guidances</th> */}
          </tr>
        </thead>
        <tbody
          style={{
            background: `${theme ? "" : "#363535"}`,
            color: `${theme ? "" : "#fff"}`,
          }}
        >
          {grouping &&
            grouping.grp.map((line, ix) => {
              return line.notes_grp.map((sub, ix) => {
                if (sub.notes_no == noteNumber) {
                  console.log(sub, "hrsadse mapi");
                  const sub_py = sub.sub_grp.reduce(
                    (totalpy, i) => totalpy + Number(i.py_amt),
                    0
                  );
                  const sub_cy = sub.sub_grp.reduce(
                    (totalCy, i) => totalCy + Number(i.cy_amt),
                    0
                  );
                  console.log(sub, sub_py, sub_cy, "hrsadse mapi");
                  return (
                    <>
                      {sub.sub_grp.map((sub_grp, i) => {
                        if (highlight.row === ix && highlight.sub === i) {
                          console.log("matched ");
                        }
                        return (
                          <React.Fragment>
                            <tr
                              className={
                                highlight.row === ix && highlight.sub === i
                                  ? "dragtemplate"
                                  : ""
                              }
                              onDragEnter={() => {
                                setHighlight({ row: ix, sub: i });
                              }}
                              // onDragLeave={()=>{setHighlight({})}}
                              // onDragOver={()=>{setHighlight({})}}
                              onDrop={() => {
                                handleDrop(sub_grp, sub, line);
                              }}
                            >
                              <td
                                style={{
                                  width: "50%",
                                  textAlign: "left",
                                  paddingLeft: "1rem",
                                  color: "black",
                                }}
                              >
                                {sub_grp.sub_grp}
                              </td>
                              <td style={{ width: "25%" }}>
                                {brackets(
                                  sub_grp.cy_amt ? sub_grp.cy_amt : "-"
                                )}
                              </td>
                              <td style={{ width: "25%" }}>
                                {brackets(
                                  sub_grp.py_amt ? sub_grp.py_amt : "-"
                                )}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                      <React.Fragment>
                        {/* <tr>
                          <td
                            onClick={handleAdd}
                            style={{
                              width: "50%",
                              textAlign: "left",
                              fontWeight: "600",
                              paddingLeft: "1rem",
                              color: "var(--clr-accent)",
                              cursor: "pointer",
                            }}
                          >
                            + Add sub group
                          </td>
                          <td style={{ width: "25%" }}></td>
                          <td style={{ width: "25%" }}></td>
                        </tr> */}
                        <tr>
                          <td
                            // onClick={handleAdd}
                            style={total}
                          >
                            TOTAL
                          </td>
                          <td style={total}>
                            {brackets(sub_cy ? sub_cy : "-")}
                          </td>
                          <td style={total}>
                            {brackets(sub_py ? sub_py : "-")}
                          </td>
                        </tr>
                      </React.Fragment>
                    </>
                  );
                }
              });
            })}

          <tr>
            <td
              onClick={handleAdd}
              style={{
                width: "50%",
                textAlign: "left",
                fontWeight: "600",
                paddingLeft: "1rem",
                color: "var(--clr-accent)",
                cursor: "pointer",
              }}
            >
              + Add sub group
            </td>
            <td style={{ width: "25%" }}></td>
            <td style={{ width: "25%" }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Pattern1;
