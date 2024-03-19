const express = require("express"); 

const fs = require("fs").promises

const cors = require("cors"); 

const { validateData } = require("./validateData");

const {savedImg} = require("./favouriteSchema");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.send("heeeej")
})

app.get("/favourites/:id", async (req, res) => {

   let users = await fs.readFile("./favourites.json");
   users = JSON.parse(users);
   let favourites = []
   let user = users.find(user => (user.id === req.params.id))
   if (user) {
    favourites = user.favourites; 
   }
   res.status(200).json(favourites); 
})

app.post("/favourites/add", validateData(savedImg), async (req, res) => {

    let users = await fs.readFile("./favourites.json");

    users = JSON.parse(users);

    let userIsFound = false;


    users = users.map((user)=> {
        if (user.id === req.body.id) {
            user.favourites.push(req.body.favourite)
            userIsFound = true;
        } 
        return user
    })
    if (userIsFound === false) {
        let user =  {
        id: req.body.id,
        favourites: [req.body.favourite]
    }
   users.push(
    user 
   )}
    
    

    await fs.writeFile("./favourites.json", JSON.stringify(users, null, 2))

    res.status(200).json("added successfully");  

})

app.listen(3000, ()=> {
    console.log("Server is uuup...")
})