import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Dashboard() {
  let storeObj =useSelector((store)=>{return store;});
  console.log(storeObj)
  return (
    <div className='App'>
        <TopNavigation/>
        <h2>Wellcome to Admin Panel</h2>
       
        
          

       
    </div>
  )
}

export default Dashboard