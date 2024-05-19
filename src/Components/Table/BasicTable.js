import React, { useState, useEffect, useContext } from "react";
import { useTable, useRowSelect } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Form } from "react-bootstrap";
import Select from "react-select";
import MultiSelect from "../multiSelect/MultiSelect";
import MultiSelect2 from "../multiSelect/MultiSelect2";
import * as actionTypes from "../../redux/actionTypes";
// import {groupings} from '../BalanceSheet/mockGrouping'
import TABLE_MOCK from "./TABLE_MOCK.json";
import { column } from "./column";

import "./basicTable.css";
import { Checkbox } from "./Checkbox";
import { Spinner, DropdownButton, Dropdown } from "react-bootstrap";
import { socket } from "../../services/socket/socket";
import { ThemeContext } from "../../helper/DarkModeContext";

const BasicTable = (props) => {
  const dispatch = useDispatch();
  // MultiSelect()
  // const [state, setstate] = useState(props.tableData)
  const group = useSelector((initialState) => initialState.reducer.grouping);
  const filterData = useSelector((initialState) => initialState.reducer.filter);
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const [state, setstate] = useState([
    { column: "", select: "", change: "", startAmount: "", endAmount: "" },
  ]);
  const tableData = useSelector((state) => state.reducer.tableData);
  const [data, setData] = useState([]);
  const [random, setRandom] = useState("");
  const [filteredValue, setFilteredValue] = useState("");
  const [selected, setSelected] = useState("");
  const [groupings, setGrouping] = useState(props.otherGrouping);
  const [highlight, setHighlight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selecteddata, setSelectedData] = useState();
  const nf = new Intl.NumberFormat();
  const { theme } = useContext(ThemeContext);

  const [columnHeader, setColumnHeader] = useState([]);

  const project_id = localStorage.getItem("project_id");
  const auth = localStorage.getItem("auth_token");
  let headers = {
    "x-auth-token": auth,
    // 'Content-Type' : 'application/json'
  };

  useEffect(() => {
    setData(tableData);
    setGrouping(group);
    setRandom(Math.random());
  }, [group]);

  useEffect(() => {
    setLoading(loading);
  }, [props.loading]);

  useEffect(() => {
    setGrouping(group);
    setLoading(true);
    dispatch({ type: actionTypes.SET_FILTER, payload: state });
    axios
      .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, { headers })
      .then((response) => {
        console.log(
          response.data,
          "dat dat dat datd ddat dat dat dat dat dta dat d"
        );
        setData(response.data.data.line_items);
        dispatch({
          type: actionTypes.SET_TABLE_DATA,
          payload: response.data.data.line_items,
        });
        // props.setLoading(false)
        props.setTotalRow(response.data.data.line_items);
        setLoading(false);
      });

    // if(column.length > 0){
    //   column.splice(2, 0,
    //     {
    //       Header: 'AAA',
    //       accessor : 'aaa'
    //   })
    //   console.log("column---",column)
    //   setTableHeader(column)
    // }

    return () => {
      const fd = new FormData();
      // fd.append('disclosures',field.disclosures);
      fd.append("grp", JSON.stringify(group.grp));
      axios
        .post(`/api/v1/grouping/save-grp/${project_id}`, fd, { headers })
        .then((res) => {
          console.log(res, "res");
        })
        .catch((err) => {
          console.log(err, "err");
          console.log(err.response, "err");
        });
    };
  }, []);
  const handleKeyDown = (event) => {
    console.log(event.key, "event.key presssed");
    if (event.key === "ArrowRight") {
      event.nextSibling.focus();
      console.log(event, "ArrowRight enter presssed");
      if (event.nextSibling) {
        event.nextSibling.focus();
      }
    }
    if (event.key === "Enter") {
      console.log("enter presssed");
    }
  };

  function brackets(val) {
    if (val < 0) {
      return "(" + (-1 * val).toLocaleString("en-IN") + ")";
    }
    return val.toLocaleString("en-IN");
  }

  // console.log(props.hideItems, "Hide Show");
  // console.log(props.hiddenFilter, "Hide Show Data");

  var new_data =
    filterData.length > 0 && !(filterData[0].column === "")
      ? props.totalFilter
      : props.hideItems
      ? props.hiddenFilter[0]
      : data;

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      // console.log(resolvedRef);

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

  let total = 0;
  let finaldata = 0;
  const lenghtdata = data.length;
  const selectedrows = (data) => {
    // console.log(data);
    // setSelectedData(data);
    total = total + 1;
    finaldata = (total / lenghtdata) * 100;
    props.getdata(Math.round(finaldata));
    // dispatch({ type: actionTypes.SET_PROGRESSBAR_DATA, payload: finaldata });
  };

  useEffect(() => {
    getNewColumnUpdate();
  }, []);

  const mergeInPlace = (a, b, i = 0) => {
    return a.slice(0, i).concat(b, a.slice(i));
  };
  const getNewColumnUpdate = () => {
    console.log("-------getNewColumnUpdate API call -----");
    const auth = localStorage.getItem("auth_token");
    const tempID = JSON.parse(localStorage.getItem("state"))?.reducer?.tb_id;
    console.log("tempID----", tempID);
    let headers = {
      "x-auth-token": auth,
      "Content-Type": "application/json",
    };
    const project_id = localStorage.getItem("project_id");

    axios
      .get(`api/v1/tb-mapping/upload-column-name/${project_id}/${tempID}`, {
        headers,
      })
      .then((response) => {
        console.log("get updated column response---------", response);
        if (response.status === 200 && response.data?.success === true) {
          // console.log("updated column response---------",response?.data?.column?.column);
          let a = [...column];
          let b = response?.data?.column?.column
            ? response?.data?.column?.column
            : [];

          let merge = mergeInPlace(a, b, 3);
          console.log("data----", { a: a, b: b });
          console.log("merge----", merge);
          setColumnHeader(merge);
        }
      })
      .catch((error) => {
        console.log("getNewColumnUpdate error ---", error);
      });
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      // columns: column ,
      columns: columnHeader,
      // data: TABLE_MOCK
      data: new_data,
      // data: props.tableData
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // console.log("hhhhhhhhhhhh",{
  //   getTableProps:getTableProps,
  //   getTableBodyProps:getTableBodyProps,
  //   headerGroups:headerGroups,
  //   rows:rows,
  //   prepareRow:prepareRow,
  //   selectedFlatRows:selectedFlatRows
  // })

  useEffect(() => {
    // console.log(selectedFlatRows,'selected rows changed')
    // props.setSelect(selectedFlatRows,'updated')

    const rows = selectedFlatRows.map((val) => {
      return val.original;
    });
    props.setSelect(rows);
    // rows.push({
    //   adjusted_amount:1,
    //   branch:"it",
    //   cy: 1,
    //   discloures: false,
    //   fs_grp:"aaaaaaaaaa",
    //   isAdjusted: false,
    //   ledger_code:"1",
    //   ledger_name:"aaaaaaaaaaaa",
    //   lid:"aaaaaaaaaaaaaaaaa",
    //   net_adjusted_amount:-157230,
    //   note_grp:"aaaaaaaaaaaaa",
    //   note_no:"13(c)",
    //   py:-78615,
    //   sub_grp:"aaaaaaaaaaaaa",
    //   tb_id:"63b7c9f5a0e1637af467e39b"
    // })
    dispatch({ type: actionTypes.SET_SELECTEDROWS, payload: rows });

    // MultiSelect()
  }, [selectedFlatRows]);
  // console.log(MultiSelect())
  function handleChanges(e, i, row, field) {
    console.log(i, "i");
    console.log(e, "e");
    console.log(e.target, "e");
    console.log(e.target.textContent, "e");
    console.log(e.target.innerText);
    console.log(row.original, "row row row row");
    console.log(field, "field field field");
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");

    let headers = {
      "x-auth-token": auth,
      // 'Content-Type' : 'application/json'
    };
    let fs = "Financial Assets";

    console.log("ppppppppp");
    const TB_ID = row.original.tb_id;
    if (
      e.target.innerText.includes(`...`) ||
      e.target.innerText === "Select FS grp" ||
      e.target.innerText === "Select Note grp" ||
      e.target.innerText === "Select Sub grp"
    ) {
      // console.log(e.target.innerText,'target text')
      return;
    }
    const content = {};
    if (field === "fs_grp") {
      if (row.original.fs_grp === e.target.innerText) {
        return;
      }

      console.log("ksksk");

      let index = data.findIndex((x) => x.lid === row.original.lid);
      console.log("index", index);
      let arr = data;
      // arr[index].fs_grp = e.target.innerText
      arr[index].fs_grp = e.target.innerText;
      arr[index].note_grp = "";
      arr[index].sub_grp = "";
      console.log(arr, "ar here");
      setData(arr);
      setRandom(Math.random());
      content.fs_grp = e.target.innerText;
      content.note_grp = "";
      content.sub_grp = "";
      // return
      if (row.original.sub_grp != "") {
        console.log("habibi this is already there");
        console.log(row.original, "habibi this is already there");
        const grp = group;
        grp.grp.map((opt) => {
          if (row.original.fs_grp === opt.fs_grp) {
            opt.notes_grp.map((notes, i) => {
              if (notes.notes_grp === row.original.note_grp) {
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === row.original.sub_grp) {
                    sub.cy_amt -=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.cy * -1
                        : row.original.cy;
                    sub.py_amt -=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.py * -1
                        : row.original.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
          }
        });
        dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
        dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });
      }
    }
    if (field === "note_grp") {
      if (row.original.note_grp === e.target.innerText) {
        return;
      }
      let index = data.findIndex((x) => x.lid === row.original.lid);
      console.log("index", index);
      let arr = data;
      arr[index].note_grp = e.target.innerText;
      arr[index].sub_grp = "";
      console.log(arr, "ar here");
      content.note_grp = e.target.innerText;
      content.sub_grp = "";
      content.note_no = "";
      groupings.grp.map((opt) => {
        if (row.original.fs_grp === opt.fs_grp) {
          opt.notes_grp.map((notes, i) => {
            if (notes.notes_grp === e.target.innerText) {
              // console.log(e.target.innerText,'e.target.innerText row.original.note_grp')
              console.log(notes.notes_no, "note number man");
              console.log(notes, "note number man");
              // content.notes_no = notes.notes_no
              content.note_no = notes.notes_no;
              arr[index].note_no = notes.notes_no;
            }
          });
        }
      });
      setData(arr);
      props.setTotalRow(arr);
      setRandom(Math.random());
      console.log(content, "contentcontentcontentcontent");
      if (row.original.sub_grp != "") {
        const grp = group;
        grp.grp.map((opt) => {
          if (row.original.fs_grp === opt.fs_grp) {
            opt.notes_grp.map((notes, i) => {
              if (notes.notes_grp === e.target.innerText) {
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === row.original.sub_grp) {
                    sub.cy_amt -=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.cy * -1
                        : row.original.cy;
                    sub.py_amt -=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.py * -1
                        : row.original.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
          }
        });
        dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
        dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });
      }
      // return
    }
    if (field === "sub_grp") {
      if (e.target.innerText === "+ add options") {
        props.setAddGrouping(true);
        props.SetNewSg(row.original);
        return;
      }
      if (row.original.sub_grp != "") {
        // console.log('habibi this is already there')
        // console.log(row.original,'habibi this is already there')
        const grp = group;
        grp.grp.map((opt) => {
          if (row.original.fs_grp === opt.fs_grp) {
            opt.notes_grp.map((notes, i) => {
              // console.log(notes,'note number man')
              // console.log(row.original.note_grp,'note number man')
              if (notes.notes_grp === row.original.note_grp) {
                notes.sub_grp.map((sub) => {
                  if (sub.sub_grp === row.original.sub_grp) {
                    sub.cy_amt -=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.cy * -1
                        : row.original.cy;
                    sub.py_amt -=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.py * -1
                        : row.original.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                  if (sub.sub_grp === e.target.innerText) {
                    sub.cy_amt +=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.cy * -1
                        : row.original.cy;
                    sub.py_amt +=
                      row.original.fs_grp === "Revenue" ||
                      row.original.fs_grp === "Shareholder Funds" ||
                      row.original.fs_grp === "Non Current Liabilities" ||
                      row.original.fs_grp === "Current Liabilities"
                        ? row.original.py * -1
                        : row.original.py;
                    console.log(sub, "note number row.original.notes_grp man");
                  }
                });
                console.log(notes, "note number row.original.notes_grp man");
              }
            });
          }
        });
        dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
        dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });
        content.sub_grp = e.target.innerText;
        let index = data.findIndex((x) => x.lid === row.original.lid);
        console.log("index", index);
        let arr = data;
        arr[index].sub_grp = e.target.innerText;
        console.log(arr, "ar here");
        setData(arr);
        props.setTotalRow(arr);
        setRandom(Math.random());
        return;
      }
      // content.py =  1212125
      const grp = group;
      grp.grp.map((opt) => {
        if (row.original.fs_grp === opt.fs_grp) {
          opt.notes_grp.map((notes, i) => {
            console.log(notes, "note number man");
            console.log(row.original.note_grp, "note number man");
            if (notes.notes_grp === row.original.note_grp) {
              notes.sub_grp.map((sub) => {
                if (sub.sub_grp === e.target.innerText) {
                  sub.cy_amt +=
                    row.original.fs_grp === "Revenue" ||
                    row.original.fs_grp === "Shareholder Funds" ||
                    row.original.fs_grp === "Non Current Liabilities" ||
                    row.original.fs_grp === "Current Liabilities"
                      ? row.original.cy * -1
                      : row.original.cy;
                  sub.py_amt +=
                    row.original.fs_grp === "Revenue" ||
                    row.original.fs_grp === "Shareholder Funds" ||
                    row.original.fs_grp === "Non Current Liabilities" ||
                    row.original.fs_grp === "Current Liabilities"
                      ? row.original.py * -1
                      : row.original.py;
                }
              });
              console.log(notes, "note number row.original.notes_grp man");
            }
          });
        }
      });
      console.log(
        grp,
        "gtp gtpgtpgtgptgptgp note number row.original.notes_grp man"
      );
      dispatch({ type: actionTypes.SET_EDITSUBGROUPING, payload: grp });
      dispatch({ type: actionTypes.SET_RENDERNOW, payload: Math.random() });
      content.sub_grp = e.target.innerText;
      let index = data.findIndex((x) => x.lid === row.original.lid);
      console.log("index", index);
      let arr = data;
      arr[index].sub_grp = e.target.innerText;
      console.log(arr, "ar here");
      setData(arr);
      props.setTotalRow(arr);

      setRandom(Math.random());
      props.setUpdateTabs(true);
    }
    console.log(content, "content ra");

    socket.emit("auto-save", {
      project_id: localStorage.getItem("project_id"),
      tb_id: row.original.tb_id,
      lid: row.original.lid,
      contents: content,
    });

    // {
    // //   ledger_code: "6969",
    // //   adjusted_amount: "2400",
    //     fs_grp: fs ,
    // //   note_grp: "asset",
    // //   sub_grp: "Revenue",
    // //   ledger_name: "heya_mofo",
    // //   branch: "Chennai",
    // //   cy: "2021",
    // //   py: "2020",
    // },
  }
  socket.on("on-auto-save", (data) => {
    console.log("{User Logged IN 1}", data);
  });

  function handleDrag(cell) {
    setHighlight(true);
    console.log(cell.row.original, "rowrowrow  ");
    setSelected(cell.row.original.lid);
    dispatch({ type: actionTypes.SET_SELECTED, payload: cell.row.original });
  }

  if (loading) {
    return (
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
    );
  }

  // useEffect(() => {
  //   let hideData = ""
  //   let filtredData="";
  //   if(props.hideItems){
  //     hideData = tableData
  //     console.log("no");
  //     props.SetHideItems(false)
  //   }else{
  //     filtredData = tableData.filter((row)=>{
  //       console.log(row);
  //       if(row.sub_grp === ""){
  //         return {row};
  //       }
  //     })
  //     console.log('yes');
  //     props.SetHideItems(true)
  //   }
  //   hideData = filtredData
  //   console.log(filtredData);

  // }, [tableData,props.hideItems]);

  return (
    <div className={props.template ? "conventionalTab" : "conventionalTable"}>
      <MultiSelect
        setAddGrouping={props.setAddGrouping}
        SetNewSg={props.SetNewSg}
        multiOptions={props.multiOptions}
        fetchConvential={props.fetchConvential}
      />
      {/* <MultiSelect2/> */}
      <table
        {...getTableProps()}
        style={{
          background: `${theme ? "" : "#363535"}`,
          color: `${theme ? "" : "#fff"}`,
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  style={{ textTransform: "uppercase" }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, ind) => {
            // console.log(row, "row here maer");
            // console.log(row.original.sub_grp);

            if (row.original.sub_grp !== "") {
              selectedrows(row.original.sub_grp);
            }

            // console.log(row, "row here maer");
            prepareRow(row);
            return (
              <tr
                onClick={() => prepareRow(row)}
                className={
                  row.isSelected
                    ? "highlightedRow"
                    : row.original.sub_grp
                    ? "selectedRow"
                    : null
                }
                {...row.getRowProps()}
              >
                {row.cells.map((cell, i) => {
                  // if(cell.column.Header == 'FS GROUPING'){
                  //     return <td {...cell.getCellProps({
                  //         // style: {
                  //         //   minWidth: cell.column.minWidth,
                  //         //   width: cell.column.width,
                  //         // },
                  //       })} className='dropMapping'>
                  //       </td>
                  //     }

                  if (cell.column.Header === "FINAL AMT") {
                    if (cell.row.original.isAdjusted) {
                      return (
                        <td
                          draggable="true"
                          onDragStart={() => {
                            handleDrag(cell);
                          }}
                          onDragEnd={() => {
                            setHighlight(false);
                          }}
                          className={
                            highlight && cell.row.original.lid === selected
                              ? "highlighted"
                              : null
                          }
                          style={{ textAlign: "right", padding: "10px" }}
                        >
                          {brackets(
                            Number(cell.row.original.cy) +
                              Number(cell.row.original.adjusted_amount)
                          )}
                        </td>
                      );
                    }
                    // console.log(cell.row.original.isAdjusted,'cellcellcellcellcellcell')
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        style={{ textAlign: "right", padding: "10px" }}
                      >
                        <div
                          title={`${brackets(
                            Number(cell.row.original.cy) +
                              Number(cell.row.original.adjusted_amount)
                          )}`}
                          class="visible"
                        >
                          {brackets(
                            Number(cell.row.original.cy) +
                              Number(cell.row.original.adjusted_amount)
                          )}
                        </div>
                      </td>
                    );
                  }

                  if (cell.column.Header === "BRANCH") {
                    if (cell.row.original.branch == null) {
                      return (
                        <td
                          draggable="true"
                          onDragStart={() => {
                            handleDrag(cell);
                          }}
                          onDragEnd={() => {
                            setHighlight(false);
                          }}
                          className={
                            highlight && cell.row.original.lid === selected
                              ? "highlighted"
                              : null
                          }
                          style={{ textAlign: "center" }}
                        >
                          -
                        </td>
                      );
                    }
                    // console.log(cell.row.original.isAdjusted,'cellcellcellcellcellcell')S
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        {...cell.getCellProps()}
                        style={{ textAlign: "center" }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                  if (cell.column.Header === "ADJUSTED AMT") {
                    if (cell.row.original.adjusted_amount === 0) {
                      return (
                        <td
                          draggable="true"
                          onDragStart={() => {
                            handleDrag(cell);
                          }}
                          onDragEnd={() => {
                            setHighlight(false);
                          }}
                          className={
                            highlight && cell.row.original.lid === selected
                              ? "highlighted"
                              : null
                          }
                          style={{ textAlign: "right", padding: "10px" }}
                        >
                          -
                        </td>
                      );
                    }
                    // console.log(cell.row.original.isAdjusted,'cellcellcellcellcellcell')S
                    // return <td style={{textAlign:'right',padding:'10px'}}>nope</td>
                    // return <td style={{textAlign:'right',padding:'10px'}}>{cell.row.original.adjusted_amount.toLocaleString('en-IN')}</td>
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        style={{ textAlign: "right", padding: "10px" }}
                      >
                        {cell.row.original.adjusted_amount}
                      </td>
                    );
                  }
                  if (cell.column.Header === "CURRENT YEAR") {
                    // console.log(cell.getCellProps(),'cellcellcellcellcellcell')
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        {...cell.getCellProps()}
                        style={{ textAlign: "right", paddingRight: "10px" }}
                      >
                        {cell.row.original.cy
                          ? brackets(cell.row.original.cy)
                          : 0}
                      </td>
                    );
                  }
                  if (cell.column.Header === "PREVIOUS YEAR") {
                    // console.log(cell.getCellProps(),'cellcellcellcellcellcell')
                    // return <td {...cell.getCellProps()} style={{textAlign:'right',paddingRight:'10px'}}>{nf.format(cell.row.original.py)}</td>
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        {...cell.getCellProps()}
                        style={{ textAlign: "right", paddingRight: "10px" }}
                      >
                        {cell.row.original.py
                          ? brackets(cell.row.original.py)
                          : 0}
                      </td>
                    );
                  }
                  if (cell.column.Header === "LEDGER CODE") {
                    // console.log(cell, "cellcellcellcellcellcell");
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        {...cell.getCellProps()}
                        style={{ textAlign: "center" }}
                      >
                        {cell.row.original.ledger_code}
                      </td>
                    );
                  }
                  if (cell.column.Header === "LEDGER NAME") {
                    return (
                      <td
                        draggable="true"
                        onDragStart={() => {
                          handleDrag(cell);
                        }}
                        onDragEnd={() => {
                          setHighlight(false);
                        }}
                        {...cell.getCellProps()}
                        className={
                          highlight && cell.row.original.lid === selected
                            ? "highlighted"
                            : null
                        }
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          cursor: "pointer",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                  if (cell.column.Header === "FS GROUPING") {
                    return (
                      <td
                        onClick={(e) => e.preventDefault}
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                        onKeyDown={(e) => {
                          handleKeyDown(e.target);
                        }}
                        className="dropMapping"
                      >
                        <div title={`${row.original.fs_grp}`} class="visible">
                          <DropdownButton
                            id="dropdown-item-button"
                            //   class="text-truncate"
                            className="drop-btn"
                            //   value={row.original.fs_grp}
                            onClick={(e) =>
                              handleChanges(e, ind, row, "fs_grp")
                            }
                            title={
                              row.original.fs_grp
                                ? `${row.original.fs_grp.slice(0, 16)}` + `...`
                                : "Select FS grp"
                            }
                          >
                            {groupings.grp.map((opt, ix) => {
                              // console.log(Name,'inside ledger code')
                              // console.log(Name.LedgerCode,'inledger code')
                              return (
                                <Dropdown.Item
                                  // as="button"
                                  // class="text-truncate"
                                  key={ix}
                                >
                                  {opt.fs_grp}
                                </Dropdown.Item>
                                // <option key={ix}>{opt.fs_grp}</option>
                              );
                            })}
                          </DropdownButton>
                        </div>
                      </td>
                    );
                  }
                  if (cell.column.Header === "NOTES GROUPING") {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                        className="dropMapping"
                      >
                        {/* <Form.Control size="lg"  as='select' value={row.note_grp} onChange={(e) => handleChange(e, ind, row,'note_grp')} >
                                         <option key = 'blankChoice' hidden value>{row.original.note_grp ?  row.original.note_grp: 'Select note grp'}</option>
                                         { groupings.grp.map((opt)=>{
                                            // console.log(row.original.fs_grp, opt.fs_grp, 'current row - current row option')
                                            if(row.original.fs_grp === opt.fs_grp){
                                                // console.log(opt.notes_grp,'notessssssssssssssssssssssssssssssss')
                                                // return(
                                                //     <option>{opt.fs_grp}</option>
                                                    
                                                //     )

                                                // console.log('matched values',opt.notes_grp)
                                                return opt.notes_grp.map((notes,i)=>{
                                                    // console.log(notes.notes_grp,'mapping notesgrouping')
                                                    return (<option key={i}>{notes.notes_grp}</option>)
                                                    // return (<option>hey</option>)
                                                    
                                                })
                                            }
                                        })}
                                    </Form.Control> */}
                        <div title={`${row.original.note_grp}`} class="visible">
                          <DropdownButton
                            //   value={row.note_grp}
                            id="dropdown-item-button"
                            onClick={(e) =>
                              handleChanges(e, ind, row, "note_grp")
                            }
                            title={
                              row.original.note_grp
                                ? `${row.original.note_grp.slice(0, 16)}...`
                                : "Select Note grp"
                            }
                          >
                            {groupings.grp.map((opt, ix) => {
                              if (row.original.fs_grp === opt.fs_grp) {
                                // console.log(opt.notes_grp,'notessssssssssssssssssssssssssssssss')
                                // return(
                                //     <option>{opt.fs_grp}</option>
                                //     )
                                // console.log('matched values',opt.notes_grp)
                                return opt.notes_grp.map((notes, i) => {
                                  // console.log(notes.notes_grp,'mapping notesgrouping')
                                  return (
                                    <Dropdown.Item as="button" key={ix}>
                                      {notes.notes_grp}
                                    </Dropdown.Item>
                                    // <option key={i}>{notes.notes_grp}</option>
                                  );
                                  // return (<option>hey</option>)
                                });
                              }
                              // console.log(Name,'inside ledger code')
                              // console.log(Name.LedgerCode,'inledger code')
                              // return(

                              // )
                            })}
                            {/* <Dropdown.Item 
                                                        // as="button"
                                                        // class="text-truncate" 
                                                        style={{borderTop:'1px solid grey'}}
                                                        ><p 
                                                        style={{fontSize:'1.1rem',fontSize:'500',padding:'0',margin:'5px',color:'var(--clr-accent)'}}
                                                        >+ add options</p></Dropdown.Item> */}
                          </DropdownButton>
                        </div>
                      </td>
                    );
                  }
                  if (cell.column.Header === "SUB GROUPING") {
                    return (
                      <td
                        {...cell.getCellProps({
                          style: {
                            minWidth: cell.column.minWidth,
                            width: cell.column.width,
                          },
                        })}
                        className="dropMapping"
                      >
                        <div title={`${row.original.sub_grp}`} class="visible">
                          {/* <Form.Control size="lg"  as='select' value={row.sub_grp} onChange={(e) => handleChange(e,ind, row,'sub_grp')} >
                                                    <option key = 'blankChoice' hidden value>{row.original.sub_grp ?  row.original.sub_grp: 'Select sub grp'}</option>
                                                    { groupings.grp.map((opt)=>{
                                                        // console.log(row.original.fs_grp, opt.fs_grp, 'current row - current row option')
                                                    if(row.original.fs_grp === opt.fs_grp){

                                                        return opt.notes_grp.map((notes)=>{
                                                            // console.log(notes.notes_grp,'mapping notesgrouping')
                                                            if(notes.notes_grp === row.original.note_grp){
                                                                return notes.sub_grp.map((sub,ix) =>{
                                                                    // console.log(row.original.note_grp,'row notes group')
                                                                    // console.log(notes.notes_grp,'something')
                                                                    // console.log(sub.sub_grp,'row notes group')
                                                                    // return(<option key={ix}>{sub.sub_grp}</option>)
                                                                    // if
                                                                    return(<option key={ix}>{sub.sub_grp}</option>)
                                                                })
                                                                
                                                            }
                                                            
                                                            
                                                            // return (<option>{notes.notes_grp}</option>)
                                                            // // return (<option>hey</option>)
                                                            
                                                        }
                                                        )
                                                    }
                                                    })}
                                                </Form.Control> */}
                          <DropdownButton
                            //   value={row.note_grp}
                            id="dropdown-item-button"
                            onClick={(e) =>
                              handleChanges(e, ind, row, "sub_grp")
                            }
                            title={
                              row.original.sub_grp
                                ? `${row.original.sub_grp.slice(0, 16)}` + `...`
                                : "Select Sub grp"
                            }
                          >
                            {groupings.grp.map((opt, ix) => {
                              if (row.original.fs_grp === opt.fs_grp) {
                                return opt.notes_grp.map((notes) => {
                                  if (
                                    notes.notes_grp === row.original.note_grp
                                  ) {
                                    return notes.sub_grp.map((sub, ix) => {
                                      return (
                                        <Dropdown.Item as="button" key={ix}>
                                          {sub.sub_grp}
                                        </Dropdown.Item>
                                      );
                                    });
                                  }
                                });
                              }
                            })}
                            {row.original.note_grp != "" && (
                              <Dropdown.Item
                                // as="button"
                                // class="text-truncate"
                                style={{ borderTop: "1px solid grey" }}
                              >
                                <p
                                  style={{
                                    fontSize: "1.1rem",
                                    fontSize: "500",
                                    padding: "0",
                                    margin: "5px",
                                    color: "var(--clr-accent)",
                                  }}
                                >
                                  + add options
                                </p>
                              </Dropdown.Item>
                            )}
                          </DropdownButton>
                        </div>
                      </td>
                    );
                  }
                  // console.log(cell.column.Header,'header');

                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{ textAlign: "right", paddingRight: "10px" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* <pre>
        <code>
          {JSON.stringify(
            {
                selectedFlatRows : selectedFlatRows.map((row) => row.original),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </div>
  );
};

export default BasicTable;
