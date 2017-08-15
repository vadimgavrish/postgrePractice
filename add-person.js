const settings = require('./settings'); // settings.
const moment = require('moment');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host     : settings.hostname,
      user     : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

knex('famous_people').insert([{
    first_name: process.argv[2],
    last_name: process.argv[3],
    birthdate: moment(process.argv[4]).format("YYYY-MM-DD")
  }])
  .catch((err) => {
    console.log(err);
  })
  .finally((err) => {
      knex.destroy();
  })