"use client"

import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
// import {setToken} from '@/app/utils/auth'
import {localApi} from '@/components/constants'
// import Cookies from 'js-cookie';

function Login() {
    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")
    const [error,setError]= useState("")

    const router = useRouter()

    const handleLogin = async () => {
        const api = localApi
        // console.log( "cookie==>",document.cookie);
        
        if(email && password){
        try {
          const response = await axios.post(`${api}/user/login`, 
          { email, password },
          {
            headers: {
                'Content-Type': 'application/json', 
                
            },
            withCredentials: true, 
        }
        );
        //   const { token } = response.data;
        //   if(token){
        //   setToken(token);
          router.push('/');
        //   const token = Cookies.get('jwtToken');
        //   console.log("cookie==>",document.cookie);
          
            // console.log("token==>",token);
        //   }
          
        } catch (error) {
          console.error('Login failed', error);
          console.log(error.response.data.message);
          
          setError(error.response.data.message);
          setEmail("")
          setPassword("")
          
        }
    }else{
        setError("Please, enter all the input fields");
        setEmail("")
        setPassword("")
    }
      };

      const handleEmail=(e)=>{
        setEmail(e.target.value)
        setError("")
      }
    



  return (
    <div>
      <Container component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #ccc', 
                borderRadius: '5px', 
                padding: '20px', 
                position:'relative',
            }}
            >
             
            <Typography component="h1" variant='h5'>
                Login
            </Typography>

            <Box component="form" noValidate sx={{ mt:3}}>
                <Grid container spacing={2}>
              
                    <Grid item xs={12}>                  
                        <TextField
                            // onChange={(e)=>setEmail(e.target.value)}
                            onChange={handleEmail}
                            name='email'
                            required
                            fullWidth
                            id="email"
                            label='Email Address'
                            autoFocus
                            autoComplete='email'
                            value={email}
                            >
                        </TextField>
                    </Grid>   
                    <Grid item xs={12}>                  
                        <TextField
                            onChange={(e)=>setPassword(e.target.value)}
                            name='password'
                            required
                            fullWidth
                            type="password"
                            id="password"
                            label='Password'
                            value={password}
                            // autoFocus
                            autoComplete='new-password'
                            >
                        </TextField>
                    </Grid> 
                   
                </Grid>

            </Box>

                    <Button
                    onClick={handleLogin}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mt:3, mb:2, 
                            color:'black',
                            '&:hover': {
                                color: 'white'
                            }
                        }}
                    >
                        Login
                    </Button>
                    {error && <p className='text-[red]'>{error}</p>}
          {/* <Link className='text-[blue]  hover:underline' href="./signin">Click here to sign in</Link> */}
            </Box>
        </Container>
    </div>
  )
}

export default Login