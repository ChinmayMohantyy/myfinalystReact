import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../redux/actionTypes";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";
import Tooltip from "@material-ui/core/Tooltip";
import { logout } from "../authentication/authUtilities";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
// import PersonAdd from '@material-ui/icons/PersonAdd';
// import Settings from '@material-ui/icons/Settings';
// import Logout from '@material-ui/icons/Logout';

import styled from "styled-components";
import { Link } from "react-router-dom";

import LogoWhite from "../assets/LogoWhite.svg";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../helper/DarkModeContext";
import axios from "axios";

const Nav = styled.div`
  width: 100%;
  background-color: #03565a;
  height: 80px;
  color: white;
  font-family: inherit;
  display: flex;
  padding: 0 2rem 0 2rem;
  align-items: center;
  position: sticky;
  top: 0%;
  min-width: 1045px;
  z-index: 99;
`;
const Navlinks = styled.div`
  display: flex;
  margin-left: calc(57vw);
  & > ul {
    display: flex;
    align-items: center;
    margin: 0;
  }
  & > ul > li {
    margin-left: 2.8rem;
    text-decoration: none;
    text-emphasis: none;
    list-style: none;
    font-weight: 300;
    font-size: 15px;
    font-stretch: expanded;
  }
  & a {
    color: white;
  }

  & div {
    position: absolute;
  }
  & div img {
    border: 1px solid white;
  }
`;
// const Title = styled.h1`
//     font-size: 1.5rem;
//     font-weight: 700;
//     line-height: 36px;
//     font-size: 24px;

// `
const Profile = styled.div`
  margin-left: auto;
  /* margin-right:2rem; */
  /* width: 3.5rem; 
    height: 3.5rem;
    border-radius: 50%; */
  /* background-color:black;   */
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Navbar = (props) => {
  const [random, setRandom] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [renameProfile, setRenameProfile] = useState(false);
  const open = Boolean(anchorEl);
  const [dataProfile, setProfileData] = useState({
    email: "",
  });
  let history = useHistory();

  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRenameProfile(false);
  };
  const Image = useSelector(
    (initialState) => initialState.reducer.profileImage
  );
  const Name = useSelector((initialState) => initialState.reducer.profileName);
  const Email = useSelector(
    (initialState) => initialState.reducer.profileEmail
  );

  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
      console.log(auth);
      let headers = {
        "x-auth-token": auth,
        "Content-Type": "application/json",
      };
    axios
    .get(`api/v1/auth/get-profile`, { headers })
    .then((response) => {
      console.log(response, "response---------");
      if (response.status === 200) {
        setProfileData({
          email: response.data.user.data.email,
        });
      }
    })
    setRandom(Math.random());
  }, []);

  function handlelogout() {
    logout();
    history.push("/");
    setAnchorEl(null);
  }
  function handlelprofile() {
    history.push("/profile-change");
    setAnchorEl(null);
  }

  function handleProfile() {
    // console.log(data);
    setRenameProfile(true);
    // setRenameData({
    //   id: id,
    //   email: email,
    //   password: password,
    // });
  }

  function handleProfileChange(e) {
    console.log(e);
  }

  return (
    <Nav>
      <div>
        <img
          src={LogoWhite}
          style={{ height: "50px" }}
          alt="logo"
          onClick={() => history.push("/")}
        />
      </div>
      {/* <Title>{props.text}</Title> */}
      <Navlinks>
        {!props.home && (
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/presets">Presets</Link>
            </li>

            <li>
              <Link to="/profile-change">Profile</Link>
            </li>
            <li>
              <Link to="#" onClick={() => history.goBack()}>
                Back
              </Link>
            </li>
          </ul>
        )}
      </Navlinks>
      <Profile>
        <Button
          variant="text"
          sx={{ outline: "none", border: "none" }}
          onClick={() => {
            theme ? setTheme(false) : setTheme(true);
          }}
        >
          <h1>
            {theme ? (
              <NightlightIcon />
            ) : (
              <WbSunnyIcon sx={{ color: "yellow" }} />
            )}
          </h1>
        </Button>
        <Tooltip title="Account settings">
          
          <IconButton
            onClick={handleClick}
            size="large"
            // sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ width: 56, height: 56 }}
          >
            <Stack direction="row" spacing={2}>
              <Avatar >{dataProfile.email.slice(0, 1).toUpperCase()}</Avatar>
            </Stack>
          </IconButton>

          
        </Tooltip>

        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* <MenuItem style={{ cursor: "not-allowed" }}>Settings</MenuItem> */}
          <MenuItem onClick={handlelogout}>Logout</MenuItem>
          {props.home && (
          <MenuItem onClick={handlelprofile}>Profile</MenuItem>
          )}
        </Menu>
        {/* <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        // ml: -0.5,
                        // mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
     
                    Settings
                    </MenuItem>
                    <MenuItem>
               
                    Logout
                    </MenuItem>
                </Menu> */}
        {/* <img src= {Image} style={{width: '3.5rem',borderRadius: '50%'}}/> */}
      </Profile>
    </Nav>
  );
};
