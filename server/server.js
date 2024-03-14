const express = require("express"); 

const fs = require("fs").promises

const cors = require("cors"); 
const { array } = require("joi");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("heeeej")
})

app.get("/favourites/:id", async (req, res) => {

   let favourites = await fs.readFile("./favourites.json");
   favourites = JSON.parse(favourites);
   
   let userFavourites = []
    favourites.map(favouriteimg => {
   if (favouriteimg.id === req.params.id) {
    userFavourites.push(favouriteimg.favourite)
   } 
   }
)
res.status(200).json(userFavourites); 
})

app.post("/favourites/add", async (req, res) => {

console.log("HELLO");
    let favourites = await fs.readFile("./favourites.json");
    favourites = JSON.parse(favourites);
    favourites = [...favourites, req.body]

    await fs.writeFile("./favourites.json", JSON.stringify(favourites, null, 2))

    res.status(200).json("added successfully");  

})

app.listen(3000, ()=> {
    console.log("Server is uuup...")
})