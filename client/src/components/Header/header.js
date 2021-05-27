import "./Header.css";
import {History, useHistory} from "react-router-dom";
import React,{useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";

import axios from 'axios';


const Header = () => {
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




    return (
      <div onClick={() => window.scroll(0, 0)} className="header">
         Movie Hub 🎥
         
         
        </div>
      
    );
  };
  
  export default Header;