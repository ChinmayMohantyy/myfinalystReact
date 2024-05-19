
import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './notes.css'
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'

import Note4 from './Note4'
import Note4B from './Note4B'
import Note3 from './Note3'
import Notetype3 from './Notetype3'
import Note5 from './Note5'
import Note8 from './Note8'
import NotePayble from './Notepayble'
import Pattern6 from './Pattern6';
import Pattern3 from './Pattern3';
import Pattern5 from './Pattern5';
import Pattern5b from './Pattern5b';
import Pattern7 from './Pattern7';
import NoteLeases from './NoteLeases';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '50vh',

    
  },
  tabs: {
    maxHeight:'100vh',
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop:'3rem',
    paddingBottom:'3rem',
    background:'linear-gradient(45deg, transparent, #E5EEEE)',    
    color:'Black',
    fontSize:'1rem',
    width: '260px',
  },
  tab: {
      padding: '12px 12px',
      overflow: 'hidden',
      position: 'relative',
      fontSize: '5px',
      boxSizing: 'border-box',
      minHeight: '55px',
      textAlign: 'center',
      flexShrink: 0,
      fontWeight: "500",
      letterSpacing: '0.02857em',
      textTransform: 'none',
  },
  TabPanel: {
    width:'100%'
  },
}));

const heading = {
  width:"100%",
  height:'50px',
  backgroundColor:'#E5EEEE',
  position:'sticky',
  top:'80px',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  // border:'1px solid teal'

}

const headingText = {
  fontSize:'1.2 rem',
  fontWeight:'700'

}

