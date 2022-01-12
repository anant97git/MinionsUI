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

  const [useremail, setUseremail] = useState(null);

  // api for validating user :- https://jsso.indiatimes.com/sso/crossdomain/v1liteUserProfile?responsetype=json&type=JSON&update=true&siteId=eec5b06ed436ddefdb4c3a59c5ea0468&ticketId=

  useEffect(() => {

    console.log(window.location.href)

    if (window.location.href.includes("ticketId") && window.location.href.includes("status")) {

      const queryParams = new URLSearchParams(window.location.search);
      const ticketId = queryParams.get('ticketId');
      const channel = queryParams.get('channel')
      const site = queryParams.get('site');
      console.log(ticketId)
      const getUserDetailUrl = 'http://jssostg.indiatimes.com/sso/crossdomain/v1liteUserProfile';
      const object = {
        responsetype: 'json',
        type: 'JSON',
        update: 'true',
        siteId: 'eec5b06ed436ddefdb4c3a59c5ea0468',
        channel: 'minions',
        ticketId: ticketId
      }
      const getUserDetailApi = 'http://jssostg.indiatimes.com/sso/crossdomain/v1liteUserProfile?responsetype=json&type=JSON&update=true&siteId=eec5b06ed436ddefdb4c3a59c5ea0468&channel=minions&ticketId=' + ticketId;
      console.log(getUserDetailApi)

      axios.get('https://serene-caverns-15409.herokuapp.com/' + getUserDetailApi).then((response) => {

        if (response.data.code === "200") {
          setUsername(response.data.firstName);
          setUseremail(response.data.primaryEmailId);
        }
        else {
          setUsername(null);
          setUseremail(null);
        }
        const qparam = new URLSearchParams(window.location.search);
        qparam.delete('ticketId');
        qparam.delete('site');
        console.log('qparam :- ' + qparam);
        qparam.delete('channel')
        console.log('qparam :- ' + qparam)
        qparam.delete('status');
        console.log('qparam :-' + qparam);
        console.log(response.data);
        setIsLoggedIn(1);
      }).catch(error => console.log(error))


      console.log("--- " + ticketId);
    }

  }, [window.location.href])

  const callLogout = () => {
    setIsLoggedIn(1);
    setUsername(null);
    setUseremail(null);
    window.location.href = 'http://localhost:3000/';
  }

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



              <IconButton>
                {/* {isLoggedIn ? <div> {username} <a onClick={callLogout}  */}

                {isLoggedIn ? <div> {username} {useremail}
                  <a
                    href='https://jssostg.indiatimes.com/sso/identity/profile/logout/external?channel=minions&ru=http://localhost:3000/'
                  > Logout  </a> </div> :

                  <a
                    href="https://jssostg.indiatimes.com/sso/identity/login?channel=minions&ru=http://localhost:3000/"
                  >  Login  </a>

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
    </AppBar >
  );
};
export default TopNav;
