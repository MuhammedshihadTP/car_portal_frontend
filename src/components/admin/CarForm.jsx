// src/components/CarForm.js
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createCar, updateCar } from '../../services/api';

const CarForm = ({ car, onClose }) => {

    console.log(car,"carrr")
  const formik = useFormik({
    initialValues: {
      make: car?.make || '',
      model: car?.model || '',
      year: car?.year || '',
      price: car?.price || '',
      isSecondHand: car?.isSecondHand || false,
      mileage: car?.mileage || '',
      engineType: car?.engineType || '',
      fuelType: car?.fuelType || '',
      transmission: car?.transmission || '',
      color: car?.color || '',
      driveType: car?.driveType || '',
      description: car?.description || '',
      condition: car?.condition || '',
      image: car?.image || '',
    },
    validationSchema: Yup.object({
      make: Yup.string().required('Required'),
      model: Yup.string().required('Required'),
      year: Yup.number().required('Required'),
      price: Yup.number().required('Required'),
      mileage: Yup.number(),
      engineType: Yup.string(),
      fuelType: Yup.string(),
      transmission: Yup.string(),
      color: Yup.string(),
      driveType: Yup.string(),
      description: Yup.string(),
      condition: Yup.string(),
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }

        if (car?._id) {

          await updateCar(car._id, formData);
        } else {
          await createCar(formData);
        }
        onClose();
      } catch (error) {
        console.log(error.message);
       
      }
    },
  });

  useEffect(() => {
    if (car) {
      formik.setValues({
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        isSecondHand: car.isSecondHand,
        mileage: car.mileage,
        engineType: car.engineType,
        fuelType: car.fuelType,
        transmission: car.transmission,
        color: car.color,
        driveType: car.driveType,
        description: car.description,
        condition: car.condition,
        image: car.image,
      });
    } else {
      formik.resetForm();
    }
  }, [car]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3, mb: 3 }}>
      <TextField
        fullWidth
        label="Make"
        name="make"
        value={formik.values.make}
        onChange={formik.handleChange}
        error={formik.touched.make && Boolean(formik.errors.make)}
        helperText={formik.touched.make && formik.errors.make}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Model"
        name="model"
        value={formik.values.model}
        onChange={formik.handleChange}
        error={formik.touched.model && Boolean(formik.errors.model)}
        helperText={formik.touched.model && formik.errors.model}
        sx={{ mt: 2 }} 
      />
      <TextField
        fullWidth
        label="Year"
        name="year"
        type="number"
        value={formik.values.year}
        onChange={formik.handleChange}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
        sx={{ mt: 2 }} // Add margin-top
      />
      <TextField
        fullWidth
        label="Price"
        name="price"
        type="number"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.touched.price && Boolean(formik.errors.price)}
        helperText={formik.touched.price && formik.errors.price}
        sx={{ mt: 2 }} 
      />
      <TextField
        fullWidth
        label="Mileage"
        name="mileage"
        type="number"
        value={formik.values.mileage}
        onChange={formik.handleChange}
        error={formik.touched.mileage && Boolean(formik.errors.mileage)}
        helperText={formik.touched.mileage && formik.errors.mileage}
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        label="Engine Type"
        name="engineType"
        value={formik.values.engineType}
        onChange={formik.handleChange}
        error={formik.touched.engineType && Boolean(formik.errors.engineType)}
        helperText={formik.touched.engineType && formik.errors.engineType}
        sx={{ mt: 2 }} 
      />
      <FormControl fullWidth sx={{ mt: 2 }}> 
        <InputLabel>Fuel Type</InputLabel>
        <Select
          label="Fuel Type"
          name="fuelType"
          value={formik.values.fuelType}
          onChange={formik.handleChange}
        >
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Transmission</InputLabel>
        <Select
          label="Transmission"
          name="transmission"
          value={formik.values.transmission}
          onChange={formik.handleChange}
        >
          <MenuItem value="Automatic">Automatic</MenuItem>
          <MenuItem value="Manual">Manual</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Color"
        name="color"
        value={formik.values.color}
        onChange={formik.handleChange}
        error={formik.touched.color && Boolean(formik.errors.color)}
        helperText={formik.touched.color && formik.errors.color}
        sx={{ mt: 2 }} 
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel>Drive Type</InputLabel>
  <Select
    label="Drive Type"
    name="driveType"
    value={formik.values.driveType}
    onChange={formik.handleChange}
    error={formik.touched.driveType && Boolean(formik.errors.driveType)}
  >
    <MenuItem value="FWD">Front-Wheel Drive (FWD)</MenuItem>
    <MenuItem value="RWD">Rear-Wheel Drive (RWD)</MenuItem>
    <MenuItem value="AWD">All-Wheel Drive (AWD)</MenuItem>

  </Select>
</FormControl>
      <TextField
        fullWidth
        label="Description"
        name="description"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        sx={{ mt: 2 }} 
      />
      <FormControl fullWidth sx={{ mt: 2 }}> 
        <InputLabel>Condition</InputLabel>
        <Select
          label="Condition"
          name="condition"
          value={formik.values.condition}
          onChange={formik.handleChange}
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Used">Used</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
        </Select>
      </FormControl>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image"
        name="image"
        type="file"
        onChange={(event) => {
          formik.setFieldValue("image", event.currentTarget.files[0]);
        }}
      />
      <label htmlFor="image">
        <Button variant="contained" component="span" sx={{ mt: 2 }}>
          Upload Image
        </Button>
      </label>
      {formik.values.image && <p>Selected file: {formik.values.image.name}</p>}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {car ? 'Update Car' : 'Create Car'}
      </Button>
      <Button variant="outlined" color="secondary" onClick={onClose} sx={{ mt: 2, ml: 1 }}>
        Cancel
      </Button>
    </Box>
  );
};

export default CarForm;
