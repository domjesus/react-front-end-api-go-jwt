import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useLocation } from 'react-router-dom';
import "./../css/AppBar.css"
import { Button } from '@mui/material';
import { AuthContext } from '../Contexts';
import { LogoutOutlined } from '@mui/icons-material';

export default function MenuAppBar(props) {
  const {authenticated} = React.useContext(AuthContext)
  const {logout} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation()

  // React.useEffect(() => {
  //   console.log("Location: ", location)
  //   location.pathname
  // },[]);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
            Home
            </Link>
          </Typography>
          {authenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>                
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        {!authenticated && location.pathname !== '/signin' && <Button color="inherit"><Link to="/signin">Entrar</Link></Button>}
        {!authenticated && location.pathname !== '/signup' && <Button color="inherit"><Link to="/signup">Registrar</Link></Button>}
        {authenticated && <IconButton color="inherit" onClick={logout}><Link to="/logout"><LogoutOutlined /></Link></IconButton>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
