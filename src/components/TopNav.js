import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './TopNav.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const pages = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const TopNav = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const [username, setUsername] = useState(null);

  // api for validating user :- https://jsso.indiatimes.com/sso/crossdomain/v1liteUserProfile?responsetype=json&type=JSON&update=true&siteId=eec5b06ed436ddefdb4c3a59c5ea0468&ticketId=

  useEffect(() => {

    console.log(window.location.href)

    if (window.location.href.includes("ticketId") && window.location.href.includes("status")) {

      const queryParams = new URLSearchParams(window.location.search);
      const ticketId = queryParams.get('ticketId');
      const channel = queryParams.get('channel')
      const site = queryParams.get('site');

      console.log(ticketId)

      const getUserDetailApi = 'http://jssostg.indiatimes.com/sso/crossdomain/v1liteUserProfile?responsetype=json&type=JSON&update=true&siteId=eec5b06ed436ddefdb4c3a59c5ea0468&channel=minions&ticketId=' + ticketId;
      console.log(getUserDetailApi)
      console.log(getUserDetailApi)

      fetch(getUserDetailApi)
        .then(response => console.log(response))
        .catch(error => console.log(error))

      console.log("--- " + ticketId);



      setIsLoggedIn(1)
    }

  }, [window.location.href])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const loggedInClicked = () => {
    setIsLoggedIn(1);
  }



  return (
    <AppBar position="static" id="appbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <div className='appbarTitle'>
            YourNews.com
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">

              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <IconButton sx={{ p: 0 }}>
                <a
                  href="https://jssostg.indiatimes.com/sso/identity/login?channel=minions&ru=http://localhost:3000/"
                >Login</a>
                {/* onClick={ } 

                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> 
              </IconButton> */}

              <IconButton>
                {isLoggedIn ? "LoggedIn" :
                  <a
                    href="https://jssostg.indiatimes.com/sso/identity/login?channel=minions&ru=http://localhost:3000/"
                  >Login</a>

                }
              </IconButton>

            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopNav;
