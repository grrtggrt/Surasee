import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SidebarProvider } from './context/sidebarContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SidebarProvider>
      <App/>
    </SidebarProvider>
  </React.StrictMode>,
)
