import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Checkbox,
} from '@mui/material';
import { getCars } from '../../services/api'; 

const SearchCars = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    model: '',
    year: '',
    minPrice: 10000,
    maxPrice: 50000,
    transmission: '',
    fuelType: '',
    driveType: '',
    condition: '',
    isSecondHand: false,
    engineType: '',
    color: '',
  });

  const [uniqueModels, setUniqueModels] = useState([]);
  const [uniqueTransmission, setUniqueTransmission] = useState([]);
  const [uniqueFuelType, setUniqueFuelType] = useState([]);
  const [uniqueDriveType, setUniqueDriveType] = useState([]);
  const [uniqueCondition, setUniqueCondition] = useState([]);
  const [uniqueEngineType, setUniqueEngineType] = useState([]);
  const [uniqueColor, setUniqueColor] = useState([]);
  const [uniqueYear, setUniqueYear] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        const carData = response.data;

        setUniqueModels([...new Set(carData.map(car => car.model))]);
        setUniqueTransmission([...new Set(carData.map(car => car.transmission))]);
        setUniqueFuelType([...new Set(carData.map(car => car.fuelType))]);
        setUniqueDriveType([...new Set(carData.map(car => car.driveType))]);
        setUniqueCondition([...new Set(carData.map(car => car.condition))]);
        setUniqueEngineType([...new Set(carData.map(car => car.engineType))]);
        setUniqueColor([...new Set(carData.map(car => car.color))]);
        setUniqueYear([...new Set(carData.map(car => car.year))]);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSliderChange = (e, newValue) => {
    setFilters({
      ...filters,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    if (filters[name] === value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: '', 
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters); 
  };

  const handleClear = () => {
    setFilters({
      model: '',
      year: '',
      minPrice: 10000,
      maxPrice: 50000,
      transmission: '',
      fuelType: '',
      driveType: '',
      condition: '',
      isSecondHand: false,
      engineType: '',
      color: '',
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f9f9f9', marginBottom: 3 }}>
      <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center', }}>
      Filter Cars
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Model</Typography>
            <RadioGroup
              name="model"
              value={filters.model}
              onChange={handleRadioChange}
            >
              {uniqueModels.map((model) => (
                <FormControlLabel key={model} value={model} control={<Radio />} label={model} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Year</Typography>
            <RadioGroup
              name="year"
              value={filters.year}
              onChange={handleRadioChange}
            >
              {uniqueYear.map((year) => (
                <FormControlLabel key={year} value={year} control={<Radio />} label={year} />
              ))}
            </RadioGroup>
          </Grid>

        

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Transmission</Typography>
            <RadioGroup
              name="transmission"
              value={filters.transmission}
              onChange={handleRadioChange}
            >
              {uniqueTransmission.map((trans) => (
                <FormControlLabel key={trans} value={trans} control={<Radio />} label={trans} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Engine Type</Typography>
            <RadioGroup
              name="engineType"
              value={filters.engineType}
              onChange={handleRadioChange}
            >
              {uniqueEngineType.map((engine) => (
                <FormControlLabel key={engine} value={engine} control={<Radio />} label={engine} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Fuel Type</Typography>
            <RadioGroup
              name="fuelType"
              value={filters.fuelType}
              onChange={handleRadioChange}
            >
              {uniqueFuelType.map((fuel) => (
                <FormControlLabel key={fuel} value={fuel} control={<Radio />} label={fuel} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Drive Type</Typography>
            <RadioGroup
              name="driveType"
              value={filters.driveType}
              onChange={handleRadioChange}
            >
              {uniqueDriveType.map((drive) => (
                <FormControlLabel key={drive} value={drive} control={<Radio />} label={drive} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Color</Typography>
            <RadioGroup
              name="color"
              value={filters.color}
              onChange={handleRadioChange}
            >
              {uniqueColor.map((color) => (
                <FormControlLabel key={color} value={color} control={<Radio />} label={color} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="body1" sx={{ mb: 1 }}>Condition</Typography>
            <RadioGroup
              name="condition"
              value={filters.condition}
              onChange={handleRadioChange}
            >
              {uniqueCondition.map((condition) => (
                <FormControlLabel key={condition} value={condition} control={<Radio />} label={condition} />
              ))}
            </RadioGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom>Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}</Typography>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              min={5000}
              max={100000}
              step={500}
              sx={{
                color: '#3f51b5',
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: 'inherit',
                  },
                },
              }}
            />
          </Grid>
        

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: '#3f51b5', color: 'white', '&:hover': { backgroundColor: '#303f9f' } }}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                sx={{ color: '#3f51b5', borderColor: '#3f51b5', '&:hover': { backgroundColor: '#3f51b5', color: 'white' } }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SearchCars;
