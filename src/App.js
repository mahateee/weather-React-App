import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { useEffect } from 'react';
//Material UI
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CloudIcon from '@mui/icons-material/Cloud';
//External API
import axios from 'axios';
// https://api.openweathermap.org/data/2.5/weather?lat=24.755562&lon=46.589584&appid=7931b3382b1ac425f968744385dc1de8
const theme=createTheme({
  typography:{
    fontFamily:['Alexandria']
  }
})
function App() {
    const [temp,setTemp]=React.useState(null)
  useEffect(()=>{
console.log('test')
// Make a request for a user with a given ID
axios.get('https://api.openweathermap.org/data/2.5/weather?lat=24.755562&lon=46.589584&appid=7931b3382b1ac425f968744385dc1de8')
  .then(function (response) {
    // handle success
    console.log(response);
    setTemp(Math.round(response.data.main.temp-272.15))

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  },[]
  )
  return (
    <div className='App'>
    <ThemeProvider theme={theme}>
       <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          التاريخ
        </Typography>
        <CloudIcon/>
        <Typography variant="h5" component="div">
        الرياض

        </Typography>
        <Typography variant="h5" component="div">
       {temp}

        </Typography>
        {/* صورةTODO: */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          سحب
        </Typography>
        <Typography variant="body2">
         الصغرى
          
        </Typography>
        <Typography variant="body2">
        الكبرى
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">اللغة</Button>
      </CardActions>
    </Card>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default App;
