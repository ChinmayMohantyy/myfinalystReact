import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../redux/actionTypes";
import swal from "sweetalert";
import styled from "styled-components";

const popup = {
  display: "flex",
  position: "fixed",
  top: "28%",
  height: "10rem",
  width: "30%",
  backgroundColor: "#F1F2F5",
  zIndex: "10",
  left: "34%",
  borderRadius: "6px",
  boxShadow: "4px 6px 8px 0px #C0C0C060",
  padding: "2rem",
  justifyContent: "center",
  flexDirection: "column",
};
const popup2 = {
  position: "fixed",
  top: "123px",
  minHeight: "10rem",
  width: "15.5%",
  backgroundColor: "#F1F2F5",
  zIndex: "10",
  left: "2%",
  borderRadius: "6px",
  boxShadow: "4px 6px 8px 0px #C0C0C060",
  minWidth: "185px",
};

const header = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "2rem",
  fontSize: "1rem",
  fontWeight: "600",
  textAlign: "center",
};

const select = {
  display: "flex",
  // justifyContent:'flex-end',
  justifyContent: "space-around",
};

const button = {
  height: "2rem",
  width: "3rem",
  backgroundColor: "rgba(207, 7, 7, 0.815)",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  cursor: "pointer",
};
const button2 = {
  height: "2rem",
  width: "3rem",
  color: "white",
  backgroundColor: "var(--clr-accent)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px",
  cursor: "pointer",
  marginLeft: "1rem",
};

// const options ={
//     width:'100%',
//     // padding:'10px',
//     display:'flex',
//     flexDirection:'column'
// }

const cont = {
  display: "flex",
  flexDirection: "column",
  paddingTop: "20px",
};

const menuPara = {
  marginBottom: "5px",
  cursor: "pointer",

  // alignSelf:'flex-start'
};

const Options = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: ease-out 0.05s;

  &:hover {
    background-color: #03565a;
    /* height:3.5rem; */
    opacity: 1;
    color: white;
    /* border: 3px solid black; */
    border-radius: 10px;
    transform: scale(1.05);
    box-shadow: 1px 1.5px 12px grey;
  }

  &:hover:after {
    content: "";
  }
`;

const DeleteSelected = (props) => {
  const dispatch = useDispatch();

  function handleClick() {
    console.log(props, "clicked red");
    props.setConfirmDelete(false);
  }

  function handleSelect(type) {
    console.log("kakakakakakak", type);

    if (type === "Delete Record") {
      // props.setConfirmation(true)
      // props.setConfirmationMenu(type)
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will be able to view deleted logs in the deleted items menu",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let row = props.select;
          console.log(row[0].tb_id, row[0].lid, "clicked red");
          const auth = localStorage.getItem("auth_token");
          const project_id = localStorage.getItem("project_id");
          let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
          };

          axios
            .delete(`api/v1/conventional-mode/delete/${project_id}`, {
              headers: headers,
              data: { row },
            })
            .then((response) => {
              console.log(
                response.data,
                " delete response ---------------------------------"
              );
              props.fetchConvential();
              props.setDeleteRow(true);
              // dispatch({
              //   type: actionTypes.SET_DELET_ROW,
              //   payload: element,
              // });
              //   dispatch(setCartAdded(response.data.product))
            })
            .catch((error) => {
              console.log(error.response, "error");
            });

          swal("Ledger has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Ledger not deleted!");
        }
      });
    }
    if (type === "Insert Record Above") {
      props.setAddLedgerAbove(true);
    }
    if (type === "Insert Record Below") {
      props.setAddLedgerBelow(true);
    }
    if (type === "Expand Record") {
      props.setExpandLedger(true);
    }
    props.setConfirmDelete(false);
  }

  const data = props.select;
  console.log(data, "this is adata llllllllllllllllllllll");
  if (data.length === 1) {
    return (
      <div style={popup2}>
        <div style={cont}>
          {/* <Options
            onClick={() => {
              handleSelect("Insert Record Above");
            }}
          >
            Insert Record Above
          </Options>
          <Options
            onClick={() => {
              handleSelect("Insert Record Below");
            }}
          >
            Insert Record Below
          </Options> */}
          {/* <Options onClick={()=>{handleSelect('Duplicate Record')}}>Duplicate Record</Options> */}
          {/* <Options
            onClick={() => {
              handleSelect("Expand Record");
            }}
          >
            Expand Record
          </Options> */}
          <Options
            onClick={() => {
              handleSelect("Delete Record");
            }}
          >
            Delete Record
          </Options>
          {/* <Options></Options> */}
          {/* <p style={menuPara}>Insert Record Above</p>
                <p style={menuPara}>Insert Record Below</p>
                <p style={menuPara}>Duplicate Record</p>
                <p style={menuPara}>Expand Record</p>
                <p style={menuPara}>Delete Record</p>
                 <div style={button} onClick={handleClick}>
                    No
                </div>
                <div style={button2}onClick={console.log('clicked yes')}>
                    yes
                </div> */}
        </div>
      </div>
    );
  }

  return (
    <div style={popup2}>
      <div style={cont}>
        {/* <Options
          onClick={() => {
            handleSelect("Expand Record");
          }}
        >
          Expand Record
        </Options> */}
        <Options
          onClick={() => {
            handleSelect("Delete Record");
          }}
        >
          Delete Record
        </Options>
        
      </div>
    </div>
  );
};

export default DeleteSelected;
