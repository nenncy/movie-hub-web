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
import LockOpenSharpIcon from '@material-ui/icons/LockOpenSharp';
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
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SignInSide() {
    const history= useHistory();
    const [data, setData] = useState({
        email:"",
        password:"",
        error:null
    })
    const {email,password,error}=data;
    const handleChange=(e)=>{
       setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit= async (e)=>{
       e.preventDefault();
       
       try{
       setData({...data,error:null});
         const res=  await axios.post("http://localhost:5000/auth/login", {email,password},
           {
               headers:{
                   "Content-Type":"application/json"
                },
           
        });
          console.log(res.data.token);
          var token=res.data.token;
          var userId=res.data.userId;
          window.alert("login succesufull");
          console.log("success");
          localStorage.setItem("token",token);
          localStorage.setItem('userID',  userId);
          history.push("/");
        } catch(err)
       {
           setData({...data,error:err.response.data.error})
           console.log(err);
       }
       
   }
   function handleClick() {          
    history.push("/register");
}

   
   

    
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOpenSharpIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
          <form className={classes.form} noValidate>
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
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link onClick={handleClick} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              
            </Box>
          </form>
        </div>
    </Container>

  );
}