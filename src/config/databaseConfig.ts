import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  connectionString: 'postgres://userdev:passdev@localhost:5432/dutydb'
});

export default db;
