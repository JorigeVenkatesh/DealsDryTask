import React, { useRef, useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom';
import moment from "moment/moment"
import TopNavigation from './TopNavigation';
function AddEmployee() {
    let navigate = useNavigate();
   let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let mobileNoInputRef = useRef();
  let passwordInputRef = useRef();
  let maleInputRef = useRef();
  let femaleInputRef= useRef();
  let emailInputRef = useRef();
  let profilePicInputRef = useRef();
  let firstNameSpanRef = useRef();
  let lastNameSpanRef = useRef();
  let emailSpanRef = useRef();
  let passwordSpanRef = useRef()
  let mobileNoSpanRef = useRef();
  let designationRef = useRef();
   let firstNameRegEx =/^[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30}(\s[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30})*$/;
  let lastNameRegEx = /^[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30}(\s[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30})*$/;
  let emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
  let mobileNumberRegEx =  /^\+?[6-9]\d{9,14}$/;

;
 const [course, setCourse] = useState({
    MCA: false,
    BCA: false,
    BSC: false,
  });

  let [gender,setGender] = useState();
  let [designation,setDesignation ]= useState();
  let [profilePicPath,setProfilePicPath] = useState("./images/noImage.png");
  let date = moment().format('LL');
  
 let validateFirstName = (inputSpanRef)=>{
    let result = firstNameRegEx.test(firstNameInputRef.current.value)
    if(result === true){
      console.log("valid name");
      inputSpanRef.current.innerHTML = "valid"
      inputSpanRef.current.style.backgroundColor="green"
      
    }else{
      console.log("invalid name");
      inputSpanRef.current.innerHTML = "invalid"
      inputSpanRef.current.style.backgroundColor="red"

    }}
let validateLastName = (inputSpanRef)=>{
    let result = lastNameRegEx.test(lastNameInputRef.current.value)
    if(result === true){
      console.log("valid name");
      inputSpanRef.current.innerHTML = "valid"
      inputSpanRef.current.style.backgroundColor="green"
      
    }else{
      console.log("invalid name");
      inputSpanRef.current.innerHTML = "invalid"
      inputSpanRef.current.style.backgroundColor="red"

    }}
    let validateMobileNumber = (inputSpanRef)=>{
    let result = mobileNumberRegEx.test(mobileNoInputRef.current.value)
    if(result === true){
      console.log("valid email");
      inputSpanRef.current.innerHTML = "valid"
      inputSpanRef.current.style.backgroundColor="green"
      
    }else{
      console.log("invalid email");
      inputSpanRef.current.innerHTML = "invalid"
      inputSpanRef.current.style.backgroundColor="red"

    }}
let validateEmail = (inputSpanRef)=>{
    let result = emailRegEx.test(emailInputRef.current.value)
    if(result === true){
      console.log("valid email");
      inputSpanRef.current.innerHTML = "valid"
      inputSpanRef.current.style.backgroundColor="green"
      
    }else{
      console.log("invalid email");
      inputSpanRef.current.innerHTML = "invalid"
      inputSpanRef.current.style.backgroundColor="red"

    }}
 let validatePassword = (inputSpanRef)=>{
    let result = passwordRegEx.test(passwordInputRef.current.value)
    if(result === true){
      console.log("valid password");
      inputSpanRef.current.innerHTML = "valid"
      inputSpanRef.current.style.backgroundColor="green"
      
    }else{
      console.log("invalid password");
      inputSpanRef.current.innerHTML = "invalid"
      inputSpanRef.current.style.backgroundColor="red"

    }}  

 

  let sendDataToServerThruFormData = async ()=>{

    console.log("sendDataToServerThruFormData");

  let courseData = JSON.stringify(course);

    let dataToSend = new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);
    dataToSend.append("gender",gender);
    dataToSend.append("designation",designation);
    dataToSend.append("course",courseData);
    dataToSend.append("date",date)
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    for(let i = 0;i<profilePicInputRef.current.files.length;i++){
     dataToSend.append("profilePic",profilePicInputRef.current.files[i]);
    }
    

    

    let reqOptions = {
        method : "post",
        body : dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/signup",reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status === "success"){
        alert(JSOData.msg)
        navigate("/EmployeesList")

    }else{
        alert(JSOData.msg);
    }

  };
 

  return (
    <div className='App'>
     <TopNavigation></TopNavigation>
    <form>
        <h3>Add-Employee</h3>
        <div>
            <label>FIRST NAME</label>
            <input ref={firstNameInputRef} onChange={()=>{validateFirstName(firstNameSpanRef)}}></input>
            <span ref={firstNameSpanRef}></span>
        </div>
        <div>
            <label>LAST NAME</label>
            <input ref={lastNameInputRef} onChange={()=>{validateLastName(lastNameSpanRef)}}></input>
             <span ref={lastNameSpanRef}></span>
        </div>

        <div>
            <label>MOBILE NO</label>
            <input ref={mobileNoInputRef} onChange={()=>{validateMobileNumber(mobileNoSpanRef)}}></input>
             <span ref={mobileNoSpanRef}></span>
        </div>
        <div>
            <label>DISIGNATION</label>
            <select ref={designationRef}  onChange={()=>{ 
              setDesignation(designationRef.current.value);
             
            }}>
                <option >Chose Your Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
        </div>
        <div>
            <label>GENDER</label>
            <input type="radio" name="gender" ref={maleInputRef} onChange={()=>{
                if(maleInputRef.current.checked === true){
                    console.log("user is male")
                    setGender("male")
                }
            }}></input>
            <label className='innerLabel'>male</label>
            <input type="radio" name="gender" ref={femaleInputRef} onChange={()=>{
                if(femaleInputRef.current.checked === true){
                    console.log("user gender is female");
                     setGender("female")
                    
                }
            }}></input>
            <label className='innerLabel'>female</label>
        </div>
       <div>
          <label>COURSE</label>
          <input
            type="checkbox"
            checked={course.MCA}
            onChange={(e) => setCourse({ ...course, MCA: e.target.checked })}
          />
          <label className="innerLabel">MCA</label>
          <input
            type="checkbox"
            checked={course.BCA}
            onChange={(e) => setCourse({ ...course, BCA: e.target.checked })}
          />
          <label className="innerLabel">BCA</label>
          <input
            type="checkbox"
            checked={course.BSC}
            onChange={(e) => setCourse({ ...course, BSC: e.target.checked })}
          />
          <label className="innerLabel">BSC</label>
        </div>
        <div>
            <label>EMAIL</label>
            <input ref={emailInputRef} onChange={()=>{validateEmail(emailSpanRef)}}></input>
             <span ref={emailSpanRef}></span>
        </div>
        <div>
            <label>PASSWORD</label>
            <input type="password" ref={passwordInputRef} onChange={()=>{validatePassword(passwordSpanRef)}}></input>
             <span ref={passwordSpanRef}></span>
        </div>
        <div>
            <label>PROFILE PIC</label>
            <input ref={profilePicInputRef} type="file"
             onChange={(eventObj)=>{
                let selectedImagePath =  URL.createObjectURL(eventObj.target.files[0]);
                setProfilePicPath(selectedImagePath);
             }}></input>
        </div>
        <div>
            <img className='profilePic' src={profilePicPath} alt='profilePic'></img>

        </div>
        <div>
        <button type="button" onClick={()=>{
                sendDataToServerThruFormData();
            }}>Add-Emplyee</button>
        </div>
    </form>
    <br></br>
    <br></br>
    </div>
  )
}

export default AddEmployee