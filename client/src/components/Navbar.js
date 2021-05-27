import {History, useHistory} from "react-router-dom";
import React,{useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import App from '../App';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1),
    },
    heroContent: {
      padding: theme.spacing(6, 0, 3),
    },
    
    
  }));

export default function MenuAppBar() {
    const history= useHistory();
    const [user, setUser] = useState(null);
    const getUser=async ()=>
    {
       const res=await axios.get('/auth',{
           headers:{
               Autherization:`Bearer ${localStorage.getItem("token")}`,

           },

       });
       setUser(res.data);

    };
    useEffect(() => {
       getUser();
    }, []);

    const logout=()=>{
        localStorage.removeItem('token')
        history.push("/login");
    }
    if(!localStorage.getItem('token')){
        history.push("/login");
    }
    

    
  function handleClick() {          
       history.push("/login");
  }





  const classes = useStyles();
  
  return(
   
    <React.Fragment>
    <CssBaseline />
    <AppBar onClick={() => window.scroll(0, 0)} position="fixed" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Movie-hub
        </Typography>
        <nav>
       
          <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={logout} >
            Logout
          </Button>
         
          
        </nav>
        
      </Toolbar>
    </AppBar>
    </React.Fragment>
   
     
     )
  
}