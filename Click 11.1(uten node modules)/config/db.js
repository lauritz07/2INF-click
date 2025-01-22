const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'IP-adress',
  user: 'nettbutikk_user',       // Bytt ut med din MySQL-bruker
  password: 'passord',        // Bytt ut med ditt MySQL-passord
  database: 'database_navn',        // Navnet på databasen din
  port: port                     // Angi den riktige porten her
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;

