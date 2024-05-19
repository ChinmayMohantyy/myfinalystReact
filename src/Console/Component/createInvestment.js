import React, { useEffect, useState } from 'react'
import { Link, useHistory ,useLocation} from 'react-router-dom';
import Header from './header'

// img
import logo from '../assets/images/logo/Logo.svg';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { format } from 'date-fns'
import moment from 'moment';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style3 = {
    position: 'absolute',
    top: '50%',
    left: '75%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const CreateInvestment = () => {
    let history = useHistory();
    const auth = localStorage.getItem("auth_token");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [selectdate,openSelectDate] = useState(false);
    const [opendata,setOpenData] = useState(false);
    const location = useLocation();
    console.log(location.pathname);
    let a = location.pathname;
    let b = a.split('/')
    console.log(b[2]);
    const[namecompaany,setNameCompany] = useState({});
    const[allcompanydata,setAllCompanyData] = useState([]);
    const[alldetails,setAllDetails] = useState([]);
    const [filterdata,setFilterData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [opendetails,setDetails] = useState(false);
    const [singledata,setSingleData] = useState("")
    useEffect(() => {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
            .get(`api/v1/company/get-onecomapny/${b[2]}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data.getOneCompany,
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                setNameCompany(response.data.getOneCompany[0])
            });
            getCompanyData();
            fetchAlldetails();
    }, []);

    const handleClose = () => {
        setOpen(false);
        openSelectDate(false);
        setOpenData(false);
       
    }
    const handleClose1=()=>{
        setDetails(false);
    }
    function getCompanyData() {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
        .get(`api/v1/company-data/get-company-data/${b[2]}`, {
            headers,
        })
        .then((response) => {
            console.log(
                response.data.getCompanyData,
                "datttttttttttttttt"
            );
            setAllCompanyData(response.data.getCompanyData)
        });
    }

    const handleNature=(e,dat,i)=>{
        // console.log(id);
        console.log(e.target.value);
        console.log(dat._id);

        const newArray = allcompanydata.map((item, index) => {
            if (i === index) {
              return { ...item, [e.target.name]: e.target.value };
            } else {
              return item;
            }
          });
          const foundData = newArray.find((exe) => exe._id === dat._id);
          setAllCompanyData(newArray);
          if(foundData){
            console.log(foundData , ';;;;;;;;;;;;;;;;;;;;;');
             let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
            };
            axios
                .post(`api/v1/company-data/update-natureinvest/${dat._id}`,foundData, {
                    headers,
                })
                .then((response) => {
                    console.log(
                        response.data.getOneCompany,
                        "dat dat dat datd ddat dat dat dat dat dta dat d"
                    );
                    getCompanyData();
                });
          }
    }

    const hansleSelectDate=()=>{
        openSelectDate(true);
    }

    const handleChangeYear=(e,field)=>{
        console.log(e.target.value,"kjhgf");
        // setYearData({ ...yeardata, [field]: e.target.value })
        if (field === "previous_year") {
            setStartDate(e.target.value);
        } else if(field === "current_year"){
            setEndDate(e.target.value);
        }else{
            console.log("Null Data"); 
        }
    }

    const showData=()=>{
        setOpenData(true);
    }

    function fetchAlldetails() {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
        .get(`api/v1/company-data/all-details`, {
            headers,
        })
        .then((response) => {
            console.log(
                response.data.alldata,
                "datttttttttttttttt"
            );
            setAllDetails(response.data.alldata);
        });
    }

    const handleFilterSubmit=()=>{
        let data = alldetails.filter(
            (item) =>
            moment(item.createdAt).format("DD-MM-YYYY") >= moment(startDate).format("DD-MM-YYYY") &&
            moment(item.createdAt).format("DD-MM-YYYY") <= moment(endDate).format("DD-MM-YYYY")
          );
          console.log(data,"jhgfdfghjkl");
          setFilterData(data);
          setOpenData(true);
          openSelectDate(false);
    }

    const handleDetails=(id)=>{
        console.log(id);
        setDetails(true);
        fetchSingleData(id);
    }

    function fetchSingleData(id) {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
        .get(`api/v1/company-data/single-details/${id}`, {
            headers,
        })
        .then((response) => {
            console.log(
                response.data.singledata[0],
                "datttttttttttttttt"
            );
            setSingleData(response.data.singledata[0]);
        });
    }
    console.log(namecompaany.company_name);
    return (
        <div>
            <div className="tap-top"><i data-feather="chevrons-up"></i></div>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header />
                <div className="page-body-wrapper">
                    {/* Page Sidebar Start */}
                    <div className="sidebar-wrapper">
                        <div>
                            <div className="logo-wrapper">
                                <Link href="index.html">
                                    <img className="img-fluid for-light" src={logo} alt="" />
                                    {/* <img className="img-fluid for-dark" src={logo_dark} alt="" /> */}
                                </Link>

                            </div>
                            <div className="logo-icon-wrapper">
                                <Link href="index.html">
                                    {/* <img className="img-fluid" src={logo_icon} alt="" /> */}
                                </Link>
                            </div>

                        </div>
                    </div>
                    {/* Page Sidebar Ends */}

                    <div className="page-body">
                        <div className="container-fluid">
                            <div className="page-title">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>Create Investment Register</h3>
                                    </div>
                                    <div className="col-6">
                                        <ol className="breadcrumb">
                                            {/* <li className="breadcrumb-item"><Link to="index.html"><i data-feather="home"></i></Link></li> */}
                                            <li class="breadcrumb-item">
                                                <Link to="index.html">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item">Dashboard</li>
                                            <li className="breadcrumb-item active">Create Investment Register</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Container-fluid starts */}
                        <div className="container-fluid">
                            <div className="row second-chart-list third-news-update">
                                <div className="col-sm-12">
                                    <div className="card1 b-r-15 border-white">
                                        <div className="card-body1" style={{ paddingBottom: '20px' }}>
                                            Name of the Company :
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control" placeholder="Company Name" disabled value={namecompaany.company_name} />
                                                </div>
                                                <div className="col-md-2 mt-2">
                                                    {/* <Link className="btn btn-primary1" to="add-investment">+</Link> */}
                                                    <button className="btn btn-primary1" onClick={()=> history.push(`/add-investment/${b[2]}`)}>+</button>
                                                </div>
                                            </div>
                                            {/* <div class="col-12 mt-3"></div> */}
                                        </div>
                                        <hr />
                                        <div className="card-body1">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <h5>Summary of Investment:</h5>
                                                </div>
                                                <div className="col-md-8 ">
                                                    <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#expertv">Export</button>
                                                    <button className="btn btn-primary1 ms-1">View&nbsp;Group&nbsp;Structure</button>
                                                    <button className="btn btn-primary1 ms-1" data-bs-toggle="modal" data-bs-target="#select-date2" onClick={()=>hansleSelectDate()}>Select&nbsp;Date</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body1">
                                            <div className="col-sm-12 col-lg-12 col-xl-12">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered">
                                                        <thead className="bg-primary1">
                                                            <tr>
                                                                <th scope="row">Company&nbsp;Code</th>
                                                                <th scope="row">Company</th>
                                                                <th scope="row">Investment&nbsp;value</th>
                                                                <th scope="row">No.&nbsp;of&nbsp;shares&nbsp;CY</th>
                                                                <th scope="row">No.&nbsp;of&nbsp;shares&nbsp;PY</th>
                                                                <th scope="row">Holding&nbsp;%</th>
                                                                <th scope="row">Nature&nbsp;of&nbsp;Relationship</th>
                                                                <th scope="row">Goodwill/&nbsp;Capital&nbsp;reserve</th>
                                                                <th scope="row">Action</th>
                                                                <th scope="row">Consol&nbsp;Entries</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {(allcompanydata.map((dat, i) => (
                                                            <tr>
                                                                <td>{namecompaany.company_code}</td>
                                                                <td>{dat.company}</td>
                                                                <td>{dat.value_of_investment}</td>
                                                                <td>{dat.no_of_shares}</td>
                                                                <td>{dat.total_no_shares}</td>
                                                                <td>{dat.final_holdings}</td>
                                                                <td>
                                                                    <input type='text' defaultValue={dat.final_holdings > 50?"Subsidiary Company":dat.final_holdings <= 50 && dat.final_holdings >= 20?"Associate Company":"Investment"} name="nature_of_relationship" style={{border:"none",height:"0px"}} onChange={(e)=>handleNature(e,dat,i)}/>
                                                                </td>
                                                                <td>&nbsp;</td>
                                                                <td>
                                                                    {/* <Link to="edit-register.html"> */}
                                                                        <svg onClick={()=> history.push(`/edit-register/${dat._id}`)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-3 mt-2" cursor={"pointer"}>
                                                                            <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                                            <line x1="3" y1="22" x2="21" y2="22"></line>
                                                                        </svg>
                                                                    {/* </Link> */}
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#extractconsol">Extract</button>
                                                                </td>
                                                            </tr>
                                                        )))}
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Container-fluid Ends */}
                    </div>

                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="col-12">
                        <h5>Investment register</h5>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="" />
                            </div>
                            <input type="button" className="btn btn-primary1" value="Submit" />
                            <input type="button" className="btn btn-defult" value="Close" onClick={handleClose} />
                        </form>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={selectdate}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <div class="card-body">
                        <button class="btn-close  float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="row form-group">
                            <div class="col-md-6"><label>Select previous year</label>
                                <input type="date" class="form-control" onChange={(e)=>handleChangeYear(e,"previous_year")}/>
                            </div>
                            <div class="col-md-6"><label>Select current year</label>
                                <input type="date" class="form-control" onChange={(e)=>handleChangeYear(e,"current_year")}/>
                            </div>
                            <div class="col-md-6 mt-3">
                                <button class="btn btn-primary1" onClick={()=>handleFilterSubmit()}>Submit</button>
                            </div>
                            {/* <div class="col-md-6 mt-3">
                                <button class="btn btn-primary1" onClick={()=>showData()}>Show Data</button>
                            </div> */}
                         </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={opendata}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div class="card-body">
                    <table className="table table-bordered">
                            <thead className="bg-primary1">
                                <tr>
                                    <th scope="row">Company&nbsp;Code</th>
                                    <th scope="row">Company</th>
                                    {/* <th scope="row">Investment&nbsp;value</th>
                                    <th scope="row">No.&nbsp;of&nbsp;shares&nbsp;CY</th>
                                    <th scope="row">No.&nbsp;of&nbsp;shares&nbsp;PY</th>
                                    <th scope="row">Holding&nbsp;%</th> */}
                                    <th scope="row">Nature&nbsp;of&nbsp;Relationship</th>
                                    <th scope="row">Status</th>
                                    <th scope="row">Created At</th>
                                    <th scope="row">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            {(filterdata.map((dat, i) => (
                                <tr>
                                    <td>{namecompaany.company_code}</td>
                                    <td>{dat.company?dat.company:"-"}</td>
                                    {/* <td>{dat.value_of_investment?dat.value_of_investment:"-"}</td>
                                    <td>{dat.no_of_shares?dat.no_of_shares:"-"}</td>
                                    <td>{dat.total_no_shares?dat.total_no_shares:"-"}</td>
                                    <td>{dat.final_holdings?dat.final_holdings:"-"}</td> */}
                                    <td>{dat.final_holdings > 50?"Subsidiary Company":dat.final_holdings <= 50 && dat.final_holdings >= 20?"Associate Company":"Investment"}
                                    </td>
                                    <td>{dat.status}</td>
                                    <td>{moment(dat.createdAt).format("DD-MM-YYYY")}</td>
                                    <td><Icon baseClassName="fas" className="fa-plus-circle" style={{cursor:"pointer"}} color="primary" onClick={()=>handleDetails(dat._id)}/></td>
                                </tr>
                            )))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary1" onClick={handleClose}>Cancel</button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={opendetails}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <div class="card-body">
                            <strong>
                                Company:
                            </strong>{singledata.company}<br/>
                            <strong>
                            Date Of Investment:
                            </strong>&nbsp;&nbsp;&nbsp;{singledata.date_Of_investment}<br/>
                            <strong>
                            Status:
                            </strong>&nbsp;&nbsp;&nbsp;{singledata.status}<br/>
                            <strong>
                            Total Number Of Share:
                            </strong>&nbsp;&nbsp;&nbsp;{singledata.total_no_shares}<br/>
                        <button className="btn btn-primary1" onClick={handleClose1}>Cancel</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CreateInvestment
