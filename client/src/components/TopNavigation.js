
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';


function TopNavigation() {

   let navigate = useNavigate();

  let storeObj = useSelector((store)=>{return store;});

   useEffect(()=>{
    if(storeObj && storeObj.loginDetails && storeObj.loginDetails.email){  
    }else{
       navigate("/")
    }
   },[]);



    let activeObj = (obj) => {
        if(obj.isActive === true){
            return {backgroundColor: "#7678ed",color:"white",borderRadius:"5px"};
        }
    };

  return (
    <div>
        <nav>
            <NavLink to="/Dashboard" style={(obj)=>{
              return  activeObj(obj)
            }}>Dashboard</NavLink>
            <NavLink to="/EmployeesList"  style={(obj)=>{
              return  activeObj(obj)
            }} onClick={()=>{}}>EmployeesList</NavLink>
           <span>{storeObj.loginDetails.firstName} {""} {storeObj.loginDetails.lastName}</span>
            <NavLink to="/"  style={(obj)=>{
              return  activeObj(obj)
            }} onClick={()=>{localStorage.clear();}}>Logout</NavLink>
        </nav>

        
        
    </div>
  )
}

export default TopNavigation