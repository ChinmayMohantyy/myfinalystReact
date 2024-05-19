import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Header from './header'
import axios from "axios";
import swal from "sweetalert";
// img
import logo from '../assets/images/logo/Logo.svg';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style3 ={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const InvestmentRegister = () => {
  let history = useHistory();
    const auth = localStorage.getItem("auth_token");
    const [open, setOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [companyName, setCompanyName] = useState("");
    const [allcompany, getAllCompany] = useState([]);
    const [openperioud,setOpenPeriod] = useState(false);
    const [openpreset,setOpenPreset] = useState(false);
    const [openlink,setOpenLink] = useState(false);
    const [renamepreconsol,setRenamePreConsolEdit] = useState(false);
    const [openprepareconsol,setOpenPrepareConsol] = useState(false);
    const [preconsolname,setPreconsolName] = useState("");
    const [allpreconsoldata,getAllPreConsolCompany] = useState([]);
    const [pid,setPeriod] = useState("");
    const [optionentry,setOptionEntry] = useState("");
    const [registerdata,setRegister] = useState("");
    const [presetid,setPresetId] = useState("");
    const [linkid,setLinkId] = useState("");
    const [yeardata,setYear] = useState({
        current_year:"",
        previous_year:"",
    });
    const[renamecompany,renameCompany] = useState({
        id:"",
        name:""
    })
    const[renamepreconsole,serRenamePreConsol] = useState({
        id:"",
        name:""
    })
    
    const handleEditOpen = (e,companyName,cid) => {
        console.log(companyName);
        renameCompany(
            {company_name:companyName,
            id:cid,}
        )
        setEditOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setEditOpen(false)
        setOpenPeriod(false);
        setOpenPreset(false);
        setOpenLink(false);
        setOpenPrepareConsol(false);
        setRenamePreConsolEdit(false);
    }
    const handleChangeName = (e) => {
        console.log(e.target.value);
        setCompanyName(e.target.value)
    }
    const handleChangeEditName = (e,cid) => {
        console.log(e.target.value);
        renameCompany(
            {
                name:e.target.value,
                id:cid
            }
        )
        
    }
    useEffect(() => {
        getCompany();
        fetchPreConsole();
        fetchProject();
    }, [])

    function handleSubmit() {
        console.log(companyName);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let company_code = companyName.slice(0,3)+Math.floor(1000 + Math.random() * 9000);
        const data = {
            companyName: companyName,
            companyCode: company_code

        }
        axios.post('api/v1/company/create-company', data, { headers })
            .then(res => {
                console.log(res, 'res')
                setOpen(false)
                swal("", "Comapnay Created Successfull", "success");
                getCompany();
            })
            .catch(err => {
                console.log(err.response)
                swal("", "Comapnay Not Created", "error");
            })

    }

    function handleDelete(e, cid) {

        console.log(e);
        console.log(cid);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to view the Company",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete){
                axios
            .get(`api/v1/company/delete-comapny/${cid}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                getCompany();
            }); 
            }else{
                swal("","Company not deleted!","error");
            }
        })
       
    }


    const getCompany = () => {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
            .get(`api/v1/company/get-comapny`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                getAllCompany(response.data.getCompany);
            });
    }

    const handleUpdateCompany=(cid)=>{
        console.log(renamecompany.id);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            company_name: renamecompany.name,
          };
          console.log(data);
          axios
            .post(`api/v1/company/rename-company/${cid}`, data, { headers })
            .then((response) => {
              console.log(response, "response---------");
              if (response.status === 200) {
                swal("", "Company Updated Successfully", "success");
                setEditOpen(false);
                getCompany();
              }
      
              // history.push('/createProject/uploadTb')
            })
            .catch((error) => {
              console.log(error.response, "error");
              swal("", error.response.data.error, "error");
            });
    }

    const handleClone=(cid,company_name,val)=>{
        console.log(val,"valllllllllllllll");
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            company_name: company_name,
            company_code:val.company_code,
            company_id:val._id,
          };
          console.log(data);
          swal({
            title: "Are you sure to clone?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete){
          axios
            .post(`api/v1/company/clone-company`, data, { headers })
            .then((response) => {
              console.log(response, "response---------");
              if (response.status === 200) {
                swal("", "Company Cloned Successfully", "success");
                getCompany();
              }
      
              // history.push('/createProject/uploadTb')
            })
            .catch((error) => {
              console.log(error.response, "error");
              swal("", error.response.data.error, "error");
            });
        }});
    }

    const handlePerioud=(id)=>{
        setOpenPeriod(true);
        setPeriod(id);
    }
   
    const handlePreset=(id)=>{
        setOpenPreset(true);
        setPresetId(id);
       ;
    }

    const handleLink=(id)=>{
        setOpenLink(true);
        console.log(id);
        setLinkId(id)
    }
     function handleError() {
        swal("", "Please First Link The Investment Register ", "error");
     }
    const handleOpenConsole=()=>{
        setOpenPrepareConsol(true)
    }

    const handleChangePrepareConsol=(e)=>{
        console.log(e.target.value);
        setPreconsolName(e.target.value);
    }

    const handleCreatePrepareConsol=(e)=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        const data = {
            prepare_consol_company_name: preconsolname,

        }
        axios.post('api/v1/prepare-consol/create-preConsol', data, { headers })
            .then(res => {
                console.log(res, 'res')
                swal("", "Pre-Consol Comapnay Created Successfull", "success");
                setOpenPrepareConsol(false);
                fetchPreConsole();
            })
            .catch(err => {
                console.log(err.response)
                swal("", "Comapnay Not Created", "error");
            })
    }

    const fetchPreConsole=()=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
            .get(`api/v1/prepare-consol/fetch-preConsol-data`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "chichichichichichich"
                );
                getAllPreConsolCompany(response.data.getPreConsolCompany);
            });
    }

    const handleChangeyear=(e,field)=>{
        console.log(e.target.value);
        setYear({ ...yeardata, [field]: e.target.value })
    }

    const handleSubmitPeriod=()=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            current_year:yeardata.current_year,
            previous_year:yeardata.previous_year,
        };
        axios
            .post(`api/v1/prepare-consol/set-period/${pid}`,data, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "chichichichichichich"
                );
                setOpenPeriod(false);
            });
    }

    function fetchProject() {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get('/api/v1/project/get-project', { headers })
        .then(res => {
            console.log(res.data.project, 'res')
            setOptionEntry(res.data.project);
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleChangeRegister=(e)=>{
        setRegister(e.target.value)
    }

    const handleRegister=()=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            link:registerdata,
        };
        axios
            .post(`api/v1/prepare-consol/set-period/${linkid}`,data, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "chichichichichichich"
                );
                setOpenLink(false);
                fetchPreConsole();
            });
    }

    const handlePreConsoleClone=(e,company_name)=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            company_name: company_name,
          };
          console.log(data);
          swal({
            title: "Are you sure to clone?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete){
          axios
            .post(`api/v1/prepare-consol/clone-prepare-consol`, data, { headers })
            .then((response) => {
              console.log(response, "response---------");
              if (response.status === 200) {
                swal("", "Company Cloned Successfully", "success");
                fetchPreConsole();
              }
      
              // history.push('/createProject/uploadTb')
            })
            .catch((error) => {
              console.log(error.response, "error");
              swal("", error.response.data.error, "error");
            });
        }});
    }

    const  handlePreConsolDelete=(e,id)=>{
        console.log(id);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to view the Company",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete){
                axios
            .get(`api/v1/prepare-consol/delete-prepare-console/${id}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                fetchPreConsole();
            }); 
            }else{
                swal("","Prepare Console not deleted!","error");
            }
        })
    }

    const handlePreConsolEdit=(e,companyName,pid)=>{
        setRenamePreConsolEdit(true);
        serRenamePreConsol(
            {company_name:companyName,
            id:pid,}
        )

    }

    const handleChangeConsoleEditName=(e,pid)=>{
        serRenamePreConsol(
            {
                name:e.target.value,
                id:pid
            }
        )
    }

    const handleUpdatePreConsoleCompany=(id,e)=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            company_name: renamepreconsole.name,
          };
          console.log(data);
          axios
            .post(`api/v1/prepare-consol/set-period/${id}`, data, { headers })
            .then((response) => {
              console.log(response, "response---------");
              if (response.status === 200) {
                swal("", "Prepare Console Updated Successfully", "success");
                setRenamePreConsolEdit(false);
                fetchPreConsole();
              }
            })
            .catch((error) => {
              console.log(error.response, "error");
              swal("", error.response.data.error, "error");
            });
    }

