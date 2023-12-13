import { createElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireAuth = ({children}) => { 
  const isAuthenticated = true;
  const navigate = useNavigate(); 
  useEffect(()=>{
    if (!isAuthenticated) {
      navigate('/login')
    }
  },[])
  return (children);
};

export default RequireAuth;
