import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Schedule from './pages/Schedule.jsx'
import ManageRoom from './pages/ManageRoom.jsx'
import ImportData from './pages/ImportData.jsx'
import Nav from './components/Nav.jsx'

function App() {
  return (
    <Router>
      <div className='App'>
        <Nav/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='schedule' element={<Schedule/>}/>
          <Route path='manageroom' element={<ManageRoom/>}/>
          <Route path='importdata' element={<ImportData/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App