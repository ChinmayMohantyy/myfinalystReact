
import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../Notes/notes.css'
import {useDispatch,useSelector} from 'react-redux'
import * as actionTypes from '../../redux/actionTypes'


import Note4 from '../Notes/Note4'
import Note3 from '../Notes/Note3'
import Notetype3 from '../Notes/Notetype3'
import Note5 from '../Notes/Note5'
import Note8 from '../Notes/Note8'
import Pattern6 from '../Notes/Pattern6';
import Pattern3 from '../Notes/Pattern3';
import Pattern5 from '../Notes/Pattern5';
import PatternRM from '../Notes/PatternRM';
import Note22B from '../Notes/Note22B';

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
    
    color:'black',
    fontSize:'1rem',
    width: '260px',
  },
  tab: {
      // fontSize:'1px',
      padding: '12px 12px',
      overflow: 'hidden',
      position: 'relative',
      fontSize: '5px',
      // maxWidth: '300px',
      // width: '220px',
      boxSizing: 'border-box',
      minHeight: '55px',
      textAlign: 'center',
      flexShrink: 0,
      fontWeight: "500",
      // lineHeight: '1.75',
      letterSpacing: '0.02857em',
      textTransform: 'none',
  },
  TabPanel: {
    width:'100%'
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const NoteNo = useSelector(initialState => initialState.reducer.plNoteNo) 


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // console.log(props.note,'propnote propnote propnote propnote')
    setValue(NoteNo)
  }, [NoteNo])

  // useEffect(() => {
  //   setValue(props.note)
  // }, [props.note])
  // useEffect(() => {
  //   setValue(NoteNo)
  // }, [NoteNo])

  const heading = {
    width:"100%",
    height:'30px',
    backgroundColor:'#E5EEEE',
    position:'sticky',
    top:'80px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // border:'1px solid teal'
  
  }
  
  const headingText = {
    fontSize:'1.1 rem',
    fontWeight:'700'
  
  }


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
        <Tab className={classes.tab} label="Note - Revenue from operations" {...a11yProps(0)} />
        <Tab className={classes.tab} label="Note - Other Income" {...a11yProps(1)} />
        <Tab className={classes.tab} label="Note - Other gains(losses) -net" {...a11yProps(2)} />
        <Tab className={classes.tab} label="Note - Cost of material consumed" {...a11yProps(3)} />
        <Tab className={classes.tab} 
        label="Note - Purchases of stock in-trade" 
        {...a11yProps(4)} />
        <Tab className={classes.tab} label="Note - Changes in inventories of work-in-progress, stock-in-trade and finished goods" {...a11yProps(5)} />
        {/* <Tab className={classes.tab} label="Note - Excise duty" {...a11yProps(6)} /> */}
        <Tab className={classes.tab} label="Note - Employee benefit expense" {...a11yProps(7)} />
        <Tab className={classes.tab} label="Note - Depreciation and Amortisation expense" {...a11yProps(8)} />
        <Tab className={classes.tab} label="Note - Impairment of goodwill and other non-current assets" {...a11yProps(9)} />
        <Tab className={classes.tab} label="Note - Net impairment losses on financial and contract assets" {...a11yProps(10)} />
        <Tab className={classes.tab} label="Note - Other Expenses" {...a11yProps(11)} />
        <Tab className={classes.tab} label="Note - Financial Costs" {...a11yProps(12)} />
        <Tab className={classes.tab} label="Note - Income tax expense" {...a11yProps(13)} />
        <Tab className={classes.tab} label="Note - Gains on cash flow hedges" {...a11yProps(14)} />
        <Tab className={classes.tab} label="Note - Costs of Hedging" {...a11yProps(15)} />
        <Tab className={classes.tab} label="Note - Investment properties" {...a11yProps(16)} />
        <Tab className={classes.tab} label="Note - Goodwill" {...a11yProps(17)} />
        <Tab className={classes.tab} label="Note - Other Intangible Assets" {...a11yProps(18)} />
        <Tab className={classes.tab} label="Note - Intangible Assets under development" {...a11yProps(19)} />
        <Tab className={classes.tab} label="Note - Biological assets other than Bearer Plants" {...a11yProps(20)} />
      </Tabs>
      <TabPanel  className={classes.TabPanel} value={value} index={0}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Revenue from operations</p>
        </div>
        <Note8 setShowCreateInput={props.setShowCreateInput} note='20'  FinalStr='SET_NOTE20' NoteStr='note20' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel   className={classes.TabPanel} value={value} index={1}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other Income</p>
        </div>
        <Note8 setShowCreateInput={props.setShowCreateInput} note='21(a)'  FinalStr='SET_NOTE21A' NoteStr='note21A' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={2}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other gains(losses) -net</p>
        </div>
        <Note8 setShowCreateInput={props.setShowCreateInput} note='21(b)'  FinalStr='SET_NOTE21B' NoteStr='note21B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={3}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Cost of material consumed</p>
        </div>
        <PatternRM setShowCreateInput={props.setShowCreateInput} note='22(a)'  FinalStr='SET_NOTE22A' NoteStr='note22A' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={4}>
          {/* some heading here */}
        <div style={heading}>
          <p style={headingText} >Note - Purchase of Stock in Trade</p>
        </div>
        <Note8 setShowCreateInput={props.setShowCreateInput} note='22(c)'  FinalStr='SET_NOTE21B' NoteStr='note21B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={5}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Changes in inventories of work-in-progress, stock-in-trade and finished goods</p>
        </div>
        < Note22B setShowCreateInput={props.setShowCreateInput} note='22(b)'  FinalStr='SET_NOTE22B' NoteStr='note22B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={6}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Employee benefit expense</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='23'  FinalStr='SET_NOTE23' NoteStr='note23' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={7}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Depreciation and Amortisation expense</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='24'  FinalStr='SET_NOTE24' NoteStr='note24' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={8}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Impairment of goodwill and other non-current assets</p>
        </div>
        {/* Item 8 */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={9}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Net impairment losses on financial and contract assets</p>
        </div>
        {/* < Pattern3 setShowCreateInput={props.setShowCreateInput} note = '6(b)'  FinalStr='SET_NOTE6B' NoteStr='note6B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
        < Note8 setShowCreateInput={props.setShowCreateInput} note='29'  FinalStr='SET_NOTE29' NoteStr='note29' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={10}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other Expenses</p>
        </div>
        {/* < Pattern6 setShowCreateInput={props.setShowCreateInput} note = '6(e)'  FinalStr='SET_NOTE6E' NoteStr='note6E' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
        < Note8 setShowCreateInput={props.setShowCreateInput} note='25'  FinalStr='SET_NOTE25' NoteStr='note25' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={11}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Financial Costs</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='26'  FinalStr='SET_NOTE26' NoteStr='note26' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={12}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Income tax expense</p>
        </div>
        < Note8 setShowCreateInput={props.setShowCreateInput} note='27'  FinalStr='SET_NOTE27' NoteStr='note27' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/>
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={13}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Gains on cash flow hedges</p>
        </div>
        {/* < Note8 setShowCreateInput={props.setShowCreateInput} note='9'  FinalStr='SET_NOTE9' NoteStr='note9' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
        {/* Item 9 */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={14}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Costs of Hedging</p>
        </div>
        {/* < Note8 setShowCreateInput={props.setShowCreateInput} note='6(d)' FinalStr='SET_NOTE6D' NoteStr='note6D' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={15}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Investment properties</p>
        </div>
        {/* < Note8 setShowCreateInput={props.setShowCreateInput} note='10' FinalStr='SET_NOTE10' NoteStr='note10' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={16}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Goodwill</p>
        </div>
        {/* < Note8 setShowCreateInput={props.setShowCreateInput} note='11'  FinalStr='SET_NOTE11' NoteStr='note11' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
        {/* Item 9 16  */}
      </TabPanel>
 
      <TabPanel  className={classes.TabPanel} value={value} index={17}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Other Intangible Assets</p>
        </div>
        Item 9 17 
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={18}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Intangible Assets under development</p>
        </div>
        {/* < Pattern5 setShowCreateInput={props.setShowCreateInput} note='13(a)'  FinalStr='SET_NOTE13A' NoteStr='note13A' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
        {/* Item 9 18 */}
      </TabPanel>
      <TabPanel  className={classes.TabPanel} value={value} index={19}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Biological assets other than Bearer Plants </p>
        </div>
        {/* < Note4 setShowCreateInput={props.setShowCreateInput} note='12(b)' FinalStr='SET_NOTE12B' NoteStr='note12B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel> 
      <TabPanel  className={classes.TabPanel} value={value} index={20}>
        <div style={heading}>
          {/* some heading here */}
          <p style={headingText} >Note - Liabilities directly associated with assets classified as held for sale</p>
        </div>
        {/* < Note4 setShowCreateInput={props.setShowCreateInput} note='12(b)' FinalStr='SET_NOTE12B' NoteStr='note12B' setSid={props.setSid} setNid={props.setNid} note4={props.note4} setNoteNum={props.setNoteNum}/> */}
      </TabPanel> 
    </div>
  );
 
}