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
   
   let user = favourites.find(user => {
    if (user.id === req.params.id) {
        return user
    }
   }
)
res.status(200).json(user.favourites);  
})

app.post("/favourites/add", async (req, res) => {

    let favourites = await fs.readFile("./favourites.json");
    favourites = JSON.parse(favourites);

})




app.listen(3000, ()=> {
    console.log("Server is uuup...")
})