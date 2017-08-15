const pg = require('pg');
const settings = require('./settings'); // settings.json

const client = new pg.Client({
    user     : settings.user,
    password : settings.password, 
    database : settings.database,
    host     : settings.hostname,
    port     : settings.post,
    ssl      : settings.ssl
});

client.connect((err) => {
    if (err) {
        return console.error('Connection Error', err);
    }
    client.query('SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1', [process.argv[2]], (err, result) => {        
        console.log('Searching ...')
        if (err) {
            return console.error('error running query', err);
        }
        let input = process.argv[2];
        console.log("Found " + result.rows.length + " person(s) by the name '" + input + "':");
        
        let year = result.rows[0].birthdate.getFullYear();
        let month = ("0" + (result.rows[0].birthdate.getMonth()+1)).slice(-2);
        let day = result.rows[0].birthdate.getDate();
        let birthday = "'" + year + "-" + month + "-" + day + "'";

        console.log("- " + result.rows[0].id + ": " + result.rows[0].first_name + " " + result.rows[0].last_name + ", born " + birthday);
        
        client.end();
    });
});