import {History, useHistory} from "react-router-dom";
import React,{useContext, useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import loginimage from '../assets/images/login.svg'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(0),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default function SignUp() {

    const history= useHistory();
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        error:null
        
    })
    const {name,email,password,error}=data;
    const handleChange=(e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setData({...data,error:null});
        try{
            const res=  await axios.post("/auth/register", {name,email,password},
            {
                headers:{
                    "Content-Type":"application/json"
                 },
            
                }
            );
           
           window.alert("registration succesufull");
           console.log("success");

           history.push("/login");
           
         }
        catch(err)
        {
            setData({...data,error:err.response.data.error})
            console.log(err);
        }
    }

    function handleClick() {          
        history.push("/login");
    }






    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            {error ? <p className="text-danger">{error}</p>:null }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
              <Grid item>
                <Link onClick={handleClick} variant="body2">
                  {"You have an account? Sign In"}
                </Link>
              </Grid>
              </Grid>
              
            </Grid>
          </form>
        </div>
       
      </Container>
    );
  }