import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './header'
import logo from '../assets/images/logo/Logo.svg';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { format } from 'date-fns'
import moment from 'moment';
import swal from 'sweetalert';
import TemplateTabs from "../../Components/templateTabs/TemplateTabs";
import ConsoleTemplateTabs from './ConsoleTemplateTabs';


const style3 = {
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

const style4 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const AdditionPresetMode = () => {
    const auth = localStorage.getItem("auth_token");
    const location = useLocation();
    let a = location.pathname;
    let b = a.split('/')
    console.log(b[2]);


    const [consoldata, setConsolData] = useState("");
    const [company, setCompany] = useState("");
    const [otherdata, SetOther] = useState([]);
    const [preset, openPreset] = useState(false);
    const [optionentry, setOptionEntry] = useState([]);
    const [investregsisterdata, setInvestRegisterData] = useState("");
    const [openuploadpreset, setOpenUploadPreset] = useState(false);
    const [uploaddata, setUploadData] = useState("");
    const [subcompanyid, setSubCompanyId] = useState("");
    const [openassociate, setOpenAssociate] = useState(false);
    const [associateid, setAssociateId] = useState("");
    const [uploadassociatedata, setUploadAssociateData] = useState("");
    const [setconsoleworking, setConsoleWorking] = useState(false);
    const [newSg, SetNewSg] = useState();

    useEffect(() => {
        fetchPreConsole();
        getCompany();
        getCompanyData();
    }, [])

    const handleClose = () => {
        openPreset(false);
        setOpenUploadPreset(false);
        setConsoleWorking(false);
    }
    const fetchPreConsole = () => {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
            .get(`api/v1/prepare-consol/get-prepare-console/${b[2]}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data.getOnePreCompany[0],
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                setConsolData(response.data.getOnePreCompany[0]);
                fetchInvestCompany(response.data.getOnePreCompany[0].link_company);
                getCompany(response.data.getOnePreCompany[0].link_company);
            });
    }

    const getCompanyData = () => {
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

    function fetchInvestCompany(id) {
        console.log(id);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
            .get(`api/v1/prepare-consol/get-registerData/${id}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data.getCompanyData,
                    "mmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
                );
                SetOther(response.data.getCompanyData);
            });
    }

    function getCompany(cid) {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios
            .get(`api/v1/company/get-onecomapny/${cid}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data.getOneCompany[0].company_name,
                    "0000000000000000000000000000"
                );
                setCompany(response.data.getOneCompany[0].company_name);
            });
    }

    const uploadPreset = () => {
        openPreset(true);
    }

    const handleChangeInvest = (e) => {
        setInvestRegisterData(e.target.value);
    }

    const handleSubmitRegsiter = () => {
        console.log(investregsisterdata);
        openPreset(false);
    }

    const browseConsol = (id) => {
        setOpenUploadPreset(true);
        setSubCompanyId(id);
    }

    const handleChangeUpload = (e) => {
        console.log(e.target.value);
        setUploadData(e.target.value);
    }

    const handleSubmitUpload = () => {
        console.log(uploaddata);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get(`/api/v1/tb-onboarding/findProjects/${uploaddata}`, { headers })
            .then(res => {
                console.log(res.data, 'res')
                console.log(moment(res.data.current_year).format("YYYY-MM-DD"));
                if (moment(res.data.current_year).format("YYYY-MM-DD") === consoldata.current_financial_year && moment(res.data.previous_year).format("YYYY-MM-DD") === consoldata.previous_financial_year) {
                    setValidate();
                } else {
                    swal("", "Validation Failed", "error");
                }
                setOpenUploadPreset(false);
                setOpenAssociate(false);
            })
            .catch(err => {
                console.log(err.response)
            })

    }

    function setValidate() {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            validate_check: "yes"
        }
        axios.post(`/api/v1/company-data/update-company-data/${subcompanyid}`, data, { headers })
            .then(res => {
                console.log(res.data, 'res')
                fetchPreConsole();
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const browseConsole = (id) => {
        setOpenAssociate(true);
        setAssociateId(id);
    }

    const handleChangeUploadData = (e) => {
        setUploadAssociateData(e.target.value);
    }

    const handleSubmitUploadData = () => {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get(`/api/v1/tb-onboarding/findProjects/${uploadassociatedata}`, { headers })
            .then(res => {
                console.log(res.data, 'res')
                console.log(moment(res.data.current_year).format("YYYY-MM-DD"));
                if (moment(res.data.current_year).format("YYYY-MM-DD") === consoldata.current_financial_year && moment(res.data.previous_year).format("YYYY-MM-DD") === consoldata.previous_financial_year) {
                    associateValid();

                } else {
                    swal("", "Validation Failed", "error");
                }
                setOpenUploadPreset(false);
                setOpenAssociate(false);
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    function associateValid() {
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        let data = {
            validate_check: "yes"
        }
        axios.post(`/api/v1/company-data/update-company-data/${associateid}`, data, { headers })
            .then(res => {
                console.log(res.data, 'res')
                fetchPreConsole();
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const browseConsoleWorking = () => {
        setConsoleWorking(true);
    }




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
                        </div>
                    </div>
                    {/* Page Sidebar Ends */}

                    <div className="page-body">
                        <div className="container-fluid">
                            <div className="page-title">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>Preset Mode</h3>
                                    </div>
                                    <div className="col-6">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link href="index.html">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                                </Link></li>
                                            <li className="breadcrumb-item">Dashboard</li>
                                            <li className="breadcrumb-item active">Preset Mode </li>
                                            <li className="breadcrumb-item active">Addition Preset Mode </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">


                            <div className="row second-chart-list third-news-update">

                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <button className="btn btn-primary1 float-end" data-bs-toggle="modal" data-bs-target="#compare">Compare</button>
                                            <button className="btn btn-primary1 float-end me-1" style={{marginRight: "15px"}} onClick={() => browseConsoleWorking()}>View FS</button>
                                            <p><strong>Name of Consol Preset: </strong>{consoldata.prepare_consol_company_name}</p>
                                            <div className="row">
                                                <div className="form-group col-8">
                                                    <p><strong>Upload standalone present of parent company: </strong></p>
                                                    <input type="button" className="btn btn-primary1" value="Upload Preset" onClick={uploadPreset} />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="form-group col-4">
                                                    <p><strong>Current Financial Year</strong></p>
                                                    <input type="date" className="form-control" disabled value={consoldata.current_financial_year} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <p><strong>Previous Financial Year</strong></p>
                                                    <input type="date" className="form-control" disabled value={consoldata.previous_financial_year} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-block">
                                                <div className="mt-3">
                                                    <h4>Subsidiary Companies</h4>
                                                    <div className="table-responsive table-bordered">
                                                        <table className="table">
                                                            <thead className="bg-primary1">
                                                                <tr>
                                                                    <th scope="col">Name&nbsp;of&nbsp;the&nbsp;Company
                                                                    </th>
                                                                    <th scope="col">Upload&nbsp;preset</th>
                                                                    <th scope="col">Validation&nbsp;check</th>
                                                                    <th scope="col">Consolidate</th>
                                                                    <th scope="col">View&nbsp;Consol&nbsp;Workings
                                                                    </th>
                                                                    <th scope="col">Translate&nbsp;to&nbsp;functional&nbsp;curreny</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {otherdata.filter(name => name.final_holdings > "50").map(filteredName => (
                                                                    <tr>
                                                                        <th scope="row">{filteredName.company ? filteredName.company : company}</th>
                                                                        <td> {filteredName.validation_check ?
                                                                            <button className="btn btn-primary1" disabled>Browse</button>
                                                                            :
                                                                            <button className="btn btn-primary1" onClick={() => browseConsol(filteredName._id)}>Browse</button>
                                                                        }
                                                                        </td>
                                                                        <td><b>{filteredName.validation_check ? <i class="fa fa-check-square" aria-hidden="true" style={{ fontSize: "30px", color: "green" }}></i> : <i class="fa fa-exclamation-circle" aria-hidden="true" style={{ fontSize: "30px", color: "red" }}></i>}</b></td>
                                                                        <td><input type='checkbox' /> </td>
                                                                        <td> <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#view-consol" >View&nbsp;Consol&nbsp;Workings</button> </td>
                                                                        <td> <button className="btn btn-primary1">Translate</button></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-block">
                                                <div className="mt-3">
                                                    <h4>Associates and Joint ventures</h4>
                                                    <div className="table-responsive">
                                                        <table className="table">
                                                            <thead className="bg-primary1">
                                                                <tr>
                                                                    <th scope="col">Name&nbsp;of&nbsp;the&nbsp;Company
                                                                    </th>
                                                                    <th scope="col">Upload&nbsp;preset</th>
                                                                    <th scope="col">Validation&nbsp;check</th>
                                                                    <th scope="col">Consolidate</th>
                                                                    <th scope="col">View&nbsp;Consol&nbsp;Workings
                                                                    </th>
                                                                    <th scope="col">Translate&nbsp;to&nbsp;functional&nbsp;curreny</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {otherdata.filter(name => name.final_holdings <= "50" && name.final_holdings >= 20).map(filteredName => (
                                                                    <tr>
                                                                        <th scope="row">{company}</th>
                                                                        <td> {filteredName.validation_check ?
                                                                            <button className="btn btn-primary1" disabled>Browse</button>
                                                                            :
                                                                            <button className="btn btn-primary1" onClick={() => browseConsole(filteredName._id)}>Browse</button>
                                                                        }
                                                                        </td>
                                                                        <td><b>{filteredName.validation_check ? <i class="fa fa-check-square" aria-hidden="true" style={{ fontSize: "30px", color: "green" }}></i> : <i class="fa fa-exclamation-circle" aria-hidden="true" style={{ fontSize: "30px", color: "red" }}></i>}</b></td>
                                                                        <td><input type='checkbox' /> </td>
                                                                        <td> <button className="btn btn-primary1" data-bs-toggle="modal" data-bs-target="#view-consol" >View&nbsp;Consol&nbsp;Workings</button> </td>
                                                                        <td> <button className="btn btn-primary1">Translate</button></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
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
            <Modal
                open={preset}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <div class="card-body">
                        <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="col-md-12">
                            <label>Investment Register </label>
                            <select className='form-control mt-2'
                                onChange={(e) => handleChangeInvest(e)}
                                value={investregsisterdata}
                            >
                                <option>select</option>
                                {(optionentry.length > 0 && optionentry.map((item => (
                                    <option key={item._id} value={item._id}>{item.project_name}</option>
                                ))))};
                            </select>
                            <button class="btn btn-primary mt-3" style={{ background: "rgb(3, 86, 90)", float: "right" }} onClick={handleSubmitRegsiter}>Save</button>
                        </div>

                    </div>
                </Box>
            </Modal>

            <Modal
                open={openuploadpreset}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <div class="card-body">
                        <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="col-md-12">
                            <label>Investment Register </label>
                            <select className='form-control mt-2'
                                onChange={(e) => handleChangeUpload(e)}
                                value={uploaddata}
                            >
                                <option>select</option>
                                {(optionentry.length > 0 && optionentry.map((item => (
                                    <option key={item._id} value={item._id}>{item.project_name}</option>
                                ))))};
                            </select>
                            <button class="btn btn-primary mt-3" style={{ background: "rgb(3, 86, 90)", float: "right" }} onClick={handleSubmitUpload}>Save</button>
                        </div>

                    </div>
                </Box>
            </Modal>

            <Modal
                open={openassociate}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style3}>
                    <div class="card-body">
                        <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="col-md-12">
                            <label>Investment Register </label>
                            <select className='form-control mt-2'
                                onChange={(e) => handleChangeUploadData(e)}
                                value={uploadassociatedata}
                            >
                                <option>select</option>
                                {(optionentry.length > 0 && optionentry.map((item => (
                                    <option key={item._id} value={item._id}>{item.project_name}</option>
                                ))))};
                            </select>
                            <button class="btn btn-primary mt-3" style={{ background: "rgb(3, 86, 90)", float: "right" }} onClick={handleSubmitUploadData}>Save</button>
                        </div>

                    </div>
                </Box>
            </Modal>

            <Modal
                open={setconsoleworking}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style4}>
                    <div class="card-body">
                        <button class="btn-close float-end" type="button" data-bs-dismiss="modal" aria-label="Close"></button>

                        <div class="col-sm-12">
                            <div class="card">
                                {/* <div class="card-block row">
                                        <div class="col-sm-12">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <select class="form-control mb-2">
                                                        <option>Select the notes</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <ol class="breadcrumb">
                                                        <li class="breadcrumb-item">BS</li>
                                                        <li class="breadcrumb-item">PNL</li>
                                                        <li class="breadcrumb-item"> e</li>
                                                    </ol>
                                                </div>
                                            </div>


                                            <div class="table-responsive">
                                                <table class="table table-bordered">

                                                    <tbody>
                                                        <tr class="bg-light ">

                                                            <td><b>Particular</b></td>
                                                            <td><b>Notes</b></td>
                                                            <td><b>As at Frebruary 20th,2023</b></td>
                                                            <td><b>As at Frebruary 20th,2022</b></td>

                                                        </tr>
                                                        <tr>

                                                            <td><input type="checkbox"/> Non Current Assets</td>
                                                            <td> </td>
                                                            <td>0</td>
                                                            <td>0</td>

                                                        </tr>
                                                        <tr>

                                                            <td> <input type="checkbox"/> Non Current Assets </td>
                                                            <td> </td>
                                                            <td>0</td>
                                                            <td>0</td>

                                                        </tr>
                                                        <tr>

                                                            <td> <input type="checkbox"/> Non Current Assets </td>
                                                            <td> </td>
                                                            <td>0</td>
                                                            <td>0</td>

                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> */}

                                <div style={{ maxHeight: "77vh", overflowY: "scroll" }}>
                                    <div
                                        style={{ minHeight: "77vh", width: "50vw" }}
                                        // onDragEnter={() => {
                                        //     // setHighlighted('#e9ebf0')
                                        // }}
                                        // onDragLeave={() => {
                                        //     // setHighlighted('')
                                        // }}
                                        // onDragOver={(e) => {
                                        //     e.preventDefault();
                                        // }}
                                    // onDrop={handleDrop}
                                    >
                                        {/* <TemplateTabs
                                            SetNewSg={SetNewSg}
                                        /> */}
                                        <ConsoleTemplateTabs
                                        SetNewSg={SetNewSg}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3" style={{ background: "rgb(3, 86, 90)", float: "right",width:"200px" }} >Save</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AdditionPresetMode
