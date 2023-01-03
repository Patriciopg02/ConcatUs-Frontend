import { Button, FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react'
import './LandingRegister.css';
import {useNavigate} from 'react-router-dom';
import {useUserAuth} from '../../../../context/UserAuthContext'



const LandingRegister = () => {
	const { signUp } = useUserAuth();
	const navigate = useNavigate();
	const [input, setInput] = useState({
		email:"",
		password: "",
		username: "",
	  });
	  
	  const [errors, setErrors] = useState({});
	
	  
	  
	  
	  const handleSubmit = async (e) => {
		  e.preventDefault();
		  try {
			  await signUp(input.username, input.email, input.password);
			  navigate("/")
			} catch (err) {
				console.log(err);
			}
		};
		
		function validate(input) {
			let errors = {};
			if (!input.username ) {
				 		errors.username = "The name is required";
				 	}
			if (!input.email || !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(input.email)) {
				 		errors.email = "Invalid E-mail. Example: example@example.com";
				 	}
			if (!input.password || !/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/.test(input.password)){
			  errors.password = "8 char, max 15. 1 capital letter. 1 lowercase letter. 1 digit. No blanks.";
			}
			return errors;
		  }

		  function handleChange(e) {
			setInput({
			  ...input,
			  [e.target.name]: e.target.value,
			});
			setErrors(
			  validate({
				...input,
				[e.target.name]: e.target.value,
			  })
			);
		  }


	return (
		<Grid className='registerForm' container sx={{fontFamily: 'Nunito'}}>
			<h1>Sign Up</h1>
			<br />
			<Grid item md={12}>
			  <FormControl>
			  	<InputLabel sx={{fontSize:'1vw'}} htmlFor='Username'>Username</InputLabel>
				<Input 
				type='Username'
				id='Username'
				value={input.username}
				name="username"
				onChange={(e) => handleChange(e)}
				aria-describedby='username-helper'/>
			  </FormControl>
			  {errors.username && <p className='error'>{errors.usermane}</p>}
		  </Grid>
			<Grid item md={12}>
			  <FormControl>
			  	<InputLabel sx={{fontSize:'1vw'}} htmlFor='email'>E-mail</InputLabel>	
				<Input 
				type='email'
				id='email'
				value={input.email}
				name="email"
				onChange={(e) => handleChange(e)}
				aria-describedby='email-helper'/>
			  </FormControl>
			  {errors.email && <p className='error'>{errors.email}</p>}
		  </Grid>
			  <br/>
			  <Grid item md={12} >
				<FormControl>
					<InputLabel sx={{fontSize:'1vw'}} htmlFor='pwd'>Password</InputLabel>
					<Input 
					type='password'
					id='pwd'
					value={input.password}
					name="password"
					onChange={(e) => handleChange(e)}
					aria-describedby='password-helper'/>
				  </FormControl>
				  {errors.password && <p className='error'>{errors.password}</p>}
			  </Grid>
				<br/>
				{Object.keys(errors).length > 0 || (input.username === '' && input.email === '' && input.password === '') ? (
					<Button variant='outlined' disabled={true}>Register</Button>
				) : (
					<Button variant='contained' onClick={(e) => handleSubmit(e)}>
					Register
				  	</Button>
				)}
		  </Grid>
		  )
}

export default LandingRegister
