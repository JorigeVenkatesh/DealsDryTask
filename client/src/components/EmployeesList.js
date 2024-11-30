import React, { useEffect, useState } from 'react'
import TopNavigation from './TopNavigation'
import { Link, useNavigate } from 'react-router-dom';



function EmployeesList() {
  
      let navigate = useNavigate();
     let [employeesList,setEmployeesList] = useState([]);
     let [employeesCount,setEmployeesCount] = useState([]);
    let [search,setSearch] = useState("");
     console.log(search)
 
    useEffect(()=>{getEmployeesList();},[])

  

     let getEmployeesList= async ()=>{
 

      let reqOptions = {
        method:"get"
      }

      let JSONData = await fetch("http://localhost:4567/employeesList",reqOptions);
      let JSOData = await JSONData.json();
       setEmployeesList(JSOData.employees);
       setEmployeesCount(JSOData.count)
      console.log(JSOData)
     };

   let deleteProfile = async (email)=>{
       const isConfirmed = window.confirm("Are you sure you want to delete this employee?");

          if (isConfirmed) {
      let reqOptions = {method: "DELETE"};
    let url = `http://localhost:4567/deleteProfile?email=${email}`;

    let JSONData = await fetch(url,reqOptions);
    let JSOData = await JSONData.json();

    if(JSOData.status === "success"){
      alert(JSOData.msg);
      navigate("/Dashboard")
    
     }

    } else {
           alert("employee deletion was canceled.");
        }
   };
  
  return (
    <div className='App'>
    <TopNavigation/>
  
    <br/>
    <br/>
   
    <div>
     <Link to="/AddEmployee" style={{backgroundColor:"#bbd0ff",borderRadius:"5px"}}>Create-Employee</Link>
      </div>

    <div className='Search-Container'>
  <p  style={{display:"inline-block",margin:"20px",fontSize:"1.2rem"}}>employees found: {employeesCount}</p>

      <label>Search</label>
      <input placeholder='Search based on FirstName' type="text" value={search} onChange={(eventObj)=>{setSearch(eventObj.target.value)}}></input>
      </div>
   
    <br></br>
     <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>profilePic</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>mobileNo</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
             <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeesList.filter((ele)=>{return search.toLowerCase() === "" ? ele : 
          ele.firstName.toLowerCase().includes(search)}).map((ele,i)=>{
            return <tr key={i}>
           
            <td>{i+1}</td>
            <td><img className='StoreObjprofilePic' src={`http://localhost:4567/${ele.profilePic}`}></img></td>
            <td>{ele.firstName}</td>
            <td>{ele.lastName}</td>
            <td>{ele.email}</td>
            <td>{ele.mobileNo}</td>
            <td>{ele.designation}</td> 
            <td>{ele.gender}</td>
            <td> {Object.keys(ele.course).map((course, idx) => (
                  ele.course[course] && <span key={idx}>{course} </span>
                ))}</td>
             <td>{ele.date}</td>
            <td><Link  to={`/updateProfile/${ele._id}`}>Edit</Link> / <Link onClick={()=>{deleteProfile(ele.email);}}>delete</Link></td>
          </tr>

          })}
        </tbody>
        <tfoot></tfoot>
      </table>
     </div>
     
    </div>
  )
}

export default EmployeesList