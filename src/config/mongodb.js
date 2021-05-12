const env = global.env;

/* database configuration based on environment */
const local = {
  host: '172.16.240.244',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 10,
};

const staging = {
  host: 'staging-abc.docdb.amazonaws.com',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 50,
};

const dev = {
  host: 'dev-abc.docdb.amazonaws.com',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 50,
};

const production = {
  host: 'prd-abc.docdb.amazonaws.com',
  port: 27017,
  database: 'cinema',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  poolSize: 100,
};

const config = { local, staging, production, dev };

module.exports = config[env];
