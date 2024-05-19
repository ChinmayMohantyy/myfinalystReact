import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import { motion, transform } from "framer-motion";
import tick from "../../assets/confirmTb.svg";
import uploadFile from "../../assets/fileFormat.svg";

const UploadMethod = (props) => {
  const screen = {
    width: "100%",
    height: "100%",
    position: "fixed",
    zIndex: "999",
    backgroundColor: "#00000099",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };
  const container = {
    // minHeight:'60vh',
    borderRadius: "10px",
    maxHeight: "90vh",
    minWidth: "560px",
    padding: "2rem 3rem",
    zIndex: "15",
    backgroundColor: "white",
  };

  const head = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "3rem",
  };

  const header = {
    fontSize: "2.2rem",
    fontWeight: "700",
  };
  const center = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const card = {
    borderRadius: "6px",
    border: "2px solid lightGrey",
    width: "13rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "8rem",
    padding: "2rem",
    cursor: "pointer",
  };

  function handleSelectMethod(txt) {
    props.setUploadMethod(false);
    props.setViewFormat(true);
    props.setMethod(txt);
  }

  return (
    <motion.div
      style={screen}
      className="screenDiv"
      // onClick={handleClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <div style={{display:'flex',flexDirection:'column'}}> */}
      <motion.div
        style={container}
        className="col-md-4 col-sm-6"
        initial={{ y: "-5vh" }}
        animate={{ y: 0 }}
      >
        <div style={center}>
          <h3 style={header}>Choose One</h3>
        </div>
        <div style={head}>
          <div
            style={card}
            onClick={() => {
              handleSelectMethod("MultiFile");
            }}
          >
            <p style={{ textAlign: "center" }}>
              Upload as Multiple excel files
            </p>
          </div>
          <div
            style={card}
            onClick={() => {
              handleSelectMethod("MultiSheet");
            }}
          >
            <p style={{ textAlign: "center" }}>
              Upload as Multiple excel Sheets
            </p>
          </div>
        </div>
        <div style={{ display: "flex", padding: "0 1rem" }}>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "var(--clr-accent)",
              textAlign: "center",
            }}
          >
            {" "}
            <i
              class="fas fa-info-circle"
              style={{ color: "var(--clr-accent)" }}
            ></i>{" "}
            Make sure only one sheet is present if one file is uploaded at a
            time
          </p>
        </div>
      </motion.div>
      {/* </div> */}
    </motion.div>
  );
};

export default UploadMethod;
