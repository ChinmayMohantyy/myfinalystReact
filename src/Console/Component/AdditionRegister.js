import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Header from './header'
import logo from '../assets/images/logo/Logo.svg';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
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


function AdditionRegister() {
    const location = useLocation();
    let a = location.pathname;
    let b = a.split('/')
    console.log(b[2]);
    const auth = localStorage.getItem("auth_token");
    let history = useHistory();
    const [data, setData] = useState("");
    const [totaldata, setDataTotal] = useState("");
    const [interest, setInterest] = useState("");
    const [investvalue,setInvestValue] = useState("");
    const [natureinvest, setNatureInvest] = useState("");
    const [comapnyId, setCompanyId] = useState("");
    const [openconsoleentry,setOpenConsoleEntry] = useState(false);
    const [holddata,SetHoldData] = useState("");
    const [browseOpen,setBrowseOpen] = useState(false);
    const [optionentry,setOptionEntry] = useState("");
    const [eqitysharedata,setEquityShareData] = useState("");
    const [otherequitysharedata,setOtherEquityShareData] = useState("");
    const[otherreservesurplusdata,setOtherReserveSurplusData] = useState("");
    const[othereservedata,setOtherReserveData] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [setfinalsumdata,setFinalSumData] = useState("");
    const [investcalculate,setInvestCalculate] = useState("");
    const [valuationcalculate,setVlauationCalculate] = useState("");
    const [calculationtwo,setCalculationTwo] = useState("");
    const [calculatefour,setCalculationfour] = useState("");
    const [thirddata,setThirdData] = useState({})
    const [additionalfinaldata,setAdditionalFinalData] = useState({});
    const [opendata,setOpenData] = useState(false);
    const [finalsharedata,setFinalData] = useState("");
    const [datavalue,setDataValue] = useState("")
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
    let totalAmountAdditional = (eqitysharedata * -1)+(otherequitysharedata * -1)+(otherreservesurplusdata * -1)+(othereservedata * -1)+(investvalue * -1) + (interest * -1) + (setfinalsumdata * -1);
    const [statedata, setstate] = useState([
        { column: "", select: ""}
    ]);


    useEffect(() => {
        retriveRegisterData();
        fetchProject();
    }, [])

    function handleDelete(i) {
        const temp = statedata;
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
    const handleClose = () => {
        setOpenConsoleEntry(false);
        setBrowseOpen(false);
        setOpenData(false);
    }
    const handleSave=()=>{
        let sum = 0;
        setOpenData(false);
        const newData = statedata.map((item, index) => {
            let someData = Number(item.select);
            sum += someData;
        })
        console.log(sum);
        setFinalSumData(sum)
      }
    const retriveRegisterData = ()=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get(`/api/v1/company-data/fetch-company-data/${b[2]}`, { headers })
        .then(res => {
            console.log(res.data.getCompanyData[0], 'res++++++++++')
            setCompanyId(res.data.getCompanyData[0]);
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    
    const handleChangeData = (field, e) => {
        console.log(comapnyId.final_holdings,"gsdsghsghsgh");
        // console.log(field);
        if (field === "shares_bought") {
            let data = Number(e.target.value) + Number(comapnyId.final_no_of_shares);
            setData(data)
            setDataValue(Number(e.target.value))
            setFinalData(data)
        }
        if (field === "tnositc") {
            let data2 = Number(e.target.value);
            console.log(data);
            let holding = data / data2 * 100;
            SetHoldData(holding);
            let updateHolding = Number(comapnyId.final_holdings) +  Number(holding);
            let noOfInterest = 100 - holding;
            setDataTotal(updateHolding)
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
        // // // 
        setCompanyDate({ ...companydate, [field]: e.target.value })
    }

    const handleSubmit = () => {
    console.log(finalsharedata,"hgfd");
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        const data = {
            rid: b[2],
            cid:comapnyId.c_id,
            investment_date: companydate.investment_date,
            company: companydate.company,
            investment_value: companydate.investment_value,
            shares_bought: companydate.shares_bought,
            tnositc: companydate.tnositc,
            holding: holddata,
            non_controlling_interest: interest,
            browse_control_dateFS: companydate.browse_control_dateFS,
            donotdoc: companydate.donotdoc,
            wticacct: companydate.wticacct,
            nature_of_relationship: natureinvest,
            add_other_details: statedata,
            console_entry:additionalfinaldata,
            console_entry_third_stage:thirddata?thirddata:"",
            final_no_of_shares:finalsharedata,
            status:"addition"
        }
        console.log(data);
        axios.post(`api/v1/company-data/save-additional-data/${b[2]}`, data, { headers })
            .then(res => {
                console.log(res, 'res')
                history.push(`/edit-register/${b[2]}`)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const additionalEntryOpen=()=>{
        setOpenConsoleEntry(true);
    }
    
    const handleInvestChnage = (e,field)=>{
        console.log(e.target.value);
        console.log(field);
        if(field === "calculation1"){
            console.log(e.target.value);
            setInvestCalculate(Number(e.target.value));
            // let investtotal = Number(investcalculate) * Number(calculationtwo);
            // setTotalInvest(investtotal);
        }
        if (field === "calculation2") {
            console.log("jhgf");
            setCalculationTwo(Number(e.target.value));
            // let investtotal = Number(investcalculate) * Number(calculationtwo);
            // setTotalInvest(investtotal);
        }
    }

    function browseFs() {
        setBrowseOpen(true);
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

    const handleSubmitFs=()=>{
        let headers = {
            "x-auth-token": auth,
            // 'Content-Type' : 'application/json'
        };
        axios.get(`/api/v1/grouping/fs/${selectedOption}`, { headers })
        .then(res => {
            console.log(res.data.fs_grp[2], 'res')
            setEquityShareData(res.data.fs_grp[2].notes_grp[0].sub_grp[0].cy_amt);
            setOtherEquityShareData(res.data.fs_grp[2].notes_grp[1].sub_grp[0].cy_amt);
            setOtherReserveSurplusData(res.data.fs_grp[2].notes_grp[2].sub_grp[0].cy_amt);
            setOtherReserveData(res.data.fs_grp[2].notes_grp[3].sub_grp[0].cy_amt);

            setBrowseOpen(false)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleChangeFs2=(e)=>{
        setSelectedOption(e.target.value)
    }

    const handleOpen=()=>{
        setOpenData(true);
    }
    function handleChangeDetails(e,field,i) {
        // console.log(e.target.value);

        const newArray = statedata.map((item, index) => {
            if (i === index) {
                return { ...item, [e.target.name]: e.target.value};
            } else {
              return item;
            }
        });

        setstate(newArray)
        
      }

      const handleValuationChnage=(e,field)=>{

        if(field === "calculation3"){
            setVlauationCalculate(Number(e.target.value));
        }
        if (field === "calculation4") {
            console.log("jhgf");
            setCalculationfour(Number(e.target.value));
        }
      }

      const handleAdditionalData=()=>{
        let additionalData ={
            Investment_calculation1:investcalculate,
            Investment1_value:calculationtwo,
            valuation_calculation:valuationcalculate,
            valuation_value:calculatefour,
            Share_Capital_calculation:eqitysharedata,
            Share_Capital_total:eqitysharedata * -1,
            equity_component_of_compound_financial_instruments_calculation:otherequitysharedata,
            equity_component_of_compound_financial_instruments: otherequitysharedata*-1,
            reserves_and_surplus_calculation:otherreservesurplusdata,
            reserves_and_surplus:otherreservesurplusdata*-1,
            other_reserves_caculation:othereservedata,
            other_reserves: othereservedata*-1,
            investment_calculation:investvalue,
            investment: investvalue*-1,
            non_controlling_interest_calculation:interest,
            non_controlling_interest: interest*-1,
            otherinputs_claculation:setfinalsumdata,
            otherinputs: setfinalsumdata*-1,
            goodwill: totalAmountAdditional*-1
        }

        setAdditionalFinalData(additionalData);
        setOpenConsoleEntry(false);
      }

      const handleAdditional=()=>{
        let thirdData={
            Investment:investvalue,
            Non_controlling_interest:interest
        }
        setThirdData(thirdData)
        setOpenConsoleEntry(false)
      }


  return (
    <div>
            <div className="tap-top"><i data-feather="chevrons-up"></i></div>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header />
                <div className="page-body-wrapper">
                    <div className="sidebar-wrapper">
                        <div>
                            <div className="logo-wrapper">
                                <Link href="index.html">
                                    <img className="img-fluid for-light" src={logo} alt="" />
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="page-body">
                        <div className="container-fluid">
                            <div className="page-title">
                                <div className="row">
                                    <div className="col-6">
                                        <h3>Add Additional Data</h3>
                                    </div>
                                    <div className="col-6">
                                        <ol className="breadcrumb">
                                            <li class="breadcrumb-item">
                                                <Link to="index.html">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
                                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item">Dashboard</li>
                                            <li className="breadcrumb-item active">Add Additional Data</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row second-chart-list third-news-update">
                                <div className="col-sm-12">
                                    <div className="card1">
                                    <form>
                                            <div className="card-body1" style={{ paddingBottom: '20px' }}>
                                                <div className="row">
                                                    <div className="col-6 form-group mt-3">
                                                        <label>Date of Investment</label>
                                                        <input onChange={(e) => handleChangeData('investment_date', e)} type="date" className="form-control" />
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <label>Company Name</label>
                                                        <input type="text" className="form-control" placeholder="Enter company name" onChange={(e) => handleChangeData('company', e)} />
                                                    </div>
                                                </div>
                                                <div className="row  mt-3">
                                                    <div className="col-6 form-group">
                                                        <label>Company Code</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <label>Value of Investment</label>
                                                        <input onChange={(e) => handleChangeData('investment_value', e)} type="text" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="row  mt-3">
                                                    <div className="col-6 form-group">
                                                        <label>No. of shares bought</label>
                                                        <input onChange={(e) => handleChangeData('shares_bought', e)} type="text" className="form-control" />
                                                        {datavalue &&
                                                                <small style={{color:"grey"}}>{comapnyId.final_no_of_shares} + {datavalue} = {data}</small>
                                                                }
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <label>Total no. of shares in the company</label>
                                                        <input onChange={(e) => handleChangeData('tnositc', e)} type="text" className="form-control" />
                                                        
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-6 form-group">
                                                        <label>% Holding</label>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <input onChange={(e) => handleChangeData('holding', e)} type="text" className="form-control" placeholder="%"  value={holddata} disabled />
                                                                
                                                            </div>
                                                            {holddata > 50 &&
                                                                <div className="col-md-6 text-center mt-3" 
                                                                onClick={() => additionalEntryOpen()}
                                                                >
                                                                    <input type="button" className="btn btn-primary w-100" value="Create consol entry" style={{background:"rgb(3, 86, 90)"}} />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="col-5 offset-1 form-group">
                                                        <div className="row">
                                                            <div className="col-md-6">

                                                                <label>Non-controlling interest %</label>
                                                                <input onChange={(e) => handleChangeData('non_controlling_interest', e)} type="text" className="form-control" value={interest} disabled  />
                                                            </div>
                                                            {holddata > 50 &&
                                                                <div className="col-md-6 text-center mt-5" 
                                                                onClick={() => browseFs()}
                                                                >
                                                                    <input type="button" className="btn btn-primary w-100" value="Browse control date FS" style={{background:"rgb(3, 86, 90)"}}/>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                {holddata > 50 &&
                                                    <div className="row  mt-3">
                                                        <div className="col-6 form-group">
                                                            <label>Details of networth on the date of control</label>
                                                            <input onChange={(e) => handleChangeData('donotdoc', e)} type="text" className="form-control" />
                                                        </div>
                                                        <div className="col-5 offset-1 form-group">
                                                            <label>Add other details </label>
                                                            <div 
                                                            // onClick={handleOpen} 
                                                            className="btn btn-primary"onClick={handleOpen} data-bs-toggle="modal" data-bs-target="#Intangible" style={{background:"rgb(3, 86, 90)"}}>+</div>
                                                        </div>
                                                    </div>
                                                }

                                                {holddata > 50 &&
                                                    <div className="row">
                                                        <div className="col-6 form-group">
                                                            <label>Whether transaction is covered as common control transaction</label>
                                                            <select onChange={(e) => handleChangeData('wticacct', e)} className="form-select">
                                                                <option>Yes</option>
                                                                <option>No</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-5 offset-1 form-group">
                                                            <div class="table-responsive table-bordered">
                                                                <table class="table">
                                                                    <tbody>
                                                                    {(statedata.length >  0  && statedata.map((item=>(
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
                                                <input type="button" className="btn btn-primary1" value="Submit" 
                                                onClick={handleSubmit}
                                                 />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                    open={openconsoleentry}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                {comapnyId.final_holdings >50 &&
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
                                            {investvalue}
                                        </td>
                                        <td>* -1
                                        </td>
                                        <td>{investvalue * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Non controlling interest</strong></td>
                                        <td>{interest}
                                        </td>
                                        <td>* -1
                                        </td>
                                        <td>{interest * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Retained earnings</strong></td>
                                        <td>Balancing Figure
                                        </td>
                                        <td>* -1
                                        </td>
                                        <td>{investvalue + interest}</td>
                                    </tr>
                                </tbody>
                            </table>
                                <input type="button" className="btn btn-primary mt-3" style={{float:"right",background:"rgb(3, 86, 90)"}} value="Submit" onClick={handleAdditional}/>
                        </div>
                </div>
                }
                {comapnyId.final_holdings <= 50 &&
                    <>
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
                                                <input type="text" className="form-control" name='calculation1' onChange={(e)=>handleInvestChnage(e,"calculation1")}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" name='calculation2' onChange={(e)=>handleInvestChnage(e,"calculation2")}/>
                                            </td>
                                            <td>{investcalculate * calculationtwo}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Gain on fair valuation of Investment</strong></td>
                                            <td>
                                                <input type="text" className="form-control" onChange={(e)=>handleValuationChnage(e,"calculation3")}/>
                                            </td>
                                            <td>
                                                <input type="text" className="form-control" onChange={(e)=>handleValuationChnage(e,"calculation4")}/>
                                            </td>
                                            <td>{valuationcalculate * calculatefour}</td>
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
                                        <td>{eqitysharedata?eqitysharedata:"0"}</td>
                                        <td>* -1</td>
                                        <td>{eqitysharedata * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Level 3 notes (inside level 2- Other equity)</strong></td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    <tr>
                                    <td>equity component of compound financial instruments</td>
                                        <td>{otherequitysharedata?otherequitysharedata:"0"}</td>
                                        <td>* -1</td>
                                        <td>{otherequitysharedata *-1}</td>
                                    </tr>
                                    <tr>
                                    <td>reserves and surplus</td>
                                        <td>{otherreservesurplusdata ? otherreservesurplusdata:"0"}</td>
                                        <td>* -1</td>
                                        <td>{otherreservesurplusdata * -1}</td>
                                    </tr>
                                    <tr>
                                        <td>other reserves</td>
                                        <td>{othereservedata?othereservedata:"0"}</td>
                                        <td>* -1</td>
                                        <td>{othereservedata * -1}</td>
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
                                        <td>{setfinalsumdata}</td>
                                        <td>* -1</td>
                                        <td>{setfinalsumdata * -1}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Goodwill</strong></td>
                                        <td>Balancing Figure</td>
                                        <td>* -1</td>
                                        <td>{totalAmountAdditional * -1}</td>
                                    </tr>
                                </tbody>
                            </table>
                                <input type="button" className="btn btn-primary mt-3" style={{float:"right",background:"rgb(3, 86, 90)"}} value="Submit" onClick={handleAdditionalData}/>
                            </div>
                        </div>
                    </>
            }
                    
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
                            <select className='form-control mt-2' 
                            onChange={(e) => handleChangeFs2(e)} value={selectedOption}
                            >
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

            <Modal
                open={opendata}
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
                            {statedata.map((val, i) => {
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
                                       <button type="button" class="btn-close float-end" style={{color:"red"}}>X</button>
                                        </div>
                                    </>
                                );
                            })}
                                <div className="col-md-2 mt-2">
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Intangible"onClick={() => {handleNew()}} style={{background:"rgb(3, 86, 90)"}}>+</button>
                                </div>
                            </div>
                        </div>
                        <input type="button" className="btn btn-primary" style={{background:"rgb(3, 86, 90)"}} value="Submit" onClick={() => {handleSave()}}/>
                        {/* <input type="button" className="btn btn-defult" value="Close" onClick={handleClose} /> */}
                    </div>
                </Box>
                </>
               
            </Modal>
        </div>
  )
}

export default AdditionRegister
