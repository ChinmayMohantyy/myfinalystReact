import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../services/socket/socket";
import * as actionTypes from "../../redux/actionTypes";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import Note1 from "./Note1";
import { motion } from "framer-motion";

const Note5 = (props) => {
  const inputDiv = {
    height: "100%",
    width: "100%",
    // maxWidth:''
  };
  const input = {
    height: "100%",
    width: "100%",
    maxWidth: "200px",
    border: "none",
    textAlign: "end",
    background: "transparent",
  };
  const dispatch = useDispatch();

  const [note, setNote] = useState([]);
  const [nid, setNld] = useState("");
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState("");
  const [noteOpen, setNoteOpen] = useState(false);

  // const noteNo = 5

  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const Note = useSelector((initialState) => initialState.reducerNotes.note5);
  const renderNow = useSelector((initialState) => initialState.reducer.render);
  const project_id = localStorage.getItem("project_id");

  // useEffect(() => {
  //   if(Note === [] | Note === null |Note === ''){
  //     console.log('something')

  //   }
  //   else{
  //     Note.map((row)=>{
  //       row.sub_grp.map((sub,i)=>{
  //         sub.disclosures.map((dis,i)=>{

  //           if(dis.disclosures === 'Opening Gross Carrying Amount'){

  //             socket.emit("notes-auto-save", {
  //               project_id: `${project_id}`,
  //               tb_id: `${TB_ID}`,
  //               nlid: `${nid}`,
  //               contents: {
  //                 sid: `${sub.sid}`,
  //                 disclosures: "Opening Gross Carrying Amount",
  //                 cy_amt: `${sub.sub_grp.py_amt}`,
  //                 py_amt: "0",
  //               },
  //             });
  //           }
  //           if(dis.disclosures === 'Opening Accumulated Depreciation'){
  //             console.log(dis.disclosures,'dis.disclosures')

  //             socket.emit("notes-auto-save", {
  //               project_id: `${project_id}`,
  //               tb_id: `${TB_ID}`,
  //               nlid: `${nid}`,
  //               contents: {
  //                 sid: `${sub.sid}`,
  //                 disclosures: "Opening Accumulated Depreciation",
  //                 cy_amt: `${sub.sub_grp.py_amt}`,
  //                 py_amt: "0",
  //               },
  //             });
  //           }
  //           if(dis.disclosures === 'Opening Accumulated depreciation'){
  //             console.log(dis.disclosures,'dis.disclosures')

  //             socket.emit("notes-auto-save", {
  //               project_id: `${project_id}`,
  //               tb_id: `${TB_ID}`,
  //               nlid: `${nid}`,
  //               contents: {
  //                 sid: `${sub.sid}`,
  //                 disclosures: "Opening Accumulated depreciation",
  //                 cy_amt: `${sub.sub_grp.py_amt}`,
  //                 py_amt: "0",
  //               },
  //             });
  //           }
  //           if(dis.disclosures === 'Opening Accumulated Amortization'){
  //             console.log(dis.disclosures,'dis.disclosures')

  //             socket.emit("notes-auto-save", {
  //               project_id: `${project_id}`,
  //               tb_id: `${TB_ID}`,
  //               nlid: `${nid}`,
  //               contents: {
  //                 sid: `${sub.sid}`,
  //                 disclosures: "Opening Accumulated Amortization",
  //                 cy_amt: `${sub.sub_grp.py_amt}`,
  //                 py_amt: "0",
  //               },
  //             });
  //           }
  //         })

  //       })

  //     })

  //     setNote(Note)
  console.log(renderNow, "set ------------------- set");
  //   }
  // }, [])

  // useEffect(() => {
  // note.map((row)=>{
  //   row.sub_grp.map((sub,i)=>{
  //     sub.disclosures.map((dis,i)=>{

  //       if(dis.disclosures === 'Opening Gross Carrying Amount'){

  //         socket.emit("notes-auto-save", {
  //           project_id: `${project_id}`,
  //           tb_id: `${TB_ID}`,
  //           nlid: `${nid}`,
  //           contents: {
  //             sid: `${sub.sid}`,
  //             disclosures: "Opening Gross Carrying Amount",
  //             cy_amt: `${sub.sub_grp.py_amt}`,
  //             py_amt: "0",
  //           },
  //         });
  //       }
  //       if(dis.disclosures === 'Opening Accumulated Depreciation'){
  //         console.log(dis.disclosures,'dis.disclosures')

  //         socket.emit("notes-auto-save", {
  //           project_id: `${project_id}`,
  //           tb_id: `${TB_ID}`,
  //           nlid: `${nid}`,
  //           contents: {
  //             sid: `${sub.sid}`,
  //             disclosures: "Opening Accumulated Depreciation",
  //             cy_amt: `${sub.sub_grp.py_amt}`,
  //             py_amt: "0",
  //           },
  //         });
  //       }
  //       if(dis.disclosures === 'Opening Accumulated Amortization'){
  //         console.log(dis.disclosures,'dis.disclosures')

  //         socket.emit("notes-auto-save", {
  //           project_id: `${project_id}`,
  //           tb_id: `${TB_ID}`,
  //           nlid: `${nid}`,
  //           contents: {
  //             sid: `${sub.sid}`,
  //             disclosures: "Opening Accumulated Amortization",
  //             cy_amt: `${sub.sub_grp.py_amt}`,
  //             py_amt: "0",
  //           },
  //         });
  //       }
  //     })

  //   })

  // })
  // },[])

  useEffect(() => {
    setNote(Note);
  }, [Note]);

  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
    let headers = {
      "x-auth-token": auth,
      // 'Content-Type' : 'application/json'
    };
    const fd = new FormData();
    fd.append("notes_no", props.note);
    setLoading(true);

    axios
      .post(`api/v1/notes/gcn/${project_id}/${TB_ID}`, fd, { headers })
      .then((res) => {
        console.log(res, "response  npotes notes resonse response response");
        setLoading(false);
        setNld(res.data.notes.nlid);
        setNote(res.data.notes.data);
        dispatch({ type: actionTypes.SET_NOTE5, payload: res.data.notes.data });
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response)
        // if(err.response.data){

        //   alert(err.response.data.error)
        // }
      });
    return () => {
      // dispatch({type: actionTypes.SET_NOTE5,payload:note})
    };
  }, []);

  function handleChange(e, data, a, field) {
    const content = {};
    // console.log(e.target.value)
    // console.log(data)
    // console.log(a)
    // console.log(field)
    // console.log(typeof project_id,'projectid')
    // console.log(typeof TB_ID,'tb_id')
    // console.log(typeof nid,'nid')
    // console.log(typeof a.sid,'sid')
    content.sid = `${a.sid}`;
    content.disclosures = data.disclosures;

    if (field === "currentYear") {
      // const value = e.target.value.replace(/\D/g, "")
      // console.log(value)
      // let { value, min, max } = e.target;
      // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      // console.log(value)
      // content.cy_amt = Number(value)
      content.cy_amt = e.target.value;
      if (e.target.value === "") {
        content.cy_amt = "0";
      }
      content.py_amt = data.py_amt.toString();
    }
    if (field === "prevYear") {
      // const value = e.target.value.replace(/\D/g, "")
      // console.log(value)
      // let { value, min, max } = e.target;
      // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
      // console.log(value)
      content.py_amt = e.target.value;
      if (e.target.value === "") {
        content.py_amt = "0";
      }
      content.cy_amt = data.cy_amt.toString();
      // content.py_amt = Number(value)
    }

    console.log(content, "content");
    // socket.emit("notes-auto-save", {
    //   project_id: `${project_id}`,
    //   tb_id: `${TB_ID}`,
    //   nlid: `${nid}`,
    //   contents: {
    // sid: `${a.sid}`,
    //     disclosures: "Opening Gross Carrying Amount",
    //     cy_amt: 100 ,
    //     py_amt: 100,
    //   },
    // });
    var arr = note;
    arr.map((line) => {
      console.log(line);
      line.sub_grp.map((sub, i) => {
        if (sub.sid === a.sid) {
          console.log(sub, i, "sub here");
          sub.disclosures.map((dsc, i) => {
            if (dsc.did === data.did) {
              dsc.cy_amt = Number(content.cy_amt);
              dsc.py_amt = Number(content.py_amt);
              // console.log(dsc,e.target.value,'sdc')
            }
          });
        }
      });
    });

    console.log(arr, content, "data here ");
    setNote(arr);
    setRender(Math.random());
    socket.emit("notes-auto-save", {
      project_id: `${project_id}`,
      tb_id: `${TB_ID}`,
      nlid: `${nid}`,
      contents: content,
    });
  }

  socket.on("on-auto-save", (data) => {
    //To trigger in the Fetch API (Conventional Model)
    if (data.updatedNotes) {
      if (data.updatedNotes.note_no === "5") {
        console.log("{User Logged IN}", data.updatedNotes.data);
        // setNote(data.updatedNotes.data)
        dispatch({
          type: actionTypes.SET_NOTE5,
          payload: data.updatedNotes.data,
        });
      }
    }
  });

  // function handleRollForward(amt,data,a,field){
  //   var arr = note
  //   arr.map((line)=>{
  //     console.log(line)
  //     line.sub_grp.map((sub,i)=>{
  //       if(sub.sid === a.sid ){
  //         console.log(sub,i,'sub here')
  //         sub.disclosures.map((dsc,i)=>{
  //           if(dsc.did === data.did ){
  //             dsc.cy_amt = Number(amt)
  //             dsc.py_amt = 0
  //             // console.log(dsc,e.target.value,'sdc')
  //           }
  //         })
  //       }
  //     })
  //   })
  //   console.log(arr,'data here ')
  //   setNote(arr)
  //   setRender(Math.random())

  // }

  function handleLeave() {
    console.log("left");
    // const auth = localStorage.getItem('auth_token')
    // let headers = {
    //     'x-auth-token' : auth,
    //     // 'Content-Type' : 'application/json'

    // }
    // const fd = new FormData()
    // fd.append('notes_no',noteNo);

    // axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    // .then(res =>{
    //   console.log(res,'response  npotes notes resonse response response')
    //   // setNote(res.data.notes.data[0].sub_grp)
    //   setNld(res.data.notes.nlid)
    //   dispatch({type: actionTypes.SET_NOTE5,payload:res.data.notes.data})

    // }).catch(err=>{
    //   // console.log(err.response)
    //   // if(err.response.data){

    //   //   alert(err.response.data.error)
    //   // }
    // })
  }

  function handleRollForward(amt, data, a, field) {
    var arr = note;
    arr.map((line) => {
      console.log(line);
      line.sub_grp.map((sub, i) => {
        if (sub.sid === a.sid) {
          console.log(sub, i, "sub here");
          sub.disclosures.map((dsc, i) => {
            if (dsc.did === data.did) {
              dsc.cy_amt = Number(amt);
              dsc.py_amt = 0;
              // console.log(dsc,e.target.value,'sdc')
            }
          });
        }
      });
    });
    console.log(arr, "data here ");
    setNote(arr);
    setRender(Math.random());
  }

  if ((note == null) | (note == [])) {
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
        <Spinner animation="grow" />
        <Spinner animation="grow" size="sm" />
      </div>
    );
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
  return (
    <div className="notes">
      <table>
        <thead>
          <tr style={{ backgroundColor: "#A2C0C2" }}>
            <th
              style={{
                width: "40%",
                height: "90px",
                textAlign: "left",
                paddingLeft: "2rem",
              }}
            >
              PARTICULAR
            </th>
            <th style={{ width: "10%" }}>As at March 31, 2021</th>
            <th style={{ width: "10%" }}>As at March 31, 2020</th>
            <th
              style={{ width: "25%", textAlign: "left", paddingLeft: "3rem" }}
            >
              Guidances
            </th>
          </tr>
        </thead>
        {note.map((row, i) => {
          console.log(row, "row 5");
          // console.log(row)
          // var data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
          var chunksize = 2;
          var chunks = [];
          row.sub_grp.forEach((item) => {
            if (!chunks.length || chunks[chunks.length - 1].length == chunksize)
              chunks.push([]);

            chunks[chunks.length - 1].push(item);
          });
          console.log(chunks, "chunks");
          return chunks.map((slt, ic) => {
            console.log(slt, "slt");

            const sub_py = slt.reduce(
              (totalpy, i) => -totalpy + Number(i.sub_grp.py_amt),
              0
            );
            const sub_cy = slt.reduce(
              (totalCy, i) => -totalCy + Number(i.sub_grp.cy_amt),
              0
            );

            return (
              <tbody key={ic}>
                {slt.map((sub, i) => {
                  const cy = sub.disclosures.reduce(
                    (totalCy, i) => totalCy + Number(i.cy_amt),
                    0
                  );
                  const py = sub.disclosures.reduce(
                    (totalPy, i) => totalPy + Number(i.py_amt),
                    0
                  );
                  return (
                    <>
                      <tr className="n4level3" key={i}>
                        <td
                          style={{
                            width: "40%",
                            height: "80px",
                            textAlign: "left",
                            paddingLeft: "2rem",
                          }}
                        >
                          {sub.sub_grp.sub_grp}
                        </td>
                        <td style={{ width: "10%" }}>
                          {sub.sub_grp.cy_amt.toLocaleString("en-IN")}
                        </td>
                        <td style={{ width: "10%" }}>
                          {sub.sub_grp.py_amt.toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            width: "25%",
                            textAlign: "right",
                            paddingLeft: "3rem",
                          }}
                        >
                          {sub.sub_grp.cy_amt - cy != 0 ||
                          sub.sub_grp.py_amt - py != 0 ? (
                            <i
                              style={{
                                marginLeft: "20px",
                                color: "darkorange",
                                transform: "scale(1.2)",
                              }}
                              className="fas fa-info-circle"
                            />
                          ) : null}
                        </td>
                        {/* <td style={{width:'25%',textAlign:'right',paddingLeft:'3rem'}}>{sub.sub_grp.cy_amt-cy != 0 || sub.sub_grp.py_amt-py !=0 ? <i style={{marginLeft:'20px',color:'darkred',transform:'scale(1.2)'}}className='fas fa-times-circle' /> 
                        :<i style={{marginLeft:'20px',color:'darkgreen',transform:'scale(1.2)'}} class="fas fa-check-circle"/>}</td> */}
                      </tr>
                      {sub.disclosures.map((dis, i) => {
                        if (
                          dis.disclosures === "Opening Gross Carrying Amount" ||
                          dis.disclosures ===
                            "Opening Accumulated depreciation" ||
                          dis.disclosures ===
                            "Opening Accumulated Amortization" ||
                          dis.disclosures === "Opening Accumulated Depreciation"
                        ) {
                          if (!(dis.cy_amt === sub.sub_grp.py_amt)) {
                            handleRollForward(
                              sub.sub_grp.py_amt,
                              dis,
                              sub,
                              "currentYear"
                            );
                            // socket.emit("notes-auto-save", {
                            //   project_id: `${project_id}`,
                            //   tb_id: `${TB_ID}`,
                            //   nlid: `${nid}`,
                            //   contents: {
                            //     sid: `${sub.sid}`,
                            //     disclosures: `${dis.disclosures}`,
                            //     cy_amt: `${sub.sub_grp.py_amt}`,
                            //     py_amt: "0",
                            //   },
                            // });
                          }

                          return (
                            <tr className="n4disclosure" key={i}>
                              <td
                                style={{
                                  width: "40%",
                                  height: "33px",
                                  textAlign: "left",
                                  paddingLeft: "2rem",
                                  backgroundColor: "#EBEBEB",
                                }}
                              >
                                {dis.disclosures}
                              </td>

                              <td
                                style={{
                                  width: "10%",
                                  maxWidth: "150px",
                                  backgroundColor: "#EBEBEB",
                                }}
                              >
                                <div style={inputDiv}>
                                  <input
                                    type="number"
                                    value={dis.cy_amt}
                                    style={input}
                                    onChange={(e) => {
                                      handleChange(e, dis, sub, "currentYear");
                                    }}
                                    onBlur={() => {
                                      handleLeave();
                                      console.log("youre out");
                                    }}
                                  />
                                </div>
                              </td>
                              <td
                                style={{
                                  width: "10%",
                                  maxWidth: "150px",
                                  backgroundColor: "#EBEBEB",
                                }}
                              >
                                <div style={inputDiv}>
                                  <input
                                    type="number"
                                    value={dis.py_amt}
                                    style={input}
                                    onChange={(e) => {
                                      handleChange(e, dis, sub, "prevYear");
                                    }}
                                    onBlur={() => {
                                      handleLeave();
                                      console.log("youre out");
                                    }}
                                  />
                                </div>
                              </td>
                              <td
                                style={{
                                  width: "25%",
                                  textAlign: "left",
                                  paddingLeft: "3rem",
                                  backgroundColor: "#EBEBEB",
                                }}
                              ></td>
                            </tr>
                          );
                        }
                        return (
                          <tr className="n4disclosure" key={i}>
                            <td
                              style={{
                                width: "40%",
                                height: "33px",
                                textAlign: "left",
                                paddingLeft: "2rem",
                              }}
                            >
                              {dis.disclosures}
                            </td>

                            <td style={{ width: "10%", maxWidth: "150px" }}>
                              <div style={inputDiv}>
                                <input
                                  type="number"
                                  value={dis.cy_amt}
                                  style={input}
                                  onChange={(e) => {
                                    handleChange(e, dis, sub, "currentYear");
                                  }}
                                  onBlur={() => {
                                    handleLeave();
                                    console.log("youre out");
                                  }}
                                />
                              </div>
                            </td>
                            <td style={{ width: "10%", maxWidth: "150px" }}>
                              <div style={inputDiv}>
                                <input
                                  type="number"
                                  value={dis.py_amt}
                                  style={input}
                                  onChange={(e) => {
                                    handleChange(e, dis, sub, "prevYear");
                                  }}
                                  onBlur={() => {
                                    handleLeave();
                                    console.log("youre out");
                                  }}
                                />
                              </div>
                            </td>
                            <td
                              style={{
                                width: "25%",
                                textAlign: "left",
                                paddingLeft: "3rem",
                              }}
                            ></td>
                          </tr>
                        );
                      })}
                      <tr className="n4disclosure">
                        <td
                          style={{
                            width: "40%",
                            height: "33px",
                            textAlign: "left",
                            paddingLeft: "2rem",
                            fontWeight: "500",
                          }}
                        >
                          Closing Gross Carrying Amount
                        </td>
                        <td
                          style={{
                            width: "10%",
                            textAlign: "end",
                            paddingRight: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          {sub.sub_grp.cy_amt.toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            width: "10%",
                            textAlign: "end",
                            paddingRight: "1rem",
                            fontWeight: "500",
                          }}
                        >
                          {sub.sub_grp.py_amt.toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            width: "25%",
                            textAlign: "left",
                            paddingLeft: "3rem",
                          }}
                        ></td>
                      </tr>
                      <tr
                        className=""
                        style={{
                          backgroundColor: "rgb(238, 233, 233)",
                          color: "#e1e1e1",
                        }}
                      >
                        <td
                          style={{
                            width: "40%",
                            height: "33px",
                            textAlign: "left",
                            paddingLeft: "2rem",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          Net Difference
                        </td>
                        <td
                          style={{
                            width: "10%",
                            textAlign: "end",
                            paddingRight: "1rem",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {(sub.sub_grp.cy_amt - cy).toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            width: "10%",
                            textAlign: "end",
                            paddingRight: "1rem",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {(sub.sub_grp.py_amt - py).toLocaleString("en-IN")}
                        </td>
                        <td
                          style={{
                            width: "25%",
                            textAlign: "left",
                            paddingLeft: "3rem",
                          }}
                        ></td>
                      </tr>

                      <tr className="n4addInput">
                        <td
                          style={{
                            width: "40%",
                            height: "33px",
                            textAlign: "left",
                            paddingLeft: "2rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            props.setShowCreateInput(true);
                            props.setNid(nid);
                            props.setSid(sub.sid);
                            props.setNoteNum(props.note);
                          }}
                        >
                          + Create New Input
                        </td>
                        <td style={{ width: "10%" }}></td>
                        <td style={{ width: "10%" }}></td>
                        <td
                          style={{
                            width: "25%",
                            textAlign: "left",
                            paddingLeft: "3rem",
                          }}
                        ></td>
                      </tr>
                    </>
                  );
                })}
                <tr
                  style={{
                    height: "50px",
                    backgroundColor: " #F0DBC8",
                    padding: "10px 0 0 2rem",
                    alignContent: "center",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                  }}
                >
                  <td
                    style={{
                      width: "40%",
                      height: "33px",
                      textAlign: "left",
                      paddingLeft: "2rem",
                    }}
                  >
                    {" "}
                    Net Carrying amount
                  </td>
                  <td
                    style={{
                      width: "10%",
                      textAlign: "end",
                      paddingRight: "1rem",
                      maxWidth: "150px",
                    }}
                  >
                    {sub_cy.toLocaleString("en-IN")}
                  </td>
                  <td
                    style={{
                      width: "10%",
                      textAlign: "end",
                      paddingRight: "1rem",
                      maxWidth: "150px",
                    }}
                  >
                    {sub_py.toLocaleString("en-IN")}
                  </td>
                  <td
                    style={{
                      width: "25%",
                      textAlign: "left",
                      paddingLeft: "3rem",
                    }}
                  ></td>
                </tr>
              </tbody>
            );
          });
        })}
      </table>
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          height: "50px",
          border: "2px solid #e8e8e8",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "1rem",
            color: "grey",
          }}
        >
          <p>Note here</p>
        </div>
        <div
          onClick={(e) => {
            setNoteOpen(!noteOpen);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            background: "#e8e8e8",
            marginLeft: "auto",
            marginRight: "2rem",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-pencil-alt" /> {/* <img src/> */}
        </div>
      </div>
      {noteOpen && (
        <motion.div
          style={{
            marginBottom: "1rem",
            padding: "0rem",
            backgroundColor: "white",
            border: "2px solid #e8e8e8",
            borderTop: "none",
          }}
        >
          {/* <h1>note 3  </h1> */}
          <Note1 color="grey" />
        </motion.div>
      )}
    </div>
  );
};

export default Note5;
