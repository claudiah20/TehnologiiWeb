const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './baza_de_date/Contact_Manager.db',
    define: {
		timestamps: false
	}
});

module.exports = sequelize; 