console.log(allpreconsoldata,"allpreconsoldata.......");




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
                                        <h3>Investment Register</h3>
                                    </div>
                                    <div className="col-6">
                                        <ol className="breadcrumb">
                                            {/* <li className="breadcrumb-item"><Link to="index.html"><i data-feather="home"></i></Link></li> */}
                                            <li className="breadcrumb-item">
                                                <Link to="index.html">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home">
                                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item">Dashboard</li>
                                            <li className="breadcrumb-item active">Investment Register </li>
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
                                        <div className="card-header">
                                            <h5>Company List</h5>
                                        </div>
                                        <div className=" ps-5 pe-5 pb-5">
                                            <div className="card-block row">
                                                <div className="col-sm-12 col-lg-12 col-xl-12">
                                                    <div className="table-responsive mt-4" >
                                                        <table className="table table-bordered">
                                                            <tbody>
                                                                {(allcompany.map((dat, i) => (
                                                                    <tr>
                                                                        <th scope="row">{dat.company_name}</th>
                                                                        <td>
                                                                            {/* <Link to="create-investment"> */}
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '20px',cursor:"pointer" }} onClick={()=> history.push(`/create-investment/${dat._id}`)}>
                                                                                    {/* Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                                                                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                                                                </svg>
                                                                            {/* </Link> */}
                                                                        </td>

                                                                        <td>
                                                                            {/* <Link to=""> */}
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '20px',cursor:'pointer' }} onClick={(e) => handleClone(e,dat.company_name,dat)}>
                                                                                    {/* Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                                                                    <path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z" />
                                                                                </svg>
                                                                            {/* </Link> */}
                                                                        </td>

                                                                        <td>
                                                                            {/* <Link> */}
                                                                            {/*  */}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2" onClick={(e) => handleDelete(e, dat._id)} style={{cursor:"pointer"}}>
                                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                            </svg>
                                                                            {/* </Link> */}
                                                                        </td>

                                                                        <td>
                                                                            {/* <Link > */}
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-3"onClick={(e) => handleEditOpen(e, dat.company_name,dat._id)} style={{cursor:"pointer"}}>
                                                                                    <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                                                    <line x1="3" y1="22" x2="21" y2="22"></line>
                                                                                </svg>
                                                                            {/* </Link> */}
                                                                        </td>
                                                                    </tr>
                                                                )))}

                                                            </tbody>
                                                        </table>
                                                        <button onClick={handleOpen} className="btn btn-primary1">+</button>
                                                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenter" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title">Modal title</h5>
                                                                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="card-body1">
                                                                            <ul className="nav nav-tabs border-tab" id="top-tab"
                                                                                role="tablist">
                                                                                <li className="nav-item">
                                                                                    <Link className="nav-link" id="top-home-tab" data-bs-toggle="tab" to="#top-home" role="tab" aria-controls="top-home" aria-selected="false" data-bs-original-title="" title="">
                                                                                        <i className="icofont icofont-ui-home"></i>
                                                                                        Home
                                                                                    </Link>
                                                                                </li>

                                                                                <li className="nav-item">
                                                                                    <Link className="nav-link active" id="profile-top-tab" data-bs-toggle="tab" to="#top-profile" role="tab" aria-controls="top-profile" aria-selected="true" data-bs-original-title="" title="">
                                                                                        <i className="icofont icofont-man-in-glasses"></i>
                                                                                        Profile
                                                                                    </Link>
                                                                                </li>

                                                                                <li className="nav-item">
                                                                                    <Link className="nav-link" id="contact-top-tab" data-bs-toggle="tab" to="#top-contact" role="tab" aria-controls="top-contact" aria-selected="false" data-bs-original-title="" title="">
                                                                                        <i className="icofont icofont-contacts"></i>
                                                                                        Contact
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>

                                                                            <div className="tab-content" id="top-tabContent">
                                                                                <div className="tab-pane fade" id="top-home" role="tabpanel"
                                                                                    aria-labelledby="top-home-tab">
                                                                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                                                                        typesetting industry. Lorem Ipsum has been the
                                                                                        industry's standard dummy text ever since the 1500s,
                                                                                        when an unknown printer took a galley of type and
                                                                                        scrambled it to make a type specimen book. It has
                                                                                        survived not only five centuries, but also the leap
                                                                                        into electronic typesetting, remaining essentially
                                                                                        unchanged. It was popularised in the 1960s with the
                                                                                        release of Letraset sheets containing Lorem Ipsum
                                                                                        passages, and more recently with desktop publishing
                                                                                        software like Aldus PageMaker including versions of
                                                                                        Lorem Ipsum
                                                                                    </p>
                                                                                </div>
                                                                                <div className="tab-pane fade active show" id="top-profile"
                                                                                    role="tabpanel" aria-labelledby="profile-top-tab">
                                                                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                                                                        typesetting industry. Lorem Ipsum has been the
                                                                                        industry's standard dummy text ever since the 1500s,
                                                                                        when an unknown printer took a galley of type and
                                                                                        scrambled it to make a type specimen book. It has
                                                                                        survived not only five centuries, but also the leap
                                                                                        into electronic typesetting, remaining essentially
                                                                                        unchanged. It was popularised in the 1960s with the
                                                                                        release of Letraset sheets containing Lorem Ipsum
                                                                                        passages, and more recently with desktop publishing
                                                                                        software like Aldus PageMaker including versions of
                                                                                        Lorem Ipsum
                                                                                    </p>
                                                                                </div>

                                                                                <div className="tab-pane fade" id="top-contact"
                                                                                    role="tabpanel" aria-labelledby="contact-top-tab">
                                                                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                                                                        typesetting industry. Lorem Ipsum has been the
                                                                                        industry's standard dummy text ever since the 1500s,
                                                                                        when an unknown printer took a galley of type and
                                                                                        scrambled it to make a type specimen book. It has
                                                                                        survived not only five centuries, but also the leap
                                                                                        into electronic typesetting, remaining essentially
                                                                                        unchanged. It was popularised in the 1960s with the
                                                                                        release of Letraset sheets containing Lorem Ipsum
                                                                                        passages, and more recently with desktop publishing
                                                                                        software like Aldus PageMaker including versions of
                                                                                        Lorem Ipsum
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                                                                        <button className="btn btn-primary1" type="button">Save changes</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row second-chart-list third-news-update">
                                <div className="col-sm-12">
                                    <div className="card1 b-r-15 border-white">
                                        <div className="card-header">
                                            <h5> Prepare Consol </h5>
                                        </div>
                                        <div className=" ps-5 pe-5">
                                            <div className="card-block row">
                                                <div className="col-sm-12 col-lg-12 col-xl-12">
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <tbody>
                                                            {(allpreconsoldata.map((dat, i) => (
                                                                <tr>
                                                                    <th scope="row">{dat.prepare_consol_company_name}</th>
                                                                    <td>
                                                                        
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onClick={()=>handlePerioud(dat._id)}>Select Period</button><br/>
                                                                        <small><strong>cy: </strong>{moment(dat.current_financial_year).format("DD-MM-YYYY")} <strong>py: </strong>{moment(dat.previous_financial_year).format("DD-MM-YYYY")}</small>
                                                                    </td>
                                                                    <td>
                                                                        {dat.link_company?
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onClick={()=>handlePreset(dat._id)}>Consolidate</button>
                                                                        :
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" onClick={()=>handleError(dat._id)}>Consolidate</button>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">View Register</button>
                                                                    </td>
                                                                    <td>
                                                                        {dat.link_company ?
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"  disabled>Linked</button>
                                                                        :
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter"  onClick={()=>handleLink(dat._id)}>Link Register</button>
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Show F S</button>
                                                                    </td>

                                                                    <td>
                                                                        {/* <Link to=""> */}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '20px',cursor:'pointer' }} onClick={(e) => handlePreConsoleClone(e,dat.prepare_consol_company_name)}>
                                                                                {/*  Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                                                                                <path d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"></path>
                                                                            </svg>
                                                                        {/* </Link> */}
                                                                    </td>

                                                                    <td>
                                                                        {/* <Link to=""> */}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-3" style={{cursor:'pointer'}} onClick={(e) => handlePreConsolEdit(e,dat.prepare_consol_company_name,dat._id)}>
                                                                                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"></polygon>
                                                                                <line x1="3" y1="22" x2="21" y2="22"></line>
                                                                            </svg>
                                                                        {/* </Link> */}
                                                                    </td>

                                                                    <td>
                                                                        {/* <Link to=""> */}
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash-2" style={{cursor:'pointer'}} onClick={(e) => handlePreConsolDelete(e,dat._id)}>
                                                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"> </path>
                                                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                            </svg>
                                                                        {/* </Link> */}
                                                                    </td>
                                                                </tr>
                                                            )))}
                                                            </tbody>
                                                        </table>
                                                        <button onClick={handleOpenConsole} className="btn btn-primary1">+</button>
                                                        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenter" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered" role="document">
                                                                <div className="modal-content">
                                                                    <div className="modal-header">
                                                                        <h5 className="modal-title">Modal title</h5>
                                                                        <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <div className="card-body1">
                                                                            <ul className="nav nav-tabs border-tab" id="top-tab" role="tablist">
                                                                                <li className="nav-item">
                                                                                    <Link className="nav-link" id="top-home-tab" data-bs-toggle="tab" to="#top-home" role="tab" aria-controls="top-home" aria-selected="false" data-bs-original-title="" title="">
                                                                                        <i className="icofont icofont-ui-home"></i>
                                                                                        Home
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="nav-item">
                                                                                    <Link className="nav-link active" id="profile-top-tab" data-bs-toggle="tab" to="#top-profile" role="tab" aria-controls="top-profile" aria-selected="true" data-bs-original-title="" title="">
                                                                                        <i className="icofont icofont-man-in-glasses"></i>
                                                                                        Profile
                                                                                    </Link>
                                                                                </li>
                                                                                <li className="nav-item">
                                                                                    <Link className="nav-link" id="contact-top-tab" data-bs-toggle="tab" to="#top-contact" role="tab" aria-controls="top-contact" aria-selected="false" data-bs-original-title="" title="">
                                                                                        <i className="icofont icofont-contacts"></i>
                                                                                        Contact
                                                                                    </Link>
                                                                                </li>
                                                                            </ul>
                                                                            <div className="tab-content" id="top-tabContent">
                                                                                <div className="tab-pane fade" id="top-home" role="tabpanel" aria-labelledby="top-home-tab">
                                                                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                                                                        typesetting industry. Lorem Ipsum has been the
                                                                                        industry's standard dummy text ever since the 1500s,
                                                                                        when an unknown printer took a galley of type and
                                                                                        scrambled it to make a type specimen book. It has
                                                                                        survived not only five centuries, but also the leap
                                                                                        into electronic typesetting, remaining essentially
                                                                                        unchanged. It was popularised in the 1960s with the
                                                                                        release of Letraset sheets containing Lorem Ipsum
                                                                                        passages, and more recently with desktop publishing
                                                                                        software like Aldus PageMaker including versions of
                                                                                        Lorem Ipsum
                                                                                    </p>
                                                                                </div>
                                                                                <div className="tab-pane fade active show" id="top-profile" role="tabpanel" aria-labelledby="profile-top-tab">
                                                                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                                                                        typesetting industry. Lorem Ipsum has been the
                                                                                        industry's standard dummy text ever since the 1500s,
                                                                                        when an unknown printer took a galley of type and
                                                                                        scrambled it to make a type specimen book. It has
                                                                                        survived not only five centuries, but also the leap
                                                                                        into electronic typesetting, remaining essentially
                                                                                        unchanged. It was popularised in the 1960s with the
                                                                                        release of Letraset sheets containing Lorem Ipsum
                                                                                        passages, and more recently with desktop publishing
                                                                                        software like Aldus PageMaker including versions of
                                                                                        Lorem Ipsum
                                                                                    </p>
                                                                                </div>
                                                                                <div className="tab-pane fade" id="top-contact" role="tabpanel" aria-labelledby="contact-top-tab">
                                                                                    <p>Lorem Ipsum is simply dummy text of the printing and
                                                                                        typesetting industry. Lorem Ipsum has been the
                                                                                        industry's standard dummy text ever since the 1500s,
                                                                                        when an unknown printer took a galley of type and
                                                                                        scrambled it to make a type specimen book. It has
                                                                                        survived not only five centuries, but also the leap
                                                                                        into electronic typesetting, remaining essentially
                                                                                        unchanged. It was popularised in the 1960s with the
                                                                                        release of Letraset sheets containing Lorem Ipsum
                                                                                        passages, and more recently with desktop publishing
                                                                                        software like Aldus PageMaker including versions of
                                                                                        Lorem Ipsum
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-footer">
                                                                        <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                                                                        <button className="btn btn-primary1" type="button">Save changes</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                    <button type="button" onClick={handleClose} class="btn-close float-end">&#10005;</button>
                        <h5>Investment register</h5>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="" onChange={(e) => handleChangeName(e)} />
                            </div>
                            <input type="button" className="btn btn-primary1" value="Submit" onClick={handleSubmit} />
                            
                            {/* <input type="button" className="btn btn-defult" value="Close" onClick={handleClose} /> */}
                        </form>
                    </div>
                </Box>
            </Modal>


            <Modal
                open={editOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div class="col-12">
                    <button type="button" onClick={handleClose} class="btn-close float-end">&#10005;</button>
                        <h5>Rename Company Name</h5>
                        <form>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="" onChange={(e) => handleChangeEditName(e,renamecompany.id)}
                                value={renamecompany.company_name}
                                 />
                            </div>
                            <input type="button" class="btn btn-primary1" value="Update" onClick={(e)=>handleUpdateCompany(renamecompany.id,e)}/>
                            {/* <input type="button" class="btn btn-defult" value="Close" onClick={handleClose} /> */}
                        </form>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openperioud}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <div class="card-body">
                        <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="col-12 mb-3">
                        <label>Current Financial Year</label>
                            <input type="date" class="form-control" placeholder="dd/mm/yyyy" onChange={(e)=>handleChangeyear(e,'current_year')}/>
                        </div>
                        <div class="col-12 mb-3">
                        <label> Previous Financial Year</label>
                            <input type="date" class="form-control" placeholder="dd/mm/yyyy"onChange={(e)=>handleChangeyear(e,'previous_year')}/>
                        </div>
                        <div class="col-12">
                        <button class="btn btn-primary1" onClick={handleSubmitPeriod}>Submit</button>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                    open={openpreset}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <Box sx={style3}>
                    <div class="card-body">
                        <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                        <div class="row">
                        <div class="col-md-6 text-center">
                            <button href="" class="btn btn-primary1" onClick={()=> history.push(`/addition-preset-mode/${presetid}`)} >Preset Mode</button>
                            </div>
                            <div class="col-md-6 text-center">
                            <button class="btn btn-dark" disabled>TB Mode</button>
                            </div>
                        </div>
                    
                        
                    </div>
                </Box>
            </Modal>

            <Modal
                    open={openlink}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <Box sx={style3}>
                <div class="card-body">
                    <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    
                    <div class="col-md-12">
                        <label>Investment Register </label>
                        {/* <select className='form-control mt-2'
                         onChange={(e) => handleChangeRegister(e)}
                         value={registerdata}
                         >
                                <option>select</option>
                                {(optionentry.length >  0  && optionentry.map((item=>(
                                    <option key={item._id} value={item._id}>{item.project_name}</option>
                                ))))};
                            </select> */}
                            <select className='form-control mt-2'
                         onChange={(e) => handleChangeRegister(e)}
                         value={registerdata}
                         >
                                <option>select</option>
                                {(allcompany.length >  0  && allcompany.map((item=>(
                                    <option key={item._id} value={item._id}>{item.company_name}</option>
                                ))))};
                            </select>
                        <button class="btn btn-primary mt-3" style={{background:"rgb(3, 86, 90)",float:"right"}} onClick={handleRegister}>Link</button>
                        </div>
                    
                </div>
                </Box>
            </Modal>

            <Modal
                open={openprepareconsol}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <div class="col-12">
                    <button type="button" onClick={handleClose} class="btn-close float-end">&#10005;</button>
                        <h5>Create Prepare Consol</h5>
                        <form>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="" 
                                onChange={(e) => handleChangePrepareConsol(e)}
                                // value={renamecompany.company_name}
                                 />
                            </div>
                            <input type="button" class="btn btn-primary1" value="Submit" 
                            onClick={(e)=>handleCreatePrepareConsol(e)}
                            />
                            {/* <input type="button" class="btn btn-defult" value="Close" onClick={handleClose} /> */}
                        </form>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={renamepreconsol}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div class="col-12">
                    <button type="button" onClick={handleClose} class="btn-close float-end">&#10005;</button>
                        <h5>Rename Prepare Console Name</h5>
                        <form>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="" onChange={(e) => handleChangeConsoleEditName(e,renamepreconsole.id)}
                                value={renamepreconsole.company_name}
                                 />
                            </div>
                            <input type="button" class="btn btn-primary1" value="Update" onClick={(e)=>handleUpdatePreConsoleCompany(renamepreconsole.id,e)}/>
                            {/* <input type="button" class="btn btn-defult" value="Close" onClick={handleClose} /> */}
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default InvestmentRegister
