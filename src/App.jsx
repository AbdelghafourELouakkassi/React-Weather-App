import React, { useEffect,useRef, useState } from 'react'
import SearchIcon from "./Assets/search.png"
import drizzle_icon from "./Assets/drizzle.png"
import rain_icon from "./Assets/rain.png"
import cloud_icon from "./Assets/cloud.png"
import clear_icon from "./Assets/clear.png"
import snow_icon from "./Assets/snow.png"
import HumidtyIcon from "./Assets/humidity.png"
import WindSpeedIcon from "./Assets/wind.png"



function App() {


  const[weatherData,setWeatherData]=useState("")
  const inputRef=useRef()
  
  //icon will be show up depends on the condition of weather
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  } 


  const getWeatherData=async(city)=>{
    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      const response=await fetch(url)
      const data=await response.json();
      if(!response.ok){
        alert(data.message)
        return;
      }
      const icon=allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:parseInt(data.main.temp),
        location:data.name,
        icon:icon
      })
      
    } catch (error) {
      setWeatherData(false)
      console.error("Error in fetching Weather data")
    }
     
  }


  useEffect(()=>{

    getWeatherData("london")

  },[])


  
  return (
    <>
    <h1 className='mb-4 text-3xl text-center text-slate-200'>Weather App</h1>
    <main className='flex flex-col gap-4 bg-blue-700 h-fit  w-fit px-7 py-10 rounded-md items-center shadow-md shadow-black '  >
      <div className='search-input-div flex gap-4 justify-center'>
        <input ref={inputRef} type="text" placeholder='Search' className='bg-slate-200 rounded-full py-1 px-4 w-[80%]  outline-none' />
        <div className='search-icon bg-slate-200 p-2 rounded-full flex justify-center items-center cursor-pointer '
        onClick={()=>{
          getWeatherData(inputRef.current.value)
         }}
         >
           <img  src={SearchIcon} alt="SearchIcon" className='w-4 h-4 '  />
        </div>
      </div>
      
      {
       weatherData?
       <>
      <img src={weatherData.icon} width="50%" height="auto" alt="WeatherImage" />
      <div className='weatherDegree-and-city text-center'>
          <h1 className='text-6xl text-white'>{weatherData.temperature}°C</h1>
          <h3 className='text-2xl text-slate-200 mt-2'>{weatherData.location}</h3>
      </div>
      <div className='humidity-and-windSpeed flex gap-10'>
          <div className='flex gap-4 items-center '>
            <img src={HumidtyIcon} className='w-6 h-4' alt="humidity-icon" />
            <div className='text-slate-200'>
              <span>{weatherData.humidity} %</span>
              <p>humidty</p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <img src={WindSpeedIcon} className='h-6 w-6' alt="wind-icon" />
            <div className='text-slate-200'>
               <span>{weatherData.windSpeed} Km/h</span>
               <p>Wind Speed</p>
            </div>
          </div>
          
      </div> 
       </>:<></>
      }
      
    </main>
    </>
  )
}

export default App