
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './notes.css'
import Note4 from './Note4'
import Note3 from './Note3'
import Note1 from './Note1'
import Notetype3 from './Notetype3'
import Note5 from './Note5'
import { useEffect } from 'react';

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
    fontSize:'2rem',
    width: '260px',
  },
  tab: {
      fontSize:'1rem',
      padding: '12px 12px',
      overflow: 'hidden',
      position: 'relative',
      fontSize: '1rem',
      // maxWidth: '300px',
      // width: '220px',
      boxSizing: 'border-box',
      minHeight: '55px',
      textAlign: 'center',
      flexShrink: 0,
      fontWeight: "500",
      lineHeight: '1.75',
      letterSpacing: '0.02857em',
      textTransform: 'none',
  },
  TabPanel: {
    width:'100%'
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [totalNotes, setTotalNotes] = useState([5]);
  console.log(totalNotes,'total notes')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handelAdd(){
        setTotalNotes(totalNotes => [...totalNotes,Math.random()])
        const number = totalNotes.length
        console.log(totalNotes.length,"________________");
        props.setNoteNumber(number + 1)
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
        {totalNotes.map((note,ix)=>{
            const Name = `Note ${ix + 1}`
            return(
                <Tab className={classes.tab} label={Name} {...a11yProps(ix)}  />
            )
        })}  
        <div style={{height:'50px',backgroundColor:'',display:'flex',alignItems:'center',justifyContent:'center'}}> 
        <p style={{color:'var(--clr-accent)',cursor:'pointer',fontWeight:'600',fontSize:'16px'}} onClick={()=>{handelAdd()}}><span>+</span>New Notes</p>
        </div>

      </Tabs>
      {totalNotes.map((note,ix)=>{
            const Name = `Note ${ix + 1}`
            return(
                <TabPanel  className={classes.TabPanel} value={value} index={ix}>
                    <Note1/>
                </TabPanel>
            )
        })}  
    </div>
  );
}