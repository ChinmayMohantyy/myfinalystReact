import React,{useState,useEffect} from 'react'
import './setUpProject.css'
import { useHistory } from "react-router-dom";
import {Form} from 'react-bootstrap'
import {TextField } from '@material-ui/core'
// import DatePicker from 'react-datepicker'
import DatePicker from 'react-date-picker'
import 'react-datepicker/dist/react-datepicker.css'
import date from '../../assets/date.svg'
import {Submit} from '../../Components/Button'
import Select from 'react-select';
import {existingProject} from '../../redux/actions/actions'
import axios from 'axios'
import {useDispatch} from 'react-redux'

/*
filter={}
filterArray =[{drop1:'',drop2:'',drop3:''}]  -- 1

filterArray.map((filter,index)=>{
    return(
        <div> 
            <input onChange={}/>
            <input />
            <input />
        </div>
    )
})


*/




 

const QuestionnaireExisting = () => {
    const dispatch = useDispatch()

    const initialState = {
        // presetName:'',
        projectName:'',companyNature:'', GAAP:'',prevDate:null,currentDate:null, fs:'',presetAtr:{}
    }

    const presetOptions = [
        { value: 'Adjustments', label: 'Adjustments' },
        { value: 'Amount', label: 'Amount' },
        { value: 'Grouping', label: 'Grouping' },
        { value: 'Disclosures', label: 'Disclosures' },
        
      ];
    
      const gaapOptions = [
        { value: 'Indian Gaap', label: 'Indian GAAP' },
        
      ];
    
    const natureOptions = [
        {'value':'Manufacturing','label':'Manufacturing'},
        {'value':'Trading','label':'Trading'},
        {'value':'NBFC','label':'NBFC'},
        {'value':'Banking','label':'Banking'},
    ] 

    

    let history = useHistory()
    const [value, setValue] = useState(initialState)
    const [valid, setValid] = useState(false)
    const [date, onDate] = useState(new Date());
    console.log(value)
    
    const handleChange = (field,e) =>{
        if(e === null ){
            setValue({...value,[field]:''})
            return
        }
        console.log(field)
        console.log(e)
        setValue({...value,[field]:e.value})
    }


    const handleMulti=(field,e)=>{
        console.log(e)
        e.map((item,i)=>{setValue({...value,[field]:item.value})})
        // e.map((item,i)=>{setValue({...value,[field]:{(prevState) =>{...prevState,item.value}}})})
    }

    function validationExisting(){
        let obj = Object.values(value)
        console.log(obj,'obj')
         if(obj.includes('') | obj.includes(null)){
            setValid(false)
          
            }
         else{

             setValid(true)
         }

         }

        // const customStyles = {
        // control: base => ({
        //     ...base,
        //     height: 60,
        //     minHeight: 60
        // })
        // };

    const onSubmit =() =>{

        if (valid){           

            history.push('/createProject/uploadTb')
            const fd = new FormData()
            fd.append('project_name',value.projectName);
            fd.append('company_type',value.companyNature);
            fd.append('gaap_selection',value.GAAP);
            fd.append('previous_year','2020-03-31');
            fd.append('current_year','2020-03-31');
            fd.append('type_fs',value.fs);
            fd.append('preset_name','not available');
            console.log(fd,'fd created');
            // dispatch(existingProject(fd))  
            // fd.append('email','Value.email');
            // fd.append('password','Value.password');
            // console.log(Value)
            console.log(fd)      
            // for (var data of fd) {
            //     console.log(data);
            //   }
            const auth = localStorage.getItem('auth_token')
            let headers = {
                'x-auth-token' : auth,
                'Content-Type' : 'application/json'
            }
            axios.post(`api/v1/tb-onboarding/tb-onboarding`,fd,{headers})
            .then(response => {
                console.log(response,'response')
            //   dispatch(setCartAdded(response.data.product)) 
            localStorage.setItem('project_id', response.data.project_id)

                   
              })
              .catch(error =>{
                  console.log(error.response,'error')
              }
                )
                history.push('/createProject/uploadTb')
        }
        else{
            
            alert('Please Fill All the input Fields')
            

        }
}



    useEffect(() => {
        validationExisting()
        
    }, [value])

    return (
        <div className='containerQuestionnaire'>
            <div className="track">
                <div className='progressBar'>
                    <div className='vector-1'></div>
                    <div className="progressRoute">
                        <div className="track1">
                            <h4>Project Creation</h4>
                            <p>fill basic details for creating <br/>a project</p>
                        </div>
                        <div className="track1">
                            <h4>File Upload</h4>
                            <p>Upload individual or multiple <br/>Trial Balance</p>
                        </div>
                        <div className="track1">
                            <h4>Data Mapping</h4>
                            <p>Map feneral Ledgers to financial <br/>Statement</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="main">
                <div className="header"><h1>Create Project from existing presets</h1></div>
                <div className='inputs'>
                    <div className="tab-1">
                        <div className="in-1">
                            <p>Name of the project<span>*</span></p>
                            <input placeholder='Enter name..' name='projectName' onChange={(e) => {setValue({...value,['projectName']:e.target.value})}}></input>
                        </div>
                        <div className="in-1">
                                <p>Name of the Preset<span>*</span></p>
                                <Select placeholder='Select Option' 
                                classNamePrefix="mySelect"
                                    onChange={(e) =>handleChange('presetName',e)}                         
                                isClearable  
                                    theme={theme => ({
                                            ...theme,
                                            borderRadius: '6px',
                                            colors: {
                                                ...theme.colors,
                                                backgroundColor:'white',
                                                primary25: '#03565a98',
                                                primary: '#03565A',
                                            },
 
                                    })}
                                    

                                    />
                        </div>
                        <div className="date-picker">
                        <p>Use Current Financial Year As<span>*</span>     </p>
                            {/* <div className="Date" style={{display:'flex'}}> */}
                            {/* <img src={date}></img> */}
                            <DatePicker  value={value.currentDate} 
                            // maxDetail='year' 
                            format="   dd/ MM/ yyyy" onChange={date => setValue({...value,currentDate:date})} />
                            </div>
                        {/* </div> */}
                        <div className="in-1">

                                    <p>selection of GAAP<span>*</span></p>
                                    <Select placeholder='Select Option' options={gaapOptions} 
                                    isClearable
                                    onChange={(e) =>handleChange('GAAP',e)} 
                                    theme={theme => ({
                                            ...theme,
                                            borderRadius: '6px',
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#03565a98',
                                                primary: '#03565A',
                                            },
                                    })}/>
                        </div>
                    </div>
                    <div className="tab-2">
                        <div className="in-1">

                                <p>Nature of the company<span>*</span></p>
                                <Select placeholder='Select Option' options={natureOptions}
                                isClearable 
                                    onChange={(e) =>handleChange('companyNature',e)}                         
                                    theme={theme => ({
                                            ...theme,
                                            borderRadius: '6px',
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#03565a98',
                                                primary: '#03565A',
                                            },
                                    })}
                                    // styles={customStyles}
                                    />
                        </div>
                        <div className="in-1">

                                    <p>Preset Atributes<span>*</span></p>
                                    <Select placeholder='Select Option' options={presetOptions} isMulti 
                                    onChange={(e) =>handleMulti('presetAtr',e)}                         
                                    theme={theme => ({
                                            ...theme,
                                            borderRadius: '6px',
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#03565a98',
                                                primary: '#03565A',
                                            },
                                    })}/>

                        </div>
                        <div className="date-picker">
                            <p>Use Previous Financial Year As<span>*</span>     </p>
                            {/* <div className="Date" style={{display:'flex'}}>
                            <img src={date}></img> */}
                            <DatePicker  format="   dd/ MM/ yyyy"value={value.prevDate} 
                            // autoFocus='true' 
                            onChange={date => setValue({...value,prevDate:date})} />
                            {/* </div> */}

                        </div>
                        <div className='in-1' style={{marginTop:'30px'}}>
                        <p>Use Previous Financial Year As<span>*</span>     </p>

                        <div className='check' style={{marginTop:'10px'}}>
                            <Form.Check inline label="Standalone Fs" name="group1" onChange={(e) => {setValue({...value,['fs']:'Standalone Fs'})}} type='radio' id={`inline-radio}-1`} />
                            <Form.Check inline label="Consolidated Fs" name="group1" onChange={(e) => {setValue({...value,['fs']:'Consolidated Fs'})}} type='radio' id={`inline-radio}-1`} /></div>
                        </div>

                    </div>
                    <div>

                    </div>
                </div>
                
                <div className='post' onClick={onSubmit} >
                    { valid ? <Submit value="Create Project" /> :<Submit value="Create Project" disable />}
                    </div> 
            </div>
        </div>
    )
}

export default QuestionnaireExisting
