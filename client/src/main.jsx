import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './Hooks/loginHook.jsx';
import Login from './Components/Login/login.jsx'
import App from './Components/App/App.jsx'
import NavBar from './Components/NavBar/NavBar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <NavBar />
    <Login />
    <App />
    <Footer />
    </UserProvider>
  </React.StrictMode>,
)
