import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch,useSelector} from 'react-redux'


const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

export default function MultiSelect2() {
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);  
  const selected = useSelector(state => state.reducer.selectedRows)


  useEffect(() => {
    console.log(selected,'selected row changed')
    if(selected.length >= 2){
        // setState({ open: true,  vertical: 'bottom', horizontal: 'right' });
        setOpen(true)
    }

}, [selected])

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const classes = useStyles();
  return (
    <div>
      {/* <Button onClick={handleClick('Message A')}>Show message A</Button>
      <Button onClick={handleClick('Message B')}>Show message B</Button> */}
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        // autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={'pick one bitches'}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            <div style={{height:'200px'}}>

            </div>
          </React.Fragment>
        }
      />
    </div>
  );
}
