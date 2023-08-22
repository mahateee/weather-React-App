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
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

moment.locale("ar");
const theme=createTheme({
  typography:{
    fontFamily:['Alexandria']
  }
})
function App() {
  const { t, i18n } = useTranslation();

  //state
    const [temp,setTemp]=React.useState(null)
    const [dateAndTime, setDateAndTime] = React.useState("");
    const [weatherData,setWeatherData]=React.useState({
      description:'',
      icon:null ,
      main:null,
      temp_max:null,
      temp_min:null,
      humidity:null
    })
    const[locale,setLocale] = React.useState("ar");
    //handlers
    function handleLangugeClick(){
      if(locale==='en'){
        setLocale('ar')
    i18n.changeLanguage('ar')
    moment.locale("ar");
      }else{
        setLocale('en')
    i18n.changeLanguage('en')
    moment.locale("en");
      }
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));

    }
  useEffect(()=>{
    i18n.changeLanguage(locale)
    setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
console.log('test')
// Make a request for a user with a given ID
axios.get('https://api.openweathermap.org/data/2.5/weather?lat=24.755562&lon=46.589584&appid=7931b3382b1ac425f968744385dc1de8',
)
  .then(function (response) {
    // handle success
    console.log(response);
    setTemp(Math.round(response.data.main.temp-272.15))
    setWeatherData({
      description:response.data.weather[0].description,
      icon:`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`  ,
      main:response.data.weather[0].main,
      temp_max:Math.round(response.data.main.temp_max - 272.15),
      temp_min:Math.round(response.data.main.temp_min - 272.15),
      humidity:response.data.main.humidity
    })
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
       <Container style={{direction:locale==='ar'?'rtl':'ltr'}} maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {dateAndTime}
        </Typography>
        <CloudIcon/>

        <Typography variant="h5" style={{fontVariantCaps:'small-caps'}} component="div">
        {t('riyadh')}
       
        </Typography>
        <Typography variant="h5" component="div">
       {temp}

        </Typography>
        {/* صورةTODO: */}
        <img src={weatherData.icon} />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {t(weatherData.description)}
        </Typography>
        <Typography variant="body2">
        {t('min')}
         {weatherData.temp_min}
        </Typography>
        <Typography variant="body2">
        {t('max')}
        {weatherData.temp_max}
        </Typography>
        <Typography variant="body2">
        {t('humidity')}
         | 
        {weatherData.humidity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleLangugeClick}>{locale==='en'?'عربي':'English'}</Button>
      </CardActions>
    </Card>
      </Container>
    </ThemeProvider>
    </div>
  );
}

export default App;
