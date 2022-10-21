import { useEffect, useState } from 'react'
import http from './http'
import "./App.css"
import { styled } from '@mui/material/styles';
import { Backdrop, Button, CircularProgress, TextField, Typography } from '@mui/material';
import MenuAppBar from './components/AppBar';
import { useContext } from 'react';
import { AuthContext, MessageContext, UserContext } from './Contexts';
import SignIn from './components/Signin';
import {Navigate, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Signup from './components/Signup';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


function App() {  

  const navigate = useNavigate()

  const {errors, setErrors} = useContext(MessageContext);
  const {user, setUser} = useContext(UserContext);
  const {authenticated, setAuthenticated} = useContext(AuthContext);
  const [openBackDrop,setBackDrop] = useState(false)
  // const [user,setUser] = useState({})
  // const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  // const [password,setPassword] = useState('')
  const [passwordOk,setPasswordOk] = useState(false)
  const [books,setBooks] = useState([])
  const [token, setToken] = useState("")

    
  const signout = () => {
    localStorage.removeItem("token")
    setUser([])
    setToken("")
    setAuthenticated(false)
  }

  const getBooks = () => {
    http.get("/books")
    .then(r => {
      console.log(r)
      setBooks(r.data)      
      
    })
    .catch(err => console.log(err))

  }

  function entrar(form) {
    
    form.preventDefault();
    const data = new FormData(form.currentTarget);
    
    let email = data.get('email')
    let password = data.get('password')        

    if(email && password){
      setBackDrop(true)
      http.post("/signin", {email:email, password:password})
      .then(r => {
        
        if(r.data.token) {
          setUser(parseJwt(r.data.token))
          setToken(r.data.token)
          localStorage.setItem("token", r.data.token)
          // setAuth(true)
          setAuthenticated(true)
          navigate("/")
        }

        setBackDrop(false)
        console.log(r)
      })
      .catch(err => 
        {
          console.log(err)
          setErrors(["Credenciais inválidas!"])
          setBackDrop(false)          
        })
    }
    else alert("Informe os campos")
  }

  const verifyPassword = (pass,passconf) => {
    return pass == passconf && pass != ""
  }
  
  function register(form) {
    form.preventDefault();
    const data = new FormData(form.currentTarget);
    
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const password_confirm = data.get('password_confirm')

    if(!verifyPassword(password,password_confirm)){
      alert("Informe os campos!")
      return
    }
    
    if(!email || !password || !name){
      alert("Informe os campos!")
      return
    }

    setBackDrop(true)
    
    console.log("Submiting: ", email, password)
    
    http.post("/signup", {email:email, password:password,name:name})
    .then(r => {
      setBackDrop(false)
      if(r.status === 200) {
        alert("Registro criado!")
      }
      console.log(r)
    })
    .catch(err => {
      console.log(err)
      setBackDrop(false)
      alert(err.response.data)

    })    
  }


function isJWTValid(token) {
    let data = parseJwt(token);
    var unixTime = Math.floor(Date.now() / 1000);

    return data.exp > unixTime;
}

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));    

    return JSON.parse(jsonPayload);
};

  useEffect(() => {
    const title = import.meta.env.VITE_APP_NAME
    console.log(title)
    document.title = title ? title : "*-*";
    const token = localStorage.getItem("token");
    // console.log("Token: ", token);
    if(token && !isJWTValid(token)) {
      localStorage.removeItem("token")
      navigate('/')
      return
    }    
    
    if(token){
      setToken(token)
      setAuthenticated(true)
      const user_token = parseJwt(token);
      console.log(user_token)
      setUser(user_token)
    }
        
    // http.post("/signin",{'email':'manoel@jose.com','password':'1234561'})
    // .then(r => {
    //   if(r.data.token) {
    //     const token = r.data.token
    //     // console.log(r.data.token)
    //     const token_parsed = parseJwt(token)
    //     console.log("Token parsed: ", token_parsed)
    //     localStorage.setItem("token", r.data.token)
    //   } else {
    //     alert("Error validating credentials!")
    //     console.log(r.data)
    //   }
    // })
    // .catch(err => console.log(err))
    
    // fetch("http://localhost:8080/books")
    // .then(r => r.json()
    // .then( d => console.log(d)))
      
  }, [])
  
  const Home = () => {
    return <>
    <h3>Seja bem vindo(a)!</h3>
    {authenticated ? <Typography>Você está logado! Nome: {user && user.name}</Typography> : <Typography>Você não está logado!</Typography>}
    </>
  }

  function Logout() {
    return <h4>Logout efetuado com sucesso!</h4>
  }

  return <div>
    <MenuAppBar auth={authenticated} logout={() => signout()} />  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn signin={entrar}/>} />
      <Route path="/signup" element={<Signup register={register}/>} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
    
        {/* {
          !authenticated && 
          <div >          
            <hr />
        <TextField label="Email" variant="outlined" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <TextField label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        </div>
        } */}        
        {
          user && user.role == 'admin' && <Button variant="contained" onClick={getBooks}>Load Books</Button>
        }          
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}        
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  </div> 
  
}

export default App
