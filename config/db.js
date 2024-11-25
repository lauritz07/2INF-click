const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.104.112',
  user: 'nettbutikk_user',       // Bytt ut med din MySQL-bruker
  password: 'Hei123',        // Bytt ut med ditt MySQL-passord
  database: 'produkt_db',        // Navnet på databasen din
  port: 3306                     // Angi den riktige porten her
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

module.exports = connection;

