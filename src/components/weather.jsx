import { useState } from "react";
import one from "../images/bg4.jpg"; 
import axios from "axios";

const myStyle = {
    // backgroundImage: `url(${one})`,
    height: "100vh",
    // marginTop: "-70px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // opacity: 0.55, 
};

const backgroundOverlay = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${one})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    opacity: 0.55,
    zIndex: -1,
};

function WeatherApp() {

    const [city,setCity] = useState("")

    const [weather,setWeather] = useState("")
    const [temperature,setTemperature] = useState("")
    const [description,setDescription] = useState("")
    const [country,setCountry] = useState("")


    function handleCity(event){
        setCity(event.target.value)
    }
    function weatherReport(){
        var weatherdata = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e98654618f77f88f7718897c560690ee`)
        weatherdata.then(function(success)
    {
        console.log(success.data)
        setWeather(success.data.weather[0].main)
        setTemperature(success.data.main.temp)
        setDescription(success.data.weather[0].description)
        setCountry(success.data.sys.country)
    })
    }
    return (
        <div className="bg-transparent p-2 flex justify-center " style={myStyle}>
            <div style={backgroundOverlay}></div>
            <div className="w-96 max-w-sm p-3 h-80 flex flex-col items-center shadow-black shadow-lg bg-gradient-to-r from-gray-500 to-blue-300 border-cyan-100 rounded-lg" style={{marginTop:"10%"}}>
                <h1 className="text-2xl font-bold text-black">Weather Report</h1>
                <p className="text-black mb-2">I can give you a Weather report about the city!</p>
                <div className="w-full min-h-12  p-2 mb-4 border rounded-md border-blue-200 bg-gray-100 flex items-center justify-between">
                    <input onChange={handleCity} className="bg-gray-100 border-none outline-none flex-grow p-1 mt-1" type="text" placeholder="Enter Your City..." required />
                    <button onClick={weatherReport} className="bg-blue-200 text-blue-500 min-h-2 min-w-24 p-1.5 border-blue-300 border rounded-md hover:bg-green-100 hover:text-green-600 font-semibold hover:border-green-700 ml-1">Get Report</button>
                </div>
                <div className="p-4 bg-blue-100 m-3 w-full max-w-sm border rounded-md shadow-md">
                <p className="text-gray-800 font-medium row-span-1">Country :<span className="font-normal capitalize">{country}</span></p>
                    <p className="text-gray-800 font-medium">Weather : <span className="font-normal">{weather}</span></p> 
                    <p className="text-gray-800 font-medium">Temperature :<span className="font-normal">{temperature}</span></p>
                    <p className="text-gray-800 font-medium">Description :<span className="font-normal capitalize">{description}</span></p>
                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
