import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UploadPage from './Pages/BlogUploadPage/uploadBlog.jsx'
import Navbar from './Components/Navbar/navbar.jsx'
import MainPage from './Pages/MainPage/mainPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <MainPage/>
  </React.StrictMode>,
)
