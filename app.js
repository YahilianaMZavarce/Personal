const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const personaRoutes = require('./routes/persona.route');
const cors = require("cors");



dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

console.log("app.js: Starting application...");
app.use(express.json());
app.use(cors());

app.use("/api/personas", personaRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});