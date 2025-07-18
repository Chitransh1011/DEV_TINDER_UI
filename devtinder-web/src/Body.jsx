import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <div className="p-6">
      <button className="btn btn-primary">Click Me</button>
      <div className="alert alert-success mt-4">This is a success alert</div>
    </div>
    </>
  )
}

export default Body