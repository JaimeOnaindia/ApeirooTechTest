import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  connectionString: 'postgres://usuario:contraseña@localhost:5432/nombre_de_la_base_de_datos'
});

export default db;