export default function VerticalTabs(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [math, setMath] = useState('');
  const NoteNo = useSelector(initialState => initialState.reducer.blNoteNo) 
  console.log(NoteNo)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // props.setNoteName(newValue)
    console.log(event,newValue,'newValue event') 
  };

  // useEffect(() => {
  //   console.log(props.note,'propnote propnote propnote propnote')
  //   // setValue(props.note)
  // }, [])

  useEffect(() => {
    // console.log(props.note,'propnote propnote propnote propnote')
    setValue(NoteNo)
  }, [NoteNo])



  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {/* <Tab className={classes.tab} label="*" {...a11yProps(0)}  />
        <Tab className={classes.tab} label="**" {...a11yProps(1)} /> */}
        {/* //CURRENT ASSETS */}
        <Tab className={classes.tab} label="Note - Property, Plant & Equipment" {...a11yProps(0)} />
        {/* <Tab className={classes.tab} label="Note - Leases" {...a11yProps(1)} /> */}
        <Tab className={classes.tab} label="Note - Capital Work-In Progress" {...a11yProps(1)} />
        <Tab className={classes.tab} label="Note - Investment Properties" {...a11yProps(2)} />
        <Tab className={classes.tab} label="Note - Goodwill" {...a11yProps(3)} />
        <Tab className={classes.tab} label="Note - Other Intangible Assets" {...a11yProps(4)} />
        <Tab className={classes.tab} label="Note - Deferred Tax Assets" {...a11yProps(5)} />
        <Tab className={classes.tab} label="Note - Other non-current Assets" {...a11yProps(6)} />
        <Tab className={classes.tab} label="Note - Financial Assets - Investments" {...a11yProps(7)} />
        <Tab className={classes.tab} label="Note - Financial Assets - Loans" {...a11yProps(8)} />
        <Tab className={classes.tab} label="Note - Financial Assets - Other Financial Assets" {...a11yProps(9)} />
        <Tab className={classes.tab} label="Note - Contract assets" {...a11yProps(10)} />
        <Tab className={classes.tab} label="Note - Investments Accounted for using the equity method" {...a11yProps(11)} />
        <Tab className={classes.tab} label="Note - Inventories" {...a11yProps(12)} />
        <Tab className={classes.tab} label="Note - Financial Assets - Trade Receivables" {...a11yProps(13)} />
        <Tab className={classes.tab} label="Note - Financial Assets - Cash and cash equivalents" {...a11yProps(14)} />
        <Tab className={classes.tab} label="Note - Other current assets" {...a11yProps(15)} />
        <Tab className={classes.tab} label="Note - Assets classified as held for sale" {...a11yProps(16)} />
        <Tab className={classes.tab} label="Note - Equity Share Capital" {...a11yProps(17)} />
        <Tab className={classes.tab} label="Note - other equity - equity component of compound financial instruments" {...a11yProps(18)} />
        <Tab className={classes.tab} label="Note - other equity - reserves and surplus" {...a11yProps(19)} />
        <Tab className={classes.tab} label="Note - other equity - other reserves" {...a11yProps(20)} />
        <Tab className={classes.tab} label="Note - Non Controlling Interest" {...a11yProps(21)} />
        <Tab className={classes.tab} label="Note - Financial Liabilities - Borrowings" {...a11yProps(22)} />
        <Tab className={classes.tab} label="Note - Financial liabilities - Other Financial Liabilities" {...a11yProps(23)} />
        <Tab className={classes.tab} label="Note - Provisions" {...a11yProps(24)} />
        <Tab className={classes.tab} label="Note - Employee benefit obligations" {...a11yProps(25)} />
        <Tab className={classes.tab} label="Note - Deferred tax liabilities" {...a11yProps(26)} />
        <Tab className={classes.tab} label="Note - Government grants" {...a11yProps(27)} />
        <Tab className={classes.tab} label="Note - Other Non-Current Liabilities" {...a11yProps(28)} />
        <Tab className={classes.tab} label="Note - Financial Liabilities - Trade Payable" {...a11yProps(29)} />
        <Tab className={classes.tab} label="Note - Contract Liabilities" {...a11yProps(30)} />
        <Tab className={classes.tab} label="Note - Current tax Liabilities" {...a11yProps(31)} />
        <Tab className={classes.tab} label="Note - Other Current Liabilities" {...a11yProps(32)} />
        <Tab className={classes.tab} label="Note - Liabilities directly associated with assets classified as held for sale" {...a11yProps(33)} />

      </Tabs>
      <TabPanel  className={classes.TabPanel} value={value} index={0}>
      <div style={heading}>
        {/* some heading here */}
        <p style={headingText} >Note - (Property, Plant & Equipment and Capital Work-In Progress)</p>
      </div>
        {/* <Note3 setShowCreateInput={props.setShowCreateInput} setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/> */}
        <Notetype3 setShowCreateInput={props.setShowCreateInput} setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/>
        {/* <Note5 setShowCreateInput={props.setShowCreateInput} setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/> */}
      </TabPanel>
      {/* <TabPanel  className={classes.TabPanel} value={value} index={1}>
      <div style={heading}>
        <p style={headingText} >Note - (Leases)</p>
      </div>
        <NoteLeases setShowCreateInput={props.setShowCreateInput} setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/>
      </TabPanel> */}
      <TabPanel  className={classes.TabPanel} value={value} index={1}>
      <div style={heading}>
        {/* some heading here */}
        <p style={headingText} >Note - (Property, Plant & Equipment and Capital Work-In Progress)</p>
      </div>
        <Notetype3 scroll='down' setShowCreateInput={props.setShowCreateInput} setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/>
        {/* <div  className='some'>Division</div> */}
      </TabPanel>
      <TabPanel   className={classes.TabPanel} value={value} index={2} >
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Investment Properties</p>
        </div>
        < Note4 setShowCreateInput={props.setShowCreateInput} setRandom={props.setStr} setMath={setMath} note='4' FinalStr='SET_NOTE7' NoteStr='note7' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
        {/* < Note4 setShowCreateInput={props.setShowCreateInput} note = '4' FinalStr='SET_NOTE4' NoteStr='note4' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={3}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - (Goodwill and Other Intangible Assets)</p>
        </div>
        <Note5 setShowCreateInput={props.setShowCreateInput}  note='5' FinalStr='SET_NOTE5' NoteStr='note5' setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/>
        {/* <Note5 setShowCreateInput={props.setShowCreateInput} setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/> */}
        {/* <div  className='some'>Division</div> */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={4}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - (Goodwill and Other Intangible Assets)</p>
        </div>
        <Note5 setShowCreateInput={props.setShowCreateInput} note='5' FinalStr='SET_NOTE5' NoteStr='note5' setSid={props.setSid} setNid={props.setNid} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={5}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Deferred Tax Assets</p>
        </div>
        < Note4 setShowCreateInput={props.setShowCreateInput} note='7'  setRandom={props.setStr} setMath={setMath} FinalStr='SET_NOTE7' NoteStr='note7' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={6}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other non-current Assets</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='8'  FinalStr='SET_NOTE8' NoteStr='note8' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
        {/* < Note8 setShowCreateInput={props.setShowCreateInput} note='6(d)' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={7}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Assets - Investments</p>
        </div>
        < Pattern5 setShowCreateInput={props.setShowCreateInput} note='6(a)' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={8}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Assets - Loans</p>
        </div>
        {/* Item 8 */}
        < Pattern3 setShowCreateInput={props.setShowCreateInput} note = '6(c)'  FinalStr='SET_NOTE6C' NoteStr='note6C' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={9}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Assets - Other Financial Assets</p>
        </div>
        < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '6(e)'  FinalStr='SET_NOTE6E' NoteStr='note6E' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={10}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Contract asset</p>
        </div>
        < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '6A'  FinalStr='SET_NOTE6AA' NoteStr='note6AA' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
        {/* Item 9 */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={11}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Investments Accounted for using the equity method</p>
        </div>
        Item 9
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={12}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Inventories</p>
        </div>
        {/* < Pattern3 setShowCreateInput={props.setShowCreateInput} note = '6(b)'  FinalStr='SET_NOTE6B' NoteStr='note6B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
        < Note8 setShowCreateInput={props.setShowCreateInput} note='9'  FinalStr='SET_NOTE9' NoteStr='note9' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={13}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Assets - Trade Receivables</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note = '6(b)'  FinalStr='SET_NOTE6B' NoteStr='note6B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
        {/* Item 9 */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={14}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Assets - Cash and cash equivalents</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='6(d)' FinalStr='SET_NOTE6D' NoteStr='note6D' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={15}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other current assets</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='10' FinalStr='SET_NOTE10' NoteStr='note10' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={16}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Assets classified as held for sale</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='11'  FinalStr='SET_NOTE11' NoteStr='note11' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
        {/* Item 9 16  */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={17}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Equity Share Capital</p>
        </div>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={18}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - other equity - equity component of compound financial instruments</p>
        </div>
        < Pattern5 setShowCreateInput={props.setShowCreateInput} note='13(a)'  FinalStr='SET_NOTE13A' NoteStr='note13A' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={19}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - other equity - reserves and surplus</p>
        </div>
        < Note4 setShowCreateInput={props.setShowCreateInput} note='12(b)' setRandom={props.setStr} setMath={setMath} FinalStr='SET_NOTE12B' NoteStr='note12B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={20}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - other equity - other reserves</p>
        </div>
        < Note4 setShowCreateInput={props.setShowCreateInput} note='12(c)' setRandom={props.setStr} setMath={setMath} FinalStr='SET_NOTE12C' NoteStr='note12C' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={21}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Non Controlling Interest</p>
        </div>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={22}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Liabilities - Borrowings</p>
        </div>
          < Pattern5b setShowCreateInput={props.setShowCreateInput} note='13(a)' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={23}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial liabilities - Other Financial Liabilities</p>
        </div>
      < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '13(b)'  FinalStr='SET_NOTE13B' NoteStr='note13B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={24}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Provisions</p>
        </div>
      < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '14'  FinalStr='SET_NOTE14' NoteStr='note14' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={25}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Employee benefit obligations</p>
        </div>
        < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '15'  FinalStr='SET_NOTE15' NoteStr='note15' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={26}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Deferred tax liabilities</p>
        </div>
        < Note4 setShowCreateInput={props.setShowCreateInput} note='16' setRandom={props.setStr} setMath={setMath} FinalStr='SET_NOTE16' NoteStr='note16' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={27}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Government grants</p>
        </div>
          < Pattern7 setShowCreateInput={props.setShowCreateInput} note = '18'  FinalStr='SET_NOTE18' NoteStr='note18' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={28}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other Non-Current Liabilities</p>
        </div>
          < Pattern7 setShowCreateInput={props.setShowCreateInput} note = '18(b)'  FinalStr='SET_NOTE18(b)' NoteStr='note18' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={29}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Liabilities - Trade Payable</p>
        </div>
        < NotePayble setShowCreateInput={props.setShowCreateInput} note = '13(c)'  FinalStr='SET_NOTE13C' NoteStr='note13C' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
        {/* < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '13(c)'  FinalStr='SET_NOTE13C' NoteStr='note13C' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={30}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Contract Liabilities</p>
        </div>
        < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '6A'  FinalStr='SET_NOTE6AA' NoteStr='note6AA' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={31}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Current tax Liabilities</p>
        </div>
          < Pattern7 setShowCreateInput={props.setShowCreateInput} note = '17'  FinalStr='SET_NOTE18' NoteStr='note18' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      {/* < Note8 setShowCreateInput={props.setShowCreateInput} note='17' FinalStr='SET_NOTE12B' NoteStr='note12B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel> 
      <TabPanel  className={classes.TabPanel} value={value} index={32}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other Current Liabilities</p>
        </div>
      < Note8 setShowCreateInput={props.setShowCreateInput} note='19'  FinalStr='SET_NOTE19' NoteStr='note19' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel> 
      <TabPanel  className={classes.TabPanel} value={value} index={33}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Liabilities directly associated with assets classified as held for sale</p>
        </div>
      < Note8 setShowCreateInput={props.setShowCreateInput} note='33'  FinalStr='SET_NOTE33' NoteStr='note33' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel> 

      
    </div>
  );
}
        // <div style={heading}>
        //   {/* some heading here */}
        //   <p style={headingText} >Note - Property, Plant & Equipment</p>
        // </div>