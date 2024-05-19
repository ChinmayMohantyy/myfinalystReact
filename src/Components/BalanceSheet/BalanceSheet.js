/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import axios from "axios";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import BalaceIcon from "../../Components/BalanceSheet/balaceicon";
import "./balanceSheet.css";
import { groupings } from "./mockGrouping";
import dateFormat from "dateformat";
import ProgressBar from "@ramonak/react-progress-bar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// console.log(groupings, 'hey hey hey')

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
  // marginTop:'2rem'
  // height:'30px'
};
const level2 = {
  lineHeight: "20px",
  fontSize: "16px",
  fontWeight: "500",
  // color:'green'
};
const level4 = {
  lineHeight: "20px",
  fontSize: "16px",
  fontWeight: "400",
  // marginLeft:'100px'
  // color:'green'
};
const Note = {
  lineHeight: "20px",
  fontSize: "16px",
  fontWeight: "5   00",
  color: "var(--clr-accent)",
  cursor: "pointer",
};

const BalanceSheet = (props) => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState(props.rows);
  const [no, setNo] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(props.rows, "hey hey hsssey hey");
  const fsRows = Object.keys(rows);
  console.log(fsRows, "hey hey hey hey");
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const TABLE_DATA = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const [datarows, selectedrows] = useState([]);
  const [lengthdata, setLengh] = useState("");
  const [iconlength, setIconLength] = useState([]);
  const eventDAta = useSelector(
    (initialState) => initialState.reducer.eventData
  );
  const note4 = useSelector((initialState) => initialState.reducer.note);
  const note5 = useSelector((initialState) => initialState.reducerNotes.note5);
  // const [progresbar, setProgresbar] = useState();
  const [fotterdata, setFooterData] = useState("");

  console.log(eventDAta, "eventDAta.length......");
  console.log(lengthdata, "lengthdata");
  const finalData = Math.round((iconlength.length / lengthdata) * 100);
  // let total = 0;
  // let finaldata = 0;
  // // const lenghtdata = data.length;
  // const selectedrows=(docs)=>{
  //   console.log(docs,"chinmnmmmm");
  // //   console.log(data);
  // //     // setSelectedData(data);
  //     total = total + 1;
  //     // finaldata = total/lenghtdata * 100;
  // }
  console.log(props.NoteNumber, "heheeeheheheheh eheheh ");
  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };

    axios
      .get(`/api/v1/bs/generate-bs/${project_id}/${TB_ID}`, { headers })
      .then((response) => {
        // setLoading(false)
        console.log(response.data.balance_sheet, "response response");
        setRows(response.data.balance_sheet);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
    getFooter();
  }, []);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("hey ");
    let noArr = [];

    fsRows.length > 0 &&
      fsRows.map((row, i) => {
        console.log(row.length, "sssssssssssssssssssssaaaaaaaaaaaaa");
        setLengh(row.length);
        rows[row].length > 0 &&
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
    props.setNoteNum2(noArr.length);
    console.log(noArr.length, "noArr.length noArr.length noArr.length");
    tabledata();
    // fetchData();
  }, [rows]);

  function handleClick(key) {
    // props.setTempValue(5)
    console.log(props, "clicked balance shet");
    console.log(key, "key key key key clicked balance shet");
    props.setKey("Notes");
    // props.setNote(key.notes_no)
    props.setNoteName(key);
    dispatch({ type: actionTypes.SET_BLNO, payload: key });
    props.scrollToTop();
    if (key === 1) {
      window.scrollTo(5000, 50000);
      // window.scrollTo({
      //     top: 1000,
      //     behavior: "smooth"
      //   });
    }
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

  function formatToUnits(number, precision) {
    const abbrev = ["", "k", "m", "b", "t"];
    const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
    const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
    const suffix = abbrev[order];
    return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
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
    const total = parseFloat(val / object.value).toFixed(float_value);

    if (val < 0) {
      const negNum = -1 * total;
      console.log(object, "object hered object");

      return "(" + negNum.toLocaleString("en-IN") + `${object.suffix}` + ")";
    }
    return total.toLocaleString("en-IN") + `${object.suffix}`;
  }

  function tabledata() {
    const rows_data = TABLE_DATA.map((val) => {
      console.log(val.sub_grp, "aaaaaaaaaaaaaa");
      if (val.sub_grp !== "") {
        selectedrows(val.sub_grp);
      }
    });
  }

  console.log(rows, "sadadasadada");

  const findNotes = (value) => {
    const dataInput = iconlength.find((x) => x.note === value);

    console.log(dataInput, "ssssssssssssssssssss");

    if (dataInput) {
      return true;
    } else {
      return false;
    }
  };

  function handleFooter(e, editor) {
    const data = editor.getData();
    console.log(data);
    saveFooter(data);
  }

  const saveFooter = (val) => {
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };
    let data = {
      name: "balancesheet",
      footer_name: val,
    };
    axios
      .post(`/api/v1/pnl/save-footer/${project_id}`, data, { headers })
      .then((response) => {
        console.log(response.data, "KKK");
        // setRows(response.data.balance_sheet);
        getFooter();
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  const getFooter = () => {
    const auth = localStorage.getItem("auth_token");
    const project_id = localStorage.getItem("project_id");
    let headers = {
      "x-auth-token": auth,
    };
    axios
      .get(`/api/v1/pnl/get-footer/${project_id}`, { headers })
      .then((response) => {
        console.log(response.data, "KKK");
        // setRows(response.data.balance_sheet);
        console.log(
          response.data.getFooter[0].footer_balancesheet.footer_name,
          "11111111111111111111111111"
        );

        if (
          response.data.getFooter[0].footer_balancesheet.name === "balancesheet"
        ) {
          setFooterData(
            response.data.getFooter[0].footer_balancesheet.footer_name
          );
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <>
      <motion.div
        className="tableSheet"
        initial={{ y: "-5vh" }}
        animate={{ y: 0 }}
      >
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
              <th style={{ minWidth: "200px", width: "20vw" }}></th>
            </tr>
          </thead>
          <tbody>
            {/* {loading && <div style={{height:'80vh',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Spinner animation="grow" size="sm" />
                            <Spinner animation="grow" style={{margin:'1rem'}}/>
                            <Spinner animation="grow" size="sm" />
                </div>} */}
            {fsRows.length > 0 &&
              fsRows.map((row, i) => {
                console.log(row, "Row data");
                const cy = rows[row].reduce((totalCy, i) => totalCy + i.cy, 0);
                const py = rows[row].reduce((totalPy, i) => totalPy + i.py, 0);
                console.log(rows, "Row d ata");
                const cy_0 = rows["Non Current Assets"].reduce(
                  (totalCy, i) => totalCy + i.cy,
                  0
                );
                const py_0 = rows["Non Current Assets"].reduce(
                  (totalPy, i) => totalPy + i.py,
                  0
                );
                const cy_1 = rows["Current Assets"].reduce(
                  (totalCy, i) => totalCy + i.cy,
                  0
                );
                const py_1 = rows["Current Assets"].reduce(
                  (totalPy, i) => totalPy + i.py,
                  0
                );
                const total_assets_py = py_0 + py_1;
                const total_assets_cy = cy_1 + cy_0;
                const cy_3 = rows["Non Current Liabilities"].reduce(
                  (totalCy, i) => totalCy + i.cy,
                  0
                );
                const py_3 = rows["Non Current Liabilities"].reduce(
                  (totalPy, i) => totalPy + i.py,
                  0
                );
                const cy_4 = rows["Current Liabilities"].reduce(
                  (totalCy, i) => totalCy + i.cy,
                  0
                );
                const py_4 = rows["Current Liabilities"].reduce(
                  (totalPy, i) => totalPy + i.py,
                  0
                );
                console.log(py_0, cy_0, py_1, cy_1, "totals");
                const total_liabilities_py = py_3 + py_4;
                const total_liabilities_cy = cy_3 + cy_4;

                const index = i + 1;
                return (
                  <>
                    <tr key={i}>
                      <td style={level1}>{row}</td>
                      {/* <td style={level1}>{i+1}.{row}</td> */}
                      <td></td>
                      <td style={{ fontWeight: "600" }}>
                        {/* {cy ? (brackets(cy)):'-'} */}
                      </td>
                      <td style={{ fontWeight: "600" }}>
                        {/* {py ? (brackets(py)):'-'} */}
                      </td>
                      <td></td>
                    </tr>
                    {rows[row].length > 0 &&
                      rows[row].map((line, ix) => {
                        // if(no.length > 0 && no.some(user => user.notes_grp === line.notes_grp)){
                        //     const index =  no.findIndex(x => x.notes_grp === line.notes_grp)
                        const index = no.findIndex(
                          (x) =>
                            x.notes_grp.toLowerCase() ===
                            line.notes_grp.toLowerCase()
                        );
                        console.log(i, "iiiiiiiiiiiiiiiiiiiiiiiii");
                        console.log(ix, "ixxxxxxxxxxxxxxxxxxxxx");
                        console.log(line.notes_grp, "llllllineeeee");
                        const number = index + props.NoteNumber + 1;
                        console.log(number, "numbernumbernumbernumber");
                        if (i === 0 && ix === 7) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level2}>Financial Assets</td>
                                <td
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                ></td>
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
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td></td>
                              </tr>
                            </>
                          );
                        }
                        if (i === 0 && ix === 3) {
                          return (
                            <>
                              {/* <tr key={ix}>
                                        <td style={level2}>Financial Assets</td>
                                        <td className='notes_numbering' style={{color:'var(--clr-accent)'}}></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr key={ix}>
                                        <td style={level4}>- {line.notes_grp}</td>
                                        <td onClick={()=>{handleClick(number - 3)}} 
                                        className='notes_numbering' style={{color:'var(--clr-accent)'}}>{index + props.NoteNumber + 1}</td>
                                        <td>{line.cy ? ((line.cy)).toLocaleString('en-IN'): '-'}</td>
                                        <td>{line.py ?  ((line.py)).toLocaleString('en-IN'): '-'}</td>
                                        <td></td>
                                    </tr> */}
                            </>
                          );
                        }
                        if ((i === 3) | (i === 4)) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level4}>{line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
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
                                <td
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                ></td>
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
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
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
                                <td
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                ></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              <tr key={ix}>
                                <td style={level4}>
                                  {line.notes_grp.slice(12)}
                                </td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td></td>
                              </tr>
                            </>
                          );
                        }
                        if (i === 0 && (ix === 8 || ix === 9)) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level4}>- {line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td></td>
                              </tr>
                            </>
                          );
                        }
                        if (i === 1 && (ix === 2 || ix === 3 || ix === 4)) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level4}>- {line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td></td>
                              </tr>
                            </>
                          );
                        }
                        if (i === 2) {
                          if (line.notes_grp.includes("other equity")) {
                            return (
                              <>
                                <tr key={ix}>
                                  {/* <td style={level4}>{line.notes_grp.slice(12)}</td> */}
                                  <td style={level4}>
                                    {line.notes_grp.slice(12)}
                                  </td>
                                  <td
                                    className="notes_numbering"
                                    style={{ color: "var(--clr-accent)" }}
                                    onClick={() => {
                                      handleClick(number - 3);
                                    }}
                                    // className='notes_numbering' style={{color:'var(--clr-accent)'}}
                                  >
                                    {index + props.NoteNumber + 1}
                                  </td>
                                  <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                  <td>{line.py ? brackets(line.py) : "-"}</td>
                                  <td></td>
                                </tr>
                              </>
                            );
                          }
                        }

                        //property
                        if (i === 0 && ix === 0) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level2}>{line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 2);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td style={{ paddingRight: "3rem" }}>
                                  {/* {eventDAta != 0 || eventCy != 0? 
                          <i title='the net difference is not balancing' style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' /> 
                          :null
                          } */}
                                  {/* {findNotes("3a") === false? eventDAta.map((row,k)=>{

                            console.log(row, "rowwwwwwwwwwwwwwwww");
                             var chunksize = 2;
                             var chunks = [];
                             row.sub_grp.forEach((item)=>{
                               if(!chunks.length || chunks[chunks.length-1].length == chunksize)
                               chunks.push([]);
                               chunks[chunks.length-1].push(item);
                             });

                                return chunks.map((slt,j)=>{
                                  console.log(slt , "slttttttttttt");
                                    return slt.map((sub,i)=>{
                                      const cy = sub.disclosures.reduce((totalCy, i) => totalCy +  Number(i.cy_amt), 0);
                                      const py = sub.disclosures.reduce((totalPy, i) => totalPy +  Number(i.py_amt), 0);
                                        return sub.sub_grp.cy_amt-cy != 0 || sub.sub_grp.py_amt-py !=0 ? 
                                        <BalaceIcon lengthData={setIconLength} lengthiconData={iconlength} rowNumber={"3a"}/> 
                                      :null
                                    }) 
                                }) 
                              }) 
                              : findNotes("3a") === true?
                              <BalaceIcon lengthData={setIconLength} lengthiconData={iconlength} rowNumber={"3a"}/> 
                              
                              :""
                               } */}

                                  {eventDAta.length > 0 &&
                                    eventDAta.map((row, k) => {
                                      console.log(row, "rowwwwwwwwwwwwwwwww");
                                      var chunksize = 2;
                                      var chunks = [];
                                      row.sub_grp.forEach((item) => {
                                        if (
                                          !chunks.length ||
                                          chunks[chunks.length - 1].length ==
                                            chunksize
                                        )
                                          chunks.push([]);
                                        chunks[chunks.length - 1].push(item);
                                      });

                                      return (
                                        chunks.length > 0 &&
                                        chunks.map((slt, j) => {
                                          console.log(slt, "slttttttttttt");
                                          return slt.map((sub, i) => {
                                            const cy = sub.disclosures.reduce(
                                              (totalCy, i) =>
                                                totalCy + Number(i.cy_amt),
                                              0
                                            );
                                            const py = sub.disclosures.reduce(
                                              (totalPy, i) =>
                                                totalPy + Number(i.py_amt),
                                              0
                                            );
                                            return sub.sub_grp.cy_amt - cy !=
                                              0 ||
                                              sub.sub_grp.py_amt - py != 0 ? (
                                              <BalaceIcon
                                                lengthData={setIconLength}
                                                lengthiconData={iconlength}
                                                rowNumber={"3a"}
                                              />
                                            ) : null;
                                          });
                                        })
                                      );
                                    })}
                                </td>
                              </tr>
                            </>
                          );
                        }

                        //capital
                        if (i === 0 && ix === 1) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level2}>{line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td style={{ paddingRight: "3rem" }}>
                                  {/* {eventDAta != 0 || eventCy != 0? 
                          <i title='the net difference is not balancing' style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' /> 
                          :null
                          } */}
                                  {eventDAta.length > 0 &&
                                    eventDAta.map((row, i) => {
                                      var chunksize = 2;
                                      var chunks = [];
                                      row.sub_grp.forEach((item) => {
                                        if (
                                          !chunks.length ||
                                          chunks[chunks.length - 1].length ==
                                            chunksize
                                        )
                                          chunks.push([]);
                                        chunks[chunks.length - 1].push(item);
                                      });

                                      return chunks.map((slt) => {
                                        return slt.map((sub, i) => {
                                          const cy = sub.disclosures.reduce(
                                            (totalCy, i) =>
                                              totalCy + Number(i.cy_amt),
                                            0
                                          );
                                          const py = sub.disclosures.reduce(
                                            (totalPy, i) =>
                                              totalPy + Number(i.py_amt),
                                            0
                                          );
                                          return sub.sub_grp.cy_amt - cy != 0 ||
                                            sub.sub_grp.py_amt - py != 0 ? (
                                            <BalaceIcon
                                              lengthData={setIconLength}
                                              lengthiconData={iconlength}
                                              rowNumber={"3b"}
                                            />
                                          ) : null;
                                        });
                                      });
                                    })}
                                </td>
                              </tr>
                            </>
                          );
                        }

                        //investment
                        if (i === 0 && ix === 2) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level2}>{line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td style={{ paddingRight: "3rem" }}>
                                  {/* {eventDAta != 0 || eventCy != 0? 
                          <i title='the net difference is not balancing' style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' /> 
                          :null
                          } */}
                                  {note4.length > 0 &&
                                    note4.map((sub, i) => {
                                      console.log(sub, "fdfgdf");
                                      const cy = sub.disclosures.reduce(
                                        (totalCy, i) =>
                                          totalCy + Number(i.cy_amt),
                                        0
                                      );
                                      const py = sub.disclosures.reduce(
                                        (totalPy, i) =>
                                          totalPy + Number(i.py_amt),
                                        0
                                      );
                                      return sub.sub_grp.cy_amt - cy != 0 ||
                                        sub.sub_grp.py_amt - py != 0 ? (
                                        <BalaceIcon
                                          lengthData={setIconLength}
                                          lengthiconData={iconlength}
                                          rowNumber={"4"}
                                        />
                                      ) : null;
                                    })}
                                </td>
                              </tr>
                            </>
                          );
                        }

                        //other intangible
                        if (i === 0 && ix === 4) {
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level2}>{line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
                                </td>
                                <td>{line.cy ? brackets(line.cy) : "-"}</td>
                                <td>{line.py ? brackets(line.py) : "-"}</td>
                                <td style={{ paddingRight: "3rem" }}>
                                  {/* {eventDAta != 0 || eventCy != 0? 
                          <i title='the net difference is not balancing' style={{marginLeft:'20px',color:'darkorange',transform:'scale(1.2)'}}className='fas fa-info-circle' /> 
                          :null
                          } */}
                                  {note5.length > 0 &&
                                    note5.map((row, i) => {
                                      var chunksize = 2;
                                      var chunks = [];
                                      row.sub_grp.forEach((item) => {
                                        if (
                                          !chunks.length ||
                                          chunks[chunks.length - 1].length ==
                                            chunksize
                                        )
                                          chunks.push([]);
                                        chunks[chunks.length - 1].push(item);
                                      });

                                      return chunks.map((slt) => {
                                        return slt.map((sub, i) => {
                                          const cy = sub.disclosures.reduce(
                                            (totalCy, i) =>
                                              totalCy + Number(i.cy_amt),
                                            0
                                          );
                                          const py = sub.disclosures.reduce(
                                            (totalPy, i) =>
                                              totalPy + Number(i.py_amt),
                                            0
                                          );
                                          return sub.sub_grp.cy_amt - cy != 0 ||
                                            sub.sub_grp.py_amt - py != 0 ? (
                                            <BalaceIcon
                                              lengthData={setIconLength}
                                              lengthiconData={iconlength}
                                              rowNumber={row.notes_no}
                                            />
                                          ) : null;
                                        });
                                      });
                                    })}
                                </td>
                              </tr>
                            </>
                          );
                        }

                        //def
                        if (
                          no.length > 0 &&
                          no.some(
                            (user) =>
                              user.notes_grp.toLowerCase() ===
                              line.notes_grp.toLowerCase()
                          )
                        ) {
                          // const number = index + props.NoteNumber + 1
                          return (
                            <>
                              <tr key={ix}>
                                <td style={level2}>{line.notes_grp}</td>
                                <td
                                  onClick={() => {
                                    handleClick(number - 3);
                                  }}
                                  className="notes_numbering"
                                  style={{ color: "var(--clr-accent)" }}
                                >
                                  {index + props.NoteNumber + 1}
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
                                  handleClick(index - 3);
                                  // props.setKey('Notes')
                                  // props.scrollToTop()
                                  // props.setNote(index - 3)
                                }}
                                className="notes_numbering"
                                style={{ color: "var(--clr-accent)" }}
                              >
                                {ix}
                              </td>
                              <td>{line.cy ? brackets(-1 * line.cy) : "-"}</td>
                              <td>{line.py ? brackets(-1 * line.py) : "-"}</td>
                              <td></td>
                            </tr>
                          </>
                        );
                      })}
                    {i === 0 && (
                      <tr>
                        <td style={total}>Total Non Current Assets</td>
                        <td style={total}></td>
                        {/* <td style={total} >{cy ? (formatToUnits(cy,0)):'-'}</td> */}
                        <td style={total}>{cy ? brackets(cy) : "-"}</td>
                        <td style={total}>{py ? brackets(py) : "-"}</td>
                        <td style={total}></td>
                      </tr>
                    )}
                    {i === 3 && (
                      <tr>
                        <td style={total}>Total Non Current Liabilities</td>
                        <td style={total}></td>
                        <td style={total}>{cy ? brackets(cy) : "-"}</td>
                        <td style={total}>{py ? brackets(py) : "-"}</td>
                        <td style={total}></td>
                      </tr>
                    )}
                    {i === 2 && (
                      <tr>
                        <td style={total}>Total Shareholder Funds</td>
                        <td style={total}></td>
                        <td style={total}>{cy ? brackets(cy) : "-"}</td>
                        <td style={total}>{py ? brackets(py) : "-"}</td>
                        <td style={total}></td>
                      </tr>
                    )}
                    {i === 1 && (
                      <>
                        <tr>
                          <td style={total}>Total Current Assets</td>
                          <td style={total}></td>
                          <td style={total}>{cy ? brackets(cy) : "-"}</td>
                          <td style={total}>{py ? brackets(py) : "-"}</td>
                          <td style={total}></td>
                        </tr>
                        <tr>
                          <td style={total}>
                            Total Non Current & Current Assets
                          </td>
                          <td style={total}></td>
                          <td style={total}>
                            {total_assets_cy ? brackets(total_assets_cy) : "-"}
                          </td>
                          <td style={total}>
                            {total_assets_py ? brackets(total_assets_py) : "-"}
                          </td>
                          <td style={total}></td>
                        </tr>
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <tr>
                          <td style={total}>Total Current Liabilities</td>
                          <td style={total}></td>
                          <td style={total}>{cy ? brackets(cy) : "-"}</td>
                          <td style={total}>{py ? brackets(py) : "-"}</td>
                          <td style={total}></td>
                        </tr>

                        <tr>
                          <td style={total}>
                            Total Non Current & Current Liabilities
                          </td>
                          <td style={total}></td>
                          <td style={total}>
                            {total_liabilities_cy
                              ? brackets(total_liabilities_cy)
                              : "-"}
                          </td>
                          <td style={total}>
                            {total_liabilities_py
                              ? brackets(total_liabilities_py)
                              : "-"}
                          </td>
                          <td style={total}></td>
                        </tr>
                      </>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </motion.div>
      <div style={{ marginTop: "20px" }}>
        <CKEditor
          style={{ minHeight: "70vh", zIndex: "0" }}
          editor={ClassicEditor}
          // data={fotterdata}
          onReady={(editor) => {}}
          onChange={(e, editor) => {
            handleFooter(e, editor);
          }}
        />
        <h4 style={{ marginLeft: "2rem" }}>
          <strong>
            {/* <div dangerouslySetInnerHTML={{_html:fotterdata}} className='editor'></div> */}
            {removeTags(fotterdata)}
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
        <ProgressBar bgColor="#D96B62" completed={finalData} />
      </div>
    </>
  );
};

export default BalanceSheet;
