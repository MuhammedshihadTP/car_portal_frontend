import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { loginUser, loginAdmin } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ isAdmin }) => {
  const navigate = useNavigate(); 
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = isAdmin ? await loginAdmin(values) : await loginUser(values);
        if (response.data.token) {
        
          if (isAdmin) {
            localStorage.setItem('adminToken', response.data.token);
            navigate("/admin/dashboard")
          } else {
          
            localStorage.setItem('userToken', response.data.token);

            navigate("/home")
          }
        }
        
      } catch (error) {
       
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box 
        component="form" 
        onSubmit={formik.handleSubmit} 
        noValidate 
        sx={{ mt: 1, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}
      >
        <Typography variant="h5" component="h1" align="center" sx={{ mb: 2 }}>
          {isAdmin ? 'Admin Login' : 'User Login'}
        </Typography>
        
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          {isAdmin ? 'Admin Login' : 'User Login'}
        </Button>
        <Typography variant="body2" align="center">
  Don&apos;t have an account?{' '}
  <Link
   to="/register" variant="body2">
    Sign up
  </Link>
</Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
