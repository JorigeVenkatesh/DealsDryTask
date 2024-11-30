import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';
import SignupForm from './components/SignupForm';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import EmployeesList from "./components/EmployeesList";
import Logout from "./components/Logout";
import UpdateProfile from "./components/UpdateProfile";
import AddEmployee from "./components/AddEmployee";



function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/SignupForm" element={<SignupForm/>}></Route>
      <Route path="/Dashboard" element={<Dashboard/>}></Route>
      <Route path="/EmployeesList" element={<EmployeesList/>}></Route>
      <Route path="/UpdateProfile/:id" element={<UpdateProfile/>}></Route>
      <Route path="/AddEmployee" element={<AddEmployee/>}></Route>
      <Route path="/Login" element={<Logout/>}></Route>
      
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
