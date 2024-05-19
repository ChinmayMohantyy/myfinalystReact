import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from './header'
import axios from "axios";
import swal from "sweetalert";

// img
import logo from '../assets/images/logo/Logo.svg';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Select } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
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
    width: 950,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddInvestment = () => {
    const auth = localStorage.getItem("auth_token");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    let history = useHistory();
    const location = useLocation();
    console.log(location.pathname);
    const [company, setName] = useState({})
    let a = location.pathname;
    let b = a.split('/')
    console.log(b[2]);
    const [data, setData] = useState("");
    const [totaldata, setDataTotal] = useState("");
    const [interest, setInterest] = useState("");
    const [natureinvest, setNatureInvest] = useState("");
    const [entryopen, setEntryOpen] = useState(false);
    const [optionentry,setOptionEntry] = useState("");
    const [browseOpen,setBrowseOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [eqityshare,setEquityShare] = useState("");
    const[totaleqity,setTotalEquity] = useState(eqityshare * -1);
    const [investvalue,setInvestValue] = useState("");
    const[otherequityshare,setOtherEquityShare] = useState("");
    const[otherreservesurplus,setOtherReserveSurplus] = useState("");
    const[othereserve,setOtherReserve] = useState("");
    const [setfinalsum,setFinalSum] = useState("");
    const [datavalue,setDataValue] = useState("");
    const[finalconsoleentry,setFinalConsoleEntry] = useState({});
    const [otherdetails,setOtherDetails] = useState([]);
    const [state, setstate] = useState([
        { column: "", select: ""}
    ]);
    const[detailsdata,setDetailsData] = useState("");
    const[selectedData,setSelectedData] = useState("");
    let totalAmount = totaleqity +(otherequityshare * -1)+(otherreservesurplus * -1)+(othereserve * -1)+(investvalue * -1)+(setfinalsum * -1) + (interest * -1);
    const [companydate, setCompanyDate] = useState({
        investment_date: "",
        company: "",
        investment_value: "",
        shares_bought: "",
        tnositc: "",
        holding: "",
        non_controlling_interest: "",
        browse_control_dateFS: "",
        donotdoc: "",
        wticacct: "",
        // add_other_details:"",
    });
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
                setName(response.data.getOneCompany[0])
            });
            fetchProject();
            
    }, [])

    const handleClose = () => {
        setOpen(false);
        setEntryOpen(false)
        setBrowseOpen(false)
    }
    const handleChange = (field, e) => {

        if (field === "shares_bought") {
            let data = e.target.value;
            setData(data)
            // extra part
            let holding = data / datavalue * 100;
            let noOfInterest = 100 - holding;
            setDataTotal(holding)
            setInterest(noOfInterest)
        }
        if (field === "tnositc") {
            let data2 = e.target.value;
            console.log(data2);
            setDataValue(e.target.value);
            let holding = data / datavalue * 10;//if error dn 10 to change 100
            let noOfInterest = 100 - holding;
            setDataTotal(holding)
            setInterest(noOfInterest)

            if (holding > 50) {
                setNatureInvest("Subsidiary Company")
            } else if (holding <= 50 && holding >= 20) {
                setNatureInvest("Associate Company")
            } else {
                setNatureInvest("Investment")
            }
        }
        if (field === "investment_value") {
            let investvalue = Number(e.target.value);
            setInvestValue(investvalue)
        }
        // // 
        setCompanyDate({ ...companydate, [field]: e.target.value })
    }

    const handleSubmit = () => {
        console.log("hgfd");
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        const data = {
            cid: b[2],
            investment_date: companydate.investment_date,
            company: companydate.company,
            investment_value: companydate.investment_value,
            shares_bought: companydate.shares_bought,
            tnositc: companydate.tnositc,
            holding: totaldata,
            non_controlling_interest: interest,
            browse_control_dateFS: companydate.browse_control_dateFS,
            donotdoc: companydate.donotdoc,
            wticacct: companydate.wticacct,
            nature_of_relationship: natureinvest,
            add_other_details: state,
            console_entry:finalconsoleentry,
            final_no_of_shares:companydate.shares_bought
        }
        console.log(data);
        axios.post('api/v1/company-data/register-company-data', data, { headers })
            .then(res => {
                console.log(res, 'res')
                history.push(`/create-investment/${b[2]}`)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const entryOpen = () => {
        setEntryOpen(true)
        console.log("kjhgfd");
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

    function browseFs() {
        setBrowseOpen(true);
    }
    const handleChangeFs=(e,data)=>{
        console.log(e.target.value);
        setSelectedOption(e.target.value)
    }   
    const handleSubmitFs=()=>{
        console.log(selectedOption);
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get(`/api/v1/grouping/fs/${selectedOption}`, { headers })
        .then(res => {
            console.log(res.data.fs_grp[2], 'res')
            setEquityShare(res.data.fs_grp[2].notes_grp[0].sub_grp[0].cy_amt);
            setOtherEquityShare(res.data.fs_grp[2].notes_grp[1].sub_grp[0].cy_amt);
            setOtherReserveSurplus(res.data.fs_grp[2].notes_grp[2].sub_grp[0].cy_amt);
            setOtherReserve(res.data.fs_grp[2].notes_grp[3].sub_grp[0].cy_amt);

            setBrowseOpen(false)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    function handleDelete(i) {
        const temp = state;
        const newarr = temp.filter((val, ix) => ix !== i);
        setstate(newarr);
        if (newarr.length == 0) {
        }
      }

    function handleNew() {
        setstate((oldArray) => [
          ...oldArray,
          { column: "", select: ""},
        ]);
        // dispatch({ type: actionTypes.SET_FILTER, payload: [] });
      }

      function handleChangeDetails(e,field,i) {
        // console.log(e.target.value);

        const newArray = state.map((item, index) => {
            if (i === index) {
                return { ...item, [e.target.name]: e.target.value};
            } else {
              return item;
            }
        });

        setstate(newArray)
        
      }

      const handleSave=()=>{
        let sum = 0;
        setOpen(false);
        const newData = state.map((item, index) => {
            let someData = Number(item.select);
            sum += someData;
        })
        console.log(sum);
        setFinalSum(sum)
      }

      const handleEntrySave=()=>{
        let dataentry ={
            ShareCapital:totaleqity,
            equity_component_of_compound_financial_instruments : otherequityshare*-1,
            reserves_and_surplus:otherreservesurplus*-1,
            other_reserves: othereserve*-1,
            investment: investvalue*-1,
            non_controlling_interest: interest*-1,
            otherinputs: setfinalsum*-1,
            goodwill: totalAmount*-1
        }
        setFinalConsoleEntry(dataentry);
        setEntryOpen(false);
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
                                        <h3>Add Investment</h3>
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
                                            <li className="breadcrumb-item active">Add Investment</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Container-fluid starts */}
                        <div className="container-fluid">
                            <div className="row second-chart-list third-news-update">
                                <div className="col-sm-12">
                                    <div className="card1">
                                        <form>
                                            <div className="card-body1" style={{ paddingBottom: '20px' }}>
                                                <div className="row">
                                                    <div className="col-6 form-group mt-3">
                                                        <label>Date of Investment</label>
                                                        <input onChange={(e) => handleChange('investment_date', e)} type="date" className="form-control" />
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <label>Company Name</label>
                                                        <input type="text" className="form-control" placeholder="Enter company name" onChange={(e) => handleChange('company', e)} />
                                                    </div>
                                                </div>
                                                <div className="row  mt-3">
                                                    <div className="col-6 form-group">
                                                        <label>Company Code</label>
                                                        <input type="text" className="form-control" value={company.company_code} disabled />
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <label>Value of Investment</label>
                                                        <input onChange={(e) => handleChange('investment_value', e)} type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="row  mt-3">
                                                    <div className="col-6 form-group">
                                                        <label>No. of shares bought</label>
                                                        <input onChange={(e) => handleChange('shares_bought', e)} type="text" className="form-control" />
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <label>Total no. of shares in the company</label>
                                                        <input onChange={(e) => handleChange('tnositc', e)} type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-6 form-group">
                                                        <label>% Holding</label>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input onChange={(e) => handleChange('holding', e)} type="text" className="form-control" placeholder="%" value={totaldata} disabled />
                                                            </div>
                                                            {totaldata > 50 &&
                                                                <div className="col-md-6 text-center mt-3" onClick={() => entryOpen()}>
                                                                    <input type="button" className="btn btn-primary w-100" value="Create consol entry" />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <div className="row">
                                                            <div className="col-md-6">

                                                                <label>Non-controlling interest %</label>
                                                                <input onChange={(e) => handleChange('non_controlling_interest', e)} type="text" className="form-control" value={interest} disabled />
                                                            </div>
                                                            {totaldata > 50 &&
                                                                //
                                                                <div className="col-md-6 text-center mt-5" onClick={() => browseFs()}>
                                                                    <input type="button" className="btn btn-primary w-100" value="Browse control date FS" />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                {totaldata > 50 &&
                                                    <div className="row  mt-3">
                                                        <div className="col-6 form-group">
                                                            <label>Details of networth on the date of control</label>
                                                            <input onChange={(e) => handleChange('donotdoc', e)} type="text" className="form-control" />
                                                        </div>
                                                        <div className="col-5 offset-1 form-group">
                                                            <label>Add other details </label>
                                                            <div onClick={handleOpen} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible">+</div>
                                                        </div>
                                                    </div>
                                                }
                                                {totaldata > 50 &&
                                                    <div className="row">
                                                        <div className="col-6 form-group">
                                                            <label>Whether transaction is covered as common control transaction</label>
                                                            <select onChange={(e) => handleChange('wticacct', e)} className="form-select">
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-5 offset-1 form-group">
                                                            <div class="table-responsive table-bordered">
                                                                <table class="table">
                                                                    <tbody>
                                                                    {(state.length >  0  && state.map((item=>(
                                                                        <>
                                                                            <tr>
                                                                                <td>{item.column}</td>
                                                                                <td>{item.select}</td>
                                                                            </tr>  
                                                                        </>
                                                                        ))))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                            <hr />
                                            <div className="card-body1" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                                <input type="button" className="btn btn-primary1" value="Submit" onClick={handleSubmit} />
                                            </div>
                                        </form>
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
                <>
                <Box sx={style}>
                    <div className="col-12">
                        <button type="button" onClick={handleClose} class="btn-close float-end"></button>
                        <div className="mb-3">
                            <div className="row">
                            {state.map((val, i) => {
                                return (
                                    <>
                                        <div className="col-md-6 mt-2">
                                        <select className="form-select" name='column' onChange={(e) => handleChangeDetails(e,'select',i)}>
                                            <option>Select</option>
                                            <option value="Intangible asset1 (PPA)">Intangible asset1 (PPA)</option>
                                            <option value="Intangible asset2 (PPA)">Intangible asset2 (PPA)</option>
                                            <option value="Intangible asset3 (PPA)">Intangible asset3 (PPA)</option>
                                        </select>
                                    </div>
                                        <div className="col-md-4">
                                            <input type="text" name='select'  className="form-control" onChange={(e) => handleChangeDetails(e,'input',i)} />
                                        </div>
                                        <div
                                        style={close}
                                        onClick={() => {
                                            handleDelete(i);
                                        }}
                                        >
                                       <button type="button" class="btn-close float-end" style={{color:"red"}}></button>
                                        </div>
                                    </>
                                );
                            })}
                                <div className="col-md-2 mt-2">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible"onClick={() => {handleNew()}} >+</button>
                                </div>
                            </div>
                        </div>
                        <input type="button" className="btn btn-primary" value="Submit" onClick={() => {handleSave()}}/>
                        {/* <input type="button" className="btn btn-defult" value="Close" onClick={handleClose} /> */}
                    </div>
                </Box>
                </>
               
            </Modal>

            <Modal
                open={entryopen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div className="col-12">
                        <button type="button" onClick={handleClose} class="btn-close float-end"></button>
                        <div class="table-responsive table-bordered">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td>A</td>
                                        <td>B</td>
                                        <td>C</td>
                                        <td>D</td>
                                    </tr>
                                    <tr>
                                        <td>perticular</td>
                                        <td>Calculation</td>
                                        <td>Calculation</td>
                                        <td>Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Share Capital</strong></td>
                                        <td>{eqityshare?eqityshare:"0"}</td>
                                        <td>* -1</td>
                                        <td>{totaleqity?totaleqity:"0"}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Level 3 notes (inside level 2- Other equity)</strong></td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                    <td>equity component of compound financial instruments</td>
                                        <td>{otherequityshare?otherequityshare:"0"}</td>
                                        <td>* -1</td>
                                        <td>{otherequityshare * -1}</td>
                                    </tr>
                                    <tr>
                                    <td>reserves and surplus</td>
                                        <td>{otherreservesurplus?otherreservesurplus:"0"}</td>
                                        <td>* -1</td>
                                        <td>{otherreservesurplus * -1}</td>
                                    </tr>
                                    <tr>
                                        <td>other reserves</td>
                                        <td>{othereserve?othereserve:"0"}</td>
                                        <td>* -1</td>
                                        <td>{othereserve * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Investment</strong></td>
                                        <td>{investvalue?investvalue:"0"}</td>
                                        <td>* -1</td>
                                        <td>{investvalue * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Non-controlling interest</strong></td>
                                        <td>{interest}</td>
                                        <td>* -1</td>
                                        <td>{interest * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Other inputs</strong></td>
                                        <td>{setfinalsum}</td>
                                        <td>* -1</td>
                                        <td>{setfinalsum * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Goodwill</strong></td>
                                        <td>Balancing Figure</td>
                                        <td>* -1</td>
                                        <td>{totalAmount * -1}</td>
                                    </tr>
                                </tbody>
                                <input type="button" className="btn btn-primary" value="Submit" onClick={() => {handleEntrySave()}}/>
                            </table>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={browseOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                    <div className="col-12">
                        {/* <button type="button" onClick={handleClose} class="btn-close float-end"></button> */}
                        <div className="col-md-12 form-group">
                            <label>Browse control date FS</label>
                            <select className='form-control mt-2' onChange={(e) => handleChangeFs(e)} value={selectedOption}>
                                <option>select</option>
                                {(optionentry.length >  0  && optionentry.map((item=>(
                                    <option key={item._id} value={item._id}>{item.project_name}</option>
                                ))))};
                            </select>
                        </div>
                        <input type="button" className="btn btn-primary float-end" value="Submit" onClick={handleSubmitFs}/>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AddInvestment
