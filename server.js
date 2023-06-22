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



// Function to handle the fetch request
const fetchZodiacSign = () => {
  const dob = dobInput.value; // Get the date of birth from the input field

  // Make the fetch request to the server
  fetch(`/zodiacSigns/${dob}`)
    .then((response) => response.json())
    .then((data) => {
      const zodiacSign = data.zodiacSign;
      console.log(`Your zodiac sign is: ${zodiacSign}`);
      // Do something with the zodiac sign data
    })
    .catch((error) => {
      console.log("Error fetching zodiac sign:", error);
    });
};

// Example usage: Call the fetchZodiacSign function when a button with id "fetchButton" is clicked
/*const fetchButton = document.getElementById("fetchButton");
fetchButton.addEventListener("click", fetchZodiacSign);
*/




// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Mr Bond, I've been expecting you!");
});


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


// find function
  const zodiacSign = findSign(date);

  console.log(zodiacSign)
  res.json({ zodiacSign })
}); 

const findSign = (date) => {
  const days = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22]; // Updated days array
  const signs = [
    { id: 1, name: "Aquarius" },
    { id: 2, name: "Pisces" },
    { id: 3, name: "Aries" },
    { id: 4, name: "Taurus" },
    { id: 5, name: "Gemini" },
    { id: 6, name: "Cancer" },
    { id: 7, name: "Leo" },
    { id: 8, name: "Virgo" },
    { id: 9, name: "Libra" },
    { id: 10, name: "Scorpio" },
    { id: 11, name: "Sagittarius" },
    { id: 12, name: "Capricorn" }
  ];
  
  let month = date.getMonth();
  let day = date.getDate();

  if (day < days[month]) {
    month--;
    if (month < 0) {
      month = 11;
    }
  }

  return signs.find((sign) => sign.id === month + 1);
};








//A endpoint to the NatalPage 2
app.get("/zodiacSigns/:id", (req, res) => {
  const { id } = req.params;
  const zodiacSign = data.zodiacSigns.find(item => item.id === +id);


var result = data.zodiacSigns.find(item => item.id === 2);
console.log(data.zodiacSigns) 
console.log(result)


  res.json({ zodiacSign })
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
