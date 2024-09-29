import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { getCars, deleteCar } from '../../services/api';
import CarForm from './CarForm';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null); 

  const fetchCars = async () => {
    try {
      const response = await getCars();
      setCars(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred while fetching cars');
    }
  };

  const confirmDelete = (car) => {
    setCarToDelete(car); 
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      if (carToDelete) {
        await deleteCar(carToDelete._id);
        fetchCars();
        setOpenDeleteDialog(false); 
        setCarToDelete(null); 
      }
    } catch (error) {
   
    }
  };

  const handleEdit = (car) => {
    setSelectedCar(car);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedCar(null);
    setOpenForm(false);
    fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Car List
      </Typography>
      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setOpenForm(true)}>
          Add New Car
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Mileage</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Transmission</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Drive Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car, index) => (
              <TableRow key={car._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/uploads/images/${car.image}`}
                    alt={`${car.make} ${car.model}`}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell>{car.make}</TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell>{car.mileage}</TableCell>
                <TableCell>{car.fuelType}</TableCell>
                <TableCell>{car.transmission}</TableCell>
                <TableCell>{car.color}</TableCell>
                <TableCell>{car.driveType}</TableCell>
                <TableCell>{car.description}</TableCell>
                <TableCell>{car.condition}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEdit(car)} sx={{marginBottom:"20px"}}  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => confirmDelete(car)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {openForm && (
        <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="md">
          <DialogTitle>{selectedCar ? 'Edit Car' : 'Add New Car'}</DialogTitle>
          <DialogContent>
            <CarForm car={selectedCar} onClose={handleCloseForm} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this car?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CarList;
