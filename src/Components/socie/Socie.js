import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../services/socket/socket";
import * as actionTypes from "../../redux/actionTypes";
import dateFormat from "dateformat";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const input = {
  height: "100%",
  width: "100%",
  border: "none",
  textAlign: "end",
  background: "transparent",
  paddingLeft: "10px",
};
const heading = {
  color: "var(--clr-accent)",
  fontWeight: "700",
};

const Socie = (props) => {
  const [row, setRow] = useState([]);
  const [previousRow, setPreviousRow] = useState([]);
  const [currentRow, setCurrentRow] = useState([]);
  const [statement, setStatements] = useState([]);
  const [fotterdata, setFooterData] = useState("");

  const TB_ID = useSelector((initialState) => initialState.reducer.tb_id);
  const auth = localStorage.getItem("auth_token");
  const project_id = localStorage.getItem("project_id");
  console.log(row, "row row here error");
  let headers = {
    "x-auth-token": auth,
  };
  useEffect(() => {
    axios
      .get(`/api/v1/socie/fetch-socie/${project_id}/${TB_ID}`, { headers })
      .then((response) => {
        console.log(
          response.data.socie_list[0],
          "socie response  socie response"
        );
        console.log(response.data, "socie response  socie response");
        setPreviousRow(response.data.socie_list[0].previous_row_header);
        setCurrentRow(response.data.socie_list[0].current_row_header);
        // setRow(response.data.socie_list[0]);
      })
      .catch((error) => {
        console.log(error.response, "here error");
      });

    getValues();
    getFooter();
  }, []);

  const getValues = () => {
    axios
      .get(`/api/v1/pnl/generate-pnl/${project_id}/${TB_ID}`, { headers })
      .then((response) => {
        console.log(response, "response response");
        console.log(response.data.pnl_statement, "response response");
        setStatements(response.data.pnl_statement);
      })
      .catch((error) => {
        console.log(error.response, "error");
      });
  };

  function handleChange(e, i) {
    const newArray = previousRow.map((item, index) => {
      if (i === index) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });

    setPreviousRow(newArray);

    // const content = {};
    // content.row_header = data["row_header"];
    // content._id = data["_id"];
    // content["Equity component of compound financial instruments"] =
    //   data["Equity component of compound financial instruments"];
    // content["Securities premium"] = data["Securities premium"];
    // content["Retained earnings"] = data["Retained earnings"];
    // content["Debenture redemption reserve"] =
    //   data["Debenture redemption reserve"];
    // content["Share options outstanding account"] =
    //   data["Share options outstanding account"];
    // content["FVOCI - Equity investments"] = data["FVOCI - Equity investments"];
    // content["Cashflow hedging reserve"] = data["Cashflow hedging reserve"];
    // content["Costs of hedging reserve"] = data["Costs of hedging reserve"];
    // content["Foreign currency translation reserve"] =
    //   data["Foreign currency translation reserve"];
    // content["Non Controlling Interests"] = data["Non Controlling Interests"];
    // content[field] = e.target.value;
    // console.log(content, "content here ");
    // console.log(content,'content')
    // socket.emit("notes-auto-save", {
    //   project_id: `${project_id}`,
    //   tb_id: `${TB_ID}`,
    //   nlid: `${nid}`,
    //   contents: content,
    // });
    socket.emit("socie-auto-save", {
      project_id: `${project_id}`,
      tb_id: `${TB_ID}`,
      previous_row_header: newArray,
      current_row_header: currentRow,
    });
  }

  function handleCurrentChange(e, i) {
    const newArray = currentRow.map((item, index) => {
      if (i === index) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });

    setCurrentRow(newArray);

    // const content = {};
    // content.row_header = data["row_header"];
    // content._id = data["_id"];
    // content["Equity component of compound financial instruments"] =
    //   data["Equity component of compound financial instruments"];
    // content["Securities premium"] = data["Securities premium"];
    // content["Retained earnings"] = data["Retained earnings"];
    // content["Debenture redemption reserve"] =
    //   data["Debenture redemption reserve"];
    // content["Share options outstanding account"] =
    //   data["Share options outstanding account"];
    // content["FVOCI - Equity investments"] = data["FVOCI - Equity investments"];
    // content["Cashflow hedging reserve"] = data["Cashflow hedging reserve"];
    // content["Costs of hedging reserve"] = data["Costs of hedging reserve"];
    // content["Foreign currency translation reserve"] =
    //   data["Foreign currency translation reserve"];
    // content["Non Controlling Interests"] = data["Non Controlling Interests"];
    // content[field] = e.target.value;
    // console.log(content, "content here ");
    // console.log(content,'content')
    // socket.emit("notes-auto-save", {
    //   project_id: `${project_id}`,
    //   tb_id: `${TB_ID}`,
    //   nlid: `${nid}`,
    //   contents: content,
    // });
    socket.emit("socie-auto-save", {
      project_id: `${project_id}`,
      tb_id: `${TB_ID}`,
      previous_row_header: previousRow,
      current_row_header: newArray,
    });
  }
  socket.on("on-socie-autosave", (data) => {
    console.log("{USER LOGGED IN 1}", data);
    // if (data.updateSocie) {
    //   setPreviousRow(data.updateSocie);
    // }
  });

  console.log(row, "Rows");

  let grandTotal = 0;
  let currentGrandTotal = 0;
  let profitIncome = Number(props.currentProfit) + Number(props.comProfit);

  console.log(statement["Other Comprehensive Income"]);

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
      name: "socie",
      footer_name: val,
    };
    axios
      .post(`/api/v1/pnl/save-footer-socie/${project_id}`, data, { headers })
      .then((response) => {
        console.log(response.data, "KKK111");
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
        console.log(response.data, "KKK22");
        // setRows(response.data.balance_sheet);
        console.log(response.data.getFooter[0], "11111111111111111111111111");

        if (response.data.getFooter[0].footer_socie.name === "socie") {
          setFooterData(response.data.getFooter[0].footer_socie.footer_name);
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
      <table>
        <thead style={{ fontSize: "2rem" }}>
          <tr>
            <th
              style={{
                width: "25%",
                maxWidth: "25%",
                height: "62px",
                textAlign: "left",
                paddingLeft: "1rem",
              }}
              rowSpan={2}
            >
              OTHER EQUITY
            </th>
            <th style={{ width: "10%", maxWidth: "9%" }} rowSpan={2}>
              Equity component of compound financial instruments
            </th>
            <th style={{ width: "25%", maxWidth: "20%" }} colSpan={4}>
              Reserves and surplus
            </th>
            <th style={{ width: "25%", maxWidth: "20%" }} colSpan={4}>
              other reserves
            </th>
            <th
              style={{
                width: "8%",
                maxWidth: "15%",
                textAlign: "left",
                paddingLeft: "1rem",
              }}
              rowSpan={2}
            >
              Non controlling Interests
            </th>
            <th
              style={{
                width: "7%",
                maxWidth: "15%",
                textAlign: "left",
                paddingLeft: "1rem",
              }}
              rowSpan={2}
            >
              Total
            </th>
          </tr>
          <tr>
            <th style={{}}>Securities Premium</th>
            <th style={{}}>Retained earnings</th>
            <th style={{}}>Debuntures redemption reserve</th>
            <th style={{}}>share options outstanding account</th>
            <th style={{}}>FVOCI - Equity investments</th>
            <th style={{}}>Cashflow hedging reserve</th>
            <th style={{}}>Cost of hedging reserve</th>
            <th style={{}}>Foreign currency translation</th>
          </tr>
        </thead>
        <tbody>
          <div style={{ marginLeft: "1rem" }}>
            <p style={heading}>previous year</p>
          </div>
          {previousRow &&
            previousRow.map((line, index) => {
              // line.map((item)=>{
              const row = Object.assign({}, line);
              delete row["_id"];
              delete row["row_header"];
              console.log(row);
              function sum(obj) {
                return Object.keys(obj).reduce(
                  (sum, key) => sum + parseInt(obj[key] || 0),
                  0
                );
              }
              console.log(sum(row), "item item item item tiem");
              console.log(line, "Line item");

              // })
              const total = sum(row);
              grandTotal = grandTotal + total;
              return (
                <React.Fragment>
                  {index < 2 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Securities premium"]}
                          style={input}
                          name="Securities premium"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Retained earnings"]}
                          style={input}
                          name="Retained earnings"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Debenture redemption reserve"]}
                          style={input}
                          name="Debenture redemption reserve"
                          onChange={(e) => {
                            handleChange(e, index);
                            // handleChange(e, line, "Debenture redemption reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Share options outstanding account"]}
                          style={input}
                          name="Share options outstanding account"
                          onChange={(e) => {
                            handleChange(e, index);
                            // handleChange(
                            //   e,
                            //   line,
                            //   "Share options outstanding account"
                            // );
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["FVOCI - Equity investments"]}
                          style={input}
                          name="FVOCI - Equity investments"
                          onChange={(e) => {
                            handleChange(e, index);
                            // handleChange(e, line, "FVOCI - Equity investments");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Cashflow hedging reserve"]}
                          style={input}
                          name="Cashflow hedging reserve"
                          onChange={(e) => {
                            handleChange(e, index);

                            // handleChange(e, line, "Cashflow hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Costs of hedging reserve"]}
                          style={input}
                          name="Costs of hedging reserve"
                          onChange={(e) => {
                            handleChange(e, index);
                            // handleChange(e, line, "Costs of hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Foreign currency translation reserve"]}
                          style={input}
                          name="Foreign currency translation reserve"
                          onChange={(e) => {
                            handleChange(e, index);

                            // handleChange(
                            //   e,
                            //   line,
                            //   "Foreign currency translation reserve"
                            // );
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Non Controlling Interests"]}
                          style={input}
                          name="Non Controlling Interests"
                          onChange={(e) => {
                            handleChange(e, index);

                            // handleChange(e, line, "Non Controlling Interests");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 1 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Restated balance at{" "}
                        {dateFormat(
                          props.projectData.previous_year,
                          "mmmm dS, yyyy"
                        )}
                      </td>
                      <td style={{}}>--</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[0]["Securities premium"]) +
                          Number(previousRow[1]["Securities premium"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[0]["Retained earnings"]) +
                          Number(previousRow[1]["Retained earnings"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          previousRow[0]["Debenture redemption reserve"]
                        ) +
                          Number(
                            previousRow[1]["Debenture redemption reserve"]
                          )}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          previousRow[0]["Share options outstanding account"]
                        ) +
                          Number(
                            previousRow[1]["Share options outstanding account"]
                          )}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[0]["FVOCI - Equity investments"]) +
                          Number(previousRow[1]["FVOCI - Equity investments"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[0]["Cashflow hedging reserve"]) +
                          Number(previousRow[1]["Cashflow hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[0]["Costs of hedging reserve"]) +
                          Number(previousRow[1]["Costs of hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          previousRow[0]["Foreign currency translation reserve"]
                        ) +
                          Number(
                            previousRow[1][
                              "Foreign currency translation reserve"
                            ]
                          )}
                      </td>
                      <td style={{ paddingLeft: "90px" }}>
                        {Number(previousRow[0]["Non Controlling Interests"]) +
                          Number(previousRow[1]["Non Controlling Interests"])}
                      </td>
                      <td style={{}}>{grandTotal}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 2 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {props.currentProfit.toLocaleString("en-IN")}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>
                        {props.currentProfit.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 3 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {props.comProfit.toLocaleString("en-IN")}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][0].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other  er Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][1].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? (
                              props.comProfit +
                              Number(
                                statement["Other Comprehensive Income"][0].cy
                              ) +
                              Number(
                                statement["Other Comprehensive Income"][1].cy
                              )
                            ).toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 4 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Total Comprehensive income for the year
                      </td>
                      <td>--</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {(
                          Number(props.currentProfit) + Number(props.comProfit)
                        ).toLocaleString("en-IN")}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][0].cy.toLocaleString("en-IN")
                          : "-"}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][1].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{}}>{profitIncome.toLocaleString("en-IN")}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 4 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Cashflow hedging reserve"]}
                          style={input}
                          name="Cashflow hedging reserve"
                          onChange={(e) => {
                            handleChange(e, index);

                            // handleChange(e, line, "Cashflow hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Costs of hedging reserve"]}
                          style={input}
                          name="Costs of hedging reserve"
                          onChange={(e) => {
                            handleChange(e, index);
                            // handleChange(e, line, "Costs of hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 4 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Transactions with owners in their capacity as owners
                      </td>
                      <td>--</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[4]["Cashflow hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[4]["Costs of hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{}}>{total.toLocaleString("en-IN")}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 5 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Securities premium"]}
                          style={input}
                          name="Securities premium"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 6 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Retained earnings"]}
                          style={input}
                          name="Retained earnings"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 7 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Retained earnings"]}
                          style={input}
                          name="Retained earnings"
                          onChange={(e) => {
                            handleChange(e, index);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 8 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Share options outstanding account"]}
                          style={input}
                          name="Share options outstanding account"
                          onChange={(e) => {
                            handleChange(e, index);
                            // handleChange(
                            //   e,
                            //   line,
                            //   "Share options outstanding account"
                            // );
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {index === 9 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        &nbsp;
                        {/* {line["row_header"]} */}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[5]["Securities premium"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(previousRow[6]["Retained earnings"]) +
                          Number(previousRow[7]["Retained earnings"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          previousRow[8]["Share options outstanding account"]
                        )}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>
                        {Number(previousRow[5]["Securities premium"]) +
                          Number(previousRow[6]["Retained earnings"]) +
                          Number(previousRow[7]["Retained earnings"]) +
                          Number(
                            previousRow[8]["Share options outstanding account"]
                          )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })}
          <div style={{ marginLeft: "1rem" }}>
            <p style={heading}>current year</p>
          </div>
          {currentRow &&
            currentRow.map((line, i) => {
              // line.map((item)=>{
              const row = Object.assign({}, line);
              delete row["_id"];
              delete row["row_header"];
              console.log(row);
              function sum(obj) {
                return Object.keys(obj).reduce(
                  (sum, key) => sum + parseInt(obj[key] || 0),
                  0
                );
              }
              console.log(sum(row), "item item item item tiem");
              // })
              const total = sum(row);
              currentGrandTotal = currentGrandTotal + total;
              return (
                <React.Fragment>
                  {i < 2 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Securities premium"]}
                          style={input}
                          name="Securities premium"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Retained earnings"]}
                          style={input}
                          name="Retained earnings"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Debenture redemption reserve"]}
                          style={input}
                          name="Debenture redemption reserve"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                            // handleChange(e, line, "Debenture redemption reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Share options outstanding account"]}
                          style={input}
                          name="Share options outstanding account"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                            // handleChange(
                            //   e,
                            //   line,
                            //   "Share options outstanding account"
                            // );
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["FVOCI - Equity investments"]}
                          style={input}
                          name="FVOCI - Equity investments"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                            // handleChange(e, line, "FVOCI - Equity investments");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Cashflow hedging reserve"]}
                          style={input}
                          name="Cashflow hedging reserve"
                          onChange={(e) => {
                            handleCurrentChange(e, i);

                            // handleChange(e, line, "Cashflow hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Costs of hedging reserve"]}
                          style={input}
                          name="Costs of hedging reserve"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                            // handleChange(e, line, "Costs of hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Foreign currency translation reserve"]}
                          style={input}
                          name="Foreign currency translation reserve"
                          onChange={(e) => {
                            handleCurrentChange(e, i);

                            // handleChange(
                            //   e,
                            //   line,
                            //   "Foreign currency translation reserve"
                            // );
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{}}>
                        <input
                          type="number"
                          value={line["Non Controlling Interests"]}
                          style={input}
                          name="Non Controlling Interests"
                          onChange={(e) => {
                            handleCurrentChange(e, i);

                            // handleChange(e, line, "Non Controlling Interests");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 1 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Restated balance at{" "}
                        {dateFormat(
                          props.projectData.current_year,
                          "mmmm dS, yyyy"
                        )}
                      </td>
                      <td style={{}}>--</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[0]["Securities premium"]) +
                          Number(currentRow[1]["Securities premium"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[0]["Retained earnings"]) +
                          Number(currentRow[1]["Retained earnings"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[0]["Debenture redemption reserve"]) +
                          Number(currentRow[1]["Debenture redemption reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          currentRow[0]["Share options outstanding account"]
                        ) +
                          Number(
                            currentRow[1]["Share options outstanding account"]
                          )}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[0]["FVOCI - Equity investments"]) +
                          Number(currentRow[1]["FVOCI - Equity investments"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[0]["Cashflow hedging reserve"]) +
                          Number(currentRow[1]["Cashflow hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[0]["Costs of hedging reserve"]) +
                          Number(currentRow[1]["Costs of hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          currentRow[0]["Foreign currency translation reserve"]
                        ) +
                          Number(
                            currentRow[1][
                              "Foreign currency translation reserve"
                            ]
                          )}
                      </td>
                      <td style={{ paddingLeft: "90px" }}>
                        {Number(currentRow[0]["Non Controlling Interests"]) +
                          Number(currentRow[1]["Non Controlling Interests"])}
                      </td>
                      <td style={{}}>{currentGrandTotal}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 2 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {props.currentYearProfit.toLocaleString("en-IN")}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>
                        {props.currentYearProfit.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 3 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {props.comYearProfit.toLocaleString("en-IN")}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][0].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][1].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? (
                              props.comYearProfit +
                              Number(
                                statement["Other Comprehensive Income"][0].cy
                              ) +
                              Number(
                                statement["Other Comprehensive Income"][1].cy
                              )
                            ).toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 4 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Total Comprehensive income for the year
                      </td>
                      <td>--</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {(
                          Number(props.comYearProfit) +
                          Number(props.comYearProfit)
                        ).toLocaleString("en-IN")}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][0].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {/* {statement["Other Comprehensive Income"]
                          ? statement[
                              "Other Comprehensive Income"
                            ][1].cy.toLocaleString("en-IN")
                          : "-"} */}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{}}>{profitIncome.toLocaleString("en-IN")}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 4 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Cashflow hedging reserve"]}
                          style={input}
                          name="Cashflow hedging reserve"
                          onChange={(e) => {
                            handleCurrentChange(e, i);

                            // handleChange(e, line, "Cashflow hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Costs of hedging reserve"]}
                          style={input}
                          name="Costs of hedging reserve"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                            // handleChange(e, line, "Costs of hedging reserve");
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 4 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Transactions with owners in their capacity as owners
                      </td>
                      <td>--</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[4]["Cashflow hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[4]["Costs of hedging reserve"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{}}>{total.toLocaleString("en-IN")}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 5 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Securities premium"]}
                          style={input}
                          name="Securities premium"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 6 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Retained earnings"]}
                          style={input}
                          name="Retained earnings"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 7 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Retained earnings"]}
                          style={input}
                          name="Retained earnings"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 8 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {line["row_header"]}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        <input
                          type="number"
                          value={line["Share options outstanding account"]}
                          style={input}
                          name="Share options outstanding account"
                          onChange={(e) => {
                            handleCurrentChange(e, i);
                            // handleChange(
                            //   e,
                            //   line,
                            //   "Share options outstanding account"
                            // );
                          }}
                          onBlur={() => {
                            // handleLeave()
                            console.log("youre out");
                          }}
                        />
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>{total}</td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {i === 9 ? (
                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          paddingLeft: "10px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        &nbsp;
                        {/* {line["row_header"]} */}
                      </td>
                      <td style={{}}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[5]["Securities premium"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(currentRow[6]["Retained earnings"]) +
                          Number(currentRow[7]["Retained earnings"])}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>
                        {Number(
                          currentRow[8]["Share options outstanding account"]
                        )}
                      </td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "45px" }}>-</td>
                      <td style={{ paddingLeft: "90px" }}>-</td>
                      <td style={{ fontWeight: "600" }}>
                        {Number(currentRow[5]["Securities premium"]) +
                          Number(currentRow[6]["Retained earnings"]) +
                          Number(currentRow[7]["Retained earnings"]) +
                          Number(
                            currentRow[8]["Share options outstanding account"]
                          )}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
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
    </>
  );
};

export default Socie;
