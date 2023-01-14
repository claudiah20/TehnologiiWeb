import React, { useEffect, useState } from 'react';
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
                                <td><button onClick={()=>{handleDeleteEvent(contact.ID)}}>Sterge</button></td>
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
        
    );
}

export default App;