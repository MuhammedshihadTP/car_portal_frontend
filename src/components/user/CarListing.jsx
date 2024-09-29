import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
} from '@mui/material';
import { searchCars } from '../../services/api';
import SearchCars from './SearchCars';
import CarModal from './CarModal';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCars = async (filters = {}) => {
    try {
      const response = await searchCars(filters);
      setCars(response.data.cars);
    } catch (error) {
      console.log(error)
    }
  };

  const handleSearch = (filters) => {
    const filtersWithSearchTerm = {
      ...filters,
      ...(searchTerm ? { searchTerm } : {}),
    };

    fetchCars(filtersWithSearchTerm);
  };


  const handleOpenModal = (car) => {
    setSelectedCar(car);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
    setOpenModal(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);


  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Cars
      </Typography>


      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>

          <SearchCars onSearch={handleSearch} />

        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {cars.map((car) => (
              <Grid item xs={12} sm={6} md={4} key={car._id}>
                <Card elevation={3} sx={{ borderRadius: '8px', boxShadow: 3 }}>
                  {car && car.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${process.env.REACT_APP_SERVER_URL}/uploads/images/${car.image}`}
                      alt={`${car.make} ${car.model}`}
                      sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">
                      {car.make} {car.model}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Year: {car.year}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ₹{car.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Condition: {car.isSecondHand ? 'Second Hand' : 'New'}
                    </Typography>
                  </CardContent>
                  <Button size="small" color="primary" onClick={() => handleOpenModal(car)}>
                    View Details
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {selectedCar && (
        <CarModal
          open={openModal}
          car={selectedCar}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default CarListing;
