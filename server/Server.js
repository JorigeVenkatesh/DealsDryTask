const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename:  (req, file, cb) => {
    
    cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'))


let connectedToMDB = ()=>{
    try{
        mongoose.connect("mongodb+srv://venkateshjorige:venkateshjorige@cluster0.mcquehd.mongodb.net/?retryWrites=true&w=majority");
        console.log ("successfully connected to MDB")
    } catch (err) {
        console.log(err);
        console.log("unable to connect MDB")
    };

};

app.get("/employeesList", async (req,res)=>{
  let employeesList = await User.find().sort({firstName:"asc"},{email:"asc"},);
 let employeesCount = await User.find().countDocuments();
res.json({employees:employeesList,count:employeesCount})


});
app.post("/updateEmployee",upload.none(), async(req,res)=>{
  let fetchedData = await User.find().and({_id:req.body.id});

 res.json({status:"success",data:fetchedData[0]});
 console.log(fetchedData[0])

})

app.post("/signup",upload.array("profilePic"), async (req,res)=>{
  console.log("req.body");
        console.log(req.body);
        console.log(req.body.course);
                // console.log(JSON.parse(req.body.course));
                
          let courseData = JSON.parse(req.body.course)
    

        console.log(req.files);

        let userArray = await User.find().and({email:req.body.email});
        
        if(userArray.length > 0){
            res.json({status:"failure",msg:"user already exist"})
        }else{
            let hashedPassword = await bcrypt.hash(req.body.password,10);
            try{
     let newUser = new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    mobileNo:parseInt(req.body.mobileNo),
    gender:req.body.gender,
    designation:req.body.designation,
    course:courseData,
    date:req.body.date,
    email:req.body.email,
    password:hashedPassword,
    profilePic:req.files[0].path,
        });
        await newUser.save();
        res.json({status:"success",msg:"User Successfully Created"})
    
    } catch (err) {
        res.json({status:"failed",err:err})
    }
   };
    
    
   });


app.post("/login",upload.none(), async (req,res)=>{
    console.log (req.body);
   
     let fetchedData = await User.find().and({email:req.body.email});

    if(fetchedData.length > 0){

      let passwordResult = await bcrypt.compare(req.body.password,fetchedData[0].password)

     if(passwordResult === true){

        let token = jwt.sign({email:req.body.email,password:req.body.password},"secretKey");

     let dataToSend = {
    firstName:fetchedData[0].firstName,
    lastName:fetchedData[0].lastName,
    mobileNo:fetchedData[0].mobileNo,
    gender:fetchedData[0].gender,
    email:fetchedData[0].email,
    course:fetchedData[0].course,
    designation:fetchedData[0].designation,
    date:fetchedData[0].date,
    profilePic:fetchedData[0].profilePic,
    token: token,
        };

        res.json({status:"success",data:dataToSend});
     }else{
        res.json({status:"failure",msg:"Invalid Password"})
     }
    }else{
        res.json({status:"failure",msg:"User Does Not Exist"})
    }
});

app.put("/updateProfile",upload.single("profilePic"), async (req,res) =>{
    console.log(req.body);
    console.log(req.file)
    try{
        if(req.body.firstName.length > 0){
            await User.updateMany({email:req.body.email},{firstName:req.body.firstName})
        };

        if(req.body.lastName.length > 0 ){
            await User.updateMany({email:req.body.email},{lastName:req.body.lastName})
        };

        if(req.body.mobileNo > 0 ){
            await User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
        };
        if(req.body.gender === "undefined"){
          }else{
            await User.updateMany({email:req.body.email},{gender:req.body.gender})
          };
          
         if(req.body.designation.length > 0){
          await User.updateMany({email:req.body.email},{designation:req.body.designation})
         };
         if(req.body.course.length > 0){
            let courseData =  JSON.parse(req.body.course)
    
          await User.updateMany({email:req.body.email},{course:courseData})
        }
        if(req.body.password.length > 0){
        
           let hashedPassword = await bcrypt.hash(req.body.password,10);
            await User.updateMany({email:req.body.email},{password:hashedPassword})
        };
        if(req.file && req.file.path){
            await User.updateMany({email:req.body.email},{profilePic:req.file.path})
        };

        res.json({status:"success",msg:"User Details Updated Successfully"})
    } catch (err) {
        res.json({status:"failure",msg:"Somthing Went Wrong",err:err})

    }
});

app.delete("/deleteProfile", async (req,res)=>{
    console.log(req.query.email)
    try{
        await User.deleteMany({email:req.query.email});
        res.json({status:"success",msg:"User Deleted Successfully"})
    } catch (err){
        res.json({status:"failure",msg:"Unable To Delete User",err:err})
    };
});

app.post("/validateToken",upload.none(),async (req,res)=>{

    console.log(req.body.token);
     try{
         let decryptedObj = jwt.verify(req.body.token,"secretKey");
    console.log(decryptedObj);

    let fetchedData = await User.find().and({email:decryptedObj.email});

    if(fetchedData.length > 0){

     let passwordResult = await bcrypt.compare(decryptedObj.password,fetchedData[0].password)

     if(passwordResult === true){
    
    
    let dataToSend = {
    firstName:fetchedData[0].firstName,
    lastName:fetchedData[0].lastName,
    mobileNo:fetchedData[0].mobileNo,
    gender:fetchedData[0].gender,
    designation:fetchedData[0].designation,
    course:fetchedData[0].course,
    email:fetchedData[0].email,
    profilePic:fetchedData[0].profilePic,
    date:fetchedData[0].date,
   
        };

        res.json({status:"success",data:dataToSend});
     }else{
        res.json({status:"failure",msg:"Invalid Password"})
     }
    }else{
        res.json({status:"failure",msg:"User Does Not Exist"})
    }
     } catch(err) {
        res.json({status:"failure",msg:"Invalid Token",err:err})
     }
   
    
});



let userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        validate: {
      validator: function(v) {
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30}(\s[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30})*$/.test(v);
      },
      message: props => `${props.value} is not a valid E-MAIL!`
    },
    required: [true, 'User E-MAIL required']
    },
    lastName:{
        type:String,
        validate: {
      validator: function(v) {
        return /^[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30}(\s[a-zA-ZÀ-ÖØ-öø-ÿ-']{2,30})*$/.test(v);
      },
      message: props => `${props.value} is not a valid E-MAIL!`
    },
    required: [true, 'User E-MAIL required']
    },
   mobileNo:{
    type: Number,
    validate: {
      validator: function(v) {
        return /^(?![0-5])(?:\(?[6-9]\d{1,2}\)?[- ]?)?\d{3}[- ]?\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
   gender:{
        type:String,
        required:true,
        enum:["male","female"],
        lowercase:true,
    },
   designation:{
    type: String,
    required: true
  },
  course: {
 type:Object,
 require:true,
}
,
    email:{
        type:String,
        validate: {
      validator: function(v) {
        return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid E-MAIL!`
    },
    required: [true, 'User E-MAIL required']
    },
    // while saving password i bcrypted so i validated  type string here
    password:{
    type: String,
    required: true
  },
    date:{
    type: String,
    required: true
  },
    profilePic:{
    type: String,
    required: true
  },
});

let User = new mongoose.model("user",userSchema);

app.listen(4567,()=>{
    console.log("listenimg to port 4567" )
});

connectedToMDB();