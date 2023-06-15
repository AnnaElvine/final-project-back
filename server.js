import express from "express";
import cors from "cors";
import data from "./resources/data.json"

console.log(data);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Mr Bond, I've been expecting you!");
});

//A endpoint to the NatalPage 2 
/*app.get("/deg", (req, res) => {
  res.send("Hello Degge Page!");
}); */

app.get("/zodiacSigns", (req, res) => {
  res.json(data); // this is the data from the json file
}); 

app.get("/zodiacSigns/:dob", (req, res) => { 
  const { dob } = req.params; // this is the data from the json file
  const date = new Date(dob); 
  console.log(date)
  console.log(dob)

  // as on 2 April 2021
  const findSign = (date) => {
     const days = [21, 20, 21, 20, 22, 22, 23, 24, 24, 24, 23, 22];
     const signs = ["Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn"];
     let month = date.getMonth();
     let day = date.getDate();
     if(month == 0 && day <= 20){
        month = 11;
     }else if(day < days[month]){
        month--;
     };
     return signs[month];
  };


  const zodiacSign = findSign(date);
// find function

var result = data.zodiacSigns.find(item => item.id === 2);
console.log(data.zodiacSigns)

  res.json({ zodiacSign })
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
