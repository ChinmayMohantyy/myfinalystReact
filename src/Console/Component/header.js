import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//img
import logo from '../assets/images/logo/Logo.svg'
import profile_logo from '../assets/images/dashboard/profile.jpg'


const Header = () => {
let history = useHistory();
// const [anchorEl, setAnchorEl] = useState(null);
//   function handlelogout() {
//     logout();
//     history.push("/");
//     setAnchorEl(null);

//   }
  return (
    <div className="page-header">
      <div className="header-wrapper row m-0">
        <div className="header-logo-wrapper col-auto p-0">
          <div className="logo-wrapper">
            <Link to="index.html">
              {/* <img className="img-fluid" src={logo} alt="" /> */}
            </Link>
          </div>
        </div>
        <div className="left-header col horizontal-wrapper ps-0">
          <ul className="nav-menus">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '15px' }} onClick={() => history.goBack()}>
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
            </li>
          </ul>
        </div>
        <div className="nav-right col-8 pull-right right-header p-0">
          <ul className="nav-menus">

            {/* <li>
              <span className="header-search">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  className="feather feather-search">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </li>
            <li className="onhover-dropdown">
              <div className="notification-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  className="feather feather-bell">
                  <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className="badge rounded-pill badge-secondary">4 </span>
              </div>
              <ul className="notification-dropdown onhover-show-div">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="feather feather-bell">
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                  </svg>
                  <h6 className="f-18 mb-0">Notitications</h6>
                </li>
                <li>
                  <p>
                    <i className="fa fa-circle-o me-3 font-primary"></i>
                    Delivery processing
                    <span className="pull-right">10 min.</span>
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-circle-o me-3 font-success"></i>
                    Order Complete
                    <span className="pull-right">1 hr</span>
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-circle-o me-3 font-info"></i>
                    Tickets Generated
                    <span className="pull-right">3 hr</span>
                  </p>
                </li>
                <li>
                  <p>
                    <i className="fa fa-circle-o me-3 font-danger"></i>
                    Delivery Complete
                    <span className="pull-right">6 hr</span>
                  </p>
                </li>
                <li>
                  <Link className="btn btn-primary" to="#">Check all notification</Link>
                </li>
              </ul>
            </li> */}



            <li className="profile-nav onhover-dropdown p-0 me-0">
              <div className="media profile-media">
                <img className="b-r-10" src={profile_logo} alt="" />
                <div className="media-body"><span>Emay Walter</span>
                  <p className="mb-0 font-roboto">Admin <i className="middle fa fa-angle-down"></i></p>
                </div>
              </div>
              <ul className="profile-dropdown onhover-show-div">
                {/* <li>
                  <Link to="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg><span onClick={handlelogout}>LogOut </span></Link>
                </li> */}
                {/* <li>
                  <Link to="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="feather feather-mail">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg><span>Inbox</span></Link>
                </li>
                <li>
                  <Link to="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="feather feather-file-text">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg><span>Taskboard</span></Link>
                </li>
                <li>
                  <Link to="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="feather feather-settings">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path
                      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
                    </path>
                  </svg><span>Settings</span></Link>
                </li>
                <li>
                  <Link to="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="feather feather-log-in">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg><span>Log in</span></Link>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
