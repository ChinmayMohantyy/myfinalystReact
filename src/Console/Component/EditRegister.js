import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import Header from './header'

// img
import logo from '../assets/images/logo/Logo.svg';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
const style = {
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
function EditRegister() {
    const auth = localStorage.getItem("auth_token");
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpen1 = () => setOpen1(true);
    const [browseOpen,setBrowseOpen] = useState(false);
    const [optionentry,setOptionEntry] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [eqityshare,setEquityShare] = useState("");
    const[otherequityshare,setOtherEquityShare] = useState("");
    const[otherreservesurplus,setOtherReserveSurplus] = useState("");
    const[othereserve,setOtherReserve] = useState("");
    const [setfinalsum,setFinalSum] = useState("");
    const [totaldata, setDataTotal] = useState("");
    const [interest, setInterest] = useState("");
    const [entryopen, setEntryOpen] = useState(false);
    const [natureinvest, setNatureInvest] = useState("");
    const [editconsoleentry,setEditConsoleEntry] = useState("");
    const [additinalData,setAdditinalData] = useState([]);
    const [data, setData] = useState("");
    const [openconsoleentry,setOpenConsoleEntry] = useState(false);
    const [browseopendata,setBrowseOpenData] = useState(false);
    const [consoleadditional,setConsoleAdditional] = useState("");
    const [datacondition,setDataCondition] = useState("");
    const [itemid,setItemID] = useState("");
    const [hidediv,setHideDiv] =useState(true);
    const [finalnoofshar,setFinalNoOfShare] = useState("");
    const [finalinvestment,setFinalInvestment] = useState("");
    const [noofdevest,setNoOfDevest] = useState("");
    const [dilutiondata,setDilutionData] = useState({
        date_of_divest:"",
        no_of_share:"",
        sale:"",
    });
    const [updateadditinaldata,setUpdateAdditionalData] = useState({
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
    });
    const [registerdata,setRegisterDAta] =useState({
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
        other_items:"",
    });
    let no_of_share = Number(registerdata.no_of_shares) + finalnoofshar;
    console.log(no_of_share);
    let final_investment = Number(registerdata.value_of_investment) + finalinvestment;
    let dataValue = Number(no_of_share)/Number(final_investment) * noofdevest;
    console.log(dataValue);
    const [name,setName] = useState("");
    let history = useHistory();
    const [state, setstate] = useState([
        { column: "", select: ""}
    ]);
    let a = location.pathname;
    let b = a.split('/')
    console.log(b[2]);

    let holding = registerdata.no_of_shares / registerdata.total_no_shares * 100;
    let notInterest = registerdata.total_no_shares - registerdata.no_of_shares;
    console.log(registerdata,"jaiaiajaiaiaij");
    const handleClose = () => {
        setOpen(false);
        setOpen1(false);
        setBrowseOpen(false);
        setEntryOpen(false);
        setOpenConsoleEntry(false);

    }

    useEffect(() => {
        getRegister();
        fetchProject();
        fetchAdditionalData();
        
    }, [])


    console.log(openconsoleentry);

    function getRegister() {
        let headers = {
            "x-auth-token": auth,
        };
        axios
            .get(`api/v1/company-data/edit-register/${b[2]}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data.editOtherData[0],
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                console.log(response.data.editOtherData[0].console_entry[0]);
                setEditConsoleEntry(response.data.editOtherData[0].console_entry[0]);
                setRegisterDAta(response.data.editOtherData[0]);
            });
            getCompany();
    }

    function getCompany() {
        console.log(registerdata.c_id);
        let headers = {
            "x-auth-token": auth,
        };
        axios
            .get(`api/v1/company/get-onecomapny/${registerdata.c_id}`, {
                headers,
            })
            .then((response) => {
                console.log(
                    response.data.getOneCompany,
                    "dat dat dat datd ddat dat dat dat dat dta dat d"
                );
                setName(response.data.getOneCompany[0])
            });
    }
    
    const handleChange=(e,field)=>{
       console.log(e.target.value);
       setRegisterDAta({ ...registerdata, [field]: e.target.value })
       if (field === "no_of_bought") {
        let data = Number(e.target.value);
        setData(data)
    }
    if (field === "total_share") {
        let data2 = Number(e.target.value);
        console.log(data);
        let holding = data / data2 * 100;
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
    }

    const handleNew=()=>{
        setstate((oldArray) => [
            ...oldArray,
            { column: "", select: ""},
          ]);
    }
    function handleDelete(i) {
        const temp = state;
        const newarr = temp.filter((val, ix) => ix !== i);
        setstate(newarr);
        if (newarr.length == 0) {
        }
    }

    const handleSubmit=()=>{
    
    let headers = {
        "x-auth-token": auth,
    };
    const data = {
    investment_date:registerdata.doi,
    company:registerdata.company_name,
    investment_value: registerdata.voi,
    shares_bought:registerdata.no_of_bought,
    tnositc:registerdata.total_share,
    holding:totaldata,
    non_controlling_interest:notInterest,
    donotdoc:registerdata.doi,
    nature_of_relationship: natureinvest,
    wticacct: registerdata.transaction,
    add_other_details: state,
    console_other_details:setfinalsum
    }
    axios
        .post(`api/v1/company-data/update-company-data/${b[2]}`,data,{
            headers,
        })
        .then((response) => {
            console.log(
                response.data,
                "dat1212121212"
            );
            getRegister();
        });
    }

    function browseFs() {
    setBrowseOpen(true);
    }
    function browseFsData() {
    setBrowseOpenData(true);
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

    const handleSave=()=>{
        // let data = state.shift();
        console.log(state);
        let sum = 0;
        setOpen1(false);
        const newData = state.map((item, index) => {
            let someData = Number(item.select);
            sum += someData;
        })
        console.log(sum);
        setFinalSum(sum)
    }

    const fetchAdditionalData=()=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get(`api/v1/company-data/fetch-additional-data/${b[2]}`, { headers })
        .then(res => {
            console.log(res.data.fetchAddinalData, 'res343434')
            let finaLData = res.data.fetchAddinalData.sort((a, b) => a - b).reverse()
            setAdditinalData(finaLData);
            let x = 0;
            let y =0;
            setConsoleAdditional(res.data.fetchAddinalData[0].console_entry[0]);
            res.data.fetchAddinalData.map((item, index) => {
                x += Number(item.no_of_shares)
                y += Number(item.value_of_investment)
              })
              console.log(x,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
              console.log(y);
              setFinalNoOfShare(x);
              setFinalInvestment(y);
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const hideDiv=()=>{
        setHideDiv(false);
    }

    const entryOpen = () => {
        setEntryOpen(true)
        console.log("kjhgfd");
    }
    const additionalEntryOpen=(id)=>{
        console.log(id);
        fetchId(id);
    }

    const handleAdditionChange = (e,field)=>{
        console.log(e.target.value);
        setUpdateAdditionalData({ ...updateadditinaldata, [field]: e.target.value })
    }

    const handleSubmitAddition=(aid)=>{
        let headers = {
            "x-auth-token": auth,
        };
        const dataAdd = {
        investment_date:updateadditinaldata.doi,
        company:updateadditinaldata.company_name,
        investment_value: updateadditinaldata.voi,
        shares_bought:updateadditinaldata.no_of_bought,
        tnositc:updateadditinaldata.total_share,
        holding:totaldata,
        non_controlling_interest:notInterest,
        donotdoc:updateadditinaldata.doi,
        // nature_of_relationship: updateadditinaldata,
        wticacct: updateadditinaldata.transaction,
        add_other_details: ""
        }
        axios
            .post(`api/v1/company-data/update-additional-data/${aid}`,dataAdd,{
                headers,
            })
            .then((response) => {
                console.log(
                    response.data,
                    "dat1212121212"
                );
                getRegister();
            });
    }

    function handleChangeDetails(e,field,i) {
        console.log(e.target.value);

        const newArray = state.map((item, index) => {
            if (i === index) {
                return { ...item, [e.target.name]: e.target.value};
            } else {
              return item;
            }
        });
        console.log(newArray);
        setstate(newArray)
        
      }
      
    function fetchId(id) {
        let headers = {
            "x-auth-token": auth,
        };
        axios.get(`api/v1/company-data/fetch-additional/${id}`, { headers })
        .then(res => {
            console.log(res.data, 'res');
            setOpenConsoleEntry(true);
            setDataCondition(res.data.fetchAddinal[0]);
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleDilutionChange=(e,field)=>{
        console.log(e.target.value);
       setDilutionData({ ...dilutiondata, [field]: e.target.value })
       if (field === "no_of_share") {
            setNoOfDevest(e.target.value);
       }

    }

    const handleDelution=()=>{
        let headers = {
            "x-auth-token": auth,
        };
        const delution = {
        rid:b[2],
        cid:registerdata.c_id,
        date_of_devestment:dilutiondata.date_of_divest,
        No_shares_divested:dilutiondata.no_of_share,
        sale_value: dilutiondata.sale,
        cost_of_invest:dataValue,
        status:"dilution",
        }
        axios
            .post(`api/v1/company-data/delution-data`,delution,{
                headers,
            })
            .then((response) => {
                console.log(response.data,"dat1212121212");
                setOpen(false);
                fetchAdditionalData();
            });
    }

    console.log(registerdata);
    console.log(datacondition);
    return (
        <div>
            <div className="tap-top"><i data-feather="chevrons-up"></i></div>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header />
                <div className="page-body-wrapper">
                    <div className="sidebar-wrapper">
                        <div>
                            <div className="logo-wrapper">
                                <Link to="index.html">
                                    <img className="img-fluid for-light" src={logo} alt="" />
                                    {/* <img className="img-fluid for-dark" src="../assets/images/logo/Logo.svg" alt="" /> */}
                                </Link>
                            </div>
                            <div className="logo-icon-wrapper">
                                <Link to="index.html">
                                    {/* <img className="img-fluid" src="../assets/images/logo/Logo.svg" alt="" /> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* {/ Page Sidebar Ends /} */}
                    <div className="page-body">
                        <div className="container-fluid">
                            <div className="page-title">
                            </div>
                        </div>
                        {/* {/ Container-fluid starts /} */}
                        <div className="container-fluid">
                            <div className="row second-chart-list third-news-update">
                                <div className="col-sm-12">
                                    <div className="card">
                                            <div className="col-12 text-center mb-2">
                                                <button className="btn btn-primary me-1" onClick={()=> history.push(`/addition-register/${b[2]}`)} style={{background:"rgb(3, 86, 90)"}}>Addition</button>
                                                <button onClick={handleOpen} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dilution" style={{background:"rgb(3, 86, 90)"}}>Dilution</button>
                                            </div>


                                            {/* additional */}
                                                {(additinalData.length >  0  && additinalData.map(((item,i)=>(
                                                    <>
                                                    <div className="default-according p-4" id="accordion1">
                                                            <div className="card">
                                                                <div style={{ backgroundColor: '#03565a' }} className="card-header" id="headingFive">
                                                                {item.status === "addition" &&
                                                                    <h5 className="mb-0">
                                                                        <button className="btn btn-link collapsed text-white"
                                                                            data-bs-toggle="collapse" data-bs-target="#collapseFive"
                                                                            aria-expanded="false" aria-controls="collapseFive"
                                                                            data-bs-original-title="" title=""> Tranch {additinalData.length - i+1}
                                                                            <br />
                                                                            <span><b>Date of Investment:</b> {item.date_Of_investment}</span> <span
                                                                                className="ps-4"><b>Investment Value:</b> {item.value_of_investment}</span>
                                                                                </button>
                                                                    </h5>
                                                                    }
                                                                    {item.status === "dilution" &&
                                                                    <>
                                                                     <h5 className="mb-0">
                                                                        <button className="btn btn-link collapsed text-white"
                                                                            data-bs-toggle="collapse" data-bs-target="#collapseFive"
                                                                            aria-expanded="false" aria-controls="collapseFive"
                                                                            data-bs-original-title="" title=""> Tranch {additinalData.length - i+1}
                                                                            <br />
                                                                            <span><b>Date of Dilution:</b> {item.date_of_devestment}</span> <span
                                                                                className="ps-4"><b>Investment Value:</b> {Math.round(item.cost_of_invest)}</span>
                                                                                </button>
                                                                    </h5>
                                                                    </>
                                                                    }
                                                                </div>
                                                                
                                                                <div className="collapse show" id="collapseFive" aria-labelledby="headingFive"
                                                                    data-bs-parent="#accordion1">
                                                                    <form>
                                                                        {item.status === "addition" &&
                                                                        <>
                                                                        <div className="card-body">
                                                                            {/* <h3>Tranch 1</h3> */}
                                                                            <div className="row">
                                                                                <div className="col-6 form-group">
                                                                                    <label>Date of Investment</label>
                                                                                    <input type="date" className="form-control" defaultValue={item.date_Of_investment} onChange={(e)=>handleAdditionChange(e,'doi')}/>
                                                                                </div>
                                                                                <div className="col-5 offset-1 form-group">
                                                                                    <label>Company Name</label>
                                                                                    <input type="text" className="form-control" placeholder="Enter company name" name='company_name' defaultValue={item.company} onChange={(e)=>handleAdditionChange(e,'company_name')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row  mt-3">
                                                                                <div className="col-6 form-group">
                                                                                    <label>Company Code</label>
                                                                                    <input type="text" className="form-control" defaultValue={name.company_code} disabled/>
                                                                                </div>
                                                                                <div className="col-5 offset-1 form-group">
                                                                                    <label>Value of Investment</label>
                                                                                    <input type="text" className="form-control" defaultValue={item.value_of_investment} onChange={(e)=>handleAdditionChange(e,'voi')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row  mt-3">
                                                                                <div className="col-6 form-group">
                                                                                    <label>No. of shares bought</label>
                                                                                    <input type="text" className="form-control" defaultValue={item.no_of_shares} onChange={(e)=>handleAdditionChange(e,'no_of_bought')}/>
                                                                                </div>
                                                                                <div className="col-5 offset-1 form-group">
                                                                                    <label>Total no. of shares in the company</label>
                                                                                    <input type="text" className="form-control" defaultValue={item.total_no_shares} onChange={(e)=>handleAdditionChange(e,'total_share')}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mt-3">
                                                                                <div className="col-6 form-group">
                                                                                    <label>% Holding</label>
                                                                                    <div className="row">
                                                                                        <div className="col-md-6">
                                                                                            <input type="text" className="form-control" value={item.holdings} disabled/>
                                                                                        </div>
                                                                                        {item.holdings > 50 &&
                                                                                        <div className="col-md-6 text-center mt-2"onClick={() => additionalEntryOpen(item._id)}>
                                                                                            <input type="button" className="btn btn-primary w-100" value="Create Console Entry" style={{background:"rgb(3, 86, 90)"}}/>
                                                                                        </div>
                                                                                        }
                                                                                    </div>


                                                                                </div>
                                                                                <div className="col-5 offset-1 form-group">
                                                                                    <div className="row">
                                                                                        <div className="col-md-6">

                                                                                            <label>Non-controlling interest %</label>
                                                                                            <input type="text" className="form-control" value={100 - item.holdings} disabled/>
                                                                                        </div>
                                                                                        {item.holdings > 50 &&
                                                                                            <div className="col-md-6 text-center mt-5" onClick={() => browseFsData()}>
                                                                                            <input type="button" className="btn btn-primary w-100" value="Browse control date FS" style={{background:"rgb(3, 86, 90)"}}/>
                                                                                            </div>
                                                                                        }
                                                                                        
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {item.holdings > 50 &&
                                                                            <div className="row  mt-3">
                                                                                <div className="col-6 form-group">
                                                                                    <label>Details of networth on the date of control</label>
                                                                                    <input type="text" className="form-control" defaultValue={item.details_networth} onChange={(e)=>handleAdditionChange(e,'doi')} />
                                                                                </div>
                                                                                <div className="col-5 offset-1 form-group">
                                                                                    <label>Add other details </label>
                                                                                    <input onClick={handleOpen1} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible" value="+" style={{background:"rgb(3, 86, 90)"}}/>
                                                                                    {/* <Link className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible">+</Link> */}

                                                                                </div>
                                                                            </div>
                                                                            }
                                                                            {item.holdings > 50 &&
                                                                            <div className="row mt-3">
                                                                                <div className="col-6 form-group">
                                                                                    <label>Whether transaction is covered as common control
                                                                                        transaction</label>
                                                                                    <select className="form-control" defaultValue={item.transaction_is_covered} onChange={(e)=>handleAdditionChange(e,'transaction')}>
                                                                                        <option>Yes</option>
                                                                                        <option>No</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="col-5 offset-1 form-group">
                                                                                <div class="table-responsive table-bordered">
                                                                                    <table class="table">
                                                                                        <tbody>
                                                                                        {(item.other_items.length >  0  && item.other_items.map((element=>(
                                                                                            <>
                                                                                                <tr>
                                                                                                    <td>{element.column}</td>
                                                                                                    <td>{element.select}</td>
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
                                                                        </>
                                                                        }
                                                                        {item.status === "dilution" &&
                                                                        <>
                                                                        <h1>
                                                                        <div className="card-body">
                                                                                <div className="row">
                                                                                    <div className="col-6 form-group">
                                                                                        <label>Date of Divestment</label>
                                                                                        <input type="date" className="form-control" defaultValue={item.date_of_devestment} disabled/>
                                                                                    </div>
                                                                                    <div className="col-5 offset-1 form-group">
                                                                                        <label>No. of shares divested</label>
                                                                                        <input type="text" className="form-control" defaultValue={item.No_shares_divested} disabled/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row">
                                                                                    <div className="col-6 form-group">
                                                                                        <label>Sale value</label>
                                                                                        <input type="text" className="form-control" defaultValue={item.sale_value} disabled/>
                                                                                    </div>
                                                                                    <div className="col-5 offset-1 form-group">
                                                                                        <label>Cost of Investment</label>
                                                                                        <input type="text" className="form-control" placeholder="Enter company name" name='company_name' defaultValue={item.cost_of_invest} disabled/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </h1>
                                                                        </>
                                                                        }
                                                                        <hr />
                                                                        <div className="card-body" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                                                            <input type="button" className="btn btn-primary" value="Submit" onClick={()=>handleSubmitAddition(item._id)} style={{background:"rgb(3, 86, 90)"}}/>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    ))))}
                                            
                                            {/* end Additional */}


                                        <div className="default-according p-4" id="accordion1">
                                                <div className="card">
                                                    <div style={{ backgroundColor: '#03565a' }} className="card-header" id="headingFive">
                                                        <h5 className="mb-0">
                                                            <button className="btn btn-link collapsed text-white"data-bs-toggle="collapse" href="#collapseFive" onClick={hideDiv}> Tranch 1
                                                                <br />
                                                                <span><b>Date of Investment:</b> {registerdata.date_Of_investment}</span> <span
                                                                    className="ps-4"><b>Investment Value:</b> {registerdata.value_of_investment}</span>
                                                                    </button>
                                                        </h5>
                                                    </div>
                                                    {hidediv &&
                                                        <div className="collapse show" id="collapseFive" aria-labelledby="headingFive"
                                                        data-bs-parent="#accordion">
                                                        <form>
                                                            <div className="card-body">
                                                                {/* <h3>Tranch 1</h3> */}
                                                                <div className="row">
                                                                    <div className="col-6 form-group">
                                                                        <label>Date of Investment</label>
                                                                        <input type="date" className="form-control" defaultValue={registerdata.date_Of_investment} onChange={(e)=>handleChange(e,'doi')}/>
                                                                    </div>
                                                                    <div className="col-5 offset-1 form-group">
                                                                        <label>Company Name</label>
                                                                        <input type="text" className="form-control" placeholder="Enter company name" name='company_name' defaultValue={registerdata.company} onChange={(e)=>handleChange(e,'company_name')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="row  mt-3">
                                                                    <div className="col-6 form-group">
                                                                        <label>Company Code</label>
                                                                        <input type="text" className="form-control" defaultValue={name.company_code} disabled/>
                                                                    </div>
                                                                    <div className="col-5 offset-1 form-group">
                                                                        <label>Value of Investment</label>
                                                                        <input type="text" className="form-control" defaultValue={registerdata.value_of_investment} onChange={(e)=>handleChange(e,'voi')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="row  mt-3">
                                                                    <div className="col-6 form-group">
                                                                        <label>No. of shares bought</label>
                                                                        <input type="text" className="form-control" defaultValue={registerdata.no_of_shares} onChange={(e)=>handleChange(e,'no_of_bought')}/>
                                                                    </div>
                                                                    <div className="col-5 offset-1 form-group">
                                                                        <label>Total no. of shares in the company</label>
                                                                        <input type="text" className="form-control" defaultValue={registerdata.total_no_shares} onChange={(e)=>handleChange(e,'total_share')}/>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-6 form-group">
                                                                        <label>% Holding</label>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <input type="text" className="form-control" value={totaldata?totaldata:holding} onChange={(e)=>handleChange(e,'holding')} disabled/>
                                                                            </div>
                                                                            {holding > 50 &&
                                                                            <div className="col-md-6 text-center mt-2" onClick={() => entryOpen()}>
                                                                                <input type="button" className="btn btn-primary w-100" value="Create Console Entry" style={{background:"rgb(3, 86, 90)"}}/>
                                                                            </div>
                                                                            }
                                                                        </div>


                                                                    </div>
                                                                    <div className="col-5 offset-1 form-group">
                                                                        <div className="row">
                                                                            <div className="col-md-6">

                                                                                <label>Non-controlling interest %</label>
                                                                                <input type="text" className="form-control" value={interest?interest:notInterest} disabled/>
                                                                            </div>
                                                                            {holding > 50 &&
                                                                                <div className="col-md-6 text-center mt-5" onClick={() => browseFs()}>
                                                                                <input type="button" className="btn btn-primary w-100" value="Browse control date FS" style={{background:"rgb(3, 86, 90)"}}/>
                                                                                </div>
                                                                            }
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {holding > 50 &&
                                                                <div className="row  mt-3">
                                                                    <div className="col-6 form-group">
                                                                        <label>Details of networth on the date of control</label>
                                                                        <input type="text" className="form-control" defaultValue={registerdata.details_networth} onChange={(e)=>handleChange(e,'doi')} />
                                                                    </div>
                                                                    <div className="col-5 offset-1 form-group">
                                                                        <label>Add other details </label>
                                                                        <input onClick={handleOpen1} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible" value="+" style={{background:"rgb(3, 86, 90)"}}/>
                                                                        {/* <Link className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible">+</Link> */}

                                                                    </div>
                                                                </div>
                                                                }
                                                                {holding > 50 &&
                                                                <div className="row mt-3">
                                                                    <div className="col-6 form-group">
                                                                        <label>Whether transaction is covered as common control
                                                                            transaction</label>
                                                                        <select className="form-select" defaultValue={registerdata.transaction_is_covered} onChange={(e)=>handleChange(e,'transaction')}>
                                                                            <option>Yes</option>
                                                                            <option>No</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="col-5 offset-1 form-group">
                                                                    <div class="table-responsive table-bordered">
                                                                        <table class="table">
                                                                            <tbody>
                                                                            {(registerdata.other_items.length >  0  && registerdata.other_items.map((item=>(
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
                                                            <div className="card-body" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                                                <input type="button" className="btn btn-primary" value="Submit" onClick={handleSubmit} style={{background:"rgb(3, 86, 90)"}}/>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    }
                                                    
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <input type="button" className="btn btn-defult" value="X" onClick={handleClose} style={{float:"right"}}/>
                            <div className="col-12">
                                <h5>Dilution</h5>
                                <div className="form-group mb-1 col-12">
                                    <label>Date of divestment</label>
                                    <input type="date" className="form-control" value={dilutiondata.date_of_divest} onChange={(e)=>handleDilutionChange(e,"date_of_divest")}/>
                                </div>
                                <div className="form-group mb-1 col-12">
                                    <label>No. of shares divested</label>
                                    <input type="text" className="form-control" value={dilutiondata.no_of_share} onChange={(e)=>handleDilutionChange(e,"no_of_share")}/>
                                </div>
                                <div className="form-group mb-1 col-12">
                                    <label>Sale value</label>
                                    <input type="text" className="form-control" value={dilutiondata.sale} onChange={(e)=>handleDilutionChange(e,"sale")}/>
                                </div>
                                <div className="form-group mb-1 col-12">
                                    <label>Cost of Investment
                                    </label>
                                    <input type="text" className="form-control" value={dataValue} readOnly/>
                                </div>
                                <div className="form-group mb-1 col-12">
                                    <input type="button" className="btn btn-primary1" value="Submit" onClick={()=>handleDelution()}/>
                                </div>
                                
                            </div>
                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={open1}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <div className="col-12">
                        <button type="button" onClick={handleClose} class="btn-close float-end"></button>
                        <div className="mb-3">
                            <div className="row">
                            {state.map((val, i) => {
                                return (
                                    <>
                                        <div className="col-md-6 mt-2">
                                        <select className="form-select" name='column'
                                         onChange={(e) => handleChangeDetails(e,'select',i)}
                                         >
                                            <option>Select</option>
                                            <option value="Intangible asset1 (PPA)">Intangible asset1 (PPA)</option>
                                            <option value="Intangible asset2 (PPA)">Intangible asset2 (PPA)</option>
                                            <option value="Intangible asset3 (PPA)">Intangible asset3 (PPA)</option>
                                        </select>
                                    </div>
                                        <div className="col-md-4">
                                            <input type="text" name='select'  className="form-control"
                                             onChange={(e) => handleChangeDetails(e,'input',i)}
                                              />
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
                                    <option key={item._id} value={item._id} selected={selectedOption == item._id}>{item.project_name}</option>
                                ))))};
                            </select>
                        </div>
                        <input type="button" className="btn btn-primary float-end" value="Submit" onClick={handleSubmitFs}/>
                    </div>
                </Box>
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
                                        <td>{editconsoleentry.ShareCapital * -1}</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.ShareCapital}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Level 3 notes (inside level 2- Other equity)</strong></td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                    <td>equity component of compound financial instruments</td>
                                        <td>{editconsoleentry.equity_component_of_compound_financial_instruments * -1}</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.equity_component_of_compound_financial_instruments}</td>
                                    </tr>
                                    <tr>
                                    <td>reserves and surplus</td>
                                        <td>{editconsoleentry.reserves_and_surplus * -1}</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.reserves_and_surplus}</td>
                                    </tr>
                                    <tr>
                                        <td>other reserves</td>
                                        <td>{editconsoleentry.other_reserves * -1}</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.other_reserves}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Investment</strong></td>
                                        <td>{editconsoleentry.investment * -1}</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.investment}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Non-controlling interest</strong></td>
                                        <td>{editconsoleentry.non_controlling_interest * -1}</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.non_controlling_interest}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Other inputs</strong></td>
                                        <td>{setfinalsum * -1}</td>
                                        <td>* -1</td>
                                        <td>{setfinalsum}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Goodwill</strong></td>
                                        <td>Balancing Figure</td>
                                        <td>* -1</td>
                                        <td>{editconsoleentry.goodwill}</td>
                                    </tr>
                                </tbody>
                                {/* <input type="button" className="btn btn-primary" value="Submit" onClick={() => {handleEntrySave()}}/> */}
                            </table>
                        </div>
                    </div>
                </Box>
                </Modal>
                {/* additional */}
                <Modal
                open={browseopendata}
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
                                    <option key={item._id} value={item._id} selected={selectedOption == item._id}>{item.project_name}</option>
                                ))))};
                            </select>
                        </div>
                        <input type="button" className="btn btn-primary float-end" value="Submit" onClick={handleSubmitFs}/>
                    </div>
                </Box>
                </Modal>


                {(datacondition && <Modal
                    open={openconsoleentry}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    {datacondition.console_entry_third_stage.length === 0 &&
                        <div className="col-12">
                        <button type="button" onClick={handleClose} class="btn-close float-end"></button>
                        <div class="table-responsive table-bordered">
                        <table class="table">
                                <thead>
                                    <tr>
                                        <td>11A{openconsoleentry}</td>
                                        <td>B</td>
                                        <td>C</td>
                                        <td>D</td>
                                    </tr>
                                    <tr>
                                        <td><strong>perticular</strong></td>
                                        <td><strong>Calculation</strong></td>
                                        <td><strong>Calculation</strong></td>
                                        <td><strong>Amount</strong></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Investment</strong></td>
                                        <td>
                                            <input type="text" className="form-control" name='calculation1'
                                            //  onChange={(e)=>handleInvestChnage(e,"calculation1")}
                                            value={consoleadditional.Investment_calculation1}
                                            disabled
                                            />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" name='calculation2' 
                                            // onChange={(e)=>handleInvestChnage(e,"calculation2")}
                                            value={consoleadditional.Investment1_value}
                                            disabled
                                            />
                                        </td>
                                        <td>{consoleadditional.Investment_calculation1 * consoleadditional.Investment1_value}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Gain on fair valuation of Investment</strong></td>
                                        <td>
                                            <input type="text" className="form-control" 
                                            // onChange={(e)=>handleValuationChnage(e,"calculation3")}
                                            value={consoleadditional.valuation_calculation}
                                            disabled
                                            />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control"
                                            //  onChange={(e)=>handleValuationChnage(e,"calculation4")}
                                            value={consoleadditional.valuation_value}
                                            disabled
                                            />
                                        </td>
                                        <td>{consoleadditional.valuation_calculation * consoleadditional.valuation_value}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td>A</td>
                                        <td>B</td>
                                        <td>C</td>
                                        <td>D</td>
                                    </tr>
                                    <tr>
                                    <td><strong>perticular</strong></td>
                                        <td><strong>Calculation</strong></td>
                                        <td><strong>Calculation</strong></td>
                                        <td><strong>Amount</strong></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Share Capital</strong></td>
                                        <td>{consoleadditional.Share_Capital_calculation?consoleadditional.Share_Capital_calculation:"0"}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.Share_Capital_total}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Level 3 notes (inside level 2- Other equity)</strong></td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                    <td>equity component of compound financial instruments</td>
                                        <td>{consoleadditional.equity_component_of_compound_financial_instruments_calculation?consoleadditional.equity_component_of_compound_financial_instruments_calculation:"0"}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.equity_component_of_compound_financial_instruments}</td>
                                    </tr>
                                    <tr>
                                    <td>reserves and surplus</td>
                                        <td>{consoleadditional.reserves_and_surplus_calculation ? consoleadditional.reserves_and_surplus_calculation:"0"}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.reserves_and_surplus}</td>
                                    </tr>
                                    <tr>
                                        <td>other reserves</td>
                                        <td>{consoleadditional.other_reserves_caculation?consoleadditional.other_reserves_caculation:"0"}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.other_reserves}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Investment</strong></td>
                                        <td>{consoleadditional.investment_calculation?consoleadditional.investment_calculation:"0"}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.investment}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Non-controlling interest</strong></td>
                                        <td>{consoleadditional.non_controlling_interest_calculation}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.non_controlling_interest}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Other inputs</strong></td>
                                        <td>{consoleadditional.otherinputs_claculation}</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.otherinputs}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Goodwill</strong></td>
                                        <td>Balancing Figure</td>
                                        <td>* -1</td>
                                        <td>{consoleadditional.goodwill}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <input type="button" className="btn btn-primary mt-3" style={{float:"right",background:"rgb(3, 86, 90)"}} value="Submit"/> */}
                        </div>
                        </div>
                    }
                    {datacondition.console_entry_third_stage.length > 0 &&
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
                                             <td><strong>perticular</strong></td>
                                             <td><strong>Calculation</strong></td>
                                             <td><strong>Calculation</strong></td>
                                             <td><strong>Amount</strong></td>
                                         </tr>
                                     </thead>
                                     <tbody>
                                         <tr>
                                             <td><strong>Investment</strong></td>
                                             <td>
                                                 {datacondition.console_entry_third_stage[0].Investment}
                                             </td>
                                             <td>* -1
                                             </td>
                                             <td>{datacondition.console_entry_third_stage[0].Investment * -1}</td>
                                         </tr>
                                         <tr>
                                             <td><strong>Non controlling interest</strong></td>
                                             <td>{datacondition.console_entry_third_stage[0].Non_controlling_interest}
                                             </td>
                                             <td>* -1
                                             </td>
                                             <td>{datacondition.console_entry_third_stage[0].Non_controlling_interest * -1}</td>
                                         </tr>
                                         <tr>
                                             <td><strong>Retained earnings</strong></td>
                                             <td>Balancing Figure
                                             </td>
                                             <td>* -1
                                             </td>
                                             <td>{datacondition.console_entry_third_stage[0].Investment + datacondition.console_entry_third_stage[0].Non_controlling_interest}</td>
                                         </tr>
                                     </tbody>
                                 </table>
                                     {/* <input type="button" className="btn btn-primary mt-3" style={{float:"right",background:"rgb(3, 86, 90)"}} value="Submit" onClick={handleAdditional}/> */}
                             </div>
                     </div>
                    }
                        
                    
                </Box>
                </Modal>)}
                
            </div>
        </div>
    )
}

export default EditRegister
