const sequelize = require('../baza_de_date/sequelize');
const { DataTypes } = require('sequelize');

const Contact= sequelize.define('contact', {
    ID:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    Nume:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    Prenume:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    Numar_Telefon:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    Mail:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
    }
})

module.exports = {Contact};