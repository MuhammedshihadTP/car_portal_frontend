import React from 'react';
import { Modal, Box, Typography, Grid, Button } from '@mui/material';

const CarModal = ({ open, car, onClose }) => {
  if (!car) return null;

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="car-modal-title"
      aria-describedby="car-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="car-modal-title" variant="h6" component="h2">
          {car.make} {car.model} ({car.year})
        </Typography>
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/uploads/images/${car.image}`}
          alt={`${car.make} ${car.model}`}
          style={{ width: '100%', height: 'auto', marginTop: '20px' }}
        />
        <Typography id="car-modal-description" sx={{ mt: 2 }}>
          Price: ${car.price}
        </Typography>
        <Typography>Condition: {car.isSecondHand ? 'Second Hand' : 'New'}</Typography>
        <Typography>Mileage: {car.mileage} km</Typography>
        <Typography>Fuel Type: {car.fuelType}</Typography>
        <Typography>Transmission: {car.transmission}</Typography>
        <Typography>Drive Type: {car.driveType}</Typography>
        <Typography>Color: {car.color}</Typography>
        <Typography sx={{ mt: 2 }}>{car.description}</Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item>
            <Button onClick={onClose} variant="contained" color="primary">
              Close
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CarModal;
