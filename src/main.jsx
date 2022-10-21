import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthContext, UserContext, MessageContext } from './Contexts';
import { BrowserRouter } from 'react-router-dom'

const AppContainer = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);

  return (
    <MessageContext.Provider value={{errors, setErrors, success, setSuccess}}>
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>      
        <UserContext.Provider value={{user, setUser}}> 
        <BrowserRouter>
            <App />                             
        </BrowserRouter>
        </UserContext.Provider>      
      </AuthContext.Provider>
    </MessageContext.Provider>
  )}

const container = document.getElementById('root');
const root = createRoot(container);
// ReactDOM.createRoot(document.getElementById('root'))
root
.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>    
)