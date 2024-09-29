
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { registerUser } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await registerUser(values);
        toast.success(response.data.message);
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Registration failed');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ToastContainer/>
      <Box 
        component="form" 
        onSubmit={formik.handleSubmit} 
        noValidate 
        sx={{ mt: 1, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}
      >
        <Typography variant="h5" component="h1" align="center" sx={{ mb: 2 }}>
          Register
        </Typography>
        
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
          Register
        </Button>
       
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link to="/login" variant="body2">
            Log in
          </Link>
        </Typography>
   
      </Box>
    </Container>
  );
};

export default RegisterForm;
