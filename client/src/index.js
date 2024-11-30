import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore} from 'redux';
import { Provider } from 'react-redux';

let initialStore = {
  loginDetails:{},
  // employeeUpdateDetails:{},
  employeeDetails:{}
};

let reducer = (latestStore = initialStore,dispachedObj)=>{
  console.log("inside reducer")
  if(dispachedObj.type === "login"){
     return{...latestStore,loginDetails:dispachedObj.data}
  };

  // if(dispachedObj.type === "employeeUpdateData"){
  //   return{...latestStore,employeeUpdateDetails:dispachedObj.data}
  // }
  if(dispachedObj.type === "employeeDetails"){
    return{...latestStore,employeeDetails:dispachedObj.data}
  }
  return latestStore
};

let store = createStore(reducer)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
