const { Contact } = require("../baza_de_date/entities");
const express = require('express');
const app = express();

app.get("/", async (req, res, next) => {
    try {
        const contacte = await Contact.findAll();
        res.status(200).json(contacte);

    } catch (err) {
        next(err);
    }
});

app.post("/", async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body.Nume && req.body.Prenume && req.body.Numar_Telefon && req.body.Mail) {
           
            await Contact.create(req.body);
            res.status(200).json({ message: "Contactul a fost creat!" });
        } else {
            res.status(400).json({ message: "Atributele nu au fost completate corect!" });
        }
    } catch (err) {
        next(err);
    }
});

app.get("/:contactId", async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(req.params.contactId);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: "Contactul nu a fost gasit!" });
        }

    } catch (err) {
        next(err);
    }
});

app.put("/:contactId", async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(req.params.contactId);
        if (contact) {
            if (req.body.ID && req.body.Nume && req.body.Prenume && req.body.Numar_Telefon && req.body.Mail) {
                await Contact.update(req.body, { where: {id: req.body.ID} });
                res.status(200).json({ message: "Contactul a fost actualizat!" });
            } else {
                res.status(400).json({ message: "Atributele nu au fost completate corect!" });
            }
        }else{
            res.status(404).json({ message: "Contactul nu a fost gasit!" });
        }
    } catch (err) {
        next(err);
    }
});

app.delete("/:contactId", async (req, res, next) => {
    try {
        const contact = await Contact.findByPk(req.params.contactId);
        if (contact) {
           await contact.destroy();
           res.status(200).json({ message: "Contactul a fost sters!" });
        }else{
            res.status(404).json({ message: "Contactul nu a fost gasit!" });
        }
    } catch (err) {
        next(err);
    }
});

module.exports=app;

