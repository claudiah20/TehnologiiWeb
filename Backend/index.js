const express = require('express');
const sequelize = require('./baza_de_date/sequelize');
const client = "http://localhost:3000";
const contacte = require("./rute/rute_contact");
const cors=require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/contacte", contacte);

(async () => {
    await sequelize.sync();
    console.log("Baza de date a fost initializata");
})();

app.listen(7000, () => {
    console.log("serverul a pornit pe indexul 7000");
});


