import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import cross from "../assets/cross.svg";
import arrow from "../assets/arrow.svg";
import plus from "../assets/plus.svg";
import Select from "react-select";
import mockData from "../Components/Table/TABLE_MOCK.json";
import * as actionTypes from "../redux/actionTypes";

const popup = {
  position: "Fixed",
  minHeight: "10rem",
  minWidth: "10rem",
  width: "66%",
  zIndex: "5",
  backgroundColor: "#F1F2F5",
  top: "7.5rem",
  left: "8%",
  borderRadius: "8px",
  boxShadow: "4px 6px 8px 0px #C0C0C060",
  padding: "20px",
  transform: "scale(0.9)",
  // maxHeight:'20rem',
  // overflowX: 'hidden',
  // overflowY: 'scroll',
};
const flexContainer = {
  display: "flex",
  // justifyContent:'center',
  alignItems: "center",
};
const close = {
  height: "43px",
  width: "43px",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  borderRadius: "6px",
  fontWeight: "normal",
  marginRight: "15px",
};
const noClose = {
  height: "43px",
  width: "43px",
  backgroundColor: "#cacacabf",
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  borderRadius: "6px",
  fontWeight: "normal",
  marginRight: "15px",
};
const field = {
  width: "25%",
  marginRight: "15px",
};
const contains = {
  width: "20%",
  marginRight: "15px",
};
const inputs = {
  width: "33%",
  marginRight: "15px",
};
const input = {
  height: "46px",
  border: "1px solid #cacacabf",
  padding: "10px",
  borderRadius: "6px",

  ":focusVisible": {
    outline: "none",
    border: "2px solid #03565A",
  },
};

const search = {
  width: "85px",
  height: "46px",
  backgroundColor: "#03565A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
};
const noSearch = {
  width: "46px",
  height: "46px",
  backgroundColor: "#03565a98",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
};

const addFilter = {
  marginTop: "1rem",
  color: "#03565A",
  fontSize: "1.1rem",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
};

const text = {
  fontWeight: "500",
  fontSize: "1rem",
  color: "#696F79",
};

