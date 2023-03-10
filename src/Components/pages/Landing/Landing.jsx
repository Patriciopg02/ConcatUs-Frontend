import React,{ useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LandingPage.css'
import LandingLogin from './Login/LandingLogin';
import LandingRegister from './Register/LandingRegister';
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../context/UserAuthContext';
import GoogleButton from 'react-google-button';
import logogrande2 from '../../../Logos/logogrande2.png';
import axios from 'axios';
import { Avatar, Card, CardHeader } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const theme = createTheme();

const LandingPage = () => {
  const { user, logIn, googleLogIn } = useUserAuth();
  const [opinions, setOpinions] = useState([]);
  const navigate = useNavigate();
  console.log(opinions);

  if(opinions.length !== 0) {
    var Three_opinions = [];
    for (let i = 0; i < 3; i++) {
      const random = opinions[Math.floor(Math.random() * opinions.length)];
      Three_opinions.push(random);
    }
  }

  useEffect(()=> {
    if (user) navigate('/home')
    const Config = {
      method: 'get',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/opinions/getAllOpinions`,
    }
    axios(Config).then(res => setOpinions(res.data))

  },[])
  const handleGoogleButton = async (e) => {
    e.preventDefault();
    try{
      await googleLogIn();
      navigate("/home")
    }catch(err){
      console.log(err)
    }
  }
          
  return (
    <ThemeProvider theme={theme}>
      <Grid className='landing' container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          className='carousel'
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <img src={logogrande2} id='logoLanding' alt='logo'/>
        <Grid className='form' item component={Paper} elevation={6} square>
        {window.location.href === `${process.env.REACT_APP_MY_FRONT_URL}/` ?
          <LandingLogin /> : <LandingRegister/>
        }
        <p className='bottomButtons'>or</p>
        {window.location.href === `${process.env.REACT_APP_MY_FRONT_URL}/` ?
          <Button variant='outlined' className='bottomButtons' id='changeForm' onClick={() => navigate('/signup')}>
            Register 
          </Button> 
          : <Button variant='outlined' className='bottomButtons' id='changeForm' onClick={() => navigate('/')}>
              Login 
          </Button>}
        
              
          <GoogleButton className='GoogleButton' onClick={handleGoogleButton}/>
        </Grid>

        {
          Three_opinions?.length ?
          <div className='ReviewContainer'>
              <p id='TitleReviews'>User's Reviews</p>
              <div id='ReviewCard0'>
                  <Card sx={{bgcolor:'#dcdcdc'}}>
                  <CardHeader 
                    sx={{ p:".5vw", color: "#000000" }}
                    avatar={
                      <Avatar 
                      sx={{minWidth:'2vw',minHeight:'2vw',maxWidth:'2vw',maxHeight:'2vw'}}
                      src={Three_opinions[0].avatar}>
                      </Avatar>
                    }
                    title={Three_opinions[0].name}
                    titleTypographyProps={{fontSize:'.8vw'}}
                    subheader={Three_opinions[0].text}
                    subheaderTypographyProps={{wordWrap: 'break-word', color:'#2a2a2a', maxWidth:'15vw', fontSize:'1vw'}}
                  />
                </Card>
              </div>

              <div id='ReviewCard1'>
                  <Card sx={{bgcolor:'#dcdcdc'}}>
                  <CardHeader
                    sx={{ p: ".5vw", color: "#000000" }}
                    avatar={
                      <Avatar 
                      sx={{minWidth:'2vw',minHeight:'2vw',maxWidth:'2vw',maxHeight:'2vw'}}
                      src={Three_opinions[1].avatar}>
                      </Avatar>
                    }
                    title={Three_opinions[1].name}
                    titleTypographyProps={{fontSize:'.8vw'}}
                    subheader={Three_opinions[1].text}
                    subheaderTypographyProps={{wordWrap: 'break-word', maxWidth:'200px', color:'#2a2a2a', fontSize:'1vw'}}
                  />
                </Card>
              </div>

              <div id='ReviewCard2'>
                  <Card sx={{bgcolor:'#dcdcdc'}}>
                  <CardHeader
                    sx={{ p: ".5vw", color: "#000000"}}
                    avatar={
                      <Avatar 
                      sx={{minWidth:'2vw',minHeight:'2vw',maxWidth:'2vw',maxHeight:'2vw'}}
                      src={Three_opinions[2].avatar}>
                      </Avatar>
                    }
                    title={Three_opinions[2].name}
                    titleTypographyProps={{fontSize:'.8vw'}}
                    subheader={Three_opinions[2].text}
                    subheaderTypographyProps={{wordWrap: 'break-word', maxWidth:'200px', color:'#2a2a2a', fontSize:'1vw'}}
                  />
                </Card>
              </div>
          </div> : <></>
        }

      </Grid>
    </ThemeProvider>
  );
  
}

export default LandingPage
