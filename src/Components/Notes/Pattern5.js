
import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useDispatch,useSelector} from 'react-redux'
import {socket} from '../../services/socket/socket'
import * as actionTypes from '../../redux/actionTypes'
import axios from 'axios'



import SubPattern5 from './SubPattern5';

export default function Pattern5(props) {
  const [value, setValue] = React.useState(0);
  const [nid, setNld] = useState('')
  const dispatch = useDispatch();
  const [note, setNote] = useState([])
  const [loading, setLoading] = useState(true)

  // const str = 'SET_NOTE'
  // const str1 = 'note'
  // const str2 = props.note.toString()
  // const finalStr = (str.concat('', str2))
  // const NoteStr = (str1.concat('', str2))
  const finalStr = props.FinalStr
  const NoteStr = props.NoteStr

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const TB_ID = useSelector(initialState => initialState.reducer.tb_id)
  const Note = useSelector(initialState => initialState.reducerNotes[NoteStr])
  const project_id = localStorage.getItem('project_id');

  useEffect(() => {
    const auth = localStorage.getItem('auth_token')    
    let headers = {
        'x-auth-token' : auth,
    }
    const fd = new FormData()
    fd.append('notes_no',props.note);
    // setLoading(true)
    axios.post(`api/v1/notes/gcn/${project_id}/${TB_ID}`,fd,{headers})
    .then(res =>{
        // setLoading(false)
        console.log(res,'response  npotes notes resonse response response')
        setNld(res.data.notes.nlid)    
        setNote(res.data.notes.data)
        dispatch({type: actionTypes[finalStr],payload:res.data.notes.data[0].sub_grp})              

    }).catch(err=>{
        // setLoading(false)

    })
    return () => {
        // dispatch({type: actionTypes.SET_NOTE4,payload:note})              
    }    
}, [])

  function handleNote1(data){
    var arr1 = note
    arr1[1] = data
    setNote(arr1)
    console.log(data,'handle note 1')
    
  }
  function handleNote2(data){
    
    console.log(data,'handle note 2')
    var arr1 = note
    arr1[0] = data
    setNote(arr1)
  }

  if(note){
    return (
      <div style={{paddingTop:'2rem'}}>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Current"  />
            <Tab label="Non-Current" />   
        </Tabs>
        <TabPanel  value={value} index={0}>
           <SubPattern5 data={note[1]} handleNote={handleNote1}  title='current' ix = {1} />
        </TabPanel>
        <TabPanel  value={value} index={1}>
           <SubPattern5 data={note[0]} handleNote={handleNote2} title='noncurrent' ix = {0} />
        </TabPanel>


        </Box>
      </div>
      );
      }
}