/////////////////////////////////////////////
// Dependencies /////////////////////////////
/////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const path = require("path")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))

const app = require("liquid-express-views")(express(), {
  root: [path.resolve(__dirname, "views/")],
})

const { Schema, model } = mongoose

const pokemonSchema = new Schema({
  name: String,
  color: String,
})

const Pokemon = model("Pokemon", pokemonSchema)

////////////////////////
// MIDDLE WARE//////////
////////////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

//////////////////////////////
// ROUTES ////////////////////
//////////////////////////////

// SETUP
app.get("/", (req, res) => {
  res.send("your server is running! Oh no!")
})
app.get("/pokedex/seed", (req, res) => {
  const starterPokemon = [
    { name: "Pikachu", color: "yellow" },
    { name: "Charmander", color: "orange" },
    { name: "Ivysaur", color: "blue" },
  ]
  Pokemon.deleteMany({}).then((data) => {
    // Seed Starter Fruits
    Pokemon.create(starterPokemon).then((data) => {
      // send created fruits as response to confirm creation
      res.json(data)
    })
  })
})

// INDEX
app.get("/pokedex", async (req, res) => {
  const pokemons = await Pokemon.find({})
  res.render("index", { pokemons })
})
// NEW
app.get("/pokedex/new", (req, res) => {
  res.render("new")
})

// DELETE
app.delete("/pokedex/:id", (req, res) => {
  const id = req.params.id 
  Pokemon.findByIdAndRemove(id)
    .then((pokemon) => {
      res.redirect("/pokedex")
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})
// UPDATE
app.put("/pokedex/:id", (req, res) => {
  const id = req.params.id
  Pokemon.findByIdAndUpdate(id, req.body, { new: true })
    .then((pokemon) => {
      res.redirect("/pokedex")
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})
// CREATE
app.post("/pokedex", (req, res) => {
  Pokemon.create(req.body)
    .then((pokemon) => {
      res.redirect("/pokedex")
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})
// EDIT
app.get("/pokedex/:id/edit", (req, res) => {
  const id = req.params.id

  Pokemon.findById(id)
    .then((pokemon) => {
      res.render("edit", { pokemon })
    })

    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})
// SHOW
app.get("/pokedex/:id", (req, res) => {
  // get the id from params
  const id = req.params.id

  // find the particular fruit from the database
  Pokemon.findById(id)
    .then((pokemon) => {
      // render the template with the data from the database
      res.render("show", { pokemon })
    })
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
