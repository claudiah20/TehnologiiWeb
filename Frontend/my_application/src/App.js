import React, { useEffect, useState } from 'react';
import _default from 'react-overlays/cjs/Modal';
import './App.css';

function App() {
    const [contacte, setContacte] = useState([]);
    const [adaugat, setAdaugat] = useState(false);
    const [contact, setContact] = useState({
        Nume: null,
        Prenume: null,
        Numar_Telefon: null,
        Mail: null
    });
    useEffect(() => {
        const getDataFromBackEnd = () => {
            fetch("http://localhost:7000/contacte").then((res) => res.json()).then((res) => setContacte(res));
        }
        getDataFromBackEnd();
    }, [adaugat])

    const handleInput = (evt, cheie) => {
        const input = evt.target.value;
        setContact(contact => ({
            ...contact,
            ... { [cheie]: input }
        }));

    }

    const handleAddEvent = () => {

        let flag = false;

        if ((contact.Nume.length < 3)) {
            flag = false;
            alert("Numele nu este valid!Numele trebuie sa contina minim 3 caractere");
            window.location.reload();
        }
        else {
            flag = true;
        }
        if ((contact.Prenume.length < 3)) {
            alert("Prenumele nu este valid!Prenumele trebuie sa contina minim 3 caractere");
            flag = false;
            window.location.reload();
        }
        else {
            flag = true;
        }
        if ((isNaN(Number(contact.Numar_Telefon))) && (contact.Numar_Telefon.length != 10)) {
            flag = false;
            console.log(isNaN(Number(contact.Numar_Telefon)) + "===" + (contact.Numar_Telefon.length != 10));
            alert("Numarul de telefon trebuie sa fie de tip number!");
            window.location.reload();
        }
        else {
            flag = true;
        }
        if (!(isNaN(Number(contact.Numar_Telefon))) && (contact.Numar_Telefon.length != 10)) {
            flag = false;
            alert("Numarul de telefon trebuie sa contina exact 10 caractere!");
            window.location.reload();
        }
        else {
            flag = true;
        }
        if (contact.Mail.length <= 10) {

            flag = false;
            alert("Mailul nu este valid!Mailul trebuie sa contina minim 10 caractere ");
            window.location.reload();
        }
        else {
            flag = true;
        }
        if (!(contact.Mail.includes('@'))) {

            flag = false;
            alert("Mailul nu este valid!Mailul trebuie sa contina caracterul @ in text");
            window.location.reload();
        }
        else {
            flag = true;
        }

        console.log("flag: " + flag);

        if (flag) {
            fetch("http://localhost:7000/contacte", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...contact
                })
            }).then((res) => res.json()).then((res) => setAdaugat(!adaugat));
        }
        else {
            alert("Datele nu au fost salvate intrucat nu sunt valide!")
        }
    }

    const handleDeleteEvent = (ID) => {

        fetch(`http://localhost:7000/contacte/${ID}`, {
            method: 'DELETE'
        }).then((res) => res.json()).then((res) => setAdaugat(!adaugat));
    }

    return (
        <div className="App">
            <h1>
                Manager Contacte
            </h1>

            <div className="form-container">
                <input class="input-top" type="text" placeholder="Nume" onChange={(evt) => handleInput(evt, "Nume")} />
                <input type="text" placeholder="Prenume" onChange={(evt) => handleInput(evt, "Prenume")} />
                <input type="text" placeholder="Numar Telefon" onChange={(evt) => handleInput(evt, "Numar_Telefon")} />
                <input type="text" placeholder="E-mail" onChange={(evt) => handleInput(evt, "Mail")} />
                <button onClick={() => {
                    handleAddEvent();
                }}>Adauga Contact</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nume</th>
                        <th>Prenume</th>
                        <th>Telefon</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contacte.map((contact) => {
                            return (<tr>
                                <td>{contact.ID}
                                </td>
                                <td>{contact.Nume}</td>
                                <td>{contact.Prenume}</td>
                                <td>{contact.Numar_Telefon}</td>
                                <td>{contact.Mail}</td>
                                <td><button onClick={() => { handleDeleteEvent(contact.ID) }}>Sterge</button></td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>

    );
}

export default App;