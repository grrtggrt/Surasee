import React from 'react'
import ContentTop from './contentTop'
import Dashboard from '../pages/Dashboard'
import './content.scss'

const contentDashboard = () => {
  return (
    <div className="main-content">
      <ContentTop />
      <Dashboard/>
    </div>
  )
}

export default contentDashboard