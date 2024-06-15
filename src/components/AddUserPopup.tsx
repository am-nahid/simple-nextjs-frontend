import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import {localApi} from '@/components/constants'
import { useRouter } from 'next/navigation'

//   interface currentUser{
//     id:number;
//   }

interface AddUserPopupProps {
    onClose: () => void;
    onOpen: () => void;
    currentUser: currentUser | [] | null;
  }



// function AddUserPopup({onClose, onOpen, userData, setUserObject, currentUser}) {
    const AddUserPopup : React.FC<AddUserPopupProps> = ({ onClose, onOpen, currentUser }) => {
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        address:""
    })
const route = useRouter()
    const handleInputChange=(e)=>{
        const {name,value} = e.target
        setFormData({...formData,[name]:value})
    }
  

    useEffect(() => {
        
        setFormData(currentUser);
      }, [currentUser]);


      const handleUpdate=async ()=>{
        const api = localApi
        const {name,email,phone,address} = formData
        if(currentUser.id){

            const response = await axios.post(`${api}/user/newUser`,{id:currentUser.id,name,email,phone,address})
            console.log("User updated:", response.data);
            onClose()
            
        }else if(!currentUser.id && name && email && phone && address){
            const response = await axios.post(`${api}/user/addUser`,{name,email,phone,address})
            console.log("New user created:", response.data);
            onClose()

        }
      }

    
    

  return (
    <div className='fixed z-[2] -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4'>
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
                backgroundColor:'#ffffff'
            }}
            >
                <IconButton
                onClick={onClose}
                    sx={{
                        position:'absolute',
                        top: 1,
                        right: 5
                    }}>
                  {/* <Link href="/"> */}
                    <CloseIcon/>
                        {/* </Link> */}
                </IconButton>
            {/* <Typography component="h1" variant='h5'>
                
            </Typography> */}

            <Box component="form" noValidate sx={{ mt:3}}>
                <Grid container spacing={2}>
                    {/* <Grid item xs={12} sm={6}>                  
                        <TextField
                        // onChange={(e)=>setFirstName(e.target.value)}
                        onChange={handleInputChange} 
                            autoComplete='given-name'
                            name='firstName'
                            required
                            fullWidth
                            id="firstName"
                            label='First Name'
                            autoFocus
                            >
                        </TextField>
                    </Grid>  */}
                    <Grid item xs={12} >                  
                        <TextField
                        // onChange={(e)=>setLastName(e.target.value)}
                        onChange={handleInputChange} 
                            autoComplete='family-name'
                            name='name'
                            required
                            fullWidth
                            id="lasttName"
                            label='Enter Name'
                            value={formData.name}
                            // autoFocus
                            >
                        </TextField>
                    </Grid>   
                    <Grid item xs={12}>                  
                        <TextField
                        // onChange={(e)=>setEmail(e.target.value)}
                        onChange={handleInputChange} 
                            name='email'
                            required
                            fullWidth
                            id="email"
                            label='Email Address'
                            // autoFocus
                            autoComplete='email'
                            value={formData.email}
                            >
                        </TextField>
                    </Grid>   
                    <Grid item xs={12}>                  
                        <TextField
                        // onChange={(e)=>setPassword(e.target.value)}
                        onChange={handleInputChange} 
                            name='phone'
                            required
                            fullWidth
                            id="phone"
                            label='Phone No.'
                            // autoFocus
                            autoComplete='new-password'
                            value={formData.phone}
                            >
                        </TextField>
                    </Grid> 
                    <Grid item xs={12}>                  
                        <TextField
                        onChange={handleInputChange}
                        name='address'
                        required
                        // autoFocus
                        fullWidth
                        id='confirmPassword'
                        label='Address'
                        value={formData.address}
                        ></TextField>
                    </Grid> 
                 
                </Grid>

            </Box>

                    <Button
                    onClick={handleUpdate}
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
                        Update
                    </Button>
                    {/* <Link className='text-[blue]  hover:underline' href="./login">If already have an account login</Link> */}
            </Box>
        </Container>
    </div>
  )
}

export default AddUserPopup