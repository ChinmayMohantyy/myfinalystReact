import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import * as actionTypes from "../../redux/actionTypes";
import "./previewCard.css";
import financialAsset from "../../assets/financialAsset.svg";
import arrow from "../../assets/arrowGreen.svg";

const buttonArrow = {
  backgroundColor: "#D1E0E0",
  width: "30px",
  height: "30px",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: "auto",
  // position:'absolute',
  // bottom:'10%',
  // right:'10%'
};

const Header = {
  marginTop: "10px",
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "2rem",
};

const amount = {
  display: "flex",
  alignItems: "center",
  height: "1rem",
  margin: "1rem 0",
};

const paraAmount = {
  color: "#4F4F4F",
  fontSize: "16px",
  fontWeight: "bold",
};

const actualAmount = {
  color: "#4F4F4F",
  fontSize: "14px",
  fontWeight: "normal",
  display: "flex",

  // marginTop:'1rem'
};

const block = {
  display: "flex",
  flexDirection: "column",
};

const PreviewCard = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  console.log(props.data);
  console.log(props.name);
  let data = props.data;

  console.log(data);

  const py = data.reduce((totalPy, i) => totalPy + i.py, 0);
  const cy = data.reduce((totalCy, i) => totalCy + i.cy, 0);

  //   const py = data.reduce(
  //     (totalPy, i) =>
  //       totalPy + i.fs_grp === "Revenue" ||
  //       i.fs_grp === "Shareholder Funds" ||
  //       i.fs_grp === "Non Current Liabilities" ||
  //       i.fs_grp === "Current Liabilities"
  //         ? i.py * -1
  //         : i.py,

  //     0
  //   );
  //   const cy = data.reduce(
  //     (totalCy, i) =>
  //       totalCy + i.fs_grp === "Revenue" ||
  //       i.fs_grp === "Shareholder Funds" ||
  //       i.fs_grp === "Non Current Liabilities" ||
  //       i.fs_grp === "Current Liabilities"
  //         ? i.cy * -1
  //         : i.cy,

  //     0
  //   );

  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  function handlePreview() {
    // console.log(props.data,'dsdsdsdsdsdsdsdsdsdsds')
    history.push("/PreviewPage");
    dispatch({ type: actionTypes.SET_CLASSIFICATION, payload: props.data });
    dispatch({ type: actionTypes.SET_CLASSIFICATIONNAME, payload: props.name });
  }

  return (
    <motion.div
      className="previewCard"
      onClick={() => {
        handlePreview();
      }}
      whileHover={{
        scale: 1.02,
        // transition: { duration: 0.1 },
      }}
    >
      <div>
        <img src={financialAsset} />
      </div>
      <div style={Header}>{props.name}</div>
      <div style={block}>
        <div style={amount}>
          <p style={paraAmount}>
            Current Year:
            <span style={actualAmount}>
              {props.name === "Revenue" ||
              props.name === "Shareholder Funds" ||
              props.name === "Non Current Liabilities" ||
              props.name === "Current Liabilities"
                ? numberFormat(cy * -1)
                : numberFormat(cy)}
            </span>
          </p>
        </div>
        <div style={amount}>
          <p style={paraAmount}>
            Previous Year:
            <span style={actualAmount}>
              {props.name === "Revenue" ||
              props.name === "Shareholder Funds" ||
              props.name === "Non Current Liabilities" ||
              props.name === "Current Liabilities"
                ? numberFormat(py * -1)
                : numberFormat(py)}
              {/* {numberFormat(py)} */}
            </span>
          </p>
        </div>
      </div>
      <div>
        <div style={buttonArrow}>
          <img src={arrow} />
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewCard;