const textBox = {
  marginRight: "15px",
  width: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const textBoxAmount = {
  marginRight: "15px",
  width: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "7px",
};

const initialState = {
  startAmount: "",
  endAmount: "",
};
const columnName = [
  { value: "ledger_code", label: "LEDGER CODE" },
  { value: "ledger_name", label: "LEDGER NAME" },
  // { value: 'branch', label: 'BRANCH' },
  // { value: 'PREVIOUS YEAR', label: 'PREVIOUS YEAR' },
  { value: "net_adjusted_amount", label: "FINAL AMT" },
  { value: "cy", label: "CURRENT AMT" },
  { value: "py", label: "PREVIOUS AMT" },
  { value: "adjusted_amount", label: "ADJUSTED AMT" },

  // { value: 'FS GROUPING', label: 'FS GROUPING' },
  // { value: 'NOTES GROUPING', label: 'NOTES GROUPING' },
  // { value: 'SUB GROUPING', label: 'SUB GROUPING' },
];
// const opte = ['ledger_code', 'ledger_name',]
const type = [
  { value: "Contains", label: "Contains" },
  { value: "is empty", label: "Is empty" },
];

const finalAmountOptions = [
  { value: "Less than", label: "Less than" },
  { value: "Greater than", label: "Greater than" },
  { value: "Equal to", label: "Equal to" },
];

export default function AdjustmentFilter({
  show,
  setObject,
  setFilterShow,
  filterRow,
  setFilterRow,
  handleApplyFilter,
  SetConfirmFilClose,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState(mockData);
  const [state, setstate] = useState([
    { column: "", select: "", change: "", startAmount: "", endAmount: "" },
  ]);
  const [find, setFind] = useState({ column: "", select: "", change: "" });
  const [tempFiltered, setTempFiltered] = useState({});
  const [render, setRender] = useState("");
  const tableData = useSelector(
    (initialState) => initialState.reducer.tableData
  );
  const filter = useSelector((initialState) => initialState.reducer.filter);
  const [value, setValue] = useState(initialState);

  const [isFilter, setFilter] = useState(false);

  // console.log(tableData,'ssssssssssssssssss--------------sssssssssssssss')
  // console.log(render,'ssssssssssssssssss--------------sssssssssssssss')

  useEffect(() => {
    console.log(find, "find");
  }, [find]);

  useEffect(() => {
    const initData = data;
    // console.log(initData,'Appear when change ')
    setstate(filter);
  }, []);

  console.log(state, "state hit");
  // console.log(mockData , 'mock  data')
  // console.log(data , ' stored mock  data')

  const handleFilter = () => {
    console.log(state);
    // console.log(find,'find here')
    dispatch({ type: actionTypes.SET_FILTER, payload: state });

    // data.filter((val)=>{
    //     if (value == ''){
    //         return (val)
    //     }
    //     else if(val.ledger_code.toLowerCase().includes(value.toLowerCase())){
    //         return (val)
    //     }

    const dataFiltered = [];
    // var newArray = tableData.filter(function (dat) {
    //   var newVar = state[0].column;
    //   if (
    //     (dat[newVar] === "") |
    //     (dat[newVar] === null) |
    //     (dat[newVar] === undefined) |
    //     state.change
    //   ) {
    //     return;
    //   } else {
    //     var newValue = state[0].change.toLowerCase();
    //     var header = dat[newVar].toLowerCase();

    //     if (dat.hasOwnProperty(newVar)) {
    //       if (header.includes(newValue)) {
    //         dataFiltered.push(dat);
    //       }
    //     }
    //   }
    setFilterShow(false);
    // });
    handleApplyFilter();
  };

  const handleChange = (field, i, e) => {
    // if(field === 'column'){
    //     setFind([{['value']:e.value}])
    // }

    console.log(field, i, e);
    let search = state;
    console.log(state, "the one that copied");

    if (
      field === "change" ||
      field === "startAmount" ||
      field === "endAmount"
    ) {
      console.log(e.target.value, "target value");
      let search = state;
      console.log(search, "search search 1");
      search[i][field] = e.target.value;
      console.log(search, "search search");
      setstate(search);
      dispatch({ type: actionTypes.SET_FILTER, payload: search });
      setRender(Math.random());
    } else {
      let temp = state;
      temp[i][field] = e.value;
      if (field === "select" && e.value === "is empty") {
        temp[i]["change"] = "";
      }
      setstate(temp);
      setRender(Math.random());
    }
  };
  useEffect(() => {
    setObject(state);
    setRender(Math.random());
    dispatch({ type: actionTypes.SET_FILTER, payload: state });
  }, [state]);

  function handleDelete(i) {
    const temp = state;

    // console.log(temp,'before slice')
    const newarr = temp.filter((val, ix) => ix !== i);
    // console.log(newarr,'newarraty')
    setstate(newarr);
    setFilter(false);
    // SetConfirmFilClose(false)
    dispatch({ type: actionTypes.SET_FILTER, payload: newarr });
    // handleApplyFilter()
    // console.log(temp.filter((item) => item.id !== i),'after slice')
    // console.log(temp.splice(i,1),'after slice')
    if (newarr.length == 0) {
      setFilterShow(false);
    }
  }

  function handleNew() {
    setstate((oldArray) => [
      ...oldArray,
      { column: "", select: "", change: "", startAmount: "", endAmount: "" },
    ]);
    // SetConfirmFilClose(false)
    setFilter(true);
    dispatch({ type: actionTypes.SET_FILTER, payload: [] });
  }

  const amountFilter = () => {
    // const start_amount = value.startAmount;
    // const end_amount = value.endAmount;
    // console.log(start_amount);
    // console.log(end_amount);
    // console.log(tableData);
    // const dataFiltered =[]
    // var newArray = tableData.filter(function (dat) {
    // if( start_amount !== "" || end_amount !=="" ){
    //     if(dat.net_adjusted_amount >= start_amount && dat.net_adjusted_amount <= end_amount){
    //         return {dat};
    //     }
    // }
    // })
    // dataFiltered.push(...newArray)
    // console.log(dataFiltered);
    // setFilterShow(false)
    // handleApplyFilter()
    // const auth = localStorage.getItem('auth_token')
    // let headers = {
    //     'x-auth-token' : auth,
    //     'Content-Type' : 'application/json'
    // }
    // axios.post(`api/v1/conventional-mode/filter-amount`,fb,{headers})
    // .then(response => {
    //     console.log(response,'response')
    //   })
    //   .catch(error =>{
    //       console.log(error.response,'error')
    //       swal("",error.response.data.error, "error")
    //   }
    //     )
  };

  if (!show) return null;

  console.log(state);

  return (
    <>
      <div style={popup}>
        {state.map((val, i) => {
          // console.log(val.change,'56666666566565656565')
          const last = state.length - 1;
          const istrue = true;
          return (
            <div style={flexContainer} key={i}>
              {i === state.length - 1 ? (
                <div
                  style={close}
                  onClick={() => {
                    handleDelete(i);
                  }}
                >
                  <img src={cross} style={{ transform: "scale(0.75)" }} />
                </div>
              ) : (
                <div style={noClose}>
                  <img src={cross} style={{ transform: "scale(0.75)" }} />
                </div>
              )}
              {i === 0 ? (
                <div style={textBox}>
                  <p style={text}>where</p>
                </div>
              ) : (
                <div style={textBox}>
                  <p style={text}>as</p>
                </div>
              )}

              <div style={field}>
                <Select
                  value={columnName.filter(function (option) {
                    return option.value === val.column;
                  })}
                  options={columnName}
                  // disabled="true"
                  // isOptionDisabled= {istrue}
                  onChange={(e) => handleChange("column", i, e)}
                  placeholder="field"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "6px",
                    colors: {
                      ...theme.colors,
                      backgroundColor: "white",
                      primary25: "#03565a98",
                      primary: "#03565A",
                    },
                  })}
                />
                {/* <Form.Control size="lg"  as='select' value={val.column} onChange={(e) => handleChange('column',i,e) }>
                    <option key = 'blankChoice' hidden value>select</option>
                    { opte.map((opt,ix)=>{
                        console.log(Name,'inside ledger code')
                        console.log(Name.LedgerCode,'inledger code')
                        return(
                        <option key={ix}>{opt}</option>
                        )
                    })}
                </Form.Control> */}
              </div>

              {val.column === "ledger_name" || val.column === "ledger_code" ? (
                <React.Fragment>
                  <div style={contains}>
                    <Select
                      value={type.filter(function (option) {
                        return option.value === val.select;
                      })}
                      //   {state[i].select}
                      options={type}
                      onChange={(e) => handleChange("select", i, e)}
                      placeholder="Select"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: "6px",
                        colors: {
                          ...theme.colors,
                          backgroundColor: "white",
                          primary25: "#03565a98",
                          primary: "#03565A",
                        },
                      })}
                    />
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}

              {val.column !== "ledger_code" && val.column !== "ledger_name" && (
                <React.Fragment>
                  <div style={contains}>
                    <Select
                      value={finalAmountOptions.filter(function (option) {
                        return option.value === val.select;
                      })}
                      //   {state[i].select}
                      options={finalAmountOptions}
                      onChange={(e) => handleChange("select", i, e)}
                      placeholder="Select"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: "6px",
                        colors: {
                          ...theme.colors,
                          backgroundColor: "white",
                          primary25: "#03565a98",
                          primary: "#03565A",
                        },
                      })}
                    />
                  </div>
                </React.Fragment>
              )}

              {val.column === "ledger_code" || val.column === "ledger_name" ? (
                <div style={inputs}>
                  {val.select === "is empty" ? (
                    <input
                      style={input}
                      value={val.change}
                      disabled={true}
                      onChange={(e) => handleChange("change", i, e)}
                    />
                  ) : (
                    <input
                      style={input}
                      value={val.change}
                      //  disabled = {true}
                      onChange={(e) => handleChange("change", i, e)}
                    />
                  )}
                </div>
              ) : (
                ""
              )}

              {val.column !== "ledger_code" &&
              val.column !== "ledger_name" &&
              val.select === "Equal to" ? (
                <React.Fragment>
                  <div style={inputs}>
                    <input
                      placeholder="Amount"
                      name=""
                      value={val.startAmount}
                      style={input}
                      onChange={(e) => handleChange("startAmount", i, e)}
                    ></input>
                  </div>
                </React.Fragment>
              ) : val.column !== "ledger_code" &&
                val.column !== "ledger_name" &&
                val.select === "Greater than" ? (
                <React.Fragment>
                  <div style={inputs}>
                    <input
                      placeholder="Amount"
                      name=""
                      value={val.startAmount}
                      style={input}
                      onChange={(e) => handleChange("startAmount", i, e)}
                    ></input>
                  </div>
                  {/* <div style={inputs}>
                      <input
                        placeholder="Amount"
                        name=""
                        value={val.endAmount}
                        style={input}
                        onChange={(e) => handleChange("endAmount", i, e)}
                      ></input>
                    </div> */}
                </React.Fragment>
              ) : val.column !== "ledger_code" &&
                val.column !== "ledger_name" &&
                val.select === "Less than" ? (
                <React.Fragment>
                  <div style={inputs}>
                    <input
                      placeholder="Amount"
                      name=""
                      value={val.startAmount}
                      style={input}
                      onChange={(e) => handleChange("startAmount", i, e)}
                    ></input>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )}

              {i === state.length - 1 ? (
                <div style={search} onClick={handleFilter}>
                  <img src={arrow} />
                </div>
              ) : (
                <div style={noSearch} onClick={(e) => e.preventDefault}>
                  <img src={arrow} />
                </div>
              )}
            </div>
          );
        })}

       
        {!isFilter && (
          <div style={addFilter}>
            <img
              alt="plus"
              src={plus}
              style={{ marginRight: "5px" }}
              onClick={() => {
                handleNew();
              }}
            />
            Add Filter
          </div>
        )}
      </div>
    </>
  );
}
