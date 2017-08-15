const settings = require('./settings'); // settings.json
const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : settings.hostname,
      user     : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

let search = process.argv[2];

knex.select('*')
 .from('famous_people')
 .where('first_name', 'LIKE', search)
 .orWhere('last_name', 'LIKE', search)
 .then(function(rows) {
    console.log('Searching ...');
    if (rows.length === 0) {
        console.log('Query not found!');
        return;
    }
    console.log("Found " + rows.length + " person(s) by the name '" + search + "':");
    // switch to moment.js
    let year = rows[0].birthdate.getFullYear();
    let month = ("0" + (rows[0].birthdate.getMonth()+1)).slice(-2);
    let day = rows[0].birthdate.getDate();
    let birthday = "'" + year + "-" + month + "-" + day + "'";

    return console.log("- " + rows[0].id + ": " + rows[0].first_name + " " + rows[0].last_name + ", born " + birthday);
 })
 .catch((err) => {
     console.log(err);
 })
 .finally((err) => {
    knex.destroy();
 })