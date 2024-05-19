import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import IconButton from "@material-ui/core/IconButton";
// import Snackbar from "@material-ui/core/Snackbar";
// import Button from "@material-ui/core/Button";
import axios from "axios";
import times from "../../assets/times.svg";
import * as actionTypes from "../../redux/actionTypes";
import tick from "../../assets/confirmTb.svg";
import { Form } from "react-bootstrap";
// import {groupings} from '../BalanceSheet/mockGrouping'
import swal from "sweetalert";
import { motion } from "framer-motion";

// import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

const card = {
  position: "fixed",
  bottom: "3%",
  right: "2%",
  width: "300px",
  // height:'55px',
  backgroundColor: "white",
  zIndex: "99",
  borderRadius: "2px",
  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
  // boxShadow: '5px 10px #888888'
};
const action = {
  borderRadius: "2px",
  height: "50px",
  backgroundColor: "var(--clr-bg)",
  zIndex: "99",
  display: "flex",
  alignItems: "center",
};
const form = {
  borderRadius: "2px",
  height: "170px",
  backgroundColor: "white",
  zIndex: "99",
};

const MultiSelect = (props) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.reducer.selectedRows);
  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const group = useSelector((initialState) => initialState.reducer.grouping);
  const [open, setOpen] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [values, setValues] = useState("");
  const [notes, setNotes] = useState("");
  const [sub, setSub] = useState("");
  const [noteNo, setNoteNo] = useState("");
  const [groupings, setGroupings] = useState(group);
  // const [, setValues] = useState({fs:'',notes:'',sub:''});
  const auth = localStorage.getItem("auth_token");
  const project_id = localStorage.getItem("project_id");
  let headers = {
    "x-auth-token": auth,
  };

  useEffect(() => {
    setGroupings(group);
  }, [group]);

  useEffect(() => {
    setSub(props.multiOptions);
  }, [props.multiOptions]);

  // setSub()
  console.log(JSON.stringify(selected), "selected row changed");
  console.log(values, notes, noteNo, sub, "selected row changed");

  function handleChange(e, field) {
    if (field === "fs_grp") {
      setValues(e.target.value);
      setNotes("");
    }
    if (field === "note_grp") {
      groupings.grp.map((opt) => {
        if (values === opt.fs_grp) {
          opt.notes_grp.map((note) => {
            if (notes === note.notes_grp) {
              setNoteNo(note.notes_no);
              // console.log(note.notes_no,'target taerearera')
              // console.log(note,'target taerearera')
            }
          });
        }
      });
      setNotes(e.target.value);
      setSub("");
    }
    if (field === "sub_grp") {
      setSub(e.target.value);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setMenu(false);
  };

  useEffect(() => {
    console.log(selected, "selected row changed");
    if (selected.length >= 2) {
      setOpen(true);
    }
    if (selected.length < 2) {
      setOpen(false);
      setMenu(false);
    }
  }, [selected]);

  function handlePost() {
    swal({
      title: "Are you sure?",
      text: "clicking on ok, will change the the groupings of the selected rows",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        // let row = props.select
        // console.log(row[0].tb_id,row[0].lid,'clicked red')
        const fd = new FormData();
        fd.append("multiple_line_items", JSON.stringify(selected));
        fd.append("fs_grp", values);
        fd.append("note_grp", notes);
        fd.append("sub_grp", sub);
        fd.append("note_no", noteNo);
        axios
          .post(
            `/api/v1/conventional-mode/edit-multiple-line-items-grouping/${project_id}/${TB_ID}`,
            fd,
            { headers }
          )
          .then((res) => {
            console.log(
              res,
              "response  npotes notes resonse response response"
            );
            axios
              .get(`api/v1/conventional-mode/fetch/${project_id}/${TB_ID}`, {
                headers,
              })
              .then((response) => {
                dispatch({
                  type: actionTypes.SET_TABLE_DATA,
                  payload: response.data.data.line_items,
                });
              });
            props.fetchConvential(true);
          })
          .catch((err) => {
            console.log(err.response);
          });
        setOpen(false);
        setMenu(false);

        swal("Groupings have been added to the selected rows!", {
          icon: "success",
        });
      } else {
        swal("Ledger not deleted!");
      }
    });
  }

  function handleAddOptions() {
    if ((notes === "") | (values === "")) {
      swal("", "Please select the Fs and Notes groupings", "warning");
      return;
    }
    props.setAddGrouping(true);
    const newSg = {};
    newSg.fs_grp = values;
    newSg.note_grp = notes;
    props.SetNewSg(newSg);
    // setOpen(false)
    setMenu(false);
    // props.multiOptions
  }

  return (
    <>
      {open && (
        <div style={card}>
          <div style={action}>
            <p style={{ marginRight: "auto", marginLeft: "10px" }}>
              Multi select Menu
            </p>
            {values != "" || notes != "" || sub != "" ? (
              <img
                style={{
                  marginLeft: "auto",
                  marginRight: "0px",
                  transform: "scale(1)",
                }}
                src={tick}
                alt="tick"
                onClick={() => {
                  handlePost();
                }}
              />
            ) : null}
            <i
              style={{
                marginLeft: "auto",
                transform: "scale(1.5)",
                cursor: "pointer",
              }}
              className={menu ? "fas fa-angle-down" : "fas fa-angle-up"}
              onClick={() => {
                setMenu(!menu);
              }}
            />
            <img
              style={{ margin: "10px", transform: "scale(0.6)" }}
              alt="times"
              src={times}
              onClick={() => {
                handleClose();
              }}
            />
          </div>
          {menu && (
            <motion.div
              style={form}
              // initial={{y:'-1vh'}}
              // animate={{y:0}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>
                <Form.Control
                  size="lg"
                  as="select"
                  value={values}
                  onChange={(e) => {
                    handleChange(e, "fs_grp");
                  }}
                >
                  <option key="blankChoice" hidden value>
                    {"Select Fs grouping"}
                  </option>
                  {groupings.grp.map((opt, ix) => {
                    return <option key={ix}>{opt.fs_grp}</option>;
                  })}
                </Form.Control>
              </div>
              <div>
                <Form.Control
                  size="lg"
                  as="select"
                  value={notes}
                  onChange={(e) => {
                    handleChange(e, "note_grp");
                  }}
                >
                  <option key="blankChoice" hidden value>
                    {"Select Notes grouping"}
                  </option>
                  {groupings.grp.map((opt) => {
                    if (values === opt.fs_grp) {
                      return opt.notes_grp.map((notes, i) => {
                        return <option key={i}>{notes.notes_grp}</option>;
                      });
                    }
                  })}
                </Form.Control>
              </div>
              <div>
                <Form.Control
                  size="lg"
                  as="select"
                  value={sub}
                  onChange={(e) => {
                    handleChange(e, "sub_grp");
                  }}
                >
                  <option key="blankChoice" hidden value>
                    {"Select Sub grouping"}
                  </option>
                  {groupings.grp.map((opt) => {
                    if (values === opt.fs_grp) {
                      return opt.notes_grp.map((note) => {
                        if (notes === note.notes_grp) {
                          return note.sub_grp.map((sub, ix) => {
                            return <option key={ix}>{sub.sub_grp}</option>;
                          });
                        }
                      });
                    }
                  })}
                </Form.Control>
              </div>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "left",
                  paddingLeft: "1.1rem",
                  color: "var(--clr-accent)",
                }}
                onClick={() => {
                  handleAddOptions();
                }}
              >
                + add options
              </div>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

export default MultiSelect;
