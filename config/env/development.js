/**
 * Development-specific configuration.
 * NOTE: When adding configuration, do not forget to set it in the other environments also.
* */
module.exports = {
  server: {
    debug: true,
    port: 3000,
    request: {
      mocking: true // TURN OFF IN PRODUCTION
    }
  },
  sql: {
    debug: true,
    sync: true,
    host: 'localhost',
    user: 'shehutaila',
    password: 'shehutaila',
    database: 'shehutaila'
  }
